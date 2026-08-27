"use client";

import {renderText} from "@/libs/render-text";
import {Alert, Button} from "react-bootstrap";
import {useState} from "react";
import {appConfigs} from "@/resources/resources";
import moment from "moment";

moment.locale(appConfigs.locale);

export default function AlertInfo() {
  const [show, setShow] = useState(true);
  const datetimeMaxShowAlert = moment("2026-10-24T15:00:00");
  const currentDate = moment();
  
  if (currentDate.isAfter(datetimeMaxShowAlert)) return null;
  
  return (
    <Alert className={"p-0 m-0 border-0"} show={show} style={{background: "unset"}}>
      <section
        className={"mb-4 px-3 py-4 rounded-1 bg-blue d-flex gap-3 flex-column"}
        style={{
          backgroundColor: "#161FFE",
          backgroundImage: "url(/bg-banner.png)",
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat"
        }}
      >
        <div className="d-flex align-items-center w-full justify-content-between">
          <div>
            <span className={"fw-normal text-sm rounded-1 text-warning"}>aviso</span>
          </div>
          <Button variant={"danger"} onClick={() => setShow(false)} className={"bg-transparent border-0 p-0 m-0"}>
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-x-lg" viewBox="0 0 16 16">
              <path d="M2.146 2.854a.5.5 0 1 1 .708-.708L8 7.293l5.146-5.147a.5.5 0 0 1 .708.708L8.707 8l5.147 5.146a.5.5 0 0 1-.708.708L8 8.707l-5.146 5.147a.5.5 0 0 1-.708-.708L7.293 8z"/>
            </svg>
          </Button>
        </div>
        <div className={"d-flex flex-column gap-2"}>
          <h2 className={"fs-3 text-white m-0 p-0 fw-bold"} style={{letterSpacing: "-0.5px"}}>Aulas com horário estendido</h2>
          <p className={"m-0 p-0 text-white lh-base"}>
            {renderText("As aulas que serão realizadas entre 12/09 e 24/10 terão 30 minutos adicionais de duração, em razão da reposição da aula que não ocorreu em 22/08. Os alunos que não puderem permanecer durante todo o período não serão penalizados.")}
          </p>
        </div>
      </section>
    </Alert>
  )
}
