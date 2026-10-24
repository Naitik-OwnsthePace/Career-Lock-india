import { useState, useEffect, useMemo } from "react";
import { Calculator, AlertTriangle, IndianRupee, ShieldAlert, CheckCircle2, HelpCircle } from "lucide-react";
import { CAREERS, type Career } from "@/data/careersData";
import { inr, lpa } from "@/lib/explorer";

export interface CTCSimulatorProps {
  selectedCareer?: Career | null;
}

/**
 * Calculates annual income tax under the latest Indian New Tax Regime (FY 2025-26 / 2026-27):
 * - Standard Deduction: ₹75,000
 * - Taxable income up to ₹12,00,000: ₹0 tax (Section 87A rebate up to ₹60,000)
 * - Slabs:
 *   0 - 4L: 0%
 *   4L - 8L: 5%
 *   8L - 12L: 10%
 *   12L - 16L: 15%
 *   16L - 20L: 20%
 *   20L - 24L: 25%
 *   Above 24L: 30%
 * - Plus 4% Health & Education Cess
 */
function calculateNewRegimeAnnualTax(annualGrossTaxableIncome: number): number {
  const standardDeduction = 75000;
  const taxable = Math.max(0, annualGrossTaxableIncome - standardDeduction);

  if (taxable <= 1200000) {
    return 0;
  }

  const slabs: Array<[number, number, number]> = [
    [0, 400000, 0],
    [400000, 800000, 0.05],
    [800000, 1200000, 0.1],
    [1200000, 1600000, 0.15],
    [1600000, 2000000, 0.2],
    [2000000, 2400000, 0.25],
    [2400000, Infinity, 0.3],
  ];

  let rawTax = 0;
  for (const [min, max, rate] of slabs) {
    if (taxable > min) {
      const slabAmount = Math.min(taxable, max) - min;
      rawTax += slabAmount * rate;
    }
  }

  // Marginal relief just above ₹12,00,000
  const excessOver12L = taxable - 1200000;
  if (rawTax > excessOver12L) {
    rawTax = excessOver12L;
  }

  return Math.round(rawTax * 1.04);
}

