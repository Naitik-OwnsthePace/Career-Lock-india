import { Quote, CheckCircle2, XCircle, ArrowRight, Wallet, Clock, Sparkles } from "lucide-react";
import { STUDENT_CASE_STUDIES, getCareer, type Career } from "@/data/careersData";
import { inr } from "@/lib/explorer";

export interface StudentCaseStudiesProps {
  onExploreCareer?: (career: Career) => void;
}

export function StudentCaseStudies({ onExploreCareer }: StudentCaseStudiesProps) {
  return (
    <section id="case-studies" className="scroll-mt-20 py-20">
      <div className="mx-auto max-w-7xl px-5 md:px-8">
        {/* Header */}
        <div className="max-w-2xl">
          <span className="inline-flex items-center gap-1.5 rounded-full bg-[#059669]/10 px-3.5 py-1 text-xs font-bold uppercase tracking-wider text-[#059669]">
            <Sparkles className="h-3.5 w-3.5" /> Real Student Breakout Scenarios
          </span>
          <h2 className="mt-3 font-display text-3xl font-black tracking-tight text-[#0F172A] sm:text-4xl">
            How Tier-2 & Tier-3 Students Cracked High-ROI Roles Without ₹1.5L Bootcamps
          </h2>
          <p className="mt-2 text-sm text-muted-foreground sm:text-base">
            Illustrative composite playbooks from Indian graduates who bypassed weak campus placement cells using targeted proof-of-work and direct outreach.
          </p>
        </div>

        {/* 3 Scenario Cards */}
        <div className="mt-10 grid gap-6 lg:grid-cols-3">
          {STUDENT_CASE_STUDIES.map((cs) => {
            const linkedCareer = getCareer(cs.careerId);
            return (
              <article
                key={cs.id}
                className="flex flex-col justify-between rounded-3xl border border-border bg-card p-6 shadow-card transition hover:-translate-y-1"
              >
                <div>
                  {/* Student Profile Header */}
                  <div className="flex items-start justify-between gap-3">
                    <div className="flex items-center gap-3">
                      <div className="grid h-12 w-12 shrink-0 place-items-center rounded-2xl bg-[#0F172A] font-display text-base font-black text-lime">
                        {cs.avatarInitials}
                      </div>
                      <div>
                        <h3 className="font-display text-lg font-extrabold text-[#0F172A]">{cs.name}</h3>
                        <p className="text-xs font-semibold text-muted-foreground">{cs.degree}</p>
                      </div>
                    </div>
                    <span className="rounded-full bg-[#F59E0B]/15 px-2.5 py-1 text-[11px] font-bold text-[#B45309]">
                      {cs.collegeTier}
                    </span>
                  </div>

                  {/* Target Role & Outcome Banner */}
                  <div className="mt-5 rounded-2xl bg-[#0F172A] p-4 text-white">
                    <p className="text-[11px] font-bold uppercase tracking-wider text-lime">
                      Landed Role: {cs.targetRole}
                    </p>
                    <div className="mt-2 grid grid-cols-3 gap-2 border-t border-white/10 pt-2.5 text-xs">
                      <div>
                        <span className="text-slate-400">In-Hand</span>
                        <p className="font-bold text-lime">{cs.monthlyInHand}</p>
                      </div>
                      <div>
                        <span className="text-slate-400">Prep Spend</span>
                        <p className="font-bold text-white">
                          {cs.prepSpendINR === 0 ? "₹0 (Free)" : inr(cs.prepSpendINR)}
                        </p>
                      </div>
                      <div>
                        <span className="text-slate-400">Timeline</span>
                        <p className="font-bold text-white">{cs.prepMonths} Months</p>
                      </div>
                    </div>
                  </div>

                  {/* Starting Point */}
                  <div className="mt-4">
                    <p className="text-xs font-bold uppercase tracking-wider text-muted-foreground">
                      Starting Constraints
                    </p>
                    <p className="mt-1 text-xs leading-relaxed text-foreground">{cs.startingProfile}</p>
                  </div>

                  {/* Quote */}
                  <blockquote className="mt-4 rounded-2xl border border-[#059669]/25 bg-[#059669]/5 p-3.5 text-xs italic leading-relaxed text-foreground">
                    <Quote className="mb-1 h-4 w-4 text-[#059669]" />"{cs.quote}"
                  </blockquote>

                  {/* What Worked */}
                  <div className="mt-4">
                    <p className="text-xs font-bold uppercase tracking-wider text-[#059669]">
                      What Actually Worked
                    </p>
                    <ul className="mt-2 space-y-1.5">
                      {cs.whatWorked.map((item) => (
                        <li key={item} className="flex items-start gap-2 text-xs text-foreground">
                          <CheckCircle2 className="mt-0.5 h-3.5 w-3.5 shrink-0 text-[#059669]" />
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* What They Skipped */}
                  <div className="mt-4">
                    <p className="text-xs font-bold uppercase tracking-wider text-[#B45309]">
                      Traps Avoided
                    </p>
                    <ul className="mt-2 space-y-1.5">
                      {cs.whatSkipped.map((item) => (
                        <li key={item} className="flex items-start gap-2 text-xs text-muted-foreground">
                          <XCircle className="mt-0.5 h-3.5 w-3.5 shrink-0 text-[#F59E0B]" />
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                {/* Footer Action */}
                {linkedCareer && onExploreCareer && (
                  <button
                    type="button"
                    onClick={() => onExploreCareer(linkedCareer)}
                    className="mt-6 inline-flex h-11 w-full items-center justify-center gap-2 rounded-full border border-[#0F172A] bg-background text-xs font-bold text-[#0F172A] transition hover:bg-[#0F172A] hover:text-white"
                  >
                    Inspect {linkedCareer.title} Roadmap <ArrowRight className="h-3.5 w-3.5" />
                  </button>
                )}
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
