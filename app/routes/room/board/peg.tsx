import { PegColors } from ".";

export function Peg({ colorIndex }: { colorIndex: number }) {
  const tailwindColorClasses =
    colorIndex > -1 ? Object.values(PegColors)[colorIndex] : "border";

  return (
    <div
      className={`h-2/3 w-2/3 rounded-full ${tailwindColorClasses} shadow-lg `}
    />
  );
}