export function CTCSimulator({ selectedCareer }: CTCSimulatorProps) {
  const [annualCTC, setAnnualCTC] = useState<number>(1000000); // Default 10 LPA
  const [fixedBasePct, setFixedBasePct] = useState<number>(74);
  const [variablePct, setVariablePct] = useState<number>(10);
  const [joiningBonus, setJoiningBonus] = useState<number>(50000);
  const [esops4Yr, setEsops4Yr] = useState<number>(100000);
  const [pfCappedAt1800, setPfCappedAt1800] = useState<boolean>(false);
  const [activePresetId, setActivePresetId] = useState<string>("custom");

  useEffect(() => {
    if (selectedCareer) {
      const midCTC = Math.round(
        (selectedCareer.salary.advertisedCTCMin + selectedCareer.salary.advertisedCTCMax) / 2 / 25000
      ) * 25000;
      const clampedCTC = Math.max(300000, Math.min(4500000, midCTC));
      const midBase = (selectedCareer.salary.realisticBaseMin + selectedCareer.salary.realisticBaseMax) / 2;
      const estBasePct = Math.max(60, Math.min(88, Math.round((midBase / clampedCTC) * 100)));

      setAnnualCTC(clampedCTC);
      setFixedBasePct(estBasePct);
      setVariablePct(Math.max(5, Math.min(20, 100 - estBasePct - 8)));
      setJoiningBonus(clampedCTC >= 1000000 ? 50000 : 0);
      setEsops4Yr(clampedCTC >= 1200000 ? 150000 : 0);
      setActivePresetId(selectedCareer.id);
    }
  }, [selectedCareer]);

  const handlePresetChange = (careerId: string) => {
    setActivePresetId(careerId);
    if (careerId === "custom") return;
    const found = CAREERS.find((c) => c.id === careerId);
    if (!found) return;
    const midCTC =
      Math.round((found.salary.advertisedCTCMin + found.salary.advertisedCTCMax) / 2 / 25000) * 25000;
    const clampedCTC = Math.max(300000, Math.min(4500000, midCTC));
    const midBase = (found.salary.realisticBaseMin + found.salary.realisticBaseMax) / 2;
    const estBasePct = Math.max(60, Math.min(88, Math.round((midBase / clampedCTC) * 100)));

    setAnnualCTC(clampedCTC);
    setFixedBasePct(estBasePct);
    setVariablePct(Math.max(5, Math.min(20, 100 - estBasePct - 8)));
    setJoiningBonus(clampedCTC >= 1000000 ? 50000 : 0);
    setEsops4Yr(clampedCTC >= 1200000 ? 150000 : 0);
  };

  const breakdown = useMemo(() => {
    const annualFixedBase = Math.round((annualCTC * fixedBasePct) / 100);
    const annualBasicSalary = Math.round(annualFixedBase * 0.5); // Standard Indian payroll: Basic = 50% of Fixed Gross
    const annualEmployerPF = pfCappedAt1800 ? 21600 : Math.round(annualBasicSalary * 0.12);
    const annualEmployeePF = pfCappedAt1800 ? 21600 : Math.round(annualBasicSalary * 0.12);
    const annualGratuity = Math.round(annualBasicSalary * 0.0481);
    const annualVariableBonus = Math.round((annualCTC * variablePct) / 100);

    const monthlyGrossFixed = Math.round(annualFixedBase / 12);
    const monthlyEmployeePF = Math.round(annualEmployeePF / 12);
    const monthlyProfTax = 200;

    // Taxable income in regular month (excluding one-time joining bonus)
    const annualTaxOnFixed = calculateNewRegimeAnnualTax(annualFixedBase);
    const monthlyTDS = Math.round(annualTaxOnFixed / 12);

    const monthlyInHand = Math.max(
      0,
      monthlyGrossFixed - monthlyEmployeePF - monthlyProfTax - monthlyTDS
    );

    const effectiveAnnualInHand = monthlyInHand * 12;
    const ctcInflationGap = Math.max(0, annualCTC - effectiveAnnualInHand);
    const inHandToCTCRatio = Math.round((effectiveAnnualInHand / annualCTC) * 100);

    return {
      annualFixedBase,
      annualBasicSalary,
      annualEmployerPF,
      annualEmployeePF,
      annualGratuity,
      annualVariableBonus,
      monthlyGrossFixed,
      monthlyEmployeePF,
      monthlyProfTax,
      monthlyTDS,
      monthlyInHand,
      effectiveAnnualInHand,
      ctcInflationGap,
      inHandToCTCRatio,
    };
  }, [annualCTC, fixedBasePct, variablePct, pfCappedAt1800]);

  return (
    <section id="ctc" className="scroll-mt-20 bg-[#0F172A] py-20 text-white">
      <div className="mx-auto max-w-7xl px-5 md:px-8">
        {/* Header */}
        <div className="flex flex-wrap items-end justify-between gap-6">
          <div className="max-w-2xl">
            <span className="inline-flex items-center gap-2 rounded-full bg-[#059669]/20 px-3.5 py-1 text-xs font-bold uppercase tracking-wider text-lime">
              <Calculator className="h-3.5 w-3.5" /> CTC Reality Check & In-Hand Simulator
            </span>
            <h2 className="mt-3 font-display text-3xl font-black tracking-tight text-white sm:text-4xl">
              Deconstruct Your <span className="text-talent">"Headline CTC"</span> into Real Monthly Cash.
            </h2>
            <p className="mt-2 text-sm text-slate-300 sm:text-base">
              Indian campus offers frequently pad CTC with 4-year unvested ESOPs, 5-year gratuity, Employer PF, and one-time bonuses. Adjust the sliders to see what actually hits your bank account on the 30th of every month.
            </p>
          </div>

          {/* Role Preset Picker */}
          <div className="w-full sm:w-72">
            <label className="block text-xs font-bold uppercase tracking-wider text-slate-400">
              Load Role CTC Preset
            </label>
            <select
              value={activePresetId}
              onChange={(e) => handlePresetChange(e.target.value)}
              className="mt-1.5 h-11 w-full rounded-xl border border-white/15 bg-white/10 px-3 text-sm font-semibold text-white outline-none focus:border-lime"
            >
              <option value="custom" className="bg-[#0F172A] text-white">
                Custom CTC Offer Breakdown
              </option>
              {CAREERS.map((c) => (
                <option key={c.id} value={c.id} className="bg-[#0F172A] text-white">
                  {c.title} ({lpa(c.salary.advertisedCTCMin)}–{lpa(c.salary.advertisedCTCMax)})
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Split Layout Calculator */}
        <div className="mt-10 grid gap-8 lg:grid-cols-12">
          {/* LEFT COLUMN: Inputs & CTC Components (7 cols) */}
          <div className="space-y-6 rounded-3xl border border-white/10 bg-white/5 p-6 backdrop-blur-md sm:p-8 lg:col-span-7">
            {/* Headline CTC Slider */}
            <div className="rounded-2xl border border-white/10 bg-[#0F172A]/70 p-5">
              <div className="flex flex-wrap items-baseline justify-between gap-2">
                <label htmlFor="ctc-slider" className="text-sm font-bold text-slate-200">
                  Annual Advertised CTC (₹3L to ₹45L)
                </label>
                <div className="flex items-center gap-2">
                  <span className="font-display text-2xl font-black text-lime">{inr(annualCTC)}</span>
                  <span className="rounded-full bg-[#059669]/25 px-2.5 py-0.5 text-xs font-bold text-lime">
                    {lpa(annualCTC)}
                  </span>
                </div>
              </div>
              <input
                id="ctc-slider"
                type="range"
                min={300000}
                max={4500000}
                step={25000}
                value={annualCTC}
                onChange={(e) => {
                  setAnnualCTC(Number(e.target.value));
                  setActivePresetId("custom");
                }}
                className="mt-4 h-2 w-full cursor-pointer appearance-none rounded-lg bg-white/20 accent-lime"
              />
              <div className="mt-2 flex justify-between text-[11px] font-medium text-slate-400">
                <span>₹3.0 LPA (Mass Recruiter)</span>
                <span>₹12.0 LPA (Mid-Tier Product)</span>
                <span>₹25.0 LPA</span>
                <span>₹45.0 LPA (Tier-1 Peak)</span>
              </div>
            </div>

            {/* Component Sliders */}
            <div className="grid gap-5 sm:grid-cols-2">
              {/* Fixed Base Pay % */}
              <div className="rounded-2xl border border-white/10 bg-white/5 p-4">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold uppercase tracking-wider text-slate-300">
                    Fixed Base Pay (%)
                  </span>
                  <span className="text-sm font-extrabold text-[#059669]">
                    {fixedBasePct}% ({inr(breakdown.annualFixedBase)}/yr)
                  </span>
                </div>
                <input
                  type="range"
                  min={50}
                  max={90}
                  step={1}
                  value={fixedBasePct}
                  onChange={(e) => setFixedBasePct(Number(e.target.value))}
                  className="mt-3 h-2 w-full cursor-pointer appearance-none rounded-lg bg-white/20 accent-[#059669]"
                />
                <p className="mt-1.5 text-[11px] text-slate-400">
                  The only component that pays your monthly rent & SIPs.
                </p>
              </div>

              {/* Variable / Performance Bonus % */}
              <div className="rounded-2xl border border-white/10 bg-white/5 p-4">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold uppercase tracking-wider text-slate-300">
                    Variable / Perf Bonus (%)
                  </span>
                  <span className="text-sm font-extrabold text-[#F59E0B]">
                    {variablePct}% ({inr(breakdown.annualVariableBonus)}/yr)
                  </span>
                </div>
                <input
                  type="range"
                  min={0}
                  max={30}
                  step={1}
                  value={variablePct}
                  onChange={(e) => setVariablePct(Number(e.target.value))}
                  className="mt-3 h-2 w-full cursor-pointer appearance-none rounded-lg bg-white/20 accent-[#F59E0B]"
                />
                <p className="mt-1.5 text-[11px] text-slate-400">
                  Paid annually/quarterly; typically pays 50–75% of target.
                </p>
              </div>

              {/* One-Time Joining Bonus */}
              <div className="rounded-2xl border border-white/10 bg-white/5 p-4">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold uppercase tracking-wider text-slate-300">
                    One-Time Joining Bonus
                  </span>
                  <span className="text-sm font-extrabold text-[#F59E0B]">{inr(joiningBonus)}</span>
                </div>
                <input
                  type="range"
                  min={0}
                  max={500000}
                  step={10000}
                  value={joiningBonus}
                  onChange={(e) => setJoiningBonus(Number(e.target.value))}
                  className="mt-3 h-2 w-full cursor-pointer appearance-none rounded-lg bg-white/20 accent-[#F59E0B]"
                />
                <p className="mt-1.5 text-[11px] text-slate-400">
                  Paid in Month 1 only; usually has a 12–24 month clawback bond.
                </p>
              </div>

              {/* Unvested ESOPs */}
              <div className="rounded-2xl border border-white/10 bg-white/5 p-4">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold uppercase tracking-wider text-slate-300">
                    ESOPs (4-Yr Vesting)
                  </span>
                  <span className="text-sm font-extrabold text-amber-400">{inr(esops4Yr)}</span>
                </div>
                <input
                  type="range"
                  min={0}
                  max={1500000}
                  step={25000}
                  value={esops4Yr}
                  onChange={(e) => setEsops4Yr(Number(e.target.value))}
                  className="mt-3 h-2 w-full cursor-pointer appearance-none rounded-lg bg-white/20 accent-[#F59E0B]"
                />
                <p className="mt-1.5 text-[11px] text-amber-300/90">
                  Flagged as ₹0 liquid fresher cash (illiquid paper until buyback/IPO).
                </p>
              </div>
            </div>

            {/* Statutory Components Row: Employer PF & Gratuity */}
            <div className="grid gap-4 rounded-2xl border border-white/10 bg-[#0F172A]/60 p-4 sm:grid-cols-2">
              <div className="flex items-start justify-between gap-3">
                <div>
                  <p className="text-xs font-bold text-white">Employer PF (12% of Basic)</p>
                  <p className="mt-0.5 text-[11px] text-slate-400">
                    Locked in EPFO retirement fund: <strong className="text-slate-200">{inr(breakdown.annualEmployerPF)}/yr</strong>
                  </p>
                </div>
                <label className="inline-flex cursor-pointer items-center gap-1.5 text-[11px] font-semibold text-lime">
                  <input
                    type="checkbox"
                    checked={pfCappedAt1800}
                    onChange={(e) => setPfCappedAt1800(e.target.checked)}
                    className="h-4 w-4 rounded accent-lime"
                  />
                  Cap ₹1,800/mo
                </label>
              </div>

              <div className="flex items-start justify-between gap-3 border-t border-white/10 pt-3 sm:border-l sm:border-t-0 sm:pl-4 sm:pt-0">
                <div>
                  <p className="text-xs font-bold text-white">Gratuity (4.81% of Basic)</p>
                  <p className="mt-0.5 text-[11px] text-slate-400">
                    Included in CTC: <strong className="text-slate-200">{inr(breakdown.annualGratuity)}/yr</strong> (Forfeited if you leave before 5 years!)
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* RIGHT COLUMN: Cash Flow Reality (5 cols) */}
          <div className="flex flex-col justify-between space-y-5 lg:col-span-5">
            {/* Highlighted Monthly In-Hand Card */}
            <div className="rounded-3xl border-2 border-[#059669] bg-gradient-to-br from-[#059669]/25 via-[#0F172A] to-[#0F172A] p-6 shadow-xl">
              <div className="flex items-center justify-between">
                <span className="rounded-full bg-[#059669] px-3 py-1 text-xs font-bold uppercase tracking-wider text-white">
                  Bank Account Reality
                </span>
                <span className="text-xs font-bold text-lime">
                  {breakdown.inHandToCTCRatio}% of Headline CTC
                </span>
              </div>

              <p className="mt-4 text-xs font-semibold uppercase tracking-wider text-slate-300">
                Estimated Monthly In-Hand Cash
              </p>
              <p className="mt-1 flex items-baseline gap-1 font-display text-4xl font-black text-white sm:text-5xl">
                {inr(breakdown.monthlyInHand)}
                <span className="text-base font-semibold text-slate-300">/ month</span>
              </p>

              <div className="mt-4 grid grid-cols-2 gap-3 border-t border-white/10 pt-4 text-xs">
                <div>
                  <p className="text-slate-400">Real Annual Cash In-Hand</p>
                  <p className="mt-0.5 font-bold text-[#059669]">{inr(breakdown.effectiveAnnualInHand)} / yr</p>
                </div>
                <div>
                  <p className="text-slate-400">Non-Liquid / Tax / Locked Gap</p>
                  <p className="mt-0.5 font-bold text-[#F59E0B]">-{inr(breakdown.ctcInflationGap)} / yr</p>
                </div>
              </div>
            </div>

            {/* Monthly Payslip Deductions Breakdown */}
            <div className="rounded-3xl border border-white/10 bg-white/5 p-6">
              <h3 className="text-sm font-extrabold uppercase tracking-wider text-slate-200">
                Monthly Payslip Deductions Breakdown
              </h3>
              <div className="mt-4 space-y-2.5 text-sm">
                <div className="flex items-center justify-between rounded-xl bg-white/5 px-3.5 py-2.5">
                  <span className="text-slate-300">Gross Monthly Fixed Pay</span>
                  <span className="font-bold text-white">{inr(breakdown.monthlyGrossFixed)}</span>
                </div>
                <div className="flex items-center justify-between rounded-xl bg-white/5 px-3.5 py-2.5">
                  <span className="text-slate-300">Employee PF Deduction (12% Basic)</span>
                  <span className="font-bold text-rose-400">-{inr(breakdown.monthlyEmployeePF)}</span>
                </div>
                <div className="flex items-center justify-between rounded-xl bg-white/5 px-3.5 py-2.5">
                  <span className="text-slate-300">Professional Tax (Standard)</span>
                  <span className="font-bold text-rose-400">-{inr(breakdown.monthlyProfTax)}</span>
                </div>
                <div className="flex items-center justify-between rounded-xl bg-white/5 px-3.5 py-2.5">
                  <span className="flex items-center gap-1.5 text-slate-300">
                    Est. Monthly TDS (New Tax Regime)
                  </span>
                  <span className="font-bold text-rose-400">
                    {breakdown.monthlyTDS === 0 ? "₹0 (Sec 87A Rebate)" : `-${inr(breakdown.monthlyTDS)}`}
                  </span>
                </div>
                <div className="flex items-center justify-between rounded-xl border border-[#059669]/40 bg-[#059669]/15 px-3.5 py-3">
                  <span className="font-bold text-white">Net Monthly Bank Credit</span>
                  <span className="font-display text-lg font-black text-lime">{inr(breakdown.monthlyInHand)}</span>
                </div>
              </div>
            </div>

            {/* Amber Callout Box: Disclosing CTC Traps */}
            <div className="rounded-3xl border border-[#F59E0B]/40 bg-[#F59E0B]/15 p-5">
              <div className="flex items-start gap-3">
                <AlertTriangle className="mt-0.5 h-5 w-5 shrink-0 text-[#F59E0B]" />
                <div>
                  <h4 className="font-display text-sm font-extrabold text-[#F59E0B]">
                    Indian Fresher CTC Traps Disclosed
                  </h4>
                  <ul className="mt-2 space-y-1.5 text-xs leading-relaxed text-slate-200">
                    <li>
                      • <strong>Joining Bonus Clawback:</strong> {inr(joiningBonus)} is paid only in Month 1 (after ~30% tax if applicable) and must be repaid in full if you resign within 12–24 months.
                    </li>
                    <li>
                      • <strong>Performance Variable ({variablePct}%):</strong> Subject to company revenue & manager rating; freshers in probation often receive pro-rated or 50% payout.
                    </li>
                    <li>
                      • <strong>ESOPs ({inr(esops4Yr)}) & Gratuity ({inr(breakdown.annualGratuity)}/yr):</strong> Unvested ESOPs cannot buy groceries, and Gratuity is legally ₹0 unless you stay 5 continuous years.
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
