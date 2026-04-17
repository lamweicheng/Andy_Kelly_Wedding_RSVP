import { AttendanceType, EventCity } from '@prisma/client';
import { getPrismaClient } from '@/lib/prisma';
import type { EventDetailInput, RsvpFormInput, TimelineItemInput } from '@/lib/validation';

export type TimelineItemView = {
  id: string;
  time: string;
  title: string;
  details: string;
};

export type EventDetailView = {
  city: EventCity;
  cityLabel: string;
  countryLabel: string;
  title: string;
  eventDate: string;
  formattedDate: string;
  venueLabel: string;
  venueName: string;
  address: string;
  secondaryVenueLabel: string;
  secondaryVenueName: string;
  secondaryAddress: string;
  venueStatus: string;
  description: string;
  zoomLink: string;
  latitude: number;
  longitude: number;
  timeline: TimelineItemView[];
};

export type GuestResponseView = {
  id: string;
  fullName: string;
  email: string;
  phone: string;
  attendanceType: AttendanceType;
  attendanceLabel: string;
  selectedCities: string[];
  guestCount: number;
  notes: string;
  createdAt: string;
};

const dateFormatter = new Intl.DateTimeFormat('en-US', {
  day: 'numeric',
  month: 'long',
  year: 'numeric'
});

export const CITY_CONTENT: Record<EventCity, Omit<EventDetailView, 'formattedDate'>> = {
  SAN_FRANCISCO: {
    city: EventCity.SAN_FRANCISCO,
    cityLabel: 'San Francisco',
    countryLabel: 'United States',
    title: 'Church Ceremony & Dinner Reception',
    eventDate: '2027-10-23T17:00:00.000Z',
    venueLabel: 'Church ceremony',
    venueName: '',
    address: '',
    secondaryVenueLabel: 'Dinner reception',
    secondaryVenueName: '',
    secondaryAddress: '',
    venueStatus: 'Venue details to follow',
    description:
      'Our main church ceremony takes place in San Francisco, followed by a dinner reception. A Zoom link will be available for guests who cannot attend in person.',
    zoomLink: '',
    latitude: 37.7749,
    longitude: -122.4194,
    timeline: [
      {
        id: 'sf-ceremony',
        time: '2:00 PM',
        title: 'Church ceremony',
        details: 'Main wedding ceremony in San Francisco'
      },
      {
        id: 'sf-dinner',
        time: '6:00 PM',
        title: 'Dinner reception',
        details: 'Dinner celebration following the ceremony'
      }
    ]
  },
  MALAYSIA: {
    city: EventCity.MALAYSIA,
    cityLabel: 'Malaysia',
    countryLabel: 'Malaysia',
    title: 'Chinese Tea Ceremony & Wedding Banquet',
    eventDate: '2027-11-13T11:00:00.000Z',
    venueLabel: 'Tea ceremony',
    venueName: '',
    address: '',
    secondaryVenueLabel: 'Wedding banquet',
    secondaryVenueName: '',
    secondaryAddress: '',
    venueStatus: 'City confirmed, exact venue TBD',
    description:
      'We will continue the celebration in Malaysia with a Chinese tea ceremony and a separate wedding banquet for family and friends.',
    zoomLink: '',
    latitude: 3.139,
    longitude: 101.6869,
    timeline: [
      {
        id: 'my-tea',
        time: '11:00 AM',
        title: 'Chinese tea ceremony',
        details: 'Family tea ceremony'
      },
      {
        id: 'my-banquet',
        time: '7:00 PM',
        title: 'Wedding banquet',
        details: 'Evening banquet celebration'
      }
    ]
  },
  HONG_KONG: {
    city: EventCity.HONG_KONG,
    cityLabel: 'Hong Kong',
    countryLabel: 'Hong Kong',
    title: 'Chinese Tea Ceremony & Wedding Banquet',
    eventDate: '2027-11-20T11:00:00.000Z',
    venueLabel: 'Tea ceremony',
    venueName: '',
    address: '',
    secondaryVenueLabel: 'Wedding banquet',
    secondaryVenueName: '',
    secondaryAddress: '',
    venueStatus: 'City confirmed, exact venue TBD',
    description:
      'We will also host a Hong Kong celebration with a Chinese tea ceremony and a separate wedding banquet.',
    zoomLink: '',
    latitude: 22.3193,
    longitude: 114.1694,
    timeline: [
      {
        id: 'hk-tea',
        time: '11:00 AM',
        title: 'Chinese tea ceremony',
        details: 'Family tea ceremony'
      },
      {
        id: 'hk-banquet',
        time: '7:00 PM',
        title: 'Wedding banquet',
        details: 'Evening banquet celebration'
      }
    ]
  }
};

export const CITY_ORDER: EventCity[] = [
  EventCity.SAN_FRANCISCO,
  EventCity.MALAYSIA,
  EventCity.HONG_KONG
];

const ATTENDANCE_LABELS: Record<AttendanceType, string> = {
  IN_PERSON: 'Attending in person',
  VIRTUAL: 'Joining virtually',
  DECLINED: 'Unable to attend'
};

export function isDatabaseConfigured() {
  return Boolean(process.env.DATABASE_URL);
}

function formatDate(isoDate: string) {
  return dateFormatter.format(new Date(isoDate));
}

function normalizeTimelineItems(value: unknown, fallback: TimelineItemView[]) {
  if (!Array.isArray(value)) {
    return fallback;
  }

  const normalized = value
    .map((item, index) => {
      if (!item || typeof item !== 'object') {
        return null;
      }

      const candidate = item as Record<string, unknown>;
      const time = typeof candidate.time === 'string' ? candidate.time.trim() : '';
      const title = typeof candidate.title === 'string' ? candidate.title.trim() : '';

      if (!time || !title) {
        return null;
      }

      return {
        id:
          typeof candidate.id === 'string' && candidate.id.trim().length > 0
            ? candidate.id.trim()
            : `timeline-${index + 1}`,
        time,
        title,
        details: typeof candidate.details === 'string' ? candidate.details.trim() : ''
      };
    })
    .filter((item): item is TimelineItemView => Boolean(item));

  return normalized.length > 0 ? normalized : fallback;
}

