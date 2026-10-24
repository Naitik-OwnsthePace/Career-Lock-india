import { useState } from "react";
import { Building2, AlertTriangle, CheckCircle2, Info, Filter } from "lucide-react";
import { PLACEMENT_COMPARISONS, type PlacementComparisonRecord } from "@/data/careersData";

type TierTab = "All" | "Tier 1" | "Tier 2" | "Tier 3";

const TIER_TABS: TierTab[] = ["All", "Tier 1", "Tier 2", "Tier 3"];

const tierPillColors: Record<PlacementComparisonRecord["tier"], string> = {
  "Tier 1": "bg-[#059669]/15 text-[#059669] border border-[#059669]/30",
  "Tier 2": "bg-[#0F172A]/10 text-[#0F172A] border border-[#0F172A]/20",
  "Tier 3": "bg-[#F59E0B]/15 text-[#B45309] border border-[#F59E0B]/30",
};

export function PlacementInsights() {
  const [selectedTier, setSelectedTier] = useState<TierTab>("All");

  const filteredRecords = PLACEMENT_COMPARISONS.filter((r) =>
    selectedTier === "All" ? true : r.tier === selectedTier
  );

  return (
    <section id="insights" className="scroll-mt-20 border-t border-border bg-muted/30 py-20">
      <div className="mx-auto max-w-7xl px-5 md:px-8">
        {/* Header */}
        <div className="flex flex-wrap items-end justify-between gap-6">
          <div className="max-w-2xl">
            <span className="inline-flex items-center gap-1.5 rounded-full bg-[#0F172A] px-3.5 py-1 text-xs font-bold uppercase tracking-wider text-lime">
              <Building2 className="h-3.5 w-3.5" /> Indian Campus Placement Intelligence
            </span>
            <h2 className="mt-3 font-display text-3xl font-black tracking-tight text-[#0F172A] sm:text-4xl">
              Brochure Hype vs. Ground Reality Across 8 College Tiers
            </h2>
            <p className="mt-2 text-sm text-muted-foreground sm:text-base">
              Colleges advertise a single international or ESOP-heavy "Highest Package" outlier and exclude unplaced students from the denominator. Compare true median packages and real batch placement rates below.
            </p>
          </div>

          {/* Filter Pills */}
          <div className="flex flex-wrap items-center gap-1.5 rounded-2xl border border-border bg-card p-1.5 shadow-2xs">
            <span className="flex items-center gap-1 px-2.5 text-xs font-bold text-muted-foreground">
              <Filter className="h-3.5 w-3.5" /> Filter:
            </span>
            {TIER_TABS.map((tab) => (
              <button
                key={tab}
                type="button"
                onClick={() => setSelectedTier(tab)}
                className={`rounded-xl px-3.5 py-1.5 text-xs font-bold transition ${
                  selectedTier === tab
                    ? "bg-[#0F172A] text-white"
                    : "text-muted-foreground hover:text-foreground"
                }`}
              >
                {tab}
              </button>
            ))}
          </div>
        </div>

        {/* Comparison Table */}
        <div className="mt-8 overflow-hidden rounded-3xl border border-border bg-card shadow-card">
          <div className="overflow-x-auto">
            <table className="w-full min-w-[920px] border-collapse text-left text-sm">
              <thead>
                <tr className="border-b border-border bg-[#0F172A] text-xs font-bold uppercase tracking-wider text-slate-300">
                  <th className="py-4 pl-6 pr-4">Institution Category & Examples</th>
                  <th className="px-4 py-4">Advertised Highest Outlier</th>
                  <th className="px-4 py-4 text-lime">Realistic Median CTC</th>
                  <th className="px-4 py-4 text-lime">Median Monthly In-Hand</th>
                  <th className="px-4 py-4">Brochure vs Real Placed %</th>
                  <th className="px-4 py-4 pr-6">Campus vs Off-Campus Split</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border">
                {filteredRecords.map((rec) => {
                  const gap = rec.brochurePlacedPercent - rec.actualEnrolledPlacedPercent;
                  return (
                    <tr key={rec.id} className="group transition hover:bg-muted/40">
                      <td className="py-4 pl-6 pr-4 align-top">
                        <div className="flex items-center gap-2">
                          <span className={`rounded-full px-2.5 py-0.5 text-[11px] font-bold ${tierPillColors[rec.tier]}`}>
                            {rec.tier}
                          </span>
                          <span className="font-display font-extrabold text-[#0F172A]">
                            {rec.institutionCategory}
                          </span>
                        </div>
                        <p className="mt-1 text-xs text-muted-foreground">{rec.examples}</p>
                        <p className="mt-2 flex items-start gap-1.5 rounded-xl bg-muted/70 p-2.5 text-xs text-foreground">
                          <Info className="mt-0.5 h-3.5 w-3.5 shrink-0 text-[#059669]" />
                          <span>{rec.realityNote}</span>
                        </p>
                      </td>

                      <td className="px-4 py-4 align-top">
                        <span className="font-bold text-muted-foreground line-through decoration-[#F59E0B] decoration-2">
                          {rec.advertisedHighestCTC}
                        </span>
                        <p className="mt-1 text-[11px] text-[#B45309]">
                          Top 0.5% outlier
                        </p>
                      </td>

                      <td className="px-4 py-4 align-top">
                        <span className="font-display text-base font-black text-[#0F172A]">
                          {rec.realisticMedianCTC}
                        </span>
                        <p className="mt-1 text-[11px] text-muted-foreground">
                          50th percentile offer
                        </p>
                      </td>

                      <td className="px-4 py-4 align-top">
                        <span className="inline-block rounded-xl bg-[#059669]/10 px-3 py-1 font-display text-sm font-black text-[#059669]">
                          {rec.medianMonthlyInHand}
                        </span>
                        <p className="mt-1 text-[11px] text-muted-foreground">
                          Post-PF & tax cash
                        </p>
                      </td>

                      <td className="px-4 py-4 align-top">
                        <div className="flex items-center gap-2">
                          <span className="text-xs font-semibold text-muted-foreground line-through">
                            {rec.brochurePlacedPercent}% claimed
                          </span>
                          <span className="rounded-md bg-[#059669]/15 px-2 py-0.5 text-xs font-extrabold text-[#059669]">
                            {rec.actualEnrolledPlacedPercent}% real
                          </span>
                        </div>
                        <div className="mt-2 h-2 w-36 overflow-hidden rounded-full bg-muted">
                          <div
                            className="h-full rounded-full bg-[#059669]"
                            style={{ width: `${rec.actualEnrolledPlacedPercent}%` }}
                          />
                        </div>
                        <p className="mt-1 text-[11px] font-semibold text-[#B45309]">
                          -{gap}% denominator gap
                        </p>
                      </td>

                      <td className="px-4 py-4 pr-6 align-top">
                        <span className="inline-block rounded-lg border border-border bg-background px-2.5 py-1 text-xs font-bold text-[#0F172A]">
                          {rec.onCampusVsOffCampusRatio}
                        </span>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>

        {/* Bottom Callout */}
        <div className="mt-6 flex flex-wrap items-center justify-between gap-4 rounded-2xl border border-[#F59E0B]/40 bg-[#F59E0B]/10 p-4 text-xs text-foreground">
          <div className="flex items-center gap-2.5">
            <AlertTriangle className="h-4 w-4 shrink-0 text-[#B45309]" />
            <span>
              <strong>Why "Median" beats "Average":</strong> One ₹1.2 Cr international offer in a batch of 200 inflates the "Average CTC" by ₹6 LPA. Always ask colleges for the NIRF-submitted <strong>Median Salary</strong>.
            </span>
          </div>
          <span className="font-bold text-[#059669]">Source: NIRF Disclosures & Verified Fresher Offer Audits</span>
        </div>
      </div>
    </section>
  );
}
