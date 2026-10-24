import { Wallet, Hourglass, DoorOpen, ShieldCheck } from "lucide-react";

const PILLARS = [
  {
    icon: Wallet,
    badge: "Pillar 01 · Cash Flow",
    title: "Net Liquid Starting Pay",
    text: "Predictable monthly in-hand cash deposited in your bank account — stripped of 4-year ESOP cliffs, retention clawbacks, and inflated CTC hype.",
    metric: "Bank Credit > Headline CTC",
  },
  {
    icon: Hourglass,
    badge: "Pillar 02 · Capital Efficiency",
    title: "Cost & Time to Readiness",
    text: "The real rupee expense of courses, vendor exams, and laptops — plus the months of opportunity cost before you are genuinely interview-ready.",
    metric: "Free-First Prep Roadmaps",
  },
  {
    icon: DoorOpen,
    badge: "Pillar 03 · Entry Reality",
    title: "Accessibility of Entry Opportunities",
    text: "Honest degree eligibility hurdles, Tier-2/Tier-3 campus placement odds, and how much off-campus proof-of-work hiring actually exists.",
    metric: "Tier-1 / 2 / 3 Calibrated",
  },
  {
    icon: ShieldCheck,
    badge: "Pillar 04 · Career Durability",
    title: "Early-Career Stability & Growth",
    text: "Probation terms, service bond traps, AI-automation resilience, and realistic 3-year skill compounding across Indian industries.",
    metric: "3-Year Compounding Score",
  },
];

export function FourPillars() {
  return (
    <section id="pillars" className="scroll-mt-20 bg-navy">
      <div className="mx-auto max-w-7xl px-5 py-20 md:px-8">
        <div className="flex flex-wrap items-end justify-between gap-6">
          <div className="max-w-2xl">
            <p className="text-sm font-bold uppercase tracking-widest text-lime">Our 4-Pillar Evaluation Framework</p>
            <h2 className="mt-3 font-display text-3xl font-black tracking-tight text-on-navy sm:text-4xl">
              Every career is audited on <span className="text-talent">four non-negotiable pillars.</span>
            </h2>
          </div>
          <p className="max-w-md text-sm text-on-navy-muted">
            We ignore sponsored placement brochures and evaluate fresher roles strictly on financial return, entry probability, and downside risk.
          </p>
        </div>

        <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {PILLARS.map((p, i) => (
            <div key={p.title} className="flex flex-col justify-between rounded-2xl glass-navy p-6 transition hover:-translate-y-1">
              <div>
                <div className="flex items-center justify-between">
                  <div className="grid h-11 w-11 place-items-center rounded-xl bg-lime text-lime-foreground">
                    <p.icon className="h-5 w-5" />
                  </div>
                  <span className="font-display text-3xl font-black text-on-navy/15">0{i + 1}</span>
                </div>
                <span className="mt-4 inline-block rounded-full bg-on-navy/10 px-2.5 py-0.5 text-[11px] font-semibold text-lime">
                  {p.badge}
                </span>
                <h3 className="mt-3 font-display text-lg font-extrabold text-on-navy">{p.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-on-navy-muted">{p.text}</p>
              </div>
              <div className="mt-5 border-t border-on-navy/10 pt-3">
                <span className="text-xs font-bold text-mint">{p.metric}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
