export function Butterfly() {
  return (
    <svg
      className="butterfly-svg"
      viewBox="0 0 64 58"
      fill="none"
      aria-hidden="true"
    >
      <g className="butterfly-wing butterfly-wing-left">
        <path
          d="M31 29C19 9 7 4 3 13c-3 8 5 18 18 20C7 33 5 43 12 48c7 5 16-4 19-17Z"
          fill="var(--soft-pink)"
          stroke="var(--ornament)"
          strokeWidth="1.2"
        />
        <path
          d="M26 28C18 14 10 12 8 17m16 17c-9 0-12 6-10 9"
          stroke="var(--ornament)"
          strokeWidth=".75"
          opacity=".7"
        />
        <circle cx="15" cy="22" r="2" fill="var(--dusty-mauve)" />
      </g>
      <g className="butterfly-wing butterfly-wing-right">
        <path
          d="M33 29C45 9 57 4 61 13c3 8-5 18-18 20 14 0 16 10 9 15-7 5-16-4-19-17Z"
          fill="var(--dusty-mauve)"
          stroke="var(--ornament)"
          strokeWidth="1.2"
        />
        <path
          d="M38 28c8-14 16-16 18-11M40 34c9 0 12 6 10 9"
          stroke="var(--ornament)"
          strokeWidth=".75"
          opacity=".7"
        />
        <circle cx="49" cy="22" r="2" fill="var(--soft-pink)" />
      </g>
      <path
        d="M32 26c-2-8-6-13-9-15m9 15c2-8 6-13 9-15"
        stroke="var(--ornament)"
        strokeWidth="1"
        strokeLinecap="round"
      />
      <path
        d="M32 25c-3 6-3 17 0 25 3-8 3-19 0-25Z"
        fill="var(--soft-pink)"
        stroke="var(--ornament)"
        strokeWidth="1"
      />
    </svg>
  );
}
