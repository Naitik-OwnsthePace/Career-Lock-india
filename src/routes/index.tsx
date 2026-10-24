import { createFileRoute, Link } from "@tanstack/react-router";
import {
  ShieldCheck,
  Asterisk,
  ClipboardCheck,
  ArrowRight,
  Compass,
  Route as RouteIcon,
  Calculator,
  Target,
  BarChart3,
  HelpCircle,
} from "lucide-react";
import hero from "@/assets/hero.jpg";
import { DiscoveryWidget } from "@/components/DiscoveryWidget";
import { FourPillars } from "@/components/FourPillars";
import { getCareer } from "@/data/careersData";
import { useAppState } from "@/lib/app-state";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "ROIPath India — Career Discovery, Placement Intelligence & Financial ROI" },
      {
        name: "description",
        content:
          "Discover 14 Indian careers you can actually break into. Compare realistic in-hand salaries, placement routes, prep costs, 60-month ROI, and honest roadmaps.",
      },
      { property: "og:title", content: "ROIPath India — Career Discovery & Placement ROI" },
      {
        property: "og:description",
        content: "Realistic in-hand salaries, placement intelligence, CTC simulator, and honest roadmaps for Indian students.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: HomePage,
});

const STATS = [
  { value: "14", label: "High-ROI Career Paths" },
  { value: "₹0", label: "Hidden CTC Hype" },
  { value: "100%", label: "Tax & PF Adjusted" },
];

const MODULES = [
  {
    to: "/explore",
    icon: Compass,
    badge: "14 Career Tracks",
    title: "Career Path Explorer",
    text: "Filter 14 Indian career paths by domain, degree eligibility, college tier, and prep budget.",
  },
  {
    to: "/roadmap",
    icon: RouteIcon,
    badge: "Live Readiness %",
    title: "Interactive Roadmap Checklist",
    text: "Check off skills and 7-stage milestones you possess to compute your live placement readiness score.",
  },
  {
    to: "/ctc-simulator",
    icon: Calculator,
    badge: "FY 2025–27 Tax Rules",
    title: "CTC Reality Check Simulator",
    text: "Deconstruct any ₹3L–₹45L CTC package into real monthly in-hand cash after PF, PT, and TDS.",
  },
  {
    to: "/roi",
    icon: Target,
    badge: "60-Month Curve",
    title: "Career ROI Calculator",
    text: "Model degree/bootcamp fees, education loans, opportunity cost, and 5-year cumulative break-even.",
  },
  {
    to: "/insights",
    icon: BarChart3,
    badge: "Tier 1 / 2 / 3 Data",
    title: "Placement Insights & Case Studies",
    text: "Compare brochure highest-package hype against true batch medians + 3 student breakout playbooks.",
  },
  {
    to: "/faq",
    icon: HelpCircle,
    badge: "8 Unfiltered Answers",
    title: "Placement & CTC FAQ",
    text: "Direct answers on ESOP illiquidity, service bonds, Tier-3 off-campus routes, and certifications vs GitHub.",
  },
] as const;

