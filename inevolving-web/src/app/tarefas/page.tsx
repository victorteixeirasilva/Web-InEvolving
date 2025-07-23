'use client';

import { useEffect, useState } from 'react';
import Menu from "@/components/Menu";
import styles from './page.module.scss';
import Image from "next/image";
import * as motion from "motion/react-client";
import { ClipLoader } from 'react-spinners';
import { Tarefa_Modulo_Tarefas } from '@/components/interfaces/Tarefa_Modulo_Tarefas';
import { Calendar, CalendarProps } from 'react-calendar';

export default function Tarefas( ) {
    const [jwtToken, setJwtToken] = useState('');

    useEffect(() => {
        const token = localStorage.getItem('token');
        setJwtToken(token ?? '');
    }, []);

    const [filtroAtivo, setFiltroAtivo] = useState(1);
    const [carregando, setCarregando] = useState(false);
    const [tarefasOutraData, setTarefasOutraData] = useState<Tarefa_Modulo_Tarefas[] | null>(null);


    const [selectedDate, setSelectedDate] = useState<Date | null>(new Date);

    const [escolherOutraData, setEscolherOutraData] = useState(false);

    const handleDateChange : CalendarProps['onChange'] = (value) => {
        if (value instanceof Date) {
            setSelectedDate(value);
        } else if (Array.isArray(value) && value[0] instanceof Date) {
            setSelectedDate(value[0]); // ou outro tratamento para intervalo
        }
    };

    const filtrarPorData = async (data:string) => {
        setFiltroAtivo(4);
        setCarregando(true);

        const response = await fetch(
            'http://127.0.0.1:2327/auth/api/tasks/'+ data, 
            {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': 'Bearer ' + jwtToken
                },
            }
        );

        const json: Tarefa_Modulo_Tarefas[] = await response.json();

        if (!response.ok){
            setCarregando(false);
            alert('Erro ao tarefas, data: ' + data);
        }
        
        setTarefasOutraData(json);
        setCarregando(false);

    }

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
                    <h1>Tarefas</h1>
                    <motion.button 
                        className={styles.botaoNovo} 
                        whileHover={{ scale: 1.1 }} 
                        whileTap={{ scale: 0.8 }} 
                        onClick={() => alert("Criar nova ctarefa")}
                        >
                        Adicionar Novo <strong>+</strong>
                    </motion.button>
                </div>
                <motion.div className={styles.containerFiltroEBotao}>
                    <motion.div className={styles.filtro}>
                        <h3>
                            Filtrar:
                        </h3>    
                        <motion.button 
                            className={
                                filtroAtivo === 1 ? styles.botaoFiltroAtivo : styles.botaoFiltro
                            } 
                            whileHover={{ scale: 1.1 }} 
                            whileTap={{ scale: 0.8 }}
                            >
                            Hoje
                        </motion.button>
                        <motion.button 
                            className={
                                filtroAtivo === 2 ? styles.botaoFiltroAtivo : styles.botaoFiltro
                            }
                            whileHover={{ scale: 1.1 }} 
                            whileTap={{ scale: 0.8 }}
                            >
                            Mês
                        </motion.button>
                        <motion.button 
                            className={
                                filtroAtivo === 3 ? styles.botaoFiltroAtivo : styles.botaoFiltro
                            } 
                            whileHover={{ scale: 1.1 }} 
                            whileTap={{ scale: 0.8 }}
                            >
                            Ano
                        </motion.button>
                        <motion.button 
                            className={
                                filtroAtivo === 4 ? styles.botaoFiltroAtivo : styles.botaoFiltro
                            } 
                            whileHover={{ scale: 1.1 }} 
                            whileTap={{ scale: 0.8 }}
                            onClick={() => setEscolherOutraData(true)}
                            >
                            Outra Data
                        </motion.button>
                        <motion.button 
                            className={
                                filtroAtivo === 5 ? styles.botaoFiltroAtivo : styles.botaoFiltro
                            } 
                            whileHover={{ scale: 1.1 }} 
                            whileTap={{ scale: 0.8 }}
                            >
                            Tarefas em Atraso
                        </motion.button>
                    </motion.div>
                </motion.div>
                <motion.div className={styles.containerConteudo}>
                    {carregando && (
                        <ClipLoader size={50} color="#0B0E31" />
                    )}
                    {!carregando && tarefasOutraData && tarefasOutraData.length > 0 && filtroAtivo === 4 && (
                        tarefasOutraData.map((tarefa) => (
                            <motion.div key={tarefa.id} className={styles.tarefa}>
                                {tarefa?.nameTask}
                            </motion.div>
                        ))
                    )}
                </motion.div>
            </motion.div>
        </motion.div>
        {escolherOutraData && (
            <div className={styles.overlay}>
                <div className={styles.containerPopUp}>
                    <div className={styles.botoesTopo}>
                        <motion.button
                            whileHover={{ scale: 1.1 }} 
                            whileTap={{ scale: 0.8 }}
                            className={styles.botaoVoltar} 
                            onClick={() => setEscolherOutraData(false)}
                        >
                            <strong>X</strong>
                        </motion.button>
                    </div>
                    <Calendar
                        className={styles.calendar}
                        selectRange={false}
                        onChange={handleDateChange}
                        value={selectedDate}
                    />
                    <div className={styles.conteudo}>
                        <motion.button
                        whileHover={{ scale: 1.1 }} 
                        whileTap={{ scale: 0.8 }}
                        onClick={() => {
                            filtrarPorData(selectedDate?.toISOString().split('T')[0] || '');
                            setEscolherOutraData(false);
                        }}
                    >
                        {carregando && <ClipLoader size={10} color="#0B0E31" />}
                        <span 
                            style={{ 
                                marginLeft: carregando ? '8px' : '0'
                            }}
                        ></span>
                        Buscar
                        <Image 
                            className={styles.concluido}
                            src="/checkIcon.svg"
                            alt="Icone Check"
                            width={23}
                            height={18}
                        />
                    </motion.button>
                    </div>
                </div>
            </div>
        )}
        </>
    );
}