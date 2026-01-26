import Image from "next/image";
import Link from "next/link";
import RootOfThinkingSection from "./components/root-thinking/RootOfThinkingSection";

const NavLink = ({ href, label }: { href: string; label: string }) => (
  <a
    href={href}
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
    {eyebrow ? <p className="text-[12px] text-black/45">{eyebrow}</p> : null}
    <h2 className="mt-2 text-[18px] font-semibold tracking-[-0.2px]">
      {title}
    </h2>
    {desc ? (
      <p className="mt-3 text-[13.5px] leading-7 text-black/60">{desc}</p>
    ) : null}
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
  <Link
    href={href}
    className="block rounded-[18px] border border-black/10 bg-white p-5 hover:shadow-[0_1px_2px_rgba(0,0,0,0.06),0_12px_30px_rgba(0,0,0,0.06)] transition"
  >
    <div className="flex items-baseline justify-between gap-3">
      <h3 className="text-[15px] font-semibold tracking-[-0.15px]">{title}</h3>
      <span className="text-[12px] text-black/45">보기 ↗</span>
    </div>
    <p className="mt-2 text-[13.5px] leading-7 text-black/60">{subtitle}</p>
    <div className="mt-3 flex flex-wrap gap-2">
      {tags.map((t) => (
        <Pill key={t}>{t}</Pill>
      ))}
    </div>
  </Link>
);

/**
 * ✅ 내부 Resume(포트폴리오 인덱스)로만 이동하는 링크
 * - Home/헤더/컨택트에서 "Resume"는 무조건 /resume
 */
const ResumeInternalLink = ({
  className,
  children,
}: {
  className?: string;
  children: React.ReactNode;
}) => (
  <Link href="/resume" className={className}>
    {children}
  </Link>
);

/**
 * ✅ 외부 Notion Overview 링크 (있을 때만 노출)
 * - 버튼/링크 문구도 "Notion Overview"로 명확히 구분
 */
const NotionOverviewLink = ({
  className,
  children,
}: {
  className?: string;
  children: React.ReactNode;
}) => {
  const url = process.env.NEXT_PUBLIC_RESUME_URL?.trim();
  if (!url) return null;

  return (
    <a href={url} target="_blank" rel="noreferrer" className={className}>
      {children}
    </a>
  );
};

