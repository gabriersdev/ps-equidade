import {appConfigs} from "@/resources/resources";
import {dictionary} from "@/resources/dictionary";
import Link from "next/link";

export function Footer() {
  return (
    <footer className="border-top py-4 bg-white mt-auto text-sm">
      <div className="container">
        <div className="d-flex flex-column flex-md-row justify-content-between align-items-center text-muted">
          <Link href={"/"} className="mb-3 mb-md-0 text-decoration-none text-muted text-small">
            {appConfigs["app-name"]} &copy; {new Date().getFullYear()}
          </Link>
          <div>
            <span className="text-muted">
              {dictionary.footer.poweredBy}
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
}
