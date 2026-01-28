// app/resume/timeline/page.tsx
import Link from "next/link";

type TimelineLink = {
  label: string;
  href: string;
  note?: string;
};

type TimelineItem = {
  period: string;
  org: string;
  sub?: string;
  role: string;
  summary: string;
  execution: string[];
  result: string[];
  links?: TimelineLink[];
};

const SectionLabel = ({ children }: { children: React.ReactNode }) => (
  <p className="font-mono text-[11px] uppercase tracking-[0.18em] text-black/35">
    {children}
  </p>
);

const ExternalLink = ({ label, href }: { label: string; href: string }) => {
  const isExternal = href.startsWith("http");
  return (
    <a
      href={href}
      target={isExternal ? "_blank" : undefined}
      rel={isExternal ? "noreferrer" : undefined}
      className="text-[14px] leading-7 text-black/65 hover:text-black transition word-keep-all"
    >
      {label} →
    </a>
  );
};

const TimelineBlock = ({ item }: { item: TimelineItem }) => (
  <section className="py-14">
    <div className="flex flex-col gap-2">
      <p className="text-[12px] text-black/45">{item.period}</p>
      <h2 className="text-[18px] font-semibold tracking-[-0.2px] text-black">
        {item.org}
      </h2>
      {item.sub ? (
        <p className="text-[13.5px] leading-7 text-black/60 word-keep-all">
          {item.sub}
        </p>
      ) : null}
    </div>

    <div className="mt-7 grid gap-7">
      <div>
        <SectionLabel>Role</SectionLabel>
        <p className="mt-2 text-[14.5px] leading-7 text-black/75 word-keep-all">
          {item.role}
        </p>
      </div>

      <div>
        <SectionLabel>Summary</SectionLabel>
        <p className="mt-2 text-[14.5px] leading-7 text-black/75 word-keep-all">
          {item.summary}
        </p>
      </div>

      <div>
        <SectionLabel>Key Execution</SectionLabel>
        <ul className="mt-3 space-y-2 text-[14px] leading-[1.85] text-black/70">
          {item.execution.map((t) => (
            <li key={t} className="word-keep-all">
              • {t}
            </li>
          ))}
        </ul>
      </div>

      <div>
        <SectionLabel>Result</SectionLabel>
        <ul className="mt-3 space-y-2 text-[14px] leading-[1.85] text-black/70">
          {item.result.map((t) => (
            <li key={t} className="word-keep-all">
              • {t}
            </li>
          ))}
        </ul>
      </div>

      {/* ✅ Links (optional) */}
      {item.links?.length ? (
        <div>
          <SectionLabel>Links</SectionLabel>
          <div className="mt-3 flex flex-col gap-2">
            {item.links.map((l) => (
              <div key={l.label + l.href} className="flex flex-col gap-0.5">
                <ExternalLink label={l.label} href={l.href} />
                {l.note ? (
                  <p className="text-[12.5px] leading-6 text-black/45 word-keep-all">
                    {l.note}
                  </p>
                ) : null}
              </div>
            ))}
          </div>
        </div>
      ) : null}
    </div>
  </section>
);

