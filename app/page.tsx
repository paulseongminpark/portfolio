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
              <span className="text-black/55">Data · AI · System-Oriented Problem Solver</span>
            </div>
          </div>

          <nav className="hidden md:flex items-center gap-5">
            <NavLink href="/projects" label="Projects" onClick={() => track("nav_click", { target: "projects" })} />

            <ResumeInternalLink
              className="text-[13px] text-black/60 hover:text-black transition"
              onClick={() => track("nav_click", { target: "resume_overview" })}
            >
              Resume
            </ResumeInternalLink>

            <NavLink href="#contact" label="Contact" onClick={() => track("nav_click", { target: "contact" })} />
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
              복잡한 현실을 의사결정 시스템으로 번역합니다.
            </h1>

            <p className="max-w-[86ch] text-[15px] leading-8 text-black/60">
              서로 다른 영역의 문제를 하나의 사고 구조로 해결해 온 경험을 보유하고 있습니다.
              건축·미학·데이터/AI에서 일관되게 다루어 온 대상은 구조(Structure)였습니다.
            </p>

            <div className="flex flex-wrap gap-3">
              <a
                href="/projects"
                onClick={() => track("cta_click", { cta: "selected_projects", location: "hero" })}
                className="inline-flex h-10 items-center justify-center rounded-full bg-black px-5 text-[13px] font-medium text-white hover:opacity-90 transition"
              >
                Selected projects
              </a>

              <ResumeInternalLink
                className="inline-flex h-10 items-center justify-center rounded-full border border-black/10 bg-white px-5 text-[13px] font-medium text-black/70 hover:text-black transition"
                onClick={() => track("cta_click", { cta: "resume_overview", location: "hero" })}
              >
                Resume (1-page)
              </ResumeInternalLink>
            </div>
          </div>
        </section>

        <div className="my-10 h-px bg-black/10" />

        {/* Introduction */}
        <section className="py-10">
          <SectionTitle
            eyebrow="INTRODUCTION"
            title="서로 다른 환경, 동일한 사고 구조"
            desc="건축에서는 공간과 관계를 설계하였고, 미학에서는 감각과 의미를 구조화하였으며, 데이터와 AI 영역에서는 복잡한 현실을 의사결정 시스템으로 번역해 왔습니다."
          />

          <div className="grid gap-6 md:grid-cols-2">
            <Card>
              <p className="text-[12px] text-black/45">Key stance</p>
              <p className="mt-3 text-[14px] leading-7 text-black/70">
                표면 현상보다 반복을 만드는 시스템적 원인을 우선 분석합니다.
              </p>
              <ul className="mt-4 space-y-2 text-[13.5px] leading-7 text-black/60">
                <li>• 감각은 감정이 아닌 관찰 가능한 변수로 정의</li>
                <li>• 복잡성은 제거 대상이 아니라 재배열 대상</li>
                <li>• 해결책은 정답 제시가 아닌 의사결정 기준 설계</li>
              </ul>
            </Card>

            <Card>
              <p className="text-[12px] text-black/45">Working framework</p>
              <div className="mt-4 space-y-4">
                <div className="border-l border-black/10 pl-3">
                  <p className="text-[13px] font-medium">Perception</p>
                  <p className="mt-1 text-[13px] leading-6 text-black/60">
                    감각·공간·데이터 전반에서 반복되는 패턴을 관찰합니다.
                  </p>
                </div>
                <div className="border-l border-black/10 pl-3">
                  <p className="text-[13px] font-medium">Abstraction</p>
                  <p className="mt-1 text-[13px] leading-6 text-black/60">
                    문제를 개념 모델과 구조로 재정의합니다.
                  </p>
                </div>
                <div className="border-l border-black/10 pl-3">
                  <p className="text-[13px] font-medium">Execution</p>
                  <p className="mt-1 text-[13px] leading-6 text-black/60">
                    시스템, 프로토타입, 운영 가능한 형태로 구현합니다.
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
            title="하나의 사고 시스템이 다른 환경에서 검증된 방식"
            desc="데이터 분석·AI 플랫폼 구축, 공공데이터 기반 의사결정 지원, 관계/경험 구조 설계를 통해 ‘구조→실행→확장’의 반복 가능성을 보여줍니다."
          />

          <div className="grid gap-4 md:grid-cols-3">
            <MiniProject
              title="Skin Diary AI"
              subtitle="피부를 시간에 따른 상태(State)의 연속으로 정의하고, 이미지+날씨를 조건 기반 판단 구조로 구현"
              href="/projects/skin-diary-ai"
              tags={["AI", "CV", "Weather", "Decision Layer"]}
            />
            <MiniProject
              title="Empty House CPS"
              subtitle="빈집을 전환 가능성 점수(CPS)를 가진 공간 상태 엔티티로 재정의한 공공데이터 의사결정 시스템"
              href="/projects/empty-house-cps"
              tags={["Public Data", "Scoring", "Map", "Report"]}
            />
            <MiniProject
              title="PMCC"
              subtitle="관계를 설계 가능한 경험으로 보고, 러닝+커피 대화+언어 규칙으로 지속 가능한 관계 시스템을 운영"
              href="/projects/pmcc"
              tags={["Community", "CX", "Language Design", "NPS"]}
            />
          </div>
        </section>

        <div className="my-10 h-px bg-black/10" />

        {/* Root of Thinking (홈 중간에 들어오도록 복구) */}
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
