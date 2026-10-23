export function GoldDivider({ className = "" }: { className?: string }) {
  return (
    <div className={`gold-divider ${className}`} aria-hidden="true">
      <span className="gold-divider-art" />
    </div>
  );
}
