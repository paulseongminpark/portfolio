'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

export default function HomeButton() {
  const pathname = usePathname();

  // Paths where the button should be hidden (EN routes)
  const hidden = new Set<string>(['/en', '/en/resume']);

  if (!pathname || hidden.has(pathname)) return null;

  return (
    <div className="fixed right-4 top-4 z-50">
      <Link
        href="/en"
        className="inline-flex items-center gap-2 rounded-full border border-black/10 bg-white/80 px-4 py-2 text-[13px] font-medium text-black/70 backdrop-blur hover:bg-white transition"
      >
        ← Back to Home
      </Link>
    </div>
  );
}
