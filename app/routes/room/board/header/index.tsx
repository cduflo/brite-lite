import { Form } from "@remix-run/react";
import { ColorSelector } from "./color-selector";

export function Header() {
  return (
    <div className={"flex justify-between bg-stone-500"}>
      <ColorSelector />
      <div className={"flex gap-2"}>
        <Form method="post">
          <button
            type="submit"
            className="rounded bg-blue-500  py-2 px-4 text-white hover:bg-blue-600 focus:bg-blue-400"
          >
            Reset
          </button>
        </Form>
        <button
          className="rounded bg-white  py-2 px-4 text-blue-500 hover:bg-white focus:bg-white"
          onClick={() => {
            navigator?.share?.({
              title: "Brite Lite Invitation",
              text: "Come play Brite Lite with me!",
              url: window.location.href,
            }) ||
              navigator.clipboard
                .writeText(window.location.href)
                .then(() => alert("URL copied!"));
          }}
        >
          Invite
        </button>
      </div>
    </div>
  );
}
