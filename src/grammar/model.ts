import { ArcDurationConflictError, ArcIdNotFoundError, ArctapRequireTimeNotHitError, IError } from "./exceptions";
import { Status } from "./resolver";

const INVALID_LOC = -1;


interface ICodeElement {
    type: string;
    loc: number;
}

export class Document implements ICodeElement {
    type: "Document" = "Document";
    loc: number;

    elements: (NoteList | IEventElement)[];

    constructor(loc: number, elements: (NoteList | IEventElement)[]) {
        this.loc = loc;
        this.elements = elements;
    }
}

export class NoteList implements ICodeElement {
    type: "NoteList" = "NoteList";
    loc: number;

    notes: INoteElement[];

    constructor(loc: number, notes: INoteElement[]) {
        this.loc = loc;
        this.notes = notes;
    }
}


interface INoteElement extends ICodeElement {
    timingGroupId: string;

    resolve(status: Status): void;
}
interface IEventElement extends ICodeElement {
    resolve(status: Status): void;
}
interface INoteElementWithDuration extends INoteElement {
    duration: Duration;
}



export class Bpm implements IEventElement {
    type: "Bpm" = "Bpm";
    loc: number;

    bpm: number;

    r_time: number | null = null;

    constructor(loc: number, bpm: number) {
        this.loc = loc;
        this.bpm = bpm;
    }

    public resolve(status: Status): void {
        status.bpm = this.bpm;
        this.r_time = status.currentTime;
    }

}
export class Tempo implements IEventElement {
    type: "Tempo" = "Tempo";
    loc: number;

    tempo: number;

    r_time: number | null = null;

    constructor(loc: number, tempo: number) {
        this.loc = loc;
        this.tempo = tempo;
    }

    public resolve(status: Status): void {
        status.tempo = this.tempo;
        this.r_time = status.currentTime;
    }
}

export class ArcEnd implements ICodeElement {
    type: "ArcEnd" = "ArcEnd";
    loc: number;

    shape: "SISI" | "SISO" | "SOSI" | "SOSO" | "SI" | "SO" | "S" | "B";
    end: Position;
    duration: Duration;

    r_time: number | null = null;

    constructor(loc: number, shape: string, end: Position, duration: Duration) {
        this.loc = loc;

        this.shape = shape.toUpperCase() as "SISI" | "SISO" | "SOSI" | "SOSO" | "SI" | "SO" | "S" | "B";
        this.end = end;
        this.duration = duration;
    }
}

export class Arc implements INoteElementWithDuration {
    type: "Arc" = "Arc";
    loc: number;

    color: "R" | "G" | "B" | "T";
    start: Position;
    ends: ArcEnd[];
    id: string | null;
    duration: Duration;

    timingGroupId: string;

    r_start: number | null = null;
    r_end: number | null = null;

    constructor(color: string, start: Position, ends: ArcEnd[], id: string | null, timingGroupId: string, codeLocation: number) {
        this.color = color.toUpperCase() as "R" | "G" | "B" | "T";
        this.start = start;
        this.ends = ends;
        this.id = id;
        this.timingGroupId = timingGroupId;

        this.duration = ends.reduce(
            (acc, end) => Duration.add(acc, end.duration),
            new Duration(INVALID_LOC, 1, 0)
        );
    }

    public resolve(status: Status): void {
        this.r_start = status.currentTime;

        let endTime = this.r_start;

        for (const end of this.ends) {
            endTime += end.duration.y / end.duration.x * status.timePerBeat();
            end.r_time = endTime;
        }

        this.r_end = status.currentTime + this.duration.y / this.duration.x * status.timePerBeat();
    }
}
export class ArcTap implements INoteElement {
    type: "ArcTap" = "ArcTap";
    loc: number;

    arcId: string;

    timingGroupId: string;

    r_belongsTo: Arc | null = null;
    r_time: number | null = null;

    constructor(loc: number, arcId: string, timingGroupId: string) {
        this.loc = loc;
        this.arcId = arcId;
        this.timingGroupId = timingGroupId;
    }

    public resolve(status: Status): void {
        this.r_time = status.currentTime;
    }
}
export class Tap implements INoteElement {
    type: "Tap" = "Tap";
    loc: number;

    position: 1 | 2 | 3 | 4;

    timingGroupId: string;

    r_time: number | null = null;

    constructor(loc: number, position: number, timingGroupId: string) {
        this.loc = loc;
        this.position = position as 1 | 2 | 3 | 4;
        this.timingGroupId = timingGroupId;
    }
}

export class Hold implements INoteElementWithDuration {
    type: "Hold" = "Hold";
    loc: number;

    position: 1 | 2 | 3 | 4;
    duration: Duration;
    timingGroupId: string;

    r_start: number | null = null;
    r_end: number | null = null;

    constructor(loc: number, position: number, duration: Duration, timingGroupId: string) {
        this.loc = loc;
        this.position = position as 1 | 2 | 3 | 4;
        this.duration = duration;
        this.timingGroupId = timingGroupId;
    }
}

export class Position implements ICodeElement {
    type: "Position" = "Position";
    loc: number;

    x: number;
    y: number;

    constructor(loc: number, x: number, y: number) {
        this.loc = loc;
        this.x = x;
        this.y = y;
    }
}

function gcd(a: number, b: number): number {
    if (!Number.isInteger(a) || !Number.isInteger(b))
        throw new Error("a and b must be integers but got " + a + " and " + b);

    while (b !== 0) {
        const temp = b;
        b = a % b;
        a = temp;
    }
    return a;
}

export class Duration implements ICodeElement {
    type: "Duration" = "Duration";
    loc: number;

    x: number;
    y: number;

    constructor(loc: number, x: number, y: number) {
        this.loc = loc;
        this.x = x;
        this.y = y;
    }

    static add(a: Duration, b: Duration): Duration {
        const lcm = a.x * b.x / gcd(a.x, b.x);
        return new Duration(INVALID_LOC, lcm, a.y * lcm / a.x + b.y * lcm / b.x);
    }
}