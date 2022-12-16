import type { LoaderArgs } from "@remix-run/node";
import { json } from "@remix-run/node";
import { Form, Link, NavLink, Outlet, useLoaderData } from "@remix-run/react";
import type { Drawing } from "~/models/drawing.server";
import { getDrawingListItems } from "~/models/drawing.server";
import { requireUserId } from "~/session.server";
import { useUser } from "~/utils";

type LoaderData = {
  drawingListItems: Drawing[];
};

export async function loader({ request }: LoaderArgs) {
  const userId = await requireUserId(request);
  const drawingListItems = await getDrawingListItems({ userId });
  return json({ drawingListItems });
}

export default function DrawingsPage() {
  const data = useLoaderData<typeof loader>() as LoaderData;

  return (
    <div className="flex h-full min-h-screen flex-col">
      <Header />
      <main className="flex h-full bg-white">
        <div className="h-full w-80 border-r bg-gray-50">
          <Link to="new" className="block p-4 text-xl text-blue-500">
            + New Drawing
          </Link>

          <hr />

          {data.drawingListItems.length === 0 ? (
            <p className="p-4">No drawings yet</p>
          ) : (
            <ol>
              {data.drawingListItems.map((drawing) => (
                <li key={drawing.id}>
                  <NavLink
                    className={({ isActive }) =>
                      `block border-b p-4 text-xl ${isActive ? "bg-white" : ""}`
                    }
                    to={drawing.id}
                  >
                    📝 {drawing.title}
                  </NavLink>
                </li>
              ))}
            </ol>
          )}
        </div>

        <div className="flex-1 p-6">
          <Outlet />
        </div>
      </main>
    </div>
  );
}

function Header() {
  const user = useUser();
  return (
    <header className="flex items-center justify-between bg-slate-800 p-4 text-white">
      <h1 className="text-3xl font-bold">
        <Link to=".">Drawings</Link>
      </h1>
      <p>{user.email}</p>
      <Form action="/logout" method="post">
        <button
          type="submit"
          className="rounded bg-slate-600 py-2 px-4 text-blue-100 hover:bg-blue-500 active:bg-blue-600"
        >
          Logout
        </button>
      </Form>
    </header>
  );
}
