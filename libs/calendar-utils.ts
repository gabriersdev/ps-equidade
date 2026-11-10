import moment from "moment";
import type { CalendarEvent } from "@/resources/calendar-events";

export const CALENDAR_WEEK_DAYS = [
  "Dom",
  "Seg",
  "Ter",
  "Qua",
  "Qui",
  "Sex",
  "Sáb",
];

export function buildCalendarWeeks(month: moment.Moment): moment.Moment[][] {
  const startDay = month.clone().startOf("month").startOf("week");
  const endDay = month.clone().endOf("month").endOf("week");
  const day = startDay.clone().subtract(1, "day");
  const calendar: moment.Moment[][] = [];

  while (day.isBefore(endDay, "day")) {
    calendar.push(
      Array(7)
        .fill(0)
        .map(() => day.add(1, "day").clone())
    );
  }
  return calendar;
}

export function getCalendarBounds(events: CalendarEvent[]): {
  minDate: moment.Moment;
  maxDate: moment.Moment;
} {
  const dates = events.map((e) => moment(e.date, "DD/MM/YYYY"));
  const minDate =
    dates.length > 0
      ? moment.min(dates).startOf("month")
      : moment().startOf("month");
  const maxDate =
    dates.length > 0
      ? moment.max(dates).startOf("month")
      : moment().startOf("month");

  return { minDate, maxDate };
}

