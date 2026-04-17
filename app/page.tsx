import Image from 'next/image';
import { RsvpForm } from '@/components/RsvpForm';
import { listEventDetails } from '@/lib/wedding';

export const dynamic = 'force-dynamic';

function getCountdownLabel(eventDate: string) {
  const now = new Date();
  const target = new Date(eventDate);
  const millisecondsPerDay = 1000 * 60 * 60 * 24;
  const daysRemaining = Math.ceil((target.getTime() - now.getTime()) / millisecondsPerDay);

  if (daysRemaining > 1) {
    return `${daysRemaining} days to go`;
  }

  if (daysRemaining === 1) {
    return '1 day to go';
  }

  if (daysRemaining === 0) {
    return 'Happening today';
  }

  return 'Celebrated';
}

export default async function Page() {
  const celebrations = await listEventDetails();
  const sanFranciscoEvent = celebrations[0];

  return (
    <main className="min-h-screen overflow-x-hidden bg-[rgb(var(--page-background))] px-4 py-4 text-[rgb(var(--page-foreground))] sm:px-6 sm:py-6 lg:px-8">
      <div className="mx-auto max-w-6xl">
        <div className="boarding-strip rounded-[28px] border border-[rgba(140,127,109,0.2)] bg-[rgba(255,250,244,0.92)] px-4 py-3 shadow-[0_20px_70px_rgba(96,82,67,0.08)] sm:px-6">
          <div className="flex justify-between gap-4 overflow-hidden text-center text-[0.7rem] uppercase tracking-[0.34em] text-[rgba(85,76,65,0.78)] sm:text-xs">
            <span className="shrink-0">Boarding pass</span>
            <span className="shrink-0">Boarding pass</span>
            <span className="shrink-0">Boarding pass</span>
            <span className="hidden shrink-0 sm:inline">Boarding pass</span>
            <span className="hidden shrink-0 md:inline">Boarding pass</span>
          </div>
        </div>

        <section className="invitation-card relative mt-4 overflow-hidden rounded-[34px] border border-[rgba(140,127,109,0.18)] bg-[rgba(255,255,252,0.94)] px-5 py-10 shadow-[0_30px_100px_rgba(96,82,67,0.14)] sm:px-8 sm:py-12 lg:px-12 lg:py-16">
          <div className="pointer-events-none absolute inset-x-0 top-0 h-28 bg-[radial-gradient(circle_at_top,rgba(201,226,212,0.32),transparent_68%)]" />
          <div className="grid gap-12 lg:grid-cols-[1.05fr_0.95fr] lg:items-center">
            <div className="relative z-10 text-center lg:text-left">
              <p className="section-label">Andy & Kelly&apos;s Wedding</p>
              <h1 className="mt-5 font-[family:var(--font-script)] text-[3rem] leading-[0.96] text-[rgb(var(--headline))] sm:text-[4.3rem] lg:text-[5.3rem]">
                Andy & Kelly
              </h1>
              <p className="mt-2 font-[family:var(--font-display)] text-3xl leading-tight text-[rgba(64,52,45,0.88)] sm:text-4xl">
                are getting married
              </p>
              <p className="mx-auto mt-6 max-w-xl text-base leading-7 text-[rgba(73,63,56,0.78)] sm:text-lg lg:mx-0">
                Join us for a wedding journey that begins in San Francisco and continues with
                celebrations in Malaysia and Hong Kong.
              </p>

              <div className="mt-8 grid gap-3 sm:grid-cols-3">
                {celebrations.map((celebration, index) => (
                  <div
                    key={celebration.city}
                    className="stamp-chip rounded-[22px] border border-[rgba(125,152,136,0.28)] px-4 py-4 text-left"
                  >
                    <div className="text-xs uppercase tracking-[0.24em] text-[rgba(88,116,101,0.82)]">
                      Stop 0{index + 1}
                    </div>
                    <div className="mt-2 font-[family:var(--font-display)] text-xl text-[rgb(var(--headline))]">
                      {celebration.cityLabel}
                    </div>
                    <div className="mt-1 text-sm text-[rgba(73,63,56,0.72)]">{celebration.formattedDate}</div>
                  </div>
                ))}
              </div>

              <div className="mt-8 rounded-[26px] border border-[rgba(125,152,136,0.22)] bg-[rgba(246,251,247,0.86)] p-5 text-left shadow-[inset_0_1px_0_rgba(255,255,255,0.65)] sm:p-6">
                <p className="text-sm leading-6 text-[rgba(73,63,56,0.72)] sm:text-base">
                  Venue names, exact addresses, and additional travel notes will be shared closer to the date.
                </p>
              </div>

              <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:items-center">
                <a
                  href="#rsvp"
                  className="inline-flex items-center justify-center rounded-full bg-[rgb(var(--headline))] px-5 py-3 text-sm font-semibold text-white transition hover:opacity-92"
                >
                  RSVP now
                </a>
              </div>
            </div>

            <div className="relative z-10 mx-auto w-full max-w-[30rem]">
              <div className="overflow-hidden rounded-[32px] border border-[rgba(140,127,109,0.18)] bg-[rgba(255,255,255,0.9)] shadow-[0_24px_80px_rgba(96,82,67,0.1)]">
                <Image
                  src="/map.png"
                  alt="Wedding route map showing San Francisco, Malaysia, and Hong Kong"
                  width={1200}
                  height={900}
                  className="h-auto w-full"
                  priority
                />
              </div>
            </div>
          </div>
        </section>

        <section className="mt-6 grid gap-6 lg:grid-cols-[0.86fr_1.14fr]">
          <div className="rounded-[30px] border border-[rgba(140,127,109,0.18)] bg-[rgba(255,252,248,0.94)] p-6 shadow-[0_18px_70px_rgba(96,82,67,0.1)] sm:p-8">
            <p className="section-label">Save The Dates</p>
            <h2 className="mt-4 font-[family:var(--font-display)] text-3xl leading-tight text-[rgb(var(--headline))] sm:text-4xl">
              Celebrate with us wherever you can join.
            </h2>
            <div className="mt-6 space-y-4 text-sm leading-7 text-[rgba(73,63,56,0.76)] sm:text-base">
              <p>
                The San Francisco wedding will include a church ceremony followed by a separate dinner reception.
              </p>
              <p>
                Guests who cannot attend in person will be able to join the San Francisco ceremony through Zoom.
              </p>
              <p>
                Our Malaysia and Hong Kong events will each feature a Chinese tea ceremony and a
                wedding banquet at separate locations.
              </p>
              <p>
                The city for each celebration is confirmed now. Exact venue information will follow
                once finalized.
              </p>
            </div>
          </div>

          <div className="grid gap-5 md:grid-cols-3">
            {celebrations.map((celebration, index) => (
              <article
                key={celebration.city}
                className="rounded-[30px] border border-[rgba(125,152,136,0.18)] bg-[rgba(250,249,245,0.96)] p-5 shadow-[0_18px_55px_rgba(96,82,67,0.08)] sm:p-6"
              >
                <div className="min-w-0">
                  <p className="text-xs uppercase tracking-[0.24em] text-[rgba(88,116,101,0.82)]">
                    Stop 0{index + 1}
                  </p>
                  <div className="mt-3 inline-flex max-w-full rounded-full border border-[rgba(125,152,136,0.24)] px-3 py-1 text-xs font-semibold uppercase tracking-[0.16em] text-[rgba(88,116,101,0.88)]">
                    {celebration.formattedDate}
                  </div>
                  <div className="mt-3 inline-flex rounded-full bg-[rgba(199,223,208,0.2)] px-3 py-1 text-[0.72rem] font-semibold uppercase tracking-[0.14em] text-[rgb(var(--accent-strong))]">
                    {getCountdownLabel(celebration.eventDate)}
                  </div>
                  <h3 className="mt-3 font-[family:var(--font-display)] text-2xl text-[rgb(var(--headline))]">
                    {celebration.cityLabel}
                  </h3>
                </div>
                <p className="mt-5 font-semibold text-[rgba(64,52,45,0.9)]">{celebration.title}</p>
                <p className="mt-3 text-sm leading-6 text-[rgba(73,63,56,0.76)]">
                  {celebration.description}
                </p>
                <div className="mt-5 rounded-[20px] bg-[rgba(199,223,208,0.16)] px-4 py-3 text-sm text-[rgba(73,63,56,0.74)]">
                  {celebration.venueStatus}
                </div>
                <div className="mt-4 space-y-3 text-sm text-[rgba(73,63,56,0.74)]">
                  {(celebration.venueLabel || celebration.venueName || celebration.address) && (
                    <div className="rounded-[18px] border border-[rgba(140,127,109,0.14)] bg-white px-4 py-3">
                      <div className="text-xs uppercase tracking-[0.18em] text-[rgba(88,116,101,0.82)]">
                        {celebration.venueLabel || 'Venue'}
                      </div>
                      <div className="mt-2 font-medium text-[rgb(var(--headline))]">
                        {celebration.venueName || 'To be announced'}
                      </div>
                      <div className="mt-1 text-[rgba(73,63,56,0.72)]">
                        {celebration.address || 'Address to be announced'}
                      </div>
                    </div>
                  )}

                  {celebration.secondaryVenueLabel || celebration.secondaryVenueName || celebration.secondaryAddress ? (
                    <div className="rounded-[18px] border border-[rgba(140,127,109,0.14)] bg-white px-4 py-3">
                      <div className="text-xs uppercase tracking-[0.18em] text-[rgba(88,116,101,0.82)]">
                        {celebration.secondaryVenueLabel || 'Second venue'}
                      </div>
                      <div className="mt-2 font-medium text-[rgb(var(--headline))]">
                        {celebration.secondaryVenueName || 'To be announced'}
                      </div>
                      <div className="mt-1 text-[rgba(73,63,56,0.72)]">
                        {celebration.secondaryAddress || 'Address to be announced'}
                      </div>
                    </div>
                  ) : null}

                  {celebration.zoomLink ? (
                    <p>
                      <strong>Zoom:</strong>{' '}
                      <a className="text-[rgb(var(--accent-strong))] underline-offset-4 hover:underline" href={celebration.zoomLink} target="_blank" rel="noreferrer">
                        Join the ceremony
                      </a>
                    </p>
                  ) : null}
                </div>
              </article>
            ))}
          </div>
        </section>

        <section className="mt-6 rounded-[30px] border border-[rgba(140,127,109,0.18)] bg-[rgba(255,252,248,0.94)] p-6 shadow-[0_18px_70px_rgba(96,82,67,0.1)] sm:p-8">
          <p className="section-label">Event Timeline</p>
          <h2 className="mt-4 text-3xl leading-tight text-[rgb(var(--headline))] sm:text-4xl">A schedule for each celebration.</h2>
          <div className="mt-6 grid gap-5 xl:grid-cols-3">
            {celebrations.map((celebration) => (
              <article key={`${celebration.city}-timeline`} className="rounded-[28px] border border-[rgba(140,127,109,0.16)] bg-white px-5 py-6 shadow-[0_16px_45px_rgba(96,82,67,0.07)] sm:px-6">
                <div className="text-center">
                  <div className="font-[family:var(--font-display)] text-xl text-[rgb(var(--headline))]">Event timeline</div>
                  <div className="mx-auto mt-4 inline-flex rounded-[14px] border border-[rgba(140,127,109,0.32)] px-5 py-2 font-[family:var(--font-display)] text-base text-[rgb(var(--headline))] shadow-[0_8px_22px_rgba(96,82,67,0.06)] sm:text-lg">
                    {celebration.formattedDate}
                  </div>
                  <div className="mt-4 text-xl text-[rgb(var(--headline))] sm:text-2xl">{celebration.cityLabel}</div>
                </div>

                <div className="mt-6 space-y-5 border-l border-[rgba(140,127,109,0.18)] pl-5">
                  {celebration.timeline.map((item) => (
                    <div key={item.id} className="relative">
                      <span className="absolute -left-[1.63rem] top-2 h-3 w-3 rounded-full border border-[rgba(123,162,143,0.36)] bg-[rgba(123,162,143,0.92)]" />
                      <div className="font-[family:var(--font-display)] text-lg text-[rgb(var(--headline))]">{item.time}</div>
                      <div className="mt-1 text-base font-medium text-[rgba(64,52,45,0.92)] sm:text-lg">{item.title}</div>
                      {item.details ? (
                        <div className="mt-1 text-sm leading-6 text-[rgba(73,63,56,0.72)]">{item.details}</div>
                      ) : null}
                    </div>
                  ))}
                </div>
              </article>
            ))}
          </div>
        </section>

        <section id="rsvp" className="mt-6 grid gap-6 lg:grid-cols-[0.82fr_1.18fr]">
          <div className="rounded-[30px] border border-[rgba(140,127,109,0.18)] bg-[rgba(255,252,248,0.94)] p-6 shadow-[0_18px_70px_rgba(96,82,67,0.1)] sm:p-8">
            <p className="section-label">RSVP</p>
            <h2 className="mt-4 text-3xl leading-tight text-[rgb(var(--headline))] sm:text-4xl">Tell us how you plan to celebrate.</h2>
            <div className="mt-5 space-y-4 text-sm leading-7 text-[rgba(73,63,56,0.76)] sm:text-base">
              <p>Select the celebration or celebrations you expect to attend.</p>
              <p>If you cannot make it to San Francisco in person, you can still RSVP for the Zoom ceremony.</p>
              <p>Use the same email again later if your plans change and you need to update your response.</p>
            </div>

            <div className="mt-6 rounded-[24px] border border-[rgba(125,152,136,0.18)] bg-[rgba(246,251,247,0.74)] p-5">
              <div className="text-xs uppercase tracking-[0.24em] text-[rgba(88,116,101,0.82)]">Current San Francisco stream</div>
              <div className="mt-3 text-lg text-[rgb(var(--headline))]">{sanFranciscoEvent.zoomLink ? 'Zoom link is ready' : 'Zoom link coming later'}</div>
              <p className="mt-2 text-sm leading-6 text-[rgba(73,63,56,0.72)]">
                {sanFranciscoEvent.zoomLink
                  ? 'The admin page has a live Zoom link configured for the ceremony.'
                  : 'A Zoom link will be shared here once it has been finalized.'}
              </p>
              {sanFranciscoEvent.zoomLink ? (
                <a
                  href={sanFranciscoEvent.zoomLink}
                  target="_blank"
                  rel="noreferrer"
                  className="mt-4 inline-flex items-center rounded-full border border-[rgba(125,152,136,0.22)] bg-white px-4 py-2 text-sm font-semibold text-[rgb(var(--accent-strong))] transition hover:bg-[rgba(199,223,208,0.18)]"
                >
                  Open Zoom link
                </a>
              ) : null}
            </div>
          </div>

          <div className="rounded-[30px] border border-[rgba(140,127,109,0.18)] bg-[rgba(255,252,248,0.94)] p-6 shadow-[0_18px_70px_rgba(96,82,67,0.1)] sm:p-8">
            <RsvpForm />
          </div>
        </section>
      </div>
    </main>
  );
}