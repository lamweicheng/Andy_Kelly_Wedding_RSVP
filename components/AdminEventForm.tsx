'use client';

import { useState } from 'react';
import { useFormState, useFormStatus } from 'react-dom';
import { saveEventDetailAction } from '@/app/actions';
import { initialFormState } from '@/lib/form-state';
import type { EventDetailView, TimelineItemView } from '@/lib/wedding';

function SaveButton() {
  const { pending } = useFormStatus();

  return (
    <button
      type="submit"
      disabled={pending}
      className="inline-flex items-center justify-center rounded-full bg-[rgb(var(--headline))] px-4 py-2.5 text-sm font-semibold text-white transition hover:opacity-92 disabled:opacity-60"
    >
      {pending ? 'Saving...' : 'Save details'}
    </button>
  );
}

type AdminEventFormProps = {
  event: EventDetailView;
};

export function AdminEventForm({ event }: AdminEventFormProps) {
  const [state, formAction] = useFormState(saveEventDetailAction, initialFormState);
  const [timeline, setTimeline] = useState<TimelineItemView[]>(event.timeline);

  function updateTimelineItem(index: number, field: keyof TimelineItemView, value: string) {
    setTimeline((current) =>
      current.map((item, itemIndex) =>
        itemIndex === index
          ? {
              ...item,
              [field]: value
            }
          : item
      )
    );
  }

  function addTimelineItem() {
    setTimeline((current) => [
      ...current,
      {
        id: `${event.city.toLowerCase()}-${Date.now()}-${current.length + 1}`,
        time: '',
        title: '',
        details: ''
      }
    ]);
  }

  function removeTimelineItem(index: number) {
    setTimeline((current) => current.filter((_, itemIndex) => itemIndex !== index));
  }

  return (
    <form action={formAction} className="space-y-4 rounded-[28px] border border-[rgba(140,127,109,0.18)] bg-[rgba(255,252,248,0.94)] p-5 shadow-[0_18px_60px_rgba(96,82,67,0.08)] sm:p-6">
      <input type="hidden" name="city" value={event.city} />
      <input type="hidden" name="timelineJson" value={JSON.stringify(timeline)} />
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div>
          <p className="text-xs uppercase tracking-[0.24em] text-[rgba(88,116,101,0.82)]">{event.countryLabel}</p>
          <h2 className="mt-2 text-2xl text-[rgb(var(--headline))]">{event.cityLabel}</h2>
        </div>
        <SaveButton />
      </div>

      <label className="block space-y-2 text-sm font-medium text-[rgba(73,63,56,0.82)]">
        <span>Title</span>
        <input name="title" defaultValue={event.title} className="w-full rounded-[18px] border border-[rgba(140,127,109,0.18)] bg-white px-4 py-3 text-sm outline-none transition focus:border-[rgba(123,162,143,0.6)]" />
      </label>

      <div className="grid gap-4 sm:grid-cols-2">
        <label className="space-y-2 text-sm font-medium text-[rgba(73,63,56,0.82)]">
          <span>Primary venue label</span>
          <input name="venueLabel" defaultValue={event.venueLabel} className="w-full rounded-[18px] border border-[rgba(140,127,109,0.18)] bg-white px-4 py-3 text-sm outline-none transition focus:border-[rgba(123,162,143,0.6)]" />
        </label>
        <label className="space-y-2 text-sm font-medium text-[rgba(73,63,56,0.82)]">
          <span>Date</span>
          <input name="eventDate" type="datetime-local" defaultValue={event.eventDate.slice(0, 16)} className="w-full rounded-[18px] border border-[rgba(140,127,109,0.18)] bg-white px-4 py-3 text-sm outline-none transition focus:border-[rgba(123,162,143,0.6)]" />
        </label>
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        <label className="space-y-2 text-sm font-medium text-[rgba(73,63,56,0.82)]">
          <span>Venue status</span>
          <input name="venueStatus" defaultValue={event.venueStatus} className="w-full rounded-[18px] border border-[rgba(140,127,109,0.18)] bg-white px-4 py-3 text-sm outline-none transition focus:border-[rgba(123,162,143,0.6)]" />
        </label>
        <label className="space-y-2 text-sm font-medium text-[rgba(73,63,56,0.82)]">
          <span>Secondary venue label</span>
          <input name="secondaryVenueLabel" defaultValue={event.secondaryVenueLabel} className="w-full rounded-[18px] border border-[rgba(140,127,109,0.18)] bg-white px-4 py-3 text-sm outline-none transition focus:border-[rgba(123,162,143,0.6)]" />
        </label>
      </div>

      <label className="block space-y-2 text-sm font-medium text-[rgba(73,63,56,0.82)]">
        <span>Venue name</span>
        <input name="venueName" defaultValue={event.venueName} className="w-full rounded-[18px] border border-[rgba(140,127,109,0.18)] bg-white px-4 py-3 text-sm outline-none transition focus:border-[rgba(123,162,143,0.6)]" />
      </label>

      <label className="block space-y-2 text-sm font-medium text-[rgba(73,63,56,0.82)]">
        <span>Address</span>
        <input name="address" defaultValue={event.address} className="w-full rounded-[18px] border border-[rgba(140,127,109,0.18)] bg-white px-4 py-3 text-sm outline-none transition focus:border-[rgba(123,162,143,0.6)]" />
      </label>

      <label className="block space-y-2 text-sm font-medium text-[rgba(73,63,56,0.82)]">
        <span>Secondary venue name</span>
        <input name="secondaryVenueName" defaultValue={event.secondaryVenueName} className="w-full rounded-[18px] border border-[rgba(140,127,109,0.18)] bg-white px-4 py-3 text-sm outline-none transition focus:border-[rgba(123,162,143,0.6)]" />
      </label>

      <label className="block space-y-2 text-sm font-medium text-[rgba(73,63,56,0.82)]">
        <span>Secondary address</span>
        <input name="secondaryAddress" defaultValue={event.secondaryAddress} className="w-full rounded-[18px] border border-[rgba(140,127,109,0.18)] bg-white px-4 py-3 text-sm outline-none transition focus:border-[rgba(123,162,143,0.6)]" />
      </label>

      <label className="block space-y-2 text-sm font-medium text-[rgba(73,63,56,0.82)]">
        <span>Description</span>
        <textarea name="description" rows={4} defaultValue={event.description} className="w-full rounded-[18px] border border-[rgba(140,127,109,0.18)] bg-white px-4 py-3 text-sm outline-none transition focus:border-[rgba(123,162,143,0.6)]" />
      </label>

      <label className="block space-y-2 text-sm font-medium text-[rgba(73,63,56,0.82)]">
        <span>Zoom link</span>
        <input name="zoomLink" defaultValue={event.zoomLink} placeholder="https://..." className="w-full rounded-[18px] border border-[rgba(140,127,109,0.18)] bg-white px-4 py-3 text-sm outline-none transition focus:border-[rgba(123,162,143,0.6)]" />
      </label>

      <div className="grid gap-4 sm:grid-cols-2">
        <label className="space-y-2 text-sm font-medium text-[rgba(73,63,56,0.82)]">
          <span>Latitude</span>
          <input name="latitude" type="number" step="0.000001" defaultValue={event.latitude} className="w-full rounded-[18px] border border-[rgba(140,127,109,0.18)] bg-white px-4 py-3 text-sm outline-none transition focus:border-[rgba(123,162,143,0.6)]" />
        </label>
        <label className="space-y-2 text-sm font-medium text-[rgba(73,63,56,0.82)]">
          <span>Longitude</span>
          <input name="longitude" type="number" step="0.000001" defaultValue={event.longitude} className="w-full rounded-[18px] border border-[rgba(140,127,109,0.18)] bg-white px-4 py-3 text-sm outline-none transition focus:border-[rgba(123,162,143,0.6)]" />
        </label>
      </div>

      <div className="rounded-[22px] border border-[rgba(125,152,136,0.18)] bg-[rgba(246,251,247,0.72)] p-4 sm:p-5">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div>
            <p className="text-xs uppercase tracking-[0.24em] text-[rgba(88,116,101,0.82)]">Timeline</p>
            <p className="mt-2 text-sm text-[rgba(73,63,56,0.72)]">Add, remove, and reorder the moments shown on the public event page.</p>
          </div>
          <button
            type="button"
            onClick={addTimelineItem}
            className="inline-flex items-center justify-center rounded-full border border-[rgba(125,152,136,0.22)] bg-white px-4 py-2 text-sm font-semibold text-[rgb(var(--accent-strong))] transition hover:bg-[rgba(199,223,208,0.18)]"
          >
            Add row
          </button>
        </div>

        <div className="mt-4 space-y-3">
          {timeline.map((item, index) => (
            <div key={item.id} className="rounded-[20px] border border-[rgba(140,127,109,0.14)] bg-white p-4 shadow-[0_10px_28px_rgba(96,82,67,0.05)]">
              <div className="grid gap-3 sm:grid-cols-[0.7fr_1.3fr_auto] sm:items-end">
                <label className="space-y-2 text-sm font-medium text-[rgba(73,63,56,0.82)]">
                  <span>Time</span>
                  <input
                    value={item.time}
                    onChange={(event) => updateTimelineItem(index, 'time', event.target.value)}
                    className="w-full rounded-[16px] border border-[rgba(140,127,109,0.18)] bg-white px-4 py-3 text-sm outline-none transition focus:border-[rgba(123,162,143,0.6)]"
                  />
                </label>
                <label className="space-y-2 text-sm font-medium text-[rgba(73,63,56,0.82)]">
                  <span>Title</span>
                  <input
                    value={item.title}
                    onChange={(event) => updateTimelineItem(index, 'title', event.target.value)}
                    className="w-full rounded-[16px] border border-[rgba(140,127,109,0.18)] bg-white px-4 py-3 text-sm outline-none transition focus:border-[rgba(123,162,143,0.6)]"
                  />
                </label>
                <button
                  type="button"
                  onClick={() => removeTimelineItem(index)}
                  className="inline-flex items-center justify-center rounded-full border border-[rgba(176,105,88,0.18)] bg-[rgba(176,105,88,0.06)] px-4 py-3 text-sm font-semibold text-[rgba(117,64,49,0.9)] transition hover:bg-[rgba(176,105,88,0.12)]"
                >
                  Remove
                </button>
              </div>
              <label className="mt-3 block space-y-2 text-sm font-medium text-[rgba(73,63,56,0.82)]">
                <span>Details</span>
                <input
                  value={item.details}
                  onChange={(event) => updateTimelineItem(index, 'details', event.target.value)}
                  className="w-full rounded-[16px] border border-[rgba(140,127,109,0.18)] bg-white px-4 py-3 text-sm outline-none transition focus:border-[rgba(123,162,143,0.6)]"
                />
              </label>
            </div>
          ))}
        </div>
      </div>

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
    </form>
  );
}