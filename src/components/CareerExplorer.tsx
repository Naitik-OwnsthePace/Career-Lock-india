import { useState, useEffect } from "react";
import { Search, ArrowRight, SlidersHorizontal, X, Wallet, Clock, Sparkles, ListChecks } from "lucide-react";
import { CAREERS, type Career, type Feasibility } from "@/data/careersData";
import {
  BUDGET_FILTERS,
  DEGREE_FILTERS,
  DOMAIN_FILTERS,
  SORT_KEYS,
  TIER_FILTERS,
  filterCareers,
  inr,
  lpa,
  type BudgetFilter,
  type DegreeFilter,
  type DomainFilter,
  type ExplorerSearch,
  type SortKey,
  type TierFilter,
} from "@/lib/explorer";

export interface CareerExplorerProps {
  externalFilters?: ExplorerSearch | null;
  onExploreCareer: (career: Career) => void;
  onSelectForRoadmap?: (career: Career) => void;
}

const feasibilityBadgeStyle: Record<Feasibility, string> = {
  High: "bg-[#059669]/15 text-[#059669] border border-[#059669]/30",
  Moderate: "bg-[#F59E0B]/15 text-[#B45309] border border-[#F59E0B]/30",
  Competitive: "bg-[#0F172A]/10 text-[#0F172A] border border-[#0F172A]/20",
};

function ChipRow<T extends string>({
  label,
  options,
  value,
  onChange,
}: {
  label: string;
  options: readonly T[];
  value: T;
  onChange: (v: T) => void;
}) {
  return (
    <div className="flex flex-col gap-1.5">
      <span className="text-[11px] font-bold uppercase tracking-wider text-muted-foreground">{label}</span>
      <div className="flex flex-wrap gap-1.5">
        {options.map((opt) => {
          const active = value === opt;
          return (
            <button
              key={opt}
              type="button"
              onClick={() => onChange(opt)}
              className={`h-8 rounded-full px-3 text-xs font-bold transition ${
                active
                  ? "bg-[#0F172A] text-white shadow-xs"
                  : "border border-border bg-background text-muted-foreground hover:border-[#059669] hover:text-foreground"
              }`}
            >
              {opt}
            </button>
          );
        })}
      </div>
    </div>
  );
}

