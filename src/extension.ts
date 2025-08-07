import * as vscode from 'vscode';

import * as nearley from "nearley";

import grammar from "./nearleyGrammer";
import { STATUS } from './grammar/model';

let diagnosticCollection: vscode.DiagnosticCollection;

const awmcGrammar = nearley.Grammar.fromCompiled(grammar);

export function activate(context: vscode.ExtensionContext) {
	console.log('Extension "awmc" is now active!');

	// The command has been defined in the package.json file
	// Now provide the implementation of the command with registerCommand
	// The commandId parameter must match the command field in package.json
	const disposable = vscode.commands.registerCommand('awmc.helloWorld', () => {
		// The code you place here will be executed every time your command is executed
		// Display a message box to the user
		vscode.window.showInformationMessage('Hello World from awmc!');
	});

	context.subscriptions.push(disposable);

	vscode.window.showInformationMessage('Awmc Lang is now active!');


	diagnosticCollection = vscode.languages.createDiagnosticCollection('awmc');
	context.subscriptions.push(diagnosticCollection);

	vscode.workspace.onDidOpenTextDocument(document => {
		if (document.languageId === 'awmc') {
			onChange(document);
		}
	});

	vscode.workspace.onDidChangeTextDocument(event => {
		if (event.document.languageId === 'awmc') {
			onChange(event.document);
		}
	});
}

interface NearleyParseError {
	message: string;
	stack: string;
	token: { value: string };
}

function firstSmallerOrEqual(arr: number[], target: number) {
	if (arr.length === 0 || arr[0] > target)
		return -1;

	let l = 0;
	let r = arr.length - 1;
	while (l < r) {
		const mid = Math.floor((l + r + 1) / 2);
		if (arr[mid] <= target)
			l = mid;
		else
			r = mid - 1;
	}
	return l;
}

function tryParse(text: string, uri: vscode.Uri) {
	STATUS.reset();

	const parser = new nearley.Parser(awmcGrammar);

	diagnosticCollection.clear();

	try {
		parser.feed(text);

		const positionsOfNewline = [...Array(text.length).keys()].filter(i => text[i] === "\n");

		const getRealCodeLocation = (codeLocation: number): [number, number] => {
			const line = firstSmallerOrEqual(positionsOfNewline, codeLocation) + 1;
			const col = codeLocation - (line === 0 ? 0 : (positionsOfNewline[line - 1] + 1));
			return [line, col];
		}

		if (STATUS.errors.length > 0) {
			diagnosticCollection.set(uri, STATUS.errors.map(
				error => {
					const [line, col] = getRealCodeLocation(error.codeLocation);
					return new vscode.Diagnostic(
						new vscode.Range(line, col, line, col),
						`${error.type}:\n${error.getMessage(getRealCodeLocation)}`, vscode.DiagnosticSeverity.Error
					)
				}
			));
			return null;
		}

		return parser.results[0];
	} catch (err: any) {
		console.error(err);
		const parseError = err as NearleyParseError;

		console.error("parse error");
		console.error(err);

		const sections = parseError.message.split("\n\n");

		const [line, col] = /^Syntax error at line (\d+) col (\d+):/.exec(sections[0])?.slice(1) ?? ["1", "1"];
		const token = parseError.token.value;
		const expected = sections[3];

		console.error(parseError);

		diagnosticCollection.set(uri, [
			new vscode.Diagnostic(
				new vscode.Range(Number(line) - 1, Number(col) - 1, Number(line) - 1, Number(col) - 1),
				`Syntax error: Unexpected token "${token}".\n\nExpected:\n${expected}`,
				vscode.DiagnosticSeverity.Error)
		]
		);

		return null;
	}
}

function onChange(document: vscode.TextDocument) {
	const uri = document.uri;

	console.log('onChange', uri.fsPath);

	try {

		const result = tryParse(document.getText(), uri);
		console.log('Parsed result', result);
		if (result === null)
			return;

		console.log("parse success", result);
	}
	catch (err: any) {
		console.error(err);
	}
}

export function deactivate() { }