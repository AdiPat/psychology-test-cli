import { openai } from "@ai-sdk/openai";
import { generateText } from "ai";
import { zodToJsonSchema } from "zod-to-json-schema";
import { z } from "zod";
import { Utils } from "./utils";

type TestTopic = string;

type Analyzer = {
  key: string;
  description: string;
};

interface ScorecardEvaluation {
  score: number;
  message: string;
  categories?: string[];
}

interface UserResponse {
  question: string;
  userAnswer: string;
  correctAnswer: string;
}

interface Scorecard {
  id: string;
  responses: UserResponse[];
}

interface ValidationInput {
  name: string;
  description: string;
}

interface PsychologicalMetric {
  name: string;
  description: string;
  scale: string;
  minValue: number;
  maxValue: number;
}

interface ValidationResponse {
  canBeAPsychologyQuiz: boolean;
  suggestedName: string;
  suggestedDescription: string;
  metrics: PsychologicalMetric[];
}

const AI_MODEL = openai("gpt-4o");

async function jungObject<T>({
  schema,
  prompt,
  system = "",
  temperature = 0.5,
}: {
  prompt: string;
  schema: z.ZodObject<any>;
  system?: string;
  temperature?: number;
}): Promise<{ object: T }> {
  try {
    const jsonSchema = zodToJsonSchema(
      schema,
      "PsychologyEvaluationQuizSchema"
    );

    const paddedPrompt = `
    ${prompt}
    Return the response strictly in JSON as per the given schema.
    Schema: ${JSON.stringify(jsonSchema)}
    `;

    const { text } = await generateText({
      model: AI_MODEL,
      system,
      prompt: paddedPrompt,
      temperature,
    });

    const json = Utils.cleanGPTJson(text);

    const object: T = Utils.parseJSON(json);

    return { object };
  } catch (error) {
    console.log("jungObject: generation of object failed", error);
    return null;
  }
}

async function generateValidationResponse(
  validationInput: ValidationInput
): Promise<void> {
  const { object: validationOutput } = await jungObject<ValidationResponse>({
    prompt: `Tell me if it is possible to generate a psychology evaluation for the given parameters with known concepts / knowledge in modern psychology. 
        If no, suggest a valid name and description that can be turned into a psychology quiz that will be used to evaluate a certain metric or score for a candidate.
        Test Name: ${validationInput.name}  
        Test Description: ${validationInput.description}`,
    schema: z.object({
      canBeAPsychologyQuiz: z.boolean(),
      suggestedName: z.string(),
      suggestedDescription: z.string(),
      metrics: z.array(
        z.object({
          name: z.string(),
          description: z.number(),
          scale: z.string(),
          minValue: z.number(),
          maxValue: z.number(),
        })
      ),
    }),
  });

  if (!validationOutput.canBeAPsychologyQuiz) {
    console.log(
      `The given test name('${validationInput.name}') and description('${validationInput.description}') cannot be used to generate a psychology quiz.`
    );

    console.log(
      `Suggested Name: ${validationOutput.suggestedName} | Suggested Description: ${validationOutput.suggestedDescription}`
    );

    process.exit(1);
  } else {
    console.log(
      `The given test name('${validationInput.name}') and description('${validationInput.description}') can be used to generate a psychology quiz.`
    );

    console.log(
      `Suggested Name: ${validationOutput.suggestedName} | Suggested Description: ${validationOutput.suggestedDescription}`
    );
  }
}

async function generateTestTopics(): Promise<TestTopic[]> {
  throw new Error("Not implemented");
}

async function generateTestSummary(): Promise<string> {
  throw new Error("Not implemented");
}

async function generateTestTitle(): Promise<string> {
  throw new Error("Not implemented");
}

async function generateTestQuestions(): Promise<string[]> {
  throw new Error("Not implemented");
}

async function generateQuestionAnalyzer(question: string): Promise<Analyzer> {
  throw new Error("Not implemented");
}

async function analyzeResponse(userResponse: UserResponse, analyzer: Analyzer) {
  throw new Error("Not implemented");
}

async function generateSummarizedReport(
  scorecard: Scorecard,
  analyzers: Analyzer[]
): Promise<string> {
  throw new Error("Not implemented");
}

async function generateTestAnswers(): Promise<string[]> {
  throw new Error("Not implemented");
}

async function evaluateScorecard(
  scorecard: Scorecard
): Promise<ScorecardEvaluation> {
  throw new Error("Not implemented");
}

const JungAI = {
  generateValidationResponse,
};

export { JungAI };
