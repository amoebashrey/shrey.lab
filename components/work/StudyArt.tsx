import Image from 'next/image';
import type { ReactNode } from 'react';
import './study-art.css';

/**
 * One visual system for every case-study image.
 *
 * StudyFrame: the same frame everywhere — an accent-tinted backdrop that
 * follows the hue slider, 12px corners, the same padding, and a plain sheet
 * inside (page surface colour, hairline border). The art inside is drawn in
 * HTML with the site's own fonts and tokens, so it follows light/dark and the
 * accent. Sizes inside use container units, so a phone-width frame scales the
 * art down instead of cropping it.
 */
export function StudyFrame({ children, label }: { children: ReactNode; label: string }) {
  return (
    <figure className="study-frame" aria-label={label}>
      <div className="study-sheet">{children}</div>
    </figure>
  );
}

/** Felix: the Slack exchange from the live product, recreated in our type. */
export function FelixArt() {
  return (
    <StudyFrame label="Felix in Slack: Riya P. writes “CRM session timed out again”, and Felix replies “On it.”">
      <div className="sa-slack">
        <p className="sa-channel">
          <span aria-hidden="true">#</span> support
        </p>
        <div className="sa-msg">
          <span className="sa-avatar" aria-hidden="true">
            RP
          </span>
          <div>
            <p className="sa-name">
              Riya P. <span className="sa-time">just now</span>
            </p>
            <p className="sa-text">CRM session timed out again</p>
          </div>
        </div>
        <div className="sa-msg">
          <Image src="/work/felix-mascot.png" alt="" width={64} height={64} className="sa-avatar sa-avatar-img" />
          <div>
            <p className="sa-name">
              Felix <span className="sa-app">App</span> <span className="sa-time">just now</span>
            </p>
            <p className="sa-text sa-reply">On it.</p>
          </div>
        </div>
      </div>
    </StudyFrame>
  );
}

/** Pune Bookies: the real live homepage, set into the frame. */
export function PuneBookiesArt() {
  return (
    <StudyFrame label="The live Pune Bookies homepage: a watercolour gulmohar tree with readers under it, above the Pune Bookies wordmark">
      <Image
        src="/work/pune-bookies-live.png"
        alt=""
        fill
        sizes="(min-width: 768px) 560px, 90vw"
        className="object-cover object-top"
      />
    </StudyFrame>
  );
}

/** Hubble: the bug and the fix in one picture: one message, several tickets
    before; one message, one ticket after. */
export function HubbleArt() {
  return (
    <StudyFrame label="Hubble's fix: before, one Slack message created several tickets; after, it creates exactly one">
      <div className="sa-hubble">
        <p className="sa-source">
          <span aria-hidden="true">#</span> one message in Slack
        </p>
        <div className="sa-split">
          <div className="sa-col">
            <p className="sa-label">Before</p>
            <div className="sa-stack" aria-hidden="true">
              <span className="sa-ticket sa-bad" />
              <span className="sa-ticket sa-bad" />
              <span className="sa-ticket sa-bad" />
            </div>
            <p className="sa-note">several tickets</p>
          </div>
          <div className="sa-col">
            <p className="sa-label">After</p>
            <div className="sa-stack" aria-hidden="true">
              <span className="sa-ticket sa-good" />
            </div>
            <p className="sa-note">one ticket</p>
          </div>
        </div>
        <p className="sa-steps">Ack first · ignore retries · create once</p>
      </div>
    </StudyFrame>
  );
}

export const STUDY_ART = {
  felix: FelixArt,
  'pune-bookies': PuneBookiesArt,
  hubble: HubbleArt,
} as const;
