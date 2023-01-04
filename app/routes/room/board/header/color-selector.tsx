import { PegColors } from "..";
import { Swatch } from "./swatch";

export function ColorSelector() {
  return (
    <div className={"mx-4 flex w-2/3 items-center gap-4 overflow-scroll"}>
      <Swatch colorIndex={-1} />
      {Object.keys(PegColors).map((_, i) => (
        <Swatch key={i} colorIndex={i} />
      ))}
    </div>
  );
}
