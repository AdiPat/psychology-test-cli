import { PsychologicalMetric } from "./psychological-metric";

interface ValidationResponse {
  canBeAPsychologyQuiz: boolean;
  suggestedName: string;
  suggestedDescription: string;
  metrics: PsychologicalMetric[];
}

export type { ValidationResponse };
