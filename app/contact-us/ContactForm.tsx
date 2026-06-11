"use client";

import { useState, type ChangeEvent, type FormEvent } from "react";
import { PiPaperPlaneTiltDuotone } from "react-icons/pi";

type FormValues = {
  name: string;
  email: string;
  company: string;
  service: string;
  region: string;
  message: string;
};

type FormErrors = Partial<Record<keyof FormValues, string>>;

const initialValues: FormValues = {
  name: "",
  email: "",
  company: "",
  service: "",
  region: "",
  message: "",
};

const services = [
  "Governance, Risk & Compliance",
  "Virtual CISO",
  "Cyber Security",
  "GDPR / Privacy",
  "Application Development",
  "CCPA",
  "General enquiry",
];

const regions = [
  "India / Asia",
  "North America",
  "EMEA",
  "Global engagement",
];

function validate(values: FormValues) {
  const errors: FormErrors = {};
  const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  if (!values.name.trim()) {
    errors.name = "Please enter your name.";
  }

  if (!values.email.trim()) {
    errors.email = "Please enter your work email.";
  } else if (!emailPattern.test(values.email.trim())) {
    errors.email = "Please enter a valid email address.";
  }

  if (!values.service) {
    errors.service = "Please choose a service area.";
  }

  if (!values.message.trim()) {
    errors.message = "Please share a few details about your request.";
  }

  return errors;
}

function buildMailto(values: FormValues) {
  const subject = `Auxgens enquiry from ${values.name.trim()}`;
  const body = [
    `Name: ${values.name.trim()}`,
    `Email: ${values.email.trim()}`,
    `Company: ${values.company.trim() || "Not provided"}`,
    `Service interest: ${values.service || "Not provided"}`,
    `Region: ${values.region || "Not provided"}`,
    "",
    "Message:",
    values.message.trim(),
  ].join("\n");

  return `mailto:sales@auxgens.net?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
}

export default function ContactForm() {
  const [values, setValues] = useState(initialValues);
  const [errors, setErrors] = useState<FormErrors>({});
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");

  const handleChange = (
    event: ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>,
  ) => {
    const { name, value } = event.target;
    setValues((current) => ({ ...current, [name]: value }));

    if (errors[name as keyof FormValues]) {
      setErrors((current) => ({ ...current, [name]: undefined }));
    }

    if (status !== "idle") {
      setStatus("idle");
    }
  };

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const nextErrors = validate(values);
    setErrors(nextErrors);

    if (Object.keys(nextErrors).length > 0) {
      setStatus("error");
      return;
    }

    setStatus("loading");

    window.setTimeout(() => {
      window.location.href = buildMailto(values);
      setStatus("success");
    }, 450);
  };

  const statusMessage = {
    idle: "Fields marked with an asterisk are required.",
    loading: "Preparing your enquiry for sales@auxgens.net.",
    success: "Your email client should open with the enquiry details filled in.",
    error: "Please review the highlighted fields before sending.",
  }[status];

  return (
    <form
      className="contact-form anim d1"
      id="contact-form"
      onSubmit={handleSubmit}
      noValidate
    >
      <div className="contact-form-head">
        <p className="eyebrow">Send an enquiry</p>
        <h2>Tell us what needs protecting.</h2>
        <p>
          Share the context you can. Auxgens will respond through the primary
          sales inbox within one business day.
        </p>
      </div>

      <div className="contact-form-grid">
        <div className="field-block">
          <label htmlFor="name">Full name *</label>
          <input
            id="name"
            name="name"
            type="text"
            autoComplete="name"
            value={values.name}
            onChange={handleChange}
            aria-invalid={Boolean(errors.name)}
            aria-describedby="name-help name-error"
          />
          <span id="name-help" className="field-help">Who should our team contact?</span>
          {errors.name && <span id="name-error" className="field-error">{errors.name}</span>}
        </div>

        <div className="field-block">
          <label htmlFor="email">Work email *</label>
          <input
            id="email"
            name="email"
            type="email"
            autoComplete="email"
            value={values.email}
            onChange={handleChange}
            aria-invalid={Boolean(errors.email)}
            aria-describedby="email-help email-error"
          />
          <span id="email-help" className="field-help">Use the address where we can reply.</span>
          {errors.email && <span id="email-error" className="field-error">{errors.email}</span>}
        </div>

        <div className="field-block">
          <label htmlFor="company">Company</label>
          <input
            id="company"
            name="company"
            type="text"
            autoComplete="organization"
            value={values.company}
            onChange={handleChange}
            aria-describedby="company-help"
          />
          <span id="company-help" className="field-help">Optional, but useful for routing.</span>
        </div>

        <div className="field-block">
          <label htmlFor="service">Service area *</label>
          <select
            id="service"
            name="service"
            value={values.service}
            onChange={handleChange}
            aria-invalid={Boolean(errors.service)}
            aria-describedby="service-help service-error"
          >
            <option value="">Select a service</option>
            {services.map((service) => (
              <option key={service} value={service}>{service}</option>
            ))}
          </select>
          <span id="service-help" className="field-help">Pick the closest match.</span>
          {errors.service && <span id="service-error" className="field-error">{errors.service}</span>}
        </div>

        <div className="field-block">
          <label htmlFor="region">Region</label>
          <select
            id="region"
            name="region"
            value={values.region}
            onChange={handleChange}
            aria-describedby="region-help"
          >
            <option value="">Select a region</option>
            {regions.map((region) => (
              <option key={region} value={region}>{region}</option>
            ))}
          </select>
          <span id="region-help" className="field-help">Where will the engagement be based?</span>
        </div>

        <div className="field-block field-block-wide">
          <label htmlFor="message">Message *</label>
          <textarea
            id="message"
            name="message"
            rows={7}
            value={values.message}
            onChange={handleChange}
            aria-invalid={Boolean(errors.message)}
            aria-describedby="message-help message-error"
          />
          <span id="message-help" className="field-help">Include timelines, systems, frameworks, or urgent concerns.</span>
          {errors.message && <span id="message-error" className="field-error">{errors.message}</span>}
        </div>
      </div>

      <div className="contact-form-actions">
        <button className="contact-submit" type="submit" disabled={status === "loading"}>
          <PiPaperPlaneTiltDuotone aria-hidden="true" focusable="false" />
          <span>{status === "loading" ? "Preparing..." : "Send enquiry"}</span>
        </button>
        <p className={`contact-form-status contact-form-status-${status}`} aria-live="polite">
          {statusMessage}
        </p>
      </div>
    </form>
  );
}
