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
      onClick={() => setPeg(coordinates)}
      className="flex h-10 w-10 cursor-pointer items-center justify-center bg-black "
    >
      <Peg colorIndex={peg} />
    </div>
  );
}
