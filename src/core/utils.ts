import { openai } from "@ai-sdk/openai";
import { generateText } from "ai";
import { customAlphabet } from "nanoid";

function cleanGPTJson(json: string): string {
  if (!json || json.length === 0) {
    return "";
  }

  return json.replace(/^```json\n|\n```$/g, "").replace(/\r?\n|\r/g, "");
}

async function summarize(content: string) {
  try {
    const { text } = await generateText({
      model: openai("gpt-4o"),
      system: "You are summarizing a text. Write a summary of the text.",
      prompt: `Text: "${content}"`,
    });

    return text;
  } catch (error) {
    console.error("summarize: failed to summarize content", error);
    return "";
  }
}

function isValidURL(url: string) {
  try {
    new URL(url);
    return true;
  } catch (error) {
    return false;
  }
}

function parseJSON(json: string): any {
  try {
    return JSON.parse(json);
  } catch (error) {
    return null;
  }
}

function generateRandomIntID(size = 16): number {
  const nanoid = customAlphabet("1234567890", size);
  return parseInt(nanoid());
}

const Utils = {
  cleanGPTJson,
  summarize,
  isValidURL,
  parseJSON,
  generateRandomIntID,
};

export { Utils };
