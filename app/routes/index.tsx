import { Link } from "@remix-run/react";

export default function Index() {
  return (
    <main className="relative min-h-screen  sm:flex sm:items-center sm:justify-center">
      <div className="relative sm:pb-16 sm:pt-8">
        <div className="mx-auto max-w-7xl sm:px-6 lg:px-8">
          <div className="relative shadow-xl sm:overflow-hidden sm:rounded-2xl">
            <div className="absolute inset-0">
              <img
                className="h-full w-full object-cover"
                src="/brite-lite.jpg"
                alt="Brite Lite board"
              />
              <div className="absolute inset-0 bg-[color:rgba(139,92,246,0.25)] mix-blend-multiply" />
            </div>
            <div className="lg:pb-18 relative px-4 pt-16 pb-8 sm:px-6 sm:pt-24 sm:pb-14 lg:px-8 lg:pt-32">
              <h1 className="text-center text-6xl font-extrabold tracking-tight sm:text-8xl lg:text-9xl">
                <span className="block uppercase text-violet-300 drop-shadow-md">
                  Brite Lite
                </span>
              </h1>
              <p className="mx-auto mt-6 max-w-lg text-center text-xl text-violet-300 sm:max-w-3xl">
                Check the README.md file for instructions on how to get this
                project deployed.
              </p>
              <div className="mx-auto mt-10 max-w-sm sm:flex sm:max-w-none sm:justify-center">
                <Link
                  to="/room/new"
                  className="flex items-center justify-center rounded-md border border-transparent bg-white px-4 py-3 text-base font-medium text-violet-700 shadow-sm hover:bg-violet-50 sm:px-8"
                >
                  New Room
                </Link>
                {/* (
                <div className="space-y-4 sm:mx-auto sm:inline-grid sm:grid-cols-2 sm:gap-5 sm:space-y-0">
                  <Link
                    to="/room/new"
                    className="flex items-center justify-center rounded-md border border-transparent bg-white px-4 py-3 text-base font-medium text-violet-700 shadow-sm hover:bg-violet-50 sm:px-8"
                  >
                    New Room
                  </Link>
                  <Link
                    to="/room/1b60040a-2c09-43ed-ab7a-e42ac0cc30eb"
                    className="flex items-center justify-center rounded-md bg-violet-500 px-4 py-3 font-medium text-white hover:bg-violet-600  "
                  >
                    Join Room (1b60040a-2c09-43ed-ab7a-e42ac0cc30eb)
                  </Link>
                </div>
                ) */}
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
