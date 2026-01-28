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
    descriptions: string[]; // Changed from bullets to prose (descriptions)
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
    deck:
      'Repetition is not emotional comfort, but the minimal unit of structure that controls anxiety within unpredictable time.',
    concept: [
      "Deleuze describes the ritornello in <A Thousand Plateaus> as follows: \"A child in the dark sings a song. The song pushes back chaos and creates an invisible safety zone around the child.\"",
      'The core of this metaphor is clear. Repetition is not a simple habit, but a survival architecture that secures the minimal territory (Territory) I can control within unpredictable time (Chaos).',
    ],
    howStudied: [
      "During university, I experienced this concept while analyzing Steve Reich's minimalist music <Piano Phase>. When the same piano pattern repeats mechanically, listeners experience extreme immersion rather than boredom.",
      'This is because when the rhythm shifts slightly out of sync, the brain sharpens its focus to predict the next pattern. Here I learned that "repetition is the device that most powerfully locks the brain onto a specific temporal axis."',
    ],
    scientificBridge: [
      "This intuition is proven by cognitive science's Predictive Coding theory. The brain consumes massive energy when predictions fail (Error).",
      'In contrast, perfectly predictable repetition (Loop) structure minimizes the brain\'s energy consumption, inducing "Cognitive Ease" and "automated behavior."',
    ],
    howApplied: {
      title: 'Engineering Translation: Time Architecture',
      descriptions: [
        'In the PMCC community design, I removed all variables of "when, where, how," hardcoding time, location, and format as constants.',
        'When designed so users would not ask "what should I do this time?", participation became not a conscious choice but an auto-executing loop.',
        'In Skin Diary, I also maintained consistent recording intervals and interaction tempo, creating a structure where users did not need to interpret meaning every time.',
      ],
      result: [
        'The ritornello operated as a temporal design principle that guided behavior through "structure" rather than persuasion in both projects.',
      ],
      links: [
        // ✅ EN 라우트로 수정
        { href: '/en/projects/pmcc', label: 'View applied project → PMCC' },
        { href: '/en/projects/skin-diary-ai', label: 'View applied project → Skin Diary' },
      ],
    },
  },
  {
    key: 'space',
    label: '02 · Space Layer',
    title: 'Rhizome — Relationship-based Structure',
    deck:
      'Tree structure is strong at classification but cannot explain state transitions. The problem is not in the data but in the relationships between data.',
    concept: [
      'If a tree is a vertical hierarchy extending from roots to branches, a rhizome is a (n-1) connection network extending horizontally like underground stems without a center.',
      'Here, what matters is not "which folder does it belong to" but "what connects to what." When heterogeneous data connect accidentally, hidden context emerges.',
    ],
    howStudied: [
      "I concretized this concept while analyzing architect SANAA (Kazuyo Sejima)'s <Rolex Learning Center>. This building has no walls, no corridors, no center. On a gently sloped floor, library users and cafe users freely cross and mix.",
      'When physical hierarchy (walls) was removed, I witnessed people\'s behavior patterns expanding in an unpredictable network (Graph) form.',
    ],
    scientificBridge: [
      'According to complexity theory, system risks and opportunities occur not in the properties of individual elements (Nodes) but in the invisible connections (Edges) between elements.',
      'Tree-structured data classification organizes well but cannot explain state transitions caused by interactions between data.',
    ],
    howApplied: {
      title: 'Engineering Translation: Relationship Architecture',
      descriptions: [
        'In the Empty House CPS project, I shifted the question from "how many vacant houses are there?" to "what combination of conditions causes spaces to stagnate?"',
        'I abandoned table-centered thinking and introduced a relational architecture that explicitly defines elements as nodes and influences between conditions as edges.',
        'On this structure, I could track how aging buildings, elderly population, and reduced accessibility change the state of space through specific sequences and combinations.',
      ],
      result: [
        'The rhizome operated here as a relational architecture (Graph Model) that enabled handling complex spatial problems.',
      ],
      links: [
        // ✅ EN 라우트로 수정
        { href: '/en/projects/empty-house-cps', label: 'View applied project → Empty House CPS' },
      ],
    },
  },
  {
    key: 'sensation',
    label: '03 · Sensation Layer',
    title: 'Logic of Sensation — Pre-cognitive UX',
    deck:
      'Logic always arrives late. Sensation is faster than understanding, and repetition organizes the body before meaning.',
    concept: [
      'Deleuze says in <The Logic of Sensation>: "Painting strikes the nervous system directly, not the brain." Images shake the body first, before they are understood (Narrative) by the mind.',
      'This is called affect. Meaning always arrives later than sensation.',
    ],
    howStudied: [
      "During university aesthetics research, I analyzed Francis Bacon's <Study after Velázquez's Portrait of Pope Innocent X>. Before we think \"why is the Pope screaming?\" (narrative) when viewing this painting, we feel the neurotic shudder from the roughly drawn crosshatching and purple colors in 0.1 seconds.",
      'The body reacts first before the brain interprets—this is the immediacy of sensation.',
    ],
    scientificBridge: [
      "According to behavioral economics' Dual Process Theory, intuitive System 1 (0.1 seconds) is always faster than logical System 2 (0.5 seconds).",
      'Long before users judge a UI as "this function is useful," the feeling from colors and shapes has already determined trust (Reject or Accept).',
    ],
    howApplied: {
      title: 'Engineering Translation: Sensation Architecture',
      descriptions: [
        'Asking patients to "take a photo of your skin" causes psychological pain. Instead of logical persuasion, I designed sensory anesthesia.',
        'I removed red, which signifies warning, from the codebase and applied Tea Rose colors and soft blur motion that stabilize the nervous system.',
        "As a result, users were sensorially disarmed and could complete photo capture before reading the app's security policy. This is the pre-cognitive UX I designed.",
      ],
      result: [
        'The sensory layer functioned not as simple styling but as a pre-cognitive architecture that lowers entry barriers.',
      ],
      links: [
        // ✅ EN 라우트로 수정
        { href: '/en/projects/skin-diary-ai', label: 'View applied project → Skin Diary' },
      ],
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
            <span
              className={`h-1.5 w-1.5 rounded-full transition-colors duration-300 ${
                isOpen ? 'bg-[#2563EB]' : 'bg-black/20 group-hover:bg-[#2563EB]'
              }`}
            />
            <p className="font-mono text-[11px] font-medium uppercase tracking-wider text-black/50">
              {block.label}
            </p>
          </div>

          <h2
            className={`mt-3 text-[24px] font-semibold leading-tight tracking-[-0.02em] transition-colors duration-300 ${
              isOpen ? 'text-[#2563EB]' : 'text-black group-hover:text-[#2563EB]'
            }`}
          >
            {block.title}
          </h2>

          <p className="mt-4 max-w-[800px] text-[15px] leading-7 text-black/70 word-keep-all">
            {block.deck}
          </p>
        </div>

        {/* Toggle Indicator */}
        <div className="mt-2 shrink-0 md:mt-0">
          <span
            className={`inline-block text-[12px] font-medium text-black/40 transition-transform duration-300 ${
              isOpen ? 'rotate-180 text-[#2563EB]' : ''
            }`}
          >
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
                <p className="mb-3 text-[12px] font-bold text-black uppercase tracking-wide">
                  Concept Origin
                </p>
                <div className="space-y-3 text-[14px] leading-7 text-black/70 word-keep-all">
                  {block.concept.map((t, i) => (
                    <p key={i}>{t}</p>
                  ))}
                </div>
              </div>

              {/* 2. Study */}
              <div className="pl-4 border-l border-black/10">
                <p className="mb-3 text-[12px] font-bold text-black uppercase tracking-wide">
                  How I Studied It
                </p>
                <div className="space-y-3 text-[14px] leading-7 text-black/70 word-keep-all">
                  {block.howStudied.map((t, i) => (
                    <p key={i}>{t}</p>
                  ))}
                </div>
              </div>

              {/* 3. Scientific Bridge (Highlighted) */}
              <div className="relative overflow-hidden rounded-xl bg-[#2563EB]/[0.03] p-6 border border-[#2563EB]/10">
                <div className="absolute top-0 left-0 w-1 h-full bg-[#2563EB]/30" />
                <p className="mb-3 text-[12px] font-bold text-[#2563EB] uppercase tracking-wide">
                  Scientific Bridge
                </p>
                <div className="space-y-3 text-[14px] leading-7 text-black/80 font-medium word-keep-all">
                  {block.scientificBridge.map((t, i) => (
                    <p key={i}>{t}</p>
                  ))}
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
                    <p key={i} className="text-[13.5px] leading-6 text-black/80 font-medium">
                      {t}
                    </p>
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
        <p className="font-mono text-[12px] uppercase tracking-widest text-[#2563EB] mb-4">
          Thinking Architecture
        </p>
        <h1 className="text-[42px] font-semibold tracking-[-0.03em] leading-tight text-black mb-6">
          Root of Thinking
        </h1>
        <p className="max-w-[640px] text-[16px] leading-8 text-black/60 word-keep-all">
          This page explains not the results of projects but the thinking structure that made those results
          repeatable.
          <span className="block mt-2 text-black/80 font-medium">
            Ritornello addresses time, Rhizome addresses space, and Logic of Sensation addresses sensory
            delay.
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
          <p className="font-mono text-[11px] uppercase tracking-wider text-black/40 mb-2">
            System Integration
          </p>
          <h3 className="text-[20px] font-semibold text-black">Why it works together</h3>
        </div>
        <div className="md:col-span-8">
          <p className="text-[15px] leading-8 text-black/70 word-keep-all">
            <strong className="text-black">Time (Ritornello):</strong> Ritornello addresses time,
            <br />
            <strong className="text-black">Space (Rhizome):</strong> Rhizome addresses space,
            <br />
            <strong className="text-black">Sensation (Logic of Sensation):</strong> Logic of Sensation
            addresses sensory delay.
            <br />
            <br />
            These three layers operate not sequentially but as a single system simultaneously.
          </p>
        </div>
      </div>

      {/* Back to Home Button */}
      <div className="mt-16 flex justify-center">
        {/* ✅ EN 홈으로 수정 */}
        <Link
          href="/en"
          className="inline-flex items-center justify-center rounded-full border border-black/10 bg-white px-6 py-3 text-[13px] font-semibold text-black/80 transition hover:border-[#2563EB] hover:text-[#2563EB] shadow-sm hover:shadow-md"
        >
          Return to Home →
        </Link>
      </div>
    </section>
  );
}
