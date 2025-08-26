'use client';

// import { useEffect, useState } from 'react';
import Menu from "@/components/Menu";
import styles from './page.module.scss';
// import Image from "next/image";
import * as motion from "motion/react-client";
import { useEffect, useState } from "react";
// import { ClipLoader } from 'react-spinners';
// import { ResponseDashboard } from '@/components/interfaces/ResponseDashboard';

export default function Categoria( ) {
    const [isMobile, setIsMobile] = useState(false);
    const [tipoMenuDesk, setTipoMenuDesk] = useState(1);
        // const tipoMenuDesk = localStorage.getItem('tipoMenuDesk') ? 
        // parseInt(localStorage.getItem('tipoMenuDesk') as string) : 1;
    
    useEffect(() => {
        const largura = window.innerWidth;
        setIsMobile(largura <= 1024);
        setTipoMenuDesk(
            localStorage.getItem('tipoMenuDesk') ? 
            parseInt(localStorage.getItem('tipoMenuDesk') as string) : 1
        );
    }, []);




    if (!isMobile) {
        if (tipoMenuDesk === 1) {
            return (
                <motion.div>
                    <Menu />
                    <motion.div
                        initial={{ opacity: 0, scale: 0 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{
                            duration: 0.4,
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
                                alterar tipo do menu!
                            </button>
                        </motion.div>
                    </motion.div>
                </motion.div>
            );
        } else if (tipoMenuDesk === 2) {
            return (
                <motion.div className={styles.containerTipoMenu2}>
                    <Menu />
                    <motion.div
                        initial={{ opacity: 0, scale: 0 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{
                            duration: 0.4,
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
                                    const novoTipo = tipoMenuDesk === 2 ? 1 : 2;
                                    localStorage.setItem('tipoMenuDesk', novoTipo.toString());
                                    window.location.reload();
                                }}
                            >
                                alterar tipo do menu!
                            </button>
                        </motion.div>
                    </motion.div>
                </motion.div>
            );
        }
    } else {
        
    }
}