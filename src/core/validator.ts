import { ValidationInput, ValidationResponse } from "../models";
import { jungObject } from "./ai";
import { z } from "zod";

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

export { generateValidationResponse };
