import { complianceStandards } from "./complianceStandards";
import { frameworkSummaries } from "./questionnaires";
import { detailedServices, homepageServices } from "./services";

const company = `
COMPANY
Name: Auxgens
Tagline: Securing Your Digital Future
What we are: a global cybersecurity, compliance and AI-engineering partner helping organisations protect data, systems and trust.
Coverage: Asia · EMEA · United States of America.
Website: https://auxgens.net
Primary inbox: contact@auxgens.net
Response window: 1 business day
LinkedIn: https://www.linkedin.com/company/auxgen

OFFICES
- India operations — C3834, Brigade Meadows, Udayapura, Bengaluru 560082, India
- United States operations — Office 242, 1205 BMC Drive, Cedar Park, Austin, TX 78613, United States. Phone +1 360 875 2205
`.trim();

const siteMap = `
SITE MAP (use these paths when pointing a visitor somewhere)
- /                       Home — overview, services, stats, CTA
- /services               All services in detail
- /about-us               Who we are, approach, values
- /contact-us             Contact form, offices, direct email
- /questionnaire          Free self-assessment questionnaires
- /questionnaire/[slug]   A specific framework questionnaire
- /privacy-policy         Privacy policy
- /terms-of-service       Terms of service
`.trim();

function renderDetailedServices() {
  return detailedServices
    .map((service) => {
      const offerings = service.offerings
        .map((offering) => `    * ${offering.name}: ${offering.items.join(", ")}`)
        .join("\n");

      return [
        `### ${service.title} (${service.eyebrow}) — /services#${service.id}`,
        service.description,
        `  Challenges we solve: ${service.challenges.join("; ")}`,
        `  Offerings:`,
        offerings,
      ].join("\n");
    })
    .join("\n\n");
}

function renderCapabilities() {
  const seen = new Set<string>();

  return homepageServices
    .filter((service) => {
      if (seen.has(service.title)) return false;
      seen.add(service.title);
      return true;
    })
    .map((service) => `- ${service.title}: ${service.items.join(", ")}`)
    .join("\n");
}

function renderCompliance() {
  return complianceStandards
    .map((standard) => `- ${standard.title} — ${standard.sub}`)
    .join("\n");
}

function renderQuestionnaires() {
  return frameworkSummaries
    .map(
      (framework) =>
        `- ${framework.framework} (${framework.shortName}) — /questionnaire/${framework.slug} · ${framework.questionCount} questions · ${framework.estimatedTime} · ${framework.difficulty}. ${framework.description} Categories: ${framework.categories.join(", ")}.`,
    )
    .join("\n");
}

export const siteKnowledge = `
${company}

${siteMap}

CAPABILITY SUMMARY
${renderCapabilities()}

DETAILED SERVICES
${renderDetailedServices()}

COMPLIANCE STANDARDS WE WORK WITH
${renderCompliance()}

FREE SELF-ASSESSMENT QUESTIONNAIRES
${renderQuestionnaires()}
`.trim();

export const systemPrompt = `
You are "Aux", the virtual assistant on the Auxgens website (auxgens.net).

ROLE
Help visitors understand Auxgens' services, compliance offerings and questionnaires, and guide them to the right page or to contact the team.

RULES
1. Answer ONLY from the knowledge base below plus general, non-committal security/compliance background. Never invent services, prices, client names, certifications, timelines or people.
2. If the answer is not in the knowledge base, say so plainly and point the visitor to /contact-us or contact@auxgens.net.
3. Never quote prices or promise delivery dates. Pricing and scoping happen with the team.
4. Be concise: 2-5 sentences, or a short bullet list. No walls of text.
5. Reference site paths as plain relative paths (e.g. /services, /questionnaire/soc2) so the UI can link them.
6. When a visitor shows buying intent, suggest the contact page or a relevant free questionnaire.
7. Plain text and simple markdown only (bullets, bold). No code blocks, no tables, no headings.
8. Stay on topic: Auxgens, cybersecurity, compliance, AI engineering. Politely redirect anything else.

KNOWLEDGE BASE
${siteKnowledge}
`.trim();
