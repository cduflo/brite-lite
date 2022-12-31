import { ActionFunction, LoaderArgs, redirect } from "@remix-run/node";
import { json } from "@remix-run/node";
import { Form, useLoaderData } from "@remix-run/react";
import invariant from "tiny-invariant";
import { useState } from "react";
import Board from "./board";
import { createRoom, getRoom, resetDrawing, Room } from "~/models/rooms.server";

type LoaderData = {
  room: Room;
};

export async function loader({ request, params }: LoaderArgs) {
  invariant(params.roomId, "roomId not found");


  const room = await getRoom({ id: params.roomId });
  if (!room) {
    throw new Response("Not Found", { status: 404 });
  }

  return json({ room });
}

export const action: ActionFunction = async ({ request, params }) => {
  invariant(params.roomId, "roomId not found");

  await resetDrawing({ id: params.roomId });

  return null;
};

export default function DrawingDetailsPage() {
  const data = useLoaderData<typeof loader>() as LoaderData;
  console.log({ data });

  const [matrix, setMatrix] = useState(data.room.matrix);

  return (
    <div>
      {/* <h3 className="text-2xl font-bold">{data.drawing.title}</h3> */}
      <Board matrix={matrix} placePeg={() => {}} />
      <hr className="my-4" />
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
