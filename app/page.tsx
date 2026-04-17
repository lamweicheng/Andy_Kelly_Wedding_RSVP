const celebrations = [
  {
    city: 'San Francisco',
    country: 'United States',
    date: '23 October 2027',
    title: 'Church Ceremony & Reception',
    details:
      'Our main ceremony takes place in San Francisco. If you cannot join in person, a Zoom link will be shared so you can still celebrate with us from afar.',
    note: 'Venue details to follow'
  },
  {
    city: 'Malaysia',
    country: 'Malaysia',
    date: '13 November 2027',
    title: 'Chinese Tea Ceremony & Wedding Banquet',
    details:
      'We will continue the celebration in Malaysia with a Chinese tea ceremony and wedding banquet for family and friends.',
    note: 'City confirmed, exact location TBD'
  },
  {
    city: 'Hong Kong',
    country: 'Hong Kong',
    date: '20 November 2027',
    title: 'Chinese Tea Ceremony & Wedding Banquet',
    details:
      'We will also host a Hong Kong celebration with a Chinese tea ceremony and wedding banquet.',
    note: 'City confirmed, exact location TBD'
  }
] as const;

const journeyStops = [
  {
    city: 'San Francisco',
    label: 'Ceremony + reception',
    position: 'top-[16%] left-[13%]'
  },
  {
    city: 'Malaysia',
    label: 'Tea ceremony + banquet',
    position: 'top-[58%] left-[58%]'
  },
  {
    city: 'Hong Kong',
    label: 'Tea ceremony + banquet',
    position: 'top-[36%] left-[71%]'
  }
] as const;

