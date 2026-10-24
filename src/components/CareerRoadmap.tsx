import { useState, useEffect, useMemo } from "react";
import {
  CheckCircle2,
  Circle,
  ClipboardCheck,
  Clock,
  Sparkles,
  RotateCcw,
  Award,
  ArrowRight,
  Wallet,
} from "lucide-react";
import { CAREERS, type Career } from "@/data/careersData";
import { inr } from "@/lib/explorer";

export interface CareerRoadmapProps {
  selectedCareer?: Career | null;
  onSelectCareer?: (career: Career) => void;
  onOpenDiagnostic?: (career: Career, checkedItems: string[], readinessScore: number) => void;
}

export function CareerRoadmap({
  selectedCareer,
  onSelectCareer,
  onOpenDiagnostic,
}: CareerRoadmapProps) {
  const defaultCareer = CAREERS[0]!;
  const [activeCareerId, setActiveCareerId] = useState<string>(
    selectedCareer?.id ?? defaultCareer.id
  );
  // Map of careerId -> array of checked item keys
  const [checkedByCareer, setCheckedByCareer] = useState<Record<string, string[]>>({
    [defaultCareer.id]: ["skill:DSA basics", "skill:Git & GitHub", "step:1"],
  });

  useEffect(() => {
    if (selectedCareer) {
      setActiveCareerId(selectedCareer.id);
    }
  }, [selectedCareer]);

  const career = useMemo(
    () => CAREERS.find((c) => c.id === activeCareerId) ?? defaultCareer,
    [activeCareerId, defaultCareer]
  );

  const allChecklistItems = useMemo(() => {
    const foundational = career.keySkills.foundational.map((s) => ({
      key: `skill:${s}`,
      label: s,
      group: "Foundational Skill" as const,
      weight: 2,
    }));
    const technical = career.keySkills.technical.map((s) => ({
      key: `skill:${s}`,
      label: s,
      group: "Core Technical Skill" as const,
      weight: 3,
    }));
    const optional = career.keySkills.optional.map((s) => ({
      key: `skill:${s}`,
      label: s,
      group: "Bonus Differentiator" as const,
      weight: 1,
    }));
    const steps = career.roadmapSteps.map((st) => ({
      key: `step:${st.step}`,
      label: `Stage ${st.step}: ${st.title}`,
      sublabel: st.focus,
      duration: st.duration,
      group: "Roadmap Milestone" as const,
      weight: 3,
    }));
    return { foundational, technical, optional, steps };
  }, [career]);

  const checkedList = checkedByCareer[career.id] ?? [];

  const toggleItem = (key: string) => {
    setCheckedByCareer((prev) => {
      const current = prev[career.id] ?? [];
      const exists = current.includes(key);
      const next = exists ? current.filter((k) => k !== key) : [...current, key];
      return { ...prev, [career.id]: next };
    });
  };

  const resetChecklist = () => {
    setCheckedByCareer((prev) => ({ ...prev, [career.id]: [] }));
  };

  const { readinessScore, completedCount, totalCount, remainingWeeks, readinessLabel } = useMemo(() => {
    const flat = [
      ...allChecklistItems.foundational,
      ...allChecklistItems.technical,
      ...allChecklistItems.optional,
      ...allChecklistItems.steps,
    ];
    const totalWeight = flat.reduce((acc, item) => acc + item.weight, 0);
    const earnedWeight = flat
      .filter((item) => checkedList.includes(item.key))
      .reduce((acc, item) => acc + item.weight, 0);

    const score = totalWeight > 0 ? Math.round((earnedWeight / totalWeight) * 100) : 0;
    const totalWeeks = career.prepTimelineMonths * 4;
    const remWeeks = Math.max(1, Math.round(totalWeeks * (1 - score / 100)));

    let label = "Starting Out — Build Core Foundations";
    if (score >= 85) label = "Interview Ready — Start Off-Campus & Referral Sprints";
    else if (score >= 60) label = "Portfolio Ready — Ship Proof-of-Work & Mock Drills";
    else if (score >= 30) label = "Foundation Built — Focus on Core Stack & Applied Projects";

    return {
      readinessScore: score,
      completedCount: checkedList.length,
      totalCount: flat.length,
      remainingWeeks: score === 100 ? 0 : remWeeks,
      readinessLabel: label,
    };
  }, [allChecklistItems, checkedList, career.prepTimelineMonths]);

  return (
    <section id="roadmap" className="scroll-mt-20 border-t border-border bg-muted/40 py-20">
      <div className="mx-auto max-w-7xl px-5 md:px-8">
        {/* Header */}
        <div className="flex flex-wrap items-end justify-between gap-6">
          <div className="max-w-2xl">
            <span className="inline-flex items-center gap-1.5 rounded-full bg-[#059669]/10 px-3.5 py-1 text-xs font-bold uppercase tracking-wider text-[#059669]">
              <Sparkles className="h-3.5 w-3.5" /> Interactive Preparation Tracker
            </span>
            <h2 className="mt-3 font-display text-3xl font-black tracking-tight text-[#0F172A] sm:text-4xl">
              Interactive Skill & Milestone Checklist
            </h2>
            <p className="mt-2 text-sm text-muted-foreground sm:text-base">
              Select your target career below and check off the skills and 7-stage milestones you already have. Watch your live Readiness Score update and generate a custom Diagnostic Scorecard.
            </p>
          </div>

          <div className="w-full sm:w-80">
            <label className="block text-xs font-bold uppercase tracking-wider text-muted-foreground">
              Select Target Career Path
            </label>
            <select
              value={career.id}
              onChange={(e) => {
                const next = CAREERS.find((c) => c.id === e.target.value);
                if (next) {
                  setActiveCareerId(next.id);
                  if (onSelectCareer) onSelectCareer(next);
                }
              }}
              className="mt-1.5 h-12 w-full rounded-2xl border border-border bg-card px-4 text-sm font-bold text-[#0F172A] shadow-2xs outline-none focus:border-[#059669]"
            >
              {CAREERS.map((c) => (
                <option key={c.id} value={c.id}>
                  {c.title} ({c.prepTimelineMonths} mos)
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Live Readiness Score Banner */}
        <div className="mt-8 rounded-3xl bg-[#0F172A] p-6 text-white shadow-xl sm:p-8">
          <div className="grid gap-6 lg:grid-cols-12 lg:items-center">
            <div className="lg:col-span-7">
              <div className="flex flex-wrap items-center gap-2.5">
                <span className="rounded-full bg-[#059669] px-3 py-1 text-xs font-bold text-white">
                  {career.title}
                </span>
                <span className="rounded-full bg-white/10 px-3 py-1 text-xs font-semibold text-lime">
                  {completedCount} of {totalCount} Milestones Checked
                </span>
                {completedCount > 0 && (
                  <button
                    type="button"
                    onClick={resetChecklist}
                    className="inline-flex items-center gap-1 text-xs font-semibold text-slate-300 hover:text-white"
                  >
                    <RotateCcw className="h-3.5 w-3.5" /> Reset
                  </button>
                )}
              </div>

              <div className="mt-4 flex items-baseline justify-between">
                <div>
                  <p className="text-xs font-bold uppercase tracking-wider text-slate-400">
                    Live Placement Readiness Score
                  </p>
                  <p className="mt-1 font-display text-lg font-bold text-lime">{readinessLabel}</p>
                </div>
                <span className="font-display text-4xl font-black text-white sm:text-5xl">
                  {readinessScore}%
                </span>
              </div>

              {/* Progress Bar */}
              <div className="mt-3 h-4 w-full overflow-hidden rounded-full bg-white/10 p-0.5">
                <div
                  className="h-full rounded-full bg-gradient-to-r from-[#059669] to-lime transition-all duration-300"
                  style={{ width: `${Math.max(3, readinessScore)}%` }}
                />
              </div>
            </div>

            <div className="flex flex-col justify-between gap-4 border-t border-white/10 pt-4 lg:col-span-5 lg:border-l lg:border-t-0 lg:pl-8 lg:pt-0">
              <div className="grid grid-cols-2 gap-3">
                <div className="rounded-2xl bg-white/5 p-3.5 border border-white/10">
                  <p className="flex items-center gap-1.5 text-[11px] font-semibold uppercase tracking-wider text-slate-400">
                    <Clock className="h-3.5 w-3.5 text-[#F59E0B]" /> Est. Time Left
                  </p>
                  <p className="mt-1 font-display text-lg font-black text-white">
                    {remainingWeeks === 0 ? "Ready Now!" : `~${remainingWeeks} Weeks`}
                  </p>
                </div>
                <div className="rounded-2xl bg-white/5 p-3.5 border border-white/10">
                  <p className="flex items-center gap-1.5 text-[11px] font-semibold uppercase tracking-wider text-slate-400">
                    <Wallet className="h-3.5 w-3.5 text-[#059669]" /> Target In-Hand
                  </p>
                  <p className="mt-1 font-display text-lg font-black text-lime">
                    {inr(career.salary.monthlyInHandMin)}–{inr(career.salary.monthlyInHandMax)}
                  </p>
                </div>
              </div>

              <button
                type="button"
                onClick={() => {
                  if (onOpenDiagnostic) {
                    onOpenDiagnostic(career, checkedList, readinessScore);
                  }
                }}
                className="inline-flex h-12 w-full items-center justify-center gap-2 rounded-full bg-lime px-6 text-sm font-bold text-[#0F172A] shadow-lime transition hover:brightness-95"
              >
                <ClipboardCheck className="h-4 w-4" /> Generate Personalized Diagnostic Scorecard{" "}
                <ArrowRight className="h-4 w-4" />
              </button>
            </div>
          </div>
        </div>

        {/* Two-Column Interactive Checklists */}
        <div className="mt-8 grid gap-8 lg:grid-cols-12">
          {/* Left: Skills Checklist (5 cols) */}
          <div className="space-y-6 rounded-3xl border border-border bg-card p-6 shadow-card lg:col-span-5">
            <div>
              <h3 className="font-display text-lg font-extrabold text-[#0F172A]">
                Part A: Technical & Foundational Skills
              </h3>
              <p className="text-xs text-muted-foreground">
                Click any skill you can confidently demonstrate in a live interview today.
              </p>
            </div>

            {/* Foundational */}
            <div>
              <p className="text-xs font-bold uppercase tracking-wider text-[#059669]">
                Foundational Must-Haves (2x Weight)
              </p>
              <div className="mt-2.5 space-y-2">
                {allChecklistItems.foundational.map((item) => {
                  const checked = checkedList.includes(item.key);
                  return (
                    <button
                      key={item.key}
                      type="button"
                      onClick={() => toggleItem(item.key)}
                      className={`flex w-full items-center justify-between rounded-xl border px-3.5 py-2.5 text-left text-sm font-medium transition ${
                        checked
                          ? "border-[#059669] bg-[#059669]/10 text-[#0F172A]"
                          : "border-border bg-background text-foreground hover:border-[#059669]/50"
                      }`}
                    >
                      <span className="flex items-center gap-2.5">
                        {checked ? (
                          <CheckCircle2 className="h-4 w-4 shrink-0 text-[#059669]" />
                        ) : (
                          <Circle className="h-4 w-4 shrink-0 text-muted-foreground" />
                        )}
                        {item.label}
                      </span>
                      <span className="text-[11px] font-bold text-[#059669]">
                        {checked ? "Done" : "+Check"}
                      </span>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Core Technical */}
            <div>
              <p className="text-xs font-bold uppercase tracking-wider text-[#059669]">
                Core Technical Stack (3x Weight)
              </p>
              <div className="mt-2.5 space-y-2">
                {allChecklistItems.technical.map((item) => {
                  const checked = checkedList.includes(item.key);
                  return (
                    <button
                      key={item.key}
                      type="button"
                      onClick={() => toggleItem(item.key)}
                      className={`flex w-full items-center justify-between rounded-xl border px-3.5 py-2.5 text-left text-sm font-medium transition ${
                        checked
                          ? "border-[#059669] bg-[#059669]/10 text-[#0F172A]"
                          : "border-border bg-background text-foreground hover:border-[#059669]/50"
                      }`}
                    >
                      <span className="flex items-center gap-2.5">
                        {checked ? (
                          <CheckCircle2 className="h-4 w-4 shrink-0 text-[#059669]" />
                        ) : (
                          <Circle className="h-4 w-4 shrink-0 text-muted-foreground" />
                        )}
                        {item.label}
                      </span>
                      <span className="text-[11px] font-bold text-[#059669]">
                        {checked ? "Done" : "+Check"}
                      </span>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Optional / Bonus */}
            <div>
              <p className="text-xs font-bold uppercase tracking-wider text-[#B45309]">
                Bonus Differentiators (1x Weight)
              </p>
              <div className="mt-2.5 space-y-2">
                {allChecklistItems.optional.map((item) => {
                  const checked = checkedList.includes(item.key);
                  return (
                    <button
                      key={item.key}
                      type="button"
                      onClick={() => toggleItem(item.key)}
                      className={`flex w-full items-center justify-between rounded-xl border px-3.5 py-2.5 text-left text-sm font-medium transition ${
                        checked
                          ? "border-[#F59E0B] bg-[#F59E0B]/15 text-[#0F172A]"
                          : "border-border bg-background text-muted-foreground hover:border-[#F59E0B]/50"
                      }`}
                    >
                      <span className="flex items-center gap-2.5">
                        {checked ? (
                          <CheckCircle2 className="h-4 w-4 shrink-0 text-[#B45309]" />
                        ) : (
                          <Circle className="h-4 w-4 shrink-0 text-muted-foreground" />
                        )}
                        {item.label}
                      </span>
                      <span className="text-[11px] font-bold text-[#B45309]">
                        {checked ? "Bonus" : "+Check"}
                      </span>
                    </button>
                  );
                })}
              </div>
            </div>
          </div>

          {/* Right: 7-Stage Execution Milestones (7 cols) */}
          <div className="rounded-3xl border border-border bg-card p-6 shadow-card lg:col-span-7">
            <div className="flex flex-wrap items-center justify-between gap-2">
              <div>
                <h3 className="font-display text-lg font-extrabold text-[#0F172A]">
                  Part B: 7-Stage Preparation Milestones
                </h3>
                <p className="text-xs text-muted-foreground">
                  Check off completed execution stages to track your end-to-end readiness.
                </p>
              </div>
              <span className="rounded-full bg-[#F59E0B]/15 px-3 py-1 text-xs font-bold text-[#B45309]">
                Free Tier: {career.prepCostEstimate.freeTier}
              </span>
            </div>

            <div className="mt-5 space-y-3">
              {allChecklistItems.steps.map((st, idx) => {
                const checked = checkedList.includes(st.key);
                return (
                  <button
                    key={st.key}
                    type="button"
                    onClick={() => toggleItem(st.key)}
                    className={`flex w-full items-start gap-4 rounded-2xl border p-4 text-left transition ${
                      checked
                        ? "border-[#059669] bg-[#059669]/8 shadow-2xs"
                        : "border-border bg-background hover:border-[#059669]/40"
                    }`}
                  >
                    <span
                      className={`mt-0.5 grid h-8 w-8 shrink-0 place-items-center rounded-xl text-xs font-extrabold ${
                        checked
                          ? "bg-[#059669] text-white"
                          : "bg-[#0F172A] text-lime"
                      }`}
                    >
                      {checked ? "✓" : idx + 1}
                    </span>
                    <div className="min-w-0 flex-1">
                      <div className="flex flex-wrap items-center justify-between gap-2">
                        <p className="font-display text-sm font-extrabold text-[#0F172A]">{st.label}</p>
                        <span className="rounded-full bg-muted px-2.5 py-0.5 text-[11px] font-bold text-muted-foreground">
                          {st.duration}
                        </span>
                      </div>
                      <p className="mt-1 text-xs leading-relaxed text-muted-foreground">{st.sublabel}</p>
                    </div>
                  </button>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
