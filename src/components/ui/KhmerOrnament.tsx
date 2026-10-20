export function KhmerOrnament({ className = "" }: { className?: string }) {
  return (
    <svg
      className={className}
      viewBox="0 0 220 58"
      fill="none"
      aria-hidden="true"
    >
      <path
        d="M0 29h68m84 0h68M73 29c13 0 15-15 37-24 22 9 24 24 37 24-13 0-15 15-37 24-22-9-24-24-37-24Z"
        stroke="currentColor"
        strokeWidth="1.2"
      />
      <path
        d="M110 9c-4 11-11 15-22 20 11 5 18 9 22 20 4-11 11-15 22-20-11-5-18-9-22-20Z"
        stroke="currentColor"
        strokeWidth="1.2"
      />
      <path d="M110 16v26M97 29h26" stroke="currentColor" strokeWidth="1" />
      <circle cx="110" cy="29" r="3" fill="currentColor" />
      <path
        d="M54 22c6 2 8 5 9 7-1 2-3 5-9 7m112-14c-6 2-8 5-9 7 1 2 3 5 9 7"
        stroke="currentColor"
      />
    </svg>
  );
}
