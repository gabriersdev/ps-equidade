import Link from "next/link";
import { appConfigs } from "@/resources/resources";
import { dictionary } from "@/resources/dictionary";

export function Footer() {
  return (
    <footer className="mt-auto border-t border-black/10 bg-white py-6 text-sm">
      <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-3 px-4 text-black/60 sm:px-6 md:flex-row lg:px-8">
        <Link
          href="/"
          className="text-small rounded-sm text-black/60 transition-[color,transform] duration-100 ease-out hover:text-brand-primary active:scale-[0.98]"
        >
          {appConfigs["app-name"]} &copy; {new Date().getFullYear()}
        </Link>
        <div>
          <span className="text-small text-black/60">
            {dictionary.footer.poweredBy}
          </span>
        </div>
      </div>
    </footer>
  );
}
