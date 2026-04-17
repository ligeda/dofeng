"use client";

function Section07Five() {
  return (
    <div
      className="flex min-h-[100vh] items-center justify-center bg-cover bg-center px-6"
      style={{ backgroundImage: "url('https://picsum.photos/seed/five/1920/1080')" }}
    >
      <div className="rounded-xl bg-black/45 p-8 text-center text-white backdrop-blur-sm">
        <h2 className="text-4xl font-bold">07 Five</h2>
        <p className="mt-3 text-lg">This is an example section from app/07-five.</p>
      </div>
    </div>
  );
}

export default function Page() {
  return <Section07Five />;
}
