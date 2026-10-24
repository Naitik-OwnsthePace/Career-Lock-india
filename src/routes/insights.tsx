import { createFileRoute } from "@tanstack/react-router";
import { PlacementInsights } from "@/components/PlacementInsights";
import { StudentCaseStudies } from "@/components/StudentCaseStudies";
import { useAppState } from "@/lib/app-state";

export const Route = createFileRoute("/insights")({
  head: () => ({
    meta: [
      { title: "Placement Insights & Case Studies — ROIPath India" },
      {
        name: "description",
        content: "Median vs highest package and true placed percentages across Tier-1, Tier-2, and Tier-3 colleges.",
      },
    ],
  }),
  component: InsightsPage,
});

function InsightsPage() {
  const s = useAppState();
  return (
    <>
      <PlacementInsights />
      <StudentCaseStudies onExploreCareer={s.openCareerModal} />
    </>
  );
}
