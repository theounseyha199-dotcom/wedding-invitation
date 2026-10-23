import type { ReactNode } from "react";
import { SectionReveal } from "@/components/ui/SectionReveal";

type Props = {
  children: ReactNode;
  variant?: "formal" | "minimal" | "hero";
  animated?: boolean;
  className?: string;
};

export function RoyalOrnamentalFrame({
  children,
  variant = "formal",
  animated = true,
  className = "",
}: Props) {
  const ornaments = (
    <div className="royal-frame-art" aria-hidden="true">
      <span className="royal-corner corner-tl" />
      <span className="royal-corner corner-tr" />
      <span className="royal-corner corner-bl" />
      <span className="royal-corner corner-br" />
    </div>
  );
  return (
    <div className={`royal-frame royal-frame-${variant} ${className}`}>
      {animated ? (
        <SectionReveal className="royal-frame-reveal" distance={0} duration={1}>
          {ornaments}
        </SectionReveal>
      ) : (
        ornaments
      )}
      <div className="royal-frame-content">{children}</div>
    </div>
  );
}
