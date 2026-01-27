/**
 * @codex
 * i18n Phase 1 Skeleton: DO NOT EDIT TEXT/STRUCTURE. 1:1 copy from app/projects/pmcc/page.tsx
 */
"use client";

import Image from "next/image";
import { useEffect, useMemo, useRef, useState } from "react";

/* =========================================================
   PMCC — Project 03 (page.tsx)

   Assets (public):
   /images/projects/pmcc/
     - hero_run_blur.JPG
     - logo_blue.JPG
     - poster_coffee1.JPG
     - visaul_dev_notes.jpeg
     - moodboard.jpeg
     - palette.PNG
     - pmcc_insta1.png ... pmcc_insta5.png
     - pmcc_survey.csv
========================================================= */

/* ---------------- UI Components ---------------- */

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
    <h2 className="mt-2 text-[18px] font-semibold tracking-[-0.2px]">{title}</h2>
    {desc ? (
      <p className="mt-3 text-[13.5px] leading-7 text-black/60">{desc}</p>
    ) : null}
  </div>
);

const Divider = () => <div className="my-16 h-px w-full bg-black/10" />;

const ImgCard = ({
  src,
  alt,
  caption,
  priority,
  aspect = "wide",
  aspectClassName,
  coverClassName,
  contain,
}: {
  src: string;
  alt: string;
  caption?: string;
  priority?: boolean;
  aspect?: "wide" | "square" | "tall";
  aspectClassName?: string;
  coverClassName?: string;
  contain?: boolean;
}) => {
  const aspectCls =
    aspectClassName ??
    (aspect === "square"
      ? "aspect-square"
      : aspect === "tall"
      ? "aspect-[3/4]"
      : "aspect-[16/10]");

  return (
    <figure className="overflow-hidden rounded-[22px] border border-black/10 bg-white">
      <div className={`relative w-full ${aspectCls} overflow-hidden`}>
        <Image
          src={src}
          alt={alt}
          fill
          priority={!!priority}
          sizes="(max-width: 768px) 100vw, 720px"
          className={`${
            contain ? "object-contain" : "object-cover"
          } ${coverClassName ?? "object-center"}`}
        />
        {!contain ? (
          <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/25 via-black/0 to-black/0" />
        ) : null}
      </div>

      {caption ? (
        <figcaption className="px-4 py-3 text-[12px] leading-6 text-black/55">
          {caption}
        </figcaption>
      ) : null}
    </figure>
  );
};

function Modal({
  open,
  onClose,
  title,
  children,
}: {
  open: boolean;
  onClose: () => void;
  title?: string;
  children: React.ReactNode;
}) {
  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", onKey);

    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    return () => {
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = prev;
    };
  }, [open, onClose]);

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-[60]">
      <button
        type="button"
        aria-label="닫기"
        onClick={onClose}
        className="absolute inset-0 bg-black/55"
      />
      <div className="absolute inset-x-0 top-10 mx-auto w-[min(1100px,92vw)] overflow-hidden rounded-[22px] border border-white/10 bg-white shadow-xl">
        <div className="flex items-center justify-between gap-3 border-b border-black/10 px-5 py-4">
          <div className="min-w-0">
            <p className="text-[12px] text-black/45">Preview</p>
            <p className="mt-1 truncate text-[14px] font-semibold text-black/80">
              {title ?? "Detail"}
            </p>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="inline-flex items-center justify-center rounded-full border border-black/10 bg-white px-3 py-1.5 text-[12px] text-black/70 hover:bg-black/[0.03] transition"
          >
            닫기
          </button>
        </div>
        <div className="max-h-[78vh] overflow-auto p-5">{children}</div>
      </div>
    </div>
  );
}

function LightboxImage({
  src,
  alt,
  caption,
  coverClassName,
}: {
  src: string;
  alt: string;
  caption?: string;
  coverClassName?: string;
}) {
  const [open, setOpen] = useState(false);

  return (
    <>
      <button
        type="button"
        onClick={() => setOpen(true)}
        className="w-full text-left"
      >
        <ImgCard
          src={src}
          alt={alt}
          caption={caption ? `${caption} (클릭하여 확대)` : "클릭하여 확대"}
          aspect="square"
          coverClassName={coverClassName ?? "object-center"}
        />
      </button>

      <Modal open={open} onClose={() => setOpen(false)} title={alt}>
        <div className="relative w-full aspect-[16/10] overflow-hidden rounded-[18px] border border-black/10 bg-white">
          <Image
            src={src}
            alt={alt}
            fill
            className="object-contain"
            sizes="(max-width: 1100px) 92vw, 1100px"
          />
        </div>
      </Modal>
    </>
  );
}

/* ---------------- Simple Compare Table ---------------- */

function CompareTable({
  leftTitle = "As-is",
  rightTitle = "To-be",
  rows,
}: {
  leftTitle?: string;
  rightTitle?: string;
  rows: { left: string; right: string }[];
}) {
  return (
    <div className="overflow-hidden rounded-[22px] border border-black/10 bg-white">
      <div className="grid grid-cols-2 border-b border-black/10 bg-black/[0.02]">
        <div className="px-5 py-4">
          <p className="text-[12px] text-black/45">{leftTitle}</p>
          <p className="mt-1 text-[13px] font-medium text-black/75">
            측정 가능한 성취 지표
          </p>
        </div>
        <div className="border-l border-black/10 px-5 py-4">
          <p className="text-[12px] text-black/45">{rightTitle}</p>
          <p className="mt-1 text-[13px] font-medium text-black/75">
            실제 행동 변화를 만든 신호
          </p>
        </div>
      </div>

      <div className="divide-y divide-black/10">
        {rows.map((r, i) => (
          <div key={i} className="grid grid-cols-2">
            <div className="px-5 py-4">
              <p className="text-[13.5px] leading-7 text-black/70">{r.left}</p>
            </div>
            <div className="border-l border-black/10 px-5 py-4">
              <p className="text-[13.5px] leading-7 text-black/70">{r.right}</p>
            </div>
          </div>
        ))}
      </div>

      <div className="border-t border-black/10 bg-white px-5 py-4">
        <p className="text-[12px] leading-6 text-black/45">
          핵심은 “성취를 더 올리기”가 아니라, 신호를 읽어 “상태를 더 안정적으로 재현하기”였습니다.
        </p>
      </div>
    </div>
  );
}

/* ---------------- Output Cards ---------------- */

function OutputCards({
  items,
}: {
  items: { eyebrow: string; title: string; desc: string }[];
}) {
  return (
    <div className="grid gap-4 md:grid-cols-3">
      {items.map((it, i) => (
        <div
          key={i}
          className="rounded-[22px] border border-black/10 bg-white p-5"
        >
          <p className="text-[12px] text-black/45">{it.eyebrow}</p>
          <h3 className="mt-2 text-[15px] font-semibold tracking-[-0.2px] text-black/80">
            {it.title}
          </h3>
          <p className="mt-3 text-[13.5px] leading-7 text-black/65">{it.desc}</p>
        </div>
      ))}
    </div>
  );
}

/* ---------------- Instagram Slider ---------------- */

type Slide = { src: string; alt: string; caption: string; imgClassName?: string };

