import type { ActionFunction, LoaderArgs } from "@remix-run/node";
import { json, redirect } from "@remix-run/node";
import { Form, useLoaderData } from "@remix-run/react";
import type { Drawing } from "~/models/drawing.server";
import { deleteDrawing, getDrawing } from "~/models/drawing.server";
import { requireUserId } from "~/session.server";
import invariant from "tiny-invariant";

type LoaderData = {
  drawing: Drawing;
};

export async function loader({ request, params }: LoaderArgs) {
  const userId = await requireUserId(request);
  invariant(params.drawingId, "drawingId not found");

  const drawing = await getDrawing({ userId, id: params.drawingId });
  if (!drawing) {
    throw new Response("Not Found", { status: 404 });
  }

  return json({ drawing });
}

export const action: ActionFunction = async ({ request, params }) => {
  const userId = await requireUserId(request);
  invariant(params.drawingId, "drawingId not found");

  await deleteDrawing({ userId, id: params.drawingId });

  return redirect("/drawings");
};

export default function DrawingDetailsPage() {
  const data = useLoaderData<typeof loader>() as LoaderData;

  return (
    <div>
      <h3 className="text-2xl font-bold">{data.drawing.title}</h3>
      <p className="py-6">{data.drawing.matrix}</p>
      <hr className="my-4" />
      <Form method="post">
        <button
          type="submit"
          className="rounded bg-blue-500  py-2 px-4 text-white hover:bg-blue-600 focus:bg-blue-400"
        >
          Delete
        </button>
      </Form>
    </div>
  );
}
