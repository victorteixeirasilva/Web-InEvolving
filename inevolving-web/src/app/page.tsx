'use client';
/* page.tsx */
import CardLogin from "@/components/CardLogin";
import CardRegistro from "@/components/CardRegistro";
import styles from "./page.module.scss";
import { motion } from "motion/react";
import { useEffect, useState } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";

export default function Home() {

  const [isMobile, setIsMobile] = useState(false);
  const [animacaoFinalizada, setAnimacaoFinalizada] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const largura = window.innerWidth;
    setIsMobile(largura <= 1024);
  }, []);


  return (
    <>
    {!isMobile && (
      <motion.div 
        animate={isMobile ? {} : {
          scale: [1, 2, 2, 1, 1],
          rotate: [0, 0, 180, 180, 0],
          borderRadius: ["0%", "0%", "50%", "50%", "0%"],
        }}
        transition={isMobile ? {} : {
          duration: 1,
          ease: "easeInOut",
          times: [0, 0.2, 0.5, 0.8, 1],
        }}
        className={styles.container}
        >
        
          <>
            <CardLogin />
            <CardRegistro />
          </>
      </motion.div>
    )}
    {isMobile && !animacaoFinalizada && (
      <div className={styles.mobileOnly}>
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
          onAnimationComplete={() => setAnimacaoFinalizada(true)}
          >
          <Image 
            src="/mobile/logoInicio.svg"
            alt="Logo"
            width={182}
            height={182}
            className={styles.logo}
            />
        </motion.div>
      </div>
    )}
    {isMobile && animacaoFinalizada && (
      <div className={styles.mobileOnlyInicio}>
        <div className={styles.espaco}>

        </div>
        <h1>
          Boas-Vindas ao <br/>
          <strong>InEvolving</strong>
        </h1>
        <motion.div 
          whileTap={{ scale: 0.8 }}
          className={styles.comecar}
          onClick={() => router.push("/login")}
          >
          Começar
        </motion.div>
      </div>
    )}
    </>
  );
}
