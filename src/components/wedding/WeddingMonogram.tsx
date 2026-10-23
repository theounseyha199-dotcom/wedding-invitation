import type { WeddingConfig } from "@/types/wedding";

type Props = {
  config: WeddingConfig;
  size?: "sm" | "md" | "lg";
  variant?: "seal" | "outline" | "gold";
  className?: string;
};

export function WeddingMonogram({
  config,
  size = "md",
  variant = "outline",
  className = "",
}: Props) {
  return (
    <span
      className={`wedding-monogram monogram-${size} monogram-${variant} ${className}`}
      aria-hidden="true"
    >
      <svg
        className="monogram-flower"
        viewBox="0 0 64 24"
        fill="none"
        aria-hidden="true"
      >
        <path
          d="M32 19C23 13 26 6 32 2c6 4 9 11 0 17ZM30 19C20 20 16 15 15 10c7-1 13 1 15 9ZM34 19c10 1 14-4 15-9-7-1-13 1-15 9ZM10 18c6 0 9 2 12 4M54 18c-6 0-9 2-12 4"
          stroke="currentColor"
          strokeWidth="1.4"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
      <span className="monogram-initials">
        {config.monogram?.initials ?? config.couple.initials}
      </span>
      <span className="monogram-dots">• &nbsp; • &nbsp; •</span>
    </span>
  );
}
