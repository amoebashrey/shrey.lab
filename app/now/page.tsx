import { notFound } from 'next/navigation';

/**
 * /now — hidden until there's a real, dated entry; the last one was stale.
 * The previous page (and its entry data) is in git history at 7f46f2e.
 */
export default function NowPage() {
  notFound();
}
