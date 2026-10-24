import { useState } from "react";
import { Toaster } from "sonner";
import { ShieldCheck, Asterisk, ClipboardCheck } from "lucide-react";
import hero from "@/assets/hero.jpg";
import { CAREERS, getCareer, type Career } from "@/data/careersData";
import type { ExplorerSearch } from "@/lib/explorer";
import { SiteHeader } from "@/components/SiteHeader";
import { DiscoveryWidget } from "@/components/DiscoveryWidget";
import { FourPillars } from "@/components/FourPillars";
import { CareerExplorer } from "@/components/CareerExplorer";
import { CareerDetailModal } from "@/components/CareerDetailModal";
import { CareerRoadmap } from "@/components/CareerRoadmap";
import { CTCSimulator } from "@/components/CTCSimulator";
import { CareerROICalculator } from "@/components/CareerROICalculator";
import { PlacementInsights } from "@/components/PlacementInsights";
import { StudentCaseStudies } from "@/components/StudentCaseStudies";
import { FAQSection } from "@/components/FAQSection";
import { Footer } from "@/components/Footer";
import { DiagnosticModal } from "@/components/DiagnosticModal";

const STATS = [
  { value: "14", label: "High-ROI Career Paths" },
  { value: "₹0", label: "Hidden CTC Hype" },
  { value: "100%", label: "Tax & PF Adjusted" },
];

export function App() {
  const [explorerFilters, setExplorerFilters] = useState<ExplorerSearch | null>(null);
  const [modalCareer, setModalCareer] = useState<Career | null>(null);
  const [roadmapCareer, setRoadmapCareer] = useState<Career | null>(CAREERS[0] ?? null);
  const [ctcCareer, setCtcCareer] = useState<Career | null>(null);

  const [diagnosticOpen, setDiagnosticOpen] = useState<boolean>(false);
  const [diagnosticCareer, setDiagnosticCareer] = useState<Career | null>(CAREERS[0] ?? null);
  const [diagnosticCheckedItems, setDiagnosticCheckedItems] = useState<string[]>([]);
  const [diagnosticScore, setDiagnosticScore] = useState<number>(42);

  const handleDiscoverPaths = (filters: ExplorerSearch) => {
    setExplorerFilters({ ...filters });
    setTimeout(() => {
      document.getElementById("explorer")?.scrollIntoView({ behavior: "smooth", block: "start" });
    }, 150);
  };

  const handleSelectCareerFromWidget = (careerId: string) => {
    const found = getCareer(careerId);
    if (found) {
      setModalCareer(found);
      setRoadmapCareer(found);
    }
  };

  const handleOpenDiagnosticGlobal = () => {
    setDiagnosticCareer(roadmapCareer ?? CAREERS[0] ?? null);
    setDiagnosticOpen(true);
  };

  const handleOpenDiagnosticFromRoadmap = (
    career: Career,
    checkedItems: string[],
    readinessScore: number
  ) => {
    setDiagnosticCareer(career);
    setDiagnosticCheckedItems(checkedItems);
    setDiagnosticScore(readinessScore);
    setDiagnosticOpen(true);
  };

  return (
    <div className="min-h-screen bg-background text-foreground">
      <Toaster position="top-right" richColors closeButton />
      <div className="bg-navy">
        <SiteHeader onOpenDiagnostic={handleOpenDiagnosticGlobal} />
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
                <a
                  href="#discover"
                  className="inline-flex h-12 items-center rounded-full bg-lime px-7 font-bold text-lime-foreground shadow-lime transition hover:brightness-95"
                >
                  Find My Career Path
                </a>
                <button
                  type="button"
                  onClick={handleOpenDiagnosticGlobal}
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

      <section id="discover" className="relative mx-auto -mt-20 max-w-6xl scroll-mt-24 px-5 pb-16 md:px-8">
        <DiscoveryWidget
          onDiscoverPaths={handleDiscoverPaths}
          onSelectCareer={handleSelectCareerFromWidget}
        />
      </section>

      <FourPillars />
      <CareerExplorer
        externalFilters={explorerFilters}
        onExploreCareer={(career) => setModalCareer(career)}
        onSelectForRoadmap={(career) => setRoadmapCareer(career)}
      />
      <CareerDetailModal
        career={modalCareer}
        onClose={() => setModalCareer(null)}
        onSimulateCTC={(career) => setCtcCareer(career)}
        onSelectForRoadmap={(career) => setRoadmapCareer(career)}
      />
      <CareerRoadmap
        selectedCareer={roadmapCareer}
        onSelectCareer={(career) => setRoadmapCareer(career)}
        onOpenDiagnostic={handleOpenDiagnosticFromRoadmap}
      />
      <CTCSimulator selectedCareer={ctcCareer} />
      <CareerROICalculator />
      <PlacementInsights />
      <StudentCaseStudies onExploreCareer={(career) => setModalCareer(career)} />
      <FAQSection />
      <Footer onOpenDiagnostic={handleOpenDiagnosticGlobal} />
      <DiagnosticModal
        open={diagnosticOpen}
        onClose={() => setDiagnosticOpen(false)}
        initialCareer={diagnosticCareer}
        checkedItems={diagnosticCheckedItems}
        initialReadinessScore={diagnosticScore}
      />
    </div>
  );
}

export default App;
