import Image from "next/image";
import  styles  from "./menuResumo.module.scss"
import { Calendar, CalendarProps } from 'react-calendar';
import { useEffect, useState } from 'react';
import 'react-calendar/dist/Calendar.css'; // opcional, se quiser base
import { motion } from "motion/react";
import { ClipLoader } from 'react-spinners';
import IconeStatus from "../IconeStatus";
import { Tarefa } from "../interfaces/Tarefa";
import { useRouter } from "next/navigation";
import EditarTarefa from "../PopUp/editarTarefa";


export default function MenuResumo() {
    const router = useRouter();
    const [selectedDate, setSelectedDate] = useState<Date | null>(new Date);
    const [carregandoTarefas, setCarregandoTarefas] = useState(false);
    const [limiteTarefas, setLimiteTarefas] = useState(3);

    useEffect(() => {
        const atualizarLimite = () => {
            const altura = window.innerHeight;
            
            if (altura < 800) {
                setLimiteTarefas(3);
            } else {
                setLimiteTarefas(6);
            }
        };

        atualizarLimite(); // define ao carregar
        window.addEventListener('resize', atualizarLimite); // atualiza ao redimensionar

        return () => window.removeEventListener('resize', atualizarLimite);
    }, []);

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
    
    const [tarefaAtual, setTarefaAtual] = useState<Tarefa | null>(null);
    const [tarefasData, setTarefasData] = useState<Tarefa[] | null>(null);
    const [verTarefas, setVerTarefas] = useState(false);
    const [editarTarefa, setEditarTarefa] = useState(false);
    
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
            <div className={styles.containerTarefasDoDia}>
                {carregandoTarefas && (
                    <ClipLoader size={35} color="#0B0E31" />
                )}
                {!carregandoTarefas && verTarefas && tarefasData && tarefasData.length !== 0 && tarefasData?.slice(0, limiteTarefas).map((tarefa) => (
                    <motion.div 
                    key={tarefa.id}
                        className={styles.tarefa}
                        initial={{ opacity: 0, scale: 0 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{
                            duration: 0.4,
                            scale: { type: "spring", visualDuration: 0.4, bounce: 0.5 },
                        }} 
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.8 }}
                        onClick={() => {
                            setTarefaAtual(tarefa);
                            setEditarTarefa(true);
                        }} 
                    >
                        <Image
                            className={styles.icone} 
                            src="/iconeTarefasAzul.svg"
                            alt="Icone da Tarefa"
                            width={16}
                            height={20}
                            />
                        <p>{tarefa.nameTask}</p>
                        <IconeStatus status={tarefa.status}/>
                    </motion.div>
                ))}
                {!carregandoTarefas && !verTarefas && (
                    <motion.div 
                    className={styles.alerta}
                    initial={{ opacity: 0, scale: 0 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{
                            duration: 0.4,
                            scale: { type: "spring", visualDuration: 0.4, bounce: 0.5 },
                        }} 
                        >
                        <Image
                            src="/iconeAlerta.svg"
                            alt="Icone Alerta"
                            width={100}
                            height={100}
                            />
                        <h3>Nenhuma tarefa para o dia selecionado!</h3>
                    </motion.div>
                )}
                {verTarefas && (
                    <div className={styles.verTarefas}>
                        <motion.button 
                            initial={{ opacity: 0, scale: 0 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{
                                duration: 0.4,
                                scale: { type: "spring", visualDuration: 0.4, bounce: 0.5 },
                            }} 
                            whileHover={{ scale: 1.1 }}
                            whileTap={{ scale: 0.8 }}
                            className={styles.botao}
                            onClick={() => {router.push("/tarefas")}} 
                            >
                            Ver tarefas
                            <Image 
                                src="/iconeSetaDireita.svg"
                                alt="seta para direita"
                                width={6}
                                height={10}
                                className={styles.seta}
                            />    
                        </motion.button>
                    </div>
                )}
            </div>
        </motion.div>
        {editarTarefa && tarefaAtual &&(
            <EditarTarefa tarefa={tarefaAtual} />
        )}
        </>
    );

}