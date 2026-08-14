"use client";

import AnimatedComponent from "./animated-component";
import {AnimatePresence} from "framer-motion";
import {ReactNode} from "react";

interface AnimatedComponentsProps {
  children?: ReactNode;
}

const AnimatedComponents = ({children = <></>}: AnimatedComponentsProps) => {
  return Array.isArray(children) ? children.map((child, key) => {
    return (
      <AnimatePresence mode={"wait"} key={key}>
        <AnimatedComponent>
          {child}
        </AnimatedComponent>
      </AnimatePresence>
    )
  }) : (
    <AnimatePresence mode={"wait"}>
      <AnimatedComponent>
        {children}
      </AnimatedComponent>
    </AnimatePresence>
  )
};

export default AnimatedComponents;
