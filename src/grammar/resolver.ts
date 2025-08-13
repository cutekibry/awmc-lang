import { Bpm, Document, Duration, NoteList } from "./model";
import { IError } from "./exceptions";

interface IArcEntry {
    codeLocation: number;
    duration: Duration;
}

export class Status {
    currentTime: number = 0;
    arcEntries: Record<string, IArcEntry> = {};
    bpm: number = 100.0;
    tempo: number = 1;
    errors: IError[] = [];

    public stepOneTick() {
        this.currentTime += this.timePerTick();
    }
    public timePerTick(): number { // in miliseconds
        return 60000.0 / this.bpm / this.tempo;
    }
    public timePerBeat(): number { // in miliseconds
        return 60000.0 / this.bpm;
    }

    public resolve(document: Document) {
        for (const element of document.elements) {
            if (element instanceof NoteList) {
                element
            }
            else {
                if (element instanceof Bpm) {
                    element.r_time = this.currentTime;
                    this.bpm = element.bpm;
                }
                else if (element instanceof Tempo) {
                    element.r_time = this.currentTime;
                    this.tempo = element.tempo;
                }
            }
        }
    }
}
