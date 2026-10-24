export type Domain = "Software" | "Data" | "Cloud/Security" | "Business/Design";
export type EvidenceQuality = "Verified Data" | "Sample Estimate" | "Limited Survey Data";
export type Feasibility = "High" | "Moderate" | "Competitive";
export type HiringMode = "Campus-led" | "Balanced" | "Off-campus friendly";

export interface RoadmapStep {
  step: number;
  title: string;
  duration: string;
  focus: string;
}

export interface Career {
  id: string;
  title: string;
  domain: Domain;
  description: string;
  dailyWork: string[];
  eligibleDegrees: string[];
  nonTechFriendly: boolean;
  tierAccessibility: {
    tier1: string;
    tier2: string;
    tier3: string;
  };
  salary: {
    advertisedCTCMin: number;
    advertisedCTCMax: number;
    realisticBaseMin: number;
    realisticBaseMax: number;
    monthlyInHandMin: number;
    monthlyInHandMax: number;
  };
  prepTimelineMonths: number;
  prepCostEstimate: {
    freeTier: string;
    structuredTier: string;
  };
  minPrepCostINR: number;
  keySkills: {
    foundational: string[];
    technical: string[];
    optional: string[];
  };
  hiringRoutes: {
    campusWeight: string;
    offCampusFeasibility: string;
    topHiringPatterns: string;
  };
  hiringMode: HiringMode;
  campusProbability: number;
  entryFeasibility: Feasibility;
  evidenceQuality: EvidenceQuality;
  roadmapSteps: RoadmapStep[];
}

export interface StudentCaseStudy {
  id: string;
  name: string;
  avatarInitials: string;
  collegeTier: "Tier 1" | "Tier 2" | "Tier 3";
  degree: string;
  startingProfile: string;
  targetRole: string;
  careerId: string;
  prepMonths: number;
  prepSpendINR: number;
  hiringChannel: string;
  advertisedCTC: string;
  monthlyInHand: string;
  quote: string;
  whatWorked: string[];
  whatSkipped: string[];
}

export interface PlacementComparisonRecord {
  id: string;
  institutionCategory: string;
  tier: "Tier 1" | "Tier 2" | "Tier 3";
  examples: string;
  advertisedHighestCTC: string;
  realisticMedianCTC: string;
  medianMonthlyInHand: string;
  brochurePlacedPercent: number;
  actualEnrolledPlacedPercent: number;
  onCampusVsOffCampusRatio: string;
  realityNote: string;
}

export interface FAQItem {
  id: string;
  category: "CTC & Taxes" | "Tier-3 & Off-Campus" | "Skills & Proof of Work" | "Data Methodology";
  question: string;
  answer: string;
  highlightMetric?: string;
}

function roadmap(months: number, f: [string, string, string, string, string, string, string]): RoadmapStep[] {
  const titles = [
    "Prerequisites & Tooling",
    "Core Foundations",
    "Applied Stack & Frameworks",
    "Proof-of-Work Projects",
    "GitHub & ATS Resume",
    "Mock Assessments & Drills",
    "Targeted Outreach & Iteration",
  ];
  const weights = [0.1, 0.25, 0.2, 0.2, 0.08, 0.1, 0.07];
  return titles.map((title, i) => {
    const weight = weights[i] ?? 0.1;
    const w = Math.max(1, Math.round(months * 4 * weight));
    return {
      step: i + 1,
      title,
      duration: `${w} week${w > 1 ? "s" : ""}`,
      focus: f[i] ?? "",
    };
  });
}

const TECH = ["BTech/BE", "BCA", "MCA", "BSc"];
const ALL = ["BTech/BE", "BCA", "MCA", "BSc", "BCom", "BA", "BBA", "MBA", "Other"];

