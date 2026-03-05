'use client';

export const dynamic = "force-dynamic";


import { useCallback, useEffect, useState } from 'react';
import Menu from "@/components/Menu";
import styles from './page.module.scss';
import * as motion from "motion/react-client";
import { Category } from '@/components/interfaces/Category';
import StatusObjetivoDashboard from '@/components/StatusObjetivoDashboard';
import CardRendimentoDoObjetivoDashboard from '@/components/CardRendimentoDoObjetivoDashboard';
import BotaoDashVerDatalhesObjetivo from '@/components/BotaoDashVerDatalhesObjetivo';
import { useRouter } from 'next/navigation';
import { Objective } from '@/components/interfaces/Objective';
import { linkApi } from '@/constants';
import { ClipLoader } from 'react-spinners';

export default function Page( ) {
    
    const [carregandoDash, setCarregandoDash] = useState(false);
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
    const [categoria, setCategoria] = useState<Category | null>(null);
    
    const router = useRouter();

    useEffect(() => {
        const categoriaStr = localStorage.getItem('categoriaAtual');
        if (categoriaStr) {
            const categoriaObj: Category = JSON.parse(categoriaStr);
            setCategoria(categoriaObj);
        }
    }, []);
    
    const getDashboard = useCallback(async () => {
        setCarregandoDash(true);
        const response = await fetch(
                linkApi + "/auth/api/dashboard/category/objectives/"+categoria?.id, 
            {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': 'Bearer ' + localStorage.getItem('token')
                },
            });

        const data: Category = await response.json();
        
        if (response.status === 401){
            setCarregandoDash(false);
            router.push('/login');
            alert('Você não está logado, por favor faça login novamente.');
        }

        if (response.ok) {
            setCarregandoDash(false);
            setCategoria(data);
        }
    }, [router, categoria?.id])

    useEffect(() => {
        getDashboard();
    }, [getDashboard]);
    const handleClick = (objetivo:Objective) => {
        localStorage.setItem('objetivoAtual', JSON.stringify(objetivo));
        router.push('/dashboard/categoria/objetivo');
    };

    return (
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
                    <h1>{categoria?.categoryName}</h1>
                    <p>{categoria?.categoryDescription}</p>
                </div>
                <motion.div className={styles.containerConteudo}>
                    {carregandoDash && (
                        <ClipLoader size={50} color="#0B0E31" />
                    )}
                    {categoria && categoria?.objectives.map((objetivo) => (
                        <motion.div 
                            whileHover={{ scale: 1.03 }}
                            whileTap={{ scale: 0.8 }}
                            key={objetivo.id} 
                            className={styles.objetivo}
                            onClick={() => handleClick(objetivo)}
                        >
                            <div className={styles.conteudoCard}>
                                <StatusObjetivoDashboard 
                                    nome={objetivo.nameObjective} 
                                    status={objetivo.statusObjective}
                                />
                                <CardRendimentoDoObjetivoDashboard 
                                    objetivo={objetivo}
                                />
                                <div className={styles.containerBotao}>
                                    <BotaoDashVerDatalhesObjetivo objetivo={objetivo}/>
                                    <motion.a 
                                        whileHover={{ scale: 1.2 }}
                                        whileTap={{ scale: 0.8 }}
                                        href="/desculpa"
                                    >
                                        Editar
                                    </motion.a>
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </motion.div>
            </motion.div>
        </motion.div>
    );
}