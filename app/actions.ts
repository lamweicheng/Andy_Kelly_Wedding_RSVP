'use server';

import { revalidatePath } from 'next/cache';
import {
  clearAdminSessionCookie,
  createAdminSession,
  isAdminProtectionEnabled
} from '@/lib/admin-auth';
import type { FormState } from '@/lib/form-state';
import { eventDetailSchema, rsvpFormSchema } from '@/lib/validation';
import { isDatabaseConfigured, saveEventDetail, saveGuestResponse } from '@/lib/wedding';

function parseMultiValue(formData: FormData, key: string) {
  return formData
    .getAll(key)
    .map((value) => String(value))
    .filter(Boolean);
}

function parseTimelineJson(formData: FormData) {
  const raw = String(formData.get('timelineJson') ?? '[]');

  try {
    const parsed = JSON.parse(raw);
    return Array.isArray(parsed) ? parsed : [];
  } catch {
    return [];
  }
}

export async function submitRsvpAction(_: FormState, formData: FormData): Promise<FormState> {
  if (!isDatabaseConfigured()) {
    return {
      status: 'error',
      message: 'RSVP storage is not configured yet. Add a database connection before collecting responses.'
    };
  }

  const parsed = rsvpFormSchema.safeParse({
    firstName: formData.get('firstName'),
    lastName: formData.get('lastName'),
    email: formData.get('email'),
    phone: formData.get('phone'),
    attendanceType: formData.get('attendanceType'),
    selectedCities: parseMultiValue(formData, 'selectedCities'),
    guestCount: formData.get('guestCount'),
    notes: formData.get('notes')
  });

  if (!parsed.success) {
    return {
      status: 'error',
      message: parsed.error.issues[0]?.message ?? 'Please review your RSVP details.'
    };
  }

  try {
    await saveGuestResponse(parsed.data);
    revalidatePath('/admin');

    return {
      status: 'success',
      message: 'Your RSVP has been saved. We cannot wait to celebrate with you.'
    };
  } catch {
    return {
      status: 'error',
      message: 'Unable to save your RSVP right now. If the database schema is new, run prisma db push first.'
    };
  }
}

export async function saveEventDetailAction(_: FormState, formData: FormData): Promise<FormState> {
  if (!isDatabaseConfigured()) {
    return {
      status: 'error',
      message: 'Database storage is not configured. Add DATABASE_URL before using the admin editor.'
    };
  }

  const parsed = eventDetailSchema.safeParse({
    city: formData.get('city'),
    title: formData.get('title'),
    eventDate: formData.get('eventDate'),
    venueLabel: formData.get('venueLabel'),
    venueName: formData.get('venueName'),
    address: formData.get('address'),
    secondaryVenueLabel: formData.get('secondaryVenueLabel'),
    secondaryVenueName: formData.get('secondaryVenueName'),
    secondaryAddress: formData.get('secondaryAddress'),
    venueStatus: formData.get('venueStatus'),
    description: formData.get('description'),
    zoomLink: formData.get('zoomLink'),
    latitude: formData.get('latitude'),
    longitude: formData.get('longitude'),
    timeline: parseTimelineJson(formData)
  });

  if (!parsed.success) {
    return {
      status: 'error',
      message: parsed.error.issues[0]?.message ?? 'Please review the event details.'
    };
  }

  try {
    await saveEventDetail(parsed.data);
    revalidatePath('/');
    revalidatePath('/admin');

    return {
      status: 'success',
      message: 'Event details updated.'
    };
  } catch {
    return {
      status: 'error',
      message: 'Unable to save event details. If the new tables are not in your database yet, run prisma db push.'
    };
  }
}

export async function adminLoginAction(_: FormState, formData: FormData): Promise<FormState> {
  if (!isAdminProtectionEnabled()) {
    return {
      status: 'success',
      message: 'ADMIN_PASSWORD is not set, so the admin page is currently unlocked.'
    };
  }

  if (String(formData.get('password') ?? '') !== process.env.ADMIN_PASSWORD) {
    return {
      status: 'error',
      message: 'Incorrect admin password.'
    };
  }

  createAdminSession();
  revalidatePath('/admin');

  return {
    status: 'success',
    message: 'Admin access granted.'
  };
}

export async function adminLogoutAction() {
  clearAdminSessionCookie();
  revalidatePath('/admin');
}