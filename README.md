# awmc-lang

A `.awmc` language support extension for VSCode.

## What is awmc

**Awmc** (**A**ff **W**ith **M**ajdata **C**onvention) is an alternative to the **Aff** language used in Arcaea fanmade-charts community.

It is inspired by the **Majdata** language, providing a more concise and readable syntax for writing Arcaea charts.

## A sample awmc file

```latex
% One-line comments are supported

(156.23) % BPM

{4} % Tempo (3 notes per bar)
    1, % Land tap
    2 / 3, % Two taps at the same time

    % Red Arc with "siso" shape,
    % from (-1.0, 0.0) to (1.0, 0.0),
    % with 3 quarter (1/4) notes duration
    R-siso[-1.0, 0.0][1, 0.0][4:3],
    B-b[0.0, 0.0][1, 0.0][4:3], % Blue Arc
{4}
    T-so[-1.0, 0.0][1, 0.0][2:1], % Arc trace
    T-so[-1.0, 0.0][1, 0.0][4:1]#1, % Arc trace with id=1 (can be used for arctap)
{2}
    s1, % Arctap on arc trace with id=1
    2h[4:1], % Hold

    % It is unnecessary to specify the tempo in the bar
    % if the tempo does not change
    3,
    4, 

(120) % BPM changed
    T-si[0, 0][0, 0.25][4:1]#1, % Can use the same id as long as no overlap

% Indentations, endlines, and spaces are usually ignored
3,4,
        5, 
```
