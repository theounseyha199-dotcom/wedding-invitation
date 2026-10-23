import { SectionReveal } from "@/components/ui/SectionReveal";

type Props = {
  position?: "top-left" | "top-right" | "bottom-left" | "bottom-right";
  variant?: "minimal" | "romantic";
  animated?: boolean;
};

export function RomanticFloralDecoration({
  position = "top-left",
  variant = "minimal",
  animated = true,
}: Props) {
  const flower = (
    <svg viewBox="0 0 170 180" fill="none" aria-hidden="true">
      <path
        d="M3 175C44 136 74 103 119 20M45 140c-22-2-32-12-34-24 19-1 31 5 39 18M69 111c18 0 27-10 33-25-19 0-30 8-38 17M97 70C79 63 74 49 75 36c16 5 25 15 27 26"
        stroke="currentColor"
        strokeWidth="1.7"
        strokeLinecap="round"
      />
      <path
        d="M121 44c-18-7-24-20-18-37 8 7 14 15 18 27 5-12 12-20 20-25 3 16-4 29-20 35ZM121 43c-14 0-25-6-29-17 15-2 25 3 29 17Zm1 0c13-1 22-7 27-17-14-2-24 4-27 17Z"
        fill="var(--soft-pink)"
        stroke="var(--dusty-mauve)"
        strokeWidth="1.5"
      />
      <path
        d="M122 46c-7-9-7-18 0-28 7 10 7 19 0 28Z"
        fill="var(--dusty-mauve)"
        stroke="var(--ornament)"
      />
      <path
        d="M50 135c-12 3-20 1-25-6M70 109c9-4 15-10 19-18"
        stroke="var(--dusty-mauve)"
        strokeWidth="1.3"
      />
      <circle cx="93" cy="109" r="3" fill="var(--ornament)" />
      <circle cx="32" cy="154" r="2" fill="var(--ornament)" />
    </svg>
  );
  return animated ? (
    <SectionReveal
      className={`floral-decoration floral-${position} floral-${variant}`}
      distance={8}
    >
      {flower}
    </SectionReveal>
  ) : (
    <div
      className={`floral-decoration floral-${position} floral-${variant}`}
      aria-hidden="true"
    >
      {flower}
    </div>
  );
}
