// app/resume/page.tsx
import Link from "next/link";

export default function ResumePage() {
  const notionUrl = process.env.NEXT_PUBLIC_RESUME_URL?.trim();

  return (
    <main className="mx-auto max-w-[860px] px-6 py-20">
      {/* Header */}
      <header className="mb-10">
        <p className="font-mono text-[12px] uppercase tracking-widest text-black/45">
          Resume / Overview
        </p>
        <h1 className="mt-3 text-[28px] font-semibold tracking-[-0.02em] text-black">
          Resume
        </h1>
        <p className="mt-4 max-w-[720px] text-[14.5px] leading-7 text-black/65 word-keep-all">
          이 페이지는 포트폴리오 전체를 빠르게 스캔하기 위한 요약 인덱스입니다.
          연도 기준의 상세 이력은 <span className="text-black/80">Timeline</span>에서,
          프로젝트 오버뷰 외부 버전은 <span className="text-black/80">Notion Overview</span>에서
          확인할 수 있습니다.
        </p>

        {/* ✅ 홈으로 돌아가기 버튼 추가 */}
        <div className="mt-6 flex flex-wrap gap-3">
          <Link
            href="/"
            className="inline-flex h-10 items-center justify-center rounded-full border border-black/10 bg-white px-5 text-[13px] font-medium text-black/70 hover:text-black transition"
          >
            ← Back to Home
          </Link>
        </div>
      </header>

      {/* Summary */}
      <section className="mb-10">
        <h2 className="text-[13px] font-semibold text-black/70 uppercase tracking-wide">
          Summary
        </h2>
        <div className="mt-4 rounded-[22px] border border-black/10 bg-white p-7">
          <p className="text-[15px] leading-8 text-black/75 word-keep-all">
            복잡한 문제를 <span className="font-semibold text-black">의사결정 구조</span>로 설계하고
            실행해 온 문제 해결자입니다. 감각적·정성적 영역의 문제를{" "}
            <span className="font-semibold text-black">상태(State), 변수, 조건</span>으로 재정의하고,
            이를 실제로 작동하는 <span className="font-semibold text-black">시스템과 운영 구조</span>로
            구현해 왔습니다.
          </p>

          <p className="mt-4 text-[14px] leading-7 text-black/65 word-keep-all">
            일관되게 수행해 온 역할은 무엇을 만들 것인가보다{" "}
            <span className="font-semibold text-black">어떤 기준으로 판단하게 할 것인가</span>를
            설계하는 일이었습니다.
          </p>
        </div>
      </section>

      {/* Links */}
      <section className="rounded-[22px] border border-black/10 bg-white p-7">
        <h2 className="text-[13px] font-semibold text-black/70 uppercase tracking-wide">
          Links
        </h2>
        <p className="mt-3 text-[14px] leading-7 text-black/65 word-keep-all">
          필요에 따라 아래 링크로 이동해 확인할 수 있습니다.
        </p>

        <div className="mt-6 flex flex-col gap-3 sm:flex-row sm:items-center">
          <Link
            href="/resume/timeline"
            className="inline-flex items-center justify-center rounded-full border border-black/10 bg-black px-6 py-3 text-[13px] font-semibold text-white transition hover:bg-black/90"
          >
            View Timeline →
          </Link>

          {notionUrl ? (
            <a
              href={notionUrl}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center justify-center rounded-full border border-black/10 bg-white px-6 py-3 text-[13px] font-semibold text-black/80 transition hover:border-black/20"
            >
              Notion Overview →
            </a>
          ) : (
            <div className="rounded-[16px] border border-black/10 bg-white px-5 py-3">
              <p className="text-[12.5px] leading-6 text-black/55 word-keep-all">
                Notion Overview 링크가 비어 있습니다.{" "}
                <code className="rounded bg-black/5 px-1.5 py-0.5">
                  NEXT_PUBLIC_RESUME_URL
                </code>
                을 설정해 주세요.
              </p>
            </div>
          )}
        </div>
      </section>
    </main>
  );
}
