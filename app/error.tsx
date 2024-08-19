"use client";

export default function Error({ error, reset }: any) {
  console.log(error);
  return (
    <main className="flex justify-center items-center flex-col gap-6 h-dvh">
      <h1 className="text-3xl font-semibold">Something went wrong!</h1>
      <p className="text-lg">{error.message}</p>

      <button
        className="inline-block bg-secondary-500 text-neutral-200 px-6 py-3 text-lg"
        onClick={reset}
      >
        Try again
      </button>
    </main>
  );
}
