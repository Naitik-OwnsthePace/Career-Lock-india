export type Education = "BTech/BE" | "BCA" | "BSc" | "BCom" | "BA" | "BBA" | "MCA" | "MBA" | "Other";
export type AcademicYear = "1st Year" | "2nd Year" | "3rd Year" | "Final Year" | "Fresh Graduate" | "Working Professional";
export type CollegeTier = "Tier 1" | "Tier 2" | "Tier 3" | "Unclassified / Open";
export type Interest =
  | "Software Development"
  | "Data & Analytics"
  | "AI/ML"
  | "Cloud & DevOps"
  | "Cybersecurity"
  | "QA & Automation"
  | "Product & Ops"
  | "Finance & Commerce"
  | "Design / UI/UX";
export type Budget = "₹0–₹1,000 (Free/Low)" | "₹1,000–₹5,000" | "₹5,000–₹10,000" | "Above ₹10,000";
export type TargetRoute = "On-Campus Placements" | "Off-Campus Drives" | "Both";

export interface DiscoveryInput {
  education: Education;
  year: AcademicYear;
  tier: CollegeTier;
  interest: Interest;
  budget: Budget;
  route: TargetRoute;
}

export interface CareerRole {
  id: string;
  title: string;
  interests: Interest[];
  requiresCS: boolean;
  friendlyDegrees: Education[];
  freeLearnable: boolean;
  takeHome: [number, number];
  offCampusFriendly: boolean;
}

export interface CareerMatch {
  role: CareerRole;
  score: number;
  rationale: string;
}

export const EDUCATIONS: Education[] = ["BTech/BE", "BCA", "BSc", "BCom", "BA", "BBA", "MCA", "MBA", "Other"];
export const YEARS: AcademicYear[] = ["1st Year", "2nd Year", "3rd Year", "Final Year", "Fresh Graduate", "Working Professional"];
export const TIERS: CollegeTier[] = ["Tier 1", "Tier 2", "Tier 3", "Unclassified / Open"];
export const INTERESTS: Interest[] = [
  "Software Development",
  "Data & Analytics",
  "AI/ML",
  "Cloud & DevOps",
  "Cybersecurity",
  "QA & Automation",
  "Product & Ops",
  "Finance & Commerce",
  "Design / UI/UX",
];
export const BUDGETS: Budget[] = ["₹0–₹1,000 (Free/Low)", "₹1,000–₹5,000", "₹5,000–₹10,000", "Above ₹10,000"];
export const ROUTES: TargetRoute[] = ["On-Campus Placements", "Off-Campus Drives", "Both"];

const CS_DEGREES: Education[] = ["BTech/BE", "BCA", "MCA"];

export const ROLES: CareerRole[] = [
  { id: "backend-developer", title: "Backend Software Developer", interests: ["Software Development"], requiresCS: true, friendlyDegrees: ["BTech/BE", "BCA", "MCA", "BSc"], freeLearnable: true, takeHome: [26000, 62000], offCampusFriendly: true },
  { id: "frontend-developer", title: "Frontend Developer", interests: ["Software Development", "Design / UI/UX"], requiresCS: false, friendlyDegrees: ["BTech/BE", "BCA", "MCA", "BSc", "Other"], freeLearnable: true, takeHome: [23000, 50000], offCampusFriendly: true },
  { id: "fullstack-developer", title: "Full-Stack Developer", interests: ["Software Development"], requiresCS: true, friendlyDegrees: ["BTech/BE", "BCA", "MCA", "BSc"], freeLearnable: true, takeHome: [26000, 56000], offCampusFriendly: true },
  { id: "data-analyst", title: "Data Analyst", interests: ["Data & Analytics", "Finance & Commerce"], requiresCS: false, friendlyDegrees: ["BSc", "BCom", "BBA", "BCA", "BTech/BE", "MBA", "BA", "Other"], freeLearnable: true, takeHome: [22000, 42000], offCampusFriendly: true },
  { id: "data-engineer", title: "Data Engineer", interests: ["Data & Analytics", "Software Development"], requiresCS: true, friendlyDegrees: ["BTech/BE", "BCA", "MCA", "BSc"], freeLearnable: false, takeHome: [29000, 58000], offCampusFriendly: false },
  { id: "ml-engineer", title: "AI/ML Engineer", interests: ["AI/ML", "Data & Analytics"], requiresCS: true, friendlyDegrees: ["BTech/BE", "MCA", "BSc"], freeLearnable: false, takeHome: [36000, 80000], offCampusFriendly: false },
  { id: "cloud-engineer", title: "Cloud Engineer", interests: ["Cloud & DevOps"], requiresCS: true, friendlyDegrees: ["BTech/BE", "BCA", "MCA", "BSc"], freeLearnable: false, takeHome: [26000, 50000], offCampusFriendly: true },
  { id: "devops-engineer", title: "DevOps Engineer", interests: ["Cloud & DevOps", "Software Development"], requiresCS: true, friendlyDegrees: ["BTech/BE", "BCA", "MCA", "BSc"], freeLearnable: false, takeHome: [26000, 52000], offCampusFriendly: true },
  { id: "cybersecurity-analyst", title: "Cybersecurity Analyst", interests: ["Cybersecurity", "Cloud & DevOps"], requiresCS: false, friendlyDegrees: ["BTech/BE", "BCA", "BSc", "MCA"], freeLearnable: true, takeHome: [23000, 44000], offCampusFriendly: true },
  { id: "qa-automation", title: "QA Automation Engineer", interests: ["QA & Automation", "Software Development"], requiresCS: false, friendlyDegrees: EDUCATIONS, freeLearnable: true, takeHome: [21000, 40000], offCampusFriendly: true },
  { id: "product-ops", title: "Product Operations Analyst", interests: ["Product & Ops", "Data & Analytics"], requiresCS: false, friendlyDegrees: ["MBA", "BBA", "BTech/BE", "BCom", "BA", "BCA", "BSc"], freeLearnable: true, takeHome: [26000, 50000], offCampusFriendly: false },
  { id: "uiux-designer", title: "UI/UX Designer", interests: ["Design / UI/UX", "Product & Ops"], requiresCS: false, friendlyDegrees: EDUCATIONS, freeLearnable: true, takeHome: [21000, 44000], offCampusFriendly: true },
  { id: "business-analyst", title: "Business Analyst", interests: ["Product & Ops", "Data & Analytics", "Finance & Commerce"], requiresCS: false, friendlyDegrees: EDUCATIONS, freeLearnable: true, takeHome: [24000, 46000], offCampusFriendly: true },
  { id: "financial-analyst", title: "Financial Analyst", interests: ["Finance & Commerce", "Data & Analytics"], requiresCS: false, friendlyDegrees: ["BCom", "BBA", "MBA", "BA", "BSc", "Other"], freeLearnable: true, takeHome: [22000, 46000], offCampusFriendly: true },
];

