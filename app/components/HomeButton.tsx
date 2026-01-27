'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

export default function HomeButton() {
  const pathname = usePathname();

  // 버튼을 숨길 경로들 (홈은 기본 제외, Resume은 이미 "Back to Home"이 있어 제외)
  const hidden = new Set<string>(['/', '/resume']);

  if (!pathname || hidden.has(pathname)) return null;

  return (
    <div className="fixed right-4 top-4 z-50">
      <Link
        href="/"
        className="inline-flex items-center gap-2 rounded-full border border-black/10 bg-white/80 px-4 py-2 text-[13px] font-medium text-black/70 backdrop-blur hover:bg-white transition"
      >
        ← Home
      </Link>
    </div>
  );
}