function InstaSlider({ slides }: { slides: Slide[] }) {
  const [index, setIndex] = useState(0);
  const touch = useRef<{ x: number; y: number; t: number } | null>(null);

  const clamp = (n: number) => Math.max(0, Math.min(slides.length - 1, n));
  const go = (n: number) => setIndex(clamp(n));
  const prev = () => go(index - 1);
  const next = () => go(index + 1);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "ArrowLeft") prev();
      if (e.key === "ArrowRight") next();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [index]);

  const current = slides[index];

  return (
    <div className="overflow-hidden rounded-[22px] border border-black/10 bg-white">
      <div
        className="relative aspect-square w-full overflow-hidden bg-black/[0.02]"
        onTouchStart={(e) => {
          const p = e.touches[0];
          touch.current = { x: p.clientX, y: p.clientY, t: Date.now() };
        }}
        onTouchEnd={(e) => {
          const st = touch.current;
          if (!st) return;
          const p = e.changedTouches[0];
          const dx = p.clientX - st.x;
          const dy = p.clientY - st.y;
          const dt = Date.now() - st.t;

          if (Math.abs(dx) > 45 && Math.abs(dy) < 40 && dt < 650) {
            if (dx < 0) next();
            else prev();
          }
          touch.current = null;
        }}
      >
        <Image
          src={current.src}
          alt={current.alt}
          fill
          sizes="(max-width: 768px) 100vw, 720px"
          className={`object-cover ${current.imgClassName ?? "object-center"}`}
        />

        <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/45 via-black/0 to-black/0" />

        <button
          type="button"
          onClick={prev}
          aria-label="이전"
          className="absolute left-3 top-1/2 -translate-y-1/2 rounded-full border border-white/25 bg-black/30 px-3 py-2 text-[12px] text-white backdrop-blur hover:bg-black/45 transition"
        >
          ←
        </button>
        <button
          type="button"
          onClick={next}
          aria-label="다음"
          className="absolute right-3 top-1/2 -translate-y-1/2 rounded-full border border-white/25 bg-black/30 px-3 py-2 text-[12px] text-white backdrop-blur hover:bg-black/45 transition"
        >
          →
        </button>

        <div className="absolute right-3 top-3 rounded-full border border-white/20 bg-black/30 px-3 py-1 text-[12px] text-white backdrop-blur">
          {index + 1} / {slides.length}
        </div>

        <div className="absolute bottom-0 left-0 right-0 p-4">
          <p className="text-[12.5px] leading-6 text-white/92">{current.caption}</p>
        </div>
      </div>

      <div className="flex items-center justify-between gap-3 px-4 py-3">
        <div className="flex gap-1.5">
          {slides.map((_, i) => (
            <button
              key={i}
              type="button"
              onClick={() => go(i)}
              aria-label={`슬라이드 ${i + 1}`}
              className={`h-1.5 w-1.5 rounded-full transition ${
                i === index ? "bg-black/55" : "bg-black/15 hover:bg-black/25"
              }`}
            />
          ))}
        </div>
        <p className="text-[12px] text-black/45">좌우 클릭/스와이프로 넘길 수 있습니다.</p>
      </div>
    </div>
  );
}

/* ---------------- CSV (load once) ---------------- */

function parseCSV(text: string): string[][] {
  const rows: string[][] = [];
  let row: string[] = [];
  let cur = "";
  let inQuotes = false;

  for (let i = 0; i < text.length; i++) {
    const ch = text[i];
    const next = text[i + 1];

    if (ch === '"') {
      if (inQuotes && next === '"') {
        cur += '"';
        i++;
      } else {
        inQuotes = !inQuotes;
      }
      continue;
    }

    if (!inQuotes && ch === ",") {
      row.push(cur);
      cur = "";
      continue;
    }

    if (!inQuotes && (ch === "\n" || ch === "\r")) {
      if (ch === "\r" && next === "\n") i++;
      row.push(cur);
      cur = "";

      const nonEmpty = row.some((v) => v.trim() !== "");
      if (nonEmpty) rows.push(row);
      row = [];
      continue;
    }

    cur += ch;
  }

  row.push(cur);
  const nonEmpty = row.some((v) => v.trim() !== "");
  if (nonEmpty) rows.push(row);

  return rows;
}

function useCSVData(csvUrl: string) {
  const [loading, setLoading] = useState(true);
  const [err, setErr] = useState<string | null>(null);
  const [headers, setHeaders] = useState<string[]>([]);
  const [rows, setRows] = useState<string[][]>([]);

  useEffect(() => {
    let alive = true;
    async function run() {
      try {
        setLoading(true);
        setErr(null);

        const res = await fetch(csvUrl, { cache: "no-store" });
        if (!res.ok) throw new Error(`CSV 로드 실패 (${res.status})`);

        const text = await res.text();
        const parsed = parseCSV(text);

        if (!alive) return;

        const h = parsed[0] ?? [];
        const r = parsed.slice(1);

        setHeaders(h);
        setRows(r);
        setLoading(false);
      } catch (e: any) {
        if (!alive) return;
        setErr(e?.message ?? "CSV 로드 중 오류가 발생했습니다.");
        setLoading(false);
      }
    }
    run();
    return () => {
      alive = false;
    };
  }, [csvUrl]);

  const stats = useMemo(() => {
    if (!headers.length || !rows.length) return null;

    const idxSubmitted = headers.findIndex((h) =>
      h.toLowerCase().includes("submitted")
    );
    const submitted = idxSubmitted >= 0 ? rows.map((r) => r[idxSubmitted] ?? "") : [];
    const nonEmptySubmitted = submitted.filter((v) => String(v).trim() !== "");
    const sorted = [...nonEmptySubmitted].sort();
    const period =
      sorted.length > 0
        ? `${String(sorted[0]).slice(0, 10)}–${String(sorted[sorted.length - 1]).slice(0, 10)}`
        : "-";

    return { period };
  }, [headers, rows]);

  return { loading, err, headers, rows, stats };
}

