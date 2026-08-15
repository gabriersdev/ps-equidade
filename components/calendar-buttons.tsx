"use client";

import {useState} from 'react';
import moment from 'moment';
import {appConfigs} from "@/resources/resources";

export default function CalendarButtons({events}: { events: any[] }) {
  const [isICSLoading, setIsICSLoading] = useState(false);
  const [isPDFLoading, setIsPDFLoading] = useState(false);
  
  const downloadICS = async () => {
    setIsICSLoading(true);
    try {
      // Small timeout to allow state update before processing blocks UI
      await new Promise(resolve => setTimeout(resolve, 100));
      
      let icsContent = `BEGIN:VCALENDAR\nVERSION:2.0\nPRODID:-//${appConfigs["app-name-slug"]}//${appConfigs["app-name"]}//EN\n`;
      events.forEach(event => {
        const date = moment(event.date, 'DD/MM/YYYY').format('YYYYMMDD');
        icsContent += "BEGIN:VEVENT\n";
        icsContent += `DTSTART;VALUE=DATE:${date}\n`;
        icsContent += `DTEND;VALUE=DATE:${date}\n`;
        icsContent += `SUMMARY:${event.title} - ${appConfigs["app-name"]}\n`;
        icsContent += `DESCRIPTION:${appConfigs["description"]}\n`;
        icsContent += "END:VEVENT\n";
      });
      icsContent += "END:VCALENDAR";
      
      const blob = new Blob([icsContent], {type: 'text/calendar;charset=utf-8'});
      const url = URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      link.download = "calendario.ics";
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    } finally {
      setIsICSLoading(false);
    }
  };
  
  const downloadPDF = async () => {
    setIsPDFLoading(true);
    try {
      const jsPDFModule = await import('jspdf');
      const autoTableModule = await import('jspdf-autotable');
      
      const jsPDF = jsPDFModule.default;
      const autoTable = autoTableModule.default;
      
      const doc = new jsPDF();
      
      doc.setFontSize(18);
      doc.text("Calendário de Aulas - " + appConfigs["app-name"], 14, 22);
      
      const tableData = events.map(e => [e.date, e.title]);
      
      autoTable(doc, {
        startY: 30,
        head: [['Data', 'Conteúdo']],
        body: tableData,
      });
      
      doc.save("calendario.pdf");
    } finally {
      setIsPDFLoading(false);
    }
  };
  
  return (
    <div className="d-flex gap-1 flex-wrap">
      <button onClick={downloadICS} className="btn btn-success rounded-1" disabled={isICSLoading}>
        {isICSLoading ? (
          <>
            <span className="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span>
            Gerando...
          </>
        ) : (
          <div className={"d-flex justify-content-center align-items-center gap-2"}>
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-calendar-week" viewBox="0 0 16 16">
              <path d="M11 6.5a.5.5 0 0 1 .5-.5h1a.5.5 0 0 1 .5.5v1a.5.5 0 0 1-.5.5h-1a.5.5 0 0 1-.5-.5zm-3 0a.5.5 0 0 1 .5-.5h1a.5.5 0 0 1 .5.5v1a.5.5 0 0 1-.5.5h-1a.5.5 0 0 1-.5-.5zm-5 3a.5.5 0 0 1 .5-.5h1a.5.5 0 0 1 .5.5v1a.5.5 0 0 1-.5.5h-1a.5.5 0 0 1-.5-.5zm3 0a.5.5 0 0 1 .5-.5h1a.5.5 0 0 1 .5.5v1a.5.5 0 0 1-.5.5h-1a.5.5 0 0 1-.5-.5z"/>
              <path d="M3.5 0a.5.5 0 0 1 .5.5V1h8V.5a.5.5 0 0 1 1 0V1h1a2 2 0 0 1 2 2v11a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2V3a2 2 0 0 1 2-2h1V.5a.5.5 0 0 1 .5-.5M1 4v10a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1V4z"/>
            </svg>
            <span>Salvar calendário na agenda</span>
          </div>
        )}
      </button>
      <button onClick={downloadPDF} className="btn btn-secondary rounded-1" disabled={isPDFLoading}>
        {isPDFLoading ? (
          <>
            <span className="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span>
            Gerando...
          </>
        ) : (
          <div className={"d-flex justify-content-center align-items-center gap-2"}>
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-filetype-pdf" viewBox="0 0 16 16">
              <path fillRule="evenodd" d="M14 4.5V14a2 2 0 0 1-2 2h-1v-1h1a1 1 0 0 0 1-1V4.5h-2A1.5 1.5 0 0 1 9.5 3V1H4a1 1 0 0 0-1 1v9H2V2a2 2 0 0 1 2-2h5.5zM1.6 11.85H0v3.999h.791v-1.342h.803q.43 0 .732-.173.305-.175.463-.474a1.4 1.4 0 0 0 .161-.677q0-.375-.158-.677a1.2 1.2 0 0 0-.46-.477q-.3-.18-.732-.179m.545 1.333a.8.8 0 0 1-.085.38.57.57 0 0 1-.238.241.8.8 0 0 1-.375.082H.788V12.48h.66q.327 0 .512.181.185.183.185.522m1.217-1.333v3.999h1.46q.602 0 .998-.237a1.45 1.45 0 0 0 .595-.689q.196-.45.196-1.084 0-.63-.196-1.075a1.43 1.43 0 0 0-.589-.68q-.396-.234-1.005-.234zm.791.645h.563q.371 0 .609.152a.9.9 0 0 1 .354.454q.118.302.118.753a2.3 2.3 0 0 1-.068.592 1.1 1.1 0 0 1-.196.422.8.8 0 0 1-.334.252 1.3 1.3 0 0 1-.483.082h-.563zm3.743 1.763v1.591h-.79V11.85h2.548v.653H7.896v1.117h1.606v.638z"/>
            </svg>
            <span>Baixar calendário</span>
          </div>
        )}
      </button>
    </div>
  );
}
