"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import RootOfThinkingSection from "./components/root-thinking/RootOfThinkingSection";
import { track } from "@vercel/analytics";

/* ---------- 공통 컴포넌트 ---------- */

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
    <h2 className="mt-2 text-[18px] font-semibold tracking-[-0.2px]">
      {title}
    </h2>
    {desc && (
      <p className="mt-3 text-[13.5px] leading-7 text-black/60">{desc}</p>
    )}
  </div>
);

const Card = ({ children }: { children: React.ReactNode }) => (
  <div className="rounded-[22px] border border-black/10 bg-white p-6 shadow-[0_1px_2px_rgba(0,0,0,0.06),0_12px_30px_rgba(0,0,0,0.06)]">
    {children}
  </div>
);

/* ---------- 링크 유틸 ---------- */

const ResumeInternalLink = ({
  className,
  children,
  onClick,
}: {
  className?: string;
  children: React.ReactNode;
  onClick?: () => void;
}) => (
  <Link href="/resume" className={className} onClick={onClick}>
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
    // ✅ Contact 섹션에서 Email 버튼 클릭 트래킹
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

    // ✅ Copy 클릭 트래킹
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
                alt="박성민 프로필"
                fill
                sizes="32px"
                priority
                className="object-cover object-[50%_15%]"
              />
            </div>
            <div className="text-[13px]">
              <span className="font-semibold">박성민</span>
              <span className="mx-2 text-black/20">·</span>
              <span className="text-black/55">
                Data · AI · System-Oriented Problem Solver
              </span>
            </div>
          </div>

          <nav className="hidden md:flex items-center gap-5">
            <NavLink
              href="/projects"
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
          </nav>
        </div>
      </header>

      <main className="mx-auto max-w-[1040px] px-6">
        {/* 중간 섹션들 그대로 */}
        <RootOfThinkingSection />

        <div className="my-10 h-px bg-black/10" />

        {/* ---------- Contact ---------- */}
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
              Resume(Overview)
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
              이메일 주소가 클립보드에 복사되었습니다.
            </div>
          )}
        </section>
      </main>
    </div>
  );
}
