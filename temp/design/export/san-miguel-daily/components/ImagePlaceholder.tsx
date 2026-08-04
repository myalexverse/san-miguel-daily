/**
 * Photo slot. Swap for next/image once real photography exists — keep the
 * wrapper classes so the aspect ratio and print treatment stay put.
 * treatment="cmyk" marks photographs that print as misregistered process
 * plates in the design system; "halftone" is the newsprint dot screen.
 */
export function ImagePlaceholder({
  label,
  className = "aspect-[3/2]",
  treatment = "cmyk",
}: {
  label?: string;
  className?: string;
  treatment?: "cmyk" | "halftone" | "none";
}) {
  return (
    <div
      data-treatment={treatment}
      className={
        "flex items-center justify-center bg-paper2 text-ink3 text-xs tracking-label uppercase " +
        className
      }
    >
      {label}
    </div>
  );
}
