"use client";

import Image from "next/image";
import { useEffect, useMemo, useState } from "react";
import {
  PiArrowLeftDuotone,
  PiArrowRightDuotone,
  PiCheckCircleDuotone,
  PiDownloadSimpleDuotone,
  PiMagnifyingGlassDuotone,
  PiPrinterDuotone,
} from "react-icons/pi";
import type {
  AnswerOption,
  Questionnaire,
  QuestionnaireQuestion,
} from "../../data/questionnaires/types";

type ResponseState = {
  answer: AnswerOption | null;
  comments: string;
};

type ResponseMap = Record<number, ResponseState>;

type CategoryScore = {
  category: string;
  score: number;
  answered: number;
  possible: number;
};

type SubmitterValues = {
  name: string;
  email: string;
};

type SubmitterErrors = Partial<Record<keyof SubmitterValues, string>>;

const scoreMap: Record<Exclude<AnswerOption, "Not Applicable">, number> = {
  Yes: 1,
  Partially: 0.5,
  No: 0,
};
const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const initialSubmitterValues: SubmitterValues = {
  name: "",
  email: "",
};

function getReadiness(score: number) {
  if (score >= 90) {
    return "Excellent";
  }

  if (score >= 75) {
    return "Good";
  }

  if (score >= 55) {
    return "Needs Improvement";
  }

  return "High Risk";
}

function getScoreValue(answer: AnswerOption | null) {
  if (!answer || answer === "Not Applicable") {
    return null;
  }

  return scoreMap[answer];
}

function buildDefaultResponses(questions: QuestionnaireQuestion[]) {
  return questions.reduce<ResponseMap>((responses, question) => {
    responses[question.id] = {
      answer: null,
      comments: "",
    };
    return responses;
  }, {});
}

function mergeStoredResponses(
  questions: QuestionnaireQuestion[],
  stored: unknown,
) {
  const defaults = buildDefaultResponses(questions);

  if (!stored || typeof stored !== "object") {
    return defaults;
  }

  return questions.reduce<ResponseMap>((responses, question) => {
    const value = (stored as ResponseMap)[question.id];
    responses[question.id] = {
      answer: value?.answer ?? null,
      comments: value?.comments ?? "",
    };
    return responses;
  }, defaults);
}

function calculateCategoryScores(
  questionnaire: Questionnaire,
  responses: ResponseMap,
) {
  return questionnaire.categories.map<CategoryScore>((category) => {
    const questions = questionnaire.questions.filter(
      (question) => question.category === category,
    );
    const scored = questions
      .map((question) => getScoreValue(responses[question.id]?.answer ?? null))
      .filter((score): score is number => score !== null);
    const total = scored.reduce((sum, score) => sum + score, 0);

    return {
      category,
      score: scored.length ? Math.round((total / scored.length) * 100) : 0,
      answered: scored.length,
      possible: questions.length,
    };
  });
}

function calculateOverallScore(
  questions: QuestionnaireQuestion[],
  responses: ResponseMap,
) {
  const scored = questions
    .map((question) => getScoreValue(responses[question.id]?.answer ?? null))
    .filter((score): score is number => score !== null);
  const total = scored.reduce((sum, score) => sum + score, 0);

  return scored.length ? Math.round((total / scored.length) * 100) : 0;
}

function validateSubmitter(values: SubmitterValues) {
  const errors: SubmitterErrors = {};

  if (!values.name.trim()) {
    errors.name = "Please enter your name.";
  }

  if (!values.email.trim()) {
    errors.email = "Please enter your email.";
  } else if (!emailPattern.test(values.email.trim())) {
    errors.email = "Please enter a valid email address.";
  }

  return errors;
}

