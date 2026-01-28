// app/resume/page.tsx
import Link from "next/link";

export default function ResumePage() {
  // ✅ 하드코딩된 Notion URL
  const notionUrl = "https://maroon-whimsey-29c.notion.site/Resume-2f6983119700809483e3f893be949b14?source=copy_link";

  return (
    <main className="mx-auto max-w-[860px] px-6 py-20">
      {/* Header */}
      <header className="mb-10">
        <p className="font-mono text-[12px] uppercase tracking-widest text-black/45">
          Resume / Overview
        </p>
        <h1 className="mt-3 text-[28px] font-semibold tracking-[-0.02em] text-black">
          Resume
        </h1>
        <p className="mt-4 max-w-[720px] text-[14.5px] leading-7 text-black/65 word-keep-all">
          This page is a summary index designed for quickly scanning the entire portfolio.
          For a year-by-year history, see <span className="text-black/80">Timeline</span>.
          For an external overview of the projects, see{" "}
          <span className="text-black/80">Notion Overview</span>.
        </p>

        {/* ✅ Back to home */}
        <div className="mt-6 flex flex-wrap gap-3">
          <Link
            href="/en"
            className="inline-flex h-10 items-center justify-center rounded-full border border-black/10 bg-white px-5 text-[13px] font-medium text-black/70 hover:text-black transition"
          >
            ← Back to Home
          </Link>
        </div>
      </header>

      {/* Summary */}
      <section className="mb-10">
        <h2 className="text-[13px] font-semibold text-black/70 uppercase tracking-wide">
          Summary
        </h2>
        <div className="mt-4 rounded-[22px] border border-black/10 bg-white p-7">
          <p className="text-[15px] leading-8 text-black/75 word-keep-all">
            A problem solver who designs and executes complex problems as{" "}
            <span className="font-semibold text-black">decision structures</span>.
            I redefine sensory and qualitative domains into{" "}
            <span className="font-semibold text-black">states, variables, and conditions</span>,
            and implement them as{" "}
            <span className="font-semibold text-black">working systems and operating structures</span>.
          </p>

          <p className="mt-4 text-[14px] leading-7 text-black/65 word-keep-all">
            The consistent focus has been less about what to build, and more about designing{" "}
            <span className="font-semibold text-black">the criteria people use to decide</span>.
          </p>
        </div>
      </section>

      {/* Links */}
      <section className="rounded-[22px] border border-black/10 bg-white p-7">
        <h2 className="text-[13px] font-semibold text-black/70 uppercase tracking-wide">
          Links
        </h2>
        <p className="mt-3 text-[14px] leading-7 text-black/65 word-keep-all">
          Use the links below to navigate as needed.
        </p>

        <div className="mt-6 flex flex-col gap-3 sm:flex-row sm:items-center">
          <Link
            href="/en/resume/timeline"
            className="inline-flex items-center justify-center rounded-full border border-black/10 bg-black px-6 py-3 text-[13px] font-semibold text-white transition hover:bg-black/90"
          >
            View Timeline →
          </Link>

          <a
            href={notionUrl}
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center justify-center rounded-full border border-black/10 bg-white px-6 py-3 text-[13px] font-semibold text-black/80 transition hover:border-black/20"
          >
            Notion Overview →
          </a>
        </div>
      </section>
    </main>
  );
}
