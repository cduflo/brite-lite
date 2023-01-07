import { useContext } from "react";
import { BoardContext } from ".";
import { Peg } from "./peg";

export function Hole({
  coordinates,
  peg,
}: {
  coordinates: [number, number];
  peg: number;
}) {
  const { setPeg } = useContext(BoardContext);

  return (
    <div
      onPointerDown={() => setPeg(coordinates)}
      style={{
        minHeight: "40px",
        minWidth: "40px",
        maxHeight: "40px",
        maxWidth: "40px",
      }}
      className="flex cursor-pointer items-center justify-center bg-black"
    >
      <Peg colorIndex={peg} />
    </div>
  );
}
