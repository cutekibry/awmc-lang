import { ArcDurationConflictError, ArcIdNotFoundError, ArctapRequireTimeNotHitError, IError } from "./exceptions";

interface IArcEntry {
    codeLocation: number;
    duration: Duration;
}

export class Status {
    currentTime: number = 0;
    arcEntries: Record<string, IArcEntry> = {};
    bpm: number = 0.0;
    tempo: number = 0;
    errors: IError[] = [];

    reset() {
        this.currentTime = 0;
        this.arcEntries = {};
        this.bpm = 0;
        this.tempo = 0;
        this.errors = [];
    }
    stepOneTick() {
        this.currentTime += this.timePerTick();
    }
    timePerTick(): number { // in miliseconds
        return 60000.0 / this.bpm / this.tempo;
    }
    timePerBeat(): number { // in miliseconds
        return 60000.0 / this.bpm;
    }
}
export const STATUS = new Status();



interface IElement {
    type: string;
}

export class Document implements IElement {
    type: "Document" = "Document";
    elements: (NoteList | IEventElement)[];

    constructor(elements: (NoteList | IEventElement)[]) {
        this.elements = elements;
    }
}

export class NoteList implements IElement {
    type: "NoteList" = "NoteList";
    notes: INoteElement[];

    constructor(notes: INoteElement[]) {
        this.notes = notes;

        STATUS.stepOneTick();
    }
}


interface IElementWithTimingGroupId extends IElement {
    timingGroupId: string;
}
interface INoteElement extends IElementWithTimingGroupId { }
interface IEventElement extends IElementWithTimingGroupId { }

interface INoteElementWithDuration extends INoteElement {
    duration: Duration;
}
interface INoteElementWithTimePosition extends INoteElement {
    timePosition: number;
}

export class Bpm implements IEventElement {
    type: "Bpm" = "Bpm";
    bpm: number;

    timingGroupId: string;

    constructor(bpm: number, timingGroupId: string) {
        this.bpm = bpm;
        this.timingGroupId = timingGroupId;

        STATUS.bpm = bpm;
    }
}
export class Tempo implements IEventElement {
    type: "Tempo" = "Tempo";
    tempo: number;

    timingGroupId: string;

    constructor(tempo: number, timingGroupId: string) {
        this.tempo = tempo;
        this.timingGroupId = timingGroupId;

        STATUS.tempo = tempo;
    }
}

export class Arc implements INoteElementWithDuration {
    type: "Arc" = "Arc";
    color: "R" | "G" | "B" | "T";
    shape: "SISI" | "SISO" | "SOSI" | "SOSO" | "SI" | "SO" | "S" | "B";
    start: Position;
    end: Position;
    duration: Duration;
    id: string | null;

    timingGroupId: string;

    constructor(color: string, id: string | null, shape: string, start: Position, end: Position, duration: Duration, timingGroupId: string, codeLocation: number) {
        this.color = color.toUpperCase() as "R" | "G" | "B" | "T";
        this.shape = shape.toUpperCase() as "SISI" | "SISO" | "SOSI" | "SOSO" | "SI" | "SO" | "S" | "B";
        this.start = start;
        this.end = end;
        this.duration = duration;
        this.id = id;
        this.timingGroupId = timingGroupId;

        console.log("Arc", this.id, this.duration.start, this.duration.end);

        if (this.id !== null) {
            if (STATUS.arcEntries[this.id] !== undefined && STATUS.arcEntries[this.id].duration.end > this.duration.start)
                STATUS.errors.push(new ArcDurationConflictError(
                    codeLocation,
                    STATUS.arcEntries[this.id].codeLocation,
                    this.id,
                    this.duration,
                    STATUS.arcEntries[this.id].duration
                ));

            STATUS.arcEntries[this.id] = {
                codeLocation: codeLocation,
                duration: this.duration
            };
        }
    }
}
export class ArcTap implements INoteElementWithTimePosition {
    type: "ArcTap" = "ArcTap";
    arcId: string;

    timePosition: number;
    timingGroupId: string;

    constructor(arcId: string, timingGroupId: string, codeLocation: number) {
        if (STATUS.arcEntries[arcId] === undefined)
            STATUS.errors.push(new ArcIdNotFoundError(codeLocation, arcId));

        else if (STATUS.arcEntries[arcId].duration.end < STATUS.currentTime)
            STATUS.errors.push(new ArctapRequireTimeNotHitError(
                codeLocation,
                arcId,
                STATUS.arcEntries[arcId].codeLocation,
                STATUS.currentTime,
                { start: STATUS.arcEntries[arcId].duration.start, end: STATUS.arcEntries[arcId].duration.end }
            ));

        this.arcId = arcId;
        this.timingGroupId = timingGroupId;
        this.timePosition = STATUS.currentTime;
    }
}
export class Tap implements INoteElementWithTimePosition {
    type: "Tap" = "Tap";
    position: 1 | 2 | 3 | 4;

    timePosition: number;
    timingGroupId: string;

    constructor(position: number, timingGroupId: string) {
        this.position = position as 1 | 2 | 3 | 4;
        this.timingGroupId = timingGroupId;
        this.timePosition = STATUS.currentTime;
    }
}

export class Hold implements INoteElementWithDuration {
    type: "Hold" = "Hold";
    position: 1 | 2 | 3 | 4;

    duration: Duration;
    timingGroupId: string;

    constructor(position: number, duration: Duration, timingGroupId: string) {
        this.position = position as 1 | 2 | 3 | 4;
        this.duration = duration;
        this.timingGroupId = timingGroupId;
    }
}

export class Position implements IElement {
    type: "Position" = "Position";
    x: number;
    y: number;

    constructor(x: number, y: number) {
        this.x = x;
        this.y = y;
    }
}

export class Duration implements IElement {
    type: "Duration" = "Duration";
    x: number;
    y: number;
    start: number;
    end: number;

    constructor(x: number, y: number) {
        this.x = x;
        this.y = y;
        this.start = STATUS.currentTime;
        this.end = this.start + y / x * STATUS.timePerBeat();
    }
}