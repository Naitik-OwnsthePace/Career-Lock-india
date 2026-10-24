import { createFileRoute } from "@tanstack/react-router";
import { FAQSection } from "@/components/FAQSection";

export const Route = createFileRoute("/faq")({
  head: () => ({
    meta: [
      { title: "Unfiltered Placement & CTC FAQ — ROIPath India" },
      {
        name: "description",
        content: "Straight answers on CTC traps, Tier-3 off-campus roadmaps, and certifications vs GitHub.",
      },
    ],
  }),
  component: FAQSection,
});
