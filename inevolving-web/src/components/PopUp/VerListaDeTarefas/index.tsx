import styles from "./EditarObjetivo.module.scss";
import * as motion from "motion/react-client";
import { useCallback, useEffect, useState } from "react";
import { ClipLoader } from "react-spinners";
import { Tarefa_Modulo_Tarefas } from "@/components/interfaces/Tarefa_Modulo_Tarefas";


export default function VerListaDeTarefas( { voltar, objetivoId }: { voltar:() => void, objetivoId:string } ) {
    
    const [isMobile, setIsMobile] = useState(false);
    const [tarefas, setTarefas] = useState<Tarefa_Modulo_Tarefas[]>([]);
    
    useEffect(() => {
        const largura = window.innerWidth;
        setIsMobile(largura <= 1024);
    }, []);

    const [carregando, setCarregando] = useState(false);

    const handlePegarTarefas = useCallback(async () => {
        setCarregando(true);

        const response = await fetch(
            'https://api.inevolving.inovasoft.tech/auth/api/tasks/objective/' + objetivoId, 
        {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': 'Bearer ' + localStorage.getItem('token')
                },
        });

        if (!response.ok){
            setCarregando(false);
            alert('Erro ao solicitar Tarefas do Objetivo');
            return;
        }

        if (response.ok) {
            const data:Tarefa_Modulo_Tarefas[] = await response.json();
            setTarefas(data);
            setCarregando(false);
        }

    }, [objetivoId]);

    useEffect(() => {
        handlePegarTarefas();
    }, [handlePegarTarefas]);

    return (
        <div className={isMobile ? styles.mob : ''}>
            <div className={styles.overlay}>
                <div className={styles.containerPopUp}>
                    <div className={styles.botoesTopo}>
                        <motion.button
                            whileHover={{ scale: 1.1 }} 
                            whileTap={{ scale: 0.8 }}
                            className={styles.botaoVoltar} 
                            onClick={voltar}
                        >
                            <strong>X</strong>
                        </motion.button>
                    </div>
                    <h2>Essas são as tarefas do seu objetivo!</h2>
                    <div className={styles.conteudo}>
                        {carregando && <ClipLoader size={60} color="#0B0E31" />}
                        {!carregando && tarefas.length === 0 && (
                            <p className={styles.semTarefas}>Nenhuma tarefa encontrada para este objetivo.</p>
                        )}
                        {!carregando && tarefas.length > 0 && (
                            <ol className={styles.listaTarefas}>
                                {tarefas
                                    .slice().sort((a, b) => new Date(b.dateTask).getTime() - new Date(a.dateTask).getTime()).reverse() // ordena da mais recente para a mais antiga
                                    .map((tarefa) => (
                                    <li key={tarefa.id} className={styles.tarefaItem}>
                                        <h3>{tarefa.nameTask}</h3>
                                        <p>{tarefa.descriptionTask}</p>
                                        <p>
                                            {new Date(tarefa.dateTask).toLocaleDateString('pt-BR')}
                                        </p>
                                    </li>
                                ))}
                            </ol>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );

    // if (!isMobile) {
    //     return (
    //         <>
    //         <div className={styles.overlay}>
    //             <div className={styles.containerPopUp}>
    //                 <div className={styles.botoesTopo}>
    //                     <motion.button
    //                         whileHover={{ scale: 1.1 }} 
    //                         whileTap={{ scale: 0.8 }}
    //                         className={styles.botaoVoltar} 
    //                         onClick={voltar}
    //                     >
    //                         <strong>X</strong>
    //                     </motion.button>
    //                 </div>
    //                 <h2>Essas são as tarefas do seu objetivo!</h2>
    //                 <div className={styles.conteudo}>
    //                     {carregando && <ClipLoader size={60} color="#0B0E31" />}
    //                     {!carregando && tarefas.length === 0 && (
    //                         <p className={styles.semTarefas}>Nenhuma tarefa encontrada para este objetivo.</p>
    //                     )}
    //                     {!carregando && tarefas.length > 0 && (
    //                         <ol className={styles.listaTarefas}>
    //                             {tarefas
    //                                 .slice().sort((a, b) => new Date(b.dateTask).getTime() - new Date(a.dateTask).getTime()).reverse() // ordena da mais recente para a mais antiga
    //                                 .map((tarefa) => (
    //                                 <li key={tarefa.id} className={styles.tarefaItem}>
    //                                     <h3>{tarefa.nameTask}</h3>
    //                                     <p>{tarefa.descriptionTask}</p>
    //                                     <p>
    //                                         {new Date(tarefa.dateTask).toLocaleDateString('pt-BR')}
    //                                     </p>
    //                                 </li>
    //                             ))}
    //                         </ol>
    //                     )}
    //                 </div>
    //             </div>
    //         </div>
    //         </>
    //     );
    // } else {
    // }
}