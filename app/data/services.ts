export type Service = {
  title: string;
  items: string[];
};

export type Offering = {
  name: string;
  items: string[];
};

export type DetailedService = {
  id: string;
  eyebrow: string;
  title: string;
  description: string;
  challenges: string[];
  offerings: Offering[];
};

export const detailedServices: DetailedService[] = [
  {
    id: "grc",
    eyebrow: "GRC Services",
    title: "Governance Risk & Compliance",
    description:
      "In a dynamically changing business environment, risk management and information security play a critical role in the overall growth and reputation of an organisation. Auxgens has the experience and expertise to help customers build, operate and manage an information risk office with a unique risk assessment framework covering implementation, remediation and measurement of security controls aligned to industry best standards.",
    challenges: [
      "Lack of a comprehensive GRC framework",
      "Addressing demands from governments and regulatory organisations",
      "Lack of alignment between organisational culture and GRC",
      "Lack of visibility on critical data and crucial assets",
      "Impact and losses due to a breach or perceived threat",
      "Failure to identify business-critical assets",
      "Incomplete security controls on assets",
      "Optimisation of governance risk and compliance management tools",
      "Visibility of current governance risk and compliance posture",
    ],
    offerings: [
      {
        name: "Implementation & Roadmap",
        items: [
          "ISO 27001 Implementation Consulting",
          "Cloud Security Assessment",
          "Managed GRC",
          "BCP/DR Consulting",
          "SOX – 404",
          "Third-Party Assessment",
        ],
      },
      {
        name: "Advisory & Management",
        items: ["CISO as a Service", "Risk Management", "Gap Assessment"],
      },
    ],
  },
  {
    id: "vciso",
    eyebrow: "Leadership Services",
    title: "Virtual CISO",
    description:
      "Securing business data and ensuring the appropriate level of security for sensitive information requires constant monitoring, new technology oversight, and continuous process improvement. A CISO defines and enforces an organisation's cybersecurity culture, policies, procedures, and security postures. Many organisations cannot afford a full-time executive-level CISO — Virtual CISO brings that leadership insight on demand.",
    challenges: [
      "Increasing and evolving threat landscape",
      "Evolving regulatory compliance requirements",
      "Unaware employees and insider threats",
      "Shortage of skilled cybersecurity professionals",
      "Cybersecurity budget constraints",
      "Extended mean time to detect and respond to incidents",
    ],
    offerings: [
      {
        name: "Key Responsibilities",
        items: [
          "Leadership on risk, governance, incident response, disaster recovery & business continuity",
          "Expert assessment on security threats, risks, and compliance",
          "Consultation to build effective cybersecurity & resiliency programmes",
          "Integration of security into business strategy, process & culture",
          "Development, roll-out, and ongoing maintenance of cybersecurity programmes",
          "Integration and interpretation of information security programme controls",
          "Industry expert across HIPAA, PCI-DSS, NIST, ISO 27001, GDPR, CCPA and more",
          "Information security liaison to management and stakeholders",
        ],
      },
    ],
  },
  {
    id: "cybersecurity",
    eyebrow: "Security Operations",
    title: "Cyber Security & Data Privacy",
    description:
      "Auxgens helps clients strengthen their cybersecurity with professionals supported by a Security Operations Centre (SOC) to identify potential incidents and facilitate preventive action. Our Cyber Risk Protection Solution (CRPS) integrates automation, deep analytics and correlation across multiple security domains with the core objective of security orchestration and automation response (SOAR), providing enhanced visibility across networks, endpoints and the cloud.",
    challenges: [
      "Increasing sophistication and frequency of cyber attacks",
      "Fragmented security tools with limited visibility",
      "Slow mean time to detect and respond to incidents",
      "Compliance requirements across multiple frameworks",
      "Shortage of skilled security personnel",
      "Rising cost of incident response and compliance",
    ],
    offerings: [
      {
        name: "Managed Security Service Provider (MSSP)",
        items: [
          "24/7 threat detection and monitoring",
          "Expanded security team capabilities",
          "Access to specialised skill sets",
          "Lower total cost of ownership",
          "Access to threat intelligence",
          "Threat hunting capabilities",
          "Compliance management",
          "Minimising organisation cyber risk",
        ],
      },
      {
        name: "DPO as a Service",
        items: [
          "Dedicated DPO registered with supervisory authority",
          "GDPR gap analysis and remedial action plan",
          "GDPR and DPA 2018 compliance monitoring",
          "Unlimited telephone and email advice",
          "GDPR documentation review including legal review",
          "Personal data processing register maintenance (Article 30)",
          "Guidance on DPIAs, DSARs, and data breach management",
          "Annual compliance audit and quarterly management reports",
        ],
      },
    ],
  },
  {
    id: "soc-as-a-service",
    eyebrow: "Managed Security Operations",
    title: "SOC as a Service",
    description:
      "Cybersecurity threats are moving faster than traditional SOC teams can manually detect, analyse, and respond. Auxgens delivers SOC as a Service with automation-led monitoring, AI/ML-assisted threat detection, alert correlation, SOAR-style response workflows, and analyst oversight to reduce noise, accelerate response, and improve security posture without expanding headcount.",
    challenges: [
      "Alert fatigue from high-volume false positives",
      "Manual processes that slow down investigation and containment",
      "Disjointed security tools and fragmented telemetry",
      "Sophisticated multi-stage attacks across hybrid environments",
      "Shortage of skilled analysts for continuous operations",
      "Compliance and audit pressure without reliable reporting evidence",
    ],
    offerings: [
      {
        name: "SOC Automation & Triage",
        items: [
          "AI/ML-assisted threat detection across user, network, endpoint, and cloud activity",
          "Automated alert triage, risk scoring, and prioritisation",
          "Correlation of related events into meaningful incidents",
          "Context enrichment for faster analyst decisions",
          "Noise reduction to minimise false positives and alert fatigue",
          "Continuous detection tuning for emerging attack patterns",
        ],
      },
      {
        name: "Orchestrated Response",
        items: [
          "SOAR-style playbooks for consistent incident workflows",
          "Automated containment guidance for compromised devices, accounts, and indicators",
          "Custom escalation paths aligned to client policies and SLAs",
          "Incident investigation support with evidence capture",
          "Response actions for ransomware, phishing, insider threat, and policy violations",
          "Post-incident recommendations to strengthen controls",
        ],
      },
      {
        name: "Unified Visibility & Reporting",
        items: [
          "Centralised telemetry from firewalls, endpoints, cloud workloads, identity providers, and applications",
          "Real-time dashboards for active threats, system health, MTTD, and MTTR",
          "Compliance-ready reporting for frameworks including HIPAA, PCI-DSS, GDPR, and NIST",
          "Threat hunting support and proactive posture reviews",
          "Scalable 24/7 coverage at lower cost than an on-premise SOC",
          "Operational reporting for leadership, audit, and security teams",
        ],
      },
    ],
  },
  {
    id: "gdpr",
    eyebrow: "Data Privacy",
    title: "GDPR Compliance",
    description:
      "GDPR requires businesses to protect the Personally Identifiable Information and privacy of EU citizens for transactions that occur within EU member states and beyond. Non-compliance can result in fines of €20m or 4% of annual global turnover — whichever is greater. Auxgens provides end-to-end GDPR compliance services from initial discovery through to ongoing maintenance.",
    challenges: [
      "Identifying personal data across complex enterprise environments",
      "Aligning existing policies and procedures with GDPR requirements",
      "Implementing appropriate technical and organisational security measures",
      "Managing data subject access requests and breach notification obligations",
      "Cross-border data transfer and protection requirements",
      "Ongoing compliance monitoring and audit readiness",
    ],
    offerings: [
      {
        name: "Assessment & Discovery",
        items: [
          "GDPR Compliance & Privacy Impact Assessment",
          "PII Data Discovery (Process & Technologies)",
          "PII Data Protection Control Assessment",
          "PII Data/Process Modelling & Visualisation",
        ],
      },
      {
        name: "Implementation",
        items: [
          "Policy and Procedure Design/Re-Alignment",
          "Application/IT Process Re-Factoring",
          "Privacy by Design & Subject Access Request",
          "DLP, Data Classification, Pseudonymisation (Encryption & Data Masking)",
          "Identity & Data Access Governance",
          "Breach Detection Control Implementation (SOC)",
          "Incident Management (SIEM)",
        ],
      },
      {
        name: "Ongoing Management",
        items: [
          "DPO as a Service",
          "Policy & Procedures Review",
          "Audit & Assessment",
          "Breach Management",
          "Data Rights Management",
          "Data Security Management",
          "Training & Awareness",
          "GDPR Programme Management",
        ],
      },
    ],
  },
  {
    id: "ferpa",
    eyebrow: "Education Privacy",
    title: "FERPA Compliance",
    description:
      "FERPA protects the privacy of student education records for US educational institutions and their technology partners. Auxgens helps schools, universities, and edtech providers assess data handling practices, implement privacy controls, and maintain audit-ready evidence for student record protection.",
    challenges: [
      "Identifying student education records across SIS, LMS, cloud, and collaboration platforms",
      "Applying role-based access to sensitive student data",
      "Managing disclosure, consent, and legitimate educational interest workflows",
      "Overseeing third-party edtech and service provider access",
      "Maintaining defensible retention, transfer, and disposal practices",
      "Training staff on secure student record handling",
    ],
    offerings: [
      {
        name: "FERPA Readiness Assessment",
        items: [
          "Student data inventory and record flow mapping",
          "Current-state policy and procedure review",
          "Access control and retention practice assessment",
          "Third-party processor and edtech risk review",
          "Gap report with prioritised remediation roadmap",
          "Leadership-ready compliance briefing",
        ],
      },
      {
        name: "Controls & Documentation",
        items: [
          "FERPA-aligned policies and procedures",
          "Role-based access model and approval workflows",
          "Secure record sharing and transfer standards",
          "Vendor data protection and contract guidance",
          "Incident response and escalation playbooks",
          "Staff awareness and handling guidance",
        ],
      },
      {
        name: "Operational Support",
        items: [
          "Periodic FERPA compliance reviews",
          "Audit evidence collection and maintenance",
          "Student record request workflow support",
          "Vendor risk tracking and renewal reviews",
          "Control monitoring and remediation follow-up",
          "Training refreshers for faculty and operations teams",
        ],
      },
    ],
  },
  {
    id: "app-dev",
    eyebrow: "Development Services",
    title: "Application Development",
    description:
      "Auxgens builds web and mobile applications with security embedded from the ground up. Our secure SDLC approach means security is not bolted on at the end — it is woven into every sprint, code review, and deployment pipeline, reducing vulnerabilities before they reach production.",
    challenges: [
      "Security treated as an afterthought rather than built in from the start",
      "Vulnerable third-party dependencies and supply chain risks",
      "Insufficient authentication, authorisation, and session management",
      "Insecure APIs exposing sensitive business logic and data",
      "Lack of security testing in CI/CD pipelines",
      "Non-compliance with OWASP Top 10 and secure coding standards",
    ],
    offerings: [
      {
        name: "Web Application Development",
        items: [
          "Secure full-stack web application development",
          "Progressive Web Apps (PWA)",
          "API development and hardening",
          "Authentication & access control implementation",
          "Input validation and output encoding",
          "OWASP Top 10 remediation",
        ],
      },
      {
        name: "Mobile Application Development",
        items: [
          "iOS and Android application development",
          "Cross-platform development (React Native, Flutter)",
          "Secure local data storage and encryption",
          "Certificate pinning and transport security",
          "Mobile application penetration testing",
          "App store compliance and security review",
        ],
      },
      {
        name: "Secure SDLC & DevSecOps",
        items: [
          "Secure SDLC implementation and training",
          "DevSecOps pipeline integration",
          "Static and dynamic application security testing (SAST/DAST)",
          "Software composition analysis (SCA)",
          "Container and infrastructure security",
          "Continuous compliance monitoring",
        ],
      },
    ],
  },
  {
    id: "staff-aug",
    eyebrow: "Talent & Delivery",
    title: "Staff Augmentation/Project Management",
    description:
      "Auxgens provides skilled cybersecurity, compliance, and technology professionals on demand — alongside experienced project managers who keep engagements on scope, on schedule, and on budget. Scale your team quickly without long hiring cycles, backed by proven security domain expertise.",
    challenges: [
      "Shortage of skilled cybersecurity and compliance professionals",
      "Long hiring cycles delaying critical projects",
      "Fluctuating workloads that do not justify permanent headcount",
      "Projects slipping on scope, schedule, and budget",
      "Limited internal project management and delivery capacity",
      "Knowledge gaps when specialists leave mid-engagement",
    ],
    offerings: [
      {
        name: "Staff Augmentation",
        items: [
          "Security analysts, engineers, and GRC consultants on demand",
          "Short-term and long-term staffing models",
          "Compliance and privacy specialists (GDPR, CCPA, FERPA)",
          "Application developers with secure SDLC experience",
          "Rapid onboarding with vetted, engagement-ready professionals",
          "Flexible scaling as project needs change",
        ],
      },
      {
        name: "Project Management",
        items: [
          "Dedicated project managers for security and technology programmes",
          "Project planning, scheduling, and milestone tracking",
          "PMO setup and governance support",
          "Risk, issue, and dependency management",
          "Stakeholder communication and status reporting",
          "Delivery oversight across vendors and internal teams",
        ],
      },
    ],
  },
  {
    id: "forward-deployed-engineering",
    eyebrow: "Embedded Engineering",
    title: "Forward Deployed Engineering",
    description:
      "Forward Deployed Engineers act as the bridge between technology and business, working directly with client teams to design, customise, integrate, and deploy enterprise solutions. Auxgens brings this capability into complex delivery environments where requirements need to be translated into scalable, production-ready implementations with measurable business impact.",
    challenges: [
      "Complex business requirements that need rapid technical translation",
      "Enterprise systems with integration, workflow, and data constraints",
      "Gaps between product teams, business owners, and implementation teams",
      "Need for client-specific customisation without weakening scalability",
      "Slow handoffs from discovery to delivery and production rollout",
      "Limited internal capacity for embedded solution engineering",
    ],
    offerings: [
      {
        name: "Client-Embedded Solution Design",
        items: [
          "Direct collaboration with business and technology stakeholders",
          "Discovery workshops to convert requirements into delivery plans",
          "Workflow, architecture, and integration blueprinting",
          "Rapid prototyping for validation with real users",
          "Technical feasibility assessment and implementation planning",
          "Clear acceptance criteria tied to measurable business outcomes",
        ],
      },
      {
        name: "Customisation & Integration",
        items: [
          "Enterprise application configuration and custom development",
          "API, data pipeline, and third-party platform integrations",
          "Secure implementation patterns aligned to client environments",
          "Automation of manual operational workflows",
          "Production readiness reviews before deployment",
          "Documentation and enablement for client teams",
        ],
      },
      {
        name: "Deployment & Adoption Support",
        items: [
          "Hands-on deployment coordination across client and vendor teams",
          "Issue triage and iteration during rollout",
          "User feedback loops for continuous improvement",
          "Operational handover and support model design",
          "Post-launch optimisation against adoption and performance metrics",
          "Ongoing engineering support for evolving business needs",
        ],
      },
    ],
  },
  {
    id: "ccpa",
    eyebrow: "Data Privacy",
    title: "CCPA Compliance",
    description:
      "The California Consumer Privacy Act gives consumers more control over personal information that businesses collect about them. Non-compliance can bring penalties of up to $2,500 per violation — calculated on a per-capita basis — or $7,500 for intentional violations. Auxgens provides comprehensive CCPA compliance services from gap assessment through to ongoing management.",
    challenges: [
      "Understanding what personal information is collected and how it is used",
      "Enabling consumer rights: deletion, opt-out, and non-discrimination",
      "Aligning existing policies and procedures with CCPA requirements",
      "Managing consumer rights requests within required timeframes",
      "Third-party data processor oversight and contractual alignment",
      "Ongoing compliance monitoring and staff awareness",
    ],
    offerings: [
      {
        name: "Gap Assessment",
        items: [
          "AS-IS review of current policies and procedures on PI data",
          "Review of data flow diagrams and data registers",
          "Review of third-party processor contracts",
          "PII Data Discovery and data flow assessment",
          "Stakeholder meetings and cross-functional data gathering workshops",
          "Detailed CCPA compliance report and high-level roadmap",
          "Privacy risk report and PI Data Map",
        ],
      },
      {
        name: "Gap Remediation",
        items: [
          "Data Protection Policies and Procedures",
          "Data Protection Impact Assessment",
          "Data collection, processing, and usage procedures",
          "Data Subject Request and complaints procedures",
          "Breach Notification policy and procedures",
          "Privacy and consent notices",
          "Implement Privacy by Design principles",
          "DLP, Data Classification, Data Masking & Encryption",
        ],
      },
      {
        name: "Management Services",
        items: [
          "Policy and process review",
          "Data breach management",
          "Data inventory management",
          "Consumer right request management",
          "Periodic CCPA compliance audits and assessments",
          "Analytics-driven compliance management",
          "CCPA Awareness Training for customer-facing staff",
          "Periodic training & awareness programmes",
        ],
      },
    ],
  },
];

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
      "SIEM & monitoring",
      "Log management",
      "Incident response",
      "Endpoint solutions",
      "Threat intelligence",
      "Network architecture",
    ],
  },
  {
    title: "SOC as a Service",
    items: [
      "AI/ML threat detection",
      "Automated alert triage",
      "SOAR-style playbooks",
      "Unified telemetry",
      "Real-time dashboards",
      "Compliance reporting",
    ],
  },
  {
    title: "Governance Risk & Compliance",
    items: [
      "ISO 27001 implementation",
      "GDPR & privacy compliance",
      "FERPA compliance",
      "PCI-DSS & SOX audits",
      "Cloud security assessment",
      "BCP/DR consulting",
      "CISO-as-a-Service",
    ],
  },
  {
    title: "FERPA Compliance",
    items: [
      "Student data mapping",
      "Access control reviews",
      "Disclosure workflows",
      "Vendor risk oversight",
      "Policy documentation",
      "Awareness training",
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
    title: "Application Development",
    items: [
      "Secure web application development",
      "Mobile app development",
      "Secure SDLC & DevSecOps",
      "API & backend hardening",
      "Authentication & access control",
      "OWASP Top 10 remediation",
    ],
  },
  {
    title: "Staff Augmentation/Project Management",
    items: [
      "Skilled security professionals on demand",
      "Short & long-term staffing",
      "Dedicated project managers",
      "Project planning & delivery",
      "PMO governance support",
      "Flexible engagement models",
    ],
  },
  {
    title: "Forward Deployed Engineering",
    items: [
      "Embedded client-facing engineers",
      "Requirement-to-solution translation",
      "Enterprise customisation",
      "API and workflow integration",
      "Production deployment support",
      "Adoption and optimisation loops",
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
