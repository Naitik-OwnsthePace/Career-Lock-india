import { Toaster } from "sonner";
import { CareerDetailModal } from "@/components/CareerDetailModal";
import { DiagnosticModal } from "@/components/DiagnosticModal";
import { useAppState } from "@/lib/app-state";

export function GlobalOverlays() {
  const s = useAppState();
  return (
    <>
      <Toaster position="top-right" richColors closeButton />
      <CareerDetailModal
        career={s.modalCareer}
        onClose={s.closeCareerModal}
        onSimulateCTC={s.simulateCTC}
        onSelectForRoadmap={s.loadRoadmap}
      />
      <DiagnosticModal
        open={s.diagnosticOpen}
        onClose={s.closeDiagnostic}
        initialCareer={s.diagnosticCareer}
        checkedItems={s.diagnosticCheckedItems}
        initialReadinessScore={s.diagnosticScore}
      />
    </>
  );
}
