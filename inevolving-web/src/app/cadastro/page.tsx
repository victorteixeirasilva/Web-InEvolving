'use client';

import CardTextoImagem from "@/components/CardTextoImagem";
import styles from "./page.module.scss";
import { motion } from "motion/react";
import CardInputCadastro from "@/components/CardInputCadastro";

export default function Cadastro() {
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
                <CardInputCadastro preEmail={
                    localStorage.getItem('email') || ''
                }/>
            </motion.div>
        </div>
    );
}