"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import RootOfThinkingSection from "./components/root-thinking/RootOfThinkingSection";
import { track } from "@vercel/analytics";

/* ---------- Shared Components ---------- */

const NavLink = ({
  href,
  label,
  onClick,
}: {
  href: string;
  label: string;
  onClick?: () => void;
}) => (
  <a
    href={href}
    onClick={onClick}
    className="text-[13px] text-black/60 hover:text-black transition"
  >
    {label}
  </a>
);

const Pill = ({ children }: { children: React.ReactNode }) => (
  <span className="inline-flex items-center rounded-full border border-black/10 bg-white px-3 py-1 text-[12px] text-black/60">
    {children}
  </span>
);

const SectionTitle = ({
  eyebrow,
  title,
  desc,
}: {
  eyebrow?: string;
  title: string;
  desc?: string;
}) => (
  <div className="mb-6">
    {eyebrow && <p className="text-[12px] text-black/45">{eyebrow}</p>}
    <h2 className="mt-2 text-[18px] font-semibold tracking-[-0.2px]">{title}</h2>
    {desc && <p className="mt-3 text-[13.5px] leading-7 text-black/60">{desc}</p>}
  </div>
);

const Card = ({ children }: { children: React.ReactNode }) => (
  <div className="rounded-[22px] border border-black/10 bg-white p-6 shadow-[0_1px_2px_rgba(0,0,0,0.06),0_12px_30px_rgba(0,0,0,0.06)]">
    {children}
  </div>
);

const MiniProject = ({
  title,
  subtitle,
  href,
  tags,
}: {
  title: string;
  subtitle: string;
  href: string;
  tags: string[];
}) => (
  <a
    href={href}
    onClick={() => track("project_card_click", { href, title })}
    className="block rounded-[18px] border border-black/10 bg-white p-5 hover:shadow-[0_1px_2px_rgba(0,0,0,0.06),0_12px_30px_rgba(0,0,0,0.06)] transition"
  >
    <div className="flex items-baseline justify-between gap-3">
      <h3 className="text-[15px] font-semibold tracking-[-0.15px]">{title}</h3>
      <span className="text-[12px] text-black/45">View ↗</span>
    </div>
    <p className="mt-2 text-[13.5px] leading-7 text-black/60">{subtitle}</p>
    <div className="mt-3 flex flex-wrap gap-2">
      {tags.map((t) => (
        <Pill key={t}>{t}</Pill>
      ))}
    </div>
  </a>
);

/* ---------- Language Switch (EN) ---------- */

const LanguageSwitch = () => (
  <div className="flex items-center gap-2 text-[12px]">
    <Link
      href="/"
      className="text-black/40 hover:text-black transition"
      onClick={() => track("lang_switch", { from: "en", to: "ko" })}
    >
      KO
    </Link>
    <span className="text-black/30">·</span>
    <span className="font-semibold text-black">EN</span>
  </div>
);

/* ---------- Link Utils ---------- */

const ResumeInternalLink = ({
  className,
  children,
  onClick,
}: {
  className?: string;
  children: React.ReactNode;
  onClick?: () => void;
}) => (
  <Link href="/en/resume" className={className} onClick={onClick}>
    {children}
  </Link>
);

const NotionOverviewLink = ({
  className,
  children,
  onClick,
}: {
  className?: string;
  children: React.ReactNode;
  onClick?: () => void;
}) => {
  const url = process.env.NEXT_PUBLIC_RESUME_URL?.trim();
  if (!url) return null;

  return (
    <a href={url} target="_blank" rel="noreferrer" className={className} onClick={onClick}>
      {children}
    </a>
  );
};

/* ---------- Page ---------- */

