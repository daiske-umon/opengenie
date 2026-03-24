export function PageIllustration({
  variant,
  className = "",
}: {
  variant: "landing" | "ideas" | "projects" | "about";
  className?: string;
}) {
  const common =
    "pointer-events-none absolute text-primary opacity-[0.04] select-none";

  if (variant === "landing") {
    return (
      <svg
        aria-hidden="true"
        viewBox="0 0 900 700"
        className={`${common} ${className}`}
        fill="none"
      >
        <path d="M50 110H240V220H430V135H620V310H840" stroke="currentColor" />
        <path d="M90 450H220V310H360V560H520V420H760" stroke="currentColor" />
        <path d="M140 610V500H300V350H470V250H710V120" stroke="currentColor" />
        <path d="M320 80V180H170V360H560V520H840" stroke="currentColor" />
        <circle cx="240" cy="220" r="8" stroke="currentColor" />
        <circle cx="430" cy="135" r="8" stroke="currentColor" />
        <circle cx="620" cy="310" r="8" stroke="currentColor" />
        <circle cx="360" cy="560" r="8" stroke="currentColor" />
        <circle cx="520" cy="420" r="8" stroke="currentColor" />
        <circle cx="300" cy="350" r="8" stroke="currentColor" />
      </svg>
    );
  }

  if (variant === "ideas") {
    return (
      <svg
        aria-hidden="true"
        viewBox="0 0 280 280"
        className={`${common} ${className}`}
        fill="none"
      >
        <path
          d="M140 42c-34 0-62 28-62 62 0 22 11 37 24 51 9 10 14 18 16 31h44c2-13 7-21 16-31 13-14 24-29 24-51 0-34-28-62-62-62Z"
          stroke="currentColor"
        />
        <path d="M112 202h56M118 219h44M124 236h32" stroke="currentColor" />
        <path
          d="M140 20v14M208 52l-11 11M236 122h-15M72 52l11 11M44 122h15"
          stroke="currentColor"
        />
      </svg>
    );
  }

  if (variant === "projects") {
    return (
      <svg
        aria-hidden="true"
        viewBox="0 0 320 320"
        className={`${common} ${className}`}
        fill="none"
      >
        <path
          d="M170 42 212 84 188 108 230 150 176 204 134 162 110 186 68 144Z"
          stroke="currentColor"
        />
        <path
          d="M176 204c8 30 24 48 50 58-33 4-62-4-85-27"
          stroke="currentColor"
        />
        <path
          d="M42 246h70M52 266h94M220 248l22 22 36-36"
          stroke="currentColor"
        />
        <path
          d="M58 82 28 112l30 30M262 84l30 30-30 30"
          stroke="currentColor"
        />
      </svg>
    );
  }

  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 360 260"
      className={`${common} ${className}`}
      fill="none"
    >
      <circle cx="48" cy="58" r="16" stroke="currentColor" />
      <circle cx="164" cy="42" r="16" stroke="currentColor" />
      <circle cx="300" cy="70" r="16" stroke="currentColor" />
      <circle cx="106" cy="190" r="16" stroke="currentColor" />
      <circle cx="250" cy="198" r="16" stroke="currentColor" />
      <path
        d="M64 56h84M178 48l106 18M58 70l36 104M120 182l114 8M154 54l-36 120"
        stroke="currentColor"
      />
    </svg>
  );
}
