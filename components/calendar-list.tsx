import moment from "moment";
import type { CalendarEvent } from "@/resources/calendar-events";
import { CalendarListRow } from "@/components/calendar-list-row";

interface CalendarListProps {
  events: CalendarEvent[];
  currentDate: moment.Moment | null;
}

export default function CalendarList({ events, currentDate }: CalendarListProps) {
  return (
    <div className="mt-3 overflow-x-auto rounded-md border border-black/15 bg-white">
      <table className="w-full border-collapse text-left text-sm">
        <thead className="border-b border-black/15 bg-brand-canvas">
          <tr>
            <th scope="col" className="w-[102px] whitespace-nowrap px-3 py-2.5 font-semibold text-brand-ink sm:w-[128px] lg:px-4 lg:py-3">
              Data
            </th>
            <th
              scope="col"
              className="hidden whitespace-nowrap px-3 py-2.5 font-semibold text-brand-ink md:table-cell md:w-[132px] lg:px-4 lg:py-3"
            >
              Horário
            </th>
            <th scope="col" className="px-3 py-2.5 font-semibold text-brand-ink lg:px-4 lg:py-3">
              Assunto
            </th>
            <th scope="col" className="hidden px-3 py-2.5 font-semibold text-brand-ink sm:table-cell lg:px-4 lg:py-3">
              Conteúdo
            </th>
          </tr>
        </thead>

        <tbody className="divide-y divide-black/10">
          {events.map((event, index) => (
            <CalendarListRow
              key={index}
              event={event}
              currentDate={currentDate}
              isLast={index === events.length - 1}
            />
          ))}
        </tbody>
      </table>
    </div>
  );
}