export default function Page() {
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
                <div className="stamp-chip rounded-[22px] border border-[rgba(125,152,136,0.28)] px-4 py-4 text-left">
                  <div className="text-xs uppercase tracking-[0.24em] text-[rgba(88,116,101,0.82)]">
                    Stop 01
                  </div>
                  <div className="mt-2 font-[family:var(--font-display)] text-xl text-[rgb(var(--headline))]">
                    San Francisco
                  </div>
                  <div className="mt-1 text-sm text-[rgba(73,63,56,0.72)]">23 October 2027</div>
                </div>
                <div className="stamp-chip rounded-[22px] border border-[rgba(125,152,136,0.28)] px-4 py-4 text-left">
                  <div className="text-xs uppercase tracking-[0.24em] text-[rgba(88,116,101,0.82)]">
                    Stop 02
                  </div>
                  <div className="mt-2 font-[family:var(--font-display)] text-xl text-[rgb(var(--headline))]">
                    Malaysia
                  </div>
                  <div className="mt-1 text-sm text-[rgba(73,63,56,0.72)]">13 November 2027</div>
                </div>
                <div className="stamp-chip rounded-[22px] border border-[rgba(125,152,136,0.28)] px-4 py-4 text-left">
                  <div className="text-xs uppercase tracking-[0.24em] text-[rgba(88,116,101,0.82)]">
                    Stop 03
                  </div>
                  <div className="mt-2 font-[family:var(--font-display)] text-xl text-[rgb(var(--headline))]">
                    Hong Kong
                  </div>
                  <div className="mt-1 text-sm text-[rgba(73,63,56,0.72)]">20 November 2027</div>
                </div>
              </div>

              <div className="mt-8 rounded-[26px] border border-[rgba(125,152,136,0.22)] bg-[rgba(246,251,247,0.86)] p-5 text-left shadow-[inset_0_1px_0_rgba(255,255,255,0.65)] sm:p-6">
                <div className="flex flex-wrap items-center gap-3">
                  <span className="inline-flex rounded-full bg-[rgba(129,170,146,0.16)] px-3 py-1 text-xs font-semibold uppercase tracking-[0.2em] text-[rgba(88,116,101,0.88)]">
                    RSVP note
                  </span>
                  <span className="text-sm text-[rgba(73,63,56,0.78)]">
                    Formal RSVP details and venue addresses will be shared once finalized.
                  </span>
                </div>
                <p className="mt-3 text-sm leading-6 text-[rgba(73,63,56,0.72)] sm:text-base">
                  For now, please save the dates and plan around the city that is most convenient
                  for your celebration with us.
                </p>
              </div>
            </div>

            <div className="relative z-10 mx-auto w-full max-w-[30rem]">
              <div className="route-panel relative min-h-[28rem] overflow-hidden rounded-[32px] border border-[rgba(125,152,136,0.18)] bg-[linear-gradient(180deg,rgba(255,255,255,0.96),rgba(249,246,239,0.94))] px-4 py-6 sm:px-6">
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_28%_20%,rgba(199,223,208,0.34),transparent_22%),radial-gradient(circle_at_78%_60%,rgba(233,219,192,0.45),transparent_24%)]" />
                <div className="absolute left-[12%] top-[16%] h-16 w-16 rounded-full bg-[rgba(236,227,210,0.88)] blur-2xl" />
                <div className="absolute right-[12%] top-[58%] h-20 w-20 rounded-full bg-[rgba(199,223,208,0.42)] blur-2xl" />

                <div className="world-blob world-blob-americas" />
                <div className="world-blob world-blob-eurasia" />
                <div className="world-blob world-blob-islands" />
                <div className="flight-path flight-path-one" />
                <div className="flight-path flight-path-two" />
                <div className="plane-icon absolute left-[36%] top-[56%] text-4xl text-[rgba(123,162,143,0.9)]">
                  &#9992;
                </div>

                {journeyStops.map((stop) => (
                  <div key={stop.city} className={`absolute ${stop.position} max-w-[9rem]`}>
                    <div className="flex items-start gap-3">
                      <span className="marker-dot mt-1 inline-flex h-5 w-5 shrink-0 items-center justify-center rounded-full border border-[rgba(123,162,143,0.32)] bg-[rgba(255,250,244,0.95)]">
                        <span className="h-2.5 w-2.5 rounded-full bg-[rgb(var(--accent-strong))]" />
                      </span>
                      <div>
                        <div className="font-[family:var(--font-display)] text-lg leading-none text-[rgb(var(--headline))]">
                          {stop.city}
                        </div>
                        <div className="mt-1 text-xs uppercase tracking-[0.16em] text-[rgba(88,116,101,0.82)]">
                          {stop.label}
                        </div>
                      </div>
                    </div>
                  </div>
                ))}

                <div className="absolute bottom-5 left-5 right-5 rounded-[24px] border border-[rgba(140,127,109,0.16)] bg-[rgba(255,252,248,0.9)] px-4 py-4 shadow-[0_12px_40px_rgba(96,82,67,0.08)]">
                  <div className="text-xs uppercase tracking-[0.24em] text-[rgba(88,116,101,0.82)]">
                    Invitation route
                  </div>
                  <div className="mt-2 font-[family:var(--font-display)] text-2xl text-[rgb(var(--headline))]">
                    Three cities, one celebration
                  </div>
                  <p className="mt-2 text-sm leading-6 text-[rgba(73,63,56,0.72)]">
                    A church ceremony in San Francisco, followed by tea ceremonies and banquet
                    celebrations in Malaysia and Hong Kong.
                  </p>
                </div>
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
                The San Francisco wedding will be our main church ceremony, with a reception right
                after.
              </p>
              <p>
                Guests who cannot attend in person will be able to join the San Francisco ceremony
                through Zoom.
              </p>
              <p>
                Our Malaysia and Hong Kong events will each feature a Chinese tea ceremony and a
                wedding banquet.
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
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <p className="text-xs uppercase tracking-[0.24em] text-[rgba(88,116,101,0.82)]">
                      Stop 0{index + 1}
                    </p>
                    <h3 className="mt-3 font-[family:var(--font-display)] text-2xl text-[rgb(var(--headline))]">
                      {celebration.city}
                    </h3>
                    <p className="text-sm text-[rgba(73,63,56,0.72)]">{celebration.country}</p>
                  </div>
                  <div className="rounded-full border border-[rgba(125,152,136,0.24)] px-3 py-1 text-xs font-semibold uppercase tracking-[0.16em] text-[rgba(88,116,101,0.88)]">
                    {celebration.date}
                  </div>
                </div>
                <p className="mt-5 font-semibold text-[rgba(64,52,45,0.9)]">{celebration.title}</p>
                <p className="mt-3 text-sm leading-6 text-[rgba(73,63,56,0.76)]">
                  {celebration.details}
                </p>
                <div className="mt-5 rounded-[20px] bg-[rgba(199,223,208,0.16)] px-4 py-3 text-sm text-[rgba(73,63,56,0.74)]">
                  {celebration.note}
                </div>
              </article>
            ))}
          </div>
        </section>
      </div>
    </main>
  );
}