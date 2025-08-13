// Generated automatically by nearley, version 2.20.1
// http://github.com/Hardmath123/nearley
// Bypasses TS6133. Allow declared but unused functions.
// @ts-ignore
function id(d: any[]): any { return d[0]; }

// Bypasses TS6133. Allow declared but unused functions.
// @ts-ignore
function nth(n) {
    return function(d) {
        return d[n];
    };
}


// Bypasses TS6133. Allow declared but unused functions.
// @ts-ignore
function $(o) {
    return function(d) {
        var ret = {};
        Object.keys(o).forEach(function(k) {
            ret[k] = d[o[k]];
        });
        return ret;
    };
}


import { Arc, ArcTap, ArcEnd, Tap, Hold, Bpm, Tempo, Document, NoteList, Position, Duration } from "./grammar/model";

interface NearleyToken {
  value: any;
  [key: string]: any;
};

interface NearleyLexer {
  reset: (chunk: string, info: any) => void;
  next: () => NearleyToken | undefined;
  save: () => any;
  formatError: (token: never) => string;
  has: (tokenType: string) => boolean;
};

interface NearleyRule {
  name: string;
  symbols: NearleySymbol[];
  postprocess?: (d: any[], loc?: number, reject?: {}) => any;
};

type NearleySymbol = string | { literal: any } | { test: (token: any) => boolean };

interface Grammar {
  Lexer: NearleyLexer | undefined;
  ParserRules: NearleyRule[];
  ParserStart: string;
};

