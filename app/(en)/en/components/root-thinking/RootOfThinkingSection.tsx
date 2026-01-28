'use client';

import Link from 'next/link';

export default function RootOfThinkingSection() {
  return (
    <section className="mt-24">
      <p className="text-[12px] text-black/45">Root of Thinking</p>

      <h2 className="mt-2 text-[20px] font-semibold tracking-[-0.3px]">
        Projects came from the same thinking architecture
      </h2>

      <p className="mt-4 max-w-[560px] text-[14px] leading-7 text-black/65">
        Different problems, same architecture. Every project started from a single thinking structure.
        This section explains the criteria that made the results repeatable.
      </p>

      <div className="mt-10 grid gap-4 md:grid-cols-3">
        <div className="rounded-[22px] border border-black/10 bg-white p-5">
          <p className="text-[12px] text-black/45">Time · Ritornello</p>
          <h3 className="mt-2 text-[15px] font-semibold">
            Designing repetition to reduce uncertainty
          </h3>
          <p className="mt-3 text-[13.5px] leading-6 text-black/70">
            Repetition isn’t emotional comfort—it’s a cognitive structure that stabilizes time.
            A predictable rhythm reduces decisions and turns action from “choice” into “routine.”
          </p>
          <p className="mt-3 text-[12px] text-black/45">
            Applied in PMCC, Skin Diary
          </p>
        </div>

        <div className="rounded-[22px] border border-black/10 bg-white p-5">
          <p className="text-[12px] text-black/45">Pre-cognitive · Sensation</p>
          <h3 className="mt-2 text-[15px] font-semibold">
            Trust is decided before understanding
          </h3>
          <p className="mt-3 text-[13.5px] leading-6 text-black/70">
            Users judge safety and risk before they understand.
            Sensation sets the direction of trust earlier than logic.
          </p>
          <p className="mt-3 text-[12px] text-black/45">
            Applied in Skin Diary, PMCC
          </p>
        </div>

        <div className="rounded-[22px] border border-black/10 bg-black/[0.02] p-5">
          <p className="text-[12px] text-black/45">Space · Rhizome</p>
          <h3 className="mt-2 text-[15px] font-semibold">
            Meaning emerges from relations
          </h3>
          <p className="mt-3 text-[13.5px] leading-6 text-black/70">
            Meaning and risk emerge from the way elements connect.
          </p>
          <p className="mt-3 text-[12px] text-black/45">
            Applied in Empty House CPS
          </p>
        </div>
      </div>

      <div className="mt-8">
        <Link
          href="/en/thinking"
          className="inline-flex items-center rounded-full border border-black/10 bg-black px-5 py-2 text-[13px] font-medium text-white hover:bg-black/90 transition"
        >
          Explore the thinking architecture →
        </Link>
      </div>
    </section>
  );
}
