"use client";

import React, {useState, useEffect} from 'react';
import moment from 'moment';
import '@/resources/resources';
import CalendarButtons from '../../components/calendar-buttons';
import {events} from '@/resources/calendar-events';
import AnimatedComponents from "@/components/animated-component/animated-components";
import {PageHeading} from "@/components/page-heading";
import {appConfigs} from "@/resources/resources";
import CalendarTable from "@/components/calendar-table";
import {Button} from "react-bootstrap";
import CalendarList from "@/components/calendar-list";

moment.locale(appConfigs.locale);

export default function CalendarPage() {
  const [currentDate, setCurrentDate] = useState<moment.Moment | null>(null);
  const [viewType, setViewType] = useState("list");
  
  useEffect(() => {
    setCurrentDate(moment());
  }, []);
  
  return (
    <AnimatedComponents>
      <div className="container mt-5 mb-5">
        <div className={"d-flex align-items-center justify-content-between gap-3 flex-wrap"}>
          <PageHeading title="Calendário"/>
          
          <div className={"d-flex align-items-center justify-content-center gap-2 mb-3"}>
            <Button variant="success" size={"sm"} className={"rounded-1"} onClick={() => {
              setViewType(viewType === "list" ? "calendar" : "list")
            }}>
              <span className={"text-small"}>Ver em {viewType === "list" ? "tabela" : "lista"}</span>
            </Button>
          </div>
        </div>
        
        <div>
          {
            viewType === "list" ? <CalendarList events={events} currentDate={currentDate}/> : <CalendarTable events={events}/>
          }
        </div>
        
        <CalendarButtons events={events}/>
      </div>
    </AnimatedComponents>
  );
}
