import { z } from 'zod';

export const EVENT_CITY_VALUES = ['SAN_FRANCISCO', 'MALAYSIA', 'HONG_KONG'] as const;
export const ATTENDANCE_TYPE_VALUES = ['IN_PERSON', 'VIRTUAL', 'DECLINED'] as const;

const eventCityEnum = z.enum(EVENT_CITY_VALUES);
const attendanceTypeEnum = z.enum(ATTENDANCE_TYPE_VALUES);
const timelineItemSchema = z.object({
  id: z.string().trim().min(1, 'Timeline item id is required'),
  time: z.string().trim().min(1, 'Timeline time is required').max(50, 'Max 50 characters'),
  title: z.string().trim().min(1, 'Timeline title is required').max(120, 'Max 120 characters'),
  details: z.string().trim().max(220, 'Max 220 characters').optional().or(z.literal(''))
});

export const rsvpFormSchema = z
  .object({
    firstName: z.string().trim().min(1, 'First name is required').max(80, 'Max 80 characters'),
    lastName: z.string().trim().min(1, 'Last name is required').max(80, 'Max 80 characters'),
    email: z.string().trim().email('Enter a valid email address'),
    phone: z.string().trim().max(30, 'Max 30 characters').optional().or(z.literal('')),
    attendanceType: attendanceTypeEnum,
    selectedCities: z.array(eventCityEnum),
    guestCount: z.coerce
      .number()
      .int('Guest count must be a whole number')
      .min(1, 'Guest count must be at least 1')
      .max(10, 'Guest count must be 10 or less'),
    notes: z.string().trim().max(500, 'Max 500 characters').optional().or(z.literal(''))
  })
  .superRefine((value, context) => {
    if (value.attendanceType === 'DECLINED' && value.selectedCities.length > 0) {
      context.addIssue({
        code: z.ZodIssueCode.custom,
        path: ['selectedCities'],
        message: 'Do not select an event if you are unable to attend.'
      });
    }

    if (value.attendanceType !== 'DECLINED' && value.selectedCities.length === 0) {
      context.addIssue({
        code: z.ZodIssueCode.custom,
        path: ['selectedCities'],
        message: 'Select at least one celebration.'
      });
    }

    if (
      value.attendanceType === 'VIRTUAL' &&
      (value.selectedCities.length !== 1 || value.selectedCities[0] !== 'SAN_FRANCISCO')
    ) {
      context.addIssue({
        code: z.ZodIssueCode.custom,
        path: ['selectedCities'],
        message: 'Virtual attendance is only available for the San Francisco ceremony.'
      });
    }
  });

export const eventDetailSchema = z.object({
  city: eventCityEnum,
  title: z.string().trim().min(1, 'Title is required').max(120, 'Max 120 characters'),
  eventDate: z.string().trim().min(1, 'Event date is required'),
  venueLabel: z.string().trim().max(80, 'Max 80 characters').optional().or(z.literal('')),
  venueName: z.string().trim().max(160, 'Max 160 characters').optional().or(z.literal('')),
  address: z.string().trim().max(220, 'Max 220 characters').optional().or(z.literal('')),
  secondaryVenueLabel: z.string().trim().max(80, 'Max 80 characters').optional().or(z.literal('')),
  secondaryVenueName: z.string().trim().max(160, 'Max 160 characters').optional().or(z.literal('')),
  secondaryAddress: z.string().trim().max(220, 'Max 220 characters').optional().or(z.literal('')),
  venueStatus: z.string().trim().max(120, 'Max 120 characters').optional().or(z.literal('')),
  description: z.string().trim().max(600, 'Max 600 characters').optional().or(z.literal('')),
  zoomLink: z.string().trim().url('Enter a valid Zoom link').optional().or(z.literal('')),
  latitude: z.coerce.number().min(-90).max(90),
  longitude: z.coerce.number().min(-180).max(180),
  timeline: z.array(timelineItemSchema).max(20, 'Max 20 timeline items')
});

export type RsvpFormInput = z.infer<typeof rsvpFormSchema>;
export type EventDetailInput = z.infer<typeof eventDetailSchema>;
export type TimelineItemInput = z.infer<typeof timelineItemSchema>;