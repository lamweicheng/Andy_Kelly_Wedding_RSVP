import { adminLogoutAction } from '@/app/actions';

export function AdminLogoutButton() {
  return (
    <form action={adminLogoutAction}>
      <button
        type="submit"
        className="inline-flex items-center justify-center rounded-full border border-[rgba(125,152,136,0.22)] bg-[rgba(199,223,208,0.16)] px-4 py-2.5 text-sm font-semibold text-[rgb(var(--accent-strong))] transition hover:bg-[rgba(199,223,208,0.24)]"
      >
        Log out
      </button>
    </form>
  );
}