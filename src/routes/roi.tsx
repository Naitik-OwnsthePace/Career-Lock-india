import { createFileRoute } from "@tanstack/react-router";
import { CareerROICalculator } from "@/components/CareerROICalculator";

export const Route = createFileRoute("/roi")({
  head: () => ({
    meta: [
      { title: "Career ROI Calculator — ROIPath India" },
      {
        name: "description",
        content: "Model payback period and 5-year net position for your education and upskilling spend.",
      },
    ],
  }),
  component: CareerROICalculator,
});
