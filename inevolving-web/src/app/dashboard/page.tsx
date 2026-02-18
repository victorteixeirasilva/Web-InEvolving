'use client';

export const dynamic = "force-dynamic";

import { useCallback, useEffect, useState } from 'react';
import Menu from "@/components/Menu";
import styles from './page.module.scss';
import Image from "next/image";
import * as motion from "motion/react-client";
import { useRef } from "react";
import { ClipLoader } from 'react-spinners';
import { ResponseDashboard } from '@/components/interfaces/ResponseDashboard';
import BotaoDashVerDatalhesCategoria from '@/components/BotaoDashVerDatalhesCategoria';
import EditarCategoria from '@/components/PopUp/editarCategoria';
import { useRouter } from 'next/navigation';
import { linkApi } from '../../constants';

export default function Dashboard() {

    const [tipoMenuDesk, setTipoMenuDesk] = useState<number | undefined>(undefined);
    
    const [isMobile, setIsMobile] = useState(false);
    
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


    const constraintsRef = useRef<HTMLDivElement>(null)
    const [urlVisionBord, setUrlVisionBord] = useState<string | null>(null);
    const [jwtToken, setJwtToken] = useState('');

    const [dashboardData, setDashboardData] = useState<ResponseDashboard | null>(null);

    const [showVisionBoard, setShowVisionBoard] = useState(false);

    const [carregandoDash, setCarregandoDash] = useState(false);

    const router = useRouter();

    useEffect(() => {
        // const storedUrl = localStorage.getItem('visionBordUrl');
        // setUrlVisionBord(storedUrl);
        const token = localStorage.getItem('token');
        setJwtToken(token ?? '');
    }, []);

    const getDashboard = useCallback(async () => {
        setCarregandoDash(true);
        const response = await fetch(
                linkApi + "/auth/api/dashboard", 
            {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': 'Bearer ' + jwtToken
                },
            });

        const data: ResponseDashboard = await response.json();
        
        if (response.status === 401){
            router.push('/login');
            alert('Você não está logado, por favor faça login novamente.');
        }

        setCarregandoDash(false);
        if (response.ok) {
            setDashboardData(data);
        }
    }, [jwtToken, router])

    const getVisionBoard = useCallback(async () => {
        const response = await fetch(
                linkApi + "/auth/api/motivation/dreams/visionbord/generate", 
            {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': 'Bearer ' + jwtToken
                },
            });

        const data = await response.json();
        
        if (response.status === 401){
            router.push('/login');
            alert('Você não está logado, por favor faça login novamente.');
        }

        if (response.ok) {
            setUrlVisionBord(data.urlVisionBord);
        }
    }, [jwtToken, router])

    useEffect(() => {
        if (jwtToken) {
            getDashboard();
            getVisionBoard();
        }
    }, [jwtToken, getDashboard, getVisionBoard]);


    const handleOpenInNewTab = () => {
        if (!urlVisionBord) return;
        window.open(urlVisionBord, '_blank');
    };

    const [abrirEditarCategoria, setAbrirEditarCategoria] = useState(false);

    return (
        <>
        <motion.div className={isMobile ? styles.mob : tipoMenuDesk === 2 ? styles.containerTipoMenu2 : ''}>                
            <Menu />
            <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{
                    duration: 0.7,
                    scale: { type: "spring", visualDuration: 0.4, bounce: 0.5 },
                }} 
                className={styles.container}>
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
                    <h1>Dashboard</h1>
                </div>

                <motion.div ref={constraintsRef} className={styles.containerConteudo}>
                    {carregandoDash && (
                        <ClipLoader size={50} color="#0B0E31" />
                    )}
                    {!carregandoDash && !dashboardData && (
                        <h3>
                            Cadastre uma categoria no modulo de objetivos para ver seu dashboard!
                        </h3>
                    )}
                    {!carregandoDash && dashboardData?.categoryDTOList.map((category) => (
                        <motion.div 
                            whileHover={{ scale: 1.03 }}
                            // whileTap={{ scale: 0.8 }} 
                            key={category.id} 
                            className={styles.categoria}
                        >
                            <motion.div
                                className={styles.containerConteudoCategoria}
                                >
                                <h2>{category.categoryName}</h2>
                                <div className={styles.containerBotao}>
                                    <BotaoDashVerDatalhesCategoria categoria={category}/>
                                    <motion.div
                                        whileHover={{ scale: 1.2 }}
                                        whileTap={{ scale: 0.8 }}
                                        onClick={() => {
                                                localStorage.setItem('categoriaAtual', JSON.stringify(category));
                                                setAbrirEditarCategoria(true);
                                        }}
                                        className={styles.botaoEditar}
                                    >
                                        Editar
                                    </motion.div>
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
                    className={styles.overlay}
                >
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
            {abrirEditarCategoria && (
                <EditarCategoria />
            )}
        </>
    );
        // return (
        //     <>
        //     <motion.div className={styles.mob}>
        //         <Menu />
        //         <motion.div
        //             initial={{ opacity: 0, scale: 0 }}
        //             animate={{ opacity: 1, scale: 1 }}
        //             transition={{
        //                 duration: 0.4,
        //                 scale: { type: "spring", visualDuration: 0.4, bounce: 0.5 },
        //             }} 
        //             className={styles.container}>
        //             {/* ✅ Só renderiza se a URL for válida e diferente de "No dreams were found" */}
        //             {urlVisionBord && urlVisionBord !== "No dreams were found" && (
        //                 <div className={styles.preVisionBordContainer}>
        //                     <Image 
        //                         src={urlVisionBord}
        //                         width={1920}
        //                         height={1080}
        //                         alt="vision bord"
        //                         className={styles.visionboardImage}
        //                         />
        //                     <div className={styles.verVisionBoard}>
        //                         <button onClick={() => setShowVisionBoard(true)}>Ver Vision Board</button>
        //                     </div>
        //                 </div>
        //             )}
        //             <div className={styles.tituloContainer}>
        //                 <h1>Dashboard</h1>
        //             </div>

        //             <motion.div ref={constraintsRef} className={styles.containerConteudo}>
        //                 {carregandoDash && (
        //                     <ClipLoader size={50} color="#0B0E31" />
        //                 )}
        //                 {!carregandoDash && !dashboardData && (
        //                     <h3>
        //                         Cadastre uma categoria no modulo de objetivos para ver seu dashboard!
        //                     </h3>
        //                 )}
        //                 {!carregandoDash && dashboardData?.categoryDTOList.map((category) => (
        //                     <motion.div 
        //                         key={category.id} 
        //                         className={styles.categoria}
        //                     >
        //                         <motion.div
        //                             className={styles.containerConteudoCategoria}
        //                             >
        //                             <h2>{category.categoryName}</h2>
        //                             <div className={styles.containerBotao}>
        //                                 <BotaoDashVerDatalhesCategoria categoria={category}/>
        //                                 <div
        //                                     onClick={() => {
        //                                         localStorage.setItem('categoriaAtual', JSON.stringify(category));
        //                                         setAbrirEditarCategoria(true);
        //                                     }}
        //                                 >
        //                                     <motion.a 
        //                                         whileHover={{ scale: 1.2 }}
        //                                         whileTap={{ scale: 0.8 }}
        //                                         onClick={() => {
        //                                             localStorage.setItem('categoriaAtual', JSON.stringify(category));
        //                                             setAbrirEditarCategoria(true);
        //                                         }}
        //                                     >
        //                                         Editar
        //                                     </motion.a>
        //                                 </div>
        //                             </div>
        //                         </motion.div>
        //                     </motion.div>
        //                 ))}
        //             </motion.div>
        //         </motion.div>
        //         {!carregandoDash && showVisionBoard && (
        //             <motion.div 
        //             initial={{ opacity: 0, scale: 0 }}
        //             animate={{ opacity: 1, scale: 1 }}
        //             transition={{
        //                 duration: 0.4,
        //                 scale: { type: "spring", visualDuration: 0.4, bounce: 0.5 },
        //             }} 
        //             className={styles.overlay}>
        //                 <div className={styles.popup}>
        //                     <div className={styles.containerBotoes}>
        //                         <motion.button
        //                             whileHover={{ scale: 1.2 }}
        //                             whileTap={{ scale: 0.8 }} 
        //                             className={styles.botaoVoltar} 
        //                             onClick={() => setShowVisionBoard(false)}
        //                             >
        //                             Voltar
        //                         </motion.button>
        //                         <h2>Vision Board</h2>
        //                         <motion.button 
        //                             whileHover={{ scale: 1.2 }}
        //                             whileTap={{ scale: 0.8 }} 
        //                             className={styles.botaoVoltar} 
        //                             onClick={handleOpenInNewTab}
        //                             >
        //                             <Image 
        //                                 src='/iconeDownload.svg'
        //                                 alt='Icone Download'
        //                                 width={26}
        //                                 height={26}
        //                                 />
        //                         </motion.button>
        //                     </div>
        //                     <Image
        //                         src={urlVisionBord!}
        //                         alt="Vision Board"
        //                         width={800}
        //                         height={450}
        //                         className={styles.popupImage}
        //                         />
        //                 </div>
        //             </motion.div>
        //         )}
        //     </motion.div>
        //     {abrirEditarCategoria && (
        //         <EditarCategoria />
        //     )}
        //     </>
        // );
}