export function CareerExplorer({
  externalFilters,
  onExploreCareer,
  onSelectForRoadmap,
}: CareerExplorerProps) {
  const [search, setSearch] = useState<ExplorerSearch>({
    domain: "All",
    degree: "All",
    tier: "All",
    budget: "All",
    hiring: "All",
    sort: "Best Fit",
  });

  useEffect(() => {
    if (externalFilters) {
      setSearch((prev) => ({
        ...prev,
        ...externalFilters,
      }));
    }
  }, [externalFilters]);

  const update = (patch: Partial<ExplorerSearch>) => {
    setSearch((prev) => ({ ...prev, ...patch }));
  };

  const resetFilters = () => {
    setSearch({
      q: undefined,
      domain: "All",
      degree: "All",
      tier: "All",
      budget: "All",
      hiring: "All",
      sort: "Best Fit",
    });
  };

  const results = filterCareers(CAREERS, search);
  const hasFilters = Boolean(
    search.q ||
      (search.domain && search.domain !== "All") ||
      (search.degree && search.degree !== "All") ||
      (search.tier && search.tier !== "All") ||
      (search.budget && search.budget !== "All") ||
      (search.hiring && search.hiring !== "All")
  );

  return (
    <section id="explorer" className="scroll-mt-20 py-16">
      <div className="mx-auto max-w-7xl px-5 md:px-8">
        <div className="flex flex-wrap items-end justify-between gap-4">
          <div className="max-w-2xl">
            <span className="inline-flex items-center gap-1.5 rounded-full bg-[#059669]/10 px-3 py-1 text-xs font-bold uppercase tracking-wider text-[#059669]">
              <Sparkles className="h-3.5 w-3.5" /> 14 Verified Fresher Career Tracks
            </span>
            <h1 className="mt-3 font-display text-3xl font-black tracking-tight text-[#0F172A] sm:text-4xl">
              Career Path Explorer
            </h1>
            <p className="mt-2 text-sm text-muted-foreground sm:text-base">
              Filter by domain, degree eligibility, college tier accessibility, and preparation budget. Every card displays realistic monthly take-home cash — never padded CTC.
            </p>
          </div>
          <div className="flex items-center gap-3">
            <label className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-muted-foreground">
              Sort By:
              <select
                value={search.sort ?? "Best Fit"}
                onChange={(e) => update({ sort: e.target.value as SortKey })}
                className="h-10 rounded-xl border border-border bg-card px-3 text-xs font-bold text-[#0F172A] outline-none focus:border-[#059669]"
              >
                {SORT_KEYS.map((k) => (
                  <option key={k} value={k}>
                    {k}
                  </option>
                ))}
              </select>
            </label>
          </div>
        </div>

        <div className="mt-8 rounded-3xl border border-border bg-card p-5 shadow-card md:p-6">
          <div className="relative">
            <Search className="pointer-events-none absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-muted-foreground" />
            <input
              value={search.q ?? ""}
              onChange={(e) => update({ q: e.target.value || undefined })}
              placeholder="Search by career title, skill, or tool — e.g. SQL, React, Playwright, AWS, Valuation..."
              className="h-12 w-full rounded-2xl border border-border bg-background pl-12 pr-10 text-sm font-medium text-foreground outline-none transition focus:border-[#059669] focus:ring-2 focus:ring-[#059669]/20"
            />
            {search.q && (
              <button
                type="button"
                aria-label="Clear search query"
                onClick={() => update({ q: undefined })}
                className="absolute right-3 top-1/2 -translate-y-1/2 rounded-full p-1 text-muted-foreground hover:bg-muted hover:text-foreground"
              >
                <X className="h-4 w-4" />
              </button>
            )}
          </div>

          <div className="mt-5 grid gap-4 border-t border-border pt-5 md:grid-cols-2 lg:grid-cols-4">
            <ChipRow<DomainFilter>
              label="Domain"
              options={DOMAIN_FILTERS}
              value={search.domain ?? "All"}
              onChange={(domain) => update({ domain })}
            />
            <ChipRow<DegreeFilter>
              label="Degree Eligibility"
              options={DEGREE_FILTERS}
              value={search.degree ?? "All"}
              onChange={(degree) => update({ degree })}
            />
            <ChipRow<TierFilter>
              label="Tier Accessibility"
              options={TIER_FILTERS}
              value={search.tier ?? "All"}
              onChange={(tier) => update({ tier })}
            />
            <ChipRow<BudgetFilter>
              label="Prep Budget"
              options={BUDGET_FILTERS}
              value={search.budget ?? "All"}
              onChange={(budget) => update({ budget })}
            />
          </div>
        </div>

        <div className="mt-6 flex flex-wrap items-center justify-between gap-3">
          <p className="flex items-center gap-2 text-sm font-semibold text-muted-foreground">
            <SlidersHorizontal className="h-4 w-4 text-[#059669]" />
            Showing <span className="font-bold text-[#0F172A]">{results.length}</span> of {CAREERS.length} Indian career paths
          </p>
          {hasFilters && (
            <button
              type="button"
              onClick={resetFilters}
              className="inline-flex items-center gap-1.5 rounded-full bg-[#F59E0B]/15 px-3.5 py-1.5 text-xs font-bold text-[#B45309] transition hover:bg-[#F59E0B]/25"
            >
              <X className="h-3.5 w-3.5" /> Reset All Filters
            </button>
          )}
        </div>

        <div className="mt-6 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {results.map((career) => (
            <article
              key={career.id}
              className="group flex flex-col justify-between rounded-2xl border border-border bg-card p-6 shadow-card transition duration-200 hover:-translate-y-1 hover:border-[#059669]/50"
            >
              <div>
                <div className="flex items-center justify-between gap-2">
                  <span className="rounded-full bg-[#0F172A] px-3 py-1 text-xs font-bold text-white">
                    {career.domain}
                  </span>
                  <span
                    className={`rounded-full px-3 py-1 text-xs font-bold ${feasibilityBadgeStyle[career.entryFeasibility]}`}
                  >
                    {career.entryFeasibility} Feasibility
                  </span>
                </div>

                <h3 className="mt-4 font-display text-xl font-extrabold text-[#0F172A] transition-colors group-hover:text-[#059669]">
                  {career.title}
                </h3>
                <p className="mt-1.5 line-clamp-2 text-sm leading-relaxed text-muted-foreground">
                  {career.description}
                </p>

                <div className="mt-4 rounded-2xl border border-[#059669]/25 bg-[#059669]/8 p-3.5">
                  <div className="flex items-center justify-between">
                    <span className="flex items-center gap-1.5 text-[11px] font-bold uppercase tracking-wider text-[#059669]">
                      <Wallet className="h-3.5 w-3.5" /> Realistic Monthly In-Hand
                    </span>
                    <span className="text-[11px] font-medium text-muted-foreground line-through decoration-[#F59E0B]">
                      CTC: {lpa(career.salary.advertisedCTCMin)}–{lpa(career.salary.advertisedCTCMax)}
                    </span>
                  </div>
                  <p className="mt-1 font-display text-xl font-black text-[#0F172A]">
                    {inr(career.salary.monthlyInHandMin)} – {inr(career.salary.monthlyInHandMax)}{" "}
                    <span className="text-xs font-semibold text-muted-foreground">/ month</span>
                  </p>
                </div>

                <div className="mt-4 flex flex-wrap gap-1.5 text-xs">
                  <span className="inline-flex items-center gap-1 rounded-lg bg-[#F59E0B]/15 px-2.5 py-1 font-bold text-[#B45309]">
                    Prep: {career.minPrepCostINR === 0 ? "₹0 Free Tier" : `From ${inr(career.minPrepCostINR)}`}
                  </span>
                  <span className="inline-flex items-center gap-1 rounded-lg border border-border bg-muted/60 px-2.5 py-1 font-semibold text-foreground">
                    <Clock className="h-3 w-3 text-[#059669]" /> {career.prepTimelineMonths} mos
                  </span>
                  <span className="inline-flex items-center rounded-lg border border-border bg-muted/60 px-2.5 py-1 font-semibold text-muted-foreground">
                    {career.hiringMode}
                  </span>
                </div>

                <div className="mt-4 flex flex-wrap gap-1">
                  {[...career.keySkills.foundational.slice(0, 2), ...career.keySkills.technical.slice(0, 2)].map((skill) => (
                    <span
                      key={skill}
                      className="rounded-md bg-muted px-2 py-0.5 text-[11px] font-medium text-muted-foreground"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </div>

              <div className="mt-6 flex items-center gap-2 pt-2">
                <button
                  type="button"
                  onClick={() => onExploreCareer(career)}
                  className="inline-flex h-11 flex-1 items-center justify-center gap-2 rounded-full bg-[#0F172A] px-4 text-sm font-bold text-white transition hover:bg-[#059669]"
                >
                  Explore Path <ArrowRight className="h-4 w-4" />
                </button>
                {onSelectForRoadmap && (
                  <button
                    type="button"
                    title="Open in Interactive Roadmap Checklist"
                    onClick={() => onSelectForRoadmap(career)}
                    className="grid h-11 w-11 shrink-0 place-items-center rounded-full border border-border bg-background text-[#0F172A] transition hover:border-[#059669] hover:text-[#059669]"
                  >
                    <ListChecks className="h-4 w-4" />
                  </button>
                )}
              </div>
            </article>
          ))}

          {results.length === 0 && (
            <div className="col-span-full rounded-3xl border border-dashed border-border bg-card p-12 text-center">
              <p className="font-display text-lg font-bold text-foreground">
                No career paths match this exact filter combination.
              </p>
              <p className="mt-1 text-sm text-muted-foreground">
                Try switching Tier Accessibility or Prep Budget to "All" to compare broader paths.
              </p>
              <button
                type="button"
                onClick={resetFilters}
                className="mt-4 inline-flex h-10 items-center gap-2 rounded-full bg-[#059669] px-5 text-xs font-bold text-white"
              >
                Reset Filters
              </button>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