export const CAREERS: Career[] = [
  {
    id: "backend-developer",
    title: "Backend Software Developer",
    domain: "Software",
    description: "Builds the APIs, databases, caching layers, and business logic that power transactional apps used across India.",
    dailyWork: [
      "Fix bugs and add endpoints in existing Node.js, Java Spring Boot, or Go REST APIs",
      "Write unit and integration tests and review peers' pull requests",
      "Join daily stand-ups, sprint planning, and production debugging calls",
      "Write indexed SQL queries, schema migrations, and Redis caching logic",
    ],
    eligibleDegrees: TECH,
    nonTechFriendly: false,
    tierAccessibility: {
      tier1: "Strong campus pull from product companies, fintechs, and global capability centers (GCCs).",
      tier2: "Service + mid-size product drives; DSA speed + 1 solid backend repository decides.",
      tier3: "Mostly off-campus; deployed APIs, database design proof, and contest rankings matter most.",
    },
    salary: {
      advertisedCTCMin: 400000,
      advertisedCTCMax: 1200000,
      realisticBaseMin: 350000,
      realisticBaseMax: 900000,
      monthlyInHandMin: 26000,
      monthlyInHandMax: 62000,
    },
    prepTimelineMonths: 8,
    prepCostEstimate: {
      freeTier: "₹0 – ₹2,000 (YouTube, Striver A2Z, LeetCode free, official docs)",
      structuredTier: "₹15,000 – ₹45,000 (Structured DSA + backend cohort)",
    },
    minPrepCostINR: 0,
    keySkills: {
      foundational: ["DSA basics", "OOP Principles", "Git & GitHub", "HTTP/Networking"],
      technical: ["Java / Node.js / Go", "PostgreSQL / MySQL", "REST APIs & Auth (JWT)", "Low-Level Design"],
      optional: ["Docker", "Redis", "Message Queues (Kafka/RabbitMQ)", "AWS EC2/S3"],
    },
    hiringRoutes: {
      campusWeight: "High",
      offCampusFeasibility: "Moderate",
      topHiringPatterns: "Online DSA assessment (2–3 problems) → Low-level / API round → System & DB round → HR.",
    },
    hiringMode: "Balanced",
    campusProbability: 55,
    entryFeasibility: "Moderate",
    evidenceQuality: "Verified Data",
    roadmapSteps: roadmap(8, [
      "Master one backend language (Java/Node/Go), Linux CLI, and Git workflows",
      "DSA from arrays, hashing, and trees to dynamic programming (180+ problems)",
      "Relational databases (SQL joins, indexing, ACID), REST API design, and JWT auth",
      "Build 2 production-grade API projects with rate limiting, Docker, and cloud deployment",
      "Clean GitHub READMEs with architecture diagrams + single-column ATS resume",
      "Weekly timed OA practice + 6 peer/platform backend mock interviews",
      "Apply via Wellfound, Instahyre, company career portals, and engineer referrals",
    ]),
  },
  {
    id: "frontend-developer",
    title: "Frontend Developer",
    domain: "Software",
    description: "Turns product specifications and Figma designs into fast, responsive, accessible web applications using React and TypeScript.",
    dailyWork: [
      "Build reusable UI components from Figma design tokens with Tailwind CSS",
      "Fix cross-browser layout, state synchronization, and mobile responsiveness bugs",
      "Integrate REST/GraphQL APIs with caching, loading skeletons, and error boundaries",
      "Optimize Core Web Vitals (LCP, INP, CLS) and bundle size",
    ],
    eligibleDegrees: [...TECH, "Other"],
    nonTechFriendly: true,
    tierAccessibility: {
      tier1: "High conversion in SaaS, consumer tech, and fintech campus roles.",
      tier2: "Strong startup and agency demand; live deployed links beat GPA cutoffs.",
      tier3: "Highly feasible off-campus; founders and tech leads hire directly off live UI demos.",
    },
    salary: {
      advertisedCTCMin: 350000,
      advertisedCTCMax: 900000,
      realisticBaseMin: 300000,
      realisticBaseMax: 700000,
      monthlyInHandMin: 23000,
      monthlyInHandMax: 50000,
    },
    prepTimelineMonths: 6,
    prepCostEstimate: {
      freeTier: "₹0 (MDN, react.dev, freeCodeCamp, Frontend Mentor)",
      structuredTier: "₹8,000 – ₹30,000 (Frontend mastery bootcamp)",
    },
    minPrepCostINR: 0,
    keySkills: {
      foundational: ["Semantic HTML5", "Modern CSS & Flexbox/Grid", "JavaScript (ES6+, Event Loop)"],
      technical: ["React 19", "TypeScript", "Tailwind CSS", "State & API Fetching (TanStack Query)"],
      optional: ["Next.js", "Playwright/Vitest", "Web Accessibility (WCAG)", "Framer Motion"],
    },
    hiringRoutes: {
      campusWeight: "Medium",
      offCampusFeasibility: "High",
      topHiringPatterns: "Take-home UI assignment → 60-min live machine coding → JS internals round.",
    },
    hiringMode: "Off-campus friendly",
    campusProbability: 35,
    entryFeasibility: "High",
    evidenceQuality: "Sample Estimate",
    roadmapSteps: roadmap(6, [
      "HTML5 semantics, CSS Grid/Flexbox, responsive layouts without frameworks",
      "Deep JavaScript: closures, promises, async/await, DOM manipulation, event loop",
      "React fundamentals, hooks, TypeScript strict typing, and API state management",
      "Ship 3 interactive web apps (dashboard, e-commerce checkout, real-time collaborative UI)",
      "Deploy on Vercel/Cloudflare with Lighthouse >90 scores and clean GitHub commits",
      "Practice 90-minute machine coding rounds (autocomplete, kanban, infinite scroll)",
      "Cold DM startup CTOs/Design Engineers with 45-second Loom demos of your work",
    ]),
  },
  {
    id: "fullstack-developer",
    title: "Full-Stack Developer",
    domain: "Software",
    description: "Owns product features end-to-end across React interfaces, Node/Python backends, and SQL databases — the #1 startup hire.",
    dailyWork: [
      "Build full user flows from database schema migration to API and React UI",
      "Debug production errors across client logs, server traces, and DB queries",
      "Integrate third-party services like Razorpay, Clerk/Auth, and AWS S3",
      "Deploy preview builds and manage CI/CD pipelines",
    ],
    eligibleDegrees: TECH,
    nonTechFriendly: false,
    tierAccessibility: {
      tier1: "Top pick for seed-to-Series-B startups and product companies.",
      tier2: "High conversion in mid-size product firms when backed by deployed SaaS projects.",
      tier3: "Strong off-campus entry via internships, GSoC/open-source, and startup portals.",
    },
    salary: {
      advertisedCTCMin: 400000,
      advertisedCTCMax: 1000000,
      realisticBaseMin: 350000,
      realisticBaseMax: 800000,
      monthlyInHandMin: 26000,
      monthlyInHandMax: 56000,
    },
    prepTimelineMonths: 9,
    prepCostEstimate: {
      freeTier: "₹0 – ₹2,000 (FullStackOpen, official docs, YouTube)",
      structuredTier: "₹20,000 – ₹60,000 (Full-stack cohort)",
    },
    minPrepCostINR: 0,
    keySkills: {
      foundational: ["JavaScript/TypeScript", "Git", "HTTP & REST", "Basic DSA"],
      technical: ["React / Next.js", "Node.js / Express", "PostgreSQL / Prisma", "Authentication & Deployment"],
      optional: ["Docker", "Redis", "GraphQL", "CI/CD (GitHub Actions)"],
    },
    hiringRoutes: {
      campusWeight: "Medium",
      offCampusFeasibility: "High",
      topHiringPatterns: "Full-stack build assignment → Codebase walkthrough & architecture Q&A → Founder round.",
    },
    hiringMode: "Off-campus friendly",
    campusProbability: 40,
    entryFeasibility: "Moderate",
    evidenceQuality: "Sample Estimate",
    roadmapSteps: roadmap(9, [
      "TypeScript fundamentals, Git branching, and modern CSS with Tailwind",
      "Frontend mastery with React, routing, forms, and client-side state",
      "Backend engineering with Node.js, PostgreSQL, ORMs, and authentication",
      "Build 2 full-stack apps with payments, role-based access, and background jobs",
      "Write engineering case-study READMEs explaining trade-offs and DB schemas",
      "Practice project deep-dive defenses + medium-level array/string/tree DSA",
      "Apply on Wellfound, Y Combinator Work at a Startup, Cuvette, and LinkedIn",
    ]),
  },
  {
    id: "data-analyst",
    title: "Data Analyst",
    domain: "Data",
    description: "Transforms raw business and customer tables into actionable SQL reports, automated dashboards, and revenue insights.",
    dailyWork: [
      "Write complex SQL queries to pull weekly funnel, retention, and cohort metrics",
      "Build and maintain interactive Power BI or Tableau dashboards for business heads",
      "Clean messy CSV/Excel dumps using Python (Pandas) and automate recurring MIS sheets",
      "Present root-cause analysis when conversion or revenue metrics dip",
    ],
    eligibleDegrees: ALL,
    nonTechFriendly: true,
    tierAccessibility: {
      tier1: "High campus hiring by consulting firms, fintechs, and analytics GCCs.",
      tier2: "Strong demand across banking, retail, e-commerce, and analytics firms (Mu Sigma, Fractal, ZS).",
      tier3: "One of the best off-campus bridges for both tech and non-tech graduates with strong SQL + BI portfolios.",
    },
    salary: {
      advertisedCTCMin: 350000,
      advertisedCTCMax: 700000,
      realisticBaseMin: 300000,
      realisticBaseMax: 600000,
      monthlyInHandMin: 22000,
      monthlyInHandMax: 42000,
    },
    prepTimelineMonths: 5,
    prepCostEstimate: {
      freeTier: "₹0 (Mode SQL, Power BI Desktop, Kaggle, Alex The Analyst)",
      structuredTier: "₹10,000 – ₹35,000 (Analytics certification program)",
    },
    minPrepCostINR: 0,
    keySkills: {
      foundational: ["Advanced Excel (Pivot, XLOOKUP)", "Descriptive Statistics", "Business Metrics (CAC, LTV, Churn)"],
      technical: ["SQL (Joins, CTEs, Window Functions)", "Power BI / Tableau", "Python (Pandas, Matplotlib)"],
      optional: ["A/B Testing Basics", "Google BigQuery", "Looker Studio"],
    },
    hiringRoutes: {
      campusWeight: "Medium",
      offCampusFeasibility: "High",
      topHiringPatterns: "Aptitude & SQL test → Business case study / dashboard task → Manager round.",
    },
    hiringMode: "Off-campus friendly",
    campusProbability: 40,
    entryFeasibility: "High",
    evidenceQuality: "Verified Data",
    roadmapSteps: roadmap(5, [
      "Master Excel financial/lookup functions and foundational probability & statistics",
      "Deep SQL: multi-table joins, group by, CTEs, and window functions (ROW_NUMBER, LAG/LEAD)",
      "Power BI / Tableau data modeling, DAX formulas, and executive storytelling",
      "Publish 3 end-to-end Indian business case studies (e.g., UPI churn, Quick-commerce unit economics)",
      "Host interactive dashboards + SQL query notebooks on GitHub & Maven Analytics portfolio",
      "Drill 50 LeetCode/StrataScratch SQL problems + guesstimate case studies",
      "Target GCCs, fintechs, D2C brands, and analytics consultancies via Naukri & LinkedIn",
    ]),
  },
  {
    id: "data-engineer",
    title: "Data Engineer",
    domain: "Data",
    description: "Designs and maintains reliable ETL/ELT pipelines and cloud data warehouses that feed analytics and AI teams.",
    dailyWork: [
      "Build and monitor scheduled Apache Airflow DAGs and batch data pipelines",
      "Optimize slow SQL queries and partition tables in Snowflake, BigQuery, or Redshift",
      "Write PySpark scripts to transform raw event logs into clean analytics tables",
      "Fix schema drift, data quality alerts, and late-arriving data issues",
    ],
    eligibleDegrees: TECH,
    nonTechFriendly: false,
    tierAccessibility: {
      tier1: "Direct campus hiring by banks, fintechs, and global data platforms.",
      tier2: "IT service bellwethers and mid-tier data consultancies hire & train freshers.",
      tier3: "Competitive directly as a fresher; often entered via Data Analyst or Backend SDE roles first.",
    },
    salary: {
      advertisedCTCMin: 450000,
      advertisedCTCMax: 1100000,
      realisticBaseMin: 400000,
      realisticBaseMax: 850000,
      monthlyInHandMin: 29000,
      monthlyInHandMax: 58000,
    },
    prepTimelineMonths: 8,
    prepCostEstimate: {
      freeTier: "₹0 – ₹3,000 (DataTalksClub DE Zoomcamp, cloud free tiers)",
      structuredTier: "₹20,000 – ₹50,000 (Cloud + Big Data specialization)",
    },
    minPrepCostINR: 1000,
    keySkills: {
      foundational: ["Advanced SQL", "Python Scripting", "Linux & Shell", "Data Modeling (Star/Snowflake)"],
      technical: ["Apache Spark (PySpark)", "Airflow / Orchestration", "Cloud Warehouses (Snowflake/BigQuery)", "AWS S3 / Glue"],
      optional: ["dbt (Data Build Tool)", "Apache Kafka", "Docker", "Terraform"],
    },
    hiringRoutes: {
      campusWeight: "Medium",
      offCampusFeasibility: "Moderate",
      topHiringPatterns: "Advanced SQL + Python coding test → Data modeling & ETL design round → Hiring Manager.",
    },
    hiringMode: "Balanced",
    campusProbability: 45,
    entryFeasibility: "Competitive",
    evidenceQuality: "Sample Estimate",
    roadmapSteps: roadmap(8, [
      "Master Python data structures, file I/O, Linux commands, and advanced analytical SQL",
      "Learn dimensional data modeling (OLTP vs OLAP, Star Schema, Slowly Changing Dimensions)",
      "Hands-on with PySpark transformations, partitioning, and workflow orchestration in Airflow",
      "Build an end-to-end cloud pipeline ingesting live API data into BigQuery/Snowflake with dbt",
      "Document pipeline architecture diagrams, cost optimization, and repo setup on GitHub",
      "Practice SQL optimization challenges and scenario-based ETL failure recovery interviews",
      "Apply to data engineering boutiques (Sigmoid, Tiger Analytics, Tredence) and enterprise GCCs",
    ]),
  },
  {
    id: "ml-engineer",
    title: "AI/ML Engineer",
    domain: "Data",
    description: "Trains, evaluates, fine-tunes, and deploys machine learning models and production LLM/RAG pipelines into software products.",
    dailyWork: [
      "Curate datasets, engineer features, and run training/evaluation benchmarks",
      "Build production RAG pipelines, prompt guardrails, and vector search APIs",
      "Wrap PyTorch/scikit-learn models into FastAPI microservices with Docker",
      "Monitor model latency, token costs, hallucination rates, and data drift",
    ],
    eligibleDegrees: ["BTech/BE", "MCA", "BSc"],
    nonTechFriendly: false,
    tierAccessibility: {
      tier1: "Strongest odds; research labs, top startups, and enterprise AI teams recruit on campus.",
      tier2: "Possible with strong Kaggle/open-source proof or deployed GenAI engineering apps.",
      tier3: "Very competitive for pure ML research; highest conversion is Applied AI Engineer (FastAPI + LLMs + RAG).",
    },
    salary: {
      advertisedCTCMin: 600000,
      advertisedCTCMax: 1800000,
      realisticBaseMin: 500000,
      realisticBaseMax: 1200000,
      monthlyInHandMin: 36000,
      monthlyInHandMax: 80000,
    },
    prepTimelineMonths: 12,
    prepCostEstimate: {
      freeTier: "₹0 – ₹5,000 (Google Colab, fast.ai, Andrej Karpathy, HuggingFace docs)",
      structuredTier: "₹40,000 – ₹1,50,000 (PG Diploma / Applied AI cohort)",
    },
    minPrepCostINR: 3000,
    keySkills: {
      foundational: ["Linear Algebra & Calculus", "Probability & Statistics", "Python & NumPy/Pandas", "DSA"],
      technical: ["scikit-learn & XGBoost", "PyTorch / Deep Learning", "LLM APIs, RAG & Vector DBs", "FastAPI & Docker"],
      optional: ["LoRA Fine-Tuning", "MLflow / Weights & Biases", "ONNX / vLLM Inference"],
    },
    hiringRoutes: {
      campusWeight: "High",
      offCampusFeasibility: "Low",
      topHiringPatterns: "DSA + Python test → ML Math & Theory round → End-to-end MLOps/GenAI build review.",
    },
    hiringMode: "Campus-led",
    campusProbability: 60,
    entryFeasibility: "Competitive",
    evidenceQuality: "Limited Survey Data",
    roadmapSteps: roadmap(12, [
      "Solidify Python, NumPy, linear algebra, probability distributions, and hypothesis testing",
      "Classical ML: regression, trees, ensembles, cross-validation, and feature engineering",
      "Deep learning with PyTorch, transformers architecture, embeddings, and RAG systems",
      "Deploy 2 production AI apps (1 classical tabular predictor + 1 evaluated RAG/Agent service)",
      "Publish technical evaluation blogs, latency benchmarks, and reproducible GitHub repos",
      "Practice ML math derivations, failure-mode debugging, and medium LeetCode DSA",
      "Target AI-native startups, GCC data science teams, and research fellowships",
    ]),
  },
  {
    id: "cloud-engineer",
    title: "Cloud Engineer",
    domain: "Cloud/Security",
    description: "Provisions, secures, and optimizes cloud infrastructure across AWS, Azure, or Google Cloud for enterprise workloads.",
    dailyWork: [
      "Provision VPCs, EC2/VMs, load balancers, and managed databases using Terraform",
      "Configure IAM least-privilege policies, security groups, and SSL certificates",
      "Monitor CloudWatch/Azure Monitor alerts, backup policies, and monthly cloud spend",
      "Support engineering teams with environment setup and incident triage",
    ],
    eligibleDegrees: TECH,
    nonTechFriendly: false,
    tierAccessibility: {
      tier1: "Recruited into cloud platform and SRE tracks at product firms.",
      tier2: "High volume hiring across large IT service providers and cloud partners.",
      tier3: "AWS/Azure Associate certifications + Terraform labs significantly level the playing field.",
    },
    salary: {
      advertisedCTCMin: 400000,
      advertisedCTCMax: 900000,
      realisticBaseMin: 350000,
      realisticBaseMax: 700000,
      monthlyInHandMin: 26000,
      monthlyInHandMax: 50000,
    },
    prepTimelineMonths: 6,
    prepCostEstimate: {
      freeTier: "₹1,000 – ₹3,000 (AWS Free Tier, Adrian Cantrill / freeCodeCamp)",
      structuredTier: "₹15,000 – ₹40,000 (Includes official AWS/Azure Associate exam fee)",
    },
    minPrepCostINR: 2000,
    keySkills: {
      foundational: ["Linux Administration", "TCP/IP, DNS & Subnets", "Bash / Python Scripting"],
      technical: ["AWS (EC2, S3, VPC, IAM, RDS) or Azure", "Terraform (IaC)", "Docker Containers", "Cloud Monitoring"],
      optional: ["Kubernetes (EKS/AKS)", "FinOps / Cost Optimization", "Serverless (Lambda)"],
    },
    hiringRoutes: {
      campusWeight: "Medium",
      offCampusFeasibility: "Moderate",
      topHiringPatterns: "Linux + Networking quiz → Cloud architecture & troubleshooting scenario → HR.",
    },
    hiringMode: "Balanced",
    campusProbability: 45,
    entryFeasibility: "Moderate",
    evidenceQuality: "Sample Estimate",
    roadmapSteps: roadmap(6, [
      "Master Linux file permissions, systemd, SSH, DNS, routing, and CIDR subnetting",
      "Hands-on with core AWS/Azure compute, storage, VPC networking, and IAM security",
      "Automate infrastructure provisioning using Terraform modules and Docker containers",
      "Complete the Cloud Resume Challenge with multi-AZ architecture and CI/CD",
      "Earn AWS Solutions Architect Associate (or AZ-104) + document architecture diagrams",
      "Drill production outage scenarios (502 Bad Gateway, IAM permission denied, high CPU)",
      "Apply to AWS/Azure Premier Consulting Partners, managed service providers, and GCCs",
    ]),
  },
  {
    id: "devops-engineer",
    title: "DevOps Engineer",
    domain: "Cloud/Security",
    description: "Automates build, test, containerization, and deployment pipelines so software teams ship reliably multiple times a day.",
    dailyWork: [
      "Build and maintain GitHub Actions, GitLab CI, or Jenkins deployment pipelines",
      "Write multi-stage Dockerfiles and manage Kubernetes manifests / Helm charts",
      "Configure Prometheus + Grafana dashboards and alert rules for microservices",
      "Investigate failed builds, container crashes, and staging environment issues",
    ],
    eligibleDegrees: TECH,
    nonTechFriendly: false,
    tierAccessibility: {
      tier1: "Hired into Platform Engineering and Junior SRE teams.",
      tier2: "Mid-size SaaS companies and IT firms hire candidates with strong Docker/K8s labs.",
      tier3: "Accessible off-campus when backed by demonstrable CI/CD + Kubernetes GitHub repos.",
    },
    salary: {
      advertisedCTCMin: 400000,
      advertisedCTCMax: 1000000,
      realisticBaseMin: 350000,
      realisticBaseMax: 750000,
      monthlyInHandMin: 26000,
      monthlyInHandMax: 52000,
    },
    prepTimelineMonths: 7,
    prepCostEstimate: {
      freeTier: "₹0 – ₹3,000 (KodeKloud free labs, Killercoda, YouTube)",
      structuredTier: "₹20,000 – ₹50,000 (DevOps bootcamp + CKA exam)",
    },
    minPrepCostINR: 1000,
    keySkills: {
      foundational: ["Linux Internals", "Git Workflows", "Bash & Python Scripting", "Networking"],
      technical: ["Docker", "Kubernetes", "CI/CD (GitHub Actions / Jenkins)", "Terraform & AWS"],
      optional: ["Prometheus & Grafana", "ArgoCD (GitOps)", "Ansible"],
    },
    hiringRoutes: {
      campusWeight: "Low",
      offCampusFeasibility: "Moderate",
      topHiringPatterns: "Hands-on Dockerfile/CI task → Live Linux & Kubernetes debugging → Engineering Manager.",
    },
    hiringMode: "Off-campus friendly",
    campusProbability: 30,
    entryFeasibility: "Moderate",
    evidenceQuality: "Sample Estimate",
    roadmapSteps: roadmap(7, [
      "Deep Linux administration, process management, networking tools (netstat, curl, dig), and Bash",
      "Containerization with Docker (multi-stage builds, compose) and GitHub Actions CI/CD",
      "Kubernetes orchestration (Pods, Deployments, Services, Ingress, ConfigMaps) + Terraform",
      "Build an automated zero-downtime deployment pipeline with Prometheus/Grafana observability",
      "Publish reproducible infra repositories with clear runbooks and architecture diagrams",
      "Practice live broken-cluster and broken-pipeline debugging sessions on Killercoda",
      "Target SaaS startups, cloud consultancies, and DevOps-heavy product teams",
    ]),
  },
  {
    id: "cybersecurity-analyst",
    title: "Cybersecurity Analyst",
    domain: "Cloud/Security",
    description: "Monitors security alerts in a SOC, investigates phishing/malware incidents, and runs vulnerability assessments.",
    dailyWork: [
      "Monitor and triage SIEM alerts (Splunk, Sentinel, QRadar) for suspicious activity",
      "Investigate phishing emails, endpoint alerts, and firewall logs to rule out false positives",
      "Run vulnerability scans (Nessus, Burp Suite) and track patching SLAs with IT teams",
      "Document incident response reports and participate in rotational SOC coverage",
    ],
    eligibleDegrees: TECH,
    nonTechFriendly: false,
    tierAccessibility: {
      tier1: "Recruited by Big-4 cyber practices, banks, and product security teams.",
      tier2: "High volume hiring by MSSPs (Managed Security Service Providers) and IT giants.",
      tier3: "Strong off-campus entry for candidates with TryHackMe/HackTheBox proof and CompTIA Security+.",
    },
    salary: {
      advertisedCTCMin: 350000,
      advertisedCTCMax: 800000,
      realisticBaseMin: 300000,
      realisticBaseMax: 600000,
      monthlyInHandMin: 23000,
      monthlyInHandMax: 44000,
    },
    prepTimelineMonths: 7,
    prepCostEstimate: {
      freeTier: "₹0 – ₹2,000 (TryHackMe free rooms, PortSwigger Web Security Academy)",
      structuredTier: "₹25,000 – ₹70,000 (Security+ / CEH / SOC lab training)",
    },
    minPrepCostINR: 0,
    keySkills: {
      foundational: ["TCP/IP & OSI Model", "Linux & Windows Event Logs", "Identity & Access Basics"],
      technical: ["SIEM (Splunk / Microsoft Sentinel)", "Wireshark & Packet Analysis", "OWASP Top 10", "Incident Triage"],
      optional: ["Python Automation", "Burp Suite", "Cloud Security (AWS IAM)"],
    },
    hiringRoutes: {
      campusWeight: "Low",
      offCampusFeasibility: "High",
      topHiringPatterns: "Networking & Security quiz → Log analysis / OWASP scenario round → HR shift-fit check.",
    },
    hiringMode: "Off-campus friendly",
    campusProbability: 25,
    entryFeasibility: "Moderate",
    evidenceQuality: "Limited Survey Data",
    roadmapSteps: roadmap(7, [
      "Master networking protocols (TCP/UDP, HTTP, DNS, TLS) and Windows/Linux system logs",
      "Learn core defensive security concepts, MITRE ATT&CK framework, and OWASP Top 10",
      "Hands-on with Splunk/ELK log analysis, Wireshark pcaps, and PortSwigger labs",
      "Build a home SOC lab detecting simulated brute-force and malware traffic",
      "Publish 5 detailed incident investigation write-ups + CTF walkthroughs on Medium/GitHub",
      "Practice SOC L1 scenario interviews (ransomware containment, SQLi log detection)",
      "Apply to Big-4 Cyber (Deloitte, PwC, EY, KPMG), MSSPs, banking GCCs, and CERT-In empanelled firms",
    ]),
  },
  {
    id: "qa-automation",
    title: "QA Automation Engineer",
    domain: "Software",
    description: "Builds automated UI and API test suites in Playwright or Selenium to prevent regressions before code hits production.",
    dailyWork: [
      "Write and maintain end-to-end automated test scripts using Playwright or Selenium",
      "Test REST APIs using Postman and RestAssured for status codes, schemas, and edge cases",
      "Log reproducible bug reports in Jira with network traces and console logs",
      "Run nightly regression suites inside CI/CD pipelines before product releases",
    ],
    eligibleDegrees: ALL,
    nonTechFriendly: true,
    tierAccessibility: {
      tier1: "SDET roles at product companies pay close to SDE-1 packages.",
      tier2: "Consistent hiring across SaaS, banking tech, and IT services.",
      tier3: "One of the highest-conversion, lowest-barrier pathways into software engineering teams.",
    },
    salary: {
      advertisedCTCMin: 300000,
      advertisedCTCMax: 650000,
      realisticBaseMin: 280000,
      realisticBaseMax: 550000,
      monthlyInHandMin: 21000,
      monthlyInHandMax: 40000,
    },
    prepTimelineMonths: 4,
    prepCostEstimate: {
      freeTier: "₹0 (Playwright docs, TestAutomationU, Postman Academy)",
      structuredTier: "₹8,000 – ₹25,000 (SDET / Automation cohort)",
    },
    minPrepCostINR: 0,
    keySkills: {
      foundational: ["STLC & Test Case Design", "Java / Python / TypeScript Basics", "SQL Queries", "Git"],
      technical: ["Playwright / Selenium WebDriver", "API Testing (Postman / RestAssured)", "Page Object Model"],
      optional: ["CI Integration (GitHub Actions)", "JMeter Performance Testing", "Appium Mobile Testing"],
    },
    hiringRoutes: {
      campusWeight: "Medium",
      offCampusFeasibility: "High",
      topHiringPatterns: "Aptitude + Basic coding → Test case writing for a live feature → Automation framework round.",
    },
    hiringMode: "Off-campus friendly",
    campusProbability: 45,
    entryFeasibility: "High",
    evidenceQuality: "Verified Data",
    roadmapSteps: roadmap(4, [
      "Learn software testing fundamentals, boundary value analysis, bug life cycle, and SQL",
      "Pick Java or TypeScript and master loops, collections, OOP, and async handling",
      "Build Page Object Model automation suites in Playwright/Selenium + Postman API collections",
      "Automate 30+ test cases (login, cart, checkout, API edge cases) for a live e-commerce site",
      "Push framework to GitHub with HTML test reports and GitHub Actions execution badge",
      "Practice writing live XPath/CSS locators and string/array coding problems",
      "Apply to SDET/QA openings across Naukri, Instahyre, fintechs, and product startups",
    ]),
  },
  {
    id: "product-ops",
    title: "Product Operations Analyst",
    domain: "Business/Design",
    description: "Drives product execution by tracking launch metrics, automating workflows, and bridging product, engineering, and customer teams.",
    dailyWork: [
      "Monitor post-launch feature adoption funnels using SQL, Mixpanel, or Google Sheets",
      "Synthesize user support tickets and sales feedback into structured product briefs",
      "Maintain sprint trackers, release notes, and SOP documentation in Notion/Jira",
      "Run experiments to reduce onboarding drop-offs and operational bottlenecks",
    ],
    eligibleDegrees: ALL,
    nonTechFriendly: true,
    tierAccessibility: {
      tier1: "Frequent APM / Founder's Office / Product Analyst campus hiring.",
      tier2: "High growth in Bengaluru, NCR, and Mumbai consumer & SaaS startups.",
      tier3: "Accessible off-campus via sharp product teardowns, SQL skills, and startup internships.",
    },
    salary: {
      advertisedCTCMin: 400000,
      advertisedCTCMax: 900000,
      realisticBaseMin: 350000,
      realisticBaseMax: 700000,
      monthlyInHandMin: 26000,
      monthlyInHandMax: 50000,
    },
    prepTimelineMonths: 4,
    prepCostEstimate: {
      freeTier: "₹0 (Lenny's Newsletter free posts, SQLBolt, Notion, Mixpanel docs)",
      structuredTier: "₹10,000 – ₹30,000 (Product analytics & ops fellowship)",
    },
    minPrepCostINR: 0,
    keySkills: {
      foundational: ["Structured Problem Solving", "Advanced Sheets/Excel", "Crisp Written Communication"],
      technical: ["SQL for Product Funnels", "Product Analytics (Mixpanel/Amplitude)", "Jira & Notion Workflows"],
      optional: ["Figma Wireframing", "No-Code Automation (Zapier/Make)", "A/B Testing"],
    },
    hiringRoutes: {
      campusWeight: "High",
      offCampusFeasibility: "Moderate",
      topHiringPatterns: "Product teardown / RCA assignment → Metrics & guesstimate round → Founder/PM interview.",
    },
    hiringMode: "Campus-led",
    campusProbability: 55,
    entryFeasibility: "Moderate",
    evidenceQuality: "Limited Survey Data",
    roadmapSteps: roadmap(4, [
      "Master Google Sheets modeling, funnel metrics (DAU/MAU, Retention, NPS), and structured writing",
      "Learn SQL to query user events, conversion drop-offs, and cohort tables",
      "Learn wireframing in Figma and workflow automation using Notion/Jira",
      "Publish 3 deep product teardowns & RCA decks on Indian apps (Swiggy, Groww, Rapido)",
      "Build a clean Notion portfolio showcasing teardowns, SQL queries, and process playbooks",
      "Practice root-cause analysis ('Why did checkout drop 15%?') and guesstimate mocks",
      "Pitch Product Heads and Founders directly with a custom 3-slide improvement audit",
    ]),
  },
  {
    id: "uiux-designer",
    title: "UI/UX Designer",
    domain: "Business/Design",
    description: "Researches user behavior and crafts intuitive user flows, wireframes, design systems, and interactive Figma prototypes.",
    dailyWork: [
      "Conduct user interviews and usability tests to uncover friction in mobile/web flows",
      "Create low-fidelity wireframes and high-fidelity interactive prototypes in Figma",
      "Maintain shared component libraries, auto-layout tokens, and accessibility contrast",
      "Collaborate with frontend developers during design handoff and QA reviews",
    ],
    eligibleDegrees: ALL,
    nonTechFriendly: true,
    tierAccessibility: {
      tier1: "Design schools (NID/IDC) and top tech campuses get direct product offers.",
      tier2: "Degree branch is ignored if your Figma case studies show real business thinking.",
      tier3: "100% portfolio-meritocratic; college tier does not block interviews if work is strong.",
    },
    salary: {
      advertisedCTCMin: 300000,
      advertisedCTCMax: 800000,
      realisticBaseMin: 280000,
      realisticBaseMax: 600000,
      monthlyInHandMin: 21000,
      monthlyInHandMax: 44000,
    },
    prepTimelineMonths: 6,
    prepCostEstimate: {
      freeTier: "₹0 (Figma Education Free, Laws of UX, Refactoring UI notes, YouTube)",
      structuredTier: "₹20,000 – ₹80,000 (Design mentorship cohort)",
    },
    minPrepCostINR: 0,
    keySkills: {
      foundational: ["Visual Hierarchy & Typography", "Color Theory & Grids", "User Empathy & Heuristics"],
      technical: ["Figma (Auto-Layout, Variables, Components)", "User Flows & Wireframing", "Interactive Prototyping", "Usability Testing"],
      optional: ["Framer / Webflow", "Basic HTML/CSS", "Micro-interactions"],
    },
    hiringRoutes: {
      campusWeight: "Low",
      offCampusFeasibility: "High",
      topHiringPatterns: "Portfolio screening → 48-hour design assignment → Whiteboarding & critique round.",
    },
    hiringMode: "Off-campus friendly",
    campusProbability: 20,
    entryFeasibility: "High",
    evidenceQuality: "Sample Estimate",
    roadmapSteps: roadmap(6, [
      "Study Laws of UX, Nielsen heuristics, typography scales, spacing systems, and color contrast",
      "Master Figma: Auto-layout, component variants, design tokens, and interactive prototypes",
      "Learn user research, information architecture, and edge-case state design (empty/error/loading)",
      "Create 3 deep UX case studies solving real Indian workflows (B2B SaaS + Consumer Mobile)",
      "Publish portfolio on Framer/Notion showing problem, iterations, trade-offs, and metrics",
      "Get portfolio critiques on ADPList and practice 45-minute live whiteboard challenges",
      "Apply via Wellfound, LinkedIn, Contra, and direct outreach to Head of Design / Founders",
    ]),
  },
  {
    id: "business-analyst",
    title: "Business Analyst",
    domain: "Business/Design",
    description: "Translates business problems into structured requirements (BRDs/User Stories), process maps, and data-backed recommendations.",
    dailyWork: [
      "Interview client stakeholders to gather requirements and document user stories",
      "Map current (As-Is) vs proposed (To-Be) operational processes and edge cases",
      "Analyze business performance using Excel models, SQL queries, and Power BI",
      "Coordinate UAT testing with engineering and sign off on feature releases",
    ],
    eligibleDegrees: ALL,
    nonTechFriendly: true,
    tierAccessibility: {
      tier1: "Major campus recruiter track across management consulting, BFSI, and GCCs.",
      tier2: "High intake by Deloitte, Accenture, ZS, Mu Sigma, Cognizant, and mid-size SaaS.",
      tier3: "Accessible for BCom/BBA/BTech graduates with strong communication, SQL, and case prep.",
    },
    salary: {
      advertisedCTCMin: 350000,
      advertisedCTCMax: 800000,
      realisticBaseMin: 320000,
      realisticBaseMax: 650000,
      monthlyInHandMin: 24000,
      monthlyInHandMax: 46000,
    },
    prepTimelineMonths: 4,
    prepCostEstimate: {
      freeTier: "₹0 (Case interview playbooks, SQLBolt, Excel tutorials)",
      structuredTier: "₹10,000 – ₹30,000 (BA + Analytics prep program)",
    },
    minPrepCostINR: 0,
    keySkills: {
      foundational: ["Excel Modeling", "Stakeholder Communication", "MECE Problem Structuring"],
      technical: ["SQL", "Power BI", "BRD / FRD & Agile User Stories", "Process Flowcharts (BPMN)"],
      optional: ["Jira & Confluence", "Basic Python", "Domain Knowledge (BFSI / Retail)"],
    },
    hiringRoutes: {
      campusWeight: "High",
      offCampusFeasibility: "Moderate",
      topHiringPatterns: "CAT-style Aptitude & DI test → Business Case / Guesstimate round → Group Discussion & HR.",
    },
    hiringMode: "Campus-led",
    campusProbability: 55,
    entryFeasibility: "High",
    evidenceQuality: "Verified Data",
    roadmapSteps: roadmap(4, [
      "Sharpen quantitative aptitude, data interpretation, and advanced Excel modeling",
      "Learn Agile Scrum ceremonies, BRD/FRD documentation, user stories, and acceptance criteria",
      "Build proficiency in SQL querying and Power BI dashboard creation",
      "Create 2 complete BA portfolio artifacts (1 BRD + wireframe pack, 1 SQL/BI profitability deck)",
      "Tailor resume with quantified academic/internship impact and structured problem statements",
      "Practice 15 guesstimates, profitability cases, and group discussion topics",
      "Apply to consulting firms, BFSI GCCs, IT services BA tracks, and B2B SaaS companies",
    ]),
  },
  {
    id: "financial-analyst",
    title: "Financial Analyst",
    domain: "Business/Design",
    description: "Builds 3-statement financial models, valuation decks, budgets, and variance reports for corporates, KPOs, and investment teams.",
    dailyWork: [
      "Update 3-statement financial models (P&L, Balance Sheet, Cash Flow) after quarterly filings",
      "Perform budget vs actual variance analysis and prepare monthly MIS decks for CFO teams",
      "Benchmark comparable public companies (peer multiples, DCF valuation inputs)",
      "Automate financial reporting templates in Excel and Power BI",
    ],
    eligibleDegrees: ["BCom", "BBA", "MBA", "BA", "BSc", "Other"],
    nonTechFriendly: true,
    tierAccessibility: {
      tier1: "Front-end IB, private equity, and corporate finance roles recruit heavily on campus.",
      tier2: "Strong hiring by global banks' GCCs (JPMorgan, Goldman, Citi, Barclays) and Big-4 deals teams.",
      tier3: "Accessible via financial KPOs (TresVista, Acuity, Evalueserve), corporate FP&A, and valuation boutiques.",
    },
    salary: {
      advertisedCTCMin: 350000,
      advertisedCTCMax: 900000,
      realisticBaseMin: 300000,
      realisticBaseMax: 650000,
      monthlyInHandMin: 22000,
      monthlyInHandMax: 46000,
    },
    prepTimelineMonths: 5,
    prepCostEstimate: {
      freeTier: "₹0 – ₹1,000 (Zerodha Varsity, Aswath Damodaran YouTube, SEC/BSE filings)",
      structuredTier: "₹15,000 – ₹60,000 (Financial Modelling cohort or NISM / CFA L1 prep)",
    },
    minPrepCostINR: 0,
    keySkills: {
      foundational: ["Financial Accounting (IndAS/IFRS)", "Corporate Finance", "Advanced Excel (Shortcut-driven)"],
      technical: ["3-Statement Financial Modelling", "DCF & Relative Valuation", "FP&A Variance Analysis", "Power BI"],
      optional: ["CFA Level 1 / NISM Research Analyst", "Python for Finance", "Bloomberg / Capital IQ Basics"],
    },
    hiringRoutes: {
      campusWeight: "High",
      offCampusFeasibility: "Moderate",
      topHiringPatterns: "Accounting & Finance test → 2-hour Excel Financial Modelling test → Technical Valuation interview.",
    },
    hiringMode: "Balanced",
    campusProbability: 50,
    entryFeasibility: "Moderate",
    evidenceQuality: "Sample Estimate",
    roadmapSteps: roadmap(5, [
      "Master reading Indian annual reports (Schedule III P&L, Balance Sheet, Cash Flow, Notes)",
      "Keyboard-only Excel mastery: INDEX-MATCH, XIRR, sensitivity tables, and dynamic schedules",
      "Learn 3-statement linkage, working capital schedules, debt modeling, and DCF valuation",
      "Build 2 institutional-grade equity research & DCF valuation models on listed NSE companies",
      "Publish clean PDF initiation reports + dynamic Excel models in a public Drive/GitHub link",
      "Drill technical accounting questions (depreciation impact, EV to Equity bridge, WACC)",
      "Target Investment Banking KPOs (TresVista, Acuity), Big-4 Valuation/TAS, and corporate FP&A teams",
    ]),
  },
];

