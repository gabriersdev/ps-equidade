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
          "Salvar calendário na agenda"
        )}
      </button>
      <button onClick={downloadPDF} className="btn btn-secondary rounded-1" disabled={isPDFLoading}>
        {isPDFLoading ? (
          <>
            <span className="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span>
            Gerando...
          </>
        ) : (
          "Baixar calendário"
        )}
      </button>
    </div>
  );
}
