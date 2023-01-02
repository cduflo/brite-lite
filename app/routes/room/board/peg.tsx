import { useContext } from "react";
import { BoardContext, PegColors } from ".";

export function Peg({
  colorIndex,
  coordinates,
}: {
  colorIndex: number;
  coordinates: [number, number];
}) {
  const tailwindColorClasses =
    colorIndex > -1 ? Object.values(PegColors)[colorIndex] : "border";

  const { setPeg } = useContext(BoardContext);

  return (
    <div
      onClick={() => setPeg(coordinates)}
      className={`h-3/6 w-3/6 rounded-full ${tailwindColorClasses} cursor-pointer shadow-lg `}
    />
  );
}