const tierFactor: Record<CollegeTier, number> = {
  "Tier 1": 1.15,
  "Tier 2": 1,
  "Tier 3": 0.88,
  "Unclassified / Open": 0.85,
};

export function formatINR(n: number): string {
  return `₹${(Math.round(n / 1000) * 1000).toLocaleString("en-IN")}`;
}

export function computeMatches(input: DiscoveryInput): CareerMatch[] {
  const isCS = CS_DEGREES.includes(input.education);
  const lowBudget = input.budget === "₹0–₹1,000 (Free/Low)";

  const scored = ROLES.filter((r) => !(r.requiresCS && !isCS && input.education !== "BSc")).map((role) => {
    let score = 50;
    const reasons: string[] = [];
    if (role.interests[0] === input.interest) {
      score += 28;
      reasons.push(`directly aligns with your interest in ${input.interest}`);
    } else if (role.interests.includes(input.interest)) {
      score += 16;
      reasons.push(`is closely related to ${input.interest}`);
    }
    if (role.friendlyDegrees.includes(input.education)) {
      score += 10;
      reasons.push(`regularly hires ${input.education} graduates`);
    } else {
      score -= 8;
    }
    if (lowBudget) {
      if (role.freeLearnable) {
        score += 6;
        reasons.push("can be learned largely through free resources");
      } else {
        score -= 10;
        reasons.push("may need paid certifications, so plan your spending");
      }
    }
    if (input.route !== "On-Campus Placements" && role.offCampusFriendly) {
      score += 5;
      reasons.push("has active off-campus hiring drives");
    }
    if (input.route === "On-Campus Placements" && (input.tier === "Tier 3" || input.tier === "Unclassified / Open") && role.offCampusFriendly) {
      reasons.push("also offers off-campus backup routes if campus drives are thin");
    }
    if (["Fresh Graduate", "Working Professional"].includes(input.year)) score += role.offCampusFriendly ? 3 : -4;
    if (["1st Year", "2nd Year"].includes(input.year)) reasons.push("gives you time to build a strong project portfolio");
    const rationale = `This role ${reasons.slice(0, 3).join(", ") || "is an accessible entry path"}${reasons.length > 3 ? `, and ${reasons[3]}` : ""}.`;
    return { role, score: Math.max(35, Math.min(97, score)), rationale };
  });

  return scored
    .sort((a, b) => b.score - a.score)
    .slice(0, 3)
    .map((m) => ({
      ...m,
      role: {
        ...m.role,
        takeHome: [
          m.role.takeHome[0] * tierFactor[input.tier],
          m.role.takeHome[1] * tierFactor[input.tier],
        ] as [number, number],
      },
    }));
}
