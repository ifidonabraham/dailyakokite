import Image from "next/image";
import Link from "next/link";
import AkokaClock, { LagosDate } from "./AkokaClock";
import { TAGLINE } from "@/lib/site";

// Open-Meteo: free, keyless. Akoka campus coordinates.
const WEATHER_URL =
  "https://api.open-meteo.com/v1/forecast?latitude=6.5158&longitude=3.3896&current=temperature_2m,weather_code&timezone=Africa%2FLagos";

function describe(code: number) {
  if (code === 0) return "Clear";
  if (code <= 3) return "Partly cloudy";
  if (code === 45 || code === 48) return "Fog";
  if (code >= 95) return "Thunderstorm";
  if ((code >= 51 && code <= 67) || (code >= 80 && code <= 82)) return "Rain";
  return "Cloudy";
}

async function getAkokaWeather() {
  try {
    const res = await fetch(WEATHER_URL, { next: { revalidate: 1800 } });
    if (!res.ok) return null;
    const data = await res.json();
    const temp = data?.current?.temperature_2m;
    const code = data?.current?.weather_code;
    if (typeof temp !== "number") return null;
    return { temp: Math.round(temp), sky: describe(Number(code)) };
  } catch {
    return null;
  }
}

export default async function Masthead() {
  const weather = await getAkokaWeather();

  return (
    <div>
      {/* Date / campus bar */}
      <div className="border-b border-dashed border-ink/20">
        <div className="site-container flex items-center justify-between gap-3 h-9 text-[10px] font-sans font-medium uppercase tracking-[0.12em] text-ink/55">
          <span className="truncate">
            <LagosDate />
          </span>
          <span className="flex items-center gap-2 shrink-0">
            <AkokaClock />
            {weather && (
              <span className="hidden sm:inline text-ink/45">
                · {weather.temp}°C {weather.sky}
              </span>
            )}
          </span>
        </div>
      </div>

      {/* Wordmark */}
      <div className="site-container py-4 md:py-7 flex flex-col items-center text-center">
        <p className="hidden md:block font-display italic text-[15px] text-ink/60 mb-3">
          {TAGLINE}
        </p>
        <Link href="/" className="flex flex-row md:flex-col items-center gap-3 md:gap-2" aria-label="Daily Akokite home">
          <Image
            src="/da-logo.png"
            alt=""
            width={48}
            height={48}
            priority
            className="h-9 w-9 md:h-12 md:w-12"
          />
          <span className="font-display text-[1.9rem] sm:text-4xl md:text-6xl lg:text-7xl font-bold tracking-tight text-ink leading-none">
            DAILY AKOKITE
          </span>
        </Link>
        <p className="text-[9px] font-sans font-medium uppercase tracking-[0.2em] text-ink/45 mt-2 md:mt-3">
          The Press Club, University of Lagos
        </p>
      </div>
      <div className="site-container">
        <div className="border-t border-dashed border-ink/20" />
      </div>
    </div>
  );
}
