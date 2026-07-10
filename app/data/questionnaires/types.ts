export const answerOptions = ["Yes", "No", "Partially", "Not Applicable"] as const;

export type AnswerOption = (typeof answerOptions)[number];

export type QuestionnaireQuestion = {
  id: number;
  category: string;
  question: string;
  description?: string;
  recommendation: string;
  answer: null;
  comments: string;
};

export type Questionnaire = {
  slug: string;
  framework: string;
  shortName: string;
  description: string;
  difficulty: string;
  estimatedTime: string;
  estimatedMinutes: number;
  icon: string;
  answerOptions: AnswerOption[];
  categories: string[];
  questions: QuestionnaireQuestion[];
};

export type QuestionnaireSummary = Pick<
  Questionnaire,
  | "slug"
  | "framework"
  | "shortName"
  | "description"
  | "difficulty"
  | "estimatedTime"
  | "estimatedMinutes"
  | "icon"
> & {
  questionCount: number;
  categories: string[];
};
