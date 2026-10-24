import { createFileRoute } from "@tanstack/react-router";
import { CTCSimulator } from "@/components/CTCSimulator";
import { useAppState } from "@/lib/app-state";

export const Route = createFileRoute("/ctc-simulator")({
  head: () => ({
    meta: [
      { title: "CTC Reality Check Simulator — ROIPath India" },
      {
        name: "description",
        content: "Convert a headline CTC into real monthly in-hand pay after PF, professional tax, and New Tax Regime TDS.",
      },
    ],
  }),
  component: CtcPage,
});

function CtcPage() {
  const s = useAppState();
  return <CTCSimulator selectedCareer={s.ctcCareer} />;
}
