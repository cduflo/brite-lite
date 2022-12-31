import type { ActionFunction } from "@remix-run/node";
import { json, redirect } from "@remix-run/node";
import { Form, useSubmit } from "@remix-run/react";
import { useState } from "react";
import Board from "./board";

export const action: ActionFunction = async ({ request, ...rest }) => {
  console.log({ rest });
  console.log({ request });

  const formData = await request.formData();
  console.log({ formData });

  const title = formData.get("title");
  const matrix = formData.get("matrix");
  const width = formData.get("width");
  console.log({ title, matrix, width });

  if (typeof title !== "string" || title.length === 0) {
    return json({ errors: { title: "Title is required" } }, { status: 400 });
  }

  const drawing = await createDrawing({ title, width, matrix, userId });
  return redirect(`/drawings/${drawing.id}`);
};

const defaultBoard = (width, height) => {
  const board = [];
  for (let i = 0; i < width; i++) {
    const row = [];
    for (let j = 0; j < height; j++) {
      row[j] = 0;
    }
    board[i] = row;
  }

  return board;
};

export default function NewDrawingPage() {
  const width = 5;

  const [matrix, setMatrix] = useState(defaultBoard(5, 5));
  const submit = useSubmit();

  const placePeg = (coordinates, peg) => {
    const newMatrix = [...matrix];

    newMatrix[coordinates[0]][coordinates[1]] = peg;
    // console.log({ newMatrix });
    setMatrix(newMatrix);
  };

  const onSubmit = (event) => {
    // let's prevent the default event
    event.preventDefault();

    // grab the form element
    let $form = event.currentTarget;

    // get the formData from that form
    let formData = new FormData($form);

    formData.set("matrix", JSON.stringify(matrix));
    formData.set("width", width);

    // and finally submit the form data, re-using the method and action from the form
    submit(formData, {
      method: $form.getAttribute("method") ?? $form.method,
      action: $form.getAttribute("action") ?? $form.action,
    });
  };

  return (
    <Form
      method="post"
      onSubmit={onSubmit}
      style={{
        display: "flex",
        flexDirection: "column",
        gap: 8,
        width: "100%",
      }}
    >
      <div>
        <label className="flex w-full flex-col gap-1">
          <span>Title: </span>
          <input
            name="title"
            className="flex-1 rounded-md border-2 border-blue-500 px-3 text-lg leading-loose"
          />
        </label>
      </div>
      <div>
        <label className="flex w-full flex-col gap-1">
          <span>Drawing: </span>
          <Board name="matrix" matrix={matrix} placePeg={placePeg} />
        </label>
      </div>

      <div className="text-right">
        <button
          type="submit"
          className="rounded bg-blue-500  py-2 px-4 text-white hover:bg-blue-600 focus:bg-blue-400"
          // onClick={handleSubmit}
        >
          Save
        </button>
      </div>
    </Form>
  );
}
