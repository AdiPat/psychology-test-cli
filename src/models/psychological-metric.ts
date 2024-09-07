interface PsychologicalMetric {
  name: string;
  description: string;
  scale:
    | string
    | {
        min: number;
        max: number;
        bin: string;
      }[];
  minValue: number;
  maxValue: number;
}

export type { PsychologicalMetric };
