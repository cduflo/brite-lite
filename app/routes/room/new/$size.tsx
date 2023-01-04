import { LoaderArgs, redirect } from "@remix-run/node";
import { createRoom, MatrixSize } from "~/models/rooms.server";

export async function loader({ params }: LoaderArgs) {
  const newRoom = await createRoom({ size: params.size as MatrixSize });
  return redirect(`/room/${newRoom.id}`);
}