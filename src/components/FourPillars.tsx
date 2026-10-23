import { Wallet, Hourglass, DoorOpen, ShieldCheck } from "lucide-react";

const PILLARS = [
  { icon: Wallet, title: "Net Liquid Starting Pay", text: "Predictable monthly cash in your account matters more than a headline CTC padded with variables and bonuses." },
  { icon: Hourglass, title: "Cost & Time to Readiness", text: "The real cost of courses, bootcamps and certifications — and how many months before you're interview-ready." },
  { icon: DoorOpen, title: "Accessibility of Entry", text: "Eligibility barriers, Tier-3 reality and how much off-campus hiring actually exists for freshers." },
  { icon: ShieldCheck, title: "Early-Career Stability & Growth", text: "Probation terms, bonds, layoff exposure and how fast people genuinely get promoted." },
];

export function FourPillars() {
  return (
    <section className="bg-navy">
      <div className="mx-auto max-w-7xl px-5 py-20 md:px-8">
        <p className="text-sm font-bold uppercase tracking-widest text-lime">Our evaluation framework</p>
        <h2 className="mt-3 max-w-2xl font-display text-3xl font-black tracking-tight text-on-navy sm:text-4xl">
          Every career is scored on <span className="text-talent">four honest pillars.</span>
        </h2>
        <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {PILLARS.map((p, i) => (
            <div key={p.title} className="rounded-2xl glass-navy p-6">
              <div className="flex items-center justify-between">
                <div className="grid h-11 w-11 place-items-center rounded-xl bg-lime text-lime-foreground"><p.icon className="h-5 w-5" /></div>
                <span className="font-display text-3xl font-black text-on-navy/15">0{i + 1}</span>
              </div>
              <h3 className="mt-5 font-display text-lg font-extrabold text-on-navy">{p.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-on-navy-muted">{p.text}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
