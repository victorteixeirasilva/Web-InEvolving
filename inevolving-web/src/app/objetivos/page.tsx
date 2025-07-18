'use client';

import { useEffect, useState } from 'react';
import Menu from "@/components/Menu";
import styles from './page.module.scss';
import * as motion from "motion/react-client";
import { Objetivo } from '@/components/interfaces/Objetivo';
import { ClipLoader } from 'react-spinners';
import AdicionarNovoObjetivoOuCategoria from '@/components/PopUp/adicionarNovoObjetivoOuCategoria';


export default function Categoria( ) {
    const [filtroAtivo, setFiltroAtivo] = useState(1);


    const [jwtToken, setJwtToken] = useState('');

    useEffect(() => {
        const token = localStorage.getItem('token');
        setJwtToken(token ?? '');
    }, []);

    const [carregandoObjetivos, setCarregandoObjetivos] = useState(false);

    const [objetivos, setObjetivos] = useState<Objetivo[] | null>(null);

    const pegarObjetivos = async () => {
            setCarregandoObjetivos(true);
            const response = await fetch(
                    'http://127.0.0.1:2327/auth/api/objectives/user', 
                {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': 'Bearer ' + jwtToken
                    },
                });
    
            const data: Objetivo[] = await response.json();
            
    
            if (!response.ok){
                setCarregandoObjetivos(false);
                alert('Erro ao puxar objetivos');
                console.error('Erro ao puxar objetivoss');
            }
            
            setCarregandoObjetivos(false);
            setObjetivos(data);
            setFiltroAtivo(1);
    };

    const pegarObjetivosToDo = async () => {
        setCarregandoObjetivos(true);
        const response = await fetch(
            'http://127.0.0.1:2327/auth/api/objectives/status/todo/user', 
            {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': 'Bearer ' + jwtToken
                },
            });
    
        const data: Objetivo[] = await response.json();
            
    
        if (!response.ok){
            setCarregandoObjetivos(false);
            alert('Erro ao puxar objetivos');
            console.error('Erro ao puxar objetivoss');
        }
            
        setCarregandoObjetivos(false);
        setObjetivos(data);
        setFiltroAtivo(2);
    };

    const pegarObjetivosDone = async () => {
        setCarregandoObjetivos(true);
        const response = await fetch(
            'http://127.0.0.1:2327/auth/api/objectives/status/done/user', 
            {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': 'Bearer ' + jwtToken
                },
            });
    
        const data: Objetivo[] = await response.json();
            
    
        if (!response.ok){
            setCarregandoObjetivos(false);
            alert('Erro ao puxar objetivos');
            console.error('Erro ao puxar objetivoss');
        }
            
        setCarregandoObjetivos(false);
        setObjetivos(data);
        setFiltroAtivo(3);
    };


    useEffect(() => {
        if (jwtToken) {
            pegarObjetivos();
        }
    }, [jwtToken]);

    const [popUpObjetivoECategoria, setPopUpObjetivoECategoria] = useState(false);

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
                                filtroAtivo === 2 ? styles.botaoFiltroAtivo : styles.botaoFiltro
                            }
                            whileHover={{ scale: 1.1 }} 
                            whileTap={{ scale: 0.8 }}
                            onClick={pegarObjetivosDone}
                            >
                            Concluídos
                        </motion.button>
                        <motion.button 
                            className={
                                filtroAtivo === 3 ? styles.botaoFiltroAtivo : styles.botaoFiltro
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
                    {!carregandoObjetivos && objetivos?.map((objetivo) => (
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
                    ))}
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
        </>
    );
}