export const STUDENT_CASE_STUDIES: StudentCaseStudy[] = [
  {
    id: "rohan-tier3-backend",
    name: "Rohan Verma",
    avatarInitials: "RV",
    collegeTier: "Tier 3",
    degree: "BTech CSE (Regional Affiliated College, UP)",
    startingProfile: "No product companies visited campus; highest campus offer was ₹3.6 LPA with a 2-year ₹1.5L service bond.",
    targetRole: "Backend Software Developer",
    careerId: "backend-developer",
    prepMonths: 7,
    prepSpendINR: 1800,
    hiringChannel: "Off-Campus via Wellfound + Engineer Referral",
    advertisedCTC: "₹8.5 LPA",
    monthlyInHand: "₹54,200 / mo",
    quote: "Skipping a ₹1.2 Lakh bootcamp and building two deployed Go + Postgres APIs with load-testing benchmarks got me 6 startup callbacks in 3 weeks.",
    whatWorked: [
      "Solved 220 curated DSA problems (Striver A2Z) instead of chasing 800 random questions",
      "Built a multi-tenant UPI webhook reconciliation API with Redis caching, Docker, and Swagger docs",
      "Sent short 4-line cold messages to backend engineers with a live Postman collection and architecture diagram",
    ],
    whatSkipped: [
      "Declined ₹1.2L 'pay-after-placement' ISA bootcamp that took 18% of CTC for 2 years",
      "Ignored generic Todo/Weather clone projects and paid certificate mills",
    ],
  },
  {
    id: "priya-bca-qa",
    name: "Priya Nair",
    avatarInitials: "PN",
    collegeTier: "Tier 2",
    degree: "BCA (State University College, Kochi)",
    startingProfile: "Worried that BTech eligibility filters would block all software roles; had basic Java syntax knowledge.",
    targetRole: "QA Automation Engineer (SDET Intern → Full-Time)",
    careerId: "qa-automation",
    prepMonths: 4,
    prepSpendINR: 0,
    hiringChannel: "Off-Campus LinkedIn Direct Outreach to QA Leads",
    advertisedCTC: "₹5.4 LPA",
    monthlyInHand: "₹37,800 / mo",
    quote: "Instead of sending plain resumes, I recorded a 2-minute Loom running 25 automated Playwright tests on the startup's own staging checkout page.",
    whatWorked: [
      "Mastered Playwright with TypeScript and Page Object Model using 100% free documentation",
      "Created an automated API + UI regression repository with GitHub Actions nightly runs",
      "Converted a ₹20,000/month 3-month SDET internship into a full-time ₹5.4 LPA offer",
    ],
    whatSkipped: [
      "Avoided manual-only testing roles that lacked automation growth",
      "Didn't wait for MCA just to enter the software industry",
    ],
  },
  {
    id: "ankit-bcom-analytics",
    name: "Ankit Sharma",
    avatarInitials: "AS",
    collegeTier: "Tier 2",
    degree: "BCom Hons (Evening College, Delhi)",
    startingProfile: "Zero coding background; campus placements were mostly sales/BPO roles disguised as 'Management Trainee'.",
    targetRole: "Business / Data Analyst",
    careerId: "data-analyst",
    prepMonths: 5,
    prepSpendINR: 2500,
    hiringChannel: "Naukri + Alumni Referral at Gurugram Fintech GCC",
    advertisedCTC: "₹6.2 LPA",
    monthlyInHand: "₹43,100 / mo",
    quote: "Combining my BCom accounting fundamentals with SQL window functions and Power BI made me stand out against CS grads who didn't understand unit economics.",
    whatWorked: [
      "Learned advanced SQL (CTEs, window functions, cohort retention queries) on Mode & StrataScratch",
      "Published 3 Indian D2C & UPI unit-economics Power BI dashboards with P&L impact recommendations",
      "Targeted Gurugram/Noida analytics GCCs and fintech operations teams",
    ],
    whatSkipped: [
      "Skipped deep learning / neural network courses that weren't tested in analyst interviews",
      "Avoided 'Data Science' degree loans costing ₹3.5 Lakhs+",
    ],
  },
];

