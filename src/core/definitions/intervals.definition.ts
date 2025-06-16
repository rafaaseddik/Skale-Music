/**
 * Interval type definition
 */
export enum Interval{
    Unison=0,
    MinorSecond=1,
    MajorSecond=2,
    MinorThird=3,
    MajorThird=4,
    PerfectFourth=5,
    Tritone=6,
    PerfectFifth=7,
    MinorSixth=8,
    MajorSixth=9,
    MinorSeventh=10,
    MajorSeventh=11,
    Octave=12
};

/**
 * Interval names definitions
 */
export const INTERVALS_NAMES: Record<Interval, string> = {
    [Interval.Unison]: "Unison",
    [Interval.MajorSecond]: "Major Second",
    [Interval.MinorSecond]: "Minor Second",
    [Interval.MajorThird]: "Major Third",
    [Interval.MinorThird]: "Minor Third",
    [Interval.PerfectFourth]: "Perfect Fourth",
    [Interval.Tritone]: "Tritone",
    [Interval.PerfectFifth]: "Perfect Fifth",
    [Interval.MajorSixth]: "Major Sixth",
    [Interval.MinorSixth]: "Minor Sixth",
    [Interval.MajorSeventh]: "Major Seventh",
    [Interval.MinorSeventh]: "Minor Seventh",
    [Interval.Octave]: "Octave"
};
