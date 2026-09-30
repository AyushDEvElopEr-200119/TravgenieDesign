const marks: Record<string, { bg: string; fg: string; label: string }> = {
  "Oman Air": { bg: "#E8F1F1", fg: "#0E6E6E", label: "WY" },
  Emirates: { bg: "#FDEBEA", fg: "#D71920", label: "EK" },
  flydubai: { bg: "#FFF6E5", fg: "#F58220", label: "FZ" },
  "Qatar Airways": { bg: "#F5EAEE", fg: "#5C0632", label: "QR" },
  IndiGo: { bg: "#EAF0FB", fg: "#14225A", label: "6E" },
};

/** Airline mark. The design's bitmap logos are represented by typographic
 *  marks in brand colours (estimated — real logo artwork not supplied). */
export function AirlineLogo({
  name,
  size = 48,
}: {
  name: string;
  size?: number;
}) {
  const mark = marks[name] ?? { bg: "#F1F3F7", fg: "#0D1B3E", label: name.slice(0, 2) };
  return (
    <span
      className="flex shrink-0 items-center justify-center rounded-lg font-bold"
      style={{
        width: size,
        height: size,
        background: mark.bg,
        color: mark.fg,
        fontSize: size * 0.36,
      }}
      aria-label={name}
    >
      {mark.label}
    </span>
  );
}
