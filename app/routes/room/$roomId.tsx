import { ActionFunction, LoaderArgs } from "@remix-run/node";
import { json } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";
import invariant from "tiny-invariant";
import Board from "./board";
import { getRoom, resetDrawing, Room } from "~/models/rooms.server";
import { Provider } from "react-supabase";
import { createClient } from "@supabase/supabase-js";
import { useEffect } from "react";

type LoaderData = {
  room: Room;
};

// todo: get from .env file, move to util
export const supabase = createClient(
  "https://yhxkdwrkixmfqsamsfba.supabase.co",
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InloeGtkd3JraXhtZnFzYW1zZmJhIiwicm9sZSI6ImFub24iLCJpYXQiOjE2NzEyMTUzMzcsImV4cCI6MTk4Njc5MTMzN30.1p7pjjnXKbIbfeHmTTAUcyLYZmneBNIeg29CEP8zP9A",
  {
    realtime: {
      params: {
        eventsPerSecond: "10",
      },
    },
  }
);

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

  const newData = await resetDrawing({ id: params.roomId });

  return newData;
};

export default function DrawingDetailsPage() {
  const data = useLoaderData<typeof loader>() as LoaderData;

  useEffect(() => {
    try {
      const elem = document.querySelector("#the-board");
      if (elem?.requestFullscreen) {
        elem.requestFullscreen();
      } else if (elem?.webkitEnterFullScreen) {
        elem.webkitEnterFullScreen();
      }
    } catch (e) {
      console.log("Cannot enter fullscreen", e);
    }
  }, []);

  return (
    <Provider value={supabase}>
      <div id="the-board" className="h-full w-full overflow-hidden">
        {/* <h3 className="text-2xl font-bold">{data.drawing.title}</h3> */}
        <Board matrix={data.room?.matrix} roomId={data.room?.id} />
      </div>
    </Provider>
  );
}
