"use client";

function Section09Seven() {
  return (
    <div
      className="flex min-h-[100vh] items-center justify-center bg-cover bg-center px-6"
      style={{ backgroundImage: "url('https://picsum.photos/seed/seven/1920/1080')" }}
    >
      <div className="rounded-xl bg-black/45 p-8 text-center text-white backdrop-blur-sm">
        <h2 className="text-4xl font-bold">09 Seven</h2>
        <p className="mt-3 text-lg">This is an example section from app/09-seven.</p>
      </div>
    </div>
  );
}

export default function Page() {
  return <Section09Seven />;
}
