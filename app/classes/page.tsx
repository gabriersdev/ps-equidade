import Link from "next/link";
import {renderText} from "@/libs/util";

export default function AulasPage() {
  return (
    <div className={"mt-5"}>
      <h1 className="mb-4" style={{color: 'var(--primary-color)', letterSpacing: "-0.5px"}}>Aulas</h1>
      
      <div>
        <Link
          target={"_blank"}
          href={"/assets/classes/scratch/20260808.pdf"}
          className={"text-decoration-none"}
        >
          <div className={"card px-3 py-4 rounded-1"}>
            <div className={"d-flex flex-column"}>
              <h2 className="fs-3 m-0 p-0" style={{color: 'var(--secondary-color)', letterSpacing: "-0.5px"}}>Scratch: aula 3</h2>
              <span className={"text-danger"}>{renderText("08/08/2026")}</span>
            </div>
            <div className={"mt-2"}>
              <p className={"m-0 p-0"}>
                Arquivo PDF | Exercícios práticos realizados em sala de aula com Scratch.
              </p>
            </div>
          </div>
        </Link>
      </div>
    </div>
  );
}
