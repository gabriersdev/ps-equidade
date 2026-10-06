"use client";

import React, {useState} from 'react';
import moment from 'moment';
import {CalendarEvent} from '@/resources/calendar-events';
import {Button, OverlayTrigger, Tooltip} from 'react-bootstrap';
import {renderText} from "@/libs/render-text";

interface CalendarViewProps {
  events: CalendarEvent[];
  currentDate: moment.Moment | null;
}

export default function CalendarTable({events, currentDate}: CalendarViewProps) {
  const dates = events.map(e => moment(e.date, 'DD/MM/YYYY'));
  
  const minDate = dates.length > 0 ? moment.min(dates).startOf('month') : moment().startOf('month');
  const maxDate = dates.length > 0 ? moment.max(dates).startOf('month') : moment().startOf('month');
  
  const [currentMonth, setCurrentMonth] = useState(() => {
    const startMonth = moment().startOf('month');
    if (startMonth.isBefore(minDate, 'month')) return minDate.clone();
    if (startMonth.isAfter(maxDate, 'month')) return maxDate.clone();
    return startMonth;
  });
  
  const prevMonth = () => {
    setCurrentMonth(prev => {
      const next = prev.clone().subtract(1, 'month');
      return next.isBefore(minDate, 'month') ? prev : next;
    });
  };
  
  const nextMonth = () => {
    setCurrentMonth(prev => {
      const next = prev.clone().add(1, 'month');
      return next.isAfter(maxDate, 'month') ? prev : next;
    });
  };
  
  const renderGrid = () => {
    const startDay = currentMonth.clone().startOf('month').startOf('week');
    const endDay = currentMonth.clone().endOf('month').endOf('week');
    
    const day = startDay.clone().subtract(1, 'day');
    const calendar = [];
    
    while (day.isBefore(endDay, 'day')) {
      calendar.push(
        Array(7)
          .fill(0)
          .map(() => day.add(1, 'day').clone())
      );
    }
    
    return (
      <div className="table-responsive">
        <table className="table table-hover text-center bg-white m-0" style={{tableLayout: 'fixed', minWidth: '800px'}}>
          <thead className="table-light">
          <tr>
            {['Dom', 'Seg', 'Ter', 'Qua', 'Qui', 'Sex', 'Sáb'].map(d => (
              <th key={d} className="py-2">{d}</th>
            ))}
          </tr>
          </thead>
          <tbody>
          {calendar.map((week, i) => (
            <tr key={i}>
              {week.map((date, j) => {
                const isCurrentMonth = date.month() === currentMonth.month();
                const dayEvents = events.filter(e => moment(e.date, 'DD/MM/YYYY').isSame(date, 'day'));
                const isToday = moment().isSame(date, 'day');
                
                const isPast = currentDate ? date.isBefore(currentDate, 'day') : false;
                
                return (
                  <td
                    key={j}
                    className={`align-top p-2 ${!isCurrentMonth ? 'text-muted bg-light' : ''} ${isToday ? 'border-primary' : ''}`}
                    style={{height: '110px', width: '14.28%', borderWidth: isToday ? '2px' : '1px'}}
                  >
                    <div className={`fw-bold mb-2 text-end ${isToday ? 'text-primary' : ''}`}>
                      {date.date()}
                    </div>
                    <div className="d-flex flex-column gap-1 text-start overflow-hidden">
                      {dayEvents.map((evt, k) => (
                        <OverlayTrigger key={k} overlay={
                          <Tooltip id={`tooltip-${i}-${j}-${k}`}>
                            <span className={"text-small text-balance font-inter"}>{renderText(evt.title)}</span>
                          </Tooltip>
                        }>
                          <div className="bg-success text-white p-1 px-2 rounded-1 line-clamp-2" style={{fontSize: '1rem', lineHeight: '1.2', opacity: isPast ? 0.5 : 1}}>
                            <span className="fw-bold me-1 d-flex align-items-center gap-1">
                              {evt.timeInit.substring(0, 5)}
                              {isPast && (
                                <svg xmlns="http://www.w3.org/2000/svg" height="14" viewBox="0 -960 960 960" width="14" fill="currentcolor"><path d="M382-240 154-468l57-57 171 171 367-367 57 57-424 424Z"/></svg>
                              )}
                            </span>
                            <span className={"mt-1 d-block"}>{renderText(evt.title)}</span>
                          </div>
                        </OverlayTrigger>
                      ))}
                    </div>
                  </td>
                );
              })}
            </tr>
          ))}
          </tbody>
        </table>
      </div>
    );
  };
  
  return (
    <div className="calendar-view bg-white rounded p-4 mb-4 border">
      <div className="d-flex justify-content-between align-items-center mb-3">
        <Button variant="primary" size={"sm"} className={"rounded-1"} onClick={prevMonth} disabled={currentMonth.isSameOrBefore(minDate, 'month')}>
          <span className={"text-small"}>Anterior</span>
        </Button>
        <h2 className="m-0 fs-3 text-capitalize fw-semibold text-primary font-inter-tight" style={{letterSpacing: "-0.5px"}}>{currentMonth.format('MMMM YYYY')}</h2>
        <Button variant="secondary" size={"sm"} className={"rounded-1"} onClick={nextMonth} disabled={currentMonth.isSameOrAfter(maxDate, 'month')}>
          <span className={"text-small"}>Próximo</span>
        </Button>
      </div>
      <div className="table-responsive border rounded">
        {renderGrid()}
      </div>
    </div>
  );
}
