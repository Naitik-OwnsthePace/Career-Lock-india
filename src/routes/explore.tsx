import { createFileRoute } from "@tanstack/react-router";
import { CareerExplorer } from "@/components/CareerExplorer";
import { useAppState } from "@/lib/app-state";

export const Route = createFileRoute("/explore")({
  head: () => ({
    meta: [
      { title: "Career Explorer — ROIPath India" },
      {
        name: "description",
        content: "Filter 14 Indian career paths by domain, degree eligibility, college tier, and prep budget.",
      },
    ],
  }),
  component: ExplorePage,
});

function ExplorePage() {
  const s = useAppState();
  return (
    <CareerExplorer
      externalFilters={s.explorerFilters}
      onExploreCareer={s.openCareerModal}
      onSelectForRoadmap={s.loadRoadmap}
    />
  );
}
