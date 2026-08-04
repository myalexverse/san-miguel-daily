/**
 * San Miguel Daily wordmark + monogram, pure SVG.
 * The wordmark uses live <text> in Source Serif 4 so it inherits currentColor;
 * convert to outlines if the font will not be available (see README).
 */
export function Logo({ className = "h-8 w-auto" }: { className?: string }) {
  return (
    <svg viewBox="0 0 420 48" role="img" aria-label="San Miguel Daily" className={className}>
      <text
        x="0"
        y="36"
        fill="currentColor"
        fontFamily="'Source Serif 4', Georgia, serif"
        fontSize="40"
        fontWeight="600"
        letterSpacing="-1.2"
      >
        San Miguel
      </text>
      <text
        x="232"
        y="36"
        fill="currentColor"
        fontFamily="'Source Serif 4', Georgia, serif"
        fontSize="40"
        fontWeight="400"
        fontStyle="italic"
        letterSpacing="-1.2"
      >
        Daily
      </text>
    </svg>
  );
}

/** Square monogram for favicons, app icons and the dashboard rail. */
export function LogoMark({ className = "h-9 w-9" }: { className?: string }) {
  return (
    <svg viewBox="0 0 48 48" role="img" aria-label="San Miguel Daily" className={className}>
      <rect x="0.75" y="0.75" width="46.5" height="46.5" fill="none" stroke="currentColor" strokeWidth="1.5" />
      <rect x="6" y="6" width="36" height="3" fill="currentColor" />
      <text
        x="24"
        y="34"
        textAnchor="middle"
        fill="currentColor"
        fontFamily="'Source Serif 4', Georgia, serif"
        fontSize="20"
        fontWeight="600"
        letterSpacing="0.5"
      >
        SMD
      </text>
    </svg>
  );
}
