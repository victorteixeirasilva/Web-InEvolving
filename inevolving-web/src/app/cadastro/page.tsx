'use client';

import CardTextoImagem from "@/components/CardTextoImagem";
import styles from "./page.module.scss";
import { motion } from "motion/react";
import CardInputCadastro from "@/components/CardInputCadastro";
import { useEffect, useState } from "react";
import Image from "next/image";

export default function Cadastro() {
    const [isMobile, setIsMobile] = useState(false);
    const [tema, setTema] = useState<number | undefined>(undefined);
    // const [corBackgroundInput, setCorBackgroundInput] = useState<string>("");
    
    useEffect(() => {
        const largura = window.innerWidth;
        setIsMobile(largura <= 1024);

        setTema(
            localStorage.getItem('tema') ?
            parseInt(localStorage.getItem('tema') as string) : 2
        );

        // if (parseInt(localStorage.getItem('tema') as string) === 2) {
        //     setCorBackgroundInput("#F4F4FE");
        // } else {
        //     setCorBackgroundInput("#535353");
        // }
    }, []);

    const [preEmail, setPreEmail] = useState('');

    useEffect(() => {
        const email = localStorage.getItem('email');
        if (email) setPreEmail(email);
    }, [])

    if (isMobile) {
        return (
            <div className={tema === 1 ? styles.dark : styles.temaClaro}>
                <div className={styles.mob}>
                    <Image 
                        src="/mobile/Wave Background.png"
                        alt=""
                        width={window.innerWidth}
                        height={120}
                        className={styles.wave}
                    />
                    <div className={styles.topo}>
                        <motion.div 
                            className={styles.logo}
                            initial={{ opacity: 0, scale: 0.5 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{
                                duration: 0.5,
                                delay: 0.05,
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
                    </div>
                    <CardInputCadastro preEmail={preEmail}/>
                </div>
            </div>
        );
    } else {
        return (
            <div className={tema === 1 ? styles.dark : styles.temaClaro}>
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
                                        Bem-vindo!
                                    </>
                                }
                            />
                        </div>
                        <CardInputCadastro preEmail={preEmail}/>
                    </motion.div>
                </div>
            </div>
        );
    }
}