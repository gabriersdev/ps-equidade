import moment from "moment";
import { appConfigs } from "@/resources/resources";
import type { CalendarEvent } from "@/resources/calendar-events";

export function buildCalendarIcsContent(events: CalendarEvent[]): string {
  let icsContent = `BEGIN:VCALENDAR\nVERSION:2.0\nPRODID:-//${appConfigs["app-name-slug"]}//${appConfigs["app-name"]}//EN\n`;

  events.forEach((event) => {
    const date = moment(event.date, "DD/MM/YYYY").format("YYYYMMDD");
    icsContent += "BEGIN:VEVENT\n";
    icsContent += `DTSTART;VALUE=DATE:${date}\n`;
    icsContent += `DTEND;VALUE=DATE:${date}\n`;
    icsContent += `SUMMARY:${event.title} - ${appConfigs["app-name"]}\n`;
    icsContent += `DESCRIPTION:${appConfigs["description"]}\n`;
    icsContent += "END:VEVENT\n";
  });

  icsContent += "END:VCALENDAR";
  return icsContent;
}

export async function exportCalendarIcs(events: CalendarEvent[]): Promise<void> {
  await new Promise<void>((resolve) => requestAnimationFrame(() => resolve()));

  const icsContent = buildCalendarIcsContent(events);
  const blob = new Blob([icsContent], { type: "text/calendar;charset=utf-8" });
  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");
  link.href = url;
  link.download = "calendario.ics";
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(url);
}

export async function exportCalendarPdf(events: CalendarEvent[]): Promise<void> {
  const jsPDFModule = await import("jspdf");
  const autoTableModule = await import("jspdf-autotable");

  const jsPDF = jsPDFModule.default;
  const autoTable = autoTableModule.default;
  const doc = new jsPDF();

  doc.setFontSize(18);
  doc.text("Calendário de Aulas - " + appConfigs["app-name"], 14, 22);

  const tableData = events.map((e) => [e.date, e.title]);
  autoTable(doc, {
    startY: 30,
    head: [["Data", "Conteúdo"]],
    body: tableData,
  });

  doc.save("calendario.pdf");
}

