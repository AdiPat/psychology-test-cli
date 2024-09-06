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