function CSVTable({
  headers,
  rows,
  maxRows,
}: {
  headers: string[];
  rows: string[][];
  maxRows?: number;
}) {
  const slice = typeof maxRows === "number" ? rows.slice(0, maxRows) : rows;

  return (
    <div className="overflow-hidden rounded-[16px] border border-black/10">
      <div className="overflow-x-auto">
        <table className="w-full border-collapse text-left">
          <thead>
            <tr className="bg-black/[0.03]">
              {headers.map((h, i) => (
                <th
                  key={i}
                  className="whitespace-nowrap px-4 py-3 text-[12px] font-medium text-black/55"
                >
                  {h || `col_${i + 1}`}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {slice.map((r, ri) => (
              <tr key={ri} className="border-t border-black/10">
                {headers.map((_, ci) => (
                  <td
                    key={ci}
                    className="px-4 py-3 text-[12.5px] text-black/70 align-top"
                  >
                    {r[ci] ?? ""}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {typeof maxRows === "number" && rows.length > maxRows ? (
        <div className="border-t border-black/10 bg-white px-4 py-3 text-[12px] text-black/45">
          미리보기는 상위 {maxRows}행만 표시됩니다.
        </div>
      ) : null}
    </div>
  );
}

function isMetaHeader(h: string) {
  const x = (h ?? "").toLowerCase();
  return (
    x.includes("submitted") ||
    x.includes("timestamp") ||
    x.includes("respondent") ||
    x.includes("response id") ||
    x === "id" ||
    x.includes("email") ||
    x.includes("name") ||
    x.includes("ip") ||
    x.includes("user agent")
  );
}

function PivotView({ headers, row }: { headers: string[]; row: string[] }) {
  const pairs = headers
    .map((h, i) => ({ h, v: row[i] ?? "" }))
    .filter((p) => p.h && !isMetaHeader(p.h))
    .filter((p) => String(p.v).trim() !== "");

  return (
    <div className="overflow-hidden rounded-[16px] border border-black/10">
      <div className="overflow-x-auto">
        <table className="w-full border-collapse text-left">
          <thead>
            <tr className="bg-black/[0.03]">
              <th className="whitespace-nowrap px-4 py-3 text-[12px] font-medium text-black/55">
                질문(컬럼)
              </th>
              <th className="whitespace-nowrap px-4 py-3 text-[12px] font-medium text-black/55">
                응답(값)
              </th>
            </tr>
          </thead>
          <tbody>
            {pairs.map((p, idx) => (
              <tr key={idx} className="border-t border-black/10">
                <td className="px-4 py-3 text-[12.5px] text-black/70 align-top">
                  {p.h}
                </td>
                <td className="px-4 py-3 text-[12.5px] text-black/70 align-top">
                  {p.v}
                </td>
              </tr>
            ))}
            {pairs.length === 0 ? (
              <tr className="border-t border-black/10">
                <td className="px-4 py-3 text-[12.5px] text-black/55" colSpan={2}>
                  표시할 응답이 없습니다.
                </td>
              </tr>
            ) : null}
          </tbody>
        </table>
      </div>
    </div>
  );
}

/* ---------------- Diagram (SVG) ---------------- */

function MechanismDiagram() {
  return (
    <div className="overflow-hidden rounded-[22px] border border-black/10 bg-white">
      <div className="p-5">
        <p className="text-[12px] text-black/45">PMCC Experience Mechanism</p>
        <p className="mt-2 text-[13.5px] leading-7 text-black/70">
          PMCC는 활동을 설계한 것이 아니라, <strong>상태(state)</strong>를 만들고 그 상태를 유지·조정하는
          메커니즘을 설계한 프로젝트입니다.
        </p>
      </div>

      <div className="border-t border-black/10 bg-black/[0.01] px-4 py-4">
        <div className="relative w-full overflow-hidden rounded-[18px] border border-black/10 bg-white">
          <svg viewBox="0 0 980 520" className="h-auto w-full">
            <rect x="0" y="0" width="980" height="520" fill="white" />

            <defs>
              <marker
                id="arrow"
                viewBox="0 0 10 10"
                refX="8.5"
                refY="5"
                markerWidth="8"
                markerHeight="8"
                orient="auto-start-reverse"
              >
                <path d="M 0 0 L 10 5 L 0 10 z" fill="rgba(0,0,0,0.35)" />
              </marker>
            </defs>

            {[
              { x: 70, y: 80, w: 170, h: 120, t: "Input\n(Conditions)" },
              { x: 300, y: 80, w: 170, h: 120, t: "State\n(Intermediate)" },
              { x: 530, y: 80, w: 170, h: 120, t: "Signals\n(Observed)" },
              { x: 760, y: 80, w: 170, h: 120, t: "Decision\n(Moderator)" },
              { x: 300, y: 320, w: 380, h: 130, t: "Output\n(Outcome)" },
            ].map((n, i) => (
              <g key={i}>
                <rect
                  x={n.x}
                  y={n.y}
                  width={n.w}
                  height={n.h}
                  rx="18"
                  fill="white"
                  stroke="rgba(0,0,0,0.18)"
                />
                <text
                  x={n.x + 16}
                  y={n.y + 26}
                  fontSize="14"
                  fill="rgba(0,0,0,0.75)"
                  fontWeight="600"
                >
                  {n.t.split("\n")[0]}
                </text>
                <text x={n.x + 16} y={n.y + 40} fontSize="12" fill="rgba(0,0,0,0.45)">
                  {n.t.split("\n")[1]}
                </text>
              </g>
            ))}

            <g fontSize="12" fill="rgba(0,0,0,0.62)">
              <text x="86" y="138">• Pace / 강도</text>
              <text x="86" y="158">• 그룹 규모</text>
              <text x="86" y="178">• 온보딩 룰</text>
              <text x="86" y="198">• 역할 배치</text>

              <text x="316" y="138">• 긴장 완화</text>
              <text x="316" y="158">• 비교·평가 감소</text>
              <text x="316" y="178">• 심리적 안전감</text>

              <text x="546" y="138">• 대화 시작 속도</text>
              <text x="546" y="158">• 침묵의 밀도</text>
              <text x="546" y="178">• 체류 시간</text>
              <text x="546" y="198">• 피드백 키워드</text>

              <text x="776" y="138">• 페이스 조정</text>
              <text x="776" y="158">• 대화 구조 변경</text>
              <text x="776" y="178">• 질문 개입/중단</text>
              <text x="776" y="198">• 세션 길이 조정</text>

              {/* ✅ Output 텍스트 강화: '결과물'스러운 용어로 */}
              <text x="316" y="388">• 예측 가능한 재참여</text>
              <text x="316" y="408">• Organic referral</text>
              <text x="316" y="428">• Community loyalty</text>
            </g>

            <line
              x1="240"
              y1="140"
              x2="300"
              y2="140"
              stroke="rgba(0,0,0,0.35)"
              strokeWidth="2"
              markerEnd="url(#arrow)"
            />
            <line
              x1="470"
              y1="140"
              x2="530"
              y2="140"
              stroke="rgba(0,0,0,0.35)"
              strokeWidth="2"
              markerEnd="url(#arrow)"
            />
            <line
              x1="700"
              y1="140"
              x2="760"
              y2="140"
              stroke="rgba(0,0,0,0.35)"
              strokeWidth="2"
              markerEnd="url(#arrow)"
            />

            <path
              d="M 845 205 C 845 250, 650 270, 650 320"
              fill="none"
              stroke="rgba(0,0,0,0.28)"
              strokeWidth="2"
              markerEnd="url(#arrow)"
            />
            <path
              d="M 155 205 C 155 260, 300 270, 300 320"
              fill="none"
              stroke="rgba(0,0,0,0.18)"
              strokeWidth="2"
              markerEnd="url(#arrow)"
              opacity="0.8"
            />

            <text x="70" y="500" fontSize="12" fill="rgba(0,0,0,0.45)">
              Input → State → Signals → Decision → Output (상태를 만들고, 신호로 조정하고, 결과를 안정화)
            </text>
          </svg>
        </div>

        <p className="mt-4 px-1 text-[12px] leading-6 text-black/55">
          관측 신호를 “느낌”으로 두지 않고, 역할 기반 개입(Moderator Actions)으로 연결하는 구조를 고정했습니다.
        </p>
      </div>
    </div>
  );
}

/* ---------------- Rule Cards (OpenAI Newsroom Style) ---------------- */

function RuleCard({
  title,
  subtitle,
  bullets,
  purpose,
}: {
  title: string;
  subtitle: string;
  bullets: { label: string; text: string }[];
  purpose: string;
}) {
  return (
    <div className="group flex h-full flex-col pt-5 border-t border-black text-left transition-opacity duration-300 hover:opacity-95">
      {/* Category / Meta Line like News Date */}
      <div className="mb-3 flex items-center gap-2">
         {/* Accent Dot - Dark Navy */}
         <span className="h-1.5 w-1.5 rounded-full bg-[#2563EB]"></span>
         <p className="font-mono text-[11px] uppercase tracking-wider text-black/50">
           {subtitle}
         </p>
      </div>

      {/* Headline Title - Hover Color changed to Dark Navy */}
      <h3 className="mb-4 text-[20px] font-semibold leading-tight tracking-[-0.02em] text-black group-hover:text-[#2563EB] transition-colors duration-200">
        {title}
      </h3>

      {/* Content Body - Mimicking news excerpt layout */}
      <div className="flex-1 space-y-3 mb-6">
        {bullets.map((b, i) => (
          <div key={i} className="text-[14px] leading-6 text-black/70">
            <span className="font-medium text-black">{b.label}</span>
            <span className="mx-2 text-black/20">|</span>
            <span>{b.text}</span>
          </div>
        ))}
      </div>

      {/* Footer / Quote */}
      <div className="mt-auto pt-4">
        <p className="text-[13px] leading-6 text-black/45 italic">
          "{purpose}"
        </p>
      </div>
    </div>
  );
}

/* ---------------- Histogram (SVG) ---------------- */

function findLikertColumn(headers: string[]) {
  const keys = [
    "재참여",
    "다시",
    "참여 의향",
    "의향",
    "리텐션",
    "retention",
    "rejoin",
    "again",
    "intention",
    "likert",
    "rating",
    "satisfaction",
  ];
  const lowered = headers.map((h) => (h ?? "").toLowerCase());
  for (const k of keys) {
    const kk = k.toLowerCase();
    const idx = lowered.findIndex((h) => h.includes(kk));
    if (idx >= 0) return idx;
  }
  return -1;
}

function LikertHistogram({
  title,
  headers,
  rows,
}: {
  title: string;
  headers: string[];
  rows: string[][];
}) {
  const data = useMemo(() => {
    const idx = findLikertColumn(headers);
    if (idx < 0) return { idx, counts: [0, 0, 0, 0, 0], n: 0, label: "" };

    const values = rows
      .map((r) => (r[idx] ?? "").toString().trim())
      .map((v) => {
        const cleaned = v.replace(/[^\d.]/g, "");
        const n = Number(cleaned);
        if (!Number.isFinite(n)) return null;
        const rounded = Math.round(n);
        if (rounded < 1 || rounded > 5) return null;
        return rounded;
      })
      .filter((x): x is number => x !== null);

    const counts = [0, 0, 0, 0, 0];
    values.forEach((v) => counts[v - 1]++);
    const label = headers[idx] || "Likert (1–5)";
    return { idx, counts, n: values.length, label };
  }, [headers, rows]);

  const max = Math.max(...data.counts, 1);

  return (
    <div className="overflow-hidden rounded-[22px] border border-black/10 bg-white">
      <div className="p-5">
        <p className="text-[12px] text-black/45">Signal Summary</p>
        <h3 className="mt-2 text-[15px] font-semibold tracking-[-0.2px]">{title}</h3>
        <p className="mt-2 text-[13.5px] leading-7 text-black/60">
          평균값보다 <strong>분포 형태</strong>로 해석했습니다. (컬럼:{" "}
          <span className="text-black/70">{data.label || "미탐지"}</span>)
        </p>
      </div>

      <div className="border-t border-black/10 bg-black/[0.01] px-4 py-4">
        <div className="relative w-full overflow-hidden rounded-[18px] border border-black/10 bg-white p-4">
          <svg viewBox="0 0 520 220" className="h-auto w-full">
            <rect x="0" y="0" width="520" height="220" fill="white" />
            <line x1="40" y1="180" x2="500" y2="180" stroke="rgba(0,0,0,0.2)" />
            <line x1="40" y1="25" x2="40" y2="180" stroke="rgba(0,0,0,0.2)" />

            {data.counts.map((c, i) => {
              const barW = 70;
              const gap = 18;
              const x = 60 + i * (barW + gap);
              const h = Math.round((c / max) * 130);
              const y = 180 - h;
              return (
                <g key={i}>
                  <rect
                    x={x}
                    y={y}
                    width={barW}
                    height={h}
                    rx="10"
                    fill="rgba(0,0,0,0.18)"
                    stroke="rgba(0,0,0,0.2)"
                  />
                  <text
                    x={x + barW / 2}
                    y="200"
                    textAnchor="middle"
                    fontSize="12"
                    fill="rgba(0,0,0,0.55)"
                  >
                    {i + 1}
                  </text>
                  <text
                    x={x + barW / 2}
                    y={y - 8}
                    textAnchor="middle"
                    fontSize="12"
                    fill="rgba(0,0,0,0.55)"
                  >
                    {c}
                  </text>
                </g>
              );
            })}

            <text x="40" y="18" fontSize="11" fill="rgba(0,0,0,0.45)">
              count
            </text>
            <text
              x="500"
              y="212"
              textAnchor="end"
              fontSize="11"
              fill="rgba(0,0,0,0.45)"
            >
              Likert 1–5
            </text>
          </svg>
        </div>

        <div className="mt-4 grid gap-2 rounded-[18px] border border-black/10 bg-white px-4 py-3">
          <p className="text-[12px] text-black/45">Reading</p>
          <p className="text-[13px] leading-6 text-black/70">
            낮은 구간(1–2)은 초기 긴장 해소 실패 가능 구간, 중간(3)은 상태는 형성되었으나 여운이 부족한 구간,
            높은 구간(4–5)은 체류 및 관계 지속 가능 구간으로 해석했습니다.
          </p>
          <p className="text-[13px] leading-6 text-black/70">
            목표는 평균을 올리는 것이 아니라, <strong>저점 구간을 줄이고 고점 구간을 안정적으로 재현</strong>하는
            것이었습니다.
          </p>
          <p className="text-[12px] text-black/45">Valid N: {data.n}</p>
        </div>
      </div>
    </div>
  );
}

/* ---------------- Evidence Section (CSV) ---------------- */

function SurveyCSVSection({
  csv,
}: {
  csv: {
    loading: boolean;
    err: string | null;
    headers: string[];
    rows: string[][];
    stats: any;
  };
}) {
  const { loading, err, headers, rows, stats } = csv;

  const [open, setOpen] = useState(false);
  const [view, setView] = useState<"table" | "pivot">("table");
  const [q, setQ] = useState("");
  const [limit, setLimit] = useState(300);
  const [pivotIndex, setPivotIndex] = useState(0);

  const filteredRows = useMemo(() => {
    if (!q.trim()) return rows;
    const key = q.trim().toLowerCase();
    return rows.filter((r) => r.some((c) => String(c ?? "").toLowerCase().includes(key)));
  }, [q, rows]);

  const viewRows = useMemo(() => filteredRows.slice(0, limit), [filteredRows, limit]);

  const safePivotIndex = Math.max(0, Math.min(filteredRows.length - 1, pivotIndex));
  const pivotRow = filteredRows[safePivotIndex] ?? rows[0] ?? [];

  return (
    <>
      <SectionTitle
        eyebrow="Evidence"
        title="Survey Dataset (CSV)"
        desc="설문을 운영 판단으로 연결하기 위해, 응답을 CSV로 구조화했습니다."
      />

      {/* ✅ Key Insight 박스 추가 */}
      <div className="rounded-[22px] border border-black/10 bg-white p-5">
        <p className="text-[12px] text-black/45">Key insight</p>
        <p className="mt-2 text-[13.5px] leading-7 text-black/75">
          재참여 의향이 높게 나타난 응답에서, “편안함/연결감/대화의 밀도” 관련 문항과 키워드가 함께 강화되는 경향이
          반복적으로 관찰되었습니다. 즉, PMCC의 핵심 성과는 “운동 만족도”가 아니라{" "}
          <strong>안전감의 형성이 곧 리텐션으로 이어지는 구조</strong>를 만든 점이었습니다.
        </p>
      </div>

      <p className="mt-6 text-[14px] leading-7 text-black/70">
        경험을 “좋았다”로 남기지 않기 위해, 각 회차 이후의 상태를 입력값으로 수집했습니다. 설문 데이터는 만족도를
        평가하기보다, 다음 운영에서 조정해야 할 조건을 판단하는 기준으로 사용되었습니다.
      </p>

      <div className="mt-6 rounded-[22px] border border-black/10 bg-white p-5">
        {loading ? (
          <p className="text-[13.5px] text-black/60">CSV를 불러오는 중입니다…</p>
        ) : err ? (
          <p className="text-[13.5px] text-black/60">
            CSV를 불러오지 못했습니다: <span className="text-black/75">{err}</span>
          </p>
        ) : (
          <>
            <div className="flex flex-wrap items-start justify-between gap-3">
              <div>
                <p className="text-[12px] text-black/45">Data Snapshot</p>
                <p className="mt-2 text-[13.5px] leading-7 text-black/70">
                  기간 <strong>{stats?.period ?? "-"}</strong>
                </p>
              </div>

              <div className="flex flex-wrap items-center gap-2">
                <button
                  type="button"
                  onClick={() => setOpen(true)}
                  className="inline-flex items-center justify-center rounded-full border border-black/10 bg-white px-4 py-2 text-[12.5px] text-black/70 hover:bg-black/[0.03] transition"
                >
                  포트폴리오에서 전체 보기
                </button>
              </div>
            </div>

            <div className="mt-6">
              <p className="mb-2 text-[12px] text-black/45">Preview (상위 20행)</p>
              <CSVTable headers={headers} rows={rows} maxRows={20} />
            </div>

            <Modal open={open} onClose={() => setOpen(false)} title="PMCC Survey CSV">
              <div className="flex flex-wrap items-end justify-between gap-3">
                <div className="min-w-[240px]">
                  <p className="text-[12px] text-black/45">Search</p>
                  <input
                    value={q}
                    onChange={(e) => setQ(e.target.value)}
                    placeholder="검색어를 입력하세요"
                    className="mt-2 w-full rounded-[14px] border border-black/10 bg-white px-3 py-2 text-[13px] text-black/75 outline-none focus:border-black/20"
                  />
                </div>

                <div className="min-w-[220px]">
                  <p className="text-[12px] text-black/45">Rows</p>
                  <div className="mt-2 flex items-center gap-2">
                    <select
                      value={limit}
                      onChange={(e) => setLimit(Number(e.target.value))}
                      className="w-full rounded-[14px] border border-black/10 bg-white px-3 py-2 text-[13px] text-black/75 outline-none focus:border-black/20"
                    >
                      <option value={100}>100</option>
                      <option value={300}>300</option>
                      <option value={1000}>1000</option>
                      <option value={999999}>전체</option>
                    </select>
                    <span className="text-[12px] text-black/45 whitespace-nowrap">
                      (필터 후 {filteredRows.length}행)
                    </span>
                  </div>
                </div>
              </div>

              <div className="mt-5 flex flex-wrap items-center justify-between gap-3">
                <div className="flex items-center gap-2">
                  <button
                    type="button"
                    onClick={() => setView("table")}
                    className={`rounded-full border px-3 py-1 text-[12px] transition ${
                      view === "table"
                        ? "border-black/20 bg-black text-white"
                        : "border-black/10 bg-white text-black/70 hover:bg-black/[0.03]"
                    }`}
                  >
                    원본 테이블
                  </button>
                  <button
                    type="button"
                    onClick={() => setView("pivot")}
                    className={`rounded-full border px-3 py-1 text-[12px] transition ${
                      view === "pivot"
                        ? "border-black/20 bg-black text-white"
                        : "border-black/10 bg-white text-black/70 hover:bg-black/[0.03]"
                    }`}
                  >
                    피벗(질문→응답)
                  </button>
                </div>

                {view === "pivot" ? (
                  <div className="flex items-center gap-2">
                    <span className="text-[12px] text-black/45">응답 선택</span>
                    <select
                      value={safePivotIndex}
                      onChange={(e) => setPivotIndex(Number(e.target.value))}
                      className="rounded-full border border-black/10 bg-white px-3 py-1.5 text-[12px] text-black/75 outline-none focus:border-black/20"
                    >
                      {filteredRows.slice(0, 200).map((_, i) => (
                        <option key={i} value={i}>
                          {i + 1}번째 응답
                        </option>
                      ))}
                      {filteredRows.length > 200 ? (
                        <option value={safePivotIndex}>… (검색으로 좁힌 뒤 선택)</option>
                      ) : null}
                    </select>
                  </div>
                ) : null}
              </div>

              <div className="mt-4">
                {view === "table" ? (
                  <CSVTable headers={headers} rows={viewRows} />
                ) : (
                  <PivotView headers={headers} row={pivotRow} />
                )}
              </div>

              <div className="mt-4 flex flex-wrap items-center justify-between gap-3">
                <p className="text-[12px] text-black/45">
                  피벗 보기는 “한 응답(row)”을 “질문-응답 리스트”로 펼쳐 보여줍니다.
                </p>
                <button
                  type="button"
                  onClick={() => setOpen(false)}
                  className="inline-flex items-center justify-center rounded-full border border-black/10 bg-white px-4 py-2 text-[12.5px] text-black/70 hover:bg-black/[0.03] transition"
                >
                  닫기
                </button>
              </div>
            </Modal>
          </>
        )}
      </div>
    </>
  );
}

/* =========================================================
   Page
========================================================= */

export default function Page() {
  const ASSET = "/images/projects/pmcc";
  const csvUrl = `${ASSET}/pmcc_survey.csv`;
  const csv = useCSVData(csvUrl);

  // Instagram 순서: 1 → 2 → 3 → 4 → 5
  const instaSlides: Slide[] = [
    {
      src: `${ASSET}/pmcc_insta1.png`,
      alt: "PMCC Instagram 1",
      caption:
        "Observation: 러닝 이후 체류가 길었던 회차 · Intent: 상태 조건 기록 · Signal: 잔류↑ → 강도 유지",
      imgClassName: "object-center",
    },
    {
      src: `${ASSET}/pmcc_insta2.png`,
      alt: "PMCC Instagram 2",
      caption:
        "Observation: 대화가 자연스럽게 시작된 회차 · Intent: 시작 조건 보존 · Signal: 비교↓ → 구조 유지",
      imgClassName: "object-center",
    },
    {
      src: `${ASSET}/pmcc_insta3.png`,
      alt: "PMCC Instagram 3",
      caption:
        "Observation: 긴장 완화 이후 대화 분산 · Intent: 편안한 페이스 유지 · Signal: 말의 속도 안정",
      imgClassName: "object-[right_center]",
    },
    {
      src: `${ASSET}/pmcc_insta4.png`,
      alt: "PMCC Instagram 4",
      caption:
        "Observation: 러닝 후 대화 세션에 여운이 남은 회차 · Intent: 마감 루틴 고정 · Signal: 재참여↑",
      imgClassName: "object-[right_center]",
    },
    {
      src: `${ASSET}/pmcc_insta5.png`,
      alt: "PMCC Instagram 5",
      caption:
        "Observation: 기록이 ‘홍보’로 읽히지 않게 조정 · Intent: 상태 외재화 · Signal: 톤 일관성 유지",
      imgClassName: "object-[right_center]",
    },
  ];

  // Feedback Loop: 버튼 클릭 시 CSV 20행 미리보기 자동 표시
  const [showInlineCSV, setShowInlineCSV] = useState(false);

  return (
    <main className="mx-auto max-w-[720px] px-4 py-20">
      {/* ================= Hero ================= */}
      <section>
        <p className="text-[12px] text-black/45">Project 03</p>

        <div className="mt-2 w-full">
          <h1 className="text-[22px] font-semibold tracking-[-0.3px]">
            Peer Mile Coffee Club
          </h1>
        </div>

        {/* ✅ Hero 첫 문장: 정량 임팩트 → 전환 */}
        <p className="mt-4 text-[14px] leading-7 text-black/70">
          러닝 기반 커뮤니티를 0명에서 <strong>168명</strong>까지 확장하며, 재참여가 끊기지 않는 운영 루프를
          만들었습니다.
          <br />
          다만 이 프로젝트의 핵심은 숫자 자체가 아니라, 그 숫자를 만든 <strong>‘상태 설계(State Design)’</strong>
          였습니다.
        </p>

        <p className="mt-4 text-[14px] leading-7 text-black/70">
          같은 프로그램이라도 어떤 날은 사람들이 남고, 어떤 날은 자연스럽게 흩어졌습니다. 이 차이는 활동의 완성도보다,
          경험이 끝났을 때 남아 있는 상태와 여운에서 반복적으로 발생했습니다.
        </p>

        <p className="mt-4 text-[14px] leading-7 text-black/70">
          이 프로젝트는 러닝을 통해 사람을 모은 기록이 아니라, 경험 이후 남는 상태(state)와 여운(afterimage)을
          유지·조정하는 기준을 설계한 기록입니다.
        </p>

        <div className="mt-6 flex flex-wrap gap-2">
          <Pill>Experience Design</Pill>
          <Pill>System Thinking</Pill>
          <Pill>Role-based Moderation</Pill>
          <Pill>Branding as Operations</Pill>
        </div>

        <div className="mt-8">
          <ImgCard
            src={`${ASSET}/hero_run_blur.JPG`}
            alt="PMCC hero"
            caption="러닝 장면을 ‘기록’이 아니라, 상태의 톤을 전달하는 장면으로 사용했습니다."
            priority
            aspect="square"
            coverClassName="object-[right_center]"
          />
        </div>
      </section>

      <Divider />

      {/* ================= Problem ================= */}
      <section>
        <SectionTitle
          eyebrow="Problem"
          title="What seemed to matter, but didn’t"
          desc="측정 가능한 성취 지표와 실제 행동 변화 사이에서 불일치가 반복되었습니다."
        />

        <p className="text-[14px] leading-7 text-black/70">
          초기 운영에서는 거리, 페이스, 코스 같은 측정 가능한 요소가 경험의 질을 결정할 것이라 가정했습니다. 그러나
          실제 이탈과 재참여는 이러한 지표와 일관되게 연결되지 않았습니다.
        </p>

        <p className="mt-4 text-[14px] leading-7 text-black/70">
          문제는 성과가 아니라, 성취 지표(거리, 페이스)와 실제 재참여(retention) 사이의 괴리를 설명하고 조정할 기준이
          없었다는 점이었습니다.
        </p>

        {/* ✅ Problem 대조 테이블 추가 */}
        <div className="mt-8">
          <CompareTable
            leftTitle="As-is"
            rightTitle="To-be"
            rows={[
              { left: "거리 (5km, 10km)", right: "대화 시작 속도" },
              { left: "페이스 (5'30\", 6'00\")", right: "러닝 후 체류 시간" },
              { left: "코스 (한강, 올림픽공원)", right: "침묵의 밀도" },
            ]}
          />
        </div>
      </section>

      <Divider />

      {/* ================= Observation ================= */}
      <section>
        <SectionTitle
          eyebrow="Observation"
          title="What kept happening instead"
          desc="정량화하기 어려운 신호들이 반복적으로 행동 변화를 만들어냈습니다."
        />

        <p className="text-[14px] leading-7 text-black/70">
          재참여가 발생한 회차에는 공통적인 상태 변화가 관찰되었습니다. 참여자 간 비교와 긴장이 완화되고,
          심리적 안전감(psychological safety)이 형성된 경우에만 체류 시간이 늘어났습니다.
        </p>

        <p className="mt-4 text-[14px] leading-7 text-black/70">
          이 신호들은 정량화되기 어렵지만, 반복적으로 동일한 행동 변화를 만들어냈습니다. 그래서 PMCC는 “활동”이 아니라
          “상태”를 설계 대상으로 삼았습니다.
        </p>
      </section>

      <Divider />

      {/* ================= Mechanism Diagram ================= */}
      <section>
        <SectionTitle
          eyebrow="Mechanism"
          title="How retention was produced"
          desc="Input → State → Signals → Decision → Output을 한 장에 고정했습니다."
        />
        <MechanismDiagram />
      </section>

      <Divider />

      {/* ================= Shift ================= */}
      <section>
        <SectionTitle
          eyebrow="Shift"
          title="Reframing the Run"
          desc="러닝을 목표가 아니라, 상태를 만들기 위한 조건으로 재정의했습니다."
        />

        <p className="text-[14px] leading-7 text-black/70">
          러닝은 목적이 아니라, 심리적 방어기제를 낮추는 전처리(pre-processing) 조건으로 재정의되었습니다. 이후 운영의
          기준은 “얼마나 잘 달렸는가”에서 “대화를 시작할 수 있는 상태가 형성되었는가”로 이동했습니다.
        </p>

        <p className="mt-4 text-[14px] leading-7 text-black/70">
          프로그램은 성취를 만들기보다, 그 상태를 방해하지 않도록 조정되었습니다.
        </p>

        {/* ✅ Shift: Before/After 대비 블록 */}
        <div className="mt-8">
          <CompareTable
            leftTitle="As-is"
            rightTitle="To-be"
            rows={[
              { left: "KPI: 거리/속도/완주", right: "KPI: 대화의 밀도/심리적 안전감" },
              { left: "Focus: 신체적 성취", right: "Focus: 정서적 완화(De-escalation)" },
              { left: "Role: 페이스메이커", right: "Role: 상태 설계자(State Architect)" },
            ]}
          />
        </div>
      </section>

      <Divider />

      {/* ================= Brand System ================= */}
      <section>
        <SectionTitle
          eyebrow="Brand System"
          title="Branding as operations"
          desc="브랜딩은 표현이 아니라, 운영자가 바뀌어도 동일한 상태를 재현하는 장치였습니다."
        />

        <p className="text-[14px] leading-7 text-black/70">
          PMCC의 브랜딩은 이미지를 만드는 일이 아니라, 다양한 사람들이 같은 기준 아래에서 머물 수 있게 하는 조건을
          고정하는 작업이었습니다. 색, 이미지, 기록 방식은 모두 특정 성격을 강조하기보다 비교와 평가가 작동하지 않는
          상태를 유지하도록 설계되었습니다.
        </p>

        {/* ✅ 기능적 이유(affordance)로 강화 */}
        <p className="mt-4 text-[14px] leading-7 text-black/70">
          컬러와 타이포는 심미적 요소를 넘어, 운영자가 개입하지 않아도 참여자가 “여기서는 이렇게 행동하면 된다”를
          직감하게 만드는 <strong>UX 장치(affordance)</strong>로 작동하도록 설계되었습니다.
        </p>

        <div className="mt-8 grid items-stretch gap-4 md:grid-cols-2">
          <ImgCard
            src={`${ASSET}/logo_blue.JPG`}
            alt="PMCC logo blue"
            caption="운영자가 바뀌어도 동일한 톤을 유지하기 위한 시각 기준점"
            aspect="square"
            coverClassName="object-center"
          />
          <ImgCard
            src={`${ASSET}/poster_coffee1.JPG`}
            alt="PMCC poster coffee"
            caption="‘운동’이 아니라 ‘관계’에 기대치가 정렬되도록, 커피 대화를 메인 장면으로 고정"
            aspect="square"
            coverClassName="object-center"
          />
        </div>

        <div className="mt-6 grid gap-4 md:grid-cols-2">
          <LightboxImage
            src={`${ASSET}/visaul_dev_notes.jpeg`}
            alt="PMCC visual development notes"
            caption="Observation: 흔들리는 룰 · Intent: 문장화 · Signal: 운영 재현성"
            coverClassName="object-center"
          />
          <LightboxImage
            src={`${ASSET}/moodboard.jpeg`}
            alt="PMCC moodboard"
            caption="Observation: 무드가 섞이면 기준이 흐려짐 · Intent: 분리 · Signal: 선택 속도↑"
            coverClassName="object-center"
          />
        </div>

        <div className="mt-6">
          <ImgCard
            src={`${ASSET}/palette.PNG`}
            alt="PMCC palette"
            caption="Palette: 운영 개입 없이도 톤이 유지되도록, 선택지를 좁히는 기준값."
            aspectClassName="aspect-[16/4]"
            contain
          />
        </div>

        <div className="mt-6 rounded-[22px] border border-black/10 bg-white p-5">
          <p className="text-[12px] text-black/45">Color</p>
          <p className="mt-2 text-[13.5px] leading-7 text-black/80">
            컬러는 ‘개성’보다 ‘태도’를 먼저 전달합니다. 첫 접점에서 긴장을 낮추고, 비교가 작동하지 않는 분위기를
            선행시키는 신호로 사용했습니다.
          </p>
        </div>

        <div className="mt-10 rounded-[22px] border border-black/10 bg-white p-5">
          <p className="text-[12px] text-black/45">One-line principle</p>
          <p className="mt-2 text-[13.5px] leading-7 text-black/80">
            브랜드는 정체성을 고정하는 것이 아니라, 서로 다른 상태들이 안전하게 만날 수 있게 만드는 기준입니다.
          </p>
        </div>
      </section>

      <Divider />

      {/* ================= Archive (Instagram) ================= */}
      <section>
        <SectionTitle
          eyebrow="Archive"
          title="Instagram as an interface"
          desc="인스타그램은 기록이 아니라, 상태를 외재화(externalization)하는 표면으로 사용되었습니다."
        />

        <div className="mb-4 flex flex-wrap items-center gap-2">
          <Pill>Live Channel</Pill>
          <a
            href="https://www.instagram.com/peermilecoffeeclub/"
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center gap-2 rounded-full border border-black/10 bg-white px-3 py-1 text-[12px] text-black/70 hover:bg-black/[0.03] transition"
          >
            <span>@peermilecoffeeclub</span>
            <span className="text-black/40">↗</span>
          </a>
        </div>

        {/* ✅ 캡션 구조를 슬라이더 위에서 먼저 공개 */}
        <div className="mb-4 rounded-[22px] border border-black/10 bg-black/[0.02] px-5 py-4">
          <p className="text-[12px] text-black/45">Caption structure</p>
          <div className="mt-2 grid gap-1 text-[13px] leading-6 text-black/70">
            <p>• Observation: 무엇을 봤는가</p>
            <p>• Intent: 왜 기록했는지</p>
            <p>• Signal: 다음 회차에 어떻게 반영할지</p>
          </div>
        </div>

        <InstaSlider slides={instaSlides} />

        <p className="mt-6 text-[14px] leading-7 text-black/70">
          이미지들은 결과가 아니라, <strong>상태 변화를 판단하기 위한 기록 단위</strong>로 사용되었습니다.
        </p>

        <p className="mt-3 text-[14px] leading-7 text-black/70">
          관측(Observation)·의도(Intent)·신호(Signal)를 고정해, 아카이브가 운영 근거로 기능하도록 설계했습니다.
        </p>
      </section>

      <Divider />

      {/* ================= Feedback Loop ================= */}
      <section>
        <SectionTitle
          eyebrow="Feedback Loop"
          title="Survey — turning signals into inputs"
          desc="외부 링크로 이동하되, 포트폴리오 내부에서는 데이터가 즉시 펼쳐지도록 구성했습니다."
        />

        <div className="rounded-[22px] border border-black/10 bg-white p-5">
          <p className="text-[14px] leading-7 text-black/70">
            경험을 “좋았다”로 남기지 않기 위해, 각 회차 이후의 상태를 입력값으로 수집했습니다. 각 회차 이후,
            대화의 밀도·연결감·정서적 잔량을 중심으로 한 지표를 리커트 척도와 키워드 응답으로 구조화해 수집했습니다.
          </p>

          <div className="mt-4 flex flex-wrap items-center gap-2">
            <a
              href="https://tally.so/r/wzZ42q"
              target="_blank"
              rel="noreferrer"
              onClick={() => setShowInlineCSV(true)}
              className="inline-flex items-center justify-center rounded-full border border-black/10 bg-black px-4 py-2 text-[12.5px] text-white"
            >
              설문조사 보러가기
            </a>
            <span className="text-[12px] text-black/45">tally.so/r/wzZ42q</span>
          </div>

          {showInlineCSV ? (
            <div className="mt-6">
              <p className="mb-2 text-[12px] text-black/45">CSV Preview (약 20행)</p>

              {csv.loading ? (
                <p className="text-[13.5px] text-black/60">CSV를 불러오는 중입니다…</p>
              ) : csv.err ? (
                <p className="text-[13.5px] text-black/60">
                  CSV를 불러오지 못했습니다: <span className="text-black/75">{csv.err}</span>
                </p>
              ) : (
                <CSVTable headers={csv.headers} rows={csv.rows} maxRows={20} />
              )}

              <div className="mt-3 flex flex-wrap items-center justify-between gap-2">
                <p className="text-[12px] text-black/45">
                  더 자세한 보기(검색/피벗)는 아래 Evidence 섹션에서 확인할 수 있습니다.
                </p>
                <button
                  type="button"
                  onClick={() => setShowInlineCSV(false)}
                  className="rounded-full border border-black/10 bg-white px-3 py-1.5 text-[12px] text-black/70 hover:bg-black/[0.03] transition"
                >
                  접기
                </button>
              </div>
            </div>
          ) : null}
        </div>
      </section>

      <Divider />

      {/* ================= Histogram (retention intention) ================= */}
      <section>
        <SectionTitle
          eyebrow="Signals"
          title="Retention intention as a distribution"
          desc="재참여 의향을 ‘평균’이 아니라 ‘분포’로 읽어 운영 조정의 우선순위를 만들었습니다."
        />
        {csv.loading || csv.err ? (
          <div className="rounded-[22px] border border-black/10 bg-white p-5">
            <p className="text-[13.5px] text-black/60">
              {csv.loading ? "CSV를 불러오는 중입니다…" : `CSV 오류: ${csv.err}`}
            </p>
          </div>
        ) : (
          <LikertHistogram
            title="재참여 의향 분포 (Likert 1–5)"
            headers={csv.headers}
            rows={csv.rows}
          />
        )}
      </section>

      <Divider />

      {/* ================= Evidence (CSV full) ================= */}
      <section>
        <SurveyCSVSection csv={csv} />
      </section>

      <Divider />

      {/* ================= Decision System (Rule Cards - OPENAI NEWSROOM STYLE) ================= */}
      <section>
        <SectionTitle
          eyebrow="Decision System"
          title="Role-based moderation rules"
          desc="운영은 한 명의 리더가 통제하는 방식이 아니라, 상황에 따라 역할이 분화·교체되는 모더레이션 구조로 설계되었습니다."
        />

        <p className="text-[14px] leading-7 text-black/70">
          역할은 특정 인물에게 고정되지 않았고, 회차와 상태에 따라 유동적으로 교체되었습니다. 이 구조를 운영하기 위해
          최소 <strong>2명 이상의 운영자</strong>가 필요했습니다. (온보딩·페이싱·대화 조율을 동시에 수행하기 위해)
          <br />
          운영자 고정이 아니라, 회차마다 역할을 교체할 수 있도록 설계했습니다.
        </p>

        {/* Updated Grid for OpenAI Style - Slightly more vertical rhythm */}
        <div className="mt-12 grid gap-12 md:grid-cols-2">
          <RuleCard
            subtitle="Rule Card 01"
            title="Onboarding Moderator"
            bullets={[
              { label: "역할", text: "첫 방문자의 긴장 완화, 그날 세션의 분위기 톤 제시" },
              { label: "개입 기준", text: "초면 비율이 높을수록 개입을 강화" },
              { label: "판단 신호", text: "자기소개 이후 말의 속도, 웃음/침묵의 비율" },
            ]}
            purpose="“여기는 평가받는 자리가 아니다”라는 신호를 초기에 고정합니다."
          />

          <RuleCard
            subtitle="Rule Card 02"
            title="Running Pacer"
            bullets={[
              { label: "역할", text: "러닝 강도를 ‘운동 성취’가 아닌 ‘대화 가능 상태’에 맞춥니다." },
              { label: "개입 기준", text: "호흡이 과도하게 가빠질 경우 즉시 감속합니다." },
              { label: "판단 신호", text: "러닝 중 말의 단절 여부, 대화 유지 가능성" },
            ]}
            purpose="러닝을 성과가 아니라 전처리(pre-processing) 단계로 유지합니다."
          />

          <RuleCard
            subtitle="Rule Card 03"
            title="Running Conversation Moderator"
            bullets={[
              { label: "역할", text: "러닝 중 자연스러운 대화 흐름을 유지하고, 쏠림을 완화합니다." },
              { label: "개입 기준", text: "침묵이 길어지거나 특정 주제에서 긴장이 발생하면 개입합니다." },
              { label: "판단 신호", text: "응답 간격, 대화 참여자 분포" },
            ]}
            purpose="움직임 속에서도 비교와 위계를 만들지 않는 상태를 유지합니다."
          />

          <RuleCard
            subtitle="Rule Card 04"
            title="Coffee Session Moderator"
            bullets={[
              { label: "역할", text: "대화의 깊이를 조절하고, 과열/과도한 노출을 완충합니다." },
              { label: "개입 기준", text: "대화 잔류 시간이 급격히 줄어들면 구조를 조정합니다." },
              { label: "판단 신호", text: "자리 이탈 타이밍, 질문의 방향성" },
            ]}
            purpose="대화를 ‘성과’가 아니라 ‘정리 가능한 경험’으로 마무리합니다."
          />
        </div>

        <div className="mt-10 rounded-[22px] border border-black/10 bg-white p-5">
          <p className="text-[12px] text-black/45">Decision logic</p>
          <p className="mt-2 text-[13.5px] leading-7 text-black/80">
            의사결정은 정답을 찾기보다, 경험의 마찰력(friction)을 만들어내는 조건을 제거하는 방식으로 이루어졌습니다.
            정성 신호(말의 속도, 침묵의 밀도, 체류 시간)를 운영 수정의 트리거(trigger)로 사용했습니다.
          </p>
        </div>
      </section>

      <Divider />

      {/* ================= Output ================= */}
      <section>
        <SectionTitle
          eyebrow="Output"
          title="What changed once the criteria shifted"
          desc="결론을 ‘나열’이 아니라, 결과물이 보이도록 카드 형태로 고정했습니다."
        />

        {/* ✅ Output 임팩트: 카드 3장 */}
        <OutputCards
          items={[
            {
              eyebrow: "Retention loop",
              title: "예측 가능한 재참여",
              desc:
                "외부 마케팅 없이도, 경험 설계만으로 재참여가 반복되는 루프가 만들어졌습니다. 운영의 핵심은 ‘성장’이 아니라 ‘재현 가능한 상태’였습니다.",
            },
            {
              eyebrow: "Operational stability",
              title: "룰과 역할로 품질 방어",
              desc:
                "운영자가 매번 에너지를 쏟지 않아도, 역할 분화와 개입 기준이 세션 품질을 방어하도록 구조화했습니다.",
            },
            {
              eyebrow: "Cultural replication",
              title: "참여자가 문화를 재현",
              desc:
                "대화 방식과 톤을 참여자가 학습·복제할 수 있도록 언어/기록 구조를 고정했습니다. ‘모임’이 아니라 ‘운영 가능한 문화’로 전환되었습니다.",
            },
          ]}
        />
      </section>

      <Divider />

      {/* ================= Final Definition ================= */}
      <section>
        <SectionTitle
          eyebrow="Final Definition"
          title="Designing the unit of ‘state’"
          desc="정의로 끝내지 않고, ‘할 수 있는 일’로 마무리했습니다."
        />

        <p className="text-[14px] leading-7 font-medium text-black/80">
          브랜드는 정체성을 고정하는 것이 아니라, 서로 다른 상태들이 안전하게 만날 수 있게 만드는 기준입니다.
        </p>

        <p className="mt-4 text-[14px] leading-7 text-black/70">
          PMCC는 하나의 커뮤니티 사례라기보다, 사람이 머무르고 떠나는 판단이 어떻게 형성되는지를 구조적으로 다룬
          프로젝트였습니다.
        </p>

        <p className="mt-4 text-[14px] leading-7 text-black/70">
          이 프로젝트 이후, 기획의 출발점은 기능이나 콘텐츠가 아니라{" "}
          <strong>경험이 끝난 뒤 사용자에게 남아야 할 상태</strong>로 이동했습니다. 이후 모든 기획은 기능을 쌓기 전에,
          경험 이후 어떤 상태가 남아야 하는지부터 정의합니다.
        </p>

        {/* ✅ Final 임팩트 박스 */}
        <div className="mt-8 rounded-[22px] border border-black/10 bg-black px-5 py-5">
          <p className="text-[12px] text-white/65">What this enables</p>
          <div className="mt-3 grid gap-2 text-[13.5px] leading-7 text-white/90">
            <p>• 정량 지표와 실제 행동 변화의 괴리를 구조적으로 진단하고, 기준을 재설계할 수 있습니다.</p>
            <p>• 경험 설계를 “기능 나열”이 아니라 “상태 정의 → 신호 관측 → 개입 규칙”으로 운영할 수 있습니다.</p>
            <p>• 브랜딩을 “표현”이 아니라 “운영 재현성” 관점에서 시스템화할 수 있습니다.</p>
          </div>
        </div>
      </section>

      <Divider />

      {/* ================= Next ================= */}
      <section>
        <SectionTitle
          eyebrow="Next"
          title="Where this expands"
          desc="확장 가능성을 ‘추상’이 아니라 적용 분야로 구체화했습니다."
        />

        <p className="text-[14px] leading-7 text-black/70">
          PMCC 운영 경험을 통해 배운 것은 러닝 자체에 대한 경험이  아니라, 사람들이 경험 이후 어떤 상태로 남는지에 대한 판단 구조였습니다. 이 기준은
          오프라인 커뮤니티를 넘어, 보이지 않는 경험을 정량화해야 하는 영역으로 확장될 수 있습니다.
        </p>

        <div className="mt-6 grid gap-3 rounded-[22px] border border-black/10 bg-white p-5">
          <p className="text-[12px] text-black/45">Expansion targets</p>
          <p className="text-[13.5px] leading-7 text-black/75">
            • 웰니스 앱: 감정선(긴장/완화) 기반 리텐션 설계, 상태 신호를 입력값으로 전환
            <br />
            • 공간 UX: 체류/대화/이탈 신호를 관측해 공간 운영(동선·좌석·소리)으로 연결
            <br />
            • 조직 문화/HR: 심리적 안전감의 신호를 측정하고, 팀 운영 규칙(온보딩/피드백 구조)로 고정
          </p>
        </div>
      </section>
            {/* ================= Navigation ================= */}
      <section>
        <div className="mt-8 flex flex-wrap gap-3">
          <a
            href="/projects/empty-house-cps"
            className="inline-flex h-10 items-center justify-center rounded-full border border-black/10 bg-white px-5 text-[13px] font-medium text-black/70 hover:text-black transition"
          >
            ← 프로젝트 1 보기
          </a>
          <a
            href="/projects/skin-diary-ai"
            className="inline-flex h-10 items-center justify-center rounded-full border border-black/10 bg-white px-5 text-[13px] font-medium text-black/70 hover:text-black transition"
          >
            프로젝트 2 보기 →
          </a>
          <a
            href="/"
            className="inline-flex h-10 items-center justify-center rounded-full border border-black/10 bg-black px-5 text-[13px] font-medium text-white hover:bg-black/90 transition"
          >
            홈으로 돌아가기
          </a>
        </div>
      </section>
    </main>
  );
}