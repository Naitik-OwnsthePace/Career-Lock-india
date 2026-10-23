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
  tierAccessibility: { tier1: string; tier2: string; tier3: string };
  salary: {
    advertisedCTCMin: number;
    advertisedCTCMax: number;
    realisticBaseMin: number;
    realisticBaseMax: number;
    monthlyInHandMin: number;
    monthlyInHandMax: number;
  };
  prepTimelineMonths: number;
  prepCostEstimate: { freeTier: string; structuredTier: string };
  minPrepCostINR: number;
  keySkills: { foundational: string[]; technical: string[]; optional: string[] };
  hiringRoutes: { campusWeight: string; offCampusFeasibility: string; topHiringPatterns: string };
  hiringMode: HiringMode;
  campusProbability: number;
  entryFeasibility: Feasibility;
  evidenceQuality: EvidenceQuality;
  roadmapSteps: RoadmapStep[];
}

function roadmap(months: number, f: [string, string, string, string, string, string, string]): RoadmapStep[] {
  const titles = ["Prerequisites", "Core Skills", "Applied Skills", "Projects", "GitHub & Resume", "Mock Interviews", "Apply & Iterate"];
  const weights = [0.1, 0.25, 0.2, 0.2, 0.08, 0.1, 0.07];
  return titles.map((title, i) => {
    const w = Math.max(1, Math.round(months * 4 * weights[i]));
    return { step: i + 1, title, duration: `${w} week${w > 1 ? "s" : ""}`, focus: f[i] };
  });
}

const TECH = ["BTech/BE", "BCA", "MCA", "BSc"];
const ALL = ["BTech/BE", "BCA", "MCA", "BSc", "BCom", "BA", "BBA", "MBA", "Other"];

