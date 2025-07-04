'use client';
/* page.tsx */
import CardLogin from "@/components/CardLogin";
import CardRegistro from "@/components/CardRegistro";
import styles from "./page.module.scss";
import { motion } from "motion/react";

export default function Home() {
  return (
    <motion.div 
      animate={{
        scale: [1, 2, 2, 1, 1],
        rotate: [0, 0, 180, 180, 0],
        borderRadius: ["0%", "0%", "50%", "50%", "0%"],
      }}
      transition={{
        duration: 1,
        ease: "easeInOut",
        times: [0, 0.2, 0.5, 0.8, 1],
      }}
        className={styles.container}
    >
      <CardLogin />
      <CardRegistro />
    </motion.div>
  );
}
