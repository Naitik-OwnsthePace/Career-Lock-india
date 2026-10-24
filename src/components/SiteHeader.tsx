import { useState } from "react";
import { Link } from "@tanstack/react-router";
import { GraduationCap, TrendingUp, Menu, X, ClipboardCheck } from "lucide-react";
import { useOptionalAppState } from "@/lib/app-state";

const LINKS = [
  { label: "Home", to: "/" },
  { label: "Explore Careers", to: "/explore" },
  { label: "Roadmap", to: "/roadmap" },
  { label: "CTC Simulator", to: "/ctc-simulator" },
  { label: "Career ROI", to: "/roi" },
  { label: "Placement Insights", to: "/insights" },
  { label: "FAQ", to: "/faq" },
] as const;

export interface SiteHeaderProps {
  onOpenDiagnostic?: () => void;
}

export function SiteHeader({ onOpenDiagnostic }: SiteHeaderProps = {}) {
  const [open, setOpen] = useState(false);
  const appState = useOptionalAppState();
  const handleDiagnostic = onOpenDiagnostic ?? appState?.openDiagnostic;

  return (
    <header className="sticky top-0 z-50 border-b border-on-navy/10 bg-navy/90 backdrop-blur-xl">
      <div className="mx-auto flex h-18 max-w-7xl items-center justify-between gap-4 px-5 py-4 md:px-8">
        <Link to="/" className="flex min-w-0 items-center gap-2 text-on-navy">
          <span className="relative grid h-10 w-10 shrink-0 place-items-center rounded-xl bg-lime text-lime-foreground">
            <GraduationCap className="h-5 w-5" />
            <TrendingUp className="absolute -right-1.5 -top-1.5 h-4 w-4 rounded-full bg-emerald p-0.5 text-on-navy" />
          </span>
          <span className="truncate font-display text-xl font-extrabold">
            ROIPath <span className="text-lime">India</span>
          </span>
        </Link>

        <nav className="hidden items-center gap-5 xl:flex">
          {LINKS.map((l) => (
            <Link
              key={l.to}
              to={l.to}
              activeOptions={{ exact: l.to === "/" }}
              className="border-b-2 border-transparent py-1 text-sm font-medium text-on-navy-muted transition hover:text-on-navy"
              activeProps={{ className: "border-lime font-bold text-lime" }}
            >
              {l.label}
            </Link>
          ))}
        </nav>

        <div className="hidden items-center gap-3 xl:flex">
          {handleDiagnostic && (
            <button
              type="button"
              onClick={handleDiagnostic}
              className="inline-flex h-11 items-center gap-2 rounded-full border border-on-navy/25 px-4 text-xs font-bold text-on-navy transition hover:bg-on-navy/10"
            >
              <ClipboardCheck className="h-4 w-4 text-lime" /> Free Diagnostic
            </button>
          )}
          <Link
            to="/explore"
            className="inline-flex h-11 items-center rounded-full bg-lime px-5 text-sm font-bold text-lime-foreground shadow-lime transition hover:brightness-95"
          >
            Find My Career Path
          </Link>
        </div>

        <button
          aria-label="Toggle menu"
          onClick={() => setOpen(!open)}
          className="grid h-11 w-11 place-items-center rounded-full glass-navy text-on-navy xl:hidden"
        >
          {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </button>
      </div>

      {open && (
        <div className="border-t border-on-navy/10 bg-navy px-5 pb-6 xl:hidden">
          {LINKS.map((l) => (
            <Link
              key={l.to}
              to={l.to}
              activeOptions={{ exact: l.to === "/" }}
              onClick={() => setOpen(false)}
              className="flex min-h-11 items-center border-b border-on-navy/10 text-sm text-on-navy"
              activeProps={{ className: "font-bold text-lime" }}
            >
              {l.label}
            </Link>
          ))}
          <div className="mt-4 flex flex-col gap-2">
            {handleDiagnostic && (
              <button
                type="button"
                onClick={() => {
                  setOpen(false);
                  handleDiagnostic();
                }}
                className="flex h-12 items-center justify-center gap-2 rounded-full border border-on-navy/30 font-bold text-on-navy"
              >
                <ClipboardCheck className="h-4 w-4 text-lime" /> Get Diagnostic Scorecard
              </button>
            )}
            <Link
              to="/explore"
              onClick={() => setOpen(false)}
              className="flex h-12 items-center justify-center rounded-full bg-lime font-bold text-lime-foreground"
            >
              Find My Career Path
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}