export const PLACEMENT_COMPARISONS: PlacementComparisonRecord[] = [
  {
    id: "tier1-iit-nit-circuital",
    institutionCategory: "Tier-1 Old IITs / Top NITs (CSE, ECE, EE)",
    tier: "Tier 1",
    examples: "IIT Bombay/Delhi/Madras, NIT Trichy/Surathkal/Warangal",
    advertisedHighestCTC: "₹1.2 Cr – ₹2.0 Cr",
    realisticMedianCTC: "₹18.0 – ₹24.5 LPA",
    medianMonthlyInHand: "₹1,05,000 – ₹1,38,000",
    brochurePlacedPercent: 94,
    actualEnrolledPlacedPercent: 86,
    onCampusVsOffCampusRatio: "85% Campus : 15% Off-Campus",
    realityNote: "Headline ₹50L+ CTCs often include 4-year ESOPs and one-time relocation/joining bonuses; real Year-1 fixed base is typically 55–68% of headline CTC.",
  },
  {
    id: "tier1-iit-nit-core",
    institutionCategory: "Tier-1 IITs / NITs (Mechanical, Civil, Chemical, Meta)",
    tier: "Tier 1",
    examples: "IIT Roorkee/Guwahati, MNNIT, VNIT, MNIT (Core Branches)",
    advertisedHighestCTC: "₹45.0 – ₹65.0 LPA",
    realisticMedianCTC: "₹9.5 – ₹13.5 LPA",
    medianMonthlyInHand: "₹64,000 – ₹84,000",
    brochurePlacedPercent: 84,
    actualEnrolledPlacedPercent: 71,
    onCampusVsOffCampusRatio: "75% Campus : 25% Off-Campus",
    realityNote: "Nearly 60% of placed core students pivot into Data Analytics, Business Analyst, Consulting, or FinTech SDE roles open to all branches.",
  },
  {
    id: "tier1-iiit-bits",
    institutionCategory: "Tier-1 Focused Tech Institutes (BITS / Top IIITs)",
    tier: "Tier 1",
    examples: "BITS Pilani, IIIT Hyderabad, IIIT Bangalore, IIIT Delhi",
    advertisedHighestCTC: "₹85.0 LPA – ₹1.1 Cr",
    realisticMedianCTC: "₹16.5 – ₹23.0 LPA",
    medianMonthlyInHand: "₹98,000 – ₹1,30,000",
    brochurePlacedPercent: 92,
    actualEnrolledPlacedPercent: 84,
    onCampusVsOffCampusRatio: "80% Campus : 20% Off-Campus",
    realityNote: "6-month practice school / semester internships convert 40%+ students into PPOs before final placement season starts.",
  },
  {
    id: "tier2-govt-state",
    institutionCategory: "Tier-2 Premier State Govt Universities",
    tier: "Tier 2",
    examples: "COEP Pune, VJTI Mumbai, DTU/NSUT, Jadavpur, Anna Univ CEG",
    advertisedHighestCTC: "₹44.0 – ₹60.0 LPA",
    realisticMedianCTC: "₹7.5 – ₹11.5 LPA",
    medianMonthlyInHand: "₹51,000 – ₹74,000",
    brochurePlacedPercent: 85,
    actualEnrolledPlacedPercent: 68,
    onCampusVsOffCampusRatio: "65% Campus : 35% Off-Campus",
    realityNote: "Exceptionally high ROI due to low government tuition fees (₹40k–₹1.5L/year), giving a payback period of under 6 months.",
  },
  {
    id: "tier2-private-uni",
    institutionCategory: "Tier-2 Large Private Universities",
    tier: "Tier 2",
    examples: "VIT, Manipal (MIT), Thapar, SRM Main, PES University",
    advertisedHighestCTC: "₹50.0 LPA – ₹1.0 Cr",
    realisticMedianCTC: "₹5.5 – ₹7.8 LPA",
    medianMonthlyInHand: "₹38,000 – ₹53,000",
    brochurePlacedPercent: 88,
    actualEnrolledPlacedPercent: 61,
    onCampusVsOffCampusRatio: "60% Campus : 40% Off-Campus",
    realityNote: "Massive batch sizes (2,500–6,000 CS students) create intense internal competition; top 15% land product roles while median lands service/GCC roles.",
  },
  {
    id: "tier3-regional-cse",
    institutionCategory: "Tier-3 Regional Affiliated Engineering Colleges (CSE/IT)",
    tier: "Tier 3",
    examples: "AKTU, RGPV, SPPU, VTU, JNTU, MAKAUT Affiliated Colleges",
    advertisedHighestCTC: "₹24.0 – ₹40.0 LPA (Off-Campus)",
    realisticMedianCTC: "₹3.5 – ₹4.8 LPA",
    medianMonthlyInHand: "₹24,500 – ₹33,500",
    brochurePlacedPercent: 78,
    actualEnrolledPlacedPercent: 38,
    onCampusVsOffCampusRatio: "30% Campus : 70% Off-Campus",
    realityNote: "Brochures often count off-campus winners and exclude 'unregistered/ineligible' students from the denominator. Real upside comes from off-campus proof-of-work.",
  },
  {
    id: "tier3-regional-core",
    institutionCategory: "Tier-3 Regional Engineering Colleges (Core Branches)",
    tier: "Tier 3",
    examples: "Regional Private Colleges — Mechanical, Civil, Electrical",
    advertisedHighestCTC: "₹10.0 – ₹15.0 LPA",
    realisticMedianCTC: "₹2.8 – ₹3.8 LPA",
    medianMonthlyInHand: "₹19,500 – ₹26,500",
    brochurePlacedPercent: 65,
    actualEnrolledPlacedPercent: 24,
    onCampusVsOffCampusRatio: "25% Campus : 75% Off-Campus",
    realityNote: "Many campus drives are sales/BPO roles with lock-in bonds. Pivoting early to Data Analytics, QA Automation, or Cloud certs drastically improves cash flow.",
  },
  {
    id: "tier2-3-general-degrees",
    institutionCategory: "Tier-2/3 BCA, BSc CS & BCom / BBA Colleges",
    tier: "Tier 3",
    examples: "DU Non-Tier-1, Mumbai/Pune/Bangalore/Chennai Degree Colleges",
    advertisedHighestCTC: "₹12.0 – ₹18.0 LPA",
    realisticMedianCTC: "₹3.2 – ₹4.6 LPA",
    medianMonthlyInHand: "₹22,500 – ₹32,000",
    brochurePlacedPercent: 70,
    actualEnrolledPlacedPercent: 31,
    onCampusVsOffCampusRatio: "20% Campus : 80% Off-Campus",
    realityNote: "Low degree cost means zero debt, but campus cells are weak. Portfolio-first roles (Frontend, UI/UX, Data Analyst, Financial Analyst, QA) yield the best ROI.",
  },
];

