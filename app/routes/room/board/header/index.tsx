import { Form } from "@remix-run/react";
import { ColorSelector } from "./color-selector";

export function Header() {
  return (
    <div className={"flex justify-between bg-stone-500"}>
      <ColorSelector />
      <div className={"flex gap-2"}>
        <button
          className="rounded bg-auto py-2 px-2 text-white"
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
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="h-6 w-6"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M19 7.5v3m0 0v3m0-3h3m-3 0h-3m-2.25-4.125a3.375 3.375 0 11-6.75 0 3.375 3.375 0 016.75 0zM4 19.235v-.11a6.375 6.375 0 0112.75 0v.109A12.318 12.318 0 0110.374 21c-2.331 0-4.512-.645-6.374-1.766z"
            />
          </svg>
        </button>
        <Form method="post">
          <button
            type="submit"
            className="rounded bg-auto py-2 px-2 text-white"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="h-6 w-6"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M16.023 9.348h4.992v-.001M2.985 19.644v-4.992m0 0h4.992m-4.993 0l3.181 3.183a8.25 8.25 0 0013.803-3.7M4.031 9.865a8.25 8.25 0 0113.803-3.7l3.181 3.182m0-4.991v4.99"
              />
            </svg>
          </button>
        </Form>
      </div>
    </div>
  );
}
