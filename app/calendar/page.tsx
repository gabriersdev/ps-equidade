"use client";

import React, { useState, useEffect } from 'react';
import moment from 'moment';
import '@/resources/resources';
import {renderText} from "@/libs/render-text";
import CalendarButtons from './calendar-buttons';
import { events } from '@/resources/calendar-events';

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
