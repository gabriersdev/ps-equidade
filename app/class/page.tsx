import {Metadata} from "next";
import {redirect} from "next/navigation";

export const metadata: Metadata = {
  title: "Aulas",
};

export default async function AulasPage() {
  redirect("/classes");
}
