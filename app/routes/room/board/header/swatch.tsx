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
      style={{
        minHeight: "30px",
        minWidth: "30px",
        maxHeight: "30px",
        maxWidth: "30px",
      }}
      className={`rounded-full ${tailwindColorClasses} ${selectedClasses} cursor-pointer shadow-none`}
    />
  );
}
