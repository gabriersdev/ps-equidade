"use client";

import Link from 'next/link'
import {Button} from "react-bootstrap";

export default function NotFound() {
  return (
    <div className={"min-vh-100 d-flex align-items-center justify-content-center flex-column gap-4"}>
      <h1 className={"d-none"}>#404 - Página não encontrada!</h1>
      <h2 className={"fw-semibold text-danger-emphasis m-0 p-0 d-flex flex-column align-items-center gap-1"} style={{letterSpacing: "-0.5px"}}>
        <span className={"display-5"} style={{fontWeight: "inherit"}}>#404</span>
        <span className={"display-6"} style={{fontWeight: "inherit"}}>Página não encontrada!</span>
      </h2>
      <p className={"m-0 p-0"}>A página ainda não existe ou o endereço não está correto.</p>
      <Link href="/" passHref legacyBehavior>
        <Button className={"rounded-1"}>Retornar para o início</Button>
      </Link>
    </div>
  )
}
