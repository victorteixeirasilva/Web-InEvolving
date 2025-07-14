'use client';

import CardTextoImagem from "@/components/CardTextoImagem";
import styles from "./page.module.scss";
import { motion } from "motion/react";

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
                                Desculpe!! <br/>
                                funcionalidade <br/>
                                ainda em <br/>
                                desenvolvimento!
                            </>
                        }
                    />
                </div>

            </motion.div>
        </div>
    );
}