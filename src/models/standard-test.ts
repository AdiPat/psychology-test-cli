import { PsychologicalMetric } from "./psychological-metric";

interface StandardTest {
  name: string;
  description: string;
  metrics: PsychologicalMetric[];
}

export type { StandardTest };
