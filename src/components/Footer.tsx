import { Link } from "@tanstack/react-router";
import { GraduationCap, TrendingUp, ShieldCheck, Compass, ClipboardCheck } from "lucide-react";
import { useOptionalAppState } from "@/lib/app-state";

const MODULE_LINKS = [
  { label: "Home & Discovery Widget", to: "/" },
  { label: "14-Path Career Explorer", to: "/explore" },
  { label: "Interactive Readiness Checklist", to: "/roadmap" },
  { label: "Methodology & FAQs", to: "/faq" },
] as const;

const TOOL_LINKS = [
  { label: "CTC to In-Hand Simulator", to: "/ctc-simulator" },
  { label: "60-Month Career ROI Engine", to: "/roi" },
  { label: "Tier-1/2/3 Placement Matrix", to: "/insights" },
] as const;

export interface FooterProps {
  onOpenDiagnostic?: () => void;
}

export function Footer({ onOpenDiagnostic }: FooterProps = {}) {
  const appState = useOptionalAppState();
  const handleDiagnostic = onOpenDiagnostic ?? appState?.openDiagnostic;

  return (
    <>
      <footer className="border-t border-white/10 bg-[#0F172A] pb-24 pt-16 text-slate-300 md:pb-16">
        <div className="mx-auto max-w-7xl px-5 md:px-8">
          <div className="grid gap-10 md:grid-cols-2 lg:grid-cols-5">
            <div className="lg:col-span-2">
              <Link to="/" className="flex items-center gap-2.5 text-white">
                <span className="relative grid h-10 w-10 shrink-0 place-items-center rounded-xl bg-lime text-[#0F172A]">
                  <GraduationCap className="h-5 w-5" />
                  <TrendingUp className="absolute -right-1.5 -top-1.5 h-4 w-4 rounded-full bg-[#059669] p-0.5 text-white" />
                </span>
                <span className="font-display text-xl font-extrabold">
                  ROIPath <span className="text-lime">India</span>
                </span>
              </Link>
              <p className="mt-4 max-w-sm text-sm leading-relaxed text-slate-400">
                India's transparent career discovery, placement intelligence, and financial ROI platform for college students and freshers. Zero sponsored bootcamp rankings.
              </p>
              <div className="mt-5 inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-3.5 py-1.5 text-xs text-slate-300">
                <ShieldCheck className="h-4 w-4 text-[#059669]" />
                <span>Calibrated for FY 2025–26 / 2026–27 Indian Tax & Payroll Rules</span>
              </div>
            </div>

            <div>
              <h4 className="font-display text-xs font-extrabold uppercase tracking-wider text-white">
                Platform Modules
              </h4>
              <ul className="mt-4 space-y-2.5 text-sm">
                {MODULE_LINKS.map((l) => (
                  <li key={l.label}>
                    <Link to={l.to} className="transition hover:text-lime">
                      {l.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h4 className="font-display text-xs font-extrabold uppercase tracking-wider text-white">
                Financial Calculators
              </h4>
              <ul className="mt-4 space-y-2.5 text-sm">
                {TOOL_LINKS.map((l) => (
                  <li key={l.label}>
                    <Link to={l.to} className="transition hover:text-lime">
                      {l.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h4 className="font-display text-xs font-extrabold uppercase tracking-wider text-white">
                Personalized Audit
              </h4>
              <p className="mt-4 text-xs leading-relaxed text-slate-400">
                Get an instant scorecard showing your target role's realistic monthly take-home and top skill gaps.
              </p>
              {handleDiagnostic && (
                <button
                  type="button"
                  onClick={handleDiagnostic}
                  className="mt-4 inline-flex h-10 items-center gap-2 rounded-full bg-lime px-4 text-xs font-bold text-[#0F172A] shadow-lime transition hover:brightness-95"
                >
                  <ClipboardCheck className="h-3.5 w-3.5" /> Launch Scorecard
                </button>
              )}
            </div>
          </div>

          <div className="mt-12 border-t border-white/10 pt-8 text-xs text-slate-400">
            <p className="leading-relaxed">
              <strong className="text-slate-200">Data & Financial Disclaimer:</strong> Salary ranges, monthly take-home figures, tax deductions, and payback timelines presented on ROIPath India are conservative educational estimates compiled from public fresher compensation disclosures, NIRF median reports, and standard New Tax Regime calculations. Individual offers vary by location, company policy, and candidate performance.
            </p>
            <div className="mt-4 flex flex-wrap items-center justify-between gap-4">
              <p>© {new Date().getFullYear()} ROIPath India. Built for Indian College Students & Freshers.</p>
              <div className="flex gap-4">
                <Link to="/faq" className="hover:text-white">
                  Methodology & FAQs
                </Link>
                <Link to="/explore" className="hover:text-white">
                  Explore 14 Careers
                </Link>
              </div>
            </div>
          </div>
        </div>
      </footer>

      {/* Persistent Mobile Sticky Action Bar */}
      <div className="fixed inset-x-0 bottom-0 z-40 flex items-center gap-2 border-t border-white/15 bg-[#0F172A]/95 p-3 backdrop-blur-lg md:hidden">
        <Link
          to="/explore"
          className="inline-flex h-11 flex-1 items-center justify-center gap-1.5 rounded-full bg-lime px-4 text-xs font-extrabold text-[#0F172A] shadow-lime"
        >
          <Compass className="h-4 w-4" /> Find My Career Path
        </Link>
        {handleDiagnostic && (
          <button
            type="button"
            onClick={handleDiagnostic}
            className="inline-flex h-11 items-center justify-center gap-1.5 rounded-full border border-white/25 bg-white/10 px-4 text-xs font-bold text-white"
          >
            <ClipboardCheck className="h-4 w-4 text-lime" /> Scorecard
          </button>
        )}
      </div>
    </>
  );
}
