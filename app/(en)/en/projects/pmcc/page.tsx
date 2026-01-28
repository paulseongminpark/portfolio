

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
     - pmcc_survey_en.csv

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
        aria-label="Close"
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
            Close
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
          caption={caption ? `${caption} (Click to enlarge)` : "Click to enlarge"}
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
            Measurable achievement indicators
          </p>
        </div>
        <div className="border-l border-black/10 px-5 py-4">
          <p className="text-[12px] text-black/45">{rightTitle}</p>
          <p className="mt-1 text-[13px] font-medium text-black/75">
            Signals that created actual behavioral change
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
          The key was not "increasing achievement" but "reading signals to reproduce states more stably."
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
  const [open, setOpen] = useState(false);
  const touch = useRef<{ x: number; y: number; t: number } | null>(null);

  const clamp = (n: number) => Math.max(0, Math.min(slides.length - 1, n));
  const go = (n: number) => setIndex(clamp(n));
  const prev = () => go(index - 1);
  const next = () => go(index + 1);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (!open) return; // ✅ 모달 열렸을 때만 키로 이동
      if (e.key === "ArrowLeft") prev();
      if (e.key === "ArrowRight") next();
      if (e.key === "Escape") setOpen(false);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [open, index]);

  const current = slides[index];

  return (
    <>
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
          {/* ✅ 이미지 클릭 → 모달 오픈 */}
          <button
            type="button"
            onClick={() => setOpen(true)}
            aria-label="Open image"
            className="absolute inset-0 z-[1] block"
          >
            <Image
              src={current.src}
              alt={current.alt}
              fill
              sizes="(max-width: 768px) 100vw, 720px"
              className={`object-cover ${current.imgClassName ?? "object-center"}`}
            />
          </button>

          {/* 그라데이션 오버레이는 클릭 막지 않게 pointer-events-none */}
          <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/45 via-black/0 to-black/0" />

          {/* 좌우 버튼은 이미지 위로 떠야 하므로 z-index 올림 */}
          <button
            type="button"
            onClick={prev}
            aria-label="Previous"
            className="absolute left-3 top-1/2 z-[2] -translate-y-1/2 rounded-full border border-white/25 bg-black/30 px-3 py-2 text-[12px] text-white backdrop-blur hover:bg-black/45 transition"
          >
            ←
          </button>
          <button
            type="button"
            onClick={next}
            aria-label="Next"
            className="absolute right-3 top-1/2 z-[2] -translate-y-1/2 rounded-full border border-white/25 bg-black/30 px-3 py-2 text-[12px] text-white backdrop-blur hover:bg-black/45 transition"
          >
            →
          </button>

          <div className="absolute right-3 top-3 z-[2] rounded-full border border-white/20 bg-black/30 px-3 py-1 text-[12px] text-white backdrop-blur">
            {index + 1} / {slides.length}
          </div>

          <div className="absolute bottom-0 left-0 right-0 z-[2] p-4">
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
                aria-label={`Slide ${i + 1}`}
                className={`h-1.5 w-1.5 rounded-full transition ${
                  i === index ? "bg-black/55" : "bg-black/15 hover:bg-black/25"
                }`}
              />
            ))}
          </div>
          <p className="text-[12px] text-black/45">Click the image to zoom.</p>
        </div>
      </div>

      {/* ✅ 확대 모달 (원본비율 + 모달에서도 좌/우 이동 + 화살표 위치 고정) */}
      <Modal open={open} onClose={() => setOpen(false)} title={current.alt}>
        <div className="relative h-[80vh]">
          <div className="h-full overflow-auto [scrollbar-gutter:stable]">
            <div className="mx-auto w-full max-w-[1200px] py-2">
              <Image
                src={current.src}
                alt={current.alt}
                width={1200}
                height={1200}
                className="h-auto w-full rounded-[18px] border border-black/10 bg-white"
                style={{ objectFit: "contain" }}
                sizes="(max-width: 1200px) 92vw, 1200px"
              />
              <p className="mt-3 text-[12.5px] leading-6 text-black/60">{current.caption}</p>
            </div>
          </div>

          <button
            type="button"
            onClick={prev}
            aria-label="Previous"
            disabled={index === 0}
            className="absolute left-3 top-1/2 -translate-y-1/2 rounded-full border border-black/10 bg-white/80 px-3 py-2 text-[12px] text-black/70 backdrop-blur hover:bg-white transition disabled:opacity-40"
          >
            ←
          </button>

          <button
            type="button"
            onClick={next}
            aria-label="Next"
            disabled={index === slides.length - 1}
            className="absolute right-3 top-1/2 -translate-y-1/2 rounded-full border border-black/10 bg-white/80 px-3 py-2 text-[12px] text-black/70 backdrop-blur hover:bg-white transition disabled:opacity-40"
          >
            →
          </button>

          <div className="absolute right-3 top-3 rounded-full border border-black/10 bg-white/80 px-3 py-1 text-[12px] text-black/70 backdrop-blur">
            {index + 1} / {slides.length}
          </div>
        </div>
      </Modal>
    </>
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
        if (!res.ok) throw new Error(`Failed to load CSV (${res.status})`);

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
        setErr(e?.message ?? "An error occurred while loading CSV.");
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
    {/* ✅ horizontal scroll */}
    <div className="overflow-x-auto [scrollbar-gutter:stable]">
      <table className="min-w-[1200px] w-full border-collapse text-left">
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
                  className="px-4 py-3 text-[12.5px] text-black/70 align-top whitespace-nowrap"
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
        Preview shows only the first {maxRows} rows.
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
                Question (Column)
              </th>
              <th className="whitespace-nowrap px-4 py-3 text-[12px] font-medium text-black/55">
                Response (Value)
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
                  No responses to display.
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
          PMCC did not design activities but rather designed a mechanism to create and maintain <strong>states</strong>.
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
              <text x="86" y="138">• Pace / Intensity</text>
              <text x="86" y="158">• Group size</text>
              <text x="86" y="178">• Onboarding rules</text>
              <text x="86" y="198">• Role assignment</text>

              <text x="316" y="138">• Tension relief</text>
              <text x="316" y="158">• Reduced comparison</text>
              <text x="316" y="178">• Psychological safety</text>

              <text x="546" y="138">• Conversation start speed</text>
              <text x="546" y="158">• Silence density</text>
              <text x="546" y="178">• Dwell time</text>
              <text x="546" y="198">• Feedback keywords</text>

              <text x="776" y="138">• Pace adjustment</text>
              <text x="776" y="158">• Conversation structure change</text>
              <text x="776" y="178">• Question intervention/stop</text>
              <text x="776" y="198">• Session length adjustment</text>

              <text x="316" y="388">• Predictable re-engagement</text>
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
              Input → State → Signals → Decision → Output (Create state, adjust by signals, stabilize outcome)
            </text>
          </svg>
        </div>

        <p className="mt-4 px-1 text-[12px] leading-6 text-black/55">
          Observed signals were not left as "feelings" but connected to role-based interventions (Moderator Actions).
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
          Interpreted as <strong>distribution shape</strong> rather than average. (Column:{" "}
          <span className="text-black/70">{data.label || "Not detected"}</span>)
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
            Low range (1–2) indicates potential failure to relieve initial tension, mid-range (3) indicates state formed but insufficient afterimage, and high range (4–5) indicates sections where dwell time and relationship continuation are possible.
          </p>
          <p className="text-[13px] leading-6 text-black/70">
            The goal was not to raise the average, but to <strong>reduce the low range and stably reproduce the high range</strong>.
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
        desc="To connect surveys to operational judgments, responses were structured as CSV."
      />

      {/* ✅ Key Insight box added */}
      <div className="rounded-[22px] border border-black/10 bg-white p-5">
        <p className="text-[12px] text-black/45">Key insight</p>
        <p className="mt-2 text-[13.5px] leading-7 text-black/75">
          In responses with high re-engagement intention, the tendency of "comfort/connection/conversation density" related questions and keywords being reinforced together was repeatedly observed. That is, the core achievement of PMCC was not "running satisfaction" but <strong>creating a structure where the formation of safety directly leads to retention</strong>.
        </p>
      </div>

      <p className="mt-6 text-[14px] leading-7 text-black/70">
        To not leave experience as just "it was good," the state after each session was collected as input. Survey data was used not to evaluate satisfaction, but as criteria to judge conditions that need to be adjusted in the next operation.
      </p>

      <div className="mt-6 mx-auto w-full max-w-[1200px] rounded-[22px] border border-black/10 bg-white p-5">
        {loading ? (
          <p className="text-[13.5px] text-black/60">Loading CSV…</p>
        ) : err ? (
          <p className="text-[13.5px] text-black/60">
            Failed to load CSV: <span className="text-black/75">{err}</span>
          </p>
        ) : (
          <>
            <div className="flex flex-wrap items-start justify-between gap-3">
              <div>
                <p className="text-[12px] text-black/45">Data Snapshot</p>
                <p className="mt-2 text-[13.5px] leading-7 text-black/70">
                  Period <strong>{stats?.period ?? "-"}</strong>
                </p>
              </div>

              <div className="flex flex-wrap items-center gap-2">
                <button
                  type="button"
                  onClick={() => setOpen(true)}
                  className="inline-flex items-center justify-center rounded-full border border-black/10 bg-white px-4 py-2 text-[12.5px] text-black/70 hover:bg-black/[0.03] transition"
                >
                  View full in portfolio
                </button>
              </div>
            </div>

            <div className="mt-6">
              <p className="mb-2 text-[12px] text-black/45">Preview (first 20 rows)</p>
              <CSVTable headers={headers} rows={rows} maxRows={20} />
            </div>

            <Modal open={open} onClose={() => setOpen(false)} title="PMCC Survey CSV">
              <div className="flex flex-wrap items-end justify-between gap-3">
                <div className="min-w-[240px]">
                  <p className="text-[12px] text-black/45">Search</p>
                  <input
                    value={q}
                    onChange={(e) => setQ(e.target.value)}
                    placeholder="Enter search term"
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
                      <option value={999999}>All</option>
                    </select>
                    <span className="text-[12px] text-black/45 whitespace-nowrap">
                      ({filteredRows.length} rows after filter)
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
                    Original table
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
                    Pivot (Question→Response)
                  </button>
                </div>

                {view === "pivot" ? (
                  <div className="flex items-center gap-2">
                    <span className="text-[12px] text-black/45">Select response</span>
                    <select
                      value={safePivotIndex}
                      onChange={(e) => setPivotIndex(Number(e.target.value))}
                      className="rounded-full border border-black/10 bg-white px-3 py-1.5 text-[12px] text-black/75 outline-none focus:border-black/20"
                    >
                      {filteredRows.slice(0, 200).map((_, i) => (
                        <option key={i} value={i}>
                          Response #{i + 1}
                        </option>
                      ))}
                      {filteredRows.length > 200 ? (
                        <option value={safePivotIndex}>… (Narrow with search first)</option>
                      ) : null}
                    </select>
                  </div>
                ) : null}
              </div>

              <div className="mt-4">
                <div className="overflow-auto max-h-[70vh] [scrollbar-gutter:stable]">
                <div className="min-w-[1200px]">
                  {view === "table" ? (
                    <CSVTable headers={headers} rows={viewRows} />
                  ) : (
                    <PivotView headers={headers} row={pivotRow} />
                  )}
                </div>
              </div>
            </div>


              <div className="mt-4 flex flex-wrap items-center justify-between gap-3">
                <p className="text-[12px] text-black/45">
                  Pivot view expands "one response (row)" into a "question-response list."
                </p>
                <button
                  type="button"
                  onClick={() => setOpen(false)}
                  className="inline-flex items-center justify-center rounded-full border border-black/10 bg-white px-4 py-2 text-[12.5px] text-black/70 hover:bg-black/[0.03] transition"
                >
                  Close
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
  const csvUrl = `${ASSET}/pmcc_survey_en.csv`;
  const csv = useCSVData(csvUrl);

  // Instagram order: 1 → 2 → 3 → 4 → 5
  const instaSlides: Slide[] = [
    {
      src: `${ASSET}/pmcc_insta1.png`,
      alt: "PMCC Instagram 1",
      caption:
        "Observation: Sessions with longer dwell time after running · Intent: Record state conditions · Signal: Retention↑ → Maintain intensity",
      imgClassName: "object-center",
    },
    {
      src: `${ASSET}/pmcc_insta2.png`,
      alt: "PMCC Instagram 2",
      caption:
        "Observation: Sessions where conversation started naturally · Intent: Preserve start conditions · Signal: Comparison↓ → Maintain structure",
      imgClassName: "object-center",
    },
    {
      src: `${ASSET}/pmcc_insta3.png`,
      alt: "PMCC Instagram 3",
      caption:
        "Observation: Conversation dispersed after tension relief · Intent: Maintain comfortable pace · Signal: Speech speed stable",
      imgClassName: "object-[right_center]",
    },
    {
      src: `${ASSET}/pmcc_insta4.png`,
      alt: "PMCC Instagram 4",
      caption:
        "Observation: Sessions with afterimage remaining in conversation session after running · Intent: Fix closing routine · Signal: Re-engagement↑",
      imgClassName: "object-[right_center]",
    },
    {
      src: `${ASSET}/pmcc_insta5.png`,
      alt: "PMCC Instagram 5",
      caption:
        "Observation: Adjusted so records are not read as 'promotion' · Intent: Externalize state · Signal: Maintain tone consistency",
      imgClassName: "object-[right_center]",
    },
  ];

  // Feedback Loop: Automatically show CSV 20-row preview when button is clicked
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

        {/* ✅ Hero first sentence: Quantitative impact → Conversion */}
        <p className="mt-4 text-[14px] leading-7 text-black/70">
          Expanded a running-based community from 0 to <strong>168 members</strong>, creating an operational loop where re-engagement does not break.
          <br />
          However, the core of this project was not the numbers themselves, but the <strong>'State Design'</strong> that created those numbers.
        </p>

        <p className="mt-4 text-[14px] leading-7 text-black/70">
          Even with the same program, some days people stayed, and some days they dispersed naturally. This difference occurred repeatedly not from the completeness of activities, but from the state and afterimage remaining after the experience ended.
        </p>

        <p className="mt-4 text-[14px] leading-7 text-black/70">
          This project is not a record of gathering people through running, but a record of designing criteria to maintain and adjust the state and afterimage remaining after experience.
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
            caption="Running scenes were used not as 'records' but as scenes conveying the tone of the state."
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
          title="What seemed to matter, but didn't"
          desc="Discrepancies repeatedly occurred between measurable achievement indicators and actual behavioral change."
        />

        <p className="text-[14px] leading-7 text-black/70">
          In early operations, it was assumed that measurable elements like distance, pace, and course would determine the quality of experience. However, actual attrition and re-engagement were not consistently connected to these indicators.
        </p>

        <p className="mt-4 text-[14px] leading-7 text-black/70">
          The problem was not performance, but that there were no criteria to explain and adjust the gap between achievement indicators (distance, pace) and actual re-engagement (retention).
        </p>

        {/* ✅ Problem contrast table added */}
        <div className="mt-8">
          <CompareTable
            leftTitle="As-is"
            rightTitle="To-be"
            rows={[
              { left: "Distance (5km, 10km)", right: "Conversation start speed" },
              { left: "Pace (5'30\", 6'00\")", right: "Dwell time after running" },
              { left: "Course (Hangang, Olympic Park)", right: "Silence density" },
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
          desc="Signals that were difficult to quantify repeatedly created behavioral change."
        />

        <p className="text-[14px] leading-7 text-black/70">
          Common state changes were observed in sessions where re-engagement occurred. Dwell time increased only when comparison and tension between participants were relieved and psychological safety was formed.
        </p>

        <p className="mt-4 text-[14px] leading-7 text-black/70">
          These signals were difficult to quantify, but repeatedly created the same behavioral change. Therefore, PMCC took "state" rather than "activity" as the design target.
        </p>
      </section>

      <Divider />

      {/* ================= Mechanism Diagram ================= */}
      <section>
        <SectionTitle
          eyebrow="Mechanism"
          title="How retention was produced"
          desc="Fixed Input → State → Signals → Decision → Output in one diagram."
        />
        <MechanismDiagram />
      </section>

      <Divider />

      {/* ================= Shift ================= */}
      <section>
        <SectionTitle
          eyebrow="Shift"
          title="Reframing the Run"
          desc="Running was redefined not as a goal, but as a condition to create state."
        />

        <p className="text-[14px] leading-7 text-black/70">
          Running was redefined not as a purpose, but as a pre-processing condition to lower psychological defense mechanisms. After that, the operational criteria shifted from "how well we ran" to "whether a state where conversation can begin was formed."
        </p>

        <p className="mt-4 text-[14px] leading-7 text-black/70">
          The program was adjusted not to create achievement, but to not interfere with that state.
        </p>

        {/* ✅ Shift: Before/After contrast block */}
        <div className="mt-8">
          <CompareTable
            leftTitle="As-is"
            rightTitle="To-be"
            rows={[
              { left: "KPI: Distance/Speed/Completion", right: "KPI: Conversation density/Psychological safety" },
              { left: "Focus: Physical achievement", right: "Focus: Emotional de-escalation" },
              { left: "Role: Pacemaker", right: "Role: State Architect" },
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
          desc="Branding was not expression, but a device to reproduce the same state even when operators change."
        />

        <p className="text-[14px] leading-7 text-black/70">
          PMCC's branding was not about creating images, but about fixing conditions that allow various people to stay under the same criteria. Color, images, and recording methods were all designed not to emphasize specific characteristics but to maintain a state where comparison and evaluation do not operate.
        </p>

        {/* ✅ Reinforced with functional reasoning (affordance) */}
        <p className="mt-4 text-[14px] leading-7 text-black/70">
          Color and typography were designed not just as aesthetic elements, but as <strong>UX devices (affordance)</strong> that make participants intuitively understand "this is how to behave here" without operator intervention.
        </p>

        <div className="mt-8 grid items-stretch gap-4 md:grid-cols-2">
          <ImgCard
            src={`${ASSET}/logo_blue.JPG`}
            alt="PMCC logo blue"
            caption="Visual reference point to maintain the same tone even when operators change"
            aspect="square"
            coverClassName="object-center"
          />
          <ImgCard
            src={`${ASSET}/poster_coffee1.JPG`}
            alt="PMCC poster coffee"
            caption="Fixed coffee conversation as the main scene so expectations align with 'relationship' rather than 'exercise'"
            aspect="square"
            coverClassName="object-center"
          />
        </div>

        <div className="mt-6 grid gap-4 md:grid-cols-2">
          <LightboxImage
            src={`${ASSET}/visaul_dev_notes.jpeg`}
            alt="PMCC visual development notes"
            caption="Observation: Shaky rules · Intent: Verbalize · Signal: Operational reproducibility"
            coverClassName="object-center"
          />
          <LightboxImage
            src={`${ASSET}/moodboard.jpeg`}
            alt="PMCC moodboard"
            caption="Observation: Mixed moods blur criteria · Intent: Separate · Signal: Selection speed↑"
            coverClassName="object-center"
          />
        </div>

        <div className="mt-6">
          <ImgCard
            src={`${ASSET}/palette.PNG`}
            alt="PMCC palette"
            caption="Palette: Reference values that narrow choices so tone is maintained without operational intervention."
            aspectClassName="aspect-[16/4]"
            contain
          />
        </div>

        <div className="mt-6 rounded-[22px] border border-black/10 bg-white p-5">
          <p className="text-[12px] text-black/45">Color</p>
          <p className="mt-2 text-[13.5px] leading-7 text-black/80">
            Color conveys 'attitude' before 'personality.' Used as a signal to lower tension at the first touchpoint and preempt an atmosphere where comparison does not operate.
          </p>
        </div>

        <div className="mt-10 rounded-[22px] border border-black/10 bg-white p-5">
          <p className="text-[12px] text-black/45">One-line principle</p>
          <p className="mt-2 text-[13.5px] leading-7 text-black/80">
            Brand is not about fixing identity, but creating criteria that allow different states to meet safely.
          </p>
        </div>
      </section>

      <Divider />

      {/* ================= Archive (Instagram) ================= */}
      <section>
        <SectionTitle
          eyebrow="Archive"
          title="Instagram as an interface"
          desc="Instagram was used not as records, but as a surface to externalize state."
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

        {/* ✅ Reveal caption structure above slider first */}
        <div className="mb-4 rounded-[22px] border border-black/10 bg-black/[0.02] px-5 py-4">
          <p className="text-[12px] text-black/45">Caption structure</p>
          <div className="mt-2 grid gap-1 text-[13px] leading-6 text-black/70">
            <p>• Observation: What was seen</p>
            <p>• Intent: Why it was recorded</p>
            <p>• Signal: How it will be reflected in the next session</p>
          </div>
        </div>

        <InstaSlider slides={instaSlides} />

        <p className="mt-6 text-[14px] leading-7 text-black/70">
          Images were used not as results, but as <strong>recording units to judge state changes</strong>.
        </p>

        <p className="mt-3 text-[14px] leading-7 text-black/70">
          Fixed Observation·Intent·Signal so the archive functions as operational rationale.
        </p>
      </section>

      <Divider />

      {/* ================= Feedback Loop ================= */}
      <section>
        <SectionTitle
          eyebrow="Feedback Loop"
          title="Survey — turning signals into inputs"
          desc="Configured to redirect to external links, but data unfolds immediately within the portfolio."
        />

        <div className="rounded-[22px] border border-black/10 bg-white p-5">
          <p className="text-[14px] leading-7 text-black/70">
            To not leave experience as just "it was good," the state after each session was collected as input. After each session, indicators centered on conversation density, connection, and emotional residue were structured and collected as Likert scale and keyword responses.
          </p>

          <div className="mt-4 flex flex-wrap items-center gap-2">
            <a
              href="https://tally.so/r/wzZ42q"
              target="_blank"
              rel="noreferrer"
              onClick={() => setShowInlineCSV(true)}
              className="inline-flex items-center justify-center rounded-full border border-black/10 bg-black px-4 py-2 text-[12.5px] text-white"
            >
              View survey
            </a>
            <span className="text-[12px] text-black/45">tally.so/r/wzZ42q</span>
          </div>

          {showInlineCSV ? (
            <div className="mt-6">
              <p className="mb-2 text-[12px] text-black/45">CSV Preview (approx. 20 rows)</p>

              {csv.loading ? (
                <p className="text-[13.5px] text-black/60">Loading CSV…</p>
              ) : csv.err ? (
                <p className="text-[13.5px] text-black/60">
                  Failed to load CSV: <span className="text-black/75">{csv.err}</span>
                </p>
              ) : (
                <CSVTable headers={csv.headers} rows={csv.rows} maxRows={20} />
              )}

              <div className="mt-3 flex flex-wrap items-center justify-between gap-2">
                <p className="text-[12px] text-black/45">
                  More detailed viewing (search/pivot) is available in the Evidence section below.
                </p>
                <button
                  type="button"
                  onClick={() => setShowInlineCSV(false)}
                  className="rounded-full border border-black/10 bg-white px-3 py-1.5 text-[12px] text-black/70 hover:bg-black/[0.03] transition"
                >
                  Collapse
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
          desc="Read re-engagement intention as 'distribution' rather than 'average' to create operational adjustment priorities."
        />
        {csv.loading || csv.err ? (
          <div className="rounded-[22px] border border-black/10 bg-white p-5">
            <p className="text-[13.5px] text-black/60">
              {csv.loading ? "Loading CSV…" : `CSV error: ${csv.err}`}
            </p>
          </div>
        ) : (
          <LikertHistogram
            title="Re-engagement intention distribution (Likert 1–5)"
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
          desc="Operations were designed not as control by one leader, but as a moderation structure where roles differentiate and rotate according to situations."
        />

        <p className="text-[14px] leading-7 text-black/70">
          Roles were not fixed to specific individuals, but fluidly rotated according to sessions and states. To operate this structure, at least <strong>2 or more operators</strong> were needed (to simultaneously perform onboarding, pacing, and conversation coordination).
          <br />
          Designed so roles could be rotated in each session, not fixed operators.
        </p>

        {/* Updated Grid for OpenAI Style - Slightly more vertical rhythm */}
        <div className="mt-12 grid gap-12 md:grid-cols-2">
          <RuleCard
            subtitle="Rule Card 01"
            title="Onboarding Moderator"
            bullets={[
              { label: "Role", text: "Relieve tension of first-time visitors, present atmosphere tone of that day's session" },
              { label: "Intervention criteria", text: "Strengthen intervention as the proportion of first meetings increases" },
              { label: "Judgment signal", text: "Speed of speech after self-introduction, ratio of laughter/silence" },
            ]}
            purpose="Fix the signal early: 'This is not a place to be evaluated.'"
          />

          <RuleCard
            subtitle="Rule Card 02"
            title="Running Pacer"
            bullets={[
              { label: "Role", text: "Adjust running intensity not to 'athletic achievement' but to 'state where conversation is possible.'" },
              { label: "Intervention criteria", text: "Decelerate immediately if breathing becomes excessively rapid." },
              { label: "Judgment signal", text: "Interruption of speech during running, possibility of maintaining conversation" },
            ]}
            purpose="Maintain running as a pre-processing stage, not performance."
          />

          <RuleCard
            subtitle="Rule Card 03"
            title="Running Conversation Moderator"
            bullets={[
              { label: "Role", text: "Maintain natural conversation flow during running and ease bias." },
              { label: "Intervention criteria", text: "Intervene when silence lengthens or tension occurs on specific topics." },
              { label: "Judgment signal", text: "Response intervals, distribution of conversation participants" },
            ]}
            purpose="Maintain a state that does not create comparison and hierarchy even in movement."
          />

          <RuleCard
            subtitle="Rule Card 04"
            title="Coffee Session Moderator"
            bullets={[
              { label: "Role", text: "Adjust conversation depth and buffer overheating/excessive exposure." },
              { label: "Intervention criteria", text: "Adjust structure when conversation retention time decreases sharply." },
              { label: "Judgment signal", text: "Timing of leaving seats, direction of questions" },
            ]}
            purpose="Finish conversation not as 'performance' but as 'experience that can be organized.'"
          />
        </div>

        <div className="mt-10 rounded-[22px] border border-black/10 bg-white p-5">
          <p className="text-[12px] text-black/45">Decision logic</p>
          <p className="mt-2 text-[13.5px] leading-7 text-black/80">
            Decision-making was done not by finding the right answer, but by removing conditions that create friction in experience. Qualitative signals (speed of speech, silence density, dwell time) were used as triggers for operational modification.
          </p>
        </div>
      </section>

      <Divider />

      {/* ================= Output ================= */}
      <section>
        <SectionTitle
          eyebrow="Output"
          title="What changed once the criteria shifted"
          desc="Fixed conclusion not as 'enumeration,' but as card format so results are visible."
        />

        {/* ✅ Output impact: 3 cards */}
        <OutputCards
          items={[
            {
              eyebrow: "Retention loop",
              title: "Predictable re-engagement",
              desc:
                "Even without external marketing, a loop where re-engagement repeats was created solely through experience design. The core of operations was not 'growth' but 'reproducible state.'",
            },
            {
              eyebrow: "Operational stability",
              title: "Defend quality with rules and roles",
              desc:
                "Structured so role differentiation and intervention criteria defend session quality without operators having to exert energy every time.",
            },
            {
              eyebrow: "Cultural replication",
              title: "Participants reproduce culture",
              desc:
                "Fixed language/recording structure so participants can learn and replicate conversation methods and tone. Transformed from 'gathering' to 'operable culture.'",
            },
          ]}
        />
      </section>

      <Divider />

      {/* ================= Final Definition ================= */}
      <section>
        <SectionTitle
          eyebrow="Final Definition"
          title="Designing the unit of 'state'"
          desc="Did not end with definition, but finished with 'what can be done.'"
        />

        <p className="text-[14px] leading-7 font-medium text-black/80">
          Brand is not about fixing identity, but creating criteria that allow different states to meet safely.
        </p>

        <p className="mt-4 text-[14px] leading-7 text-black/70">
          PMCC was not just one community case, but a project that structurally dealt with how judgments about people staying and leaving are formed.
        </p>

        <p className="mt-4 text-[14px] leading-7 text-black/70">
          After this project, the starting point of planning shifted not to functions or content but to <strong>the state that should remain with users after the experience ends</strong>. After that, all planning starts by defining what state should remain after experience, before stacking functions.
        </p>

        {/* ✅ Final impact box */}
        <div className="mt-8 rounded-[22px] border border-black/10 bg-black px-5 py-5">
          <p className="text-[12px] text-white/65">What this enables</p>
          <div className="mt-3 grid gap-2 text-[13.5px] leading-7 text-white/90">
            <p>• Structurally diagnose the gap between quantitative indicators and actual behavioral change, and redesign criteria.</p>
            <p>• Operate experience design not as "feature enumeration" but as "state definition → signal observation → intervention rules."</p>
            <p>• Systematize branding from "expression" to "operational reproducibility" perspective.</p>
          </div>
        </div>
      </section>

      <Divider />

      {/* ================= Next ================= */}
      <section>
        <SectionTitle
          eyebrow="Next"
          title="Where this expands"
          desc="Concretized expansion possibilities not as 'abstract' but as application fields."
        />

        <p className="text-[14px] leading-7 text-black/70">
          What was learned through PMCC operation experience was not about running itself, but the judgment structure about what state people remain in after experience. This criterion can expand beyond offline communities to areas where invisible experiences must be quantified.
        </p>

        <div className="mt-6 grid gap-3 rounded-[22px] border border-black/10 bg-white p-5">
          <p className="text-[12px] text-black/45">Expansion targets</p>
          <p className="text-[13.5px] leading-7 text-black/75">
            • Wellness apps: Retention design based on emotional lines (tension/relaxation), converting state signals into input
            <br />
            • Spatial UX: Observing dwell/conversation/attrition signals and connecting to space operations (flow, seating, sound)
            <br />
            • Organizational culture/HR: Measuring signals of psychological safety and fixing them into team operation rules (onboarding/feedback structure)
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
            ← View Project 1
          </a>
          <a
            href="/projects/skin-diary-ai"
            className="inline-flex h-10 items-center justify-center rounded-full border border-black/10 bg-white px-5 text-[13px] font-medium text-black/70 hover:text-black transition"
          >
            View Project 2 →
          </a>
          <a
            href="/"
            className="inline-flex h-10 items-center justify-center rounded-full border border-black/10 bg-black px-5 text-[13px] font-medium text-white hover:bg-black/90 transition"
          >
            Back to Home
          </a>
        </div>
      </section>
    </main>
  );
}