function HomePage() {
  const s = useAppState();

  return (
    <>
      <div className="bg-navy">
        <section className="relative isolate overflow-hidden">
          <img
            src={hero}
            alt="Indian graduate exploring career options on a tablet"
            width={1920}
            height={1088}
            className="absolute inset-0 -z-20 h-full w-full object-cover object-[70%_center]"
          />
          <div className="absolute inset-0 -z-10 bg-hero-fade" />
          <div className="absolute inset-0 -z-10 bg-hero-bottom" />
          <div className="mx-auto max-w-7xl px-5 pb-28 pt-16 md:px-8 md:pb-36 md:pt-24">
            <div className="max-w-2xl">
              <span className="inline-flex items-center gap-2 rounded-full glass-navy px-4 py-1.5 text-xs font-semibold text-on-navy-muted">
                <span className="h-2 w-2 rounded-full bg-mint" /> Built for Indian College Students & Freshers
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
                Explore 14 Indian career opportunities calibrated for your degree, college tier, and budget. Compare real monthly in-hand salaries, placement routes, preparation costs, and 60-month ROI.
              </p>
              <div className="mt-8 flex flex-wrap gap-3">
                <Link
                  to="/explore"
                  className="inline-flex h-12 items-center rounded-full bg-lime px-7 font-bold text-lime-foreground shadow-lime transition hover:brightness-95"
                >
                  Explore 14 Career Paths
                </Link>
                <button
                  type="button"
                  onClick={s.openDiagnostic}
                  className="inline-flex h-12 items-center gap-2 rounded-full border border-on-navy/60 px-6 font-semibold text-on-navy transition hover:bg-on-navy/10"
                >
                  <ClipboardCheck className="h-4 w-4 text-lime" /> Free Diagnostic Scorecard
                </button>
              </div>
              <div className="mt-8 flex max-w-xl items-start gap-3 rounded-2xl glass-navy p-4">
                <ShieldCheck className="mt-0.5 h-5 w-5 shrink-0 text-mint" />
                <p className="text-sm text-on-navy">
                  Decisions backed by transparent in-hand pay estimates, verified tier constraints, and{" "}
                  <span className="font-bold text-lime">zero CTC hype.</span>
                </p>
              </div>
              <dl className="mt-10 grid max-w-lg grid-cols-3 gap-6">
                {STATS.map((st) => (
                  <div key={st.label}>
                    <dt className="font-display text-2xl font-black text-on-navy">{st.value}</dt>
                    <dd className="mt-1 text-xs text-on-navy-muted">{st.label}</dd>
                  </div>
                ))}
              </dl>
            </div>
          </div>
        </section>
      </div>

      <section id="discover" className="relative mx-auto -mt-20 max-w-6xl scroll-mt-24 px-5 pb-16 md:px-8">
        <DiscoveryWidget
          onDiscoverPaths={s.setExplorerFilters}
          onViewExplorer={s.viewInExplorer}
          onSelectCareer={(id) => {
            const found = getCareer(id);
            if (found) {
              s.setRoadmapCareer(found);
              s.openCareerModal(found);
            }
          }}
        />
      </section>

      <FourPillars />

      <section className="mx-auto max-w-7xl px-5 py-20 md:px-8">
        <div className="max-w-2xl">
          <p className="text-xs font-bold uppercase tracking-widest text-[#059669]"> Dedicated Platform Sections</p>
          <h2 className="mt-2 font-display text-3xl font-black tracking-tight text-[#0F172A] sm:text-4xl">
            Open Any Module Directly
          </h2>
          <p className="mt-2 text-sm text-muted-foreground">
            Each tool runs in its own dedicated view so you can compare careers, simulate payslips, or audit college tiers without clutter.
          </p>
        </div>

        <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {MODULES.map((m) => (
            <Link
              key={m.to}
              to={m.to}
              className="group flex flex-col justify-between rounded-2xl border border-border bg-card p-6 shadow-card transition hover:-translate-y-1 hover:border-[#059669]/50"
            >
              <div>
                <div className="flex items-center justify-between gap-2">
                  <div className="grid h-11 w-11 place-items-center rounded-xl bg-navy text-lime">
                    <m.icon className="h-5 w-5" />
                  </div>
                  <span className="rounded-full bg-[#059669]/10 px-3 py-1 text-xs font-bold text-[#059669]">
                    {m.badge}
                  </span>
                </div>
                <h3 className="mt-4 font-display text-lg font-extrabold text-foreground group-hover:text-[#059669]">
                  {m.title}
                </h3>
                <p className="mt-1.5 text-sm leading-relaxed text-muted-foreground">{m.text}</p>
              </div>
              <span className="mt-5 inline-flex items-center gap-1.5 text-sm font-bold text-[#059669]">
                Open Section <ArrowRight className="h-4 w-4 transition group-hover:translate-x-1" />
              </span>
            </Link>
          ))}
        </div>
      </section>
    </>
  );
}
