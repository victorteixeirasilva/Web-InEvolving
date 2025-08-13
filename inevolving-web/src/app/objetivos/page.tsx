'use client';

import { useCallback, useEffect, useState } from 'react';
import Menu from "@/components/Menu";
import styles from './page.module.scss';
import * as motion from "motion/react-client";
import { Objetivo } from '@/components/interfaces/Objetivo';
import { ClipLoader } from 'react-spinners';
import AdicionarNovoObjetivoOuCategoria from '@/components/PopUp/adicionarNovoObjetivoOuCategoria';
import EditarObjetivo from '@/components/PopUp/editarObjetivo';
import { useRouter } from 'next/navigation';


export default function Categoria( ) {
    const [isMobile, setIsMobile] = useState(false);
    
    useEffect(() => {
        const largura = window.innerWidth;
        setIsMobile(largura <= 1024);
    }, []);

    const router = useRouter();
    const [filtroAtivo, setFiltroAtivo] = useState(1);


    const [jwtToken, setJwtToken] = useState('');

    useEffect(() => {
        const token = localStorage.getItem('token');
        setJwtToken(token ?? '');
    }, []);

    const [carregandoObjetivos, setCarregandoObjetivos] = useState(false);

    const [objetivos, setObjetivos] = useState<Objetivo[] | null>(null);

    const pegarObjetivos = useCallback( async () => {
            setCarregandoObjetivos(true);
            const response = await fetch(
                    'https://api.inevolving.inovasoft.tech/auth/api/objectives/user', 
                {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': 'Bearer ' + jwtToken
                    },
                });
    
            const data: Objetivo[] = await response.json();
            
            if (response.status === 401){
                setCarregandoObjetivos(false);
                router.push('/login');
                alert('Você não está logado, por favor faça login novamente.');
            }
    
            
            setCarregandoObjetivos(false);
            setObjetivos(data);
            setFiltroAtivo(1);
    }, [jwtToken, router]);

    const pegarObjetivosToDo = async () => {
        setObjetivos(null);
        setCarregandoObjetivos(true);
        const response = await fetch(
            'https://api.inevolving.inovasoft.tech/auth/api/objectives/status/todo/user', 
            {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': 'Bearer ' + jwtToken
                },
            });
    
        const data: Objetivo[] = await response.json();
            
        if (response.status === 401){
            setCarregandoObjetivos(false);
            router.push('/login');
            alert('Você não está logado, por favor faça login novamente.');
        }
            
        setCarregandoObjetivos(false);
        setObjetivos(data);
        setFiltroAtivo(2);
    };

    const pegarObjetivosDone = async () => {
        setObjetivos(null);
        setCarregandoObjetivos(true);
        const response = await fetch(
            'https://api.inevolving.inovasoft.tech/auth/api/objectives/status/done/user', 
            {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': 'Bearer ' + jwtToken
                },
            }
        );
    
        const data: Objetivo[] = await response.json();
        
        if (response.status === 401){
            setCarregandoObjetivos(false);
            router.push('/login');
            alert('Você não está logado, por favor faça login novamente.');
        }
    
        // if (!response.ok){
        //     setCarregandoObjetivos(false);
        //     alert('Erro ao puxar objetivos');
        //     return
        // }
            
        setCarregandoObjetivos(false);
        setObjetivos(data);
        setFiltroAtivo(3);
    };


    useEffect(() => {
        if (jwtToken) {
            pegarObjetivos();
        }
    }, [jwtToken, pegarObjetivos]);

    const [popUpObjetivoECategoria, setPopUpObjetivoECategoria] = useState(false);
    const [editarObjetivo, setEditarObjetivo] = useState(false);
    const [objetivoAtual, setObjetivoAtual] = useState<Objetivo | null>(null);

    if (!isMobile) {
        return (
            <>
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
                        <h1>Objetivos</h1>
                        <motion.button className={styles.botaoNovo} whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.8 }} onClick={() => {setPopUpObjetivoECategoria(true)}}>
                            Novo <strong>+</strong>
                        </motion.button>
                    </div>
                    <motion.div className={styles.containerFiltroEBotao}>
                        <motion.div className={styles.filtro}>
                            <h3>
                                Filtrar por:
                            </h3>    
                            <motion.button 
                                className={
                                    filtroAtivo === 1 ? styles.botaoFiltroAtivo : styles.botaoFiltro
                                } 
                                whileHover={{ scale: 1.1 }} 
                                whileTap={{ scale: 0.8 }}
                                onClick={pegarObjetivos}
                            >
                                Todos
                            </motion.button>
                            <motion.button 
                                className={
                                    filtroAtivo === 3 ? styles.botaoFiltroAtivo : styles.botaoFiltro
                                }
                                whileHover={{ scale: 1.1 }} 
                                whileTap={{ scale: 0.8 }}
                                onClick={pegarObjetivosDone}
                            >
                                Concluídos
                            </motion.button>
                            <motion.button 
                                className={
                                    filtroAtivo === 2 ? styles.botaoFiltroAtivo : styles.botaoFiltro
                                } 
                                whileHover={{ scale: 1.1 }} 
                                whileTap={{ scale: 0.8 }}
                                onClick={pegarObjetivosToDo}
                                >
                                Em progresso
                            </motion.button>
                        </motion.div>
                    </motion.div>
                    <motion.div className={styles.containerConteudo}>
                        {carregandoObjetivos && (
                            <ClipLoader size={50} color="#0B0E31" />
                        )}
                        {!carregandoObjetivos && !Array.isArray(objetivos) || !objetivos ? (
                            <h3>
                                Não existe nenhum objetivo cadastrado com o filtro selecionado
                            </h3>
                        ) : (
    
                            Array.isArray(objetivos) && objetivos?.map((objetivo) => (
                                <motion.div
                                    initial={{ opacity: 0, scale: 0 }}
                                    animate={{ opacity: 1, scale: 1 }}
                                    transition={{
                                        duration: 0.4,
                                        scale: { type: "spring", visualDuration: 0.4, bounce: 0.5 },
                                    }} 
                                    whileHover={{ scale: 1.03 }} 
                                    whileTap={{ scale: 0.8 }}
                                    className={styles.objetivo}
                                    key={objetivo.id}
                                    onClick={() => {
                                        setObjetivoAtual(objetivo);
                                        setEditarObjetivo(true);
                                    }}
                                >
                                    <h3>{objetivo.nameObjective}</h3>
                                    <p
                                        className={
                                            objetivo.statusObjective === "DONE" ? styles.ok : styles.p
                                        }
                                        >
                                        {objetivo.statusObjective === "TODO" ? "Em execução" : "Concluído"}
                                    </p>
                                </motion.div>
                                ))
                            )
                        }
                    </motion.div>
                </motion.div>
            </motion.div>
            {popUpObjetivoECategoria && (
                <motion.div
                    initial={{ opacity: 0, scale: 0 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{
                        duration: 0.4,
                        scale: { type: "spring", visualDuration: 0.4, bounce: 0.5 },
                    }} 
                >
                    <AdicionarNovoObjetivoOuCategoria/>
                </motion.div>    
            )}
            {editarObjetivo && objetivoAtual && (
                <EditarObjetivo objetivo={objetivoAtual}/>
            )}
            </>
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
                            <h1>Objetivos</h1>
                            <motion.button className={styles.botaoNovo} whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.8 }} onClick={() => {setPopUpObjetivoECategoria(true)}}>
                                Novo <strong>+</strong>
                            </motion.button>
                        </div>
                        <motion.div className={styles.containerFiltroEBotao}>
                            <motion.div className={styles.filtro}>
                                <h3>
                                    Filtrar por:
                                </h3>    
                                <motion.button 
                                    className={
                                        filtroAtivo === 1 ? styles.botaoFiltroAtivo : styles.botaoFiltro
                                    } 
                                    whileHover={{ scale: 1.1 }} 
                                    whileTap={{ scale: 0.8 }}
                                    onClick={pegarObjetivos}
                                >
                                    Todos
                                </motion.button>
                                <motion.button 
                                    className={
                                        filtroAtivo === 3 ? styles.botaoFiltroAtivo : styles.botaoFiltro
                                    }
                                    whileHover={{ scale: 1.1 }} 
                                    whileTap={{ scale: 0.8 }}
                                    onClick={pegarObjetivosDone}
                                >
                                    Concluídos
                                </motion.button>
                                <motion.button 
                                    className={
                                        filtroAtivo === 2 ? styles.botaoFiltroAtivo : styles.botaoFiltro
                                    } 
                                    whileHover={{ scale: 1.1 }} 
                                    whileTap={{ scale: 0.8 }}
                                    onClick={pegarObjetivosToDo}
                                    >
                                    Em progresso
                                </motion.button>
                            </motion.div>
                        </motion.div>
                        <motion.div className={styles.containerConteudo}>
                            {carregandoObjetivos && (
                                <ClipLoader size={50} color="#0B0E31" />
                            )}
                            {!carregandoObjetivos && !Array.isArray(objetivos) || !objetivos ? (
                                <h3>
                                    Não existe nenhum objetivo cadastrado com o filtro selecionado
                                </h3>
                            ) : (
        
                                Array.isArray(objetivos) && objetivos?.map((objetivo) => (
                                    <motion.div
                                        initial={{ opacity: 0, scale: 0 }}
                                        animate={{ opacity: 1, scale: 1 }}
                                        transition={{
                                            duration: 0.4,
                                            scale: { type: "spring", visualDuration: 0.4, bounce: 0.5 },
                                        }} 
                                        whileHover={{ scale: 1.03 }} 
                                        whileTap={{ scale: 0.8 }}
                                        className={styles.objetivo}
                                        key={objetivo.id}
                                        onClick={() => {
                                            setObjetivoAtual(objetivo);
                                            setEditarObjetivo(true);
                                        }}
                                    >
                                        <h3>{objetivo.nameObjective}</h3>
                                        <p
                                            className={
                                                objetivo.statusObjective === "DONE" ? styles.ok : styles.p
                                            }
                                            >
                                            {objetivo.statusObjective === "TODO" ? "Em execução" : "Concluído"}
                                        </p>
                                    </motion.div>
                                    ))
                                )
                            }
                        </motion.div>
                    </motion.div>
                </motion.div>
                {popUpObjetivoECategoria && (
                    <motion.div
                        initial={{ opacity: 0, scale: 0 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{
                            duration: 0.4,
                            scale: { type: "spring", visualDuration: 0.4, bounce: 0.5 },
                        }} 
                    >
                        <AdicionarNovoObjetivoOuCategoria/>
                    </motion.div>    
                )}
                {editarObjetivo && objetivoAtual && (
                    <EditarObjetivo objetivo={objetivoAtual}/>
                )}
            </div>
        );
    }
}