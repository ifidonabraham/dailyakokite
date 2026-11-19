"use client";

import { useEffect, useState } from "react";

const TZ = "Africa/Lagos";

function lagosParts(d: Date) {
  const parts = new Intl.DateTimeFormat("en-GB", {
    timeZone: TZ,
    hour: "numeric",
    minute: "numeric",
    hourCycle: "h23",
  }).formatToParts(d);
  const get = (t: string) => Number(parts.find((p) => p.type === t)?.value ?? 0);
  return { h: get("hour"), m: get("minute") };
}

// Renders nothing time-dependent until mounted, so the statically cached HTML
// never disagrees with the client (and never shows a frozen build-time clock).
function useNow() {
  const [now, setNow] = useState<Date | null>(null);
  useEffect(() => {
    setNow(new Date());
    let interval: ReturnType<typeof setInterval>;
    const timeout = setTimeout(() => {
      setNow(new Date());
      interval = setInterval(() => setNow(new Date()), 60_000);
    }, 60_000 - (Date.now() % 60_000));
    return () => {
      clearTimeout(timeout);
      clearInterval(interval);
    };
  }, []);
  return now;
}

export function LagosDate() {
  const now = useNow();
  if (!now) return <span className="invisible">Loading date</span>;
  const long = now.toLocaleDateString("en-US", {
    timeZone: TZ,
    weekday: "long",
    month: "long",
    day: "numeric",
    year: "numeric",
  });
  const short = now.toLocaleDateString("en-US", {
    timeZone: TZ,
    weekday: "short",
    month: "short",
    day: "numeric",
  });
  return (
    <>
      <span className="hidden sm:inline">{long}</span>
      <span className="sm:hidden">{short}</span>
    </>
  );
}

export default function AkokaClock() {
  const now = useNow();
  const t = now ? lagosParts(now) : null;
  const label = now
    ? now.toLocaleTimeString("en-US", { timeZone: TZ, hour: "numeric", minute: "2-digit" })
    : "--:--";

  return (
    <span className="inline-flex items-center gap-1.5">
      <svg viewBox="0 0 24 24" className="h-4 w-4 text-ink/70" aria-hidden="true">
        <circle cx="12" cy="12" r="10.5" fill="none" stroke="currentColor" strokeWidth="1.5" />
        {[0, 90, 180, 270].map((a) => (
          <line key={a} x1="12" y1="2.8" x2="12" y2="4.4" stroke="currentColor" strokeWidth="1.2" transform={`rotate(${a} 12 12)`} />
        ))}
        {t && (
          <>
            <line x1="12" y1="12" x2="12" y2="7" stroke="currentColor" strokeWidth="2" strokeLinecap="round"
              transform={`rotate(${(t.h % 12) * 30 + t.m * 0.5} 12 12)`} />
            <line x1="12" y1="12" x2="12" y2="4.8" stroke="#1e4a96" strokeWidth="1.3" strokeLinecap="round"
              transform={`rotate(${t.m * 6} 12 12)`} />
          </>
        )}
        <circle cx="12" cy="12" r="1.1" fill="currentColor" />
      </svg>
      <span>Akoka</span>
      <time className="tabular-nums inline-block min-w-[4.6em]" suppressHydrationWarning>
        {label}
      </time>
    </span>
  );
}
