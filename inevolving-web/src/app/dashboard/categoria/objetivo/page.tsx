'use client';

export const dynamic = "force-dynamic";


import { useEffect, useState } from 'react';
import Menu from "@/components/Menu";
import styles from './page.module.scss';
import * as motion from "motion/react-client";
import { Objective } from '@/components/interfaces/Objective';
import GraficoStatusTarefas from '@/components/GraficoStatusTarefas';
import GraficoMotivosTarefas from '@/components/GraficoMotivosTarefas/GraficoMotivosTarefas';
import Jarvas from '@/components/PopUp/Jarvas';

export default function Page() {
    const [isMobile, setIsMobile] = useState(false);

    const [tipoMenuDesk, setTipoMenuDesk] = useState<number | undefined>(undefined);
    
    useEffect(() => {
        if (typeof window !== 'undefined') {
            setTipoMenuDesk(
                localStorage.getItem('tipoMenuDesk') ? 
                parseInt(localStorage.getItem('tipoMenuDesk') as string) : 1
            );
        }
    }, []);
    
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

    const [abrirJarvas, setAbrirJarvas] = useState(false);

    return (
        <>
        <motion.div className={isMobile ? styles.mob : tipoMenuDesk === 2 ? styles.containerTipoMenu2 : ''}>                 
            <Menu />
            <motion.div
                initial={{ opacity: 0, scale: 0.97 }}
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
                    initial={{ opacity: 0, scale: 0.7 }}
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
                            setAbrirJarvas(true);
                        }}
                    >
                        <div className={styles.textoIA}>
                            <h3>
                                Quer turbinar seus resultados com nossa IA? 🚀
                            </h3>
                            <p>
                                Nossa inteligência artificial analisa seus dados de produtividade do seu objetivo e te oferece sugestões práticas para alcançar seus objetivos com mais foco e eficiência.
                            </p>
                            <p>
                                Ela vai direto ao ponto: identifica os obstáculos que estão travando seu progresso e propõe soluções personalizadas para superar cada um deles. Com o poder das suas NeuroKeys, você desbloqueia o melhor da sua performance e recebe dicas exclusivas do Jarvas para transformar intenção em ação.
                            </p>
                        </div>
                        <motion.button
                            whileHover={{ scale: 1.1 }}
                            whileTap={{ scale: 0.8 }}  
                            onClick={() => {
                                setAbrirJarvas(true);
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
                <motion.div 
                    className={styles.containerGrafico}
                    style={isMobile ? {marginBottom: '200px'} : {}}
                >
                    {objetivo && (
                        <GraficoMotivosTarefas objetivo={objetivo}/>
                    )}
                </motion.div>
            </motion.div>
        </motion.div>
        {abrirJarvas && objetivo && (
            <Jarvas voltar={() => setAbrirJarvas(false)} objetivo={objetivo}/>
        )}
        </>
    );
    
}