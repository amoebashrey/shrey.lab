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
