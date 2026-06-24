/**
 * HubbleArchitecture — a static, on-brand technical diagram for the Hubble case
 * study: the event path as inherited (flaky) beside the target V1 (safe). Built
 * from the existing type system — mono labels, brand tokens, the .lab-glass
 * surface — not raw ASCII and not a new visual language. No motion (nothing to
 * reduce); stacks to one column under 380px.
 */

function Node({
  children,
  tone = 'plain',
}: {
  children: React.ReactNode;
  tone?: 'plain' | 'fix' | 'defect';
}) {
  const ring =
    tone === 'fix'
      ? 'border-accent/50'
      : tone === 'defect'
        ? 'border-rust-400/50'
        : 'border-border';
  return (
    <div
      className={`rounded-md border ${ring} bg-bg-elevated px-3 py-2 text-2xs font-mono tracking-mono text-fg`}
    >
      {children}
    </div>
  );
}

function Arrow({ label }: { label?: string }) {
  return (
    <div className="flex flex-col items-center py-1 text-fg-subtle" aria-hidden="true">
      {label && <span className="text-3xs font-mono tracking-mono mb-0.5">{label}</span>}
      <span className="leading-none">↓</span>
    </div>
  );
}

function Note({ tone, children }: { tone: 'fix' | 'defect'; children: React.ReactNode }) {
  const color = tone === 'fix' ? 'text-accent' : 'text-rust-400';
  return (
    <p className={`text-3xs font-mono tracking-mono leading-relaxed ${color}`}>{children}</p>
  );
}

function Column({
  label,
  caption,
  children,
}: {
  label: string;
  caption: string;
  children: React.ReactNode;
}) {
  return (
    <div className="lab-glass rounded-lg p-4 md:p-5">
      <p className="eyebrow mb-1">{label}</p>
      <p className="text-2xs font-mono tracking-mono text-fg-subtle mb-4">{caption}</p>
      <div className="flex flex-col">{children}</div>
    </div>
  );
}

export function HubbleArchitecture() {
  return (
    <figure className="mt-6" aria-label="Hubble event path: as inherited versus the target V1">
      <div className="grid gap-5 sm:grid-cols-2">
        {/* As inherited */}
        <Column label="// current" caption="as inherited — flaky">
          <Node>Slack event</Node>
          <Arrow label="3s ack required" />
          <Node>Flask · Slack Bolt</Node>
          <Arrow />
          <Node tone="defect">work first, then ack — re-reads whole sheet</Node>
          <div className="py-2">
            <Note tone="defect">→ too slow → Slack retries → no de-dup → duplicate tickets</Note>
            <Note tone="defect">→ two competing interaction paths · in-memory IDs</Note>
          </div>
          <Node>Google Sheets</Node>
          <Arrow />
          <Node>thread card + internal mirror</Node>
        </Column>

        {/* Target V1 */}
        <Column label="// target · v1" caption="low-risk, no rewrite">
          <Node>Slack event</Node>
          <Arrow label="ack < 1s" />
          <Node tone="fix">Flask · Bolt — ack first, work in background</Node>
          <Arrow />
          <Node tone="fix">de-dup guard — ignore retries</Node>
          <Arrow />
          <Node tone="fix">idempotent create — safe IDs</Node>
          <Arrow />
          <Node tone="fix">Google Sheets — read once</Node>
          <Arrow />
          <Node>thread card + internal mirror</Node>
          <div className="pt-3">
            <Note tone="fix">→ one interaction path · one message = one ticket</Note>
          </div>
        </Column>
      </div>
      <figcaption className="eyebrow mt-3">
        // event path — as inherited vs. target v1
      </figcaption>
    </figure>
  );
}
