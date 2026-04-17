"use client";

function Section08Six() {
  return (
    <div
      className="flex min-h-[100vh] items-center justify-center bg-cover bg-center px-6"
      style={{ backgroundImage: "url('https://picsum.photos/seed/six/1920/1080')" }}
    >
      <div className="rounded-xl bg-black/45 p-8 text-center text-white backdrop-blur-sm">
        <h2 className="text-4xl font-bold">08 Six</h2>
        <p className="mt-3 text-lg">This is an example section from app/08-six.</p>
      </div>
    </div>
  );
}

export default function Page() {
  return <Section08Six />;
}
