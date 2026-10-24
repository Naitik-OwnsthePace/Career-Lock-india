import { useState, useMemo } from "react";
import {
  ResponsiveContainer,
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ReferenceLine,
} from "recharts";
import { TrendingUp, Clock, Wallet, Landmark, AlertCircle, Sparkles } from "lucide-react";
import { inr } from "@/lib/explorer";

type PlacementScenario = "standard" | "delayed6m";

interface CashFlowPoint {
  month: number;
  label: string;
  standardNet: number;
  delayedNet: number;
  activeNet: number;
}

/**
 * Standard reducing-balance EMI calculation over 60 months (5 years)
 */
function calculateMonthlyEMI(principal: number, annualRatePct: number, tenureMonths = 60): number {
  if (principal <= 0) return 0;
  if (annualRatePct <= 0) return Math.round(principal / tenureMonths);
  const r = annualRatePct / 12 / 100;
  const factor = Math.pow(1 + r, tenureMonths);
  return Math.round((principal * r * factor) / (factor - 1));
}

export function CareerROICalculator() {
  // Inputs
  const [courseFee, setCourseFee] = useState<number>(250000); // ₹2.5L degree/bootcamp fee
  const [prepExpenses, setPrepExpenses] = useState<number>(18000); // ₹18k certs/materials/internet
  const [prepDurationMonths, setPrepDurationMonths] = useState<number>(6);
  const [foregoneMonthlyEarnings, setForegoneMonthlyEarnings] = useState<number>(15000); // ₹15k/mo opportunity cost
  const [loanAmount, setLoanAmount] = useState<number>(150000);
  const [loanInterestRate, setLoanInterestRate] = useState<number>(10.5); // Default 10.5%
  const [expectedMonthlyInHand, setExpectedMonthlyInHand] = useState<number>(42000);
  const [monthlyLivingExpenses, setMonthlyLivingExpenses] = useState<number>(18000);
  const [scenario, setScenario] = useState<PlacementScenario>("standard");

  const metrics = useMemo(() => {
    const loanTenureMonths = 60;
    const monthlyEMI = calculateMonthlyEMI(loanAmount, loanInterestRate, loanTenureMonths);
    const totalLoanRepayment = monthlyEMI * loanTenureMonths;
    const totalLoanInterest = Math.max(0, totalLoanRepayment - loanAmount);

    const opportunityCost = foregoneMonthlyEarnings * prepDurationMonths;
    const delayMonths = scenario === "delayed6m" ? 6 : 0;
    const delayHoldingCost = delayMonths * (monthlyLivingExpenses * 0.6 + foregoneMonthlyEarnings * 0.5);

    // Total economic & out-of-pocket investment
    const totalNetInvestment = Math.round(
      courseFee + prepExpenses + opportunityCost + totalLoanInterest + delayHoldingCost
    );

    // Monthly disposable savings once employed (with 8% annual salary appraisal factored in 5-yr curve)
    const monthlyDisposableSavings = Math.round(
      expectedMonthlyInHand - monthlyLivingExpenses - monthlyEMI
    );

    const paybackMonths =
      monthlyDisposableSavings > 0
        ? Math.ceil(totalNetInvestment / monthlyDisposableSavings) + delayMonths
        : Infinity;

    // Build 60-month cumulative cash-flow series (post-prep start of career tracking)
    const chartData: CashFlowPoint[] = [];
    const baseInvestmentStandard = courseFee + prepExpenses + opportunityCost + totalLoanInterest;
    const baseInvestmentDelayed = baseInvestmentStandard + 6 * (monthlyLivingExpenses * 0.6 + foregoneMonthlyEarnings * 0.5);

    let cumStandard = -baseInvestmentStandard;
    let cumDelayed = -baseInvestmentDelayed;

    for (let m = 0; m <= 60; m++) {
      if (m > 0) {
        // Modest 8% annual step-up in in-hand salary after every 12 months on the job
        const yearIndexStd = Math.floor((m - 1) / 12);
        const salaryStd = expectedMonthlyInHand * Math.pow(1.08, yearIndexStd);
        const netSavingsStd = salaryStd - monthlyLivingExpenses - monthlyEMI;
        cumStandard += netSavingsStd;

        if (m > 6) {
          const employedMonthDel = m - 6;
          const yearIndexDel = Math.floor((employedMonthDel - 1) / 12);
          const salaryDel = expectedMonthlyInHand * Math.pow(1.08, yearIndexDel);
          const netSavingsDel = salaryDel - monthlyLivingExpenses - monthlyEMI;
          cumDelayed += netSavingsDel;
        }
      }

      const stdVal = Math.round(cumStandard);
      const delVal = Math.round(cumDelayed);

      chartData.push({
        month: m,
        label: `M${m}`,
        standardNet: stdVal,
        delayedNet: delVal,
        activeNet: scenario === "standard" ? stdVal : delVal,
      });
    }

    const fiveYearNetPosition =
      scenario === "standard"
        ? (chartData[60]?.standardNet ?? 0)
        : (chartData[60]?.delayedNet ?? 0);

    const breakEvenPoint = chartData.find((pt) => pt.activeNet >= 0);

    return {
      monthlyEMI,
      totalLoanInterest,
      opportunityCost,
      delayHoldingCost,
      totalNetInvestment,
      monthlyDisposableSavings,
      paybackMonths,
      fiveYearNetPosition,
      breakEvenMonth: breakEvenPoint ? breakEvenPoint.month : null,
      chartData,
    };
  }, [
    courseFee,
    prepExpenses,
    prepDurationMonths,
    foregoneMonthlyEarnings,
    loanAmount,
    loanInterestRate,
    expectedMonthlyInHand,
    monthlyLivingExpenses,
    scenario,
  ]);

  const applyQuickPreset = (preset: "tier3-free" | "private-btech" | "paid-bootcamp") => {
    if (preset === "tier3-free") {
      setCourseFee(180000);
      setPrepExpenses(5000);
      setPrepDurationMonths(6);
      setForegoneMonthlyEarnings(10000);
      setLoanAmount(0);
      setLoanInterestRate(10.5);
      setExpectedMonthlyInHand(38000);
      setMonthlyLivingExpenses(15000);
    } else if (preset === "private-btech") {
      setCourseFee(1200000);
      setPrepExpenses(35000);
      setPrepDurationMonths(8);
      setForegoneMonthlyEarnings(0);
      setLoanAmount(600000);
      setLoanInterestRate(10.5);
      setExpectedMonthlyInHand(46000);
      setMonthlyLivingExpenses(20000);
    } else {
      setCourseFee(120000);
      setPrepExpenses(15000);
      setPrepDurationMonths(6);
      setForegoneMonthlyEarnings(22000);
      setLoanAmount(100000);
      setLoanInterestRate(11.5);
      setExpectedMonthlyInHand(36000);
      setMonthlyLivingExpenses(18000);
    }
  };

  return (
    <section id="roi" className="scroll-mt-20 py-20">
      <div className="mx-auto max-w-7xl px-5 md:px-8">
        {/* Header */}
        <div className="flex flex-wrap items-end justify-between gap-6">
          <div className="max-w-2xl">
            <span className="inline-flex items-center gap-1.5 rounded-full bg-[#059669]/10 px-3.5 py-1 text-xs font-bold uppercase tracking-wider text-[#059669]">
              <TrendingUp className="h-3.5 w-3.5" /> 60-Month Financial Payback Engine
            </span>
            <h2 className="mt-3 font-display text-3xl font-black tracking-tight text-[#0F172A] sm:text-4xl">
              Career & Upskilling ROI Calculator
            </h2>
            <p className="mt-2 text-sm text-muted-foreground sm:text-base">
              Before taking an education loan or paying ₹1.5L for a placement bootcamp, model your true out-of-pocket investment, opportunity cost, monthly loan EMI, and 5-year net wealth position.
            </p>
          </div>

          {/* Quick Scenario Presets */}
          <div className="flex flex-wrap items-center gap-2">
            <span className="text-xs font-bold uppercase tracking-wider text-muted-foreground">Presets:</span>
            <button
              type="button"
              onClick={() => applyQuickPreset("tier3-free")}
              className="rounded-full border border-border bg-card px-3.5 py-1.5 text-xs font-bold text-foreground transition hover:border-[#059669]"
            >
              Low-Fee College + Self Prep
            </button>
            <button
              type="button"
              onClick={() => applyQuickPreset("private-btech")}
              className="rounded-full border border-border bg-card px-3.5 py-1.5 text-xs font-bold text-foreground transition hover:border-[#059669]"
            >
              ₹12L Private BTech + ₹6L Loan
            </button>
            <button
              type="button"
              onClick={() => applyQuickPreset("paid-bootcamp")}
              className="rounded-full border border-border bg-card px-3.5 py-1.5 text-xs font-bold text-foreground transition hover:border-[#059669]"
            >
              ₹1.2L Paid Bootcamp Switch
            </button>
          </div>
        </div>

        {/* Main Grid */}
        <div className="mt-10 grid gap-8 lg:grid-cols-12">
          {/* Inputs Panel (5 cols) */}
          <div className="space-y-4 rounded-3xl border border-border bg-card p-6 shadow-card lg:col-span-5">
            <h3 className="font-display text-lg font-extrabold text-[#0F172A]">
              1. Investment, Loan & Living Inputs
            </h3>

            <div className="grid gap-4 sm:grid-cols-2">
              <label className="flex flex-col gap-1">
                <span className="text-xs font-semibold text-muted-foreground">Degree / Course Fee (₹)</span>
                <input
                  type="number"
                  min={0}
                  step={5000}
                  value={courseFee}
                  onChange={(e) => setCourseFee(Math.max(0, Number(e.target.value)))}
                  className="h-11 rounded-xl border border-border bg-background px-3 text-sm font-bold text-foreground outline-none focus:border-[#059669]"
                />
              </label>

              <label className="flex flex-col gap-1">
                <span className="text-xs font-semibold text-muted-foreground">Prep Expenses (₹)</span>
                <input
                  type="number"
                  min={0}
                  step={1000}
                  value={prepExpenses}
                  onChange={(e) => setPrepExpenses(Math.max(0, Number(e.target.value)))}
                  className="h-11 rounded-xl border border-border bg-background px-3 text-sm font-bold text-foreground outline-none focus:border-[#059669]"
                />
              </label>

              <label className="flex flex-col gap-1">
                <span className="text-xs font-semibold text-muted-foreground">Prep Duration (Months)</span>
                <input
                  type="number"
                  min={1}
                  max={48}
                  value={prepDurationMonths}
                  onChange={(e) => setPrepDurationMonths(Math.max(1, Math.min(48, Number(e.target.value))))}
                  className="h-11 rounded-xl border border-border bg-background px-3 text-sm font-bold text-foreground outline-none focus:border-[#059669]"
                />
              </label>

              <label className="flex flex-col gap-1">
                <span className="text-xs font-semibold text-muted-foreground">Foregone Earnings (₹/mo)</span>
                <input
                  type="number"
                  min={0}
                  step={1000}
                  value={foregoneMonthlyEarnings}
                  onChange={(e) => setForegoneMonthlyEarnings(Math.max(0, Number(e.target.value)))}
                  className="h-11 rounded-xl border border-border bg-background px-3 text-sm font-bold text-foreground outline-none focus:border-[#059669]"
                />
              </label>

              <label className="flex flex-col gap-1">
                <span className="text-xs font-semibold text-muted-foreground">Education Loan (₹)</span>
                <input
                  type="number"
                  min={0}
                  step={10000}
                  value={loanAmount}
                  onChange={(e) => setLoanAmount(Math.max(0, Number(e.target.value)))}
                  className="h-11 rounded-xl border border-border bg-background px-3 text-sm font-bold text-foreground outline-none focus:border-[#059669]"
                />
              </label>

              <label className="flex flex-col gap-1">
                <span className="text-xs font-semibold text-muted-foreground">Loan Interest Rate (% p.a.)</span>
                <input
                  type="number"
                  min={0}
                  max={24}
                  step={0.25}
                  value={loanInterestRate}
                  onChange={(e) => setLoanInterestRate(Math.max(0, Number(e.target.value)))}
                  className="h-11 rounded-xl border border-border bg-background px-3 text-sm font-bold text-foreground outline-none focus:border-[#059669]"
                />
              </label>

              <label className="flex flex-col gap-1">
                <span className="text-xs font-semibold text-[#059669]">Expected In-Hand Pay (₹/mo)</span>
                <input
                  type="number"
                  min={10000}
                  step={2000}
                  value={expectedMonthlyInHand}
                  onChange={(e) => setExpectedMonthlyInHand(Math.max(0, Number(e.target.value)))}
                  className="h-11 rounded-xl border-2 border-[#059669]/40 bg-[#059669]/5 px-3 text-sm font-bold text-foreground outline-none focus:border-[#059669]"
                />
              </label>

              <label className="flex flex-col gap-1">
                <span className="text-xs font-semibold text-muted-foreground">Monthly Living Cost (₹/mo)</span>
                <input
                  type="number"
                  min={0}
                  step={1000}
                  value={monthlyLivingExpenses}
                  onChange={(e) => setMonthlyLivingExpenses(Math.max(0, Number(e.target.value)))}
                  className="h-11 rounded-xl border border-border bg-background px-3 text-sm font-bold text-foreground outline-none focus:border-[#059669]"
                />
              </label>
            </div>

            {/* Loan Summary Mini Strip */}
            <div className="rounded-2xl bg-muted p-4 text-xs">
              <div className="flex items-center justify-between">
                <span className="font-semibold text-muted-foreground">5-Year Monthly Loan EMI:</span>
                <span className="font-bold text-foreground">{inr(metrics.monthlyEMI)} / month</span>
              </div>
              <div className="mt-1.5 flex items-center justify-between">
                <span className="font-semibold text-muted-foreground">Total Loan Interest Paid:</span>
                <span className="font-bold text-[#B45309]">{inr(metrics.totalLoanInterest)}</span>
              </div>
              <div className="mt-1.5 flex items-center justify-between">
                <span className="font-semibold text-muted-foreground">Foregone Opportunity Cost:</span>
                <span className="font-bold text-foreground">{inr(metrics.opportunityCost)}</span>
              </div>
            </div>
          </div>

          {/* Outputs & Recharts Visualization (7 cols) */}
          <div className="flex flex-col justify-between space-y-6 lg:col-span-7">
            {/* 4 Key Output KPI Cards */}
            <div className="grid grid-cols-2 gap-4 sm:grid-cols-4">
              <div className="rounded-2xl border border-border bg-card p-4 shadow-card">
                <p className="text-[11px] font-bold uppercase tracking-wider text-muted-foreground">
                  Total Net Investment
                </p>
                <p className="mt-1.5 font-display text-xl font-black text-[#0F172A]">
                  {inr(metrics.totalNetInvestment)}
                </p>
                <p className="mt-1 text-[11px] text-muted-foreground">
                  Fees + Prep + Loan Int + Opp Cost
                </p>
              </div>

              <div className="rounded-2xl border border-border bg-card p-4 shadow-card">
                <p className="text-[11px] font-bold uppercase tracking-wider text-muted-foreground">
                  Monthly Disposable
                </p>
                <p
                  className={`mt-1.5 font-display text-xl font-black ${
                    metrics.monthlyDisposableSavings > 0 ? "text-[#059669]" : "text-destructive"
                  }`}
                >
                  {inr(metrics.monthlyDisposableSavings)}/mo
                </p>
                <p className="mt-1 text-[11px] text-muted-foreground">
                  After Living Cost & Loan EMI
                </p>
              </div>

              <div className="rounded-2xl border border-border bg-card p-4 shadow-card">
                <p className="text-[11px] font-bold uppercase tracking-wider text-muted-foreground">
                  Realistic Payback
                </p>
                <p className="mt-1.5 font-display text-xl font-black text-[#0F172A]">
                  {metrics.paybackMonths === Infinity
                    ? "Never (Deficit)"
                    : `${metrics.paybackMonths} mos`}
                </p>
                <p className="mt-1 text-[11px] font-semibold text-[#F59E0B]">
                  {metrics.paybackMonths !== Infinity
                    ? `~${(metrics.paybackMonths / 12).toFixed(1)} years to break even`
                    : "Lower EMI or living expenses"}
                </p>
              </div>

              <div className="rounded-2xl border-2 border-[#059669] bg-[#059669]/10 p-4 shadow-card">
                <p className="text-[11px] font-bold uppercase tracking-wider text-[#059669]">
                  5-Yr Net Position
                </p>
                <p className="mt-1.5 font-display text-xl font-black text-[#0F172A]">
                  {inr(metrics.fiveYearNetPosition)}
                </p>
                <p className="mt-1 text-[11px] text-foreground">
                  Cumulative 60-mo wealth
                </p>
              </div>
            </div>

            {/* Chart Card with Scenario Toggle */}
            <div className="flex-1 rounded-3xl border border-border bg-card p-6 shadow-card">
              <div className="flex flex-wrap items-center justify-between gap-4">
                <div>
                  <h3 className="font-display text-lg font-extrabold text-[#0F172A]">
                    60-Month Cumulative Cash Flow & Break-Even Curve
                  </h3>
                  <p className="text-xs text-muted-foreground">
                    Models initial investment drawdown and monthly net savings recovery (includes 8% annual salary appraisal).
                  </p>
                </div>

                {/* Scenario Toggle */}
                <div className="inline-flex rounded-full border border-border bg-muted p-1">
                  <button
                    type="button"
                    onClick={() => setScenario("standard")}
                    className={`rounded-full px-3.5 py-1.5 text-xs font-bold transition ${
                      scenario === "standard"
                        ? "bg-[#0F172A] text-white shadow-xs"
                        : "text-muted-foreground hover:text-foreground"
                    }`}
                  >
                    Standard Placement
                  </button>
                  <button
                    type="button"
                    onClick={() => setScenario("delayed6m")}
                    className={`rounded-full px-3.5 py-1.5 text-xs font-bold transition ${
                      scenario === "delayed6m"
                        ? "bg-[#F59E0B] text-[#0F172A] shadow-xs"
                        : "text-muted-foreground hover:text-foreground"
                    }`}
                  >
                    Delayed 6 Months
                  </button>
                </div>
              </div>

              <div className="mt-6 h-72 w-full">
                <ResponsiveContainer width="100%" height="100%">
                  <AreaChart data={metrics.chartData} margin={{ top: 10, right: 16, left: 8, bottom: 0 }}>
                    <defs>
                      <linearGradient id="emeraldGrad" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="#059669" stopOpacity={0.35} />
                        <stop offset="95%" stopColor="#059669" stopOpacity={0.02} />
                      </linearGradient>
                      <linearGradient id="amberGrad" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="#F59E0B" stopOpacity={0.35} />
                        <stop offset="95%" stopColor="#F59E0B" stopOpacity={0.02} />
                      </linearGradient>
                    </defs>
                    <CartesianGrid strokeDasharray="3 3" stroke="#E2E8F0" />
                    <XAxis
                      dataKey="label"
                      tick={{ fontSize: 11, fill: "#64748B" }}
                      interval={5}
                    />
                    <YAxis
                      tick={{ fontSize: 11, fill: "#64748B" }}
                      tickFormatter={(v: number) => `${(v / 100000).toFixed(1)}L`}
                    />
                    <Tooltip
                      formatter={(value: number, name: string) => [
                        inr(value),
                        name === "standardNet" ? "Standard Placement" : "Delayed 6 Months",
                      ]}
                      labelFormatter={(label: string) => `Month ${label.replace("M", "")}`}
                      contentStyle={{
                        borderRadius: "12px",
                        borderColor: "#E2E8F0",
                        fontSize: "12px",
                        fontWeight: 600,
                      }}
                    />
                    <ReferenceLine
                      y={0}
                      stroke="#0F172A"
                      strokeWidth={2}
                      strokeDasharray="4 4"
                      label={{
                        value: "₹0 Break-Even Line",
                        position: "insideTopLeft",
                        fill: "#0F172A",
                        fontSize: 11,
                        fontWeight: 700,
                      }}
                    />
                    <Area
                      type="monotone"
                      dataKey="standardNet"
                      stroke="#059669"
                      strokeWidth={scenario === "standard" ? 3 : 1.5}
                      fill="url(#emeraldGrad)"
                    />
                    <Area
                      type="monotone"
                      dataKey="delayedNet"
                      stroke="#F59E0B"
                      strokeWidth={scenario === "delayed6m" ? 3 : 1.5}
                      fill="url(#amberGrad)"
                    />
                  </AreaChart>
                </ResponsiveContainer>
              </div>

              <div className="mt-4 flex flex-wrap items-center justify-between gap-2 border-t border-border pt-3 text-xs text-muted-foreground">
                <span>
                  {metrics.breakEvenMonth !== null ? (
                    <>
                      <strong className="text-[#059669]">Break-Even Reached at Month {metrics.breakEvenMonth}</strong> under{" "}
                      {scenario === "standard" ? "Standard Placement" : "6-Month Delayed Placement"}.
                    </>
                  ) : (
                    <strong className="text-destructive">
                      Does not break even within 60 months at current savings rate.
                    </strong>
                  )}
                </span>
                <span className="font-semibold">
                  Green = Standard Placement · Amber = 6-Month Unplaced Buffer
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
