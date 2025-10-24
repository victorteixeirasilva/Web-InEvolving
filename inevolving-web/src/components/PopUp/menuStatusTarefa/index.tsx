import styles from "./EditarObjetivo.module.scss";
import * as motion from "motion/react-client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Tarefa_Modulo_Tarefas } from "@/components/interfaces/Tarefa_Modulo_Tarefas";
import { linkApi } from "../../../constants";
import { ClipLoader } from "react-spinners";

export default function MenuStatusTarefa( { tarefa, voltar }: { tarefa: Tarefa_Modulo_Tarefas; voltar:() => void } ) {
    const [isMobile, setIsMobile] = useState(false);
    
    useEffect(() => {
        const largura = window.innerWidth;
        setIsMobile(largura <= 1024);
    }, []);


    const [carregando, setCarregando] = useState(false);
    
    const router = useRouter();

    const atualizarTarefaTodo = async () => {
            setCarregando(true);      

            const response = await fetch(
                linkApi+'/auth/api/tasks/status/todo/'+tarefa.id, 
            {
                    method: 'PATCH',
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': 'Bearer ' + localStorage.getItem('token')
                    },
            });
                
            if (response.status === 401){
                setCarregando(false);
                alert('Você não está logado, por favor faça login novamente.');
                router.push('/login');
            }
        
            if (!response.ok){
                setCarregando(false);
                alert('Erro ao atualizar tarefa');
            }
            
            setCarregando(false);
            // window.location.reload();
            voltar();
    }
    
    const atualizarTarefaInProgress = async () => {
            setCarregando(true);      

            
            const response = await fetch(
                linkApi+'/auth/api/tasks/status/progress/'+tarefa.id, 
            {
                    method: 'PATCH',
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': 'Bearer ' + localStorage.getItem('token')
                    },
            });
                
            if (response.status === 401){
                setCarregando(false);
                alert('Você não está logado, por favor faça login novamente.');
                router.push('/login');
            }
        
            if (!response.ok){
                setCarregando(false);
                alert('Erro ao atualizar tarefa');
            }
                
            setCarregando(false);
            // window.location.reload();
            voltar();
    }
    
    const atualizarTarefaDone = async () => {
            setCarregando(true);      

            const response = await fetch(
                linkApi+'/auth/api/tasks/status/done/'+tarefa.id, 
            {
                    method: 'PATCH',
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': 'Bearer ' + localStorage.getItem('token')
                    },
            });
                
            if (response.status === 401){
                setCarregando(false);
                alert('Você não está logado, por favor faça login novamente.');
                router.push('/login');
            }
        
            if (!response.ok){
                setCarregando(false);
                alert('Erro ao atualizar tarefa');
            }
            
            
            setCarregando(false);
            // window.location.reload();
            voltar();
    }
    
    const atualizarTarefaLate = async () => {
            setCarregando(true);      

            const response = await fetch(
                linkApi+'/auth/api/tasks/status/late/'+tarefa.id, 
            {
                    method: 'PATCH',
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': 'Bearer ' + localStorage.getItem('token')
                    },
            });
                
            if (response.status === 401){
                setCarregando(false);
                alert('Você não está logado, por favor faça login novamente.');
                router.push('/login');
            }
        
            if (!response.ok){
                setCarregando(false);
                alert('Erro ao atualizar tarefa');
            }
            
            setCarregando(false);
            // window.location.reload();
            voltar();
    }


    
    
    return (
        <div className={isMobile ? styles.mob : ''}>
        <div className={styles.overlay}>
            <div className={styles.containerPopUp}>
                <div className={styles.conteudo}>
                    <div className={styles.inputs}>
                        <motion.div 
                            className={styles.inputDescrição}
                            // whileHover={{ scale: 1.02 }} 
                            // whileTap={{ scale: 0.95 }} 
                        >
                            <h3>Status da Tarefa</h3>
                            <div className={styles.containerStatus}>
                                <motion.div
                                    className={styles.status}
                                    whileHover={{ scale: 1.1, backgroundColor: '#6b6b6b', color: '#FFF' }} 
                                    whileTap={{ scale: 0.95 }}
                                    onClick={() => {
                                        atualizarTarefaTodo();
                                    }}
                                >
                                    {carregando && <ClipLoader size={10} color="#0B0E31" />}
                                    Não Iniciada
                                </motion.div>
                                <motion.div
                                    className={styles.status}
                                    whileHover={{ scale: 1.1, backgroundColor: '#a0ff47' }} 
                                    whileTap={{ scale: 0.95 }}
                                    onClick={() => {
                                        atualizarTarefaInProgress();
                                    }}
                                >
                                    {carregando && <ClipLoader size={10} color="#0B0E31" />}
                                    Em Progresso
                                </motion.div>
                                <motion.div
                                    className={styles.status}
                                    whileHover={{ scale: 1.1, backgroundColor: '#ffbf00' }} 
                                    whileTap={{ scale: 0.95 }}
                                    onClick={() => {
                                        atualizarTarefaLate();
                                    }}
                                >
                                    {carregando && <ClipLoader size={10} color="#0B0E31" />}
                                    Atrasada
                                </motion.div>
                                <motion.div 
                                    className={styles.status}
                                    whileHover={{ scale: 1.1, backgroundColor: '#319f43', color: '#FFF' }} 
                                    whileTap={{ scale: 0.95 }}
                                    onClick={() => {
                                        atualizarTarefaDone();
                                    }}
                                >
                                    {carregando && <ClipLoader size={10} color="#0B0E31" />}
                                    Concluída
                                </motion.div>
                                {/* <motion.div 
                                    style={statusDaTarefa === "CANCELLED" ? { backgroundColor: '#ff0004', color: '#FFF' } : { backgroundColor: '#F4F4FE', color: '#0B0E31'}} 
                                    className={styles.status}
                                    whileHover={{ scale: 1.1, backgroundColor: '#ff0004', color: '#FFF' }} 
                                    whileTap={{ scale: 0.95 }}
                                    onClick={() => {
                                        setStatusDaTarefa("CANCELLED");
                                        setAbrirInputMotivoDoCancelamento(true);
                                    }}
                                >
                                    {carregando && <ClipLoader size={10} color="#0B0E31" />}
                                    Cancelada
                                </motion.div> */}
                            </div>
                        </motion.div>
                    </div>
                </div>
            </div>
        </div>
        </div>
    );

}