export const FAQ_ITEMS: FAQItem[] = [
  {
    id: "faq-ctc-vs-inhand",
    category: "CTC & Taxes",
    question: "Why does a '12 LPA' fresher offer only pay ₹62,000–₹70,000 per month in-hand?",
    answer: "In India, Cost to Company (CTC) is not salary. A typical ₹12 LPA fresher package often bundles ₹8.5L fixed pay + ₹1L one-time joining bonus (with a 2-year clawback) + ₹1L performance variable (paid annually at 50–80%) + ₹1.5L in employer PF, gratuity (only paid after 5 years), and insurance. After Employee PF, Professional Tax (₹200), and TDS, monthly cash in your bank is derived strictly from the ₹8.5L fixed component.",
    highlightMetric: "Rule of thumb: Realistic monthly in-hand is roughly 5.5% to 6.5% of Fixed Base, not Headline CTC.",
  },
  {
    id: "faq-esops-fresher",
    category: "CTC & Taxes",
    question: "Should I count ESOPs or RSUs in my first-year financial planning?",
    answer: "Treat unvested startup ESOPs as ₹0 liquid cash for your monthly budget and education loan EMIs. Most ESOPs vest over 4 years (25% per year after a 1-year cliff) and cannot be converted to cash unless the startup holds a buyback or IPOs. Public company RSUs (like Amazon, Microsoft, or Google) are liquid once vested, but still follow a multi-year vesting schedule.",
    highlightMetric: "Never sign an apartment lease or calculate loan EMI capacity using unvested ESOP value.",
  },
  {
    id: "faq-tier3-offcampus",
    category: "Tier-3 & Off-Campus",
    question: "I am in a Tier-3 college where only mass recruiters or BPOs visit. What is my highest-probability escape route?",
    answer: "Stop relying on your college placement cell by 5th semester. Pick one proof-of-work heavy role — Frontend (React/TS), Backend (Node/Go/Java + SQL), QA Automation (Playwright), Data Analytics (SQL + Power BI), or UI/UX. Ship 2–3 production-grade projects solving real Indian business workflows, record a 90-second Loom walkthrough, and apply directly to 50–500 employee startups and GCCs via Wellfound, Instahyre, and engineer referrals.",
    highlightMetric: "70% of Tier-3 breakouts happen via off-campus startups and 3–6 month paid internships that convert to full-time.",
  },
  {
    id: "faq-certs-vs-github",
    category: "Skills & Proof of Work",
    question: "Do paid certifications (₹30,000–₹1,50,000 bootcamps) guarantee placements over GitHub repositories?",
    answer: "For Software, Data Analytics, QA, and UI/UX, hiring managers never filter by paid bootcamp certificates — they inspect your GitHub commits, live deployed URLs, SQL query complexity, and live problem-solving. The ONLY domains where official vendor exams directly pass HR filters are Cloud (AWS SAA-C03 / Azure AZ-104), Cybersecurity (CompTIA Security+), and Finance (CFA Level 1 / NISM).",
    highlightMetric: "Save ₹80,000+ on generic coding certificates; spend only on official vendor exams in Cloud, Security, or Finance.",
  },
  {
    id: "faq-nontech-degree",
    category: "Tier-3 & Off-Campus",
    question: "Can BCom, BBA, BA, or BSc graduates realistically break into high-ROI tech-adjacent careers?",
    answer: "Yes — provided you target roles where business context or portfolio output beats a 4-year CS degree filter. Data Analyst, Business Analyst, Financial Analyst, Product Operations, UI/UX Designer, Frontend Developer, and QA Automation openly hire non-BTech graduates. Pure AI/ML and core Backend roles at large enterprises usually enforce strict BTech/MCA degree gates for freshers.",
    highlightMetric: "7 of our 14 tracked career paths are explicitly non-tech degree friendly.",
  },
  {
    id: "faq-placement-brochure-distortion",
    category: "Data Methodology",
    question: "How do colleges legally claim '95% Placement' when half my seniors are still job hunting?",
    answer: "Three common denominator tricks distort placement brochures: (1) Students with <6.5 CGPA or active backlogs are marked 'ineligible' and excluded, (2) Students who don't land offers by January are nudged to sign 'Opting for Higher Studies' forms, and (3) A single student holding 3 mass-recruiter offers is counted as '3 offers'. ROIPath tracks placement % against total enrolled batch size.",
    highlightMetric: "Always ask seniors for: (Unique Students Placed ÷ Total Final-Year Enrolled Students) × 100.",
  },
  {
    id: "faq-service-bonds",
    category: "CTC & Taxes",
    question: "Should I sign a 2-year service bond with a ₹1.5 Lakh penalty for a ₹3.5 LPA fresher role?",
    answer: "Evaluate the training quality and your financial runway. If you have zero emergency savings and need immediate experience, a legitimate IT service role gives you enterprise project exposure. However, never hand over original academic mark sheets (which is unlawful in India), and watch out for 'training-fee' bonds where companies charge you upfront before paying a salary.",
    highlightMetric: "If monthly savings after rent and food are under ₹5,000, a 2-year lock-in delays your compounding curve.",
  },
  {
    id: "faq-data-honesty",
    category: "Data Methodology",
    question: "Where does ROIPath India source its salary and timeline estimates?",
    answer: "Our numbers are synthesized from public offer breakdowns (AmbitionBox, Glassdoor India, Levels.fyi India, Reddit r/developersIndia verified offer threads), NIRF median salary disclosures, and fresher payslip audits across Tier-1, Tier-2, and Tier-3 graduates. Each career carries an explicit Evidence Quality badge ('Verified Data', 'Sample Estimate', or 'Limited Survey Data') so you know the confidence level.",
    highlightMetric: "Zero sponsored bootcamp rankings. 100% conservative, tax-adjusted fresher numbers.",
  },
];

export const getCareer = (id: string): Career | undefined => CAREERS.find((c) => c.id === id);
