export type Service = {
  title: string;
  items: string[];
};

export const homepageServices: Service[] = [
  {
    title: "Threat & Risk Intelligence",
    items: [
      "Cyber risk analytics",
      "Vulnerability management",
      "Security assessments",
      "Threat modelling",
      "Architecture reviews",
      "Forensic analytics",
    ],
  },
  {
    title: "Infrastructure Security",
    items: [
      "SOC-as-a-Service (24/7)",
      "SIEM & monitoring",
      "Incident response",
      "Endpoint solutions",
      "Threat intelligence",
      "Network architecture",
    ],
  },
  {
    title: "Governance & Compliance",
    items: [
      "ISO 27001 implementation",
      "GDPR & privacy compliance",
      "PCI-DSS & SOX audits",
      "Cloud security assessment",
      "BCP/DR consulting",
      "CISO-as-a-Service",
    ],
  },
  {
    title: "Data Protection",
    items: [
      "Data classification",
      "Encryption strategies",
      "Data loss prevention",
      "Privacy-by-design",
      "Application security",
      "Payment security",
    ],
  },
  {
    title: "Security Culture",
    items: [
      "Security awareness training",
      "Staff programmes",
      "Developer training",
      "Phishing simulations",
      "Compliance education",
      "Leadership workshops",
    ],
  },
  {
    title: "Documentation & Support",
    items: [
      "Security policies",
      "Procedures & guidelines",
      "SOP templates",
      "Standards documentation",
      "Audit readiness",
      "DPO-as-a-Service",
    ],
  },
];

export const servicePageServices: Service[] = [
  ...homepageServices,
  {
    title: "Web & App Development with Security",
    items: [
      "Secure web application development",
      "Mobile app development",
      "Secure SDLC implementation",
      "API & backend hardening",
      "Authentication & access control",
      "DevSecOps integration",
    ],
  },
];
