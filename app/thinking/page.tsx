'use client';

import { useState } from 'react';
import Link from 'next/link';

// 데이터 타입 정의
type Block = {
  key: string;
  label: string;
  title: string;
  deck: string;
  concept: string[];
  howStudied: string[];
  scientificBridge: string[];
  howApplied: {
    title: string;
    descriptions: string[]; // 불렛 대신 줄글(descriptions)로 변경
    result: string[];
    links: { href: string; label: string }[];
  };
};

// ✅ 업데이트된 콘텐츠 (요청하신 텍스트 반영 & 불렛 제거를 위한 데이터 구조)
const blocks: Block[] = [
  {
    key: 'time',
    label: '01 · Time Layer',
    title: 'Ritornello — Designing Repetition',
    deck: '반복은 감정적 위로가 아니라, 예측 불가능한 시간 속에서 불안을 통제하는 최소 단위의 구조입니다.',
    concept: [
      '들뢰즈는 『천 개의 고원』에서 리토르넬로를 이렇게 묘사합니다. "어둠 속의 아이가 노래를 부른다. 그 노래는 혼돈을 밀어내고, 아이 주변에 보이지 않는 안전 지대를 만든다."',
      '이 비유의 핵심은 명확합니다. 반복은 단순한 습관이 아니라, 예측 불가능한 시간(Chaos) 속에서 내가 통제할 수 있는 최소한의 영토(Territory)를 확보하는 생존 아키텍처입니다.',
    ],
    howStudied: [
      '대학 시절, 스티브 라이히(Steve Reich)의 미니멀 음악 <Piano Phase>를 분석하며 이 개념을 체감했습니다. 똑같은 피아노 음형이 기계적으로 반복될 때, 청자는 지루함이 아니라 극한의 몰입을 경험합니다.',
      '미세하게 박자가 어긋나는 순간, 뇌가 다음에 올 패턴을 예측하기 위해 신경을 곤두세우기 때문입니다. 여기서 저는 "반복이야말로 뇌를 특정 시간 축에 가장 강력하게 고정(Lock-in)시키는 장치"임을 배웠습니다.',
    ],
    scientificBridge: [
      '이 직관은 인지과학의 예측 부호화(Predictive Coding) 이론으로 증명됩니다. 뇌는 예측이 빗나갈 때(Error) 막대한 에너지를 소모합니다.',
      '반면, 완벽하게 예측 가능한 반복(Loop) 구조는 뇌의 에너지 소모를 최소화하여 "인지적 편안함(Cognitive Ease)"과 "자동화된 행동"을 유도합니다.',
    ],
    howApplied: {
      title: 'Engineering Translation: Time Architecture',
      descriptions: [
        'PMCC 커뮤니티 설계에서 “언제, 어디서, 어떻게”라는 변수를 모두 제거하고, 시간·장소·포맷을 상수(Constant)로 하드코딩했습니다.',
        '사용자가 “이번엔 어떻게 하지?”를 묻지 않도록 설계하자, 참여는 의식적 선택이 아니라 자동 실행되는 루프가 되었습니다.',
        'Skin Diary에서도 기록 주기와 인터랙션 템포를 일정하게 유지해, 사용자가 매번 의미를 해석하지 않아도 되는 구조를 만들었습니다.',
      ],
      result: [
        '리토르넬로는 두 프로젝트에서 행동을 설득이 아니라 “구조”로 유도하는 시간 설계 원리로 작동했습니다.',
      ],
      links: [
        { href: '/projects/pmcc', label: 'View applied project → PMCC' },
        { href: '/projects/skin-diary-ai', label: 'View applied project → Skin Diary' },
      ],
    },
  },
  {
    key: 'space',
    label: '02 · Space Layer',
    title: 'Rhizome — Relationship-based Structure',
    deck: '트리(Tree) 구조는 분류에는 강하지만 상태 전이를 설명하지 못합니다. 문제는 데이터 안에 있지 않고 데이터 사이의 관계에 있습니다.',
    concept: [
      '나무(Tree)가 뿌리에서 가지로 뻗어가는 수직적 위계라면, 리좀(Rhizome)은 땅속줄기처럼 중심 없이 수평적으로 뻗어 나가는(n-1) 접속망입니다.',
      '이곳에서는 "어느 폴더에 속하는가"가 아니라, "무엇과 무엇이 연결되는가"가 중요합니다. 이질적인 데이터들이 우발적으로 접속할 때, 숨겨진 맥락이 창발(Emergence)합니다.',
    ],
    howStudied: [
      '건축가 SANAA(세지마 가즈요)의 <롤렉스 러닝 센터>를 분석하며 이 개념을 구체화했습니다. 이 건물에는 벽도, 복도도, 중심도 없습니다. 완만한 경사로 이루어진 바닥 위에서, 도서관 이용자와 카페 이용자가 자유롭게 가로지르며 섞입니다.',
      '물리적 위계(벽)를 없애자, 사람들의 행동 패턴이 예측 불가능한 네트워크(Graph) 형태로 확장되는 것을 목격했습니다.',
    ],
    scientificBridge: [
      '복잡계 이론에 따르면, 시스템의 리스크와 기회는 개별 요소(Node)의 속성이 아니라, 요소들 사이의 보이지 않는 연결(Edge)에서 발생합니다.',
      '트리 구조의 데이터 분류는 정리는 잘해주지만, 데이터 간의 상호작용으로 인한 상태 전이를 설명하지 못합니다.',
    ],
    howApplied: {
      title: 'Engineering Translation: Relationship Architecture',
      descriptions: [
        '빈집불이(Empty House CPS) 프로젝트에서 “빈집이 얼마나 많은가?”라는 질문을 “어떤 조건 조합이 공간을 멈추게 하는가?”로 전환했습니다.',
        '테이블 중심 사고를 버리고, 요소를 노드(Node)로, 조건 간 영향을 엣지(Edge)로 명시하는 관계 아키텍처를 도입했습니다.',
        '이 구조 위에서 노후 건축, 고령 인구, 접근성 저하가 어떤 순서와 결합으로 공간의 상태를 변화시키는지를 추적할 수 있었습니다.',
      ],
      result: [
        '리좀은 여기서 복잡한 공간 문제를 다룰 수 있게 만드는 관계 아키텍처(Graph Model)로 작동했습니다.',
      ],
      links: [{ href: '/projects/empty-house-cps', label: 'View applied project → Empty House CPS' }],
    },
  },
  {
    key: 'sensation',
    label: '03 · Sensation Layer',
    title: 'Logic of Sensation — Pre-cognitive UX',
    deck: '논리는 항상 늦게 도착합니다. 감각은 이해보다 빠르고, 반복은 의미 이전에 신체를 조직합니다.',
    concept: [
      '들뢰즈는 『감각의 논리』에서 이렇게 말합니다. "그림은 뇌가 아니라 신경계에 직접 타격을 입힌다." 이미지는 머리로 이해(Narrative)하기 전에, 몸을 먼저 흔듭니다.',
      '이를 정동(Affect)이라 부릅니다. 의미는 언제나 감각보다 늦게 도착합니다.',
    ],
    howStudied: [
      '대학 시절 미학 연구를 하며 프란시스 베이컨(Francis Bacon)의 <벨라스케스의 교황>을 분석했습니다. 우리는 이 그림을 보고 "교황이 왜 소리를 지를까?"(서사)를 생각하기 전에, 거칠게 그어진 빗살무늬와 보라색 색채가 주는 신경질적인 전율을 0.1초 만에 느낍니다.',
      '뇌가 해석하기 전에 몸이 먼저 반응하는 것, 이것이 감각의 즉시성입니다.',
    ],
    scientificBridge: [
      '행동경제학의 이중 처리 이론(Dual Process Theory)에 따르면, 직관적인 System 1(0.1초)은 논리적인 System 2(0.5초)보다 항상 빠릅니다.',
      '사용자가 UI를 보고 "이 기능이 유용하다"고 판단하기 훨씬 전에, 색채와 형태가 주는 느낌이 이미 신뢰 여부(Reject or Accept)를 결정해 버립니다.',
    ],
    howApplied: {
      title: 'Engineering Translation: Sensation Architecture',
      descriptions: [
        '환자에게 "피부 사진을 찍으세요"라는 요구는 심리적 고통(Pain)을 줍니다. 저는 논리적 설득 대신 감각적 마취를 설계했습니다.',
        '경고를 뜻하는 붉은색을 코드단에서 제거하고, 신경계를 안정시키는 티로즈(Tea Rose) 컬러와 부드러운 블러 모션을 적용했습니다.',
        '그 결과, 사용자는 앱의 보안 정책을 읽기도 전에 감각적으로 무장해제되어 사진 촬영을 마칠 수 있었습니다. 이것이 제가 설계한 전인지적(Pre-cognitive) UX입니다.',
      ],
      result: [
        '감각 레이어는 단순한 스타일링이 아니라, 진입 장벽을 낮추는 전인지 아키텍처로 기능했습니다.',
      ],
      links: [{ href: '/projects/skin-diary-ai', label: 'View applied project → Skin Diary' }],
    },
  },
];

