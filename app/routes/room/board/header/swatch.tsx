import { useContext } from "react";
import { BoardContext, PegColors } from "..";

export function Swatch({ colorIndex }: { colorIndex: number }) {
  const { setColorSelected, colorSelected } = useContext(BoardContext);

  const tailwindColorClasses =
    colorIndex > -1 ? Object.values(PegColors)[colorIndex] : "bg-black";
  const selectedClasses = colorIndex === colorSelected ? "border-2" : "";

  return (
    <div
      onClick={() => setColorSelected(colorIndex)}
      style={{ height: "30px", width: "30px" }}
      className={`rounded-full ${tailwindColorClasses} ${selectedClasses} cursor-pointer shadow-lg `}
    />
  );
}
