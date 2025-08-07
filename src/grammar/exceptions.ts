interface IGetRealCodeLocation {
    (codeLocation: number): [number, number];
}

export interface IError {
    type: string;
    codeLocation: number;

    getMessage(getRealCodeLocation: IGetRealCodeLocation): string;
}

export class ArcIdNotFoundError implements IError {
    type: "ArcIdNotFoundError" = "ArcIdNotFoundError";
    codeLocation: number;

    arcId: string;

    constructor(codeLocation: number, expectedArcId: string) {
        this.codeLocation = codeLocation;
        this.arcId = expectedArcId;
    }

    getMessage(getRealCodeLocation: IGetRealCodeLocation): string {
        return `Arc ID ${this.arcId} not found.`;
    }
}

export class ArctapRequireTimeNotHitError implements IError {
    type: "ArctapRequireTimeNotHitError" = "ArctapRequireTimeNotHitError";
    codeLocation: number;

    arcId: string;
    arctapTime: number;
    arcCodeLocation: number;
    arcDuration: { start: number, end: number };

    constructor(codeLocation: number, arcId: string, arcCodeLocation: number, arctapTime: number, arcDuration: { start: number, end: number }) {
        this.codeLocation = codeLocation;
        this.arcId = arcId;
        this.arcCodeLocation = arcCodeLocation;
        this.arcDuration = arcDuration;
        this.arctapTime = arctapTime;
    }

    getMessage(getRealCodeLocation: IGetRealCodeLocation): string {
        return `The arctap (at ${this.arctapTime} ms) is not in the duration of arc with ID = ${this.arcId} (last appeared at ${getRealCodeLocation(this.arcCodeLocation)}, ${this.arcDuration.start} ms - ${this.arcDuration.end} ms).`;
    }
}

export class ArcDurationConflictError implements IError {
    type: "ArcDurationConflictError" = "ArcDurationConflictError";
    codeLocation: number;

    prevCodeLocation: number;
    arcId: string;
    arcDuration: { start: number, end: number };
    prevArcDuration: { start: number, end: number };

    constructor(codeLocation: number, prevCodeLocation: number, arcId: string, arcDuration: { start: number, end: number }, prevArcDuration: { start: number, end: number }) {
        this.codeLocation = codeLocation;
        this.prevCodeLocation = prevCodeLocation;
        this.arcId = arcId;
        this.arcDuration = arcDuration;
        this.prevArcDuration = prevArcDuration;
    }
    getMessage(getRealCodeLocation: IGetRealCodeLocation): string {
        return `Arc with ID = ${this.arcId} has duration conflict (${this.arcDuration.start} ms - ${this.arcDuration.end} ms) with previous appearance at ${getRealCodeLocation(this.prevCodeLocation)} (${this.prevArcDuration.start} ms - ${this.prevArcDuration.end} ms).`;
    }
}