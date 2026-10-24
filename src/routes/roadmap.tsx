import { createFileRoute } from "@tanstack/react-router";
import { CareerRoadmap } from "@/components/CareerRoadmap";
import { useAppState } from "@/lib/app-state";

export const Route = createFileRoute("/roadmap")({
  head: () => ({
    meta: [
      { title: "Interactive Readiness Roadmap — ROIPath India" },
      {
        name: "description",
        content: "Check off skills and 7-stage milestones to see your live placement readiness score.",
      },
    ],
  }),
  component: RoadmapPage,
});

function RoadmapPage() {
  const s = useAppState();
  return (
    <CareerRoadmap
      selectedCareer={s.roadmapCareer}
      onSelectCareer={s.setRoadmapCareer}
      onOpenDiagnostic={s.openDiagnosticFromRoadmap}
    />
  );
}