const grammar: Grammar = {
  Lexer: undefined,
  ParserRules: [
    {"name": "unsigned_int$ebnf$1", "symbols": [/[0-9]/]},
    {"name": "unsigned_int$ebnf$1", "symbols": ["unsigned_int$ebnf$1", /[0-9]/], "postprocess": (d) => d[0].concat([d[1]])},
    {"name": "unsigned_int", "symbols": ["unsigned_int$ebnf$1"], "postprocess": 
        function(d) {
            return parseInt(d[0].join(""));
        }
        },
    {"name": "int$ebnf$1$subexpression$1", "symbols": [{"literal":"-"}]},
    {"name": "int$ebnf$1$subexpression$1", "symbols": [{"literal":"+"}]},
    {"name": "int$ebnf$1", "symbols": ["int$ebnf$1$subexpression$1"], "postprocess": id},
    {"name": "int$ebnf$1", "symbols": [], "postprocess": () => null},
    {"name": "int$ebnf$2", "symbols": [/[0-9]/]},
    {"name": "int$ebnf$2", "symbols": ["int$ebnf$2", /[0-9]/], "postprocess": (d) => d[0].concat([d[1]])},
    {"name": "int", "symbols": ["int$ebnf$1", "int$ebnf$2"], "postprocess": 
        function(d) {
            if (d[0]) {
                return parseInt(d[0][0]+d[1].join(""));
            } else {
                return parseInt(d[1].join(""));
            }
        }
        },
    {"name": "unsigned_decimal$ebnf$1", "symbols": [/[0-9]/]},
    {"name": "unsigned_decimal$ebnf$1", "symbols": ["unsigned_decimal$ebnf$1", /[0-9]/], "postprocess": (d) => d[0].concat([d[1]])},
    {"name": "unsigned_decimal$ebnf$2$subexpression$1$ebnf$1", "symbols": [/[0-9]/]},
    {"name": "unsigned_decimal$ebnf$2$subexpression$1$ebnf$1", "symbols": ["unsigned_decimal$ebnf$2$subexpression$1$ebnf$1", /[0-9]/], "postprocess": (d) => d[0].concat([d[1]])},
    {"name": "unsigned_decimal$ebnf$2$subexpression$1", "symbols": [{"literal":"."}, "unsigned_decimal$ebnf$2$subexpression$1$ebnf$1"]},
    {"name": "unsigned_decimal$ebnf$2", "symbols": ["unsigned_decimal$ebnf$2$subexpression$1"], "postprocess": id},
    {"name": "unsigned_decimal$ebnf$2", "symbols": [], "postprocess": () => null},
    {"name": "unsigned_decimal", "symbols": ["unsigned_decimal$ebnf$1", "unsigned_decimal$ebnf$2"], "postprocess": 
        function(d) {
            return parseFloat(
                d[0].join("") +
                (d[1] ? "."+d[1][1].join("") : "")
            );
        }
        },
    {"name": "decimal$ebnf$1", "symbols": [{"literal":"-"}], "postprocess": id},
    {"name": "decimal$ebnf$1", "symbols": [], "postprocess": () => null},
    {"name": "decimal$ebnf$2", "symbols": [/[0-9]/]},
    {"name": "decimal$ebnf$2", "symbols": ["decimal$ebnf$2", /[0-9]/], "postprocess": (d) => d[0].concat([d[1]])},
    {"name": "decimal$ebnf$3$subexpression$1$ebnf$1", "symbols": [/[0-9]/]},
    {"name": "decimal$ebnf$3$subexpression$1$ebnf$1", "symbols": ["decimal$ebnf$3$subexpression$1$ebnf$1", /[0-9]/], "postprocess": (d) => d[0].concat([d[1]])},
    {"name": "decimal$ebnf$3$subexpression$1", "symbols": [{"literal":"."}, "decimal$ebnf$3$subexpression$1$ebnf$1"]},
    {"name": "decimal$ebnf$3", "symbols": ["decimal$ebnf$3$subexpression$1"], "postprocess": id},
    {"name": "decimal$ebnf$3", "symbols": [], "postprocess": () => null},
    {"name": "decimal", "symbols": ["decimal$ebnf$1", "decimal$ebnf$2", "decimal$ebnf$3"], "postprocess": 
        function(d) {
            return parseFloat(
                (d[0] || "") +
                d[1].join("") +
                (d[2] ? "."+d[2][1].join("") : "")
            );
        }
        },
    {"name": "percentage", "symbols": ["decimal", {"literal":"%"}], "postprocess": 
        function(d) {
            return d[0]/100;
        }
        },
    {"name": "jsonfloat$ebnf$1", "symbols": [{"literal":"-"}], "postprocess": id},
    {"name": "jsonfloat$ebnf$1", "symbols": [], "postprocess": () => null},
    {"name": "jsonfloat$ebnf$2", "symbols": [/[0-9]/]},
    {"name": "jsonfloat$ebnf$2", "symbols": ["jsonfloat$ebnf$2", /[0-9]/], "postprocess": (d) => d[0].concat([d[1]])},
    {"name": "jsonfloat$ebnf$3$subexpression$1$ebnf$1", "symbols": [/[0-9]/]},
    {"name": "jsonfloat$ebnf$3$subexpression$1$ebnf$1", "symbols": ["jsonfloat$ebnf$3$subexpression$1$ebnf$1", /[0-9]/], "postprocess": (d) => d[0].concat([d[1]])},
    {"name": "jsonfloat$ebnf$3$subexpression$1", "symbols": [{"literal":"."}, "jsonfloat$ebnf$3$subexpression$1$ebnf$1"]},
    {"name": "jsonfloat$ebnf$3", "symbols": ["jsonfloat$ebnf$3$subexpression$1"], "postprocess": id},
    {"name": "jsonfloat$ebnf$3", "symbols": [], "postprocess": () => null},
    {"name": "jsonfloat$ebnf$4$subexpression$1$ebnf$1", "symbols": [/[+-]/], "postprocess": id},
    {"name": "jsonfloat$ebnf$4$subexpression$1$ebnf$1", "symbols": [], "postprocess": () => null},
    {"name": "jsonfloat$ebnf$4$subexpression$1$ebnf$2", "symbols": [/[0-9]/]},
    {"name": "jsonfloat$ebnf$4$subexpression$1$ebnf$2", "symbols": ["jsonfloat$ebnf$4$subexpression$1$ebnf$2", /[0-9]/], "postprocess": (d) => d[0].concat([d[1]])},
    {"name": "jsonfloat$ebnf$4$subexpression$1", "symbols": [/[eE]/, "jsonfloat$ebnf$4$subexpression$1$ebnf$1", "jsonfloat$ebnf$4$subexpression$1$ebnf$2"]},
    {"name": "jsonfloat$ebnf$4", "symbols": ["jsonfloat$ebnf$4$subexpression$1"], "postprocess": id},
    {"name": "jsonfloat$ebnf$4", "symbols": [], "postprocess": () => null},
    {"name": "jsonfloat", "symbols": ["jsonfloat$ebnf$1", "jsonfloat$ebnf$2", "jsonfloat$ebnf$3", "jsonfloat$ebnf$4"], "postprocess": 
        function(d) {
            return parseFloat(
                (d[0] || "") +
                d[1].join("") +
                (d[2] ? "."+d[2][1].join("") : "") +
                (d[3] ? "e" + (d[3][1] || "+") + d[3][2].join("") : "")
            );
        }
        },
    {"name": "doc$ebnf$1", "symbols": []},
    {"name": "doc$ebnf$1", "symbols": ["doc$ebnf$1", "doc_element"], "postprocess": (d) => d[0].concat([d[1]])},
    {"name": "doc", "symbols": ["doc$ebnf$1"], "postprocess": 
        function (d) {
          return new Document(
            d[0].filter((e: any) => e !== null)
          );
        }
        },
    {"name": "doc_element", "symbols": ["speed_controller"], "postprocess": id},
    {"name": "doc_element", "symbols": ["note_expr"], "postprocess": id},
    {"name": "doc_element", "symbols": ["wschar"], "postprocess": () => null},
    {"name": "doc_element", "symbols": ["comment"], "postprocess": id},
    {"name": "speed_controller", "symbols": ["bpm"], "postprocess": id},
    {"name": "speed_controller", "symbols": ["tempo"], "postprocess": id},
    {"name": "note_expr", "symbols": [{"literal":","}], "postprocess": 
        function (d) {
          return new NoteList([]);
        }
          },
    {"name": "note_expr$ebnf$1", "symbols": []},
    {"name": "note_expr$ebnf$1$subexpression$1", "symbols": ["note", "IGNORE", {"literal":"/"}, "IGNORE"]},
    {"name": "note_expr$ebnf$1", "symbols": ["note_expr$ebnf$1", "note_expr$ebnf$1$subexpression$1"], "postprocess": (d) => d[0].concat([d[1]])},
    {"name": "note_expr", "symbols": ["note_expr$ebnf$1", "note", "IGNORE", {"literal":","}], "postprocess": 
        function (d) {
          return new NoteList([...d[0].map((e: any) => e[0]), d[1]]);
        }
          },
    {"name": "note", "symbols": ["arc"], "postprocess": id},
    {"name": "note", "symbols": ["arctap"], "postprocess": id},
    {"name": "note", "symbols": ["hold"], "postprocess": id},
    {"name": "note", "symbols": ["tap"], "postprocess": id},
    {"name": "bpm$ebnf$1$subexpression$1", "symbols": ["IGNORE", "timing_group_id"]},
    {"name": "bpm$ebnf$1", "symbols": ["bpm$ebnf$1$subexpression$1"], "postprocess": id},
    {"name": "bpm$ebnf$1", "symbols": [], "postprocess": () => null},
    {"name": "bpm", "symbols": [{"literal":"("}, "IGNORE", "positive_decimal", "IGNORE", {"literal":")"}, "bpm$ebnf$1"], "postprocess": 
        function ([lbrac, ignore1, bpm, timing_group_id]) {
            return new Bpm(bpm, timing_group_id ? timing_group_id[1] : "default");
        }
        },
    {"name": "tempo$ebnf$1$subexpression$1", "symbols": ["IGNORE", "timing_group_id"]},
    {"name": "tempo$ebnf$1", "symbols": ["tempo$ebnf$1$subexpression$1"], "postprocess": id},
    {"name": "tempo$ebnf$1", "symbols": [], "postprocess": () => null},
    {"name": "tempo", "symbols": [{"literal":"{"}, "IGNORE", "positive_int", "IGNORE", {"literal":"}"}, "tempo$ebnf$1"], "postprocess": 
        function ([lbrac, ignore1, tempo, timing_group_id]) {
            return new Tempo(tempo, timing_group_id ? timing_group_id[1] : "default");
        }
        },
    {"name": "arctap$subexpression$1", "symbols": [/[sS]/], "postprocess": function(d) {return d.join(""); }},
    {"name": "arctap$ebnf$1$subexpression$1", "symbols": ["IGNORE", "timing_group_id"]},
    {"name": "arctap$ebnf$1", "symbols": ["arctap$ebnf$1$subexpression$1"], "postprocess": id},
    {"name": "arctap$ebnf$1", "symbols": [], "postprocess": () => null},
    {"name": "arctap", "symbols": ["arctap$subexpression$1", "IGNORE", "arc_id", "arctap$ebnf$1"], "postprocess": 
        function ([s, ignore1, arc_id, timing_group_id], loc) {
          return new ArcTap(arc_id, timing_group_id ? timing_group_id[1] : "default", loc);
        }
        },
    {"name": "hold$subexpression$1", "symbols": [/[hH]/], "postprocess": function(d) {return d.join(""); }},
    {"name": "hold$ebnf$1$subexpression$1", "symbols": ["IGNORE", "timing_group_id"]},
    {"name": "hold$ebnf$1", "symbols": ["hold$ebnf$1$subexpression$1"], "postprocess": id},
    {"name": "hold$ebnf$1", "symbols": [], "postprocess": () => null},
    {"name": "hold", "symbols": ["land_position", "IGNORE", "hold$subexpression$1", "IGNORE", "duration", "hold$ebnf$1"], "postprocess": 
        function ([pos, ignore1, h, ignore2, duration, ignore3, timing_group_id]) {
          return new Hold(pos, duration, timing_group_id ? timing_group_id[1] : "default");
        }
        },
    {"name": "tap$ebnf$1$subexpression$1", "symbols": ["IGNORE", "timing_group_id"]},
    {"name": "tap$ebnf$1", "symbols": ["tap$ebnf$1$subexpression$1"], "postprocess": id},
    {"name": "tap$ebnf$1", "symbols": [], "postprocess": () => null},
    {"name": "tap", "symbols": ["land_position", "tap$ebnf$1"], "postprocess": 
        function ([pos, timing_group_id]) {
          return new Tap(pos, timing_group_id ? timing_group_id[1] : "default");
        }
        },
    {"name": "land_position", "symbols": [/[1-4]/], "postprocess": d => parseInt(d[0])},
    {"name": "arc$ebnf$1$subexpression$1", "symbols": ["IGNORE", {"literal":"-"}, "IGNORE", "arc_shape", "IGNORE", "position", "IGNORE", "duration"]},
    {"name": "arc$ebnf$1", "symbols": ["arc$ebnf$1$subexpression$1"]},
    {"name": "arc$ebnf$1$subexpression$2", "symbols": ["IGNORE", {"literal":"-"}, "IGNORE", "arc_shape", "IGNORE", "position", "IGNORE", "duration"]},
    {"name": "arc$ebnf$1", "symbols": ["arc$ebnf$1", "arc$ebnf$1$subexpression$2"], "postprocess": (d) => d[0].concat([d[1]])},
    {"name": "arc$ebnf$2$subexpression$1", "symbols": ["IGNORE", "arc_id"]},
    {"name": "arc$ebnf$2", "symbols": ["arc$ebnf$2$subexpression$1"], "postprocess": id},
    {"name": "arc$ebnf$2", "symbols": [], "postprocess": () => null},
    {"name": "arc$ebnf$3$subexpression$1", "symbols": ["IGNORE", "timing_group_id"]},
    {"name": "arc$ebnf$3", "symbols": ["arc$ebnf$3$subexpression$1"], "postprocess": id},
    {"name": "arc$ebnf$3", "symbols": [], "postprocess": () => null},
    {"name": "arc", "symbols": ["arc_color", "IGNORE", "position", "arc$ebnf$1", "arc$ebnf$2", "arc$ebnf$3"], "postprocess": 
        function ([color, ignore1, start, ends, arc_id, timing_group_id], loc) {
            return new Arc(
              color,
              start,
              ends.map(e => new ArcEnd(e[3], e[5], e[7])),
              arc_id ? arc_id[1] : null,
              timing_group_id ? timing_group_id[1] : "default",
              loc
            );
        }
        },
    {"name": "names", "symbols": [/[a-zA-Z0-9_]/, "names"], "postprocess": d => d[0] + d[1]},
    {"name": "names", "symbols": [/[a-zA-Z0-9_]/], "postprocess": d => d[0]},
    {"name": "arc_id", "symbols": [{"literal":"#"}, "IGNORE", "names"], "postprocess": d => d[2]},
    {"name": "timing_group_id", "symbols": [{"literal":"@"}, "IGNORE", "names"], "postprocess": d => d[2]},
    {"name": "arc_color", "symbols": [/[RGBTrgbt]/], "postprocess": id},
    {"name": "arc_shape$subexpression$1", "symbols": [/[sS]/, /[iI]/, /[sS]/, /[oO]/], "postprocess": function(d) {return d.join(""); }},
    {"name": "arc_shape", "symbols": ["arc_shape$subexpression$1"], "postprocess": id},
    {"name": "arc_shape$subexpression$2", "symbols": [/[sS]/, /[iI]/, /[sS]/, /[iI]/], "postprocess": function(d) {return d.join(""); }},
    {"name": "arc_shape", "symbols": ["arc_shape$subexpression$2"], "postprocess": id},
    {"name": "arc_shape$subexpression$3", "symbols": [/[sS]/, /[oO]/, /[sS]/, /[iI]/], "postprocess": function(d) {return d.join(""); }},
    {"name": "arc_shape", "symbols": ["arc_shape$subexpression$3"], "postprocess": id},
    {"name": "arc_shape$subexpression$4", "symbols": [/[sS]/, /[oO]/, /[sS]/, /[oO]/], "postprocess": function(d) {return d.join(""); }},
    {"name": "arc_shape", "symbols": ["arc_shape$subexpression$4"], "postprocess": id},
    {"name": "arc_shape$subexpression$5", "symbols": [/[sS]/, /[iI]/], "postprocess": function(d) {return d.join(""); }},
    {"name": "arc_shape", "symbols": ["arc_shape$subexpression$5"], "postprocess": id},
    {"name": "arc_shape$subexpression$6", "symbols": [/[sS]/, /[oO]/], "postprocess": function(d) {return d.join(""); }},
    {"name": "arc_shape", "symbols": ["arc_shape$subexpression$6"], "postprocess": id},
    {"name": "arc_shape$subexpression$7", "symbols": [/[sS]/], "postprocess": function(d) {return d.join(""); }},
    {"name": "arc_shape", "symbols": ["arc_shape$subexpression$7"], "postprocess": id},
    {"name": "arc_shape$subexpression$8", "symbols": [/[bB]/], "postprocess": function(d) {return d.join(""); }},
    {"name": "arc_shape", "symbols": ["arc_shape$subexpression$8"], "postprocess": id},
    {"name": "position", "symbols": [{"literal":"["}, "IGNORE", "decimal", "IGNORE", {"literal":","}, "IGNORE", "decimal", "IGNORE", {"literal":"]"}], "postprocess": 
        function ([lbrac, ignore1, x, ignore2, sep, ignore3, y, ignore4, rbrac]) {
            return new Position(x, y);
        }
        },
    {"name": "duration", "symbols": [{"literal":"["}, "IGNORE", "positive_int", "IGNORE", {"literal":":"}, "IGNORE", "positive_int", "IGNORE", {"literal":"]"}], "postprocess": 
        function ([lbrac, ignore1, x, ignore2, sep, ignore3, y, ignore4, rbrac]) {
            return new Duration(x, y);
        }
        },
    {"name": "IGNORE$ebnf$1", "symbols": []},
    {"name": "IGNORE$ebnf$1$subexpression$1", "symbols": ["wschar"]},
    {"name": "IGNORE$ebnf$1$subexpression$1", "symbols": ["comment"]},
    {"name": "IGNORE$ebnf$1", "symbols": ["IGNORE$ebnf$1", "IGNORE$ebnf$1$subexpression$1"], "postprocess": (d) => d[0].concat([d[1]])},
    {"name": "IGNORE", "symbols": ["IGNORE$ebnf$1"], "postprocess": () => null},
    {"name": "comment$ebnf$1", "symbols": []},
    {"name": "comment$ebnf$1", "symbols": ["comment$ebnf$1", /[^\n\r]/], "postprocess": (d) => d[0].concat([d[1]])},
    {"name": "comment", "symbols": [{"literal":"%"}, "comment$ebnf$1", /[\n\r]/], "postprocess": () => null},
    {"name": "wschar", "symbols": [/[ \t\n\v\f\r]/], "postprocess": () => null},
    {"name": "positive_int$subexpression$1$ebnf$1", "symbols": []},
    {"name": "positive_int$subexpression$1$ebnf$1", "symbols": ["positive_int$subexpression$1$ebnf$1", /[0-9]/], "postprocess": (d) => d[0].concat([d[1]])},
    {"name": "positive_int$subexpression$1", "symbols": ["positive_int$subexpression$1$ebnf$1"]},
    {"name": "positive_int", "symbols": [/[1-9]/, "positive_int$subexpression$1"], "postprocess": 
        function ([head, tail]) {
          return parseInt(head + tail.join(""));
        }
        },
    {"name": "positive_decimal$ebnf$1", "symbols": []},
    {"name": "positive_decimal$ebnf$1", "symbols": ["positive_decimal$ebnf$1", /[0-9]/], "postprocess": (d) => d[0].concat([d[1]])},
    {"name": "positive_decimal$ebnf$2$subexpression$1$ebnf$1", "symbols": []},
    {"name": "positive_decimal$ebnf$2$subexpression$1$ebnf$1", "symbols": ["positive_decimal$ebnf$2$subexpression$1$ebnf$1", /[0-9]/], "postprocess": (d) => d[0].concat([d[1]])},
    {"name": "positive_decimal$ebnf$2$subexpression$1", "symbols": [{"literal":"."}, "positive_decimal$ebnf$2$subexpression$1$ebnf$1"]},
    {"name": "positive_decimal$ebnf$2", "symbols": ["positive_decimal$ebnf$2$subexpression$1"], "postprocess": id},
    {"name": "positive_decimal$ebnf$2", "symbols": [], "postprocess": () => null},
    {"name": "positive_decimal", "symbols": [/[1-9]/, "positive_decimal$ebnf$1", "positive_decimal$ebnf$2"], "postprocess":  
        function ([head, tail, dot, remain]) {
          return parseFloat(head + tail.join("") + (dot ? "." + (remain?.join("") ?? "") : ""));
        }
        }
  ],
  ParserStart: "doc",
};

export default grammar;
