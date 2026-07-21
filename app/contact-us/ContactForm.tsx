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
  "Forward Deployed AI Engineer",
  "SOC as a Service",
  "Cyber Security",
  "Virtual CISO",
  "Governance Risk & Compliance",
  "GDPR / Privacy",
  "FERPA",
  "CCPA",
  "Application Development",
  "Staff Augmentation/Project Management",
  "General enquiry",
];

const regions = [
  "India / Asia",
  "United States of America",
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

export default function ContactForm() {
  const [values, setValues] = useState(initialValues);
  const [errors, setErrors] = useState<FormErrors>({});
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [submitError, setSubmitError] = useState("");

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
      setSubmitError("");
    }
  };

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const nextErrors = validate(values);
    setErrors(nextErrors);

    if (Object.keys(nextErrors).length > 0) {
      setStatus("error");
      setSubmitError("Please review the highlighted fields before sending.");
      return;
    }

    setStatus("loading");
    setSubmitError("");

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(values),
      });
      const result = (await response.json()) as {
        success?: boolean;
        error?: string;
      };

      if (!response.ok || !result.success) {
        throw new Error(result.error || "We could not send your enquiry.");
      }

      setValues(initialValues);
      setStatus("success");
    } catch (error) {
      setStatus("error");
      setSubmitError(
        error instanceof Error
          ? error.message
          : "We could not send your enquiry. Please try again.",
      );
    }
  };

  const statusMessage = {
    idle: "Fields marked with an asterisk are required.",
    loading: "Sending your enquiry securely...",
    success: "Thank you. Your enquiry has been sent and a confirmation email is on its way.",
    error: submitError,
  }[status];

  return (
    <form
      className="lx-form"
      id="contact-form"
      onSubmit={handleSubmit}
      noValidate
    >
      <div className="lx-form-head">
        <p className="lx-eyebrow">Send an enquiry</p>
        <h2>Tell us what needs protection.</h2>
        <p>
          Share the context you can. Auxgens will respond through the primary
          sales inbox within one business day.
        </p>
      </div>

      <div className="lx-form-grid">
        <div className="lx-field">
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
          <span id="name-help" className="lx-field-help">Who should our team contact?</span>
          {errors.name && <span id="name-error" className="lx-field-error">{errors.name}</span>}
        </div>

        <div className="lx-field">
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
          <span id="email-help" className="lx-field-help">Use the address where we can reply.</span>
          {errors.email && <span id="email-error" className="lx-field-error">{errors.email}</span>}
        </div>

        <div className="lx-field">
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
          <span id="company-help" className="lx-field-help">Optional, but useful for routing.</span>
        </div>

        <div className="lx-field">
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
          <span id="service-help" className="lx-field-help">Pick the closest match.</span>
          {errors.service && <span id="service-error" className="lx-field-error">{errors.service}</span>}
        </div>

        <div className="lx-field">
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
          <span id="region-help" className="lx-field-help">Where will the engagement be based?</span>
        </div>

        <div className="lx-field lx-field-wide">
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
          <span id="message-help" className="lx-field-help">Include timelines, systems, frameworks, or urgent concerns.</span>
          {errors.message && <span id="message-error" className="lx-field-error">{errors.message}</span>}
        </div>
      </div>

      <div className="lx-form-actions">
        <button className="lx-form-submit" type="submit" disabled={status === "loading"}>
          <PiPaperPlaneTiltDuotone aria-hidden="true" focusable="false" />
          <span>{status === "loading" ? "Sending..." : "Send enquiry"}</span>
        </button>
        <p className={`lx-form-status lx-form-status-${status}`} aria-live="polite">
          {statusMessage}
        </p>
      </div>
    </form>
  );
}
