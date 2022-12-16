import { Link } from "@remix-run/react";

export default function DrawingIndexPage() {
  return (
    <p>
      No drawing selected. Select a drawing on the left, or{" "}
      <Link to="new" className="text-blue-500 underline">
        create a new drawing.
      </Link>
    </p>
  );
}
