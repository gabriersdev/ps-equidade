import Link from 'next/link';
import {dictionary} from '@/resources/dictionary';
import Image from "next/image";

export function Header() {
  return (
    <nav className="navbar navbar-expand-lg bg-white sticky-top border-bottom">
      <div className="container">
        {/* Logo */}
        <Link className="navbar-brand d-flex align-items-start flex-column gap-1" href="/">
          {/* Logo placeholder - styling can be adjusted later */}
          <Image src={"/logo-ps-geral-transparente.png"} alt={"Logo do Programa Sabará"} width={80} height={45} className={"object-cover"}/>
          <span className={"text-sm text-success"}>Equidade Racial</span>
        </Link>
        
        {/* Hamburger Menu Toggle */}
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarContent"
          aria-controls="navbarContent"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        
        {/* Links */}
        <div className="collapse navbar-collapse" id="navbarContent">
          <ul className="navbar-nav ms-auto mb-2 mb-lg-0 gap-3">
            {[
              [dictionary.header.aulas, '/classes'],
              [dictionary.header.calendario, '/calendar'],
              [dictionary.header.areaDoAluno, '/student-page'],
            ].map(([label, href], i) => (
              <li className="nav-item" key={i}>
                <Link className="nav-link text-black fw-bold" href={href}>
                  {label}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </nav>
  );
}
