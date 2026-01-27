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
        서로 다른 문제를 다뤘지만, 모든 프로젝트는 동일한 사고 구조에서 출발했습니다.
        이 섹션은 결과를 반복 가능하게 만든 사고의 기준을 설명합니다.
      </p>

      <div className="mt-10 grid gap-4 md:grid-cols-3">
        <div className="rounded-[22px] border border-black/10 bg-white p-5">
          <p className="text-[12px] text-black/45">Time · Ritornello</p>
          <h3 className="mt-2 text-[15px] font-semibold">
            Designing repetition to reduce uncertainty
          </h3>
          <p className="mt-3 text-[13.5px] leading-6 text-black/70">
            반복은 감성적 위로가 아니라, 시간을 안정화하는 인지 구조입니다.
            예측 가능한 리듬은 판단을 줄이고,
            행동을 ‘결정’이 아니라 ‘루틴’으로 전환합니다.
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
            사용자는 이해하기 전에 이미 안전함과 위험함을 판단합니다.
            감각은 논리보다 먼저 신뢰의 방향을 결정합니다.
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
            의미와 리스크는 요소들이 연결되는 방식에서 발생합니다.
          </p>
          <p className="mt-3 text-[12px] text-black/45">
            Applied in Empty House CPS
          </p>
        </div>
      </div>

      <div className="mt-8">
        <Link
          href="/thinking"
          className="inline-flex items-center rounded-full border border-black/10 bg-black px-5 py-2 text-[13px] font-medium text-white hover:bg-black/90 transition"
        >
          Explore the thinking architecture →
        </Link>
      </div>
    </section>
  );
}
