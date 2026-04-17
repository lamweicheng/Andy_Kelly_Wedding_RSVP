'use client';

import { useEffect, useRef, useState } from 'react';
import { useRouter } from 'next/navigation';
import { useFormState, useFormStatus } from 'react-dom';
import { submitRsvpAction } from '@/app/actions';
import { initialFormState } from '@/lib/form-state';

const EVENT_OPTIONS = [
  { value: 'SAN_FRANCISCO', label: 'San Francisco' },
  { value: 'MALAYSIA', label: 'Malaysia' },
  { value: 'HONG_KONG', label: 'Hong Kong' }
] as const;

function SubmitButton() {
  const { pending } = useFormStatus();

  return (
    <button
      type="submit"
      disabled={pending}
      className="inline-flex w-full items-center justify-center rounded-full bg-[rgb(var(--headline))] px-5 py-3 text-sm font-semibold text-white transition hover:opacity-92 disabled:cursor-not-allowed disabled:opacity-60 sm:w-auto"
    >
      {pending ? 'Saving RSVP...' : 'Send RSVP'}
    </button>
  );
}

export function RsvpForm() {
  const router = useRouter();
  const formRef = useRef<HTMLFormElement>(null);
  const [state, formAction] = useFormState(submitRsvpAction, initialFormState);
  const [attendanceType, setAttendanceType] = useState<'IN_PERSON' | 'VIRTUAL' | 'DECLINED'>(
    'IN_PERSON'
  );
  const [selectedCities, setSelectedCities] = useState<string[]>([]);

  useEffect(() => {
    if (attendanceType === 'VIRTUAL') {
      setSelectedCities(['SAN_FRANCISCO']);
      return;
    }

    if (attendanceType === 'DECLINED') {
      setSelectedCities([]);
    }
  }, [attendanceType]);

  useEffect(() => {
    if (state.status === 'success') {
      formRef.current?.reset();
      setAttendanceType('IN_PERSON');
      setSelectedCities([]);
      router.refresh();
    }
  }, [router, state.status]);

  function toggleCity(city: string) {
    setSelectedCities((current) =>
      current.includes(city) ? current.filter((item) => item !== city) : [...current, city]
    );
  }

  return (
    <form ref={formRef} action={formAction} className="space-y-6">
      <div className="grid gap-4 sm:grid-cols-2">
        <label className="space-y-2 text-sm font-medium text-[rgba(73,63,56,0.82)]">
          <span>First name</span>
          <input
            name="firstName"
            className="w-full rounded-[18px] border border-[rgba(140,127,109,0.18)] bg-white px-4 py-3 text-sm outline-none transition focus:border-[rgba(123,162,143,0.6)]"
            placeholder="Andy"
          />
        </label>
        <label className="space-y-2 text-sm font-medium text-[rgba(73,63,56,0.82)]">
          <span>Last name</span>
          <input
            name="lastName"
            className="w-full rounded-[18px] border border-[rgba(140,127,109,0.18)] bg-white px-4 py-3 text-sm outline-none transition focus:border-[rgba(123,162,143,0.6)]"
            placeholder="Lam"
          />
        </label>
      </div>

      <div className="grid gap-4 sm:grid-cols-[1.2fr_0.8fr]">
        <label className="space-y-2 text-sm font-medium text-[rgba(73,63,56,0.82)]">
          <span>Email</span>
          <input
            name="email"
            type="email"
            className="w-full rounded-[18px] border border-[rgba(140,127,109,0.18)] bg-white px-4 py-3 text-sm outline-none transition focus:border-[rgba(123,162,143,0.6)]"
            placeholder="you@example.com"
          />
        </label>
        <label className="space-y-2 text-sm font-medium text-[rgba(73,63,56,0.82)]">
          <span>Phone</span>
          <input
            name="phone"
            className="w-full rounded-[18px] border border-[rgba(140,127,109,0.18)] bg-white px-4 py-3 text-sm outline-none transition focus:border-[rgba(123,162,143,0.6)]"
            placeholder="Optional"
          />
        </label>
      </div>

      <div className="rounded-[24px] border border-[rgba(125,152,136,0.2)] bg-[rgba(246,251,247,0.72)] p-5">
        <p className="text-sm font-semibold uppercase tracking-[0.2em] text-[rgba(88,116,101,0.82)]">
          Attendance
        </p>
        <div className="mt-4 grid gap-3 sm:grid-cols-3">
          {[
            { value: 'IN_PERSON', label: 'Attending in person' },
            { value: 'VIRTUAL', label: 'Joining by Zoom' },
            { value: 'DECLINED', label: 'Unable to attend' }
          ].map((option) => (
            <label
              key={option.value}
              className={`rounded-[20px] border px-4 py-4 text-sm transition ${
                attendanceType === option.value
                  ? 'border-[rgba(123,162,143,0.54)] bg-white shadow-[0_12px_30px_rgba(96,82,67,0.08)]'
                  : 'border-[rgba(140,127,109,0.14)] bg-[rgba(255,255,255,0.75)]'
              }`}
            >
              <input
                type="radio"
                name="attendanceType"
                value={option.value}
                checked={attendanceType === option.value}
                onChange={() => setAttendanceType(option.value as typeof attendanceType)}
                className="sr-only"
              />
              <span className="font-medium text-[rgb(var(--headline))]">{option.label}</span>
            </label>
          ))}
        </div>
      </div>

      <div className="rounded-[24px] border border-[rgba(125,152,136,0.2)] bg-[rgba(255,252,248,0.9)] p-5">
        <div className="flex items-center justify-between gap-4">
          <p className="text-sm font-semibold uppercase tracking-[0.2em] text-[rgba(88,116,101,0.82)]">
            Celebration selection
          </p>
          <label className="text-sm font-medium text-[rgba(73,63,56,0.8)]">
            <span className="mr-2">Guests</span>
            <input
              name="guestCount"
              type="number"
              min={1}
              max={10}
              defaultValue={1}
              className="w-20 rounded-full border border-[rgba(140,127,109,0.18)] px-3 py-2 text-center"
            />
          </label>
        </div>
        <div className="mt-4 grid gap-3 sm:grid-cols-3">
          {EVENT_OPTIONS.map((event) => {
            const disabled =
              attendanceType === 'DECLINED' ||
              (attendanceType === 'VIRTUAL' && event.value !== 'SAN_FRANCISCO');

            return (
              <label
                key={event.value}
                className={`rounded-[20px] border px-4 py-4 text-sm transition ${
                  selectedCities.includes(event.value)
                    ? 'border-[rgba(123,162,143,0.54)] bg-[rgba(199,223,208,0.18)]'
                    : 'border-[rgba(140,127,109,0.14)] bg-white'
                } ${disabled ? 'opacity-55' : ''}`}
              >
                <input
                  type="checkbox"
                  name="selectedCities"
                  value={event.value}
                  checked={selectedCities.includes(event.value)}
                  onChange={() => toggleCity(event.value)}
                  disabled={disabled}
                  className="mr-3 accent-[rgb(var(--headline))]"
                />
                {event.label}
              </label>
            );
          })}
        </div>
        <p className="mt-3 text-sm text-[rgba(73,63,56,0.72)]">
          Select every celebration you expect to join. Virtual attendance is available only for San Francisco.
        </p>
      </div>

      <label className="block space-y-2 text-sm font-medium text-[rgba(73,63,56,0.82)]">
        <span>Notes</span>
        <textarea
          name="notes"
          rows={4}
          className="w-full rounded-[18px] border border-[rgba(140,127,109,0.18)] bg-white px-4 py-3 text-sm outline-none transition focus:border-[rgba(123,162,143,0.6)]"
          placeholder="Dietary notes, travel timing, or anything we should know"
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

      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <p className="text-sm text-[rgba(73,63,56,0.72)]">
          Submitting again with the same email address will update your existing RSVP.
        </p>
        <SubmitButton />
      </div>
    </form>
  );
}