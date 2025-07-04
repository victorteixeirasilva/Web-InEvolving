'use client';

import CardTextoImagem from "@/components/CardTextoImagem";
import styles from "./page.module.scss";
import CardInputLogin from "@/components/CardInputLogin";
import { motion } from "motion/react";

export default function Login() {
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
                                Bem-vindo<br />
                                de volta
                            </>
                        }
                    />
                </div>
                <CardInputLogin />
            </motion.div>
        </div>
    );
}