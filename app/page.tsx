import type { Metadata } from "next";
import { dictionary } from "@/resources/dictionary";
import AnimatedComponents from "@/components/animated-component/animated-components";

export const metadata: Metadata = {
  title: dictionary.header.home,
};

export default function Home() {
  return (
    <AnimatedComponents>
      <div className="mx-auto flex h-full w-full flex-col items-center justify-center text-center" />
    </AnimatedComponents>
  );
}
