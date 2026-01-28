"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

export default function HomeButton() {
  const pathname = usePathname();

  // 홈은 기본 제외, Resume은 별도 버튼이 있으니 제외
  const hidden = new Set<string>(["/", "/en", "/resume", "/en/resume"]);
  if (!pathname || hidden.has(pathname)) return null;

  // ✅ 핵심: 현재 페이지가 /en 으로 시작하면 홈도 /en 으로
  const homeHref = pathname.startsWith("/en") ? "/en" : "/";

  return (
    <div className="fixed right-4 top-4 z-50">
      <Link
        href={homeHref}
        className="inline-flex items-center gap-2 rounded-full border border-black/10 bg-white/80 px-4 py-2 text-[13px] font-medium text-black/70 backdrop-blur hover:bg-white transition"
      >
        ← Home
      </Link>
    </div>
  );
}
