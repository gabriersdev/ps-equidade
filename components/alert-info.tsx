"use client";

import {renderText} from "@/libs/render-text";
import {Alert, Button} from "react-bootstrap";
import {useState, useEffect} from "react";
import {appConfigs} from "@/resources/resources";
import {alerts} from "@/resources/alerts-data";
import moment from "moment";

moment.locale(appConfigs.locale);

export default function AlertInfo() {
  const [hiddenAlerts, setHiddenAlerts] = useState<string[]>([]);
  const [isLoaded, setIsLoaded] = useState(false);
  const currentDate = moment();
  
  const storageKey = `escudo-app-${appConfigs["app-name-slug"]}-hidden-alerts`;
  
  useEffect(() => {
    const storedHiddenAlerts = localStorage.getItem(storageKey);
    if (storedHiddenAlerts) {
      try {
        setHiddenAlerts(JSON.parse(storedHiddenAlerts));
      } catch (e) {
        console.error("Failed to parse hidden alerts from localStorage", e);
      }
    }
    setIsLoaded(true);
  }, [storageKey]);
  
  const handleClose = (id: string) => {
    const updatedHiddenAlerts = [...hiddenAlerts, id];
    setHiddenAlerts(updatedHiddenAlerts);
    localStorage.setItem(storageKey, JSON.stringify(updatedHiddenAlerts));
  };
  
  const activeAlerts = alerts.filter(alert => {
    const datetimeMaxShowAlert = moment(alert.datetimeMaxShow);
    return !currentDate.isAfter(datetimeMaxShowAlert);
  });
  
  if (!isLoaded || activeAlerts.length === 0) return null;
  
  return (
    <>
      {activeAlerts.map((alert, index) => {
        const show = !hiddenAlerts.includes(alert.id);
        return (
          <Alert key={alert.id || index} className={"p-0 m-0 border-0"} show={show} style={{background: "unset"}}>
            <section
              className={"mb-4 px-3 py-4 rounded-1 bg-blue d-flex gap-3 flex-column"}
              style={{
                backgroundColor: "#123597",
                // backgroundImage: "url(/bg-banner.png)",
                backgroundSize: "cover",
                backgroundPosition: "center",
                backgroundRepeat: "no-repeat"
              }}
            >
              <div className="d-flex align-items-center w-full justify-content-between">
                <div>
                  <span className={"fw-normal text-sm rounded-1 text-white"}>aviso</span>
                </div>
                <Button variant={"danger"} onClick={() => handleClose(alert.id)} className={"bg-transparent border-0 p-0 m-0"}>
                  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-x-lg" viewBox="0 0 16 16">
                    <path d="M2.146 2.854a.5.5 0 1 1 .708-.708L8 7.293l5.146-5.147a.5.5 0 0 1 .708.708L8.707 8l5.147 5.146a.5.5 0 0 1-.708.708L8 8.707l-5.146 5.147a.5.5 0 0 1-.708-.708L7.293 8z"/>
                  </svg>
                </Button>
              </div>
              <div className={"d-flex flex-column gap-2"}>
                <h2 className={"fs-3 text-white m-0 p-0 fw-bold"} style={{letterSpacing: "-0.5px"}}>
                  {renderText(alert.title)}
                </h2>
                <p className={"m-0 p-0 text-white lh-base"}>
                  {renderText(alert.content)}
                </p>
              </div>
            </section>
          </Alert>
        );
      })}
    </>
  )
}
