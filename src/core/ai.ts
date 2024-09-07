import { openai } from "@ai-sdk/openai";
import { generateText } from "ai";
import { zodToJsonSchema } from "zod-to-json-schema";
import { z } from "zod";
import { Utils } from "./utils";
import {
  Analyzer,
  Scorecard,
  ScorecardEvaluation,
  TestTopic,
  UserResponse,
} from "../models";
import { generateValidationResponse } from "./validator";

const AI_MODEL = openai("gpt-4o");

export async function jungObject<T>({
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
