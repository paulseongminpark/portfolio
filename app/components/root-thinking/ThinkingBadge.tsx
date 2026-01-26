
import Link from 'next/link';

export default function ThinkingBadge({ label, href }: { label: string; href: string }) {
  return (
    <Link
      href={href}
      className="inline-flex items-center rounded-full border border-black/10 bg-black/[0.03] px-3 py-1 text-[12px] text-black/70 hover:bg-black/10 transition"
    >
      {label} →
    </Link>
  );
}
