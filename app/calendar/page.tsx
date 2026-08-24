"use client";

import React, {useState, useEffect} from 'react';
import moment from 'moment';
import '@/resources/resources';
import {renderText} from "@/libs/render-text";
import CalendarButtons from '../../components/calendar-buttons';
import {events} from '@/resources/calendar-events';
import {basicClasses as classes} from '@/resources/classes-data';
import Link from "next/link";
import AnimatedComponents from "@/components/animated-component/animated-components";
import {PageHeading} from "@/components/page-heading";
import {appConfigs} from "@/resources/resources";

moment.locale(appConfigs.locale);

export default function CalendarPage() {
  const [currentDate, setCurrentDate] = useState<moment.Moment | null>(null);
  
  useEffect(() => {
    setCurrentDate(moment());
  }, []);
  
  return (
    <AnimatedComponents>
      <div className="container mt-5 mb-5">
        <PageHeading title="Calendário"/>
        
        <div className="table-responsive">
          <table className="table table-striped table-hover mt-3 border">
            <thead className="table-light">
            <tr>
              <th scope="col" style={{width: '150px'}}>Data</th>
              <th scope="col" style={{width: '160px'}}>Horário</th>
              <th scope="col">Assunto</th>
              <th scope="col">Conteúdo</th>
            </tr>
            </thead>
            <tbody>
            {events.map((event, index) => {
              const isPast = currentDate ? moment(event.date, 'DD/MM/YYYY').isBefore(currentDate, 'day') : false;
              const eventClass = event.id ? classes.find(c => c.id === event.id) : null;
              return (
                <tr key={index}>
                  <td className="align-middle fw-bold" style={{opacity: isPast ? 0.5 : 1}}>{renderText(event.date)}</td>
                  <td style={{opacity: isPast ? 0.5 : 1}}>
                    {moment(`2020-01-01T${event.timeInit}`).format("HH:mm")} - {moment(`2020-01-01T${event.timeFinish}`).format("HH:mm")}
                  </td>
                  <td className="align-middle" style={{opacity: isPast ? 0.5 : 1}}>
                    <div className={"d-flex align-items-center gap-1"}>
                      {isPast ? <span className={"text-success"}><svg xmlns="http://www.w3.org/2000/svg" height="16" viewBox="0 -960 960 960" width="16" fill="currentcolor"><path d="M382-240 154-468l57-57 171 171 367-367 57 57-424 424Z"/></svg></span> : <></>}
                      <span>{renderText(event.title)}</span>
                    </div>
                  </td>
                  <td className="align-middle" style={{opacity: isPast ? 0.5 : 1}}>
                    {eventClass && eventClass.contents.length > 0 ? (
                      <Link
                        href={`/class/${eventClass.date.split('/').reverse().join('')}`}
                        className="link-primary gap-1 align-items-center text-decoration-none fw-medium text-ellipsis line-clamp-2"
                      >
                      <span className="text-break">
                        Acesse o conteúdo da aula <b>{eventClass.title}</b>
                      </span>
                      </Link>
                    ) : (
                      <span className="text-muted">-</span>
                    )}
                  </td>
                </tr>
              );
            })}
            </tbody>
          </table>
        </div>
        
        <CalendarButtons events={events}/>
      </div>
    </AnimatedComponents>
  );
}
