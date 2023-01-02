import { Form } from "@remix-run/react";
import { PegColors } from "..";
import { Swatch } from "./swatch";

export function ColorSelector() {
  return (
    <div className={"flex justify-between bg-stone-500"}>
      <div className={"m-auto flex gap-4"}>
        <Swatch colorIndex={-1} />
        {Object.keys(PegColors).map((_, i) => (
          <Swatch key={i} colorIndex={i} />
        ))}
      </div>
      <Form method="post">
        <button
          type="submit"
          className="rounded bg-blue-500  py-2 px-4 text-white hover:bg-blue-600 focus:bg-blue-400"
        >
          Reset
        </button>
      </Form>
    </div>
  );
}
