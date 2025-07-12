import Image from "next/image";
import styles from "./menu.module.scss";
import { usePathname } from "next/navigation";
import { Calendar, CalendarProps } from 'react-calendar';
import { useEffect, useState } from 'react';
import 'react-calendar/dist/Calendar.css'; // opcional, se quiser base
import { motion } from "motion/react";
import { ClipLoader } from 'react-spinners';

export interface Tarefa {
    id: string,
    nameTask: string,
    descriptionTask: string,
    status: string,
    dateTask: string,
    idObjective: string,
    idUser: string,
    idParentTask: string,
    idOriginalTask: string,
    hasSubtasks: boolean,
    blockedByObjective: boolean,
    isCopy: boolean,
    cancellationReason: string
}


export default function Menu() {
    const pathname = usePathname();
    const isActiveDashboard = pathname === '/dashboard';
    const isActiveObjetivos = pathname === '/objetivos';
    const isActiveTarefas = pathname === '/tarefas';
    const isActiveFinancas = pathname === '/financas';
    const isActiveLivros = pathname === '/livros';
    const isActiveMotivacao = pathname === '/motivacao';
    const isActiveAjustes = pathname === '/ajustes';
    const isActiveAjuda = pathname === '/ajuda';
    const [selectedDate, setSelectedDate] = useState<Date | null>(new Date);
    const [carregandoTarefas, setCarregandoTarefas] = useState(false);

    
    const handleDateChange : CalendarProps['onChange'] = (value) => {
        if (value instanceof Date) {
            setSelectedDate(value);
            pegarTarefasDoDia();
            // Desenvolver busca de tarefas
        } else if (Array.isArray(value) && value[0] instanceof Date) {
            setSelectedDate(value[0]); // ou outro tratamento para intervalo
        }
    };

    const [jwtToken, setJwtToken] = useState('');

    useEffect(() => {
        const token = localStorage.getItem('token');
        setJwtToken(token ?? '');
    }, []);
    
    const [tarefasData, setTarefasData] = useState<Tarefa[] | null>(null);
    const [verTarefas, setVerTarefas] = useState(false);
    
    useEffect(() => {
        if (selectedDate && jwtToken) {
            pegarTarefasDoDia();
        }
    }, [selectedDate, jwtToken]);
    
    const pegarTarefasDoDia = async () => {
            if (!selectedDate) return;
            setCarregandoTarefas(true);
            const dateFormatted = selectedDate?.toISOString().split('T')[0];
            const response = await fetch(
                    'http://127.0.0.1:2327/auth/api/tasks/' + dateFormatted, 
                {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': 'Bearer ' + jwtToken
                    },
                });
    
            const data: Tarefa[] = await response.json();
                
            if (!response.ok){
                setVerTarefas(false);
                setCarregandoTarefas(false);
                return;
            }
            
            setCarregandoTarefas(false);
            setVerTarefas(true);
            setTarefasData(data);
    };


    return (
        <>
        <motion.div 
            className={styles.linha}></motion.div>
        <motion.div 
            initial={{ opacity: 0, scale: 0 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{
                duration: 0.4,
                scale: { type: "spring", visualDuration: 0.4, bounce: 0.5 },
            }}
            className={styles.container}>
            <div className={styles.titulo}>
                <Image 
                    src="/logo/logo-inovasoft-menu.svg"
                    alt="Logo InEvolving"
                    width={40}
                    height={40}
                    className={styles.logo}
                />
                <h2>
                    InEvolving
                </h2>
            </div>            
            <nav className={styles.esp}>
                <div className={styles.nav}>
                    <Image 
                        src="/iconeDashboard.svg"
                        alt="Logo Dashboard"
                        width={27}
                        height={27}
                    />
                    <a href="/dashboard">
                        Dashboard
                        <div className={styles.marcador}></div>
                        {isActiveDashboard && <div className={styles.ativo}></div>}
                    </a>
                </div>
                <div className={styles.nav}>
                    <Image 
                        src="/iconeObjetivos.svg"
                        alt="Logo Objetivos"
                        width={27}
                        height={27}
                    />
                    <a href="/objetivos">
                        Objetivos
                        <div className={styles.marcador}></div>
                        {isActiveObjetivos && <div className={styles.ativo}></div>}
                    </a>
                </div>
                <div className={styles.nav}>
                    <Image 
                        src="/iconeTarefas.svg"
                        alt="Logo Tarefas"
                        width={27}
                        height={27}
                    />
                    <a href="/tarefas">
                        Tarefas
                        <div className={styles.marcador}></div>
                        {isActiveTarefas && <div className={styles.ativo}></div>}
                    </a>
                </div>
                <div className={styles.nav}>
                    <Image 
                        src="/iconeFinanças.svg"
                        alt="Logo Finanças"
                        width={27}
                        height={27}
                    />
                    <a href="/financas">
                        Finanças
                        <div className={styles.marcador}></div>
                        {isActiveFinancas && <div className={styles.ativo}></div>}
                    </a>
                </div>
                <div className={styles.nav}>
                    <Image 
                        src="/iconeLivros.svg"
                        alt="Logo Livros"
                        width={27}
                        height={27}
                    />
                    <a href="/livros">
                        Livros
                        <div className={styles.marcador}></div>
                        {isActiveLivros && <div className={styles.ativo}></div>}
                    </a>
                </div>
                    <div className={styles.nav}>
                    <Image 
                        src="/iconeMot.svg"
                        alt="Logo Motivação"
                        width={27}
                        height={27}
                    />
                    <a href="/motivacao">
                        Motivação
                        <div className={styles.marcador}></div>
                        {isActiveMotivacao && <div className={styles.ativo}></div>}
                    </a>
                </div>
            <div className={styles.ajuste}>
                <div className={styles.nav}>
                    <Image 
                        src="/iconeAjustes.svg"
                        alt="Logo Ajustes"
                        width={27}
                        height={27}
                    />
                    <a href="/ajustes">
                        Ajustes
                        <div className={styles.marcador}></div>
                        {isActiveAjustes && <div className={styles.ativo}></div>}
                    </a>
                </div>
                <div className={styles.nav}>
                    <Image 
                        src="/iconeAjuda.svg"
                        alt="Logo Ajuda"
                        width={27}
                        height={27}
                    />
                    <a href="/ajuda">
                        Ajuda
                        <div className={styles.marcador}></div>
                        {isActiveAjuda && <div className={styles.ativo}></div>}
                    </a>
                </div>
            </div>
            </nav>
        </motion.div>
        <motion.div
            initial={{ opacity: 0, scale: 0 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{
                    duration: 0.4,
                    scale: { type: "spring", visualDuration: 0.4, bounce: 0.5 },
            }} 
            className={styles.containerMenuResumo}>
            <Calendar
                className={styles.calendar}
                selectRange={false}
                onChange={handleDateChange}
                value={selectedDate}
            />
            <h2>Tarefas do Dia</h2>
            <div>
                {carregandoTarefas && (
                    <ClipLoader size={35} color="#0B0E31" />
                )}
                {!carregandoTarefas && verTarefas && tarefasData && tarefasData.length !== 0 && tarefasData?.slice(0, 3).map((tarefa) => (
                    <motion.div 
                        key={tarefa.id}
                        className={styles.tarefa}
                        initial={{ opacity: 0, scale: 0 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{
                            duration: 0.4,
                            scale: { type: "spring", visualDuration: 0.4, bounce: 0.5 },
                        }} 
                    >
                        <p>{tarefa.nameTask}</p>
                        <p>{tarefa.status}</p>
                    </motion.div>
                ))}
                {!carregandoTarefas && !verTarefas && (
                    <motion.div 
                        className={styles.tarefa}
                        initial={{ opacity: 0, scale: 0 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{
                            duration: 0.4,
                            scale: { type: "spring", visualDuration: 0.4, bounce: 0.5 },
                        }} 
                    >
                        <h3>Nenhuma tarefa para o dia selecionado!</h3>
                    </motion.div>
                )}
            </div>
        </motion.div>
        </>
    );
}
