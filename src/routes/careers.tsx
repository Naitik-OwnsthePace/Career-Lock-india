import { createFileRoute } from "@tanstack/react-router";
import { Search, ArrowRight, SlidersHorizontal, X } from "lucide-react";
import { CareerProfileDrawer } from "@/components/CareerProfileDrawer";
import { FourPillars } from "@/components/FourPillars";
import { CAREERS, getCareer, type Feasibility } from "@/data/careersData";
import {
  BUDGET_FILTERS,
  DEGREE_FILTERS,
  DOMAIN_FILTERS,
  HIRING_FILTERS,
  SORT_KEYS,
  filterCareers,
  inr,
  validateExplorerSearch,
  type ExplorerSearch,
} from "@/lib/explorer";

export const Route = createFileRoute("/careers")({
  validateSearch: validateExplorerSearch,
  head: () => ({
    meta: [
      { title: "Career Path Explorer — ROIPath India" },
      {
        name: "description",
        content: "Explore 14 Indian career paths with realistic in-hand salaries, prep costs, entry routes and 7-stage roadmaps.",
      },
      { property: "og:title", content: "Career Path Explorer — ROIPath India" },
      {
        property: "og:description",
        content: "Compare realistic in-hand pay, prep cost and entry routes for 14 fresher careers in India.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: CareersPage,
});

const feasibilityStyle: Record<Feasibility, string> = {
  High: "bg-emerald/10 text-emerald",
  Moderate: "bg-warning/15 text-warning",
  Competitive: "bg-destructive/10 text-destructive",
};

function FilterSelect<T extends string>({
  label,
  value,
  options,
  onChange,
}: {
  label: string;
  value: T;
  options: readonly T[];
  onChange: (v: T) => void;
}) {
  return (
    <label className="flex min-w-0 flex-col gap-1.5">
      <span className="text-[11px] font-semibold uppercase tracking-wider text-muted-foreground">{label}</span>
      <select
        value={value}
        onChange={(e) => onChange(e.target.value as T)}
        className="h-11 rounded-xl border border-border bg-card px-3 text-sm font-medium text-foreground outline-none focus:border-emerald focus:ring-2 focus:ring-emerald/25"
      >
        {options.map((o) => (
          <option key={o} value={o}>
            {o}
          </option>
        ))}
      </select>
    </label>
  );
}

function CareersPage() {
  const search = Route.useSearch();
  const navigate = Route.useNavigate();
  const update = (patch: Partial<ExplorerSearch>) =>
    navigate({ to: ".", search: (prev) => ({ ...prev, ...patch }), replace: true, resetScroll: false });

  const results = filterCareers(CAREERS, search);
  const active = search.career ? getCareer(search.career) : undefined;
  const hasFilters = !!(
    search.q ||
    (search.domain && search.domain !== "All") ||
    (search.degree && search.degree !== "All") ||
    (search.budget && search.budget !== "All") ||
    (search.hiring && search.hiring !== "All")
  );

  return (
    <div className="min-h-screen bg-background">
      <div className="bg-navy">
        <div className="mx-auto max-w-7xl px-5 pb-28 pt-14 md:px-8">
          <p className="text-sm font-bold uppercase tracking-widest text-lime">Career Path Explorer</p>
          <h1 className="mt-3 max-w-3xl font-display text-4xl font-black leading-tight tracking-tight text-on-navy sm:text-5xl">
            14 careers. <span className="text-talent">Real in-hand numbers.</span>
          </h1>
          <p className="mt-4 max-w-2xl text-on-navy-muted">
            Filter by your degree, budget and hiring route. Open any path for the daily reality, salary breakdown and a 7-stage roadmap.
          </p>
        </div>
      </div>

      <section className="relative mx-auto -mt-16 max-w-7xl px-5 md:px-8">
        <div className="rounded-3xl border border-border bg-card p-5 shadow-card md:p-6">
          <div className="relative">
            <Search className="pointer-events-none absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-muted-foreground" />
            <input
              value={search.q ?? ""}
              onChange={(e) => update({ q: e.target.value || undefined })}
              placeholder="Search by title, skill or domain — e.g. SQL, React, Finance"
              className="h-12 w-full rounded-xl border border-border bg-background pl-12 pr-4 text-sm outline-none focus:border-emerald focus:ring-2 focus:ring-emerald/25"
            />
          </div>
          <div className="mt-4 flex flex-wrap gap-2">
            {DOMAIN_FILTERS.map((d) => (
              <button
                key={d}
                onClick={() => update({ domain: d })}
                className={`h-10 rounded-full px-4 text-sm font-semibold transition ${
                  (search.domain ?? "All") === d
                    ? "bg-navy text-lime"
                    : "bg-muted text-muted-foreground hover:text-foreground"
                }`}
              >
                {d}
              </button>
            ))}
          </div>
          <div className="mt-4 grid grid-cols-2 gap-3 lg:grid-cols-4">
            <FilterSelect label="Degree" value={search.degree ?? "All"} options={DEGREE_FILTERS} onChange={(v) => update({ degree: v })} />
            <FilterSelect label="Prep budget" value={search.budget ?? "All"} options={BUDGET_FILTERS} onChange={(v) => update({ budget: v })} />
            <FilterSelect label="Hiring route" value={search.hiring ?? "All"} options={HIRING_FILTERS} onChange={(v) => update({ hiring: v })} />
            <FilterSelect label="Sort by" value={search.sort ?? "Best Fit"} options={SORT_KEYS} onChange={(v) => update({ sort: v })} />
          </div>
        </div>

        <div className="mt-8 flex items-center justify-between gap-3">
          <p className="flex items-center gap-2 text-sm text-muted-foreground">
            <SlidersHorizontal className="h-4 w-4" />
            {results.length} of {CAREERS.length} paths
          </p>
          {hasFilters && (
            <button
              onClick={() => navigate({ to: ".", search: {}, replace: true, resetScroll: false })}
              className="flex min-h-11 items-center gap-1 text-sm font-semibold text-emerald"
            >
              <X className="h-4 w-4" /> Clear filters
            </button>
          )}
        </div>

        <div className="mt-4 grid gap-5 pb-20 sm:grid-cols-2 lg:grid-cols-3">
          {results.map((c) => (
            <article key={c.id} className="flex flex-col rounded-2xl border border-border bg-card p-6 shadow-card transition hover:-translate-y-1">
              <div className="flex items-center justify-between gap-2">
                <span className="rounded-full bg-navy px-3 py-1 text-xs font-bold text-lime">{c.domain}</span>
                <span className={`rounded-full px-3 py-1 text-xs font-bold ${feasibilityStyle[c.entryFeasibility]}`}>
                  {c.entryFeasibility} entry
                </span>
              </div>
              <h2 className="mt-4 font-display text-xl font-extrabold text-foreground">{c.title}</h2>
              <p className="mt-2 line-clamp-2 text-sm text-muted-foreground">{c.description}</p>
              <div className="mt-4 rounded-xl bg-muted p-3">
                <p className="text-[11px] font-semibold uppercase tracking-wider text-muted-foreground">
                  Realistic in-hand / month
                </p>
                <p className="mt-0.5 font-bold text-foreground">
                  {inr(c.salary.monthlyInHandMin)} – {inr(c.salary.monthlyInHandMax)}
                </p>
              </div>
              <div className="mt-3 flex flex-wrap gap-2 text-xs">
                <span className="rounded-full border border-border px-3 py-1 font-semibold text-muted-foreground">
                  Prep: {c.minPrepCostINR === 0 ? "Free path" : `from ${inr(c.minPrepCostINR)}`}
                </span>
                <span className="rounded-full border border-border px-3 py-1 font-semibold text-muted-foreground">
                  {c.prepTimelineMonths} months
                </span>
                <span className="rounded-full border border-border px-3 py-1 font-semibold text-muted-foreground">
                  {c.hiringMode}
                </span>
              </div>
              <button
                onClick={() => update({ career: c.id })}
                className="mt-5 inline-flex h-11 items-center justify-center gap-2 rounded-full bg-lime text-sm font-bold text-lime-foreground transition hover:brightness-95"
              >
                Explore Path <ArrowRight className="h-4 w-4" />
              </button>
            </article>
          ))}
          {results.length === 0 && (
            <p className="col-span-full rounded-2xl border border-dashed border-border p-10 text-center text-muted-foreground">
              No paths match these filters. Try widening your budget or hiring route.
            </p>
          )}
        </div>
      </section>

      <FourPillars />
      <CareerProfileDrawer career={active} onClose={() => update({ career: undefined })} />
    </div>
  );
}
