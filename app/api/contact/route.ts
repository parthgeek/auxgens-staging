import nodemailer from "nodemailer";
import { NextResponse } from "next/server";

export const runtime = "nodejs";

type ContactPayload = {
  name: string;
  email: string;
  company: string;
  service: string;
  region: string;
  message: string;
};

type SmtpError = Error & {
  code?: string;
  responseCode?: number;
};

const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

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

function parsePayload(value: unknown): ContactPayload | null {
  if (!value || typeof value !== "object" || Array.isArray(value)) {
    return null;
  }

  const body = value as Record<string, unknown>;
  const payload: ContactPayload = {
    name: readString(body.name, 120),
    email: readString(body.email, 254),
    company: readString(body.company, 160),
    service: readString(body.service, 120),
    region: readString(body.region, 120),
    message: readString(body.message, 5000),
  };

  if (
    !payload.name ||
    !emailPattern.test(payload.email) ||
    !payload.service ||
    !payload.message
  ) {
    return null;
  }

  return payload;
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

export async function POST(request: Request) {
  let payload: ContactPayload | null = null;

  try {
    payload = parsePayload(await request.json());
  } catch {
    return NextResponse.json(
      { error: "The enquiry details could not be read." },
      { status: 400 },
    );
  }

  if (!payload) {
    return NextResponse.json(
      { error: "Please complete all required fields with valid details." },
      { status: 400 },
    );
  }

  const smtpUser = process.env.SMTP_USER;
  const smtpPass = process.env.SMTP_PASS?.replace(/\s+/g, "");
  const smtpHost = process.env.SMTP_HOST ?? "smtp.gmail.com";
  const smtpPort = Number(process.env.SMTP_PORT ?? "587");
  const smtpSecure =
    process.env.SMTP_SECURE === undefined
      ? false
      : process.env.SMTP_SECURE === "true";

  if (!smtpUser || !smtpPass || !Number.isInteger(smtpPort)) {
    console.error("Contact form SMTP configuration is incomplete.");
    return NextResponse.json(
      { error: "Email is temporarily unavailable. Please try again shortly." },
      { status: 503 },
    );
  }

  if (smtpHost === "smtp.gmail.com" && smtpPass.length !== 16) {
    console.error(
      "Contact form Gmail authentication requires a 16-character app password in SMTP_PASS.",
    );
    return NextResponse.json(
      { error: "Email is temporarily unavailable. Please try again shortly." },
      { status: 503 },
    );
  }

  const contactAddress = process.env.CONTACT_TO ?? smtpUser;
  const fromAddress = process.env.SMTP_FROM ?? `Auxgens <${smtpUser}>`;
  const safeName = singleLine(payload.name);
  const safeService = singleLine(payload.service);

  const details = [
    ["Name", payload.name],
    ["Email", payload.email],
    ["Company", payload.company || "Not provided"],
    ["Service interest", payload.service],
    ["Region", payload.region || "Not provided"],
  ];

  const detailsHtml = details
    .map(
      ([label, value]) =>
        `<tr>
          <td style="padding:8px 16px 8px 0;color:#667085;vertical-align:top">${escapeHtml(label)}</td>
          <td style="padding:8px 0;color:#101828;font-weight:600">${escapeHtml(value)}</td>
        </tr>`,
    )
    .join("");

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
      subject: `Website enquiry: ${safeService} - ${safeName}`,
      text: [
        "A new enquiry was submitted through the Auxgens website.",
        "",
        ...details.map(([label, value]) => `${label}: ${value}`),
        "",
        "Message:",
        payload.message,
      ].join("\n"),
      html: `
        <div style="font-family:Arial,sans-serif;max-width:680px;margin:0 auto;color:#101828">
          <h1 style="font-size:24px;margin:0 0 16px">New website enquiry</h1>
          <p style="color:#475467">A new enquiry was submitted through the Auxgens contact page.</p>
          <table style="border-collapse:collapse;margin:24px 0">${detailsHtml}</table>
          <h2 style="font-size:16px;margin:24px 0 8px">Message</h2>
          <div style="padding:16px;background:#f2f4f7;border-radius:8px;white-space:pre-wrap;line-height:1.6">${escapeHtml(payload.message)}</div>
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
      subject: "Thank you for contacting Auxgens",
      text: [
        `Hello ${payload.name},`,
        "",
        "Thank you for contacting Auxgens. We have received your enquiry and our team will respond within one business day.",
        "",
        `Service interest: ${payload.service}`,
        "",
        "Regards,",
        "Auxgens",
        contactAddress,
      ].join("\n"),
      html: `
        <div style="font-family:Arial,sans-serif;max-width:640px;margin:0 auto;color:#101828;line-height:1.6">
          <p>Hello ${escapeHtml(payload.name)},</p>
          <p>Thank you for contacting Auxgens. We have received your enquiry and our team will respond within one business day.</p>
          <p><strong>Service interest:</strong> ${escapeHtml(payload.service)}</p>
          <p style="margin-top:28px">Regards,<br><strong>Auxgens</strong><br><a href="mailto:${escapeHtml(contactAddress)}">${escapeHtml(contactAddress)}</a></p>
        </div>
      `,
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    if (isSmtpAuthError(error)) {
      console.error(
        "Contact form SMTP authentication failed. For Gmail, use a 16-character app password generated after enabling 2-Step Verification.",
      );
      return NextResponse.json(
        { error: "Email is temporarily unavailable. Please try again shortly." },
        { status: 503 },
      );
    }

    console.error("Contact form email delivery failed:", error);
    return NextResponse.json(
      { error: "We could not send your enquiry. Please try again shortly." },
      { status: 502 },
    );
  } finally {
    transporter.close();
  }
}