export default function QuestionnaireClient({
  questionnaire,
}: {
  questionnaire: Questionnaire;
}) {
  const storageKey = `auxgens-questionnaire-${questionnaire.slug}`;
  const defaultResponses = useMemo(
    () => buildDefaultResponses(questionnaire.questions),
    [questionnaire.questions],
  );
  const [responses, setResponses] = useState<ResponseMap>(defaultResponses);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [search, setSearch] = useState("");
  const [showResults, setShowResults] = useState(false);
  const [hydrated, setHydrated] = useState(false);
  const [submitter, setSubmitter] = useState<SubmitterValues>(
    initialSubmitterValues,
  );
  const [submitterErrors, setSubmitterErrors] = useState<SubmitterErrors>({});
  const [submitStatus, setSubmitStatus] = useState<
    "idle" | "loading" | "success" | "error"
  >("idle");
  const [submitError, setSubmitError] = useState("");
  const [submittedEmail, setSubmittedEmail] = useState("");

  useEffect(() => {
    try {
      const stored = window.localStorage.getItem(storageKey);
      if (stored) {
        setResponses(
          mergeStoredResponses(questionnaire.questions, JSON.parse(stored)),
        );
      }
    } catch {
      setResponses(defaultResponses);
    } finally {
      setHydrated(true);
    }
  }, [defaultResponses, questionnaire.questions, storageKey]);

  useEffect(() => {
    if (!hydrated) {
      return;
    }

    window.localStorage.setItem(storageKey, JSON.stringify(responses));
  }, [hydrated, responses, storageKey]);

  const currentQuestion = questionnaire.questions[currentIndex];
  const currentResponse = responses[currentQuestion.id] ?? {
    answer: null,
    comments: "",
  };
  const completedCount = questionnaire.questions.filter(
    (question) => responses[question.id]?.answer,
  ).length;
  const completionPercent = Math.round(
    (completedCount / questionnaire.questions.length) * 100,
  );
  const remainingCount = questionnaire.questions.length - completedCount;
  const estimatedRemaining = Math.max(
    1,
    Math.round(
      (remainingCount / questionnaire.questions.length) *
        questionnaire.estimatedMinutes,
    ),
  );
  const overallScore = calculateOverallScore(questionnaire.questions, responses);
  const readiness = getReadiness(overallScore);
  const categoryScores = calculateCategoryScores(questionnaire, responses);
  const recommendations = questionnaire.questions
    .filter((question) => {
      const answer = responses[question.id]?.answer;
      return answer === "No" || answer === "Partially";
    })
    .slice(0, 8);
  const searchResults = questionnaire.questions.filter((question) => {
    const value = `${question.category} ${question.question} ${question.description ?? ""}`.toLowerCase();
    return value.includes(search.trim().toLowerCase());
  });

  const updateAnswer = (answer: AnswerOption) => {
    setResponses((current) => ({
      ...current,
      [currentQuestion.id]: {
        ...current[currentQuestion.id],
        answer,
      },
    }));
  };

  const updateComments = (comments: string) => {
    setResponses((current) => ({
      ...current,
      [currentQuestion.id]: {
        ...current[currentQuestion.id],
        comments,
      },
    }));
  };

  const updateSubmitter = (field: keyof SubmitterValues, value: string) => {
    setSubmitter((current) => ({
      ...current,
      [field]: value,
    }));

    if (submitterErrors[field]) {
      setSubmitterErrors((current) => ({
        ...current,
        [field]: undefined,
      }));
    }

    if (submitStatus !== "idle") {
      setSubmitStatus("idle");
      setSubmitError("");
    }
  };

  const jumpToCategory = (category: string) => {
    const nextIndex = questionnaire.questions.findIndex(
      (question) => question.category === category,
    );

    if (nextIndex >= 0) {
      setCurrentIndex(nextIndex);
      setShowResults(false);
    }
  };

  const persistResponses = () => {
    window.localStorage.setItem(storageKey, JSON.stringify(responses));
  };

  const submitAssessment = async () => {
    const nextErrors = validateSubmitter(submitter);
    setSubmitterErrors(nextErrors);

    if (Object.keys(nextErrors).length > 0) {
      setSubmitStatus("error");
      setSubmitError("Please add your name and email before submitting.");
      return;
    }

    persistResponses();
    setSubmitStatus("loading");
    setSubmitError("");

    try {
      const response = await fetch("/api/questionnaire", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          slug: questionnaire.slug,
          name: submitter.name.trim(),
          email: submitter.email.trim(),
          responses: questionnaire.questions.map((question) => ({
            id: question.id,
            answer: responses[question.id]?.answer ?? null,
            comments: responses[question.id]?.comments ?? "",
          })),
        }),
      });
      const result = (await response.json()) as {
        success?: boolean;
        error?: string;
      };

      if (!response.ok || !result.success) {
        throw new Error(result.error || "We could not send your assessment.");
      }

      setSubmitStatus("success");
      setSubmittedEmail(submitter.email.trim());
      setShowResults(true);
      window.scrollTo({ top: 0, behavior: "smooth" });
    } catch (error) {
      setSubmitStatus("error");
      setSubmitError(
        error instanceof Error
          ? error.message
          : "We could not send your assessment. Please try again.",
      );
    }
  };

  const downloadJson = () => {
    const report = {
      framework: questionnaire.framework,
      completedAt: new Date().toISOString(),
      overallScore,
      readiness,
      categoryScores,
      responses: questionnaire.questions.map((question) => ({
        id: question.id,
        category: question.category,
        question: question.question,
        answer: responses[question.id]?.answer ?? null,
        comments: responses[question.id]?.comments ?? "",
      })),
      recommendations: recommendations.map((question) => question.recommendation),
    };
    const blob = new Blob([JSON.stringify(report, null, 2)], {
      type: "application/json",
    });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = `${questionnaire.slug}-assessment-report.json`;
    link.click();
    URL.revokeObjectURL(url);
  };

  const printReport = () => {
    window.print();
  };

  if (showResults) {
    return (
      <section className="questionnaire-shell questionnaire-results-shell">
        <div className="wrap">
          <div className="questionnaire-results-head">
            <div className="questionnaire-report-brand">
              <Image
                src="/logo_3d.gif"
                alt="Auxgens"
                width={72}
                height={72}
                unoptimized
              />
              <div>
                <span>Auxgens</span>
                <strong>Assessment Report</strong>
              </div>
            </div>
            <a href="/questionnaire" className="questionnaire-back-link">
              <PiArrowLeftDuotone aria-hidden="true" focusable="false" />
              All questionnaires
            </a>
            <p className="eyebrow">{questionnaire.framework} results</p>
            <h1>{overallScore}%</h1>
            <p className="questionnaire-readiness">
              Readiness: <strong>{readiness}</strong>
            </p>
            {submittedEmail && (
              <p className="questionnaire-email-note">
                A feedback email has been sent to {submittedEmail}.
              </p>
            )}
            <div className="questionnaire-export-actions">
              <button type="button" className="btn-border" onClick={printReport}>
                <PiPrinterDuotone aria-hidden="true" focusable="false" />
                Print Report
              </button>
              <button type="button" className="btn-border" onClick={printReport}>
                <PiDownloadSimpleDuotone aria-hidden="true" focusable="false" />
                Download PDF
              </button>
              <button type="button" className="btn-lime" onClick={downloadJson}>
                <PiDownloadSimpleDuotone aria-hidden="true" focusable="false" />
                Download JSON
              </button>
            </div>
          </div>

          <div className="questionnaire-results-grid">
            <section className="questionnaire-result-panel">
              <div className="questionnaire-panel-head">
                <span>Category scores</span>
                <strong>{completedCount}/{questionnaire.questions.length}</strong>
              </div>
              <div className="questionnaire-score-list">
                {categoryScores.map((category) => (
                  <div key={category.category} className="questionnaire-score-row">
                    <div>
                      <span>{category.category}</span>
                      <small>
                        {category.answered} of {category.possible} scored
                      </small>
                    </div>
                    <strong>{category.score}%</strong>
                    <span className="questionnaire-score-track">
                      <span style={{ width: `${category.score}%` }} />
                    </span>
                  </div>
                ))}
              </div>
            </section>

            <section className="questionnaire-result-panel">
              <div className="questionnaire-panel-head">
                <span>Recommendations</span>
                <strong>{recommendations.length || "Clear"}</strong>
              </div>
              <div className="questionnaire-recommendations">
                {recommendations.length ? (
                  recommendations.map((question) => (
                    <article key={question.id} className="questionnaire-rec-card">
                      <span>{question.category}</span>
                      <p>{question.recommendation}</p>
                    </article>
                  ))
                ) : (
                  <article className="questionnaire-rec-card">
                    <span>{questionnaire.framework}</span>
                    <p>
                      No priority gaps were selected. Keep evidence current and
                      repeat the assessment after major system or process changes.
                    </p>
                  </article>
                )}
              </div>
            </section>
          </div>

          <div className="questionnaire-results-actions">
            <button
              type="button"
              className="btn-border"
              onClick={() => setShowResults(false)}
            >
              Return to Answers
            </button>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="questionnaire-shell">
      <div className="wrap">
        <div className="questionnaire-topbar">
          <a href="/questionnaire" className="questionnaire-back-link">
            <PiArrowLeftDuotone aria-hidden="true" focusable="false" />
            All questionnaires
          </a>
        </div>

        <div className="questionnaire-header">
          <div>
            <p className="eyebrow">{questionnaire.framework} assessment</p>
            <h1>{questionnaire.description}</h1>
          </div>
          <div className="questionnaire-progress-card">
            <span>Question {currentIndex + 1} of {questionnaire.questions.length}</span>
            <strong>{completionPercent}%</strong>
            <div className="questionnaire-progress-track" aria-hidden="true">
              <span style={{ width: `${completionPercent}%` }} />
            </div>
          </div>
        </div>

        <div className="questionnaire-dashboard" aria-label="Assessment dashboard">
          <div>
            <span>Completed</span>
            <strong>{completedCount}</strong>
          </div>
          <div>
            <span>Remaining</span>
            <strong>{remainingCount}</strong>
          </div>
          <div>
            <span>Progress</span>
            <strong>{completionPercent}%</strong>
          </div>
          <div>
            <span>Time left</span>
            <strong>{estimatedRemaining} min</strong>
          </div>
        </div>

        <div className="questionnaire-layout">
          <aside className="questionnaire-sidebar" aria-label="Question categories">
            <label className="questionnaire-search">
              <span>
                <PiMagnifyingGlassDuotone aria-hidden="true" focusable="false" />
                Search questions
              </span>
              <input
                type="search"
                value={search}
                onChange={(event) => setSearch(event.target.value)}
                placeholder="Encryption, vendor, backup"
              />
            </label>

            <div className="questionnaire-category-list">
              <p>Categories</p>
              {questionnaire.categories.map((category) => {
                const categoryTotal = questionnaire.questions.filter(
                  (question) => question.category === category,
                ).length;
                const categoryDone = questionnaire.questions.filter(
                  (question) =>
                    question.category === category &&
                    responses[question.id]?.answer,
                ).length;

                return (
                  <button
                    key={category}
                    type="button"
                    className={
                      currentQuestion.category === category ? "is-active" : ""
                    }
                    onClick={() => jumpToCategory(category)}
                  >
                    <span>{category}</span>
                    <small>{categoryDone}/{categoryTotal}</small>
                  </button>
                );
              })}
            </div>

            {search.trim() && (
              <div className="questionnaire-search-results">
                <p>{searchResults.length} matches</p>
                {searchResults.slice(0, 6).map((question) => {
                  const index = questionnaire.questions.findIndex(
                    (item) => item.id === question.id,
                  );
                  return (
                    <button
                      key={question.id}
                      type="button"
                      onClick={() => setCurrentIndex(index)}
                    >
                      <span>{question.category}</span>
                      {question.question}
                    </button>
                  );
                })}
              </div>
            )}
          </aside>

          <article className="questionnaire-card">
            <div className="questionnaire-question-meta">
              <span>Category: {currentQuestion.category}</span>
              {currentResponse.answer && (
                <strong>
                  <PiCheckCircleDuotone aria-hidden="true" focusable="false" />
                  Answered
                </strong>
              )}
            </div>
            <h2>{currentQuestion.question}</h2>
            {currentQuestion.description && (
              <p className="questionnaire-question-desc">
                {currentQuestion.description}
              </p>
            )}

            <div className="questionnaire-options" role="radiogroup" aria-label="Answer options">
              {questionnaire.answerOptions.map((answer) => (
                <button
                  key={answer}
                  type="button"
                  className={currentResponse.answer === answer ? "is-selected" : ""}
                  role="radio"
                  aria-checked={currentResponse.answer === answer}
                  onClick={() => updateAnswer(answer)}
                >
                  <span />
                  {answer}
                </button>
              ))}
            </div>

            <label className="questionnaire-comments">
              <span>Comments</span>
              <textarea
                value={currentResponse.comments}
                onChange={(event) => updateComments(event.target.value)}
                placeholder="Add evidence notes, exceptions, or owner details."
                rows={4}
              />
            </label>

            {currentIndex === questionnaire.questions.length - 1 && (
              <section className="questionnaire-submit-panel">
                <div className="questionnaire-submit-head">
                  <p className="eyebrow">Submission details</p>
                  <h3>Where should we send the feedback?</h3>
                </div>
                <div className="questionnaire-submission-grid">
                  <div className="field-block">
                    <label htmlFor="assessment-name">Full name *</label>
                    <input
                      id="assessment-name"
                      type="text"
                      autoComplete="name"
                      value={submitter.name}
                      onChange={(event) =>
                        updateSubmitter("name", event.target.value)
                      }
                      aria-invalid={Boolean(submitterErrors.name)}
                      aria-describedby="assessment-name-help assessment-name-error"
                    />
                    <span id="assessment-name-help" className="field-help">
                      This appears on the assessment sent to our team.
                    </span>
                    {submitterErrors.name && (
                      <span id="assessment-name-error" className="field-error">
                        {submitterErrors.name}
                      </span>
                    )}
                  </div>
                  <div className="field-block">
                    <label htmlFor="assessment-email">Email *</label>
                    <input
                      id="assessment-email"
                      type="email"
                      autoComplete="email"
                      value={submitter.email}
                      onChange={(event) =>
                        updateSubmitter("email", event.target.value)
                      }
                      aria-invalid={Boolean(submitterErrors.email)}
                      aria-describedby="assessment-email-help assessment-email-error"
                    />
                    <span id="assessment-email-help" className="field-help">
                      We will send the feedback summary here.
                    </span>
                    {submitterErrors.email && (
                      <span id="assessment-email-error" className="field-error">
                        {submitterErrors.email}
                      </span>
                    )}
                  </div>
                </div>
                <p
                  className={`questionnaire-submit-status questionnaire-submit-status-${submitStatus}`}
                  aria-live="polite"
                >
                  {
                    {
                      idle: "Fields marked with an asterisk are required.",
                      loading: "Sending assessment and feedback email...",
                      success: "Assessment submitted. Your feedback email is on its way.",
                      error: submitError,
                    }[submitStatus]
                  }
                </p>
              </section>
            )}

            <div className="questionnaire-nav-actions">
              <button
                type="button"
                className="btn-border"
                onClick={() => setCurrentIndex((index) => Math.max(0, index - 1))}
                disabled={currentIndex === 0}
              >
                Previous
              </button>
              {currentIndex === questionnaire.questions.length - 1 ? (
                <button
                  type="button"
                  className="btn-lime questionnaire-submit"
                  onClick={submitAssessment}
                  disabled={submitStatus === "loading"}
                >
                  {submitStatus === "loading"
                    ? "Submitting..."
                    : "Submit Assessment"}
                  <PiArrowRightDuotone aria-hidden="true" focusable="false" />
                </button>
              ) : (
                <button
                  type="button"
                  className="btn-lime"
                  onClick={() =>
                    setCurrentIndex((index) =>
                      Math.min(questionnaire.questions.length - 1, index + 1),
                    )
                  }
                >
                  Next
                  <PiArrowRightDuotone aria-hidden="true" focusable="false" />
                </button>
              )}
            </div>
          </article>
        </div>
      </div>
    </section>
  );
}
