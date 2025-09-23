import { Tarefa_Modulo_Tarefas } from "../interfaces/Tarefa_Modulo_Tarefas";
import * as motion from "motion/react-client";
import styles from './tarefas.module.scss';
import { useState } from "react";
import EditarTarefa from "../PopUp/editarTarefa";

export default function ListarTarefas( { tarefas, voltar }:{ tarefas:Tarefa_Modulo_Tarefas[], voltar:() => void } ) {
    
    const [tarefaAtual, setTarefaAual] = useState<Tarefa_Modulo_Tarefas | null>(null);
    const [editarTarefaAtual, setEditarTarefaAtual] = useState(false);
    
    
    return (
        <>        
            {tarefas.map((tarefa) => (
                <motion.div
                    onClick={() => {
                        if (tarefa.blockedByObjective === null) {
                            setTarefaAual(tarefa);
                            setEditarTarefaAtual(true);
                        } else if (tarefa.blockedByObjective === true) {
                            alert("Tarefa com objetivo já concluído não é possível fazer alteração");
                        } else {
                            setTarefaAual(tarefa);
                            setEditarTarefaAtual(true);
                        }
                    }}  
                    initial={{ opacity: 0, scale: 0 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{
                        duration: 0.4,
                        scale: { type: "spring", visualDuration: 0.4, bounce: 0.5 },
                    }} 
                    whileHover={
                        tarefa.blockedByObjective === null ? { scale: 1.03 } :
                        tarefa.blockedByObjective === true ? {} : { scale: 1.03 }
                    } 
                    whileTap={
                        tarefa.blockedByObjective === null ? { scale: 0.8 } :
                        tarefa.blockedByObjective === true ? {} : { scale: 0.8 }
                    } 
                    key={tarefa.id} 
                    className={ 
                        tarefa.blockedByObjective === null ? styles.tarefa :
                        tarefa.blockedByObjective === true ? styles.tarefaBloqueada : styles.tarefa
                    }
                >
                    {tarefa?.nameTask}
                    <p style={
                            tarefa?.status === "DONE" ? { color: '#319f43' } :
                            tarefa?.status === "IN PROGRESS" ? { color: '#a0ff47' } :
                            tarefa?.status === "TODO" ? { color: '#6b6b6b' } :
                            tarefa?.status === "CANCELLED" ? { color: '#ff0004' } :
                            tarefa?.status === "LATE" ? { color: '#ffbf00' } : {}
                        }
                    >
                    {
                        tarefa?.status === "DONE" ? "Concluída" :
                        tarefa?.status === "IN PROGRESS" ? "Em Progresso" :
                        tarefa?.status === "TODO" ? "Não Iniciada" :
                        tarefa?.status === "CANCELLED" ? "Cancelada" :
                        tarefa?.status === "LATE" ? "Atrasada" : "Status Desconhecido"
                    }
                    </p>
                </motion.div>
            ))}
            {editarTarefaAtual && tarefaAtual &&(
                <EditarTarefa tarefa={tarefaAtual} voltar={voltar}/>
            )}
        </>
    );
}