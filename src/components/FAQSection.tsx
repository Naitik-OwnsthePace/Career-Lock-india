import { useState } from "react";
import { ChevronDown, HelpCircle, Sparkles } from "lucide-react";
import { FAQ_ITEMS, type FAQItem } from "@/data/careersData";

const CATEGORIES: Array<"All" | FAQItem["category"]> = [
  "All",
  "CTC & Taxes",
  "Tier-3 & Off-Campus",
  "Skills & Proof of Work",
  "Data Methodology",
];

export function FAQSection() {
  const [activeCategory, setActiveCategory] = useState<"All" | FAQItem["category"]>("All");
  const [openId, setOpenId] = useState<string | null>(FAQ_ITEMS[0]?.id ?? null);

  const visibleItems = FAQ_ITEMS.filter((item) =>
    activeCategory === "All" ? true : item.category === activeCategory
  );

  return (
    <section id="faq" className="scroll-mt-20 bg-[#0F172A] py-20 text-white">
      <div className="mx-auto max-w-5xl px-5 md:px-8">
        {/* Header */}
        <div className="text-center">
          <span className="inline-flex items-center gap-1.5 rounded-full bg-[#059669]/20 px-3.5 py-1 text-xs font-bold uppercase tracking-wider text-lime">
            <HelpCircle className="h-3.5 w-3.5" /> Unfiltered Placement & Financial FAQs
          </span>
          <h2 className="mt-3 font-display text-3xl font-black tracking-tight text-white sm:text-4xl">
            Hard Questions Your Placement Cell Won't Answer
          </h2>
          <p className="mx-auto mt-2 max-w-2xl text-sm text-slate-300 sm:text-base">
            Direct, numbers-first answers on Indian CTC traps, ESOP illiquidity, Tier-3 off-campus strategies, and bootcamp certificates vs GitHub repositories.
          </p>
        </div>

        {/* Category Filter Pills */}
        <div className="mt-8 flex flex-wrap justify-center gap-2">
          {CATEGORIES.map((cat) => (
            <button
              key={cat}
              type="button"
              onClick={() => setActiveCategory(cat)}
              className={`rounded-full px-4 py-2 text-xs font-bold transition ${
                activeCategory === cat
                  ? "bg-lime text-[#0F172A] shadow-lime"
                  : "bg-white/10 text-slate-300 hover:bg-white/15 hover:text-white"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Accordion List */}
        <div className="mt-8 space-y-3">
          {visibleItems.map((item) => {
            const isOpen = openId === item.id;
            return (
              <div
                key={item.id}
                className={`rounded-2xl border transition ${
                  isOpen
                    ? "border-lime/50 bg-white/10"
                    : "border-white/10 bg-white/5 hover:border-white/20"
                }`}
              >
                <button
                  type="button"
                  onClick={() => setOpenId(isOpen ? null : item.id)}
                  aria-expanded={isOpen}
                  className="flex w-full items-center justify-between gap-4 px-6 py-5 text-left"
                >
                  <div>
                    <span className="rounded-md bg-[#059669]/30 px-2.5 py-0.5 text-[11px] font-bold text-lime">
                      {item.category}
                    </span>
                    <h3 className="mt-2 font-display text-base font-extrabold text-white sm:text-lg">
                      {item.question}
                    </h3>
                  </div>
                  <ChevronDown
                    className={`h-5 w-5 shrink-0 text-lime transition-transform duration-200 ${
                      isOpen ? "rotate-180" : ""
                    }`}
                  />
                </button>

                {isOpen && (
                  <div className="border-t border-white/10 px-6 pb-6 pt-4">
                    <p className="text-sm leading-relaxed text-slate-200">{item.answer}</p>
                    {item.highlightMetric && (
                      <div className="mt-4 flex items-center gap-2 rounded-xl border border-[#F59E0B]/40 bg-[#F59E0B]/15 px-4 py-2.5 text-xs font-bold text-[#F59E0B]">
                        <Sparkles className="h-4 w-4 shrink-0" />
                        <span>{item.highlightMetric}</span>
                      </div>
                    )}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