export default function Page() {
  const EMAIL = "paulseongminpark@gmail.com";
  const [showEmail, setShowEmail] = useState(false);
  const [copied, setCopied] = useState(false);

  const toggleEmailBanner = () => {
    track("cta_click", { cta: "contact_email_toggle", location: "contact_section" });
    setShowEmail((v) => !v);
  };

  const copyEmail = async () => {
    try {
      await navigator.clipboard.writeText(EMAIL);
    } catch {
      const el = document.createElement("textarea");
      el.value = EMAIL;
      document.body.appendChild(el);
      el.select();
      document.execCommand("copy");
      document.body.removeChild(el);
    }

    track("cta_click", { cta: "contact_email_copy", location: "contact_section" });

    setCopied(true);
    setTimeout(() => setCopied(false), 2200);
  };

  return (
    <div className="min-h-screen bg-white text-black">
      {/* Header */}
      <header className="sticky top-0 z-50 border-b border-black/10 bg-white/75 backdrop-blur">
        <div className="mx-auto flex h-14 max-w-[1040px] items-center justify-between px-6">
          <div className="flex items-center gap-3">
            <div className="relative h-8 w-8 overflow-hidden rounded-full border border-black/10">
              <Image
                src="/images/profile.JPEG"
                alt="Seongmin Park profile"
                fill
                sizes="32px"
                priority
                className="object-cover object-[50%_15%]"
              />
            </div>
            <div className="text-[13px]">
              <span className="font-semibold">Seongmin Park</span>
              <span className="mx-2 text-black/20">·</span>
              <span className="text-black/55">Data · AI · System-Oriented Problem Solver</span>
            </div>
          </div>

          <nav className="hidden md:flex items-center gap-5">
            <NavLink
              href="/en/projects"
              label="Projects"
              onClick={() => track("nav_click", { target: "projects" })}
            />

            <ResumeInternalLink
              className="text-[13px] text-black/60 hover:text-black transition"
              onClick={() => track("nav_click", { target: "resume_overview" })}
            >
              Resume
            </ResumeInternalLink>

            <NavLink
              href="#contact"
              label="Contact"
              onClick={() => track("nav_click", { target: "contact" })}
            />

            {/* ✅ KO / EN */}
            <LanguageSwitch />
          </nav>
        </div>
      </header>

      <main className="mx-auto max-w-[1040px] px-6">
        {/* Hero */}
        <section className="pt-16 pb-10">
          <div className="flex flex-col gap-6">
            <div className="flex flex-wrap gap-2">
              <Pill>PORTFOLIO · 2026</Pill>
              <Pill>One Mind, Multiple Systems</Pill>
            </div>

            <h1 className="text-[42px] leading-[1.06] tracking-[-1.2px] font-semibold">
              One Mind, Multiple Systems
              <br />
              Translating complex reality into decision systems.
            </h1>

            <p className="max-w-[86ch] text-[15px] leading-8 text-black/60">
              Experience across different domains, consistently solved with a single thinking structure.
              Across architecture, aesthetics, and data/AI, the recurring focus has been structure.
            </p>

            
          </div>
        </section>

        <div className="my-6 h-px bg-black/10" />

        {/* Introduction */}
        <section className="py-10">
          <SectionTitle
            eyebrow="INTRODUCTION"
            title="Different contexts, one thinking structure"
            desc="In architecture, I designed space and relations. In aesthetics, I structured sensation and meaning. In data and AI, I translated complex reality into decision systems."
          />

          <div className="grid gap-6 md:grid-cols-2">
            <Card>
              <p className="text-[12px] text-black/45">Key stance</p>
              <p className="mt-3 text-[14px] leading-7 text-black/70">
                Prioritize systemic causes that generate repetition over surface phenomena.
              </p>
              <ul className="mt-4 space-y-2 text-[13.5px] leading-7 text-black/60">
                <li>• Define sensation as an observable variable, not an emotion</li>
                <li>• Treat complexity as something to reorganize, not remove</li>
                <li>• Design decision criteria rather than presenting “the answer”</li>
              </ul>
            </Card>

            <Card>
              <p className="text-[12px] text-black/45">Working framework</p>
              <div className="mt-4 space-y-4">
                <div className="border-l border-black/10 pl-3">
                  <p className="text-[13px] font-medium">Perception</p>
                  <p className="mt-1 text-[13px] leading-6 text-black/60">
                    Observe recurring patterns across sensation, space, and data.
                  </p>
                </div>
                <div className="border-l border-black/10 pl-3">
                  <p className="text-[13px] font-medium">Abstraction</p>
                  <p className="mt-1 text-[13px] leading-6 text-black/60">
                    Redefine the problem as a conceptual model and structure.
                  </p>
                </div>
                <div className="border-l border-black/10 pl-3">
                  <p className="text-[13px] font-medium">Execution</p>
                  <p className="mt-1 text-[13px] leading-6 text-black/60">
                    Implement it as a system, prototype, and operable workflow.
                  </p>
                </div>
              </div>
            </Card>
          </div>
        </section>

        <div className="my-10 h-px bg-black/10" />

        {/* Project overview */}
        <section className="py-10">
          <SectionTitle
            eyebrow="PROJECT OVERVIEW"
            title="One thinking system, validated across different contexts"
            desc="Across data analytics and AI platforms, public-data decision support, and relationship/experience design, these projects demonstrate a repeatable loop: structure → execution → scale."
          />

          <div className="grid gap-4 md:grid-cols-3">
            <MiniProject
              title="Skin Diary AI"
              subtitle="Defining skin as a time-based sequence of states, implemented as a condition-based decision structure using images + weather."
              href="/en/projects/skin-diary-ai"
              tags={["AI", "CV", "Weather", "Decision Layer"]}
            />
            <MiniProject
              title="Empty House CPS"
              subtitle="A public-data decision system that reframes vacant houses as spatial state entities with a conversion potential score (CPS)."
              href="/en/projects/empty-house-cps"
              tags={["Public Data", "Scoring", "Map", "Report"]}
            />
            <MiniProject
              title="PMCC"
              subtitle="Operating a sustainable relationship system by treating connection as a designable experience—running + coffee conversations + language rules."
              href="/en/projects/pmcc"
              tags={["Community", "CX", "Language Design", "NPS"]}
            />
          </div>
        </section>

        <div className="my-10 h-px bg-black/10" />

        {/* Root of Thinking */}
        <RootOfThinkingSection />

        <div className="my-10 h-px bg-black/10" />

        {/* Contact */}
        <section id="contact" className="pb-20 pt-10">
          <SectionTitle eyebrow="CONTACT" title="Contact" />

          <div className="flex flex-wrap items-center gap-3">
            <button
              onClick={toggleEmailBanner}
              className="rounded-full bg-black px-4 py-2 text-[13px] font-medium text-white hover:opacity-90 transition"
            >
              Email
            </button>

            <ResumeInternalLink
              className="rounded-full border border-black/10 bg-white px-4 py-2 text-[13px] font-medium text-black/70 hover:text-black transition"
              onClick={() => track("cta_click", { cta: "resume_overview", location: "contact_section" })}
            >
              Resume (Overview)
            </ResumeInternalLink>

            <NotionOverviewLink
              className="rounded-full border border-black/10 bg-white px-4 py-2 text-[13px] font-medium text-black/70 hover:text-black transition"
              onClick={() => track("cta_click", { cta: "notion_overview", location: "contact_section" })}
            >
              Notion Overview
            </NotionOverviewLink>
          </div>

          {showEmail && (
            <div className="mt-4 inline-flex items-center gap-3 rounded-full border border-black/10 bg-white px-4 py-2 shadow-sm">
              <span className="text-[13px] text-black/80">{EMAIL}</span>
              <button
                onClick={copyEmail}
                className="text-[12px] font-medium text-black/60 hover:text-black transition"
              >
                Copy
              </button>
            </div>
          )}

          {copied && (
            <div className="mt-3 inline-flex rounded-full border border-black/10 bg-white px-4 py-2 text-[12.5px] text-black/70 shadow-sm">
              Email address copied to clipboard.
            </div>
          )}
        </section>
      </main>
    </div>
  );
}