/* ---------------- UI Components (OpenAI Newsroom Style) ---------------- */

function SectionCard({
  idx,
  block,
  openIdx,
  onToggle,
}: {
  idx: number;
  block: Block;
  openIdx: number | null;
  onToggle: (idx: number) => void;
}) {
  const isOpen = openIdx === idx;

  return (
    <div className="group border-t border-black/10 py-10 transition-all duration-300">
      {/* Header Area */}
      <div 
        className="flex cursor-pointer flex-col gap-4 md:flex-row md:items-start md:justify-between"
        onClick={() => onToggle(idx)}
      >
        <div className="flex-1">
          <div className="flex items-center gap-3">
             {/* Royal Blue Accent Dot */}
            <span className={`h-1.5 w-1.5 rounded-full transition-colors duration-300 ${isOpen ? 'bg-[#2563EB]' : 'bg-black/20 group-hover:bg-[#2563EB]'}`} />
            <p className="font-mono text-[11px] font-medium uppercase tracking-wider text-black/50">
              {block.label}
            </p>
          </div>
          
          <h2 className={`mt-3 text-[24px] font-semibold leading-tight tracking-[-0.02em] transition-colors duration-300 ${isOpen ? 'text-[#2563EB]' : 'text-black group-hover:text-[#2563EB]'}`}>
            {block.title}
          </h2>
          
          <p className="mt-4 max-w-[800px] text-[15px] leading-7 text-black/70 word-keep-all">
            {block.deck}
          </p>
        </div>

        {/* Toggle Indicator */}
        <div className="mt-2 shrink-0 md:mt-0">
           <span className={`inline-block text-[12px] font-medium text-black/40 transition-transform duration-300 ${isOpen ? 'rotate-180 text-[#2563EB]' : ''}`}>
             ↓
           </span>
        </div>
      </div>

      {/* Expanded Content */}
      <div
        className={`grid overflow-hidden transition-[grid-template-rows,opacity,padding] duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] ${
          isOpen ? 'grid-rows-[1fr] opacity-100 pt-10' : 'grid-rows-[0fr] opacity-0 pt-0'
        }`}
      >
        <div className="min-h-0">
          <div className="grid gap-12 lg:grid-cols-12">
            
            {/* Left Column: Theory & Background (Col 7) */}
            <div className="space-y-10 lg:col-span-7">
              {/* 1. Concept */}
              <div className="pl-4 border-l border-black/10">
                <p className="mb-3 text-[12px] font-bold text-black uppercase tracking-wide">Concept Origin</p>
                <div className="space-y-3 text-[14px] leading-7 text-black/70 word-keep-all">
                  {block.concept.map((t, i) => <p key={i}>{t}</p>)}
                </div>
              </div>

              {/* 2. Study */}
              <div className="pl-4 border-l border-black/10">
                <p className="mb-3 text-[12px] font-bold text-black uppercase tracking-wide">How I Studied It</p>
                <div className="space-y-3 text-[14px] leading-7 text-black/70 word-keep-all">
                  {block.howStudied.map((t, i) => <p key={i}>{t}</p>)}
                </div>
              </div>

              {/* 3. Scientific Bridge (Highlighted) */}
              <div className="relative overflow-hidden rounded-xl bg-[#2563EB]/[0.03] p-6 border border-[#2563EB]/10">
                 <div className="absolute top-0 left-0 w-1 h-full bg-[#2563EB]/30" />
                 <p className="mb-3 text-[12px] font-bold text-[#2563EB] uppercase tracking-wide">Scientific Bridge</p>
                 <div className="space-y-3 text-[14px] leading-7 text-black/80 font-medium word-keep-all">
                  {block.scientificBridge.map((t, i) => <p key={i}>{t}</p>)}
                </div>
              </div>
            </div>

            {/* Right Column: Engineering Output (Col 5) */}
            <div className="lg:col-span-5">
              <div className="h-full rounded-[20px] bg-black/[0.03] p-8">
                <p className="mb-4 flex items-center gap-2 text-[12px] font-bold text-black uppercase tracking-wide">
                  <span className="block h-1.5 w-1.5 rounded-full bg-black"></span>
                  Application
                </p>
                
                <h3 className="mb-6 text-[18px] font-semibold leading-snug text-black">
                  {block.howApplied.title}
                </h3>

                {/* ✅ 불렛(ul/li) 제거하고 줄글(descriptions)로 렌더링 */}
                <div className="mb-8 space-y-4 text-[13.5px] leading-7 text-black/70 word-keep-all">
                  {block.howApplied.descriptions.map((t, i) => (
                    <p key={i}>{t}</p>
                  ))}
                </div>

                <div className="mb-8 border-t border-black/5 pt-6">
                  <p className="text-[12px] font-bold text-black/40 mb-2">Key Result</p>
                  {block.howApplied.result.map((t, i) => (
                    <p key={i} className="text-[13.5px] leading-6 text-black/80 font-medium">{t}</p>
                  ))}
                </div>

                <div className="flex flex-col gap-2">
                  {block.howApplied.links.map((l) => (
                    <Link
                      key={l.href}
                      href={l.href}
                      className="inline-flex w-full items-center justify-between rounded-lg bg-white border border-black/5 px-4 py-3 text-[13px] font-medium text-black transition hover:border-[#2563EB] hover:text-[#2563EB] shadow-sm hover:shadow-md"
                    >
                      <span>{l.label}</span>
                      <span>→</span>
                    </Link>
                  ))}
                </div>
              </div>
            </div>

          </div>
        </div>
      </div>
    </div>
  );
}

