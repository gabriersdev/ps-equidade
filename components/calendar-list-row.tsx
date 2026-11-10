import Link from "next/link";
import moment from "moment";
import { basicClasses as classes } from "@/resources/classes-data";
import { renderText } from "@/libs/render-text";
import type { CalendarEvent } from "@/resources/calendar-events";

interface CalendarListRowProps {
  event: CalendarEvent;
  currentDate: moment.Moment | null;
  isLast: boolean;
}

export function CalendarListRow({
  event,
  currentDate,
  isLast,
}: CalendarListRowProps) {
  const isPast = currentDate
    ? moment(event.date, "DD/MM/YYYY").isBefore(currentDate, "day")
    : false;
  const eventClass = event.id
    ? classes.find((c) => c.id === event.id)
    : null;
  const isExtended =
    moment(`2020-01-01T${event.timeFinish}`).diff(
      moment(`2020-01-01T${event.timeInit}`),
      "minutes"
    ) >=
      60 * 2.5 && !isLast;
  const isExtraClass = event.title.toLowerCase().includes("aula extra");
  const dimmedClass = isPast ? "opacity-50" : "";

  const classContentLink =
    eventClass && eventClass.contents.length > 0 ? (
      <Link
        href={`/class/${eventClass.date.split("/").reverse().join("")}`}
        className="inline-flex items-center gap-1 rounded-sm font-medium text-brand-primary transition-[color,transform] duration-100 ease-out hover:text-brand-tertiary active:scale-[0.98]"
      >
        <span className="break-words">
          Acesse o conteúdo da aula <b>{eventClass.title}</b>
        </span>
      </Link>
    ) : null;

  return (
    <tr className="transition-colors duration-100 even:bg-brand-canvas/60 hover:bg-brand-tertiary/[0.06]">
      <td className={`whitespace-nowrap px-3 py-2.5 align-top font-bold text-brand-ink sm:align-middle lg:px-4 lg:py-3 ${dimmedClass}`}>
        {renderText(event.date)}
      </td>
      <td className={`hidden whitespace-nowrap px-3 py-2.5 align-middle text-brand-ink md:table-cell lg:px-4 lg:py-3 ${dimmedClass}`}>
        {moment(`2020-01-01T${event.timeInit}`).format("HH:mm")} -{" "}
        {moment(`2020-01-01T${event.timeFinish}`).format("HH:mm")}
      </td>
      <td className={`px-3 py-2.5 align-middle lg:px-4 lg:py-3 ${dimmedClass}`}>
        <div className="flex flex-wrap items-center gap-1.5">
          {isPast && (
            <span className="text-brand-tertiary" aria-label="Concluída">
              <svg xmlns="http://www.w3.org/2000/svg" height="16" viewBox="0 -960 960 960" width="16" fill="currentColor" aria-hidden="true">
                <path d="M382-240 154-468l57-57 171 171 367-367 57 57-424 424Z" />
              </svg>
            </span>
          )}
          <span className="font-medium break-words text-brand-ink">
            {renderText(event.title)}
          </span>
          {isExtended && (
            <span className="text-small whitespace-nowrap rounded-md border border-brand-tertiary/30 bg-brand-tertiary/10 px-2 py-0.5 font-normal text-brand-primary">
              horário extendido
            </span>
          )}
          {isExtraClass && (
            <span className="text-small whitespace-nowrap rounded-md border border-brand-notice/25 bg-brand-notice/10 px-2 py-0.5 font-normal text-brand-notice">
              aula extra
            </span>
          )}
        </div>
        {classContentLink && (
          <div className="mt-1.5 text-small sm:hidden">{classContentLink}</div>
        )}
      </td>
      <td className={`hidden px-3 py-2.5 align-middle sm:table-cell lg:px-4 lg:py-3 ${dimmedClass}`}>
        {classContentLink ?? <span className="text-black/45">-</span>}
      </td>
    </tr>
  );
}

