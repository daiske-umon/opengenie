export function PageIllustration({
  variant,
  className = "",
}: {
  variant: "landing" | "ideas" | "projects" | "about";
  className?: string;
}) {
  const common = "pointer-events-none absolute select-none";

  if (variant === "landing") {
    return (
      <>
        <svg
          aria-hidden="true"
          viewBox="0 0 1200 860"
          className={`${common} ${className}`}
          fill="none"
        >
          <g className="illustration-base illustration-landing-base">
            <path d="M80 130H320V270H560V160H820V390H1110" />
            <path d="M120 560H290V390H470V690H690V510H1010" />
            <path d="M180 760V610H390V430H620V300H940V130" />
            <path d="M430 90V220H220V470H720V650H1110" />
            <circle cx="320" cy="270" r="11" />
            <circle cx="560" cy="160" r="11" />
            <circle cx="820" cy="390" r="11" />
            <circle cx="470" cy="690" r="11" />
            <circle cx="690" cy="510" r="11" />
            <circle cx="390" cy="430" r="11" />
          </g>
          <g className="illustration-glow illustration-landing-glow">
            <path d="M80 130H320V270H560V160H820V390H1110" />
            <path d="M120 560H290V390H470V690H690V510H1010" />
            <path d="M180 760V610H390V430H620V300H940V130" />
            <path d="M430 90V220H220V470H720V650H1110" />
          </g>
          <g className="illustration-node illustration-landing-node">
            <circle cx="320" cy="270" r="11" />
            <circle cx="560" cy="160" r="11" />
            <circle cx="820" cy="390" r="11" />
            <circle cx="470" cy="690" r="11" />
            <circle cx="690" cy="510" r="11" />
            <circle cx="390" cy="430" r="11" />
          </g>
        </svg>
        <style jsx>{illustrationStyles}</style>
      </>
    );
  }

  if (variant === "ideas") {
    return (
      <>
        <svg
          aria-hidden="true"
          viewBox="0 0 420 420"
          className={`${common} ${className}`}
          fill="none"
        >
          <g className="illustration-base illustration-ideas-base">
            <path d="M210 58c-52 0-94 42-94 94 0 34 16 57 36 78 13 16 22 28 25 48h66c3-20 12-32 25-48 20-21 36-44 36-78 0-52-42-94-94-94Z" />
            <path d="M166 302h88M175 330h70M184 358h52" />
            <path d="M210 26v22M314 74l-17 17M356 182h-24M106 74l17 17M64 182h24" />
          </g>
          <g className="illustration-glow illustration-ideas-glow">
            <path d="M210 58c-52 0-94 42-94 94 0 34 16 57 36 78 13 16 22 28 25 48h66c3-20 12-32 25-48 20-21 36-44 36-78 0-52-42-94-94-94Z" />
            <path d="M166 302h88M175 330h70M184 358h52" />
            <path d="M210 26v22M314 74l-17 17M356 182h-24M106 74l17 17M64 182h24" />
          </g>
        </svg>
        <style jsx>{illustrationStyles}</style>
      </>
    );
  }

  if (variant === "projects") {
    return (
      <>
        <svg
          aria-hidden="true"
          viewBox="0 0 460 460"
          className={`${common} ${className}`}
          fill="none"
        >
          <g className="illustration-projects-wrap">
            <g className="illustration-base illustration-projects-base">
              <path d="M244 66 310 132 272 170 336 234 252 320 186 254 148 292 82 226Z" />
              <path d="M252 320c12 46 36 74 76 90-50 6-94-8-128-42" />
              <path d="M52 380h112M68 412h150M324 384l34 34 52-52" />
              <path d="M74 128 28 174l46 46M386 132l46 46-46 46" />
            </g>
            <g className="illustration-glow illustration-projects-glow">
              <path d="M244 66 310 132 272 170 336 234 252 320 186 254 148 292 82 226Z" />
              <path d="M252 320c12 46 36 74 76 90-50 6-94-8-128-42" />
            </g>
          </g>
        </svg>
        <style jsx>{illustrationStyles}</style>
      </>
    );
  }

  return (
    <>
      <svg
        aria-hidden="true"
        viewBox="0 0 520 360"
        className={`${common} ${className}`}
        fill="none"
      >
        <g className="illustration-base illustration-about-base">
          <circle cx="74" cy="82" r="22" />
          <circle cx="220" cy="58" r="22" />
          <circle cx="400" cy="94" r="22" />
          <circle cx="146" cy="274" r="22" />
          <circle cx="334" cy="286" r="22" />
          <path d="M96 80h102M242 64l136 22M88 102l46 150M168 264l144 10M208 70l-46 172" />
        </g>
        <g className="illustration-glow illustration-about-glow">
          <path d="M96 80h102M242 64l136 22M88 102l46 150M168 264l144 10M208 70l-46 172" />
        </g>
        <g className="illustration-node illustration-about-node">
          <circle cx="74" cy="82" r="22" style={{ animationDelay: "0s" }} />
          <circle cx="220" cy="58" r="22" style={{ animationDelay: "0.45s" }} />
          <circle cx="400" cy="94" r="22" style={{ animationDelay: "0.9s" }} />
          <circle cx="146" cy="274" r="22" style={{ animationDelay: "1.35s" }} />
          <circle cx="334" cy="286" r="22" style={{ animationDelay: "1.8s" }} />
        </g>
      </svg>
      <style jsx>{illustrationStyles}</style>
    </>
  );
}

