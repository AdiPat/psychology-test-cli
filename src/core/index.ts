import { Command } from "commander";
import { JungAI } from "./ai";

async function run() {
  const program = new Command();

  program
    .option("--generate <type>", "Generate a test")
    .option("--run", "Run a generated test.")
    .option("--name <name>", "Test name")
    .option("--description <description>", "Test description")
    .helpOption("-h, --help", "Display help for command")
    .parse(process.argv);

  const { name, description, generate, help, run } = program.opts();

  if (!run && !generate && !help) {
    console.error("Error: Please provide a command to run.");
    program.help();
    process.exit(1);
  }

  if (!name) {
    console.error("Error: Test name is required");
    process.exit(1);
  }

  if (!description) {
    console.error("Error: Test description is required");
    process.exit(1);
  }

  if (!generate) {
    console.error("Error: Test type is required");
    process.exit(1);
  }

  if (help) {
    program.help();
    process.exit(0);
  }

  await JungAI.generateValidationResponse({ name, description });
}

export { run };
