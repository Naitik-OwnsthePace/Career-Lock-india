import { useState, useEffect, type FormEvent } from "react";
import { toast } from "sonner";
import { useNavigate } from "@tanstack/react-router";
import {
  X,
  Loader2,
  CheckCircle2,
  AlertCircle,
  Sparkles,
  Target,
  ArrowRight,
  RotateCcw,
  ShieldCheck,
} from "lucide-react";
import { CAREERS, type Career } from "@/data/careersData";
import { EDUCATIONS, TIERS, type CollegeTier, type Education } from "@/lib/career-match";
import { inr, lpa } from "@/lib/explorer";

export interface DiagnosticModalProps {
  open: boolean;
  onClose: () => void;
  initialCareer?: Career | null;
  checkedItems?: string[];
  initialReadinessScore?: number;
}

interface DiagnosticFormState {
  fullName: string;
  targetCareerId: string;
  degree: Education;
  collegeTier: CollegeTier;
  mobile: string;
  email: string;
}

const TIER_SALARY_FACTOR: Record<CollegeTier, number> = {
  "Tier 1": 1.15,
  "Tier 2": 1.0,
  "Tier 3": 0.88,
  "Unclassified / Open": 0.85,
};

export function DiagnosticModal({
  open,
  onClose,
  initialCareer,
  checkedItems = [],
  initialReadinessScore = 35,
}: DiagnosticModalProps) {
  const defaultCareer = CAREERS[0]!;
  const navigate = useNavigate();
  const [form, setForm] = useState<DiagnosticFormState>({
    fullName: "",
    targetCareerId: initialCareer?.id ?? defaultCareer.id,
    degree: "BTech/BE",
    collegeTier: "Tier 2",
    mobile: "",
    email: "",
  });
  const [errors, setErrors] = useState<Partial<Record<keyof DiagnosticFormState, string>>>({});
  const [isCalculating, setIsCalculating] = useState(false);
  const [submittedScorecard, setSubmittedScorecard] = useState<boolean>(false);

  useEffect(() => {
    if (initialCareer) {
      setForm((prev) => ({ ...prev, targetCareerId: initialCareer.id }));
    }
  }, [initialCareer]);

  useEffect(() => {
    if (!open) return;
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, [open, onClose]);

  if (!open) return null;

  const targetCareer = CAREERS.find((c) => c.id === form.targetCareerId) ?? defaultCareer;

  const validate = (): boolean => {
    const nextErrors: Partial<Record<keyof DiagnosticFormState, string>> = {};
    if (!form.fullName.trim() || form.fullName.trim().length < 2) {
      nextErrors.fullName = "Please enter your full name.";
    }
    const cleanPhone = form.mobile.trim();
    if (!/^[6-9]\d{9}$/.test(cleanPhone)) {
      nextErrors.mobile = "Enter a valid 10-digit Indian mobile number (starts with 6–9).";
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email.trim())) {
      nextErrors.email = "Enter a valid email address.";
    }
    setErrors(nextErrors);
    return Object.keys(nextErrors).length === 0;
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (!validate()) return;

    setIsCalculating(true);
    setTimeout(() => {
      setIsCalculating(false);
      setSubmittedScorecard(true);
      toast.success(`Diagnostic Scorecard ready for ${form.fullName.trim()}!`, {
        description: `Calibrated for ${targetCareer.title} (${form.collegeTier} · ${form.degree}).`,
      });
    }, 1200);
  };

  const allEssentialSkills = [
    ...targetCareer.keySkills.foundational,
    ...targetCareer.keySkills.technical,
  ];
  const skillGaps = allEssentialSkills.filter((s) => !checkedItems.includes(`skill:${s}`));
  const displayedGaps = skillGaps.length > 0 ? skillGaps.slice(0, 5) : targetCareer.keySkills.optional;

  const tierMultiplier = TIER_SALARY_FACTOR[form.collegeTier];
  const calibratedInHandMin = Math.round((targetCareer.salary.monthlyInHandMin * tierMultiplier) / 500) * 500;
  const calibratedInHandMax = Math.round((targetCareer.salary.monthlyInHandMax * tierMultiplier) / 500) * 500;

  const nextThreeActions = [
    `Master ${displayedGaps.slice(0, 2).join(" & ")} over the next 3 weeks using ${targetCareer.prepCostEstimate.freeTier.split("(")[0]?.trim() || "free resources"}.`,
    `Complete Stage 4 (${targetCareer.roadmapSteps[3]?.focus ?? "2 deployed proof-of-work projects"}) and publish a clean GitHub README with architecture notes.`,
    form.collegeTier === "Tier 3" || form.collegeTier === "Unclassified / Open"
      ? `Prioritize off-campus outreach (${targetCareer.hiringRoutes.topHiringPatterns}) by sending 10 engineer referral requests weekly.`
      : `Prepare for ${targetCareer.hiringMode.toLowerCase()} drives: ${targetCareer.hiringRoutes.topHiringPatterns}`,
  ];

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-[#0F172A]/80 p-3 backdrop-blur-sm sm:p-6"
      role="dialog"
      aria-modal="true"
      aria-labelledby="diagnostic-modal-title"
      onClick={onClose}
    >
      <div
        className="relative flex max-h-[92vh] w-full max-w-2xl flex-col overflow-hidden rounded-3xl border border-border bg-card shadow-2xl"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-start justify-between gap-4 bg-[#0F172A] px-6 py-5 text-white sm:px-8">
          <div>
            <span className="inline-flex items-center gap-1.5 rounded-full bg-[#059669] px-3 py-0.5 text-xs font-bold text-white">
              <Sparkles className="h-3.5 w-3.5" /> Personalized Career Diagnostic
            </span>
            <h2 id="diagnostic-modal-title" className="mt-2 font-display text-2xl font-black text-white">
              {submittedScorecard
                ? "Your Personalized Career Diagnostic Scorecard"
                : "Get Your Free Career ROI & Skill Gap Scorecard"}
            </h2>
            <p className="mt-1 text-xs text-slate-300">
              {submittedScorecard
                ? `Generated for ${form.fullName} · ${form.degree} (${form.collegeTier})`
                : "Calibrated for your degree, college tier, and target role in 1.2 seconds."}
            </p>
          </div>
          <button
            type="button"
            onClick={onClose}
            aria-label="Close diagnostic modal"
            className="grid h-9 w-9 shrink-0 place-items-center rounded-full bg-white/10 text-white hover:bg-white/20"
          >
            <X className="h-4 w-4" />
          </button>
        </div>

        <div className="flex-1 overflow-y-auto p-6 sm:p-8">
          {!submittedScorecard ? (
            <form onSubmit={handleSubmit} className="space-y-4" noValidate>
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-muted-foreground">
                  Full Name *
                </label>
                <input
                  type="text"
                  placeholder="e.g. Aarav Kulkarni"
                  value={form.fullName}
                  onChange={(e) => setForm((p) => ({ ...p, fullName: e.target.value }))}
                  className="mt-1.5 h-11 w-full rounded-xl border border-border bg-background px-3.5 text-sm font-medium text-foreground outline-none focus:border-[#059669]"
                />
                {errors.fullName && (
                  <p className="mt-1 text-xs font-semibold text-destructive">{errors.fullName}</p>
                )}
              </div>

              <div className="grid gap-4 sm:grid-cols-2">
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-muted-foreground">
                    Target Career Role *
                  </label>
                  <select
                    value={form.targetCareerId}
                    onChange={(e) => setForm((p) => ({ ...p, targetCareerId: e.target.value }))}
                    className="mt-1.5 h-11 w-full rounded-xl border border-border bg-background px-3 text-sm font-semibold text-foreground outline-none focus:border-[#059669]"
                  >
                    {CAREERS.map((c) => (
                      <option key={c.id} value={c.id}>
                        {c.title}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-muted-foreground">
                    Current Degree *
                  </label>
                  <select
                    value={form.degree}
                    onChange={(e) => setForm((p) => ({ ...p, degree: e.target.value as Education }))}
                    className="mt-1.5 h-11 w-full rounded-xl border border-border bg-background px-3 text-sm font-semibold text-foreground outline-none focus:border-[#059669]"
                  >
                    {EDUCATIONS.map((deg) => (
                      <option key={deg} value={deg}>
                        {deg}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              <div className="grid gap-4 sm:grid-cols-2">
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-muted-foreground">
                    College Tier *
                  </label>
                  <select
                    value={form.collegeTier}
                    onChange={(e) =>
                      setForm((p) => ({ ...p, collegeTier: e.target.value as CollegeTier }))
                    }
                    className="mt-1.5 h-11 w-full rounded-xl border border-border bg-background px-3 text-sm font-semibold text-foreground outline-none focus:border-[#059669]"
                  >
                    {TIERS.map((t) => (
                      <option key={t} value={t}>
                        {t}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-muted-foreground">
                    Indian Mobile Number (10 Digits) *
                  </label>
                  <div className="mt-1.5 flex">
                    <span className="inline-flex h-11 items-center rounded-l-xl border border-r-0 border-border bg-muted px-3 text-sm font-bold text-foreground">
                      +91
                    </span>
                    <input
                      type="tel"
                      inputMode="numeric"
                      maxLength={10}
                      placeholder="9876543210"
                      value={form.mobile}
                      onChange={(e) => {
                        const digitsOnly = e.target.value.replace(/\D/g, "").slice(0, 10);
                        setForm((p) => ({ ...p, mobile: digitsOnly }));
                      }}
                      className="h-11 w-full rounded-r-xl border border-border bg-background px-3.5 text-sm font-medium text-foreground outline-none focus:border-[#059669]"
                    />
                  </div>
                  {errors.mobile && (
                    <p className="mt-1 text-xs font-semibold text-destructive">{errors.mobile}</p>
                  )}
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-muted-foreground">
                  Email Address *
                </label>
                <input
                  type="email"
                  placeholder="aarav@college.edu.in"
                  value={form.email}
                  onChange={(e) => setForm((p) => ({ ...p, email: e.target.value }))}
                  className="mt-1.5 h-11 w-full rounded-xl border border-border bg-background px-3.5 text-sm font-medium text-foreground outline-none focus:border-[#059669]"
                />
                {errors.email && (
                  <p className="mt-1 text-xs font-semibold text-destructive">{errors.email}</p>
                )}
              </div>

              <div className="flex items-start gap-2.5 rounded-xl bg-muted p-3 text-xs text-muted-foreground">
                <ShieldCheck className="mt-0.5 h-4 w-4 shrink-0 text-[#059669]" />
                <span>
                  Zero spam guarantee. We never sell student numbers to predatory bootcamp loan agents.
                </span>
              </div>

              <button
                type="submit"
                disabled={isCalculating}
                className="inline-flex h-12 w-full items-center justify-center gap-2 rounded-full bg-[#059669] px-6 text-sm font-bold text-white shadow-md transition hover:bg-[#059669]/90 disabled:opacity-75"
              >
                {isCalculating ? (
                  <>
                    <Loader2 className="h-4 w-4 animate-spin" /> Calculating Tier-Calibrated Scorecard...
                  </>
                ) : (
                  <>
                    Generate My Diagnostic Scorecard <ArrowRight className="h-4 w-4" />
                  </>
                )}
              </button>
            </form>
          ) : (
            <div className="space-y-6 animate-in fade-in duration-300">
              <div className="grid gap-4 sm:grid-cols-3">
                <div className="rounded-2xl border border-[#059669]/30 bg-[#059669]/10 p-4">
                  <p className="text-[11px] font-bold uppercase tracking-wider text-[#059669]">
                    Target In-Hand Salary
                  </p>
                  <p className="mt-1 font-display text-lg font-black text-[#0F172A]">
                    {inr(calibratedInHandMin)} – {inr(calibratedInHandMax)}/mo
                  </p>
                  <p className="mt-0.5 text-[11px] text-muted-foreground">
                    Calibrated for {form.collegeTier} ({lpa(targetCareer.salary.advertisedCTCMin)}–{lpa(targetCareer.salary.advertisedCTCMax)} CTC)
                  </p>
                </div>

                <div className="rounded-2xl border border-border bg-muted/60 p-4">
                  <p className="text-[11px] font-bold uppercase tracking-wider text-muted-foreground">
                    Current Readiness Score
                  </p>
                  <p className="mt-1 font-display text-lg font-black text-[#0F172A]">
                    {initialReadinessScore}% Ready
                  </p>
                  <p className="mt-0.5 text-[11px] text-muted-foreground">
                    Est. {targetCareer.prepTimelineMonths} mos standard timeline
                  </p>
                </div>

                <div className="rounded-2xl border border-[#F59E0B]/40 bg-[#F59E0B]/10 p-4">
                  <p className="text-[11px] font-bold uppercase tracking-wider text-[#B45309]">
                    Recommended Hiring Route
                  </p>
                  <p className="mt-1 font-display text-lg font-black text-[#0F172A]">
                    {form.collegeTier === "Tier 3" ? "Off-Campus Proof" : targetCareer.hiringMode}
                  </p>
                  <p className="mt-0.5 text-[11px] text-muted-foreground">
                    Feasibility: {targetCareer.entryFeasibility}
                  </p>
                </div>
              </div>

              <div className="rounded-2xl border border-border bg-background p-4">
                <p className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-[#B45309]">
                  <AlertCircle className="h-4 w-4 text-[#F59E0B]" /> Priority Skill Gaps to Close for{" "}
                  {targetCareer.title}
                </p>
                <div className="mt-3 flex flex-wrap gap-2">
                  {displayedGaps.map((skill) => (
                    <span
                      key={skill}
                      className="rounded-lg border border-[#F59E0B]/40 bg-[#F59E0B]/10 px-3 py-1 text-xs font-bold text-[#0F172A]"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </div>

              <div className="rounded-2xl border border-border bg-background p-5">
                <p className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-[#059669]">
                  <Target className="h-4 w-4" /> Your Next 3 Execution Action Items
                </p>
                <ol className="mt-3 space-y-3">
                  {nextThreeActions.map((action, i) => (
                    <li key={action} className="flex items-start gap-3 text-sm text-foreground">
                      <span className="grid h-6 w-6 shrink-0 place-items-center rounded-full bg-[#0F172A] text-xs font-bold text-lime">
                        {i + 1}
                      </span>
                      <span className="leading-relaxed">{action}</span>
                    </li>
                  ))}
                </ol>
              </div>

              <div className="flex flex-wrap items-center justify-between gap-3 pt-2">
                <button
                  type="button"
                  onClick={() => setSubmittedScorecard(false)}
                  className="inline-flex h-10 items-center gap-1.5 rounded-full border border-border px-4 text-xs font-bold text-muted-foreground hover:text-foreground"
                >
                  <RotateCcw className="h-3.5 w-3.5" /> Edit Inputs
                </button>
                <button
                  type="button"
                  onClick={() => {
                    onClose();
                    void navigate({ to: "/roadmap" });
                  }}
                  className="inline-flex h-11 items-center gap-2 rounded-full bg-[#0F172A] px-6 text-xs font-bold text-lime transition hover:bg-[#059669] hover:text-white"
                >
                  <CheckCircle2 className="h-4 w-4" /> Continue on Interactive Roadmap
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
