import {  PegColors } from ".";

export function Peg({
  colorIndex,
}: {
  colorIndex: number;
}) {
  const tailwindColorClasses =
    colorIndex > -1 ? Object.values(PegColors)[colorIndex] : "border";

  return (
    <div
      className={`h-3/6 w-3/6 rounded-full ${tailwindColorClasses} shadow-lg `}
    />
  );
}
