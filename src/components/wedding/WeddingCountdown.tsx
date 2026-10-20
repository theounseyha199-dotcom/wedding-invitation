"use client";
import { useEffect, useState } from "react";
import { motion } from "motion/react";
import { getCountdown } from "@/lib/date";
import type { WeddingConfig } from "@/types/wedding";
import { SectionReveal } from "@/components/ui/SectionReveal";

export function WeddingCountdown({ config }: { config: WeddingConfig }) {
  const [count, setCount] = useState<ReturnType<typeof getCountdown> | null>(
    null,
  );
  useEffect(() => {
    const update = () => setCount(getCountdown(config.dateISO));
    update();
    const id = window.setInterval(update, 1000);
    return () => window.clearInterval(id);
  }, [config.dateISO]);
  const units = count
    ? ([
        [count.days, "ថ្ងៃ"],
        [count.hours, "ម៉ោង"],
        [count.minutes, "នាទី"],
        [count.seconds, "វិនាទី"],
      ] as const)
    : [];
  return (
    <section
      className="countdown-section section"
      aria-label="ពេលវេលានៅសល់រហូតដល់ថ្ងៃមង្គល"
    >
      <SectionReveal>
        <p className="eyebrow">UNTIL WE SAY “I DO”</p>
        <h2 className="section-title">រាប់ថយក្រោយដល់ថ្ងៃមង្គល</h2>
      </SectionReveal>
      {count?.complete ? (
        <p className="countdown-complete">
          ថ្ងៃដ៏ពិសេសរបស់យើងបានមកដល់ហើយ។ អរគុណដែលបានអបអរជាមួយយើង។
        </p>
      ) : (
        <SectionReveal className="countdown-grid">
          {(count
            ? units
            : ([
                ["–", "ថ្ងៃ"],
                ["–", "ម៉ោង"],
                ["–", "នាទី"],
                ["–", "វិនាទី"],
              ] as const)
          ).map(([value, label]) => (
            <div className="countdown-unit" key={label}>
              <motion.strong
                data-countdown-value
                key={String(value)}
                initial={{ opacity: 0.5, y: 5 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.25 }}
              >
                {String(value).padStart(2, "0")}
              </motion.strong>
              <span>{label}</span>
            </div>
          ))}
        </SectionReveal>
      )}
      <p className="countdown-date">
        {config.dateLabel} · {config.timezone}
      </p>
    </section>
  );
}
