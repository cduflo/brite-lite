import { useNavigate } from "@remix-run/react";

export default function Index() {
  const navigate = useNavigate();

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
                A collaborative image creation experience.
              </p>
              <div className="mx-auto mt-10 max-w-sm sm:flex sm:max-w-none sm:justify-center">
                <button
                  onClick={() => {
                    const size =
                      window.innerWidth < 400
                        ? "sm"
                        : window.innerWidth < 800
                        ? "md"
                        : "lg";
                    navigate(`/room/new/${size}`);
                  }}
                  className="m-auto flex items-center justify-center rounded-md border border-transparent bg-white px-4 py-3 text-base font-medium text-violet-700 shadow-sm hover:bg-violet-50 sm:px-8"
                >
                  New Room
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
