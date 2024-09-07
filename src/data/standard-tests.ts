export const baseData = {
  evaluations: [
    {
      name: "Beck Depression Inventory (BDI)",
      description:
        "A self-report questionnaire used to measure the severity of depression symptoms.",
      metrics: [
        {
          name: "Mood Disturbance",
          description:
            "Measures the extent of emotional changes, including sadness, irritability, and hopelessness.",
          minValue: 0,
          maxValue: 63,
          scale: "0-13 minimal, 14-19 mild, 20-28 moderate, 29-63 severe",
        },
        {
          name: "Cognitive Symptoms",
          description:
            "Assesses the cognitive effects of depression, such as difficulty concentrating and decision-making.",
          minValue: 0,
          maxValue: 63,
          scale: "0-13 minimal, 14-19 mild, 20-28 moderate, 29-63 severe",
        },
        {
          name: "Physical Symptoms",
          description:
            "Measures physical manifestations of depression, including fatigue, sleep disturbances, and changes in appetite.",
          minValue: 0,
          maxValue: 63,
          scale: "0-13 minimal, 14-19 mild, 20-28 moderate, 29-63 severe",
        },
      ],
    },
    {
      name: "Generalized Anxiety Disorder 7 (GAD-7)",
      description:
        "A self-administered questionnaire to assess the severity of generalized anxiety symptoms.",
      metrics: [
        {
          name: "Worry and Fear",
          description:
            "Measures the frequency of excessive worry, restlessness, and fearfulness.",
          minValue: 0,
          maxValue: 21,
          scale: "0-4 minimal, 5-9 mild, 10-14 moderate, 15-21 severe",
        },
        {
          name: "Physical Symptoms of Anxiety",
          description:
            "Assesses physical anxiety symptoms like muscle tension, sweating, and trembling.",
          minValue: 0,
          maxValue: 21,
          scale: "0-4 minimal, 5-9 mild, 10-14 moderate, 15-21 severe",
        },
        {
          name: "Concentration and Sleep",
          description:
            "Measures difficulties in concentrating, relaxing, and sleeping due to anxiety.",
          minValue: 0,
          maxValue: 21,
          scale: "0-4 minimal, 5-9 mild, 10-14 moderate, 15-21 severe",
        },
      ],
    },
    {
      name: "Rosenberg Self-Esteem Scale",
      description:
        "A widely used self-report tool to measure self-esteem and self-worth.",
      metrics: [
        {
          name: "Self-Worth",
          description:
            "Evaluates the overall sense of self-worth and positive self-regard.",
          minValue: 0,
          maxValue: 30,
          scale: "0-14 low, 15-25 normal, 26-30 high",
        },
        {
          name: "Negative Self-Perception",
          description:
            "Measures the degree of negative beliefs about oneself, including feelings of failure or inadequacy.",
          minValue: 0,
          maxValue: 30,
          scale: "0-14 low, 15-25 normal, 26-30 high",
        },
        {
          name: "Confidence in Social Settings",
          description:
            "Assesses confidence and self-esteem in social and interpersonal situations.",
          minValue: 0,
          maxValue: 30,
          scale: "0-14 low, 15-25 normal, 26-30 high",
        },
      ],
    },
    {
      name: "Patient Health Questionnaire-9 (PHQ-9)",
      description:
        "A multipurpose tool used for diagnosing and measuring the severity of depression.",
      metrics: [
        {
          name: "Mood and Emotional State",
          description:
            "Measures mood-related symptoms such as sadness, hopelessness, and irritability.",
          minValue: 0,
          maxValue: 27,
          scale:
            "0-4 minimal, 5-9 mild, 10-14 moderate, 15-19 moderately severe, 20-27 severe",
        },
        {
          name: "Sleep and Energy Levels",
          description:
            "Assesses changes in sleep patterns and energy levels as a result of depressive symptoms.",
          minValue: 0,
          maxValue: 27,
          scale:
            "0-4 minimal, 5-9 mild, 10-14 moderate, 15-19 moderately severe, 20-27 severe",
        },
        {
          name: "Appetite and Weight Changes",
          description:
            "Measures significant increases or decreases in appetite and weight due to depression.",
          minValue: 0,
          maxValue: 27,
          scale:
            "0-4 minimal, 5-9 mild, 10-14 moderate, 15-19 moderately severe, 20-27 severe",
        },
      ],
    },
    {
      name: "Connor-Davidson Resilience Scale (CD-RISC)",
      description:
        "Measures resilience, or the ability to cope with stress and bounce back from adversity.",
      metrics: [
        {
          name: "Adaptability to Stress",
          description:
            "Assesses the individual’s ability to adapt to stress and difficult situations.",
          minValue: 0,
          maxValue: 100,
          scale: "0-49 low, 50-74 moderate, 75-100 high",
        },
        {
          name: "Persistence and Optimism",
          description:
            "Evaluates the person’s capacity to remain persistent and optimistic despite challenges.",
          minValue: 0,
          maxValue: 100,
          scale: "0-49 low, 50-74 moderate, 75-100 high",
        },
        {
          name: "Emotional Regulation",
          description:
            "Measures the ability to regulate emotions and maintain calm in stressful situations.",
          minValue: 0,
          maxValue: 100,
          scale: "0-49 low, 50-74 moderate, 75-100 high",
        },
      ],
    },
  ],
};

const standardTestsWithStructuredScale = baseData.evaluations.map(
  (evaluation) => {
    const metricsWithStructuredScale = evaluation.metrics.map((metric) => {
      const scale = metric.scale.split(",").map((range) => {
        range = range.trim();
        const [rangeStr, bin] = range.split(" ");
        return {
          min: parseInt(rangeStr.split("-")[0], 10),
          max: parseInt(rangeStr.split("-")[1], 10),
          bin,
        };
      });
      return {
        ...metric,
        scale,
      };
    });

    return {
      ...evaluation,
      metrics: metricsWithStructuredScale,
    };
  }
);

export const STANDARD_TESTS = standardTestsWithStructuredScale;
