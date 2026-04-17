'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useFormState, useFormStatus } from 'react-dom';
import { adminLoginAction } from '@/app/actions';
import { initialFormState } from '@/lib/form-state';

function LoginButton() {
  const { pending } = useFormStatus();

  return (
    <button
      type="submit"
      disabled={pending}
      className="inline-flex items-center justify-center rounded-full bg-[rgb(var(--headline))] px-5 py-3 text-sm font-semibold text-white transition hover:opacity-92 disabled:opacity-60"
    >
      {pending ? 'Checking...' : 'Enter admin'}
    </button>
  );
}

export function AdminLoginForm() {
  const router = useRouter();
  const [state, formAction] = useFormState(adminLoginAction, initialFormState);

  useEffect(() => {
    if (state.status === 'success') {
      router.refresh();
    }
  }, [router, state.status]);

  return (
    <form action={formAction} className="mt-6 space-y-4">
      <label className="block space-y-2 text-sm font-medium text-[rgba(73,63,56,0.82)]">
        <span>Admin password</span>
        <input
          name="password"
          type="password"
          className="w-full rounded-[18px] border border-[rgba(140,127,109,0.18)] bg-white px-4 py-3 text-sm outline-none transition focus:border-[rgba(123,162,143,0.6)]"
          placeholder="Enter your admin password"
        />
      </label>
      {state.message ? (
        <div
          className={`rounded-[18px] px-4 py-3 text-sm ${
            state.status === 'success'
              ? 'bg-[rgba(199,223,208,0.18)] text-[rgba(55,89,72,0.92)]'
              : 'bg-[rgba(132,63,46,0.1)] text-[rgba(117,64,49,0.9)]'
          }`}
        >
          {state.message}
        </div>
      ) : null}
      <LoginButton />
    </form>
  );
}