import { Room } from "~/models/rooms.server";
import { useUpdate } from "react-supabase";
import { createContext, useState } from "react";
import { supabase } from "../$roomId";
import { Hole } from "./hole";
import { Header } from "./header";

export const PegColors = {
  red: "bg-red-500 shadow-red-500/50",
  orange: "bg-orange-500 shadow-orange-500/50",
  yellow: "bg-yellow-500 shadow-yellow-500/50",
  green: "bg-lime-500 shadow-lime-500/50",
  blue: "bg-cyan-500 shadow-cyan-500/50",
  purple: "bg-purple-500 shadow-purple-500/50",
  pink: "bg-pink-500 shadow-pink-500/50",
  white: "bg-white shadow-white/50",
};

export const BoardContext = createContext({
  setPeg: (coordinates: [number, number]) => {},
  setColorSelected: (colorIndex: number) => {},
  colorSelected: 0,
});

export default function Board({
  roomId,
  matrix,
}: {
  roomId: Room["id"];
  matrix: Room["matrix"];
}) {
  const [localMatrix, setLocalMatrix] = useState(matrix);
  const [colorSelected, setColorSelected] = useState(0);

  const [{ data, error, fetching }, execute] = useUpdate("rooms");

  const setPeg = (coordinates: [number, number]) => {
    localMatrix[coordinates[0]][coordinates[1]] = colorSelected;

    execute({ matrix: localMatrix }, (query) => query.eq("id", roomId));
  };

  const handleRecordUpdated = (data: { new: Room }) => {
    setLocalMatrix(data.new.matrix);
  };

  supabase
    .channel(`public:rooms:id=eq.${roomId}`)
    .on(
      "postgres_changes",
      {
        event: "UPDATE",
        schema: "public",
        table: "rooms",
        filter: `id=eq.${roomId}`,
      },
      handleRecordUpdated
    )
    .subscribe();

  return (
    <BoardContext.Provider
      value={{
        setPeg,
        setColorSelected,
        colorSelected,
      }}
    >
      <Header />
      <div className="flex">
        <div className="m-auto select-none overflow-auto bg-black">
          {localMatrix.map((row, rowIndex) => (
            <div className="flex justify-center" key={rowIndex}>
              {row.map((peg, holeIndex) => (
                <Hole
                  key={`${rowIndex}-${holeIndex}`}
                  coordinates={[rowIndex, holeIndex]}
                  peg={peg}
                />
              ))}
            </div>
          ))}
        </div>
      </div>
    </BoardContext.Provider>
  );
}
