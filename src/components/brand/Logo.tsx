type LogoProps = {
  width?: number;
  tone?: "navy" | "white";
  className?: string;
};

/** Gold genie / lamp-smoke glyph that replaces the "E" in TRAVGENIE. */
export function GenieMark({
  className,
  style,
  gradientId = "genie-grad",
}: {
  className?: string;
  style?: React.CSSProperties;
  gradientId?: string;
}) {
  return (
    <svg viewBox="0 0 120 190" className={className} style={style} aria-hidden="true">

      <defs>
        <linearGradient id={gradientId} x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#F3D08A" />
          <stop offset="55%" stopColor="#C9963B" />
          <stop offset="100%" stopColor="#9F6E1C" />
        </linearGradient>
      </defs>
      <g fill={`url(#${gradientId})`}>
        {/* smoke tail */}
        <path d="M60 34C60 18 46 4 26 8c14 6 20 16 20 28 0 6-2 10-6 14 10 1 20-6 20-16z" />
        {/* head */}
        <ellipse cx="62" cy="48" rx="21" ry="18" />
        {/* torso stack */}
        <ellipse cx="60" cy="82" rx="27" ry="22" />
        <ellipse cx="60" cy="118" rx="34" ry="25" />
        {/* base swirl */}
        <path d="M18 150c0-13 19-22 42-22s42 9 42 22-19 22-42 22c-12 0-23-3-30-8 12 2 26 1 36-4 8-4 11-9 5-13-9-6-33-6-45 1-5 3-8 5-8 2z" />
      </g>
    </svg>
  );
}

export function Logo({ width = 210, tone = "navy", className }: LogoProps) {
  const color = tone === "white" ? "#FFFFFF" : "#0B1730";
  return (
    <span
      className={`inline-flex items-end leading-none ${className ?? ""}`}
      style={{ width, fontFamily: "var(--font-sans)" }}
      aria-label="TravGenie.com"
    >
      <span
        className="relative flex items-end font-bold tracking-[-0.02em]"
        style={{ color, fontSize: width * 0.185 }}
      >
        <span>TRAV</span>
        <GenieMark
          gradientId={`genie-${tone}-${width}`}
          className="relative shrink-0"
          style={
            {
              width: width * 0.105,
              height: width * 0.155,
              marginInline: -width * 0.004,
              marginBottom: -width * 0.012,
            } as React.CSSProperties
          }
        />
        <span className="relative">
          GENIE
          <span
            className="absolute -top-0.5 -right-2 font-medium"
            style={{ fontSize: width * 0.05 }}
          >
            ®
          </span>
        </span>
        <span
          className="ml-2 font-semibold"
          style={{ color, fontSize: width * 0.115 }}
        >
          .com
        </span>
      </span>
    </span>
  );
}
