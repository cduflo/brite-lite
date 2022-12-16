import { Drawing } from "~/models/drawing.server";

const PegColors = {
  black: "border",
  red: "bg-red-500 shadow-red-500/50",
  orange: "bg-orange-500 shadow-orange-500/50",
  yellow: "bg-yellow-500 shadow-yellow-500/50",
  green: "bg-lime-500 shadow-lime-500/50",
  blue: "bg-cyan-500 shadow-cyan-500/50",
  purple: "bg-purple-500 shadow-purple-500/50",
  pink: "bg-pink-500 shadow-pink-500/50",
  white: "bg-white-500 shadow-white-500/50",
};

function Peg({ colorIndex = 0 }: { colorIndex: number }) {
  const tailwindColorClasses = Object.values(PegColors)[colorIndex];

  return (
    <div
      className={`h-3/6 w-3/6 rounded-full ${tailwindColorClasses} shadow-lg `}
    />
  );
}

function Hole({
  coordinates,
  peg,
  placePeg,
}: {
  coordinates: [number, number];
  peg?: number;
  placePeg: (coordinate: [number, number], peg: number) => {};
}) {
  //   const pegs = Object.values(Peg).filter((p) => !isNaN(p));
  //   console.log(Object.keys(Peg));

  const handleClick = () => {
    let newPeg = 0;
    if (peg >= 0 && Object.values(PegColors)[peg]) {
      newPeg = peg + 1;
    }

    placePeg(coordinates, newPeg);
  };

  return (
    <div
      className="flex h-10 w-10 items-center justify-center bg-black"
      onClick={handleClick}
    >
      <Peg colorIndex={peg} />
    </div>
  );
}

export default function Board({
  matrix,
  placePeg,
}: {
  matrix: Drawing["matrix"];
  placePeg: (coordinate: [number, number], peg: number) => {};
}) {
  console.log({ matrix });
  return (
    <div style={{ width: "200px" }}>
      <div className="flex flex-auto flex-wrap justify-around">
        {matrix.map((row, rowIndex) =>
          row.map((peg, holeIndex) => (
            <Hole
              key={`${rowIndex}-${holeIndex}`}
              coordinates={[rowIndex, holeIndex]}
              peg={peg}
              placePeg={placePeg}
            />
          ))
        )}
      </div>
    </div>
  );
}
