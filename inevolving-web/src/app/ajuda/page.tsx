'use client';

export const dynamic = "force-dynamic";

import Menu from "@/components/Menu";
import styles from './page.module.scss';
import * as motion from "motion/react-client";
import Image from "next/image";
import { useEffect, useState } from "react";
import { linkWpp } from "../page";

export default function Page( ) {
    const [isMobile, setIsMobile] = useState(false);
    const [tipoMenuDesk, setTipoMenuDesk] = useState<number | undefined>(undefined);
    
    useEffect(() => {
        if (typeof window !== 'undefined') {
            const largura = window.innerWidth;
            setIsMobile(largura <= 1024);
            setTipoMenuDesk(
                localStorage.getItem('tipoMenuDesk') ? 
                parseInt(localStorage.getItem('tipoMenuDesk') as string) : 1
            );
        }
    }, []);

    return (
        <motion.div className={isMobile ? styles.mob : tipoMenuDesk === 2 ? styles.containerTipoMenu2 : ''}>
            <Menu />
            <motion.div
                initial={{ opacity: 0, scale: 1 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{
                    duration: 0.7,
                    scale: { type: "spring", visualDuration: 0.4, bounce: 0.5 },
                }} 
                className={styles.container}
            >
                <motion.div className={styles.tituloContainer}>
                    <h1>Ajuda</h1>
                    <p>Precisa de Ajuda, entre em contato com a InovaSoft pelo telefone ou pelas redes sociais!</p>
                </motion.div>
                <motion.div className={styles.containerConteudo}>
                    <motion.div
                        className={styles.containerWpp}
                    >
                        <div className={styles.texto}>
                            <h2>
                                Fale conosco pelo WhatsApp!
                            </h2>
                            <p>
                                Caso tenha alguma dúvida, ou tenha algum problema, entre em contato conosco pelo WhatsApp, clicando no botão ao lado. 
                            </p>
                        </div>
                        <motion.div
                            whileHover={{ scale: 1.1 }} 
                            whileTap={{ scale: 0.8 }} 
                            className={styles.containerBotao}
                            onClick={() => {
                                window.open(
                                    linkWpp,
                                    "_blank"
                                );
                            }}
                        >
                            <Image 
                                src="/ic_baseline-whatsapp-branco.svg"
                                alt="Icone Wpp"
                                width={70}
                                height={70}
                                className={styles.icon}
                            />
                            <div className={styles.botao}>
                                Fale conosco!
                            </div>
                        </motion.div>
                    </motion.div>
                </motion.div>
            </motion.div>
        </motion.div>
    );
}