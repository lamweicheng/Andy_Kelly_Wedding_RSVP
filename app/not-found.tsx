import Link from "next/link";

export default function NotFound() {
  return (
    <main className="min-h-screen px-4 py-12 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-3xl">
        <div className="rounded-[28px] border border-[rgba(140,127,109,0.18)] bg-[rgba(255,252,248,0.94)] p-8 shadow-[0_20px_80px_rgba(96,82,67,0.12)] sm:p-10">
          <p className="section-label">Andy & Kelly&apos;s Wedding</p>
          <div className="mt-3 font-[family:var(--font-display)] text-4xl font-semibold leading-none text-[rgb(var(--headline))]">
            Page not found
          </div>
          <div className="mt-3 max-w-xl text-sm text-[rgba(73,63,56,0.74)] sm:text-base">
            This page is not part of the wedding invitation site. Head back to the homepage for the
            celebration details and dates.
          </div>
          <div>
            <Link
              href="/"
              className="mt-6 inline-flex items-center rounded-full border border-[rgba(125,152,136,0.22)] bg-[rgba(199,223,208,0.16)] px-5 py-2.5 text-sm font-semibold text-[rgb(var(--accent-strong))] transition hover:-translate-y-0.5 hover:bg-[rgba(199,223,208,0.24)]"
            >
              Return to invitation
            </Link>
          </div>
        </div>
      </div>
    </main>
  );
}