export default function ThinkingPage() {
  const [openIdx, setOpenIdx] = useState<number | null>(0);

  const onToggle = (idx: number) => {
    setOpenIdx(openIdx === idx ? null : idx);
  };

  return (
    <section className="mx-auto max-w-[1000px] px-6 py-32">
      {/* Intro Header */}
      <div className="mb-20">
        <p className="font-mono text-[12px] uppercase tracking-widest text-[#2563EB] mb-4">Thinking Architecture</p>
        <h1 className="text-[42px] font-semibold tracking-[-0.03em] leading-tight text-black mb-6">
          Root of Thinking
        </h1>
        <p className="max-w-[640px] text-[16px] leading-8 text-black/60 word-keep-all">
          이 페이지는 프로젝트의 결과물이 아니라, 그 결과를 반복 가능하게 만든 사고 구조를 설명합니다.
          <span className="block mt-2 text-black/80 font-medium">
            Ritornello는 시간을, Rhizome은 공간을, Logic of Sensation은 감각의 지연을 다룹니다.
          </span>
        </p>
      </div>

      {/* Cards List */}
      <div className="border-b border-black/10">
        {blocks.map((b, idx) => (
          <SectionCard key={b.key} idx={idx} block={b} openIdx={openIdx} onToggle={onToggle} />
        ))}
      </div>

      {/* Footer / Meta Logic */}
      <div className="mt-24 grid md:grid-cols-12 gap-8">
        <div className="md:col-span-4">
           <p className="font-mono text-[11px] uppercase tracking-wider text-black/40 mb-2">System Integration</p>
           <h3 className="text-[20px] font-semibold text-black">Why it works together</h3>
        </div>
        <div className="md:col-span-8">
          <p className="text-[15px] leading-8 text-black/70 word-keep-all">
            <strong className="text-black">Time (Ritornello):</strong> 반복으로 행동을 자동화하고,<br/>
            <strong className="text-black">Space (Rhizome):</strong> 관계로 상태를 설명하며,<br/>
            <strong className="text-black">Sensation (Logic of Sensation):</strong> 감각으로 진입을 엽니다.<br/><br/>
            이 세 레이어는 순차가 아니라 동시에 작동하는 하나의 시스템입니다.
          </p>
        </div>
      </div>

      {/* Back to Home Button */}
      <div className="mt-16 flex justify-center">
        <Link
          href="/"
          className="inline-flex items-center justify-center rounded-full border border-black/10 bg-white px-6 py-3 text-[13px] font-semibold text-black/80 transition hover:border-[#2563EB] hover:text-[#2563EB] shadow-sm hover:shadow-md"
        >
          홈으로 돌아가기 →
        </Link>
      </div>
    </section>
  );
}