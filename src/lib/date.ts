export function getCountdown(targetISO: string, now = Date.now()) {
  const remaining = Math.max(0, new Date(targetISO).getTime() - now);
  return {
    complete: remaining === 0,
    days: Math.floor(remaining / 86_400_000),
    hours: Math.floor((remaining / 3_600_000) % 24),
    minutes: Math.floor((remaining / 60_000) % 60),
    seconds: Math.floor((remaining / 1_000) % 60),
  };
}
