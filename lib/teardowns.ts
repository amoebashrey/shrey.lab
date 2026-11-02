/**
 * Product teardowns — unsolicited, done on my own time, each with a clickable
 * Figma prototype. Source: shreything.framer.website (case studies section),
 * links and years as published there. Newest first.
 *
 * These are teardowns, not client work: every card says so, with the year it
 * was done. (CLAUDE.md bans presenting them as real case studies; shown as
 * labelled teardowns at Shreyas's request — see DECISION_LOG.)
 */
export interface Teardown {
  company: string;
  year: number;
  /** The question the teardown answers, as the art's headline. */
  question: string;
  summary: string;
  href: string;
}

/**
 * Concept builds — working, clickable copies of a real app with my proposed
 * changes built in. Unofficial; people and data in them are made up.
 */
export interface ConceptBuild {
  company: string;
  /** Omitted when not confirmed. */
  year?: number;
  question: string;
  summary: string;
  /** Phone-width screenshot of the live demo (public/work). */
  image: string;
  imageAlt: string;
  links: ReadonlyArray<{ label: string; href: string }>;
}

export const CONCEPTS: readonly ConceptBuild[] = [
  {
    company: 'Swish',
    year: 2026,
    question: 'Why do late orders keep happening?',
    summary:
      'As Swish tripled its orders, late or stuck orders went from 11% to 23% of its low-star reviews. I read 2,800+ reviews, traced where delays start, and built a working demo of the fixes for customers, the kitchen and riders.',
    image: '/work/swish-demo.png',
    imageAlt: 'The Swish concept demo on a phone: the app home with offers and food categories',
    links: [
      { label: 'Try the demo', href: 'https://swish-demo-phi.vercel.app/' },
      { label: 'Read the deck', href: 'https://drive.google.com/file/d/1wdMxnAXnnVBEMlwFZet5pmuES2D1RNuz/view' },
    ],
  },
  {
    company: 'District',
    question: 'Why do group plans die in the chat?',
    summary:
      'Friends want to go out together, but the plan dies in the group chat. “Go together” lets a crew vote on the movie or place and the time, inside District. A working copy of the app with the additions built in.',
    image: '/work/district-demo.png',
    imageAlt: 'The District concept demo on a phone: the home screen with a “Free this weekend? Plan a night with your crew” card',
    links: [{ label: 'Try the demo', href: 'https://district-demo-alpha.vercel.app/' }],
  },
];

export const TEARDOWNS: readonly Teardown[] = [
  {
    company: 'Jar',
    year: 2025,
    question: 'How do you earn a shopkeeper’s trust with their gold savings?',
    summary: 'A custom flow for a persona the app wasn’t built around: shopkeepers saving in gold.',
    href: 'https://www.figma.com/proto/DWQvzoeBF39yIwuP2Y78Xq/Case-study?node-id=1247-288&t=4MpYRZjrP4DPbPdn-0&scaling=contain&content-scaling=fixed&page-id=1229%3A2',
  },
  {
    company: 'Swiggy Dineout',
    year: 2022,
    question: 'Where do we eat tonight?',
    summary: 'A redesign of how people discover restaurants, starting from that question.',
    href: 'https://www.figma.com/proto/DWQvzoeBF39yIwuP2Y78Xq/Case-study?type=design&node-id=36-3&t=eoyjn5shqhL5JM9a-0&scaling=contain&page-id=36%3A2',
  },
  {
    company: 'Neosurge',
    year: 2022,
    question: 'Can mutual funds feel simple to every kind of investor?',
    summary: 'A separate happy path for each kind of investor, so nobody gets the one-size flow.',
    href: 'https://www.figma.com/proto/DWQvzoeBF39yIwuP2Y78Xq/Case-study?node-id=864-3&node-type=frame&t=5RpLhZvVS2XV1CHD-0&scaling=scale-down&content-scaling=fixed&page-id=864%3A2',
  },
];
