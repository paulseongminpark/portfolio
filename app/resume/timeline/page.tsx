// app/resume/timeline/page.tsx
import Link from "next/link";

type TimelineItem = {
  period: string;
  org: string;
  sub?: string;
  role: string;
  summary: string;
  execution: string[];
  result: string[];
};

const SectionLabel = ({ children }: { children: React.ReactNode }) => (
  <p className="font-mono text-[11px] uppercase tracking-[0.18em] text-black/35">
    {children}
  </p>
);

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
    </div>
  </section>
);

export default function ResumeTimelinePage() {
  const items: TimelineItem[] = [
    {
      period: "2025.04.28 – 2025.08.22",
      org: "아시아경제 Data Analytics & AI Bootcamp",
      role: "System Designer / PM (Data Analyst 병행)",
      summary:
        "데이터 분석 도구를 활용해 문제를 의사결정 구조와 시스템으로 설계·구현한 경험",
      execution: [
        "총 3개 프로젝트에서 전체 시스템 구조 및 실행 흐름 설계",
        "문제를 기능 단위가 아닌 상태(State)·변수·조건 간 관계 구조로 정의",
        "데이터 수집–정제–분석–출력을 하나의 판단 구조로 연결",
        "조건 기반 알고리즘 및 핵심 로직 설계 주도",
        "미학·인문학적 사고를 응용해 사용자 행동과 정책 판단을 구조화",
      ],
      result: ["아시아경제 부트캠프 Demo Day 최종 2위 수상", "SQLD 자격증 취득"],
    },
    {
      period: "2024 – Present",
      org: "PMCC (Peer Mile Coffee Club)",
      role: "Founder / System Designer",
      summary: "러닝과 대화를 결합한 커뮤니티를 관계 형성 시스템으로 설계·운영",
      execution: [
        "러닝 + 커피 대화 기반 커뮤니티 포맷 설계",
        "수평적 언어 규칙 및 피드포워드 대화 구조 정의",
        "커뮤니티 운영을 위한 CX / NPS 설문 구조 설계",
        "정성적 경험 데이터를 운영 판단에 활용 가능한 구조로 전환",
      ],
      result: [
        "누적 참여자 168명 이상",
        "커뮤니티 리텐션 약 85% 유지",
        "관계의 질을 운영 가능한 시스템으로 전환",
      ],
    },
    {
      period: "2022 – 2024",
      org: "대한민국 특수전사령부 제9공수특전여단 | 특수작전팀",
      sub: "ROTC 중위 전역",
      role: "중대급 작전 수행 부팀장",
      summary:
        "고위험·고압 환경에서 팀 단위 의사결정과 실행을 안정화하는 구조 보조 설계",
      execution: [
        "제한된 시간과 자원 하에서 작전 수행을 위한 의사결정 흐름 정리",
        "작전 브리핑 구조 개선 및 임무 전 판단 기준 명확화",
        "훈련 및 작전 이후 리뷰(AAR) 프로세스 정리",
        "팀 내 역할 분배와 상황 변화에 따른 판단 지원",
      ],
      result: ["반복 임무 수행 안정성 향상", "팀 단위 의사결정 속도 및 일관성 개선"],
    },
    {
      period: "2017 – 2022",
      org: "홍익대학교 | 예술학과",
      sub: "자율전공학부 입학",
      role: "학부 과정(미학 중심) / 실내건축 스튜디오 수강",
      summary:
        "감각적 현상을 구조와 관계 중심으로 해석하는 사고 방식을 확립하고, 이를 시스템·데이터 설계로 확장할 기반을 형성",
      execution: [
        "미학, 예술철학, 현대 예술 이론 중심 학습",
        "실내건축 스튜디오 5학기 수강: 공간·동선·사용자 경험을 구조적으로 설계하는 훈련 수행",
        "졸업 논문: 현대 음악을 매체로 한 미학적·철학적 분석 수행",
      ],
      result: [
        "감각/경험을 구조로 번역하는 해석 프레임 정립",
        "이후 의사결정 구조 및 시스템 설계로 사고 확장의 토대 확보",
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
          이 페이지는 실제 수행 이력을 연도 기준으로
          정리한 참고 자료입니다.
        </p>

        {/* ✅ 상단 네비 버튼: Overview + Home */}
        <div className="mt-6 flex flex-wrap gap-3">
          <Link
            href="/resume"
            className="inline-flex h-10 items-center justify-center rounded-full border border-black/10 bg-white px-5 text-[13px] font-medium text-black/70 hover:text-black transition"
          >
            ← Back to Resume(Overview)
          </Link>

          <Link
            href="/"
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
