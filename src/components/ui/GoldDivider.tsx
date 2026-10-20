import { KhmerOrnament } from "./KhmerOrnament";
export function GoldDivider({ className = "" }: { className?: string }) {
  return (
    <div className={`gold-divider ${className}`}>
      <KhmerOrnament />
    </div>
  );
}