export const CAREERS: Career[] = [
  {
    id: "backend-developer", title: "Backend Software Developer", domain: "Software",
    description: "Builds the APIs, databases and business logic that power apps used by millions of Indian customers.",
    dailyWork: ["Fix bugs in existing REST APIs", "Write unit tests and review peers' pull requests", "Join daily stand-ups and sprint planning", "Write small SQL queries and migrations"],
    eligibleDegrees: TECH, nonTechFriendly: false,
    tierAccessibility: { tier1: "Strong campus pull from product companies.", tier2: "Service + mid-size product drives; DSA decides.", tier3: "Mostly off-campus; projects and contests matter most." },
    salary: { advertisedCTCMin: 400000, advertisedCTCMax: 1200000, realisticBaseMin: 350000, realisticBaseMax: 900000, monthlyInHandMin: 26000, monthlyInHandMax: 62000 },
    prepTimelineMonths: 8, prepCostEstimate: { freeTier: "₹0 – ₹2,000 (YouTube, LeetCode free, docs)", structuredTier: "₹15,000 – ₹45,000 (DSA + backend course)" }, minPrepCostINR: 0,
    keySkills: { foundational: ["DSA basics", "OOP", "Git"], technical: ["Java/Node/Python", "SQL", "REST APIs", "System basics"], optional: ["Docker", "Redis", "Kafka"] },
    hiringRoutes: { campusWeight: "High", offCampusFeasibility: "Moderate", topHiringPatterns: "Online assessment → 2 tech rounds → HR. DSA heavy." },
    hiringMode: "Balanced", campusProbability: 55, entryFeasibility: "Moderate", evidenceQuality: "Verified Data",
    roadmapSteps: roadmap(8, ["One language + Git", "DSA: arrays to graphs", "SQL, REST, auth", "2 deployed API projects", "Clean GitHub, 1-page resume", "Weekly DSA mocks", "Off-campus portals + referrals"]),
  },
  {
    id: "frontend-developer", title: "Frontend Developer", domain: "Software",
    description: "Turns designs into fast, accessible web interfaces with React and modern tooling.",
    dailyWork: ["Build UI components from Figma", "Fix layout bugs across devices", "Connect screens to APIs", "Improve page speed"],
    eligibleDegrees: [...TECH, "Other"], nonTechFriendly: true,
    tierAccessibility: { tier1: "Product and startup offers common.", tier2: "Good startup demand.", tier3: "Portfolio-driven; very feasible off-campus." },
    salary: { advertisedCTCMin: 350000, advertisedCTCMax: 900000, realisticBaseMin: 300000, realisticBaseMax: 700000, monthlyInHandMin: 23000, monthlyInHandMax: 50000 },
    prepTimelineMonths: 6, prepCostEstimate: { freeTier: "₹0 (freeCodeCamp, MDN, The Odin Project)", structuredTier: "₹8,000 – ₹30,000" }, minPrepCostINR: 0,
    keySkills: { foundational: ["HTML", "CSS", "JavaScript"], technical: ["React", "TypeScript", "Responsive design", "APIs"], optional: ["Next.js", "Testing", "Animations"] },
    hiringRoutes: { campusWeight: "Medium", offCampusFeasibility: "High", topHiringPatterns: "Take-home assignment → live coding → culture fit." },
    hiringMode: "Off-campus friendly", campusProbability: 35, entryFeasibility: "High", evidenceQuality: "Sample Estimate",
    roadmapSteps: roadmap(6, ["HTML/CSS fundamentals", "Modern JavaScript", "React + TypeScript", "3 polished portfolio sites", "Live portfolio + GitHub", "Machine-coding mocks", "Startups, Wellfound, LinkedIn"]),
  },
  {
    id: "fullstack-developer", title: "Full-Stack Developer", domain: "Software",
    description: "Owns features end-to-end — UI, API and database — especially at startups.",
    dailyWork: ["Ship small features across stack", "Debug production issues", "Write DB queries", "Deploy to cloud"],
    eligibleDegrees: TECH, nonTechFriendly: false,
    tierAccessibility: { tier1: "Startups and product firms.", tier2: "Startups value shipped projects.", tier3: "Off-campus via projects and freelancing." },
    salary: { advertisedCTCMin: 400000, advertisedCTCMax: 1000000, realisticBaseMin: 350000, realisticBaseMax: 800000, monthlyInHandMin: 26000, monthlyInHandMax: 56000 },
    prepTimelineMonths: 9, prepCostEstimate: { freeTier: "₹0 – ₹2,000", structuredTier: "₹20,000 – ₹60,000" }, minPrepCostINR: 0,
    keySkills: { foundational: ["JavaScript", "Git", "HTTP basics"], technical: ["React", "Node/Express", "SQL/MongoDB", "Deployment"], optional: ["Docker", "GraphQL", "CI/CD"] },
    hiringRoutes: { campusWeight: "Medium", offCampusFeasibility: "High", topHiringPatterns: "Assignment → project deep-dive → system basics." },
    hiringMode: "Off-campus friendly", campusProbability: 40, entryFeasibility: "Moderate", evidenceQuality: "Sample Estimate",
    roadmapSteps: roadmap(9, ["JS + Git", "Frontend React", "Backend Node + DB", "2 full apps with auth", "Case-study README", "Project walkthrough mocks", "Startup outreach"]),
  },
  {
    id: "data-analyst", title: "Data Analyst", domain: "Data",
    description: "Turns business data into dashboards and decisions using SQL, Excel and BI tools.",
    dailyWork: ["Write SQL for weekly reports", "Update Power BI/Tableau dashboards", "Clean messy Excel data", "Present findings to managers"],
    eligibleDegrees: ALL, nonTechFriendly: true,
    tierAccessibility: { tier1: "Analytics firms and consulting.", tier2: "Wide demand across sectors.", tier3: "Highly accessible with a portfolio." },
    salary: { advertisedCTCMin: 350000, advertisedCTCMax: 700000, realisticBaseMin: 300000, realisticBaseMax: 600000, monthlyInHandMin: 22000, monthlyInHandMax: 42000 },
    prepTimelineMonths: 5, prepCostEstimate: { freeTier: "₹0 (Kaggle, Google Sheets, Power BI Desktop)", structuredTier: "₹10,000 – ₹35,000" }, minPrepCostINR: 0,
    keySkills: { foundational: ["Excel", "Statistics basics", "Business sense"], technical: ["SQL", "Power BI/Tableau", "Python (pandas)"], optional: ["A/B testing", "Looker"] },
    hiringRoutes: { campusWeight: "Medium", offCampusFeasibility: "High", topHiringPatterns: "SQL test → case study → stakeholder round." },
    hiringMode: "Off-campus friendly", campusProbability: 40, entryFeasibility: "High", evidenceQuality: "Verified Data",
    roadmapSteps: roadmap(5, ["Excel + statistics", "SQL joins to window functions", "Power BI dashboards", "3 public-data case studies", "Portfolio + resume", "SQL + case mocks", "Naukri, LinkedIn, referrals"]),
  },
  {
    id: "data-engineer", title: "Data Engineer", domain: "Data",
    description: "Builds the pipelines that move and clean data so analysts and ML teams can use it.",
    dailyWork: ["Maintain ETL jobs", "Fix failing pipelines", "Optimise SQL", "Model warehouse tables"],
    eligibleDegrees: TECH, nonTechFriendly: false,
    tierAccessibility: { tier1: "Product and fintech.", tier2: "Service firms train freshers.", tier3: "Harder as a fresher; start as analyst." },
    salary: { advertisedCTCMin: 450000, advertisedCTCMax: 1100000, realisticBaseMin: 400000, realisticBaseMax: 850000, monthlyInHandMin: 29000, monthlyInHandMax: 58000 },
    prepTimelineMonths: 8, prepCostEstimate: { freeTier: "₹0 – ₹3,000 (cloud free tiers)", structuredTier: "₹20,000 – ₹50,000" }, minPrepCostINR: 1000,
    keySkills: { foundational: ["SQL", "Python", "Linux"], technical: ["Spark", "Airflow", "Data warehousing", "Cloud storage"], optional: ["Kafka", "dbt", "Snowflake"] },
    hiringRoutes: { campusWeight: "Medium", offCampusFeasibility: "Moderate", topHiringPatterns: "SQL + Python test → pipeline design → HR." },
    hiringMode: "Balanced", campusProbability: 45, entryFeasibility: "Competitive", evidenceQuality: "Sample Estimate",
    roadmapSteps: roadmap(8, ["Python + SQL", "Data modelling", "Spark + Airflow", "End-to-end pipeline project", "GitHub with diagrams", "SQL + design mocks", "Apply to data teams"]),
  },
  {
    id: "ml-engineer", title: "AI/ML Engineer", domain: "Data",
    description: "Builds and deploys machine-learning and GenAI features into real products.",
    dailyWork: ["Clean training data", "Run experiments", "Evaluate model quality", "Wrap models in APIs"],
    eligibleDegrees: ["BTech/BE", "MCA", "BSc"], nonTechFriendly: false,
    tierAccessibility: { tier1: "Best odds; research-style roles.", tier2: "Possible with strong projects.", tier3: "Very competitive; enter via data/SDE first." },
    salary: { advertisedCTCMin: 600000, advertisedCTCMax: 1800000, realisticBaseMin: 500000, realisticBaseMax: 1200000, monthlyInHandMin: 36000, monthlyInHandMax: 80000 },
    prepTimelineMonths: 12, prepCostEstimate: { freeTier: "₹0 – ₹5,000 (Colab, fast.ai)", structuredTier: "₹40,000 – ₹1,50,000" }, minPrepCostINR: 3000,
    keySkills: { foundational: ["Linear algebra", "Probability", "Python"], technical: ["scikit-learn", "PyTorch", "LLM APIs", "MLOps basics"], optional: ["RAG", "Fine-tuning", "CUDA"] },
    hiringRoutes: { campusWeight: "High", offCampusFeasibility: "Low", topHiringPatterns: "DSA + ML theory → project deep-dive → research discussion." },
    hiringMode: "Campus-led", campusProbability: 60, entryFeasibility: "Competitive", evidenceQuality: "Limited Survey Data",
    roadmapSteps: roadmap(12, ["Maths + Python", "Classical ML", "Deep learning + LLMs", "2 deployed ML apps", "Write-ups + GitHub", "ML + DSA mocks", "Targeted applications"]),
  },
  {
    id: "cloud-engineer", title: "Cloud Engineer", domain: "Cloud/Security",
    description: "Sets up and maintains cloud infrastructure on AWS, Azure or GCP.",
    dailyWork: ["Provision servers and networks", "Monitor costs and alerts", "Handle access tickets", "Write infra scripts"],
    eligibleDegrees: TECH, nonTechFriendly: false,
    tierAccessibility: { tier1: "Product infra teams.", tier2: "Large service-firm demand.", tier3: "Certifications open doors." },
    salary: { advertisedCTCMin: 400000, advertisedCTCMax: 900000, realisticBaseMin: 350000, realisticBaseMax: 700000, monthlyInHandMin: 26000, monthlyInHandMax: 50000 },
    prepTimelineMonths: 6, prepCostEstimate: { freeTier: "₹1,000 – ₹3,000 (free tier + practice)", structuredTier: "₹15,000 – ₹40,000 (incl. cert exam)" }, minPrepCostINR: 2000,
    keySkills: { foundational: ["Linux", "Networking", "Scripting"], technical: ["AWS/Azure", "IAM", "Terraform"], optional: ["Kubernetes", "Cost optimisation"] },
    hiringRoutes: { campusWeight: "Medium", offCampusFeasibility: "Moderate", topHiringPatterns: "Cert-screened → scenario questions → HR." },
    hiringMode: "Balanced", campusProbability: 45, entryFeasibility: "Moderate", evidenceQuality: "Sample Estimate",
    roadmapSteps: roadmap(6, ["Linux + networking", "Core AWS services", "Terraform + IAM", "Infra-as-code project", "Cert + resume", "Scenario mocks", "Service-firm drives"]),
  },
  {
    id: "devops-engineer", title: "DevOps Engineer", domain: "Cloud/Security",
    description: "Automates builds, tests and deployments so teams can ship safely and often.",
    dailyWork: ["Maintain CI/CD pipelines", "Debug failed deployments", "Write Dockerfiles", "On-call shadowing"],
    eligibleDegrees: TECH, nonTechFriendly: false,
    tierAccessibility: { tier1: "Platform teams.", tier2: "Often start in support then move.", tier3: "Off-campus via projects + certs." },
    salary: { advertisedCTCMin: 400000, advertisedCTCMax: 1000000, realisticBaseMin: 350000, realisticBaseMax: 750000, monthlyInHandMin: 26000, monthlyInHandMax: 52000 },
    prepTimelineMonths: 7, prepCostEstimate: { freeTier: "₹0 – ₹3,000", structuredTier: "₹20,000 – ₹50,000" }, minPrepCostINR: 1000,
    keySkills: { foundational: ["Linux", "Git", "Bash"], technical: ["Docker", "Kubernetes", "CI/CD", "Cloud basics"], optional: ["Prometheus", "Ansible"] },
    hiringRoutes: { campusWeight: "Low", offCampusFeasibility: "Moderate", topHiringPatterns: "Hands-on task → troubleshooting round → HR." },
    hiringMode: "Off-campus friendly", campusProbability: 30, entryFeasibility: "Moderate", evidenceQuality: "Sample Estimate",
    roadmapSteps: roadmap(7, ["Linux + Bash", "Docker + CI/CD", "Kubernetes", "Automated deploy project", "GitHub + resume", "Troubleshooting mocks", "Apply + referrals"]),
  },
  {
    id: "cybersecurity-analyst", title: "Cybersecurity Analyst", domain: "Cloud/Security",
    description: "Monitors alerts, investigates incidents and protects company systems in a SOC.",
    dailyWork: ["Triage SIEM alerts", "Write incident reports", "Run vulnerability scans", "Rotational shifts"],
    eligibleDegrees: TECH, nonTechFriendly: false,
    tierAccessibility: { tier1: "Consulting and product security.", tier2: "SOC roles widely open.", tier3: "Certs + labs work well." },
    salary: { advertisedCTCMin: 350000, advertisedCTCMax: 800000, realisticBaseMin: 300000, realisticBaseMax: 600000, monthlyInHandMin: 23000, monthlyInHandMax: 44000 },
    prepTimelineMonths: 7, prepCostEstimate: { freeTier: "₹0 – ₹2,000 (TryHackMe free, labs)", structuredTier: "₹25,000 – ₹70,000 (cert prep)" }, minPrepCostINR: 0,
    keySkills: { foundational: ["Networking", "Linux", "OS basics"], technical: ["SIEM", "Wireshark", "OWASP Top 10"], optional: ["Python scripting", "Cloud security"] },
    hiringRoutes: { campusWeight: "Low", offCampusFeasibility: "High", topHiringPatterns: "Technical quiz → scenario round → shift-fit HR." },
    hiringMode: "Off-campus friendly", campusProbability: 25, entryFeasibility: "Moderate", evidenceQuality: "Limited Survey Data",
    roadmapSteps: roadmap(7, ["Networking + Linux", "Security fundamentals", "SIEM + labs", "CTF / lab write-ups", "Write-up blog + resume", "Scenario mocks", "SOC openings"]),
  },
  {
    id: "qa-automation", title: "QA Automation Engineer", domain: "Software",
    description: "Writes automated tests that catch bugs before customers do.",
    dailyWork: ["Write Selenium/Playwright scripts", "Log bugs", "Run regression suites", "Review requirements"],
    eligibleDegrees: ALL, nonTechFriendly: true,
    tierAccessibility: { tier1: "Available, less chosen.", tier2: "Steady demand.", tier3: "One of the most accessible tech entries." },
    salary: { advertisedCTCMin: 300000, advertisedCTCMax: 650000, realisticBaseMin: 280000, realisticBaseMax: 550000, monthlyInHandMin: 21000, monthlyInHandMax: 40000 },
    prepTimelineMonths: 4, prepCostEstimate: { freeTier: "₹0 (docs + YouTube)", structuredTier: "₹8,000 – ₹25,000" }, minPrepCostINR: 0,
    keySkills: { foundational: ["Testing concepts", "Basic programming"], technical: ["Selenium/Playwright", "API testing", "SQL"], optional: ["Performance testing", "CI"] },
    hiringRoutes: { campusWeight: "Medium", offCampusFeasibility: "High", topHiringPatterns: "Aptitude → testing concepts → automation task." },
    hiringMode: "Off-campus friendly", campusProbability: 45, entryFeasibility: "High", evidenceQuality: "Verified Data",
    roadmapSteps: roadmap(4, ["Testing basics", "Java/Python basics", "Automation framework", "Test suite for a real site", "GitHub + resume", "Concept mocks", "Mass applications"]),
  },
  {
    id: "product-ops", title: "Product Operations Analyst", domain: "Business/Design",
    description: "Keeps product launches running — tracking metrics, processes and cross-team coordination.",
    dailyWork: ["Track launch checklists", "Pull metrics in sheets/SQL", "Coordinate with support & sales", "Document processes"],
    eligibleDegrees: ALL, nonTechFriendly: true,
    tierAccessibility: { tier1: "APM-style campus roles.", tier2: "Startup ops roles.", tier3: "Via ops/support entry then switch." },
    salary: { advertisedCTCMin: 400000, advertisedCTCMax: 900000, realisticBaseMin: 350000, realisticBaseMax: 700000, monthlyInHandMin: 26000, monthlyInHandMax: 50000 },
    prepTimelineMonths: 4, prepCostEstimate: { freeTier: "₹0", structuredTier: "₹10,000 – ₹30,000" }, minPrepCostINR: 0,
    keySkills: { foundational: ["Communication", "Excel", "Structured thinking"], technical: ["SQL basics", "Jira/Notion", "Metrics"], optional: ["Figma basics", "Product teardown writing"] },
    hiringRoutes: { campusWeight: "High", offCampusFeasibility: "Moderate", topHiringPatterns: "Case study → guesstimate → founder/manager round." },
    hiringMode: "Campus-led", campusProbability: 55, entryFeasibility: "Moderate", evidenceQuality: "Limited Survey Data",
    roadmapSteps: roadmap(4, ["Excel + communication", "Product metrics", "SQL + tools", "3 product teardowns", "Notion portfolio", "Case mocks", "Startup outreach"]),
  },
  {
    id: "uiux-designer", title: "UI/UX Designer", domain: "Business/Design",
    description: "Designs how apps look and feel, from user research to polished Figma screens.",
    dailyWork: ["Design screens in Figma", "Iterate on feedback", "Maintain design system", "Hand off to developers"],
    eligibleDegrees: ALL, nonTechFriendly: true,
    tierAccessibility: { tier1: "Degree barely matters.", tier2: "Portfolio decides.", tier3: "Portfolio decides — fully open." },
    salary: { advertisedCTCMin: 300000, advertisedCTCMax: 800000, realisticBaseMin: 280000, realisticBaseMax: 600000, monthlyInHandMin: 21000, monthlyInHandMax: 44000 },
    prepTimelineMonths: 6, prepCostEstimate: { freeTier: "₹0 (Figma free, YouTube)", structuredTier: "₹20,000 – ₹80,000" }, minPrepCostINR: 0,
    keySkills: { foundational: ["Visual design", "Typography", "Empathy"], technical: ["Figma", "Wireframing", "Prototyping", "User research"], optional: ["Motion", "HTML/CSS"] },
    hiringRoutes: { campusWeight: "Low", offCampusFeasibility: "High", topHiringPatterns: "Portfolio review → design task → presentation." },
    hiringMode: "Off-campus friendly", campusProbability: 20, entryFeasibility: "High", evidenceQuality: "Sample Estimate",
    roadmapSteps: roadmap(6, ["Design principles", "Figma mastery", "UX research", "3 case studies", "Behance/Dribbble portfolio", "Portfolio reviews", "Design communities + DMs"]),
  },
  {
    id: "business-analyst", title: "Business Analyst", domain: "Business/Design",
    description: "Bridges business teams and tech, translating needs into requirements and reports.",
    dailyWork: ["Gather requirements", "Write user stories", "Build Excel models", "Present to stakeholders"],
    eligibleDegrees: ALL, nonTechFriendly: true,
    tierAccessibility: { tier1: "Consulting campus hiring.", tier2: "IT services BA roles.", tier3: "Accessible via analyst trainee roles." },
    salary: { advertisedCTCMin: 350000, advertisedCTCMax: 800000, realisticBaseMin: 320000, realisticBaseMax: 650000, monthlyInHandMin: 24000, monthlyInHandMax: 46000 },
    prepTimelineMonths: 4, prepCostEstimate: { freeTier: "₹0", structuredTier: "₹10,000 – ₹30,000" }, minPrepCostINR: 0,
    keySkills: { foundational: ["Excel", "Communication", "Problem structuring"], technical: ["SQL", "Power BI", "Requirement docs"], optional: ["Agile", "Process mapping"] },
    hiringRoutes: { campusWeight: "High", offCampusFeasibility: "Moderate", topHiringPatterns: "Aptitude → case → GD/HR." },
    hiringMode: "Campus-led", campusProbability: 55, entryFeasibility: "High", evidenceQuality: "Verified Data",
    roadmapSteps: roadmap(4, ["Excel + aptitude", "Business frameworks", "SQL + Power BI", "2 business cases", "Resume + LinkedIn", "Case + GD mocks", "Campus + portals"]),
  },
  {
    id: "financial-analyst", title: "Financial Analyst", domain: "Business/Design",
    description: "Builds financial models, budgets and reports for companies and investors.",
    dailyWork: ["Update Excel models", "Variance analysis", "Prepare MIS reports", "Support month-end close"],
    eligibleDegrees: ["BCom", "BBA", "MBA", "BA", "BSc", "Other"], nonTechFriendly: true,
    tierAccessibility: { tier1: "IB/consulting campus offers.", tier2: "KPOs and corporates.", tier3: "KPO/GCC entry roles accessible." },
    salary: { advertisedCTCMin: 350000, advertisedCTCMax: 900000, realisticBaseMin: 300000, realisticBaseMax: 650000, monthlyInHandMin: 22000, monthlyInHandMax: 46000 },
    prepTimelineMonths: 5, prepCostEstimate: { freeTier: "₹0 – ₹1,000", structuredTier: "₹15,000 – ₹60,000 (modelling / CFA L1)" }, minPrepCostINR: 0,
    keySkills: { foundational: ["Accounting", "Excel", "Corporate finance"], technical: ["Financial modelling", "Valuation", "Power BI"], optional: ["CFA L1", "Python"] },
    hiringRoutes: { campusWeight: "High", offCampusFeasibility: "Moderate", topHiringPatterns: "Technical finance test → modelling task → HR." },
    hiringMode: "Balanced", campusProbability: 50, entryFeasibility: "Moderate", evidenceQuality: "Sample Estimate",
    roadmapSteps: roadmap(5, ["Accounting basics", "Advanced Excel", "Modelling + valuation", "2 company models", "Resume + LinkedIn", "Technical mocks", "KPOs, GCCs, campus"]),
  },
];

export const getCareer = (id: string) => CAREERS.find((c) => c.id === id);
