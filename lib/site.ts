/**
 * Site facts in one place: who I am, and how to reach me. Pages, metadata and
 * the OG image read from here so the title can't drift between them.
 */

export const NAME = 'Shreyas Jadhav';

/** Current role, exactly as it should read. Used on About and in the meta
    tags (title, description, share image); not in the hero. */
export const ROLE = 'Product Associate at Amber, joining super.money as APM';

/** The hero's one line under the name. */
export const HERO_LINE =
  'I build internal tools and AI agents, find where users drop off, and ship the fix.';

export const EMAIL = 'shreyasjadhav531@gmail.com';

export const X_HANDLE = '@shreyasinpublic';
export const X_URL = 'https://x.com/shreyasinpublic';

/**
 * Cal.com booking link. TODO(shreyas): replace with the real event URL before
 * deploying. While this is the placeholder, booking buttons still render (so
 * the layout can be reviewed) and point here.
 */
export const BOOKING_URL = 'https://cal.com/REPLACE-ME/20min';
export const BOOKING_IS_PLACEHOLDER = BOOKING_URL.includes('REPLACE-ME');
