import nodemailer from "nodemailer";
import { NextResponse } from "next/server";
import { getQuestionnaire } from "../../data/questionnaires";
import type { AnswerOption } from "../../data/questionnaires/types";

export const runtime = "nodejs";

type SmtpError = Error & {
  code?: string;
  responseCode?: number;
};

type SubmittedResponse = {
  id: number;
  answer: AnswerOption | null;
  comments: string;
};

type AssessmentPayload = {
  slug: string;
  name: string;
  email: string;
  responses: SubmittedResponse[];
};

const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const websiteUrl = "https://auxgens.net";
const signatureImageUrl =
  "https://cdn.postimage.me/2026/06/12/WhatsApp-Image-2026-06-13-at-01.23.46.jpeg";
const scoreMap: Record<Exclude<AnswerOption, "Not Applicable">, number> = {
  Yes: 1,
  Partially: 0.5,
  No: 0,
};

function escapeHtml(value: string) {
  return value.replace(
    /[&<>"']/g,
    (character) =>
      ({
        "&": "&amp;",
        "<": "&lt;",
        ">": "&gt;",
        '"': "&quot;",
        "'": "&#039;",
      })[character] ?? character,
  );
}

function readString(value: unknown, maxLength: number) {
  return typeof value === "string" ? value.trim().slice(0, maxLength) : "";
}

function singleLine(value: string) {
  return value.replace(/[\r\n]+/g, " ").trim();
}

function isSmtpAuthError(error: unknown): error is SmtpError {
  if (!(error instanceof Error)) {
    return false;
  }

  const smtpError = error as SmtpError;
  return smtpError.code === "EAUTH" || smtpError.responseCode === 534;
}

function emailUnavailable(message: string) {
  return NextResponse.json(
    {
      error:
        process.env.NODE_ENV === "development"
          ? message
          : "Email is temporarily unavailable. Please try again shortly.",
    },
    { status: 503 },
  );
}

function getScoreValue(answer: AnswerOption | null) {
  if (!answer || answer === "Not Applicable") {
    return null;
  }

  return scoreMap[answer];
}

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

function parsePayload(value: unknown): AssessmentPayload | null {
  if (!value || typeof value !== "object" || Array.isArray(value)) {
    return null;
  }

  const body = value as Record<string, unknown>;
  const responses = Array.isArray(body.responses) ? body.responses : [];
  const payload: AssessmentPayload = {
    slug: readString(body.slug, 80),
    name: readString(body.name, 120),
    email: readString(body.email, 254),
    responses: responses.map((item) => {
      const response =
        item && typeof item === "object" ? (item as Record<string, unknown>) : {};
      return {
        id: Number(response.id),
        answer:
          response.answer === "Yes" ||
          response.answer === "No" ||
          response.answer === "Partially" ||
          response.answer === "Not Applicable"
            ? response.answer
            : null,
        comments: readString(response.comments, 3000),
      };
    }),
  };

  if (
    !payload.slug ||
    !payload.name ||
    !emailPattern.test(payload.email) ||
    payload.responses.length === 0
  ) {
    return null;
  }

  return payload;
}

export async function POST(request: Request) {
  let payload: AssessmentPayload | null = null;

  try {
    payload = parsePayload(await request.json());
  } catch {
    return NextResponse.json(
      { error: "The assessment details could not be read." },
      { status: 400 },
    );
  }

  if (!payload) {
    return NextResponse.json(
      { error: "Please provide your name, valid email, and assessment responses." },
      { status: 400 },
    );
  }

  const questionnaire = getQuestionnaire(payload.slug);

  if (!questionnaire) {
    return NextResponse.json(
      { error: "The selected questionnaire is not available." },
      { status: 404 },
    );
  }

  const responseMap = new Map(payload.responses.map((response) => [response.id, response]));
  const normalizedResponses = questionnaire.questions.map((question) => {
    const response = responseMap.get(question.id);
    return {
      id: question.id,
      category: question.category,
      question: question.question,
      recommendation: question.recommendation,
      answer: response?.answer ?? null,
      comments: response?.comments ?? "",
    };
  });

  const scored = normalizedResponses
    .map((response) => getScoreValue(response.answer))
    .filter((score): score is number => score !== null);
  const overallScore = scored.length
    ? Math.round((scored.reduce((sum, score) => sum + score, 0) / scored.length) * 100)
    : 0;
  const readiness = getReadiness(overallScore);
  const categoryScores = questionnaire.categories.map((category) => {
    const categoryResponses = normalizedResponses.filter(
      (response) => response.category === category,
    );
    const categoryScored = categoryResponses
      .map((response) => getScoreValue(response.answer))
      .filter((score): score is number => score !== null);
    const score = categoryScored.length
      ? Math.round(
          (categoryScored.reduce((sum, value) => sum + value, 0) /
            categoryScored.length) *
            100,
        )
      : 0;

    return {
      category,
      score,
      answered: categoryScored.length,
      possible: categoryResponses.length,
    };
  });
  const recommendations = normalizedResponses
    .filter((response) => response.answer === "No" || response.answer === "Partially")
    .slice(0, 8)
    .map((response) => response.recommendation);

  const smtpUser = process.env.SMTP_USER;
  const smtpPass = process.env.SMTP_PASS?.replace(/\s+/g, "");
  const smtpHost = process.env.SMTP_HOST ?? "smtp.gmail.com";
  const smtpPort = Number(process.env.SMTP_PORT ?? "587");
  const smtpSecure =
    process.env.SMTP_SECURE === undefined
      ? false
      : process.env.SMTP_SECURE === "true";

  if (!smtpUser || !smtpPass || !Number.isInteger(smtpPort)) {
    console.error("Questionnaire SMTP configuration is incomplete.");
    return emailUnavailable(
      "Email is not configured locally. Add SMTP_USER and SMTP_PASS to .env.local, then restart the dev server.",
    );
  }

  if (smtpHost === "smtp.gmail.com" && smtpPass.length !== 16) {
    console.error(
      "Questionnaire Gmail authentication requires a 16-character app password in SMTP_PASS.",
    );
    return emailUnavailable(
      "Gmail SMTP requires a 16-character app password in SMTP_PASS. Update .env.local, then restart the dev server.",
    );
  }

  const contactAddress = process.env.CONTACT_TO ?? smtpUser;
  const fromAddress = process.env.SMTP_FROM ?? `Auxgens <${smtpUser}>`;
  const safeName = singleLine(payload.name);
  const safeFramework = singleLine(questionnaire.framework);
  const submittedAt = new Date().toLocaleString("en-IN", {
    dateStyle: "medium",
    timeStyle: "short",
    timeZone: "Asia/Kolkata",
  });

  const categoryRows = categoryScores
    .map(
      (category) =>
        `<tr>
          <td style="padding:8px 16px 8px 0;color:#101828;font-weight:600">${escapeHtml(category.category)}</td>
          <td style="padding:8px 0;color:#475467">${category.score}% (${category.answered}/${category.possible} scored)</td>
        </tr>`,
    )
    .join("");
  const responseRows = normalizedResponses
    .map(
      (response) =>
        `<tr>
          <td style="padding:12px 12px 12px 0;border-top:1px solid #e4eadf;color:#667085;vertical-align:top">${response.id}</td>
          <td style="padding:12px;border-top:1px solid #e4eadf;vertical-align:top">
            <strong style="display:block;color:#101828">${escapeHtml(response.question)}</strong>
            <span style="display:block;color:#667085;margin-top:4px">${escapeHtml(response.category)}</span>
            ${
              response.comments
                ? `<span style="display:block;margin-top:8px;color:#344054;white-space:pre-wrap">${escapeHtml(response.comments)}</span>`
                : ""
            }
          </td>
          <td style="padding:12px 0 12px 12px;border-top:1px solid #e4eadf;color:#101828;font-weight:700;vertical-align:top">${escapeHtml(response.answer ?? "Unanswered")}</td>
        </tr>`,
    )
    .join("");
  const recommendationHtml = recommendations.length
    ? recommendations
        .map((recommendation) => `<li>${escapeHtml(recommendation)}</li>`)
        .join("")
    : "<li>No priority gaps were selected. Keep evidence current and reassess after major changes.</li>";

  const transporter = nodemailer.createTransport({
    host: smtpHost,
    port: smtpPort,
    secure: smtpSecure,
    requireTLS: smtpHost === "smtp.gmail.com" && !smtpSecure,
    auth: {
      user: smtpUser,
      pass: smtpPass,
    },
    connectionTimeout: 15_000,
    greetingTimeout: 15_000,
    socketTimeout: 20_000,
  });

  try {
    await transporter.sendMail({
      from: fromAddress,
      to: contactAddress,
      replyTo: {
        name: safeName,
        address: payload.email,
      },
      subject: `Questionnaire submission: ${safeFramework} - ${safeName}`,
      text: [
        "A new questionnaire assessment was submitted through the Auxgens website.",
        "",
        `Framework: ${questionnaire.framework}`,
        `Name: ${payload.name}`,
        `Email: ${payload.email}`,
        `Submitted: ${submittedAt}`,
        `Overall score: ${overallScore}%`,
        `Readiness: ${readiness}`,
        "",
        "Category scores:",
        ...categoryScores.map(
          (category) =>
            `${category.category}: ${category.score}% (${category.answered}/${category.possible} scored)`,
        ),
        "",
        "Responses:",
        ...normalizedResponses.map(
          (response) =>
            `${response.id}. [${response.category}] ${response.question}\nAnswer: ${response.answer ?? "Unanswered"}${
              response.comments ? `\nComments: ${response.comments}` : ""
            }`,
        ),
      ].join("\n"),
      html: `
        <div style="font-family:Arial,sans-serif;max-width:760px;margin:0 auto;color:#101828;line-height:1.6">
          <h1 style="font-size:24px;margin:0 0 8px">New questionnaire submission</h1>
          <p style="color:#475467;margin:0 0 20px">A client completed a ${escapeHtml(questionnaire.framework)} assessment.</p>
          <table style="border-collapse:collapse;margin:20px 0">
            <tr><td style="padding:6px 16px 6px 0;color:#667085">Name</td><td style="padding:6px 0;font-weight:700">${escapeHtml(payload.name)}</td></tr>
            <tr><td style="padding:6px 16px 6px 0;color:#667085">Email</td><td style="padding:6px 0;font-weight:700">${escapeHtml(payload.email)}</td></tr>
            <tr><td style="padding:6px 16px 6px 0;color:#667085">Framework</td><td style="padding:6px 0;font-weight:700">${escapeHtml(questionnaire.framework)}</td></tr>
            <tr><td style="padding:6px 16px 6px 0;color:#667085">Submitted</td><td style="padding:6px 0;font-weight:700">${escapeHtml(submittedAt)}</td></tr>
            <tr><td style="padding:6px 16px 6px 0;color:#667085">Overall score</td><td style="padding:6px 0;font-weight:700">${overallScore}% - ${escapeHtml(readiness)}</td></tr>
          </table>
          <h2 style="font-size:16px;margin:24px 0 8px">Category scores</h2>
          <table style="border-collapse:collapse;margin:0 0 24px">${categoryRows}</table>
          <h2 style="font-size:16px;margin:24px 0 8px">Responses</h2>
          <table style="border-collapse:collapse;width:100%">${responseRows}</table>
        </div>
      `,
    });

    await transporter.sendMail({
      from: fromAddress,
      to: {
        name: safeName,
        address: payload.email,
      },
      replyTo: contactAddress,
      subject: `Your Auxgens ${questionnaire.framework} assessment feedback`,
      text: [
        `Hello ${payload.name},`,
        "",
        `Thank you for completing the ${questionnaire.framework} assessment.`,
        `Overall score: ${overallScore}%`,
        `Readiness: ${readiness}`,
        "",
        "Recommended next steps:",
        ...recommendations.slice(0, 5).map((recommendation) => `- ${recommendation}`),
        "",
        "Our team has also received your full responses and can help review the gaps in detail.",
        "",
        "Regards,",
        "Team Auxgens",
        contactAddress,
        websiteUrl,
      ].join("\n"),
      html: `
        <div style="font-family:Arial,sans-serif;max-width:640px;margin:0 auto;color:#101828;line-height:1.6">
          <p>Hello ${escapeHtml(payload.name)},</p>
          <p>Thank you for completing the <strong>${escapeHtml(questionnaire.framework)}</strong> assessment. Your responses have been received by Auxgens.</p>
          <div style="padding:18px 20px;background:#f2f7ef;border:1px solid #cfe5c4;border-radius:10px;margin:20px 0">
            <p style="margin:0;color:#475467">Overall score</p>
            <p style="margin:4px 0 0;font-size:32px;font-weight:700;color:#1b4d22">${overallScore}%</p>
            <p style="margin:8px 0 0;color:#344054">Readiness: <strong>${escapeHtml(readiness)}</strong></p>
          </div>
          <h2 style="font-size:16px;margin:22px 0 8px">Recommended next steps</h2>
          <ul style="padding-left:20px;color:#344054">${recommendationHtml}</ul>
          <p>Our team has also received your full responses and can help review the gaps in detail.</p>
          <p style="margin:28px 0 12px">Regards,</p>
          <a href="${websiteUrl}" target="_blank" rel="noopener noreferrer" style="display:inline-block;max-width:560px;text-decoration:none">
            <img
              src="${signatureImageUrl}"
              alt="Team Auxgens - visit auxgens.net"
              width="560"
              style="display:block;width:100%;max-width:560px;height:auto;border:0"
            />
          </a>
        </div>
      `,
    });

    return NextResponse.json({
      success: true,
      overallScore,
      readiness,
      categoryScores,
      recommendations,
    });
  } catch (error) {
    if (isSmtpAuthError(error)) {
      console.error(
        "Questionnaire SMTP authentication failed. For Gmail, use a 16-character app password generated after enabling 2-Step Verification.",
      );
      return emailUnavailable(
        "SMTP authentication failed. For Gmail, use a 16-character app password generated after enabling 2-Step Verification.",
      );
    }

    console.error("Questionnaire email delivery failed:", error);
    return NextResponse.json(
      { error: "We could not send your assessment. Please try again shortly." },
      { status: 502 },
    );
  } finally {
    transporter.close();
  }
}