function normalizeEventDetail(
  city: EventCity,
  overrides?: Partial<{
    title: string;
    eventDate: Date;
    venueLabel: string | null;
    venueName: string | null;
    address: string | null;
    secondaryVenueLabel: string | null;
    secondaryVenueName: string | null;
    secondaryAddress: string | null;
    venueStatus: string | null;
    description: string | null;
    zoomLink: string | null;
    latitude: number | null;
    longitude: number | null;
    timeline: unknown;
  }>
): EventDetailView {
  const defaults = CITY_CONTENT[city];
  const eventDate = overrides?.eventDate?.toISOString() ?? defaults.eventDate;

  return {
    ...defaults,
    title: overrides?.title ?? defaults.title,
    eventDate,
    formattedDate: formatDate(eventDate),
    venueLabel: overrides?.venueLabel ?? defaults.venueLabel,
    venueName: overrides?.venueName ?? defaults.venueName,
    address: overrides?.address ?? defaults.address,
    secondaryVenueLabel: overrides?.secondaryVenueLabel ?? defaults.secondaryVenueLabel,
    secondaryVenueName: overrides?.secondaryVenueName ?? defaults.secondaryVenueName,
    secondaryAddress: overrides?.secondaryAddress ?? defaults.secondaryAddress,
    venueStatus: overrides?.venueStatus ?? defaults.venueStatus,
    description: overrides?.description ?? defaults.description,
    zoomLink: overrides?.zoomLink ?? defaults.zoomLink,
    latitude: overrides?.latitude ?? defaults.latitude,
    longitude: overrides?.longitude ?? defaults.longitude,
    timeline: normalizeTimelineItems(overrides?.timeline, defaults.timeline)
  };
}

export async function listEventDetails() {
  if (!isDatabaseConfigured()) {
    return CITY_ORDER.map((city) => normalizeEventDetail(city));
  }

  try {
    const rows = await getPrismaClient().eventDetail.findMany();
    const byCity = new Map(rows.map((row) => [row.city, row]));

    return CITY_ORDER.map((city) => normalizeEventDetail(city, byCity.get(city)));
  } catch {
    return CITY_ORDER.map((city) => normalizeEventDetail(city));
  }
}

export async function saveEventDetail(input: EventDetailInput) {
  const saved = await getPrismaClient().eventDetail.upsert({
    where: { city: input.city },
    update: {
      title: input.title,
      eventDate: new Date(input.eventDate),
      venueLabel: input.venueLabel || null,
      venueName: input.venueName || null,
      address: input.address || null,
      secondaryVenueLabel: input.secondaryVenueLabel || null,
      secondaryVenueName: input.secondaryVenueName || null,
      secondaryAddress: input.secondaryAddress || null,
      venueStatus: input.venueStatus || null,
      description: input.description || null,
      zoomLink: input.zoomLink || null,
      latitude: input.latitude,
      longitude: input.longitude,
      timeline: input.timeline as unknown as TimelineItemInput[]
    },
    create: {
      city: input.city,
      title: input.title,
      eventDate: new Date(input.eventDate),
      venueLabel: input.venueLabel || null,
      venueName: input.venueName || null,
      address: input.address || null,
      secondaryVenueLabel: input.secondaryVenueLabel || null,
      secondaryVenueName: input.secondaryVenueName || null,
      secondaryAddress: input.secondaryAddress || null,
      venueStatus: input.venueStatus || null,
      description: input.description || null,
      zoomLink: input.zoomLink || null,
      latitude: input.latitude,
      longitude: input.longitude,
      timeline: input.timeline as unknown as TimelineItemInput[]
    }
  });

  return normalizeEventDetail(saved.city, saved);
}

export async function saveGuestResponse(input: RsvpFormInput) {
  const saved = await getPrismaClient().guest.upsert({
    where: { email: input.email },
    update: {
      firstName: input.firstName,
      lastName: input.lastName,
      phone: input.phone || null,
      attendanceType: input.attendanceType,
      selectedCities: input.selectedCities,
      guestCount: input.guestCount,
      notes: input.notes || null
    },
    create: {
      firstName: input.firstName,
      lastName: input.lastName,
      email: input.email,
      phone: input.phone || null,
      attendanceType: input.attendanceType,
      selectedCities: input.selectedCities,
      guestCount: input.guestCount,
      notes: input.notes || null
    }
  });

  return saved;
}

export async function listGuestResponses() {
  if (!isDatabaseConfigured()) {
    return [] as GuestResponseView[];
  }

  try {
    const guests = await getPrismaClient().guest.findMany({
      orderBy: {
        createdAt: 'desc'
      }
    });

    return guests.map((guest) => ({
      id: guest.id,
      fullName: `${guest.firstName} ${guest.lastName}`,
      email: guest.email,
      phone: guest.phone ?? '',
      attendanceType: guest.attendanceType,
      attendanceLabel: ATTENDANCE_LABELS[guest.attendanceType],
      selectedCities: guest.selectedCities.map((city) => CITY_CONTENT[city].cityLabel),
      guestCount: guest.guestCount,
      notes: guest.notes ?? '',
      createdAt: new Intl.DateTimeFormat('en-US', {
        month: 'short',
        day: 'numeric',
        year: 'numeric'
      }).format(guest.createdAt)
    }));
  } catch {
    return [] as GuestResponseView[];
  }
}