export default function ResumeTimelinePage() {
  const items: TimelineItem[] = [
    {
      period: "2025.04.28 – 2025.08.22",
      org: "Asia Economy Data Analytics & AI Bootcamp",
      role: "System Designer / PM (also served as Data Analyst)",
      summary:
        "Designed and implemented problems as decision structures and working systems using data analytics tools.",
      execution: [
        "Designed the overall system architecture and execution flow across 3 projects",
        "Defined problems as relational structures among states, variables, and conditions—not as feature lists",
        "Connected data collection → cleaning → analysis → output into a single decision pipeline",
        "Led the design of condition-based algorithms and core logic",
        "Applied aesthetics and humanities-based thinking to structure user behavior and policy judgment",
      ],
      result: ["2nd Place, Asia Economy Bootcamp Demo Day", "Earned SQLD certification"],
    },
    {
      period: "2024 – Present",
      org: "PMCC (Peer Mile Coffee Club)",
      role: "Founder / System Designer",
      summary:
        "Designed and operated a community combining running and conversation as a relationship-building system.",
      execution: [
        "Designed a community format based on running + coffee conversations",
        "Defined horizontal language rules and a feedforward conversation structure",
        "Designed CX / NPS survey structure for community operations",
        "Converted qualitative experience data into an operational decision structure",
      ],
      result: [
        "168+ total participants",
        "Maintained ~85% community retention",
        "Turned relationship quality into an operable system",
      ],
    },
    {
      period: "2022 – 2024",
      org: "ROK Special Warfare Command, 9th Airborne Special Forces Brigade | Special Operations Team",
      sub: "ROTC 2nd Lieutenant (Honorable Discharge)",
      role: "Platoon-level operations, deputy team lead",
      summary:
        "Supported the design of structures that stabilized team decision-making and execution under high-risk, high-pressure conditions.",
      execution: [
        "Organized decision-making flow for operations under limited time and resources",
        "Improved briefing structure and clarified pre-mission decision criteria",
        "Structured post-training / post-mission review (AAR) process",
        "Supported role allocation and judgment under rapidly changing situations",
      ],
      result: ["Improved stability in repeated mission execution", "Increased speed and consistency of team decisions"],
    },
    {
      period: "2017 – 2022",
      org: "Hongik University | Department of Art Studies",
      sub: "Entered via Interdisciplinary Studies (self-directed track)",
      role: "Undergraduate (focus in aesthetics) / Interior architecture studio coursework",
      summary:
        "Established a way of thinking that interprets sensory phenomena through structure and relations, forming a foundation later extended to system and data design.",
      execution: [
        "Studied aesthetics, philosophy of art, and contemporary art theory",
        "Completed 5 semesters of interior architecture studios: trained to design space, circulation, and user experience structurally",
        "Graduation thesis: aesthetic and philosophical analysis using modern music as the medium",
      ],
      result: [
        "Built an interpretation framework for translating sensation/experience into structure",
        "Secured a foundation for expanding thinking toward decision structures and system design",
      ],
      links: [
        {
          label: "Thesis Summary (1 page)",
          href: "https://maroon-whimsey-29c.notion.site/Thesis-Summary-1page-2f69831197008032aa49de8393b7b3d5?source=copy_link",
          note: "2-minute summary",
        },
        {
          label: "Thesis (Full Text / Archive)",
          href: "https://maroon-whimsey-29c.notion.site/Education-Research-2f69831197008022963adf9b02516e5a?source=copy_link",
          note: "Full text and evidence archive",
        },
      ],
    },
  ];

  return (
    <main className="mx-auto max-w-[860px] px-6 py-20">
      {/* Header */}
      <header className="mb-10">
        <p className="font-mono text-[12px] uppercase tracking-widest text-black/45">
          Resume / Timeline
        </p>
        <h1 className="mt-3 text-[28px] font-semibold tracking-[-0.02em] text-black">
          Timeline / Reference Resume
        </h1>
        <p className="mt-4 max-w-[720px] text-[14.5px] leading-7 text-black/65 word-keep-all">
          This page is a reference log of actual experience, organized by year.
        </p>

        {/* ✅ Top nav buttons: Overview + Home */}
        <div className="mt-6 flex flex-wrap gap-3">
          <Link
            href="/en/resume"
            className="inline-flex h-10 items-center justify-center rounded-full border border-black/10 bg-white px-5 text-[13px] font-medium text-black/70 hover:text-black transition"
          >
            ← Back to Resume (Overview)
          </Link>

          <Link
            href="/en"
            className="inline-flex h-10 items-center justify-center rounded-full border border-black/10 bg-white px-5 text-[13px] font-medium text-black/70 hover:text-black transition"
          >
            ← Back to Home
          </Link>
        </div>
      </header>

      <div className="h-px bg-black/5" />

      {/* Timeline */}
      <div>
        {items.map((item) => (
          <div key={item.period + item.org}>
            <TimelineBlock item={item} />
            <div className="h-px bg-black/5" />
          </div>
        ))}
      </div>
    </main>
  );
}
