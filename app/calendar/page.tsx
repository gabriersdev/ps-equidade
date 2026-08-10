"use client";

import React, {useState, useEffect} from 'react';
import moment from 'moment';
import '@/resources/resources';
import {renderText} from "@/libs/render-text";
import CalendarButtons from './calendar-buttons';
import {events} from '@/resources/calendar-events';
import Link from "next/link";

export default function CalendarPage() {
  const [currentDate, setCurrentDate] = useState<moment.Moment | null>(null);
  
  useEffect(() => {
    setCurrentDate(moment());
  }, []);
  
  return (
    <div className="container mt-5 mb-5">
      <h1 className="mb-4" style={{color: 'var(--primary-color)', letterSpacing: "-0.5px"}}>Calendário</h1>
      
      <div className="table-responsive">
        <table className="table table-striped table-hover mt-3 border">
          <thead className="table-light">
          <tr>
            <th scope="col" style={{width: '150px'}}>Data</th>
            <th scope="col">Assunto</th>
            <th scope="col">Conteúdo</th>
          </tr>
          </thead>
          <tbody>
          {events.map((event, index) => {
            const isPast = currentDate ? moment(event.date, 'DD/MM/YYYY').isBefore(currentDate, 'day') : false;
            return (
              <tr key={index}>
                <td className="align-middle fw-bold" style={{opacity: isPast ? 0.5 : 1}}>{renderText(event.date)}</td>
                <td className="align-middle" style={{opacity: isPast ? 0.5 : 1}}>{renderText(event.title)}</td>
                <td className={""} style={{opacity: isPast ? 0.5 : 1}}>
                  <Link
                    href={"#0"}
                    target={"_blank"}
                    className={"link-primary d-inline-flex gap-1 align-items-center text-decoration-none"}
                    rel={"noreferrer noopener"}
                  >
                    <span>{renderText(event.title)}</span>
                    <svg xmlns="http://www.w3.org/2000/svg" height="16" viewBox="0 -960 960 960" width="16" fill="currentcolor">
                      <path d="M200-120q-33 0-56.5-23.5T120-200v-560q0-33 23.5-56.5T200-840h280v80H200v560h560v-280h80v280q0 33-23.5 56.5T760-120H200Zm188-212-56-56 372-372H560v-80h280v280h-80v-144L388-332Z"/>
                    </svg>
                  </Link>
                </td>
              </tr>
            );
          })}
          </tbody>
        </table>
      </div>
      
      <CalendarButtons events={events}/>
    </div>
  );
}
