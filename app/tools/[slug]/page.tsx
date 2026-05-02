import { notFound } from 'next/navigation';

interface PageProps {
  params: { slug: string };
}

export default function ToolPage({ params }: PageProps) {
  notFound();
}

export function generateStaticParams() {
  return [];
}
