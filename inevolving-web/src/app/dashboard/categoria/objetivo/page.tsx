'use client';

import { useEffect, useState } from 'react';
import Menu from "@/components/Menu";
import styles from './page.module.scss';
import * as motion from "motion/react-client";
import { Objective } from '@/components/interfaces/Objective';
import { useRouter } from 'next/navigation';
import GraficoStatusTarefas from '@/components/GraficoStatusTarefas';

export default function Objetivo() {
    const [isMobile, setIsMobile] = useState(false);
    
    useEffect(() => {
        const largura = window.innerWidth;
        setIsMobile(largura <= 1024);
    }, []);

    const [objetivo, setObjetivo] = useState<Objective | null>(null);

    useEffect(() => {
        const objetivoStr = localStorage.getItem('objetivoAtual');
        if (objetivoStr) {
            const objetivoObj: Objective = JSON.parse(objetivoStr);
            setObjetivo(objetivoObj);
        }
    }, []);

    const router = useRouter();

    if (!isMobile) {
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
                        <h1>Análises</h1>
                        <p><strong>{objetivo?.nameObjective} - </strong>{objetivo?.descriptionObjective}</p>
                    </div>
                    <motion.div 
                        className={styles.containerConteudo}
                        initial={{ opacity: 0, scale: 0 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{
                            duration: 0.4,
                            scale: { type: "spring", visualDuration: 0.4, bounce: 0.5 },
                        }}
                    >
                        <motion.div
                            whileHover={{ scale: 1.03 }}
                            whileTap={{ scale: 0.8 }}  
                            className={styles.containerIA}
                            onClick={() => {
                                router.push("/desculpa")
                            }}
                        >
                            <div className={styles.textoIA}>
                                <h3>
                                    Quer turbinar seus resultados com nossa IA? 🚀
                                </h3>
                                <p>
                                    Nossa inteligência artificial analisa seus dados de produtividade e te oferece sugestões práticas para alcançar seus objetivos com mais foco e eficiência.
                                </p>
                            </div>
                            <motion.button
                                whileHover={{ scale: 1.1 }}
                                whileTap={{ scale: 0.8 }}  
                                onClick={() => {
                                    router.push("/desculpa")
                                }}
                                className={styles.botao}
                            >
                                Obter Dicas da IA
                            </motion.button>
                        </motion.div>
                    </motion.div>
                    <motion.div className={styles.containerGrafico}>
                        {objetivo && (
                            <>
                                <GraficoStatusTarefas objetivo={objetivo}/>
                                <div className={styles.totalTarefas}>
                                    <h3>
                                        Total de tarefas
                                    </h3>
                                    <p>{objetivo.totNumberTasks}</p>
                                </div>
                            </>
                        )}
                    </motion.div>
                </motion.div>
            </motion.div>
        );
    } else {
        return (
            <div className={styles.mob}>
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
                            <h1>Análises</h1>
                            <p><strong>{objetivo?.nameObjective} - </strong>{objetivo?.descriptionObjective}</p>
                        </div>
                        <motion.div 
                            className={styles.containerConteudo}
                            initial={{ opacity: 0, scale: 0 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{
                                duration: 0.4,
                                scale: { type: "spring", visualDuration: 0.4, bounce: 0.5 },
                            }}
                        >
                            <motion.div
                                whileHover={{ scale: 1.03 }}
                                whileTap={{ scale: 0.8 }}  
                                className={styles.containerIA}
                                onClick={() => {
                                    router.push("/desculpa")
                                }}
                            >
                                <div className={styles.textoIA}>
                                    <h3>
                                        Quer turbinar seus resultados com nossa IA? 🚀
                                    </h3>
                                    <p>
                                        Nossa inteligência artificial analisa seus dados de produtividade e te oferece sugestões práticas para alcançar seus objetivos com mais foco e eficiência.
                                    </p>
                                </div>
                                <motion.button
                                    whileHover={{ scale: 1.1 }}
                                    whileTap={{ scale: 0.8 }}  
                                    onClick={() => {
                                        router.push("/desculpa")
                                    }}
                                    className={styles.botao}
                                    style={{color: '#0B0E31'}}
                                >
                                    Obter Dicas da IA
                                </motion.button>
                            </motion.div>
                        </motion.div>
                        <motion.div className={styles.containerGrafico}>
                            {objetivo && (
                                <>
                                    <GraficoStatusTarefas objetivo={objetivo}/>
                                    <div className={styles.totalTarefas}>
                                        <h3>
                                            Total de tarefas
                                        </h3>
                                        <p>{objetivo.totNumberTasks}</p>
                                    </div>
                                </>
                            )}
                        </motion.div>
                    </motion.div>
                </motion.div>
            </div>
        );
    }
    
}