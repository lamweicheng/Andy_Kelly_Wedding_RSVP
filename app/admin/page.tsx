import { AdminEventForm } from '@/components/AdminEventForm';
import { AdminLoginForm } from '@/components/AdminLoginForm';
import { AdminLogoutButton } from '@/components/AdminLogoutButton';
import { isAdminAuthenticated, isAdminProtectionEnabled } from '@/lib/admin-auth';
import { isDatabaseConfigured, listEventDetails, listGuestResponses } from '@/lib/wedding';

export const dynamic = 'force-dynamic';

export default async function AdminPage() {
  const authenticated = isAdminAuthenticated();

  if (!authenticated) {
    return (
      <main className="min-h-screen bg-[rgb(var(--page-background))] px-4 py-10 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-xl rounded-[32px] border border-[rgba(140,127,109,0.18)] bg-[rgba(255,252,248,0.94)] p-8 shadow-[0_24px_90px_rgba(96,82,67,0.12)] sm:p-10">
          <p className="section-label">Admin</p>
          <h1 className="mt-4 text-4xl text-[rgb(var(--headline))]">Wedding dashboard</h1>
          <p className="mt-4 text-base leading-7 text-[rgba(73,63,56,0.76)]">
            Sign in to manage event details, venue information, Zoom links, and RSVP responses.
          </p>
          <AdminLoginForm />
        </div>
      </main>
    );
  }

  const [events, guests] = await Promise.all([listEventDetails(), listGuestResponses()]);
  const attendingCount = guests
    .filter((guest) => guest.attendanceType === 'IN_PERSON' || guest.attendanceType === 'VIRTUAL')
    .reduce((total, guest) => total + guest.guestCount, 0);

  return (
    <main className="min-h-screen bg-[rgb(var(--page-background))] px-4 py-8 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl space-y-6">
        <section className="rounded-[32px] border border-[rgba(140,127,109,0.18)] bg-[rgba(255,252,248,0.94)] p-6 shadow-[0_24px_90px_rgba(96,82,67,0.12)] sm:p-8">
          <div className="flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
            <div>
              <p className="section-label">Admin</p>
              <h1 className="mt-4 text-4xl text-[rgb(var(--headline))] sm:text-5xl">Wedding dashboard</h1>
              <p className="mt-4 max-w-3xl text-base leading-7 text-[rgba(73,63,56,0.76)]">
                Update venue details, adjust map coordinates, publish the Zoom link, and monitor RSVP responses from one place.
              </p>
            </div>
            <AdminLogoutButton />
          </div>

          {!isDatabaseConfigured() ? (
            <div className="mt-6 rounded-[22px] bg-[rgba(132,63,46,0.1)] px-4 py-4 text-sm text-[rgba(117,64,49,0.9)]">
              Database storage is not configured, so changes made here will not persist until DATABASE_URL is set and Prisma is pushed to the database.
            </div>
          ) : null}

          {!isAdminProtectionEnabled() ? (
            <div className="mt-4 rounded-[22px] bg-[rgba(199,223,208,0.18)] px-4 py-4 text-sm text-[rgba(55,89,72,0.92)]">
              ADMIN_PASSWORD is not set, so this admin page is currently unlocked.
            </div>
          ) : null}
        </section>

        <section className="grid gap-4 md:grid-cols-3">
          <div className="rounded-[28px] border border-[rgba(140,127,109,0.18)] bg-[rgba(255,252,248,0.94)] p-5 shadow-[0_18px_55px_rgba(96,82,67,0.08)]">
            <p className="text-xs uppercase tracking-[0.24em] text-[rgba(88,116,101,0.82)]">Responses</p>
            <div className="mt-3 text-4xl text-[rgb(var(--headline))]">{guests.length}</div>
            <p className="mt-2 text-sm text-[rgba(73,63,56,0.72)]">Total submitted RSVP records</p>
          </div>
          <div className="rounded-[28px] border border-[rgba(140,127,109,0.18)] bg-[rgba(255,252,248,0.94)] p-5 shadow-[0_18px_55px_rgba(96,82,67,0.08)]">
            <p className="text-xs uppercase tracking-[0.24em] text-[rgba(88,116,101,0.82)]">Confirmed guests</p>
            <div className="mt-3 text-4xl text-[rgb(var(--headline))]">{attendingCount}</div>
            <p className="mt-2 text-sm text-[rgba(73,63,56,0.72)]">Total guest count for in-person and virtual RSVPs</p>
          </div>
          <div className="rounded-[28px] border border-[rgba(140,127,109,0.18)] bg-[rgba(255,252,248,0.94)] p-5 shadow-[0_18px_55px_rgba(96,82,67,0.08)]">
            <p className="text-xs uppercase tracking-[0.24em] text-[rgba(88,116,101,0.82)]">Events</p>
            <div className="mt-3 text-4xl text-[rgb(var(--headline))]">{events.length}</div>
            <p className="mt-2 text-sm text-[rgba(73,63,56,0.72)]">Celebrations currently shown on the site</p>
          </div>
        </section>

        <section className="grid gap-5 xl:grid-cols-3">
          {events.map((event) => (
            <AdminEventForm key={event.city} event={event} />
          ))}
        </section>

        <section className="rounded-[32px] border border-[rgba(140,127,109,0.18)] bg-[rgba(255,252,248,0.94)] p-6 shadow-[0_24px_90px_rgba(96,82,67,0.12)] sm:p-8">
          <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <p className="section-label">RSVP responses</p>
              <h2 className="mt-3 text-3xl text-[rgb(var(--headline))]">Guest list</h2>
            </div>
            <p className="text-sm text-[rgba(73,63,56,0.72)]">Newest responses appear first.</p>
          </div>

          {guests.length === 0 ? (
            <div className="mt-6 rounded-[24px] bg-[rgba(246,251,247,0.72)] px-5 py-8 text-sm text-[rgba(73,63,56,0.72)]">
              No RSVP responses have been submitted yet.
            </div>
          ) : (
            <div className="mt-6 overflow-x-auto">
              <table className="min-w-full border-separate border-spacing-y-3 text-left text-sm">
                <thead>
                  <tr className="text-[rgba(88,116,101,0.82)]">
                    <th className="px-3 py-2 font-semibold">Guest</th>
                    <th className="px-3 py-2 font-semibold">Attendance</th>
                    <th className="px-3 py-2 font-semibold">Events</th>
                    <th className="px-3 py-2 font-semibold">Count</th>
                    <th className="px-3 py-2 font-semibold">Notes</th>
                    <th className="px-3 py-2 font-semibold">Submitted</th>
                  </tr>
                </thead>
                <tbody>
                  {guests.map((guest) => (
                    <tr key={guest.id} className="rounded-[18px] bg-white shadow-[0_10px_30px_rgba(96,82,67,0.06)]">
                      <td className="rounded-l-[18px] px-3 py-4 align-top">
                        <div className="font-semibold text-[rgb(var(--headline))]">{guest.fullName}</div>
                        <div className="mt-1 text-[rgba(73,63,56,0.72)]">{guest.email}</div>
                        {guest.phone ? <div className="text-[rgba(73,63,56,0.64)]">{guest.phone}</div> : null}
                      </td>
                      <td className="px-3 py-4 align-top text-[rgba(73,63,56,0.78)]">{guest.attendanceLabel}</td>
                      <td className="px-3 py-4 align-top text-[rgba(73,63,56,0.78)]">
                        {guest.selectedCities.length > 0 ? guest.selectedCities.join(', ') : 'None'}
                      </td>
                      <td className="px-3 py-4 align-top text-[rgba(73,63,56,0.78)]">{guest.guestCount}</td>
                      <td className="px-3 py-4 align-top text-[rgba(73,63,56,0.78)]">{guest.notes || '—'}</td>
                      <td className="rounded-r-[18px] px-3 py-4 align-top text-[rgba(73,63,56,0.78)]">{guest.createdAt}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </section>
      </div>
    </main>
  );
}