const illustrationStyles = `
  .illustration-base,
  .illustration-glow,
  .illustration-node {
    fill: none;
    stroke-linecap: round;
    stroke-linejoin: round;
  }

  .illustration-base {
    stroke: rgba(255, 255, 255, 0.12);
    stroke-width: 2;
  }

  .illustration-glow {
    stroke: rgba(251, 191, 36, 0.12);
    stroke-width: 3;
    filter: drop-shadow(0 0 10px rgba(251, 191, 36, 0.18));
  }

  .illustration-node {
    stroke: rgba(251, 191, 36, 0.1);
    stroke-width: 3;
    filter: drop-shadow(0 0 12px rgba(251, 191, 36, 0.14));
  }

  .illustration-landing-base {
    animation: landingPulse 4.6s ease-in-out infinite;
  }

  .illustration-landing-glow path {
    stroke-dasharray: 120 520;
    stroke-dashoffset: 780;
    animation: currentFlow 5.8s linear infinite;
  }

  .illustration-landing-node circle {
    animation: nodeFlash 3.2s ease-in-out infinite;
  }

  .illustration-ideas-base,
  .illustration-ideas-glow {
    transform-origin: 50% 54%;
    animation: bulbFlicker 5.2s ease-in-out infinite;
  }

  .illustration-ideas-glow {
    filter: drop-shadow(0 0 12px rgba(251, 191, 36, 0.18));
  }

  .illustration-projects-wrap {
    transform-origin: 52% 48%;
    animation: rocketHover 4.8s ease-in-out infinite;
  }

  .illustration-projects-glow path {
    stroke-dasharray: 140 460;
    stroke-dashoffset: 600;
    animation: trailFlow 5.2s linear infinite;
  }

  .illustration-about-glow path {
    stroke-dasharray: 70 220;
    stroke-dashoffset: 290;
    animation: networkFlow 6s linear infinite;
  }

  .illustration-about-node circle {
    animation: networkPulse 2.25s ease-in-out infinite;
  }

  @keyframes currentFlow {
    0% {
      stroke-dashoffset: 780;
      opacity: 0.35;
    }
    50% {
      opacity: 1;
    }
    100% {
      stroke-dashoffset: 0;
      opacity: 0.35;
    }
  }

  @keyframes landingPulse {
    0%,
    100% {
      opacity: 0.72;
    }
    50% {
      opacity: 1;
    }
  }

  @keyframes nodeFlash {
    0%,
    100% {
      opacity: 0.28;
      transform: scale(1);
    }
    50% {
      opacity: 1;
      transform: scale(1.08);
    }
  }

  @keyframes bulbFlicker {
    0%,
    18%,
    22%,
    62%,
    100% {
      opacity: 0.82;
    }
    20%,
    58% {
      opacity: 1;
    }
    60% {
      opacity: 0.62;
    }
  }

  @keyframes rocketHover {
    0%,
    100% {
      transform: translateY(0px);
    }
    50% {
      transform: translateY(-12px);
    }
  }

  @keyframes trailFlow {
    0% {
      stroke-dashoffset: 600;
      opacity: 0.3;
    }
    50% {
      opacity: 0.9;
    }
    100% {
      stroke-dashoffset: 40;
      opacity: 0.3;
    }
  }

  @keyframes networkFlow {
    0% {
      stroke-dashoffset: 290;
    }
    100% {
      stroke-dashoffset: 0;
    }
  }

  @keyframes networkPulse {
    0%,
    100% {
      opacity: 0.25;
      transform: scale(1);
    }
    35% {
      opacity: 1;
      transform: scale(1.12);
    }
  }
`;
