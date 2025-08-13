@preprocessor typescript
@builtin "number.ne"
@builtin "postprocessors.ne"

@{%
import { Arc, ArcTap, ArcEnd, Tap, Hold, Bpm, Tempo, Document, NoteList, Position, Duration } from "./grammar/model";
%}

doc -> doc_element:* {%
  function (d) {
    return new Document(
      d[0].filter((e: any) => e !== null)
    );
  }
%}

doc_element -> 
    speed_controller {% id %}
  | note_expr {% id %}
  | wschar {% () => null %}
  | comment {% id %}

speed_controller -> 
    bpm {% id %}
  | tempo {% id %}

note_expr ->
    "," {%
    function (d) {
      return new NoteList([]);
    }
  %}

  | ( note IGNORE "/" IGNORE ):* note IGNORE "," {%
    function (d) {
      return new NoteList([...d[0].map((e: any) => e[0]), d[1]]);
    }
  %}

note -> 
    arc {% id %}
  | arctap {% id %}
  | hold {% id %}
  | tap {% id %}

bpm -> "(" IGNORE positive_decimal IGNORE ")" (IGNORE timing_group_id):? {%
    function ([lbrac, ignore1, bpm, timing_group_id]) {
        return new Bpm(bpm, timing_group_id ? timing_group_id[1] : "default");
    }
%}

tempo -> "{" IGNORE positive_int IGNORE "}" (IGNORE timing_group_id):? {%
    function ([lbrac, ignore1, tempo, timing_group_id]) {
        return new Tempo(tempo, timing_group_id ? timing_group_id[1] : "default");
    }
%}


arctap -> "s"i IGNORE arc_id (IGNORE timing_group_id):? {%
  function ([s, ignore1, arc_id, timing_group_id], loc) {
    return new ArcTap(arc_id, timing_group_id ? timing_group_id[1] : "default", loc);
  }
%}

hold -> land_position IGNORE "h"i IGNORE duration (IGNORE timing_group_id):? {%
  function ([pos, ignore1, h, ignore2, duration, ignore3, timing_group_id]) {
    return new Hold(pos, duration, timing_group_id ? timing_group_id[1] : "default");
  }
%}

tap -> land_position (IGNORE timing_group_id):? {%
  function ([pos, timing_group_id]) {
    return new Tap(pos, timing_group_id ? timing_group_id[1] : "default");
  }
%}


land_position -> [1-4] {% d => parseInt(d[0]) %}

arc -> arc_color IGNORE position
       (IGNORE "-" IGNORE arc_shape IGNORE position IGNORE duration):+ (IGNORE arc_id):? (IGNORE timing_group_id):?  {%
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
%}


names -> [a-zA-Z0-9_]:+ {% d => d[0].join("") %}

arc_id -> "#" IGNORE names {% d => d[2] %}
timing_group_id -> "@" IGNORE names {% d => d[2] %}

arc_color -> [RGBTrgbt] {% id %}


arc_shape -> 
    "siso"i {% id %}
  | "sisi"i {% id %}
  | "sosi"i {% id %}
  | "soso"i {% id %}
  | "si"i {% id %}
  | "so"i {% id %}
  | "s"i {% id %}
  | "b"i {% id %}

position -> "[" IGNORE decimal IGNORE "," IGNORE decimal IGNORE "]" {%
    function ([lbrac, ignore1, x, ignore2, sep, ignore3, y, ignore4, rbrac]) {
        return new Position(x, y);
    }
%}
duration -> "[" IGNORE positive_int IGNORE ":" IGNORE positive_int IGNORE "]" {%
    function ([lbrac, ignore1, x, ignore2, sep, ignore3, y, ignore4, rbrac]) {
        return new Duration(x, y);
    }
%}

IGNORE -> ( wschar | comment):* {% () => null %}

comment -> "%" [^\n\r]:* [\n\r] {% () => null %}

wschar -> [ \t\n\v\f\r] {% () => null %}




positive_int -> [1-9] ([0-9]:*) {%
  function ([head, tail]) {
    return parseInt(head + tail.join(""));
  }
%}

positive_decimal -> [1-9] [0-9]:* ("." [0-9]:*):? {% 
  function ([head, tail, dot, remain]) {
    return parseFloat(head + tail.join("") + (dot ? "." + (remain?.join("") ?? "") : ""));
  }
%}