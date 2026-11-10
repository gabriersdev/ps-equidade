import moment from "moment";
import type { CalendarEvent } from "@/resources/calendar-events";
import { CALENDAR_WEEK_DAYS } from "@/libs/calendar-utils";
import { CalendarEventChip } from "@/components/calendar-event-chip";

interface CalendarTableGridProps {
  weeks: moment.Moment[][];
  currentMonth: moment.Moment;
  currentDate: moment.Moment | null;
  events: CalendarEvent[];
}

export function CalendarTableGrid({
  weeks,
  currentMonth,
  currentDate,
  events,
}: CalendarTableGridProps) {
  return (
    <table className="w-full min-w-[800px] table-fixed border-collapse bg-white text-center">
      <thead className="border-b border-black/15 bg-brand-canvas">
        <tr>
          {CALENDAR_WEEK_DAYS.map((dayName) => (
            <th
              key={dayName}
              scope="col"
              className="py-2.5 text-sm font-semibold text-brand-ink"
            >
              {dayName}
            </th>
          ))}
        </tr>
      </thead>
      <tbody className="divide-y divide-black/10">
        {weeks.map((week, i) => (
          <tr key={i} className="divide-x divide-black/10">
            {week.map((date, j) => {
              const isCurrentMonth = date.month() === currentMonth.month();
              const dayEvents = events.filter((e) =>
                moment(e.date, "DD/MM/YYYY").isSame(date, "day")
              );
              const isToday = moment().isSame(date, "day");
              const isPast = currentDate
                ? date.isBefore(currentDate, "day")
                : false;
              const alignEdge = j === 0 ? "left" : j === 6 ? "right" : "center";

              return (
                <td
                  key={j}
                  className={`h-[116px] w-[14.28%] align-top p-2 ${
                    !isCurrentMonth ? "bg-brand-canvas text-black/45" : "bg-white"
                  } ${
                    isToday ? "outline-2 -outline-offset-2 outline-brand-primary" : ""
                  }`}
                >
                  <div
                    className={`mb-2 text-right text-sm font-bold ${
                      isToday ? "text-brand-primary" : ""
                    }`}
                  >
                    {date.date()}
                  </div>
                  <div className="flex flex-col gap-1 text-left">
                    {dayEvents.map((evt, k) => (
                      <CalendarEventChip
                        key={k}
                        event={evt}
                        isPast={isPast}
                        preferBelow={i === 0}
                        alignEdge={alignEdge}
                      />
                    ))}
                  </div>
                </td>
              );
            })}
          </tr>
        ))}
      </tbody>
    </table>
  );
}
