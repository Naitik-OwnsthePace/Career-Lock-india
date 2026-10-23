import { createFileRoute } from "@tanstack/react-router";
import { ShieldCheck, Asterisk, BarChart3, Calculator, Route as RouteIcon, Target } from "lucide-react";
import hero from "@/assets/hero.jpg";
import { SiteHeader } from "@/components/SiteHeader";
import { DiscoveryWidget } from "@/components/DiscoveryWidget";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "ROIPath India — Career Discovery & Placement ROI" },
      { name: "description", content: "Discover Indian careers you can actually break into. Compare realistic salaries, placement routes, prep costs and honest roadmaps." },
      { property: "og:title", content: "ROIPath India — Career Discovery & Placement ROI" },
      { property: "og:description", content: "Realistic salaries, placement routes and honest roadmaps for Indian students." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Index,
});

const STATS = [
  { value: "40+", label: "Career paths mapped" },
  { value: "₹0", label: "Hidden CTC hype" },
  { value: "1,200+", label: "Hiring routes tracked" },
];

const FEATURES = [
  { id: "insights", icon: BarChart3, title: "Placement Insights", text: "Who actually hires from your tier, which drives matter, and what the conversion really looks like." },
  { id: "ctc", icon: Calculator, title: "CTC Calculator", text: "Break that ‘12 LPA’ into real monthly in-hand after PF, tax, variable pay and joining bonus." },
  { id: "roi", icon: Target, title: "Career ROI", text: "Weigh prep cost and time against realistic first-year earnings before you spend a rupee." },
  { id: "roadmap", icon: RouteIcon, title: "Honest Roadmaps", text: "Month-by-month plans built around your budget — free resources first, paid only when it pays off." },
];

function Index() {
  return (
    <div className="min-h-screen bg-background">
      <div className="bg-navy">
        <SiteHeader />
        <section className="relative isolate overflow-hidden">
          <img src={hero} alt="Indian graduate exploring career options on a tablet" width={1920} height={1088} className="absolute inset-0 -z-20 h-full w-full object-cover object-[70%_center]" />
          <div className="absolute inset-0 -z-10 bg-hero-fade" />
          <div className="absolute inset-0 -z-10 bg-hero-bottom" />
          <div className="mx-auto max-w-7xl px-5 pb-28 pt-20 md:px-8 md:pb-40 md:pt-28">
            <div className="max-w-2xl">
              <span className="inline-flex items-center gap-2 rounded-full glass-navy px-4 py-1.5 text-xs font-semibold text-on-navy-muted">
                <span className="h-2 w-2 rounded-full bg-mint" /> Built for Indian students & freshers
              </span>
              <h1 className="mt-6 font-display text-4xl font-black leading-[1.05] tracking-tight text-on-navy sm:text-5xl lg:text-6xl">
                Stop Guessing Your Future.{" "}
                <span className="inline-grid h-11 w-11 translate-y-1 place-items-center rounded-full bg-navy-soft align-middle text-lime sm:h-14 sm:w-14">
                  <Asterisk className="h-7 w-7 sm:h-9 sm:w-9" strokeWidth={3} />
                </span>
                <br />
                <span className="text-talent">Discover Careers</span> You Can Actually Break Into.
              </h1>
              <p className="mt-6 max-w-xl text-base leading-relaxed text-on-navy-muted sm:text-lg">
                Explore Indian career opportunities based on your degree, skills, and budget. Compare realistic salaries, placement routes, preparation costs, and honest roadmaps.
              </p>
              <div className="mt-8 flex flex-wrap gap-3">
                <a href="#discover" className="inline-flex h-12 items-center rounded-full bg-lime px-7 font-bold text-lime-foreground shadow-lime transition hover:brightness-95">Find My Career Path</a>
                <a href="#insights" className="inline-flex h-12 items-center rounded-full border border-on-navy/60 px-7 font-semibold text-on-navy transition hover:bg-on-navy/10">Learn More</a>
              </div>
              <div className="mt-8 flex max-w-xl items-start gap-3 rounded-2xl glass-navy p-4">
                <ShieldCheck className="mt-0.5 h-5 w-5 shrink-0 text-mint" />
                <p className="text-sm text-on-navy">Decisions backed by transparent estimates, verified constraints, and <span className="font-bold text-lime">zero CTC hype.</span></p>
              </div>
              <dl className="mt-10 grid max-w-lg grid-cols-3 gap-6">
                {STATS.map((s) => (
                  <div key={s.label}>
                    <dt className="font-display text-2xl font-black text-on-navy">{s.value}</dt>
                    <dd className="mt-1 text-xs text-on-navy-muted">{s.label}</dd>
                  </div>
                ))}
              </dl>
            </div>
          </div>
        </section>
      </div>

      <section id="discover" className="relative mx-auto -mt-20 max-w-6xl scroll-mt-24 px-5 md:px-8">
        <DiscoveryWidget />
      </section>

      <section className="mx-auto max-w-7xl px-5 py-24 md:px-8">
        <div className="max-w-2xl">
          <p className="text-sm font-bold uppercase tracking-widest text-emerald">What's inside</p>
          <h2 className="mt-3 font-display text-3xl font-black tracking-tight text-foreground sm:text-4xl">The full picture, not the brochure.</h2>
        </div>
        <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {FEATURES.map((f) => (
            <div key={f.id} id={f.id} className="scroll-mt-24 rounded-2xl border border-border bg-card p-6 shadow-card transition hover:-translate-y-1">
              <div className="grid h-11 w-11 place-items-center rounded-xl bg-navy text-lime"><f.icon className="h-5 w-5" /></div>
              <h3 className="mt-5 font-display text-lg font-extrabold text-foreground">{f.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{f.text}</p>
            </div>
          ))}
        </div>
      </section>

      <section id="faq" className="scroll-mt-24 bg-navy">
        <div className="mx-auto max-w-4xl px-5 py-20 md:px-8">
          <h2 className="font-display text-3xl font-black text-on-navy">Frequently asked</h2>
          <div className="mt-8 space-y-3">
            {[
              ["Are these salaries real?", "They are conservative take-home estimates for freshers, adjusted for college tier — not headline CTC."],
              ["I'm not from a CS background. Can I still get into tech?", "Yes. Roles like QA, Data Analyst and UI/UX regularly hire BCom, BSc, BA and BBA graduates."],
              ["Do I need paid courses?", "Not usually. Low-budget profiles are steered toward paths learnable with free resources."],
            ].map(([q, a]) => (
              <details key={q} className="group rounded-2xl glass-navy p-5">
                <summary className="cursor-pointer list-none font-semibold text-on-navy">{q}</summary>
                <p className="mt-3 text-sm text-on-navy-muted">{a}</p>
              </details>
            ))}
          </div>
          <p className="mt-16 text-center text-xs text-on-navy-muted">© 2026 ROIPath India. Transparent estimates, not guarantees.</p>
        </div>
      </section>
    </div>
  );
}
