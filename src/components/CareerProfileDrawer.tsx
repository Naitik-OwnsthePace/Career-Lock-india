import { CheckCircle2, Circle, Info, Calculator, Building2, Send } from "lucide-react";
import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle } from "@/components/ui/sheet";
import type { Career } from "@/data/careersData";
import { inr, lpa } from "@/lib/explorer";

function Section({ letter, title, children }: { letter: string; title: string; children: React.ReactNode }) {
  return (
    <section className="border-t border-border py-6">
      <h3 className="flex items-center gap-3 font-display text-lg font-extrabold text-foreground">
        <span className="grid h-8 w-8 shrink-0 place-items-center rounded-lg bg-navy text-sm text-lime">{letter}</span>
        {title}
      </h3>
      <div className="mt-4">{children}</div>
    </section>
  );
}

export function CareerProfileDrawer({ career, onClose }: { career: Career | undefined; onClose: () => void }) {
  return (
    <Sheet open={!!career} onOpenChange={(o) => !o && onClose()}>
      <SheetContent className="w-full overflow-y-auto bg-background p-0 sm:max-w-2xl">
        {career && (
          <>
            <SheetHeader className="bg-navy p-6 text-left md:p-8">
              <span className="w-fit rounded-full bg-lime px-3 py-1 text-xs font-bold text-lime-foreground">{career.domain}</span>
              <SheetTitle className="font-display text-2xl font-black text-on-navy md:text-3xl">{career.title}</SheetTitle>
              <SheetDescription className="text-on-navy-muted">{career.description}</SheetDescription>
              <div className="mt-2 grid grid-cols-3 gap-3">
                {[
                  ["In-hand / month", `${inr(career.salary.monthlyInHandMin)}–${inr(career.salary.monthlyInHandMax)}`],
                  ["Prep timeline", `${career.prepTimelineMonths} months`],
                  ["Entry feasibility", career.entryFeasibility],
                ].map(([k, v]) => (
                  <div key={k} className="rounded-xl glass-navy p-3">
                    <p className="text-[11px] uppercase tracking-wider text-on-navy-muted">{k}</p>
                    <p className="mt-1 text-sm font-bold text-on-navy">{v}</p>
                  </div>
                ))}
              </div>
            </SheetHeader>

            <div className="px-6 md:px-8">
              <Section letter="A" title="What freshers actually do daily">
                <ul className="space-y-2">
                  {career.dailyWork.map((d) => (
                    <li key={d} className="flex gap-2 text-sm text-muted-foreground"><span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-emerald" />{d}</li>
                  ))}
                </ul>
                <p className="mt-4 text-sm text-muted-foreground"><span className="font-semibold text-foreground">Eligible degrees:</span> {career.eligibleDegrees.join(", ")}</p>
              </Section>

              <Section letter="B" title="Essential vs nice-to-have skills">
                <div className="grid gap-4 sm:grid-cols-2">
                  <div className="rounded-xl border border-border bg-card p-4">
                    <p className="text-xs font-bold uppercase tracking-wider text-emerald">Essential</p>
                    <ul className="mt-3 space-y-2">
                      {[...career.keySkills.foundational, ...career.keySkills.technical].map((s) => (
                        <li key={s} className="flex items-center gap-2 text-sm text-foreground"><CheckCircle2 className="h-4 w-4 shrink-0 text-emerald" />{s}</li>
                      ))}
                    </ul>
                  </div>
                  <div className="rounded-xl border border-border bg-card p-4">
                    <p className="text-xs font-bold uppercase tracking-wider text-muted-foreground">Nice-to-have</p>
                    <ul className="mt-3 space-y-2">
                      {career.keySkills.optional.map((s) => (
                        <li key={s} className="flex items-center gap-2 text-sm text-muted-foreground"><Circle className="h-4 w-4 shrink-0" />{s}</li>
                      ))}
                    </ul>
                  </div>
                </div>
              </Section>

              <Section letter="C" title="Salary reality check">
                <div className="space-y-3">
                  {[
                    ["Advertised CTC", `${lpa(career.salary.advertisedCTCMin)} – ${lpa(career.salary.advertisedCTCMax)}`, "text-muted-foreground line-through decoration-warning"],
                    ["Realistic fixed base", `${lpa(career.salary.realisticBaseMin)} – ${lpa(career.salary.realisticBaseMax)}`, "text-foreground"],
                    ["Monthly in-hand", `${inr(career.salary.monthlyInHandMin)} – ${inr(career.salary.monthlyInHandMax)}`, "text-emerald"],
                  ].map(([k, v, cls]) => (
                    <div key={k} className="flex items-center justify-between gap-3 rounded-xl bg-muted px-4 py-3">
                      <span className="text-sm text-muted-foreground">{k}</span>
                      <span className={`text-right font-bold ${cls}`}>{v}</span>
                    </div>
                  ))}
                </div>
                <p className="mt-3 flex items-start gap-2 text-xs text-muted-foreground">
                  <Info className="mt-0.5 h-4 w-4 shrink-0 text-warning" />
                  <span><span className="rounded-full bg-warning/15 px-2 py-0.5 font-bold text-warning">{career.evidenceQuality}</span> In-hand excludes variable pay, joining bonus and ESOPs; assumes PF and new-regime tax.</span>
                </p>
              </Section>

              <Section letter="D" title="Entry routes">
                <div className="grid gap-4 sm:grid-cols-2">
                  <div className="rounded-xl border border-border bg-card p-4">
                    <p className="flex items-center gap-2 text-sm font-bold text-foreground"><Building2 className="h-4 w-4 text-emerald" />Campus placement</p>
                    <div className="mt-3 h-2 overflow-hidden rounded-full bg-muted"><div className="h-full rounded-full bg-emerald" style={{ width: `${career.campusProbability}%` }} /></div>
                    <p className="mt-2 text-xs text-muted-foreground">~{career.campusProbability}% of fresher hires via campus · weight: {career.hiringRoutes.campusWeight}</p>
                    <ul className="mt-3 space-y-1 text-xs text-muted-foreground">
                      <li><b className="text-foreground">Tier 1:</b> {career.tierAccessibility.tier1}</li>
                      <li><b className="text-foreground">Tier 2:</b> {career.tierAccessibility.tier2}</li>
                      <li><b className="text-foreground">Tier 3:</b> {career.tierAccessibility.tier3}</li>
                    </ul>
                  </div>
                  <div className="rounded-xl border border-border bg-card p-4">
                    <p className="flex items-center gap-2 text-sm font-bold text-foreground"><Send className="h-4 w-4 text-emerald" />Off-campus playbook</p>
                    <p className="mt-2 text-xs text-muted-foreground">Feasibility: <b className="text-foreground">{career.hiringRoutes.offCampusFeasibility}</b></p>
                    <p className="mt-2 text-xs text-muted-foreground">{career.hiringRoutes.topHiringPatterns}</p>
                    <ol className="mt-3 list-decimal space-y-1 pl-4 text-xs text-muted-foreground">
                      <li>Ship 2–3 proof-of-work projects</li>
                      <li>Ask 5 alumni for referrals weekly</li>
                      <li>Apply within 48h of a posting</li>
                    </ol>
                  </div>
                </div>
              </Section>

              <Section letter="E" title="7-stage prep sequence">
                <ol className="relative space-y-4 border-l-2 border-border pl-6">
                  {career.roadmapSteps.map((s) => (
                    <li key={s.step} className="relative">
                      <span className="absolute -left-[33px] grid h-6 w-6 place-items-center rounded-full bg-lime text-xs font-bold text-lime-foreground">{s.step}</span>
                      <div className="flex flex-wrap items-baseline gap-x-2">
                        <p className="font-bold text-foreground">{s.title}</p>
                        <span className="text-xs text-muted-foreground">{s.duration}</span>
                      </div>
                      <p className="text-sm text-muted-foreground">{s.focus}</p>
                    </li>
                  ))}
                </ol>
                <p className="mt-4 text-xs text-muted-foreground">Cost: free path {career.prepCostEstimate.freeTier} · structured {career.prepCostEstimate.structuredTier}</p>
              </Section>

              <Section letter="F" title="Next step">
                <button disabled className="mb-8 inline-flex h-12 w-full items-center justify-center gap-2 rounded-full bg-lime font-bold text-lime-foreground shadow-lime disabled:cursor-not-allowed disabled:opacity-80">
                  <Calculator className="h-4 w-4" /> Simulate CTC for this Role
                  <span className="rounded-full bg-navy px-2 py-0.5 text-[10px] text-lime">Coming soon</span>
                </button>
              </Section>
            </div>
          </>
        )}
      </SheetContent>
    </Sheet>
  );
}
