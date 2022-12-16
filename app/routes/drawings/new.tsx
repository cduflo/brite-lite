import type { ActionFunction } from "@remix-run/node";
import { json, redirect } from "@remix-run/node";
import { Form } from "@remix-run/react";
import { useState } from "react";
import { createDrawing } from "~/models/drawing.server";
import { requireUserId } from "~/session.server";
import Board from "./board";

export const action: ActionFunction = async ({ request }) => {
  const userId = await requireUserId(request);

  const formData = await request.formData();
  const title = formData.get("title");
  const body = formData.get("body");

  if (typeof title !== "string" || title.length === 0) {
    return json({ errors: { title: "Title is required" } }, { status: 400 });
  }

  if (typeof body !== "string" || body.length === 0) {
    return json({ errors: { body: "Body is required" } }, { status: 400 });
  }

  // todo: rm
  const width = 5;
  const matrix = [[]];
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

  const placePeg = (coordinates, peg) => {
    const newMatrix = [...matrix];

    newMatrix[coordinates[0]][coordinates[1]] = peg;
    // console.log({ newMatrix });
    setMatrix(newMatrix);
  };

  return (
    <Form
      method="post"
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
          <span>Body: </span>
          <Board matrix={matrix} placePeg={placePeg} />
        </label>
      </div>

      <div className="text-right">
        <button
          type="submit"
          className="rounded bg-blue-500  py-2 px-4 text-white hover:bg-blue-600 focus:bg-blue-400"
        >
          Save
        </button>
      </div>
    </Form>
  );
}
