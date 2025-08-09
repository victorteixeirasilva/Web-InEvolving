'use client';

import CardTextoImagem from "@/components/CardTextoImagem";
import styles from "./page.module.scss";
import { motion } from "motion/react";
import CardInputCadastro from "@/components/CardInputCadastro";
import { useEffect, useState } from "react";

export default function Cadastro() {

    const [preEmail, setPreEmail] = useState('');

    useEffect(() => {
        const email = localStorage.getItem('email');
        if (email) setPreEmail(email);
    }, [])

    return (
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
    );
}