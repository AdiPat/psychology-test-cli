import { Data } from "../data";
import { ValidationInput, InputProcessorResult, StandardTest } from "../models";
import { jungObject } from "./ai";
import { z } from "zod";
import { Utils } from "./utils";

async function getChoiceFromStandardOptions(): Promise<StandardTest> {
  console.table(
    Data.STANDARD_TESTS.map((test, index) => ({
      index: index + 1,
      name: test.name,
      description: test.description,
    }))
  );
  console.log("Select your option by entering the index of the test.");

  const index = await Utils.questionAsync("Enter your choice: ");
  const selectedTest = Data.STANDARD_TESTS[parseInt(index) - 1];

  if (selectedTest) {
    console.log(
      `Selected Test Name: ${selectedTest.name} | Selected Test Description: ${selectedTest.description}`
    );
    return selectedTest;
  } else {
    console.log("Invalid choice. Please select a valid option.");
    return getChoiceFromStandardOptions();
  }
}

async function processInputs(
  validationInput: ValidationInput
): Promise<InputProcessorResult> {
  const { object: validationOutput } = await jungObject<InputProcessorResult>({
    prompt: `Tell me if it is possible to generate a psychology evaluation for the given parameters with known concepts / knowledge in modern psychology. 
          If no, suggest a valid name and description that can be turned into a psychology quiz that will be used to evaluate a certain metric or score for a candidate.
          Test Name: ${validationInput.name}  
          Test Description: ${validationInput.description}`,
    schema: z.object({
      canBeAPsychologyQuiz: z.boolean(),
      suggestedStandardTest: z.object({
        name: z.string(),
        description: z.string(),
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
    }),
  });

  if (!validationOutput.canBeAPsychologyQuiz) {
    console.log(
      `The given test name('${validationInput.name}') and description('${validationInput.description}') cannot be used to generate a psychology quiz.`
    );

    console.log(
      `Suggested Name: ${validationOutput.suggestedStandardTest.name} | Suggested Description: ${validationOutput.suggestedStandardTest.description}`
    );

    console.log(
      "Press 'y' to generate a quiz with the suggested name and description."
    );
    console.log("Press 'p' to print other options. ");

    const option = await Utils.questionAsync("Enter your choice: ");

    if (option === "y") {
      // Generate a quiz with the suggested name and description
      return {
        canBeAPsychologyQuiz: true,
        suggestedStandardTest: validationOutput.suggestedStandardTest,
      };
    } else if (option === "p") {
      const standardTest = await getChoiceFromStandardOptions();

      return {
        canBeAPsychologyQuiz: true,
        suggestedStandardTest: standardTest,
      };
    }
  }

  console.log(
    `The given test name('${validationInput.name}') and description('${validationInput.description}') can be used to generate a psychology quiz.`
  );

  console.log(
    "We have rephrased the name and description for a quiz (evaluation) of higher quality. "
  );

  console.log(
    `Suggested Name: ${validationOutput.suggestedStandardTest.name} | Suggested Description: ${validationOutput.suggestedStandardTest.description}`
  );

  return validationOutput;
}

export { processInputs };
