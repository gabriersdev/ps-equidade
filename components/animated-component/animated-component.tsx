"use client";

import {motion} from "framer-motion";
import {ReactNode} from "react";

interface AnimatedComponentProps {
  children: ReactNode;
}

const AnimatedComponent = ({children}: AnimatedComponentProps) => {
  return (
    <motion.div
      initial={{opacity: 0, scale: 1, y: 10}}
      animate={{opacity: 1, scale: 1, y: 0}}
      exit={{opacity: 0, scale: 1, y: -10}}
      transition={{duration: 0.5}}
    >
      {children}
    </motion.div>
  );
};

export default AnimatedComponent;