export default function Page() {
  return (
    <div className="min-h-screen bg-white text-black">
      {/* Header */}
      <header className="sticky top-0 z-50 border-b border-black/10 bg-white/75 backdrop-blur">
        <div className="mx-auto flex h-14 max-w-[1040px] items-center justify-between px-6">
          <div className="flex items-center gap-3">
            <div className="relative h-8 w-8 overflow-hidden rounded-full border border-black/10 bg-white">
              <Image
                src="/images/profile.JPEG"
                alt="박성민 프로필"
                fill
                sizes="32px"
                priority
                className="object-cover object-[50%_15%] scale-[1.0]"
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

          <nav className="hidden items-center gap-5 md:flex">
            <NavLink href="/projects" label="Projects" />

            {/* ✅ 여기: Resume는 내부 /resume 로 고정 */}
            <ResumeInternalLink className="text-[13px] text-black/60 hover:text-black transition">
              Resume
            </ResumeInternalLink>

            {/* ✅ 옵션: 헤더에 Notion Overview도 보여주고 싶으면 주석 해제 */}
            {/* 
            <NotionOverviewLink className="text-[13px] text-black/60 hover:text-black transition">
              Notion Overview
            </NotionOverviewLink>
            */}

            <NavLink href="#contact" label="Contact" />
          </nav>
        </div>
      </header>

      <main className="mx-auto max-w-[1040px] px-6">
        {/* Hero */}
        <section className="pt-16 pb-10">
          <div className="flex flex-col gap-6">
            <div className="flex flex-wrap gap-2">
              <Pill>PORTFOLIO · 2026</Pill>
              <Pill>하나의 사고, 여러 시스템</Pill>
            </div>

            <h1 className="text-[42px] leading-[1.06] tracking-[-1.2px] font-semibold">
              하나의 사고, 여러 시스템
              <br />
              복잡한 현실을 의사결정 시스템으로 번역합니다.
            </h1>

            <p className="max-w-[86ch] text-[15px] leading-8 text-black/60">
              서로 다른 영역의 문제를 하나의 사고 구조로 해결해 온 경험을 보유하고
              있습니다. 건축·미학·데이터/AI에서 일관되게 다루어 온 대상은
              구조(Structure)였습니다.
            </p>

            <div className="flex flex-wrap gap-3">
              <Link
                href="/projects"
                className="inline-flex h-10 items-center justify-center rounded-full bg-black px-5 text-[13px] font-medium text-white hover:opacity-90 transition"
              >
                프로젝트 보기
              </Link>

              {/* ✅ 여기: '이력서(1페이지)' = 내부 Resume Overview로 */}
              <ResumeInternalLink className="inline-flex h-10 items-center justify-center rounded-full border border-black/10 bg-white px-5 text-[13px] font-medium text-black/70 hover:text-black transition">
                Resume(Overview) 보기
              </ResumeInternalLink>

              {/* ✅ 여기: Notion은 별도 버튼(있을 때만 노출) */}
              <NotionOverviewLink className="inline-flex h-10 items-center justify-center rounded-full border border-black/10 bg-white px-5 text-[13px] font-medium text-black/70 hover:text-black transition">
                Notion Overview
              </NotionOverviewLink>
            </div>
          </div>
        </section>

        <div className="my-10 h-px bg-black/10" />

        {/* Introduction */}
        <section className="py-10">
          <SectionTitle
            eyebrow="INTRODUCTION"
            title="서로 다른 환경, 동일한 사고 구조"
            desc="건축에서는 공간과 관계를 설계하였고, 미학에서는 감각과 의미를 구조화하였으며, 데이터와 인공지능 영역에서는 복잡한 현실을 의사결정 시스템으로 번역해 왔습니다."
          />

          <div className="grid gap-6 md:grid-cols-2">
            <Card>
              <p className="text-[12px] text-black/45">핵심 관점</p>
              <p className="mt-3 text-[14px] leading-7 text-black/70">
                표면 현상보다 반복을 만드는 시스템적 원인을 우선 분석합니다.
              </p>
              <ul className="mt-4 space-y-2 text-[13.5px] leading-7 text-black/60">
                <li>• 감각은 감정이 아닌 관찰·측정 가능한 변수로 정의</li>
                <li>• 복잡성은 제거 대상이 아니라 재배열 대상</li>
                <li>• 해결책은 정답 제시가 아닌 의사결정 기준 설계</li>
              </ul>
            </Card>

            <Card>
              <p className="text-[12px] text-black/45">문제 해결 흐름</p>
              <div className="mt-4 space-y-4">
                <div className="border-l border-black/10 pl-3">
                  <p className="text-[13px] font-medium">관찰</p>
                  <p className="mt-1 text-[13px] leading-6 text-black/60">
                    감각·공간·데이터 전반에서 반복되는 패턴을 관찰합니다.
                  </p>
                </div>
                <div className="border-l border-black/10 pl-3">
                  <p className="text-[13px] font-medium">구조화</p>
                  <p className="mt-1 text-[13px] leading-6 text-black/60">
                    문제를 개념 모델과 구조로 재정의합니다.
                  </p>
                </div>
                <div className="border-l border-black/10 pl-3">
                  <p className="text-[13px] font-medium">구현</p>
                  <p className="mt-1 text-[13px] leading-6 text-black/60">
                    시스템, 시제품, 운영 가능한 형태로 구현합니다.
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
            title="사고 체계가 다른 환경에서 검증된 방식"
            desc="데이터 분석·인공지능 플랫폼 구축, 공공데이터 기반 의사결정 지원, 관계/경험 구조 설계를 통해 ‘구조 → 실행 → 확장’의 반복 가능성을 보여줍니다."
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

        <RootOfThinkingSection />

        <div className="my-10 h-px bg-black/10" />

        {/* Contact */}
        <section id="contact" className="pb-20 pt-10">
          <SectionTitle eyebrow="CONTACT" title="Contact" />
          <div className="flex flex-wrap gap-3">
            <a
              href="mailto:paulseongminpark@gmail.com"
              className="rounded-full bg-black px-4 py-2 text-[13px] font-medium text-white hover:opacity-90 transition"
            >
              Email
            </a>

            {/* ✅ 여기: Contact의 이력서 버튼도 내부 /resume 로 */}
            <ResumeInternalLink className="rounded-full border border-black/10 bg-white px-4 py-2 text-[13px] font-medium text-black/70 hover:text-black transition">
              Resume(Overview)
            </ResumeInternalLink>

            {/* ✅ 여기: Notion Overview는 보조 */}
            <NotionOverviewLink className="rounded-full border border-black/10 bg-white px-4 py-2 text-[13px] font-medium text-black/70 hover:text-black transition">
              Notion Overview
            </NotionOverviewLink>

            <Link
              href="/projects"
              className="rounded-full border border-black/10 bg-white px-4 py-2 text-[13px] font-medium text-black/70 hover:text-black transition"
            >
              프로젝트
            </Link>
          </div>
        </section>
      </main>
    </div>
  );
}
