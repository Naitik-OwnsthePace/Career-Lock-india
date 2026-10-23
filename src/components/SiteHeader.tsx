import { useState } from "react";
import { GraduationCap, TrendingUp, Menu, X } from "lucide-react";

const LINKS = [
  { label: "Explore Careers", href: "#discover" },
  { label: "Placement Insights", href: "#insights" },
  { label: "CTC Calculator", href: "#ctc" },
  { label: "Career ROI", href: "#roi" },
  { label: "Roadmap", href: "#roadmap" },
  { label: "FAQ", href: "#faq" },
];

export function SiteHeader() {
  const [open, setOpen] = useState(false);
  return (
    <header className="sticky top-0 z-50 border-b border-on-navy/10 bg-navy/80 backdrop-blur-xl">
      <div className="mx-auto flex h-18 max-w-7xl items-center justify-between gap-4 px-5 py-4 md:px-8">
        <a href="#" className="flex min-w-0 items-center gap-2 text-on-navy">
          <span className="relative grid h-10 w-10 shrink-0 place-items-center rounded-xl bg-lime text-lime-foreground">
            <GraduationCap className="h-5 w-5" />
            <TrendingUp className="absolute -right-1.5 -top-1.5 h-4 w-4 rounded-full bg-emerald p-0.5 text-on-navy" />
          </span>
          <span className="truncate font-display text-xl font-extrabold">ROIPath <span className="text-lime">India</span></span>
        </a>
        <nav className="hidden items-center gap-6 lg:flex">
          {LINKS.map((l) => (
            <a key={l.label} href={l.href} className="text-sm text-on-navy-muted transition hover:text-on-navy">{l.label}</a>
          ))}
        </nav>
        <a href="#discover" className="hidden h-11 items-center rounded-full bg-lime px-5 text-sm font-bold text-lime-foreground shadow-lime transition hover:brightness-95 lg:inline-flex">
          Find My Career Path
        </a>
        <button aria-label="Open menu" onClick={() => setOpen(!open)} className="grid h-11 w-11 place-items-center rounded-full glass-navy text-on-navy lg:hidden">
          {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </button>
      </div>
      {open && (
        <div className="border-t border-on-navy/10 bg-navy px-5 pb-6 lg:hidden">
          {LINKS.map((l) => (
            <a key={l.label} href={l.href} onClick={() => setOpen(false)} className="flex min-h-11 items-center border-b border-on-navy/10 text-on-navy">{l.label}</a>
          ))}
          <a href="#discover" onClick={() => setOpen(false)} className="mt-4 flex h-12 items-center justify-center rounded-full bg-lime font-bold text-lime-foreground">Find My Career Path</a>
        </div>
      )}
    </header>
  );
}
