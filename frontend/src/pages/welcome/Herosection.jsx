import { useEffect } from "react";

function Herosection({ isScrollingUp, setIsScrollingUp }) {
  useEffect(() => {
    const handleScroll = () => {
      setIsScrollingUp(window.scrollY > 80);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [setIsScrollingUp]);

  return (
    <section
      data-testid="herosection-container"
      className={`relative min-h-[35vh] lg:min-h-screen overflow-hidden transition-all duration-700 flex flex-col items-center`}
    >
      <div className="absolute inset-0 bg-gradient-to-b p-0 from-black/70 via-black/30 to-black/80 z-0" />
      <div className="absolute -top-40 left-1/2 -translate-x-1/2 w-[700px] h-[700px] bg-blue-600/30 blur-[160px] rounded-full z-0" />
      <div
        className={`relative z-10 max-w-6xl mx-auto px-4 lg:px-16 pt-23 md:pt-40 pb-23 md:pb-40 text-center lg:text-left transform transition-all duration-500 ease-out will-change-transform flex flex-col gap-8 items-center lg:items-start ${
          isScrollingUp ? "opacity-30 scale-[0.98]" : "opacity-100 scale-100"
        }`}
      >
        <div
          className="inline-flex items-center gap-2 px-4 py-1
          rounded-full bg-white/10 backdrop-blur border border-white/20
          text-xs md:text-sm text-white"
        >
          🚀 Trusted by professionals worldwide
        </div>

        <div className="flex flex-col gap-5">
          <h1
            className="text-4xl sm:text-4xl md:text-5xl lg:text-[80px] xl:text-[88px]
          font-extrabold tracking-tight leading-tight"
          >
            <span className="bg-gradient-to-r from-blue-400 via-blue-500 to-cyan-400 text-transparent bg-clip-text">
              Match.
            </span>{" "}
            <span className="text-white">Connect.</span>{" "}
            <span className="bg-gradient-to-r from-cyan-400 to-blue-500 text-transparent bg-clip-text animate-pulse">
              Get Hired.
            </span>
          </h1>

          <p className="text-gray-300 text-xs sm:text-sm lg:text-xl max-w-xl lg:max-w-3xl">
            A next-gen professional networking platform where skills meet
            opportunity — connect, collaborate, and grow faster.
          </p>
        </div>

        <div className="flex flex-col sm:flex-row gap-5 text-center lg:text-left">
          <button
            className="px-6 lg:px-9 py-2 lg:py-3 rounded-xl font-semibold text-white
            bg-gradient-to-r from-blue-600 to-cyan-500
            hover:scale-105 transition-transform duration-200 shadow-2xl"
          >
            Get Started
          </button>

          <button
            className="px-6 lg:px-9 py-2 lg:py-3 rounded-xl font-semibold text-white/80
            border border-white/30 backdrop-blur-md
            hover:bg-white/10 transition-all duration-200"
          >
            Explore Network →
          </button>
        </div>
      </div>
    </section>
  );
}

export default Herosection;
