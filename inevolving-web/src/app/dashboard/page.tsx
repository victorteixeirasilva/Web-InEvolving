'use client';

import { useEffect, useState } from 'react';
import Menu from "@/components/Menu";
import styles from './page.module.scss';
import Image from "next/image";
import * as motion from "motion/react-client";
import { useRef } from "react";
import { ClipLoader } from 'react-spinners';
import { ResponseDashboard } from '@/components/interfaces/ResponseDashboard';
import BotaoDashVerDatalhesCategoria from '@/components/BotaoDashVerDatalhesCategoria';
import { useRouter } from 'next/navigation';
import { Category } from '@/components/interfaces/Category';

export default function Dashboard() {
    const constraintsRef = useRef<HTMLDivElement>(null)
    const [urlVisionBord, setUrlVisionBord] = useState<string | null>(null);
    const [jwtToken, setJwtToken] = useState('');

    const [dashboardData, setDashboardData] = useState<ResponseDashboard | null>(null);

    const [showVisionBoard, setShowVisionBoard] = useState(false);

    const [carregandoDash, setCarregandoDash] = useState(false);



    useEffect(() => {
        const storedUrl = localStorage.getItem('visionBordUrl');
        setUrlVisionBord(storedUrl);
        const token = localStorage.getItem('token');
        setJwtToken(token ?? '');
    }, []);

    const getDashboard = async () => {
        setCarregandoDash(true);
        const response = await fetch(
                'http://127.0.0.1:2327/auth/api/dashboard', 
            {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': 'Bearer ' + jwtToken
                },
            });

        const data: ResponseDashboard = await response.json();
        

        if (!response.ok){
            setCarregandoDash(false);
            alert('Erro ao puxar dashboard');
            console.error('Erro ao puxar dashboard');
        }
        
        setCarregandoDash(false);
        setDashboardData(data);
    };

    useEffect(() => {
        if (jwtToken) {
            getDashboard();
        }
    }, [jwtToken]);


    const handleOpenInNewTab = () => {
        if (!urlVisionBord) return;
        window.open(urlVisionBord, '_blank');
    };

    const router = useRouter();
            
    const handleClick = (categoria:Category) => {
        localStorage.setItem('categoriaAtual', JSON.stringify(categoria));
        router.push('/dashboard/categoria');
    };


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
                className={styles.container}>
                {/* ✅ Só renderiza se a URL for válida e diferente de "No dreams were found" */}
                {urlVisionBord && urlVisionBord !== "No dreams were found" && (
                    <div className={styles.preVisionBordContainer}>
                        <Image 
                            src={urlVisionBord}
                            width={1920}
                            height={1080}
                            alt="vision bord"
                            className={styles.visionboardImage}
                        />
                        <div className={styles.verVisionBoard}>
                            <button onClick={() => setShowVisionBoard(true)}>Ver Vision Board</button>
                        </div>
                    </div>
                )}
                <div className={styles.tituloContainer}>
                    <h1>Métricas</h1>
                </div>

                <motion.div ref={constraintsRef} className={styles.containerConteudo}>
                    {carregandoDash && (
                        <ClipLoader size={50} color="#0B0E31" />
                    )}
                    {!carregandoDash && dashboardData?.categoryDTOList.map((category) => (
                        <motion.div 
                            whileHover={{ scale: 1.03 }}
                            whileTap={{ scale: 0.8 }} 
                            key={category.id} 
                            className={styles.categoria}
                            onClick={() => handleClick(category)}
                        >
                            <motion.div
                                className={styles.containerConteudoCategoria}
                            >
                                <h2>{category.categoryName}</h2>
                                <div className={styles.containerBotao}>
                                    <BotaoDashVerDatalhesCategoria categoria={category}/>
                                    <motion.a 
                                        whileHover={{ scale: 1.2 }}
                                        whileTap={{ scale: 0.8 }}
                                        href="/desculpa"
                                    >
                                        Editar
                                    </motion.a>
                                </div>
                            </motion.div>
                        </motion.div>
                    ))}
                </motion.div>
            </motion.div>
            {!carregandoDash && showVisionBoard && (
                <motion.div 
                    initial={{ opacity: 0, scale: 0 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{
                        duration: 0.4,
                        scale: { type: "spring", visualDuration: 0.4, bounce: 0.5 },
                    }} 
                    className={styles.overlay}>
                    <div className={styles.popup}>
                        <div className={styles.containerBotoes}>
                            <motion.button
                                whileHover={{ scale: 1.2 }}
                                whileTap={{ scale: 0.8 }} 
                                className={styles.botaoVoltar} 
                                onClick={() => setShowVisionBoard(false)}
                            >
                                Voltar
                            </motion.button>
                            <h2>Vision Board</h2>
                            <motion.button 
                                whileHover={{ scale: 1.2 }}
                                whileTap={{ scale: 0.8 }} 
                                className={styles.botaoVoltar} 
                                onClick={handleOpenInNewTab}
                            >
                                <Image 
                                    src='/iconeDownload.svg'
                                    alt='Icone Download'
                                    width={26}
                                    height={26}
                                />
                            </motion.button>
                        </div>
                        <Image
                            src={urlVisionBord!}
                            alt="Vision Board"
                            width={800}
                            height={450}
                            className={styles.popupImage}
                        />
                    </div>
                </motion.div>
            )}
        </motion.div>
    );
}