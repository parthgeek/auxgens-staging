import gdpr from "./gdpr.json";
import iso27001 from "./iso27001.json";
import soc2 from "./soc2.json";
import type { Questionnaire, QuestionnaireSummary } from "./types";
import vapt from "./vapt.json";

export const questionnaires = [
  soc2,
  iso27001,
  gdpr,
  vapt,
] as Questionnaire[];

export const questionnaireMap = new Map(
  questionnaires.map((questionnaire) => [questionnaire.slug, questionnaire]),
);

export const frameworkSummaries: QuestionnaireSummary[] = questionnaires.map(
  (questionnaire) => ({
    slug: questionnaire.slug,
    framework: questionnaire.framework,
    shortName: questionnaire.shortName,
    description: questionnaire.description,
    difficulty: questionnaire.difficulty,
    estimatedTime: questionnaire.estimatedTime,
    estimatedMinutes: questionnaire.estimatedMinutes,
    icon: questionnaire.icon,
    questionCount: questionnaire.questions.length,
    categories: questionnaire.categories,
  }),
);

export function getQuestionnaire(slug: string) {
  return questionnaireMap.get(slug);
}
