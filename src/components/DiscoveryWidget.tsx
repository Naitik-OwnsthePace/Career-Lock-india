import { useState } from "react";
import { ArrowRight, Sparkles, IndianRupee, Wallet } from "lucide-react";
import {
  BUDGETS, EDUCATIONS, INTERESTS, ROUTES, TIERS, YEARS,
  computeMatches, formatINR, type CareerMatch, type DiscoveryInput,
} from "@/lib/career-match";

interface FieldProps<T extends string> {
  label: string;
  value: T;
  options: readonly T[];
  onChange: (v: T) => void;
}

function Field<T extends string>({ label, value, options, onChange }: FieldProps<T>) {
  return (
    <label className="flex flex-col gap-1.5">
      <span className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">{label}</span>
      <select
        value={value}
        onChange={(e) => onChange(e.target.value as T)}
        className="h-12 rounded-xl border border-border bg-card px-3 text-sm font-medium text-foreground outline-none transition focus:border-emerald focus:ring-2 focus:ring-emerald/25"
      >
        {options.map((o) => <option key={o} value={o}>{o}</option>)}
      </select>
    </label>
  );
}

export function DiscoveryWidget() {
  const [input, setInput] = useState<DiscoveryInput>({
    education: "BTech/BE", year: "Final Year", tier: "Tier 2",
    interest: "Software Development", budget: "₹0–₹1,000 (Free/Low)", route: "Both",
  });
  const [results, setResults] = useState<CareerMatch[] | null>(null);
  const set = <K extends keyof DiscoveryInput>(k: K) => (v: DiscoveryInput[K]) => setInput((p) => ({ ...p, [k]: v }));

  return (
    <div className="w-full">
      <div className="rounded-3xl border border-border bg-card p-6 shadow-card md:p-8">
        <div className="mb-6 flex items-center gap-3">
          <div className="grid h-10 w-10 shrink-0 place-items-center rounded-xl bg-navy text-lime"><Sparkles className="h-5 w-5" /></div>
          <div className="min-w-0">
            <h3 className="font-display text-xl font-extrabold text-foreground">Career Discovery</h3>
            <p className="text-sm text-muted-foreground">Six quick inputs. Honest matches.</p>
          </div>
        </div>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          <Field label="Current Education" value={input.education} options={EDUCATIONS} onChange={set("education")} />
          <Field label="Academic Year" value={input.year} options={YEARS} onChange={set("year")} />
          <Field label="College Tier" value={input.tier} options={TIERS} onChange={set("tier")} />
          <Field label="Primary Interest" value={input.interest} options={INTERESTS} onChange={set("interest")} />
          <Field label="Monthly Prep Budget" value={input.budget} options={BUDGETS} onChange={set("budget")} />
          <Field label="Target Route" value={input.route} options={ROUTES} onChange={set("route")} />
        </div>
        <button
          onClick={() => setResults(computeMatches(input))}
          className="mt-6 inline-flex h-12 w-full items-center justify-center gap-2 rounded-full bg-lime px-6 font-bold text-lime-foreground shadow-lime transition hover:brightness-95 sm:w-auto"
        >
          Discover Recommended Paths <ArrowRight className="h-4 w-4" />
        </button>
      </div>

      {results && (
        <div className="mt-8 grid gap-5 md:grid-cols-3 animate-in fade-in slide-in-from-bottom-4 duration-500">
          {results.map((m, i) => (
            <article key={m.role.id} className="flex flex-col rounded-2xl border border-border bg-card p-6 shadow-card">
              <div className="flex items-start justify-between gap-3">
                <span className="text-xs font-semibold text-muted-foreground">#{i + 1} match</span>
                <span className={`shrink-0 rounded-full px-3 py-1 text-xs font-bold ${m.score >= 75 ? "bg-emerald/10 text-emerald" : "bg-warning/15 text-warning"}`}>
                  {m.score}% match
                </span>
              </div>
              <h4 className="mt-3 font-display text-lg font-extrabold text-foreground">{m.role.title}</h4>
              <p className="mt-1 text-xs font-semibold uppercase tracking-wider text-muted-foreground">Why this fits your profile</p>
              <p className="mt-1 text-sm leading-relaxed text-muted-foreground">{m.rationale}</p>
              <div className="mt-4 flex items-center gap-2 rounded-xl bg-muted p-3">
                <Wallet className="h-4 w-4 shrink-0 text-emerald" />
                <div className="min-w-0">
                  <p className="text-[11px] font-semibold uppercase tracking-wider text-muted-foreground">Realistic fresher take-home / month</p>
                  <p className="flex items-center font-bold text-foreground"><IndianRupee className="h-3.5 w-3.5" />{formatINR(m.role.takeHome[0]).slice(1)} – {formatINR(m.role.takeHome[1])}</p>
                </div>
              </div>
              <button className="mt-5 inline-flex h-11 items-center justify-center gap-2 rounded-full bg-navy px-5 text-sm font-semibold text-on-navy transition hover:bg-navy-soft">
                View Full Career Details <ArrowRight className="h-4 w-4" />
              </button>
            </article>
          ))}
        </div>
      )}
    </div>
  );
}
