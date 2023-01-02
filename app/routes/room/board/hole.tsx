import { Peg } from "./peg";

export function Hole({
  coordinates,
  peg,
}: {
  coordinates: [number, number];
  peg: number;
}) {
  return (
    <div className="flex h-10 w-10 items-center justify-center bg-black">
      <Peg colorIndex={peg} coordinates={coordinates} />
    </div>
  );
}
