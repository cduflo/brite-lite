import { PegColors } from "..";
import { Swatch } from "./swatch";

export function ColorSelector() {
  return (
    <div className={"m-auto flex gap-4"}>
      <Swatch colorIndex={-1} />
      {Object.keys(PegColors).map((_, i) => (
        <Swatch key={i} colorIndex={i} />
      ))}
    </div>
  );
}
