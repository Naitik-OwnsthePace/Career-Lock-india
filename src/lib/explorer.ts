import type { Career, Domain } from "@/data/careersData";
import type { Budget, CollegeTier, Education, Interest, TargetRoute } from "@/lib/career-match";

export type DomainFilter = "All" | Domain;
export type DegreeFilter = "All" | "BTech/BE" | "BCA" | "MCA" | "BSc" | "Non-Tech";
export type TierFilter = "All" | "Tier 1" | "Tier 2" | "Tier 3";
export type BudgetFilter = "All" | "Free" | "Under ₹5,000" | "Any budget";
export type HiringFilter = "All" | "Campus" | "Off-campus";
export type SortKey = "Best Fit" | "Starting Salary" | "Lowest Prep Cost" | "Shortest Timeline";

export interface ExplorerSearch {
  q?: string | undefined;
  domain?: DomainFilter | undefined;
  degree?: DegreeFilter | undefined;
  tier?: TierFilter | undefined;
  budget?: BudgetFilter | undefined;
  hiring?: HiringFilter | undefined;
  sort?: SortKey | undefined;
  career?: string | undefined;
}

export const DOMAIN_FILTERS: DomainFilter[] = ["All", "Software", "Data", "Cloud/Security", "Business/Design"];
export const DEGREE_FILTERS: DegreeFilter[] = ["All", "BTech/BE", "BCA", "MCA", "BSc", "Non-Tech"];
export const TIER_FILTERS: TierFilter[] = ["All", "Tier 1", "Tier 2", "Tier 3"];
export const BUDGET_FILTERS: BudgetFilter[] = ["All", "Free", "Under ₹5,000", "Any budget"];
export const HIRING_FILTERS: HiringFilter[] = ["All", "Campus", "Off-campus"];
export const SORT_KEYS: SortKey[] = ["Best Fit", "Starting Salary", "Lowest Prep Cost", "Shortest Timeline"];

const pick = <T extends string>(v: unknown, list: readonly T[]): T | undefined =>
  typeof v === "string" && (list as readonly string[]).includes(v) ? (v as T) : undefined;

export function validateExplorerSearch(s: Record<string, unknown>): ExplorerSearch {
  const qVal = s["q"];
  const careerVal = s["career"];
  return {
    q: typeof qVal === "string" && qVal ? qVal : undefined,
    domain: pick(s["domain"], DOMAIN_FILTERS),
    degree: pick(s["degree"], DEGREE_FILTERS),
    tier: pick(s["tier"], TIER_FILTERS),
    budget: pick(s["budget"], BUDGET_FILTERS),
    hiring: pick(s["hiring"], HIRING_FILTERS),
    sort: pick(s["sort"], SORT_KEYS),
    career: typeof careerVal === "string" && careerVal ? careerVal : undefined,
  };
}

const INTEREST_DOMAIN: Record<Interest, Domain> = {
  "Software Development": "Software",
  "QA & Automation": "Software",
  "Data & Analytics": "Data",
  "AI/ML": "Data",
  "Cloud & DevOps": "Cloud/Security",
  Cybersecurity: "Cloud/Security",
  "Product & Ops": "Business/Design",
  "Finance & Commerce": "Business/Design",
  "Design / UI/UX": "Business/Design",
};

const TECH_DEGREES = ["BTech/BE", "BCA", "MCA", "BSc"];

/** Converts Phase 1 widget answers into explorer filters. */
export function searchFromWidget(input: {
  education: Education;
  tier?: CollegeTier | undefined;
  interest: Interest;
  budget: Budget;
  route: TargetRoute;
}): ExplorerSearch {
  const mappedTier: TierFilter =
    input.tier === "Tier 1"
      ? "Tier 1"
      : input.tier === "Tier 2"
        ? "Tier 2"
        : input.tier === "Tier 3" || input.tier === "Unclassified / Open"
          ? "Tier 3"
          : "All";

  return {
    domain: INTEREST_DOMAIN[input.interest],
    degree: TECH_DEGREES.includes(input.education) ? (input.education as DegreeFilter) : "Non-Tech",
    tier: mappedTier,
    budget:
      input.budget === "₹0–₹1,000 (Free/Low)"
        ? "Free"
        : input.budget === "₹1,000–₹5,000"
          ? "Under ₹5,000"
          : "Any budget",
    hiring:
      input.route === "On-Campus Placements"
        ? "Campus"
        : input.route === "Off-Campus Drives"
          ? "Off-campus"
          : "All",
    sort: "Best Fit",
  };
}

function fitScore(c: Career, s: ExplorerSearch): number {
  let score = 0;
  if (c.entryFeasibility === "High") score += 3;
  else if (c.entryFeasibility === "Moderate") score += 2;
  if (s.degree === "Non-Tech" && c.nonTechFriendly) score += 2;
  if (s.tier === "Tier 3" && (c.hiringMode === "Off-campus friendly" || c.entryFeasibility === "High")) score += 2.5;
  if (s.hiring === "Off-campus" && c.hiringMode === "Off-campus friendly") score += 2;
  if (s.hiring === "Campus" && c.hiringMode === "Campus-led") score += 2;
  score += c.salary.monthlyInHandMin / 20000;
  return score;
}

export function filterCareers(careers: Career[], s: ExplorerSearch): Career[] {
  const q = s.q?.trim().toLowerCase();
  const list = careers.filter((c) => {
    if (q) {
      const hay = [
        c.title,
        c.domain,
        c.description,
        ...c.keySkills.foundational,
        ...c.keySkills.technical,
        ...c.keySkills.optional,
      ]
        .join(" ")
        .toLowerCase();
      if (!hay.includes(q)) return false;
    }
    if (s.domain && s.domain !== "All" && c.domain !== s.domain) return false;
    if (s.degree && s.degree !== "All") {
      if (s.degree === "Non-Tech" ? !c.nonTechFriendly : !c.eligibleDegrees.includes(s.degree)) return false;
    }
    if (s.tier && s.tier !== "All") {
      if (s.tier === "Tier 3" && c.hiringRoutes.offCampusFeasibility === "Low") return false;
    }
    if (s.budget === "Free" && c.minPrepCostINR > 0) return false;
    if (s.budget === "Under ₹5,000" && c.minPrepCostINR > 5000) return false;
    if (s.hiring === "Campus" && c.hiringMode === "Off-campus friendly") return false;
    if (s.hiring === "Off-campus" && c.hiringMode === "Campus-led") return false;
    return true;
  });
  const sort = s.sort ?? "Best Fit";
  return [...list].sort((a, b) => {
    if (sort === "Starting Salary") return b.salary.monthlyInHandMin - a.salary.monthlyInHandMin;
    if (sort === "Lowest Prep Cost") return a.minPrepCostINR - b.minPrepCostINR;
    if (sort === "Shortest Timeline") return a.prepTimelineMonths - b.prepTimelineMonths;
    return fitScore(b, s) - fitScore(a, s);
  });
}

export const inr = (n: number) => `₹${Math.round(n).toLocaleString("en-IN")}`;
export const lpa = (n: number) => `${(n / 100000).toFixed(1).replace(/\.0$/, "")} LPA`;
