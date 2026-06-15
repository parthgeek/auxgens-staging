export type ComplianceStandard = {
  title: string;
  sub: string;
  mark: string;
  detail?: string;
  tone: "forest" | "blue" | "gold" | "plum" | "teal";
};

export const complianceStandards: ComplianceStandard[] = [
  {
    title: "ISO 27001",
    sub: "Info Security Management",
    mark: "ISO",
    detail: "27001",
    tone: "blue",
  },
  {
    title: "GDPR",
    sub: "Data Protection (EU)",
    mark: "GDPR",
    tone: "blue",
  },
  {
    title: "CCPA",
    sub: "California Privacy Act",
    mark: "CCPA",
    tone: "gold",
  },
  {
    title: "PCI-DSS",
    sub: "Payment Card Security",
    mark: "PCI",
    detail: "DSS",
    tone: "teal",
  },
  {
    title: "SOX 404",
    sub: "Financial Compliance",
    mark: "SOX",
    detail: "404",
    tone: "plum",
  },
  {
    title: "FERPA",
    sub: "Student Privacy",
    mark: "FERPA",
    tone: "forest",
  },
  {
    title: "HIPAA",
    sub: "Healthcare Privacy",
    mark: "HIPAA",
    tone: "teal",
  },
  {
    title: "NIST CSF",
    sub: "Cybersecurity Framework",
    mark: "NIST",
    detail: "CSF",
    tone: "blue",
  },
  {
    title: "SOC 2 Type II",
    sub: "Audited Controls",
    mark: "SOC",
    detail: "2",
    tone: "plum",
  },
  {
    title: "DPDP Act",
    sub: "India Privacy Law",
    mark: "DPDP",
    tone: "gold",
  },
];
