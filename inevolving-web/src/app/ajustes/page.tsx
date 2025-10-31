'use client';

export const dynamic = "force-dynamic";

import Menu from "@/components/Menu";
import styles from './page.module.scss';
import * as motion from "motion/react-client";
import { useEffect, useState } from "react";

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
                initial={{ opacity: 0, scale: 0.97 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{
                    duration: 0.7,
                    scale: { type: "spring", visualDuration: 0.4, bounce: 0.5 },
                }} 
                className={styles.container}
            >
                <div className={styles.tituloContainer}>
                    <h1>Ajustes</h1>
                    <p>Altere suas informações de login</p>
                </div>
                <motion.div className={styles.containerConteudo}>
                    <button 
                        onClick={() => {
                            const novoTipo = tipoMenuDesk === 1 ? 2 : 1;
                            localStorage.setItem('tipoMenuDesk', novoTipo.toString());
                            window.location.reload();
                        }}
                    >
                        alterar tipo do menu
                    </button>
                </motion.div>
            </motion.div>
        </motion.div>
    );
}