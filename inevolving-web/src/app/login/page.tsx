'use client';

import CardTextoImagem from "@/components/CardTextoImagem";
import styles from "./page.module.scss";
import CardInputLogin from "@/components/CardInputLogin";
import { motion } from "motion/react";
import { useEffect, useState } from "react";
import Image from "next/image";

export default function Login() {

    const [isMobile, setIsMobile] = useState(false);
    
    useEffect(() => {
        const largura = window.innerWidth;
        setIsMobile(largura <= 1024);
    }, []);


    return (
        <>
        {!isMobile && (
            <div 
                className={styles.background}
                
                >
                <motion.div
                    className={styles.container}
                    initial={{ opacity: 0, scale: 0 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{
                        duration: 0.4,
                        scale: { type: "spring", visualDuration: 0.4, bounce: 0.5 },
                    }}
                    >
                    <div>
                        <CardTextoImagem texto={
                            <>
                                    Bem-vindo<br />
                                    de volta
                                </>
                            }
                            />
                    </div>
                    <CardInputLogin />
                </motion.div>
            </div>
        )}
        {isMobile && (
            <div className={styles.topo}>
                <motion.div 
                    className={styles.logo}
                    initial={{ opacity: 0, scale: 0.5 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{
                        duration: 0.5,
                        delay: 0.00,
                        ease: [0, 0.71, 0.2, 1.01],
                    }}
                >
                    <Image 
                        src="/mobile/LogoPequenoLogin.svg"
                        alt=""
                        width={86}
                        height={86}
                    />
                </motion.div>
               <CardInputLogin/> 
            </div>
        )}
        </>
    );
}