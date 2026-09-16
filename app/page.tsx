import Navbar from "./components/navbar/Navbar";
import DarkVeil from "../app/components/DarkVeil/DarkVeil";
import HomePage from "./pages/home/home";

export default function Home() {
  return (
    <main className="relative min-h-screen bg-[var(--background)]">

      {/* Background */}
      <div className="pointer-events-none absolute inset-0 z-0 h-full w-full">
        <DarkVeil
          hueShift={0}
          noiseIntensity={0}
          scanlineIntensity={0}
          speed={0.5}
          scanlineFrequency={0}
          warpAmount={0}
        />
      </div>

      {/* Content */}
      <div className="relative z-10 min-h-screen">
        <Navbar />
        <HomePage />
      </div>

    </main>
  );
}