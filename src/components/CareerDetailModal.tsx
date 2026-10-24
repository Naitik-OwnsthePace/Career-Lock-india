import { useEffect } from "react";
import {
  CheckCircle2,
  Circle,
  Info,
  Calculator,
  Building2,
  Send,
  X,
  Clock,
  Wallet,
  GraduationCap,
  ListChecks,
  ShieldAlert,
} from "lucide-react";
import type { Career } from "@/data/careersData";
import { inr, lpa } from "@/lib/explorer";

export interface CareerDetailModalProps {
  career: Career | null;
  onClose: () => void;
  onSimulateCTC?: (career: Career) => void;
  onSelectForRoadmap?: (career: Career) => void;
}

export function CareerDetailModal({
  career,
  onClose,
  onSimulateCTC,
  onSelectForRoadmap,
}: CareerDetailModalProps) {
  useEffect(() => {
    if (!career) return;
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [career, onClose]);

  if (!career) return null;

  const handleSimulateClick = () => {
    onClose();
    if (onSimulateCTC) {
      onSimulateCTC(career);
    }
  };

  const handleRoadmapClick = () => {
    onClose();
    if (onSelectForRoadmap) {
      onSelectForRoadmap(career);
    }
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-[#0F172A]/80 p-3 backdrop-blur-sm sm:p-6"
      role="dialog"
      aria-modal="true"
      aria-labelledby="career-modal-title"
      onClick={onClose}
    >
      <div
        className="relative flex max-h-[90vh] w-full max-w-4xl flex-col overflow-hidden rounded-3xl border border-border bg-background shadow-2xl"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="bg-[#0F172A] px-6 py-6 text-white sm:px-8">
          <div className="flex items-start justify-between gap-4">
            <div>
              <div className="flex flex-wrap items-center gap-2">
                <span className="rounded-full bg-[#059669] px-3 py-1 text-xs font-bold text-white">
                  {career.domain}
                </span>
                <span className="rounded-full bg-[#F59E0B]/20 px-3 py-1 text-xs font-bold text-[#F59E0B]">
                  {career.evidenceQuality}
                </span>
                <span className="rounded-full bg-white/10 px-3 py-1 text-xs font-semibold text-slate-200">
                  {career.entryFeasibility} Entry Feasibility
                </span>
              </div>
              <h2
                id="career-modal-title"
                className="mt-3 font-display text-2xl font-black tracking-tight text-white sm:text-3xl"
              >
                {career.title}
              </h2>
              <p className="mt-1.5 max-w-2xl text-sm text-slate-300">{career.description}</p>
            </div>
            <button
              type="button"
              onClick={onClose}
              aria-label="Close career details"
              className="grid h-10 w-10 shrink-0 place-items-center rounded-full bg-white/10 text-white transition hover:bg-white/20"
            >
              <X className="h-5 w-5" />
            </button>
          </div>

          <div className="mt-5 grid grid-cols-2 gap-3 sm:grid-cols-4">
            <div className="rounded-2xl border border-white/10 bg-white/5 p-3">
              <p className="flex items-center gap-1.5 text-[11px] font-semibold uppercase tracking-wider text-slate-400">
                <Wallet className="h-3.5 w-3.5 text-[#059669]" /> Monthly In-Hand
              </p>
              <p className="mt-1 text-sm font-extrabold text-white">
                {inr(career.salary.monthlyInHandMin)} – {inr(career.salary.monthlyInHandMax)}
              </p>
            </div>
            <div className="rounded-2xl border border-white/10 bg-white/5 p-3">
              <p className="flex items-center gap-1.5 text-[11px] font-semibold uppercase tracking-wider text-slate-400">
                <Clock className="h-3.5 w-3.5 text-[#F59E0B]" /> Prep Timeline
              </p>
              <p className="mt-1 text-sm font-extrabold text-white">{career.prepTimelineMonths} Months</p>
            </div>
            <div className="rounded-2xl border border-white/10 bg-white/5 p-3">
              <p className="flex items-center gap-1.5 text-[11px] font-semibold uppercase tracking-wider text-slate-400">
                <GraduationCap className="h-3.5 w-3.5 text-[#059669]" /> Non-Tech Friendly
              </p>
              <p className="mt-1 text-sm font-extrabold text-white">
                {career.nonTechFriendly ? "Yes (Open to All)" : "CS / Tech Preferred"}
              </p>
            </div>
            <div className="rounded-2xl border border-white/10 bg-white/5 p-3">
              <p className="flex items-center gap-1.5 text-[11px] font-semibold uppercase tracking-wider text-slate-400">
                <Send className="h-3.5 w-3.5 text-[#F59E0B]" /> Hiring Mode
              </p>
              <p className="mt-1 text-sm font-extrabold text-white">{career.hiringMode}</p>
            </div>
          </div>
        </div>

        {/* Scrollable Content */}
        <div className="flex-1 space-y-8 overflow-y-auto px-6 py-6 sm:px-8">
          {/* 1. Role Overview */}
          <section>
            <h3 className="flex items-center gap-2.5 font-display text-lg font-extrabold text-foreground">
              <span className="grid h-7 w-7 place-items-center rounded-lg bg-[#0F172A] text-xs font-bold text-lime">
                01
              </span>
              Role Overview & Day-to-Day Reality
            </h3>
            <div className="mt-4 grid gap-4 md:grid-cols-3">
              <div className="rounded-2xl border border-border bg-card p-4 md:col-span-2">
                <p className="text-xs font-bold uppercase tracking-wider text-[#059669]">
                  What Freshers Actually Do in Month 1–6
                </p>
                <ul className="mt-3 space-y-2.5">
                  {career.dailyWork.map((task) => (
                    <li key={task} className="flex items-start gap-2.5 text-sm text-foreground">
                      <span className="mt-1.5 h-2 w-2 shrink-0 rounded-full bg-[#059669]" />
                      <span>{task}</span>
                    </li>
                  ))}
                </ul>
              </div>
              <div className="rounded-2xl border border-border bg-muted/50 p-4">
                <p className="text-xs font-bold uppercase tracking-wider text-muted-foreground">
                  Eligible Degrees
                </p>
                <div className="mt-3 flex flex-wrap gap-1.5">
                  {career.eligibleDegrees.map((deg) => (
                    <span
                      key={deg}
                      className="rounded-lg border border-border bg-card px-2.5 py-1 text-xs font-bold text-foreground"
                    >
                      {deg}
                    </span>
                  ))}
                </div>
                <p className="mt-4 text-xs font-bold uppercase tracking-wider text-muted-foreground">
                  Prep Cost Reality
                </p>
                <p className="mt-1 text-xs text-foreground">
                  <span className="font-semibold text-[#059669]">Self-Taught:</span> {career.prepCostEstimate.freeTier}
                </p>
                <p className="mt-1 text-xs text-muted-foreground">
                  <span className="font-semibold text-foreground">Structured:</span>{" "}
                  {career.prepCostEstimate.structuredTier}
                </p>
              </div>
            </div>
          </section>

          {/* 2. Essential vs Preferred Skills Checklist */}
          <section className="border-t border-border pt-6">
            <h3 className="flex items-center gap-2.5 font-display text-lg font-extrabold text-foreground">
              <span className="grid h-7 w-7 place-items-center rounded-lg bg-[#0F172A] text-xs font-bold text-lime">
                02
              </span>
              Essential vs Preferred Skills Checklist
            </h3>
            <div className="mt-4 grid gap-4 sm:grid-cols-3">
              <div className="rounded-2xl border border-[#059669]/30 bg-[#059669]/5 p-4">
                <p className="text-xs font-bold uppercase tracking-wider text-[#059669]">
                  Foundational (Must-Have)
                </p>
                <ul className="mt-3 space-y-2">
                  {career.keySkills.foundational.map((s) => (
                    <li key={s} className="flex items-center gap-2 text-sm font-medium text-foreground">
                      <CheckCircle2 className="h-4 w-4 shrink-0 text-[#059669]" />
                      {s}
                    </li>
                  ))}
                </ul>
              </div>
              <div className="rounded-2xl border border-[#059669]/30 bg-card p-4">
                <p className="text-xs font-bold uppercase tracking-wider text-[#059669]">
                  Core Technical (Tested in Rounds)
                </p>
                <ul className="mt-3 space-y-2">
                  {career.keySkills.technical.map((s) => (
                    <li key={s} className="flex items-center gap-2 text-sm font-medium text-foreground">
                      <CheckCircle2 className="h-4 w-4 shrink-0 text-[#059669]" />
                      {s}
                    </li>
                  ))}
                </ul>
              </div>
              <div className="rounded-2xl border border-border bg-card p-4">
                <p className="text-xs font-bold uppercase tracking-wider text-[#F59E0B]">
                  Preferred / Bonus Differentiators
                </p>
                <ul className="mt-3 space-y-2">
                  {career.keySkills.optional.map((s) => (
                    <li key={s} className="flex items-center gap-2 text-sm text-muted-foreground">
                      <Circle className="h-4 w-4 shrink-0 text-[#F59E0B]" />
                      {s}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </section>

          {/* 3. Salary Reality */}
          <section className="border-t border-border pt-6">
            <h3 className="flex items-center gap-2.5 font-display text-lg font-extrabold text-foreground">
              <span className="grid h-7 w-7 place-items-center rounded-lg bg-[#0F172A] text-xs font-bold text-lime">
                03
              </span>
              Salary Reality Check (Advertised CTC vs Real In-Hand Pay)
            </h3>
            <div className="mt-4 grid gap-4 sm:grid-cols-3">
              <div className="rounded-2xl border border-border bg-muted/60 p-4">
                <p className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                  Advertised Fresher CTC
                </p>
                <p className="mt-1 font-display text-xl font-black text-muted-foreground line-through decoration-[#F59E0B] decoration-2">
                  {lpa(career.salary.advertisedCTCMin)} – {lpa(career.salary.advertisedCTCMax)}
                </p>
                <p className="mt-1 text-xs text-muted-foreground">
                  Inflated by variable pay, joining bonus & employer PF/gratuity.
                </p>
              </div>
              <div className="rounded-2xl border border-border bg-card p-4">
                <p className="text-xs font-semibold uppercase tracking-wider text-foreground">
                  Realistic Fixed Base Pay
                </p>
                <p className="mt-1 font-display text-xl font-black text-foreground">
                  {lpa(career.salary.realisticBaseMin)} – {lpa(career.salary.realisticBaseMax)}
                </p>
                <p className="mt-1 text-xs text-muted-foreground">
                  Guaranteed annual salary component before PF & tax deductions.
                </p>
              </div>
              <div className="rounded-2xl border-2 border-[#059669] bg-[#059669]/10 p-4">
                <p className="text-xs font-bold uppercase tracking-wider text-[#059669]">
                  Net Liquid Monthly In-Hand
                </p>
                <p className="mt-1 font-display text-xl font-black text-[#059669]">
                  {inr(career.salary.monthlyInHandMin)} – {inr(career.salary.monthlyInHandMax)} / mo
                </p>
                <p className="mt-1 text-xs text-foreground">
                  Actual monthly bank credit after PF, ₹200 PT, and New Regime TDS.
                </p>
              </div>
            </div>
            <div className="mt-3 flex items-start gap-2.5 rounded-xl border border-[#F59E0B]/40 bg-[#F59E0B]/10 p-3.5 text-xs text-foreground">
              <ShieldAlert className="mt-0.5 h-4 w-4 shrink-0 text-[#F59E0B]" />
              <span>
                <strong>CTC Warning:</strong> Always ask HR for the <em>"Fixed Gross Component"</em> before signing an offer letter. Click{" "}
                <strong>"Simulate CTC for this Role"</strong> below to model exact deductions.
              </span>
            </div>
          </section>

          {/* 4. Entry Routes */}
          <section className="border-t border-border pt-6">
            <h3 className="flex items-center gap-2.5 font-display text-lg font-extrabold text-foreground">
              <span className="grid h-7 w-7 place-items-center rounded-lg bg-[#0F172A] text-xs font-bold text-lime">
                04
              </span>
              Entry Routes (Campus vs Off-Campus Outreach)
            </h3>
            <div className="mt-4 grid gap-4 md:grid-cols-2">
              <div className="rounded-2xl border border-border bg-card p-5">
                <div className="flex items-center justify-between">
                  <p className="flex items-center gap-2 text-sm font-bold text-foreground">
                    <Building2 className="h-4 w-4 text-[#059669]" /> Campus Placement Reality
                  </p>
                  <span className="rounded-full bg-[#0F172A] px-2.5 py-0.5 text-xs font-bold text-lime">
                    Weight: {career.hiringRoutes.campusWeight}
                  </span>
                </div>
                <div className="mt-3 h-2.5 overflow-hidden rounded-full bg-muted">
                  <div
                    className="h-full rounded-full bg-[#059669]"
                    style={{ width: `${career.campusProbability}%` }}
                  />
                </div>
                <p className="mt-1.5 text-xs text-muted-foreground">
                  ~{career.campusProbability}% of fresher intake happens through campus drives
                </p>
                <div className="mt-4 space-y-2 text-xs">
                  <div className="rounded-lg bg-muted/60 p-2.5">
                    <span className="font-bold text-foreground">Tier-1 Colleges: </span>
                    <span className="text-muted-foreground">{career.tierAccessibility.tier1}</span>
                  </div>
                  <div className="rounded-lg bg-muted/60 p-2.5">
                    <span className="font-bold text-foreground">Tier-2 Colleges: </span>
                    <span className="text-muted-foreground">{career.tierAccessibility.tier2}</span>
                  </div>
                  <div className="rounded-lg bg-muted/60 p-2.5">
                    <span className="font-bold text-foreground">Tier-3 Colleges: </span>
                    <span className="text-muted-foreground">{career.tierAccessibility.tier3}</span>
                  </div>
                </div>
              </div>

              <div className="rounded-2xl border border-border bg-card p-5">
                <div className="flex items-center justify-between">
                  <p className="flex items-center gap-2 text-sm font-bold text-foreground">
                    <Send className="h-4 w-4 text-[#059669]" /> Off-Campus Outreach Playbook
                  </p>
                  <span className="rounded-full bg-[#059669]/15 px-2.5 py-0.5 text-xs font-bold text-[#059669]">
                    Feasibility: {career.hiringRoutes.offCampusFeasibility}
                  </span>
                </div>
                <div className="mt-3 rounded-xl bg-muted/60 p-3">
                  <p className="text-xs font-bold uppercase tracking-wider text-muted-foreground">
                    Typical Interview Funnel
                  </p>
                  <p className="mt-1 text-sm font-semibold text-foreground">
                    {career.hiringRoutes.topHiringPatterns}
                  </p>
                </div>
                <p className="mt-4 text-xs font-bold uppercase tracking-wider text-muted-foreground">
                  High-Conversion Off-Campus Steps
                </p>
                <ol className="mt-2 list-decimal space-y-1.5 pl-4 text-xs text-muted-foreground">
                  <li>Build 2 deployed proof-of-work repositories solving real Indian domain problems.</li>
                  <li>Record a 90-second Loom video demonstrating your project / dashboard / test suite.</li>
                  <li>Request referrals from 10 engineers/analysts weekly on LinkedIn with your Loom link.</li>
                </ol>
              </div>
            </div>
          </section>

          {/* 5. 7-Step Roadmap */}
          <section className="border-t border-border pt-6">
            <h3 className="flex items-center gap-2.5 font-display text-lg font-extrabold text-foreground">
              <span className="grid h-7 w-7 place-items-center rounded-lg bg-[#0F172A] text-xs font-bold text-lime">
                05
              </span>
              7-Step Execution Roadmap ({career.prepTimelineMonths} Months)
            </h3>
            <ol className="mt-5 grid gap-3 sm:grid-cols-2">
              {career.roadmapSteps.map((step) => (
                <li
                  key={step.step}
                  className="flex gap-3.5 rounded-2xl border border-border bg-card p-4 shadow-2xs"
                >
                  <span className="grid h-8 w-8 shrink-0 place-items-center rounded-xl bg-[#0F172A] text-xs font-extrabold text-lime">
                    {step.step}
                  </span>
                  <div className="min-w-0">
                    <div className="flex flex-wrap items-center gap-2">
                      <p className="text-sm font-extrabold text-foreground">{step.title}</p>
                      <span className="rounded-full bg-[#059669]/10 px-2 py-0.5 text-[11px] font-bold text-[#059669]">
                        {step.duration}
                      </span>
                    </div>
                    <p className="mt-1 text-xs leading-relaxed text-muted-foreground">{step.focus}</p>
                  </div>
                </li>
              ))}
            </ol>
          </section>
        </div>

        {/* Footer Actions */}
        <div className="flex flex-wrap items-center justify-between gap-3 border-t border-border bg-card px-6 py-4 sm:px-8">
          <div className="flex items-center gap-2 text-xs text-muted-foreground">
            <Info className="h-4 w-4 text-[#059669]" />
            <span>Want to track your readiness or test tax deductions for {career.title}?</span>
          </div>
          <div className="flex flex-wrap items-center gap-3">
            <button
              type="button"
              onClick={handleRoadmapClick}
              className="inline-flex h-11 items-center gap-2 rounded-full border border-[#0F172A] bg-background px-5 text-xs font-bold text-foreground transition hover:bg-muted"
            >
              <ListChecks className="h-4 w-4 text-[#059669]" /> Load into Roadmap Checklist
            </button>
            <button
              type="button"
              onClick={handleSimulateClick}
              className="inline-flex h-11 items-center gap-2 rounded-full bg-[#059669] px-6 text-sm font-bold text-white shadow-md transition hover:bg-[#059669]/90"
            >
              <Calculator className="h-4 w-4" /> Simulate CTC for this Role
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
