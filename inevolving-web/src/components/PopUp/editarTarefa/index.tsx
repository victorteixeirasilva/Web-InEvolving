import Image from "next/image";
import styles from "./EditarObjetivo.module.scss";
import * as motion from "motion/react-client";
import { useEffect, useState } from "react";
import { ClipLoader } from 'react-spinners';
import { useRouter } from "next/navigation";
import { Tarefa_Modulo_Tarefas } from "@/components/interfaces/Tarefa_Modulo_Tarefas";
import { Objetivo } from '@/components/interfaces/Objetivo';


export default function EditarTarefa( { tarefa }: { tarefa: Tarefa_Modulo_Tarefas } ) {

    const [nomeTarefa, setNomeTarefa] = useState(tarefa.nameTask);
    const [descricaoObjetivo, setDescricaoObjetivo] = useState(tarefa.descriptionTask);
    const [carregando, setCarregando] = useState(false);
    const [jwtToken, setJwtToken] = useState('');
    const [statusDaTarefa, setStatusDaTarefa] = useState(tarefa.status);
    const [verListaDeObjetivos, setVerListaDeObjetivos] = useState(false);

    useEffect(() => {
        const token = localStorage.getItem('token');
        setJwtToken(token || '');
    }, []);
    
    const deletarTarefa = async () => {
            setCarregando(true);
            const response = await fetch(
                    'http://127.0.0.1:2327/auth/api/tasks/'+tarefa?.id, 
                {
                    method: 'DELETE',
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': 'Bearer ' + jwtToken
                    },
                });
    
            
            if (!response.ok){
                setCarregando(false);
                alert('Erro ao deletar a tarefa');
            }
            
            setCarregando(false);
            window.location.reload();
    };

    const router = useRouter();

    const [objetivos, setObjetivos] = useState<Objetivo[] | null>(null);    

    const pegarObjetivos = async () => {
                setCarregando(true);
                const response = await fetch(
                        'http://127.0.0.1:2327/auth/api/objectives/user', 
                    {
                        method: 'GET',
                        headers: {
                            'Content-Type': 'application/json',
                            'Authorization': 'Bearer ' + localStorage.getItem('token')
                        },
                    });
        
                const data: Objetivo[] = await response.json();
                
                if (response.status === 401){
                   setCarregando(false);
                    alert('Você não está logado, por favor faça login novamente.');
                    router.push('/login');
                }
        
                if (!response.ok){
                    setCarregando(false);
                    alert('Erro ao puxar objetivos');
                }
                
                setCarregando(false);
                setObjetivos(data);
    };


    const [objetivoSelecionado, setObjetivoSelecionado] = useState<Objetivo | null>();

    const pegarObjetivo = async () => {
            setCarregando(true);

            const response = await fetch(
                    'http://127.0.0.1:2327/auth/api/objectives/'+tarefa.idObjective, 
                {
                        method: 'GET',
                        headers: {
                            'Content-Type': 'application/json',
                            'Authorization': 'Bearer ' + localStorage.getItem('token')
                        },
                });
        
            const data: Objetivo = await response.json();
                
            if (response.status === 401){
                setCarregando(false);
                alert('Você não está logado, por favor faça login novamente.');
                router.push('/login');
            }
        
            if (!response.ok){
                setCarregando(false);
                alert('Erro ao puxar objetivos');
            }
                
            setCarregando(false);
            setObjetivoSelecionado(data);
    };

    useEffect(() => {
        pegarObjetivo();
    }, []);

    const [verPopUpConfirmacao, setVerPopUpConfirmacao] = useState(false);

    return (
        <>
        <div className={styles.overlay}>
            <div className={styles.containerPopUp}>
                <div className={styles.botoesTopo}>
                    <motion.button
                        whileHover={{ scale: 1.1 }} 
                        whileTap={{ scale: 0.8 }}
                        className={styles.botaoVoltar} 
                        onClick={() => window.location.reload()}
                    >
                        <strong>X</strong>
                    </motion.button>
                    <motion.button
                        whileHover={{ scale: 1.2 }} 
                        whileTap={{ scale: 0.8 }}
                        className={styles.lixeira}
                        onClick={() => {
                                if (confirm('Tem certeza que deseja excluir esta tarefa?')) {
                                    deletarTarefa();
                                }}}
                    >
                        <Image 
                            src="/lixeiraIcon.svg"
                            alt="Icone Lixeira"
                            width={27}
                            height={29}
                        />
                    </motion.button>
                </div>
                <div className={styles.conteudo}>
                    <Image 
                        src="/iconeObjetivo-NovoObjetivo.svg"
                        alt="Icone Objetivo"
                        width={72}
                        height={72}
                        className={styles.icone}
                    />
                    <h2>Editar Tarefa</h2>
                    <div className={styles.inputs}>
                        <div className={styles.inputObjetivo}>
                            <h3>Tarefa</h3>
                            <div className={styles.input}>
                                <input
                                    type="text"
                                    id="nomeTarefa"
                                    value={nomeTarefa}
                                    onChange={(e) => setNomeTarefa(e.target.value)}
                                    placeholder={tarefa ? tarefa.nameTask : "Digite o nome da tarefa..."}
                                />
                                <Image 
                                    className={styles.lapis}
                                    src="/iconeLapisCinza.svg"
                                    alt="Icone Lapis"
                                    width={15}
                                    height={15}
                                    />
                            </div>
                            </div>
                        <div className={styles.inputDescrição}>
                            <h3>Descrição</h3>
                            <div className={styles.input}>
                                <input 
                                    type="text"
                                    id="descricaoObjetivo"
                                    value={descricaoObjetivo}
                                    onChange={(e) => setDescricaoObjetivo(e.target.value)}
                                    placeholder={tarefa ? tarefa.descriptionTask : "Escreva detalhes sobre a sua tarefa..."}
                                />
                                <Image
                                    className={styles.lapis} 
                                    src="/iconeLapisCinza.svg"
                                    alt="Icone Lapis"
                                    width={15}
                                    height={15}
                                    />
                            </div>
                        </div>
                        <motion.div
                            whileHover={{ scale: 1.02 }} 
                            whileTap={{ scale: 0.95 }}   
                            onClick={() => {
                                    setVerListaDeObjetivos(true);
                                    pegarObjetivos();
                            }}     
                        >
                            <h3>Selecionar Objetivo Relacionado</h3>
                            <div className={styles.input}>
                                <p 
                                    className={styles.place}
                                    style={{ 
                                        color: objetivoSelecionado ? '#0B0E31' : '#999999'
                                    }}
                                >
                                    {objetivoSelecionado ? objetivoSelecionado.nameObjective : "Selecione o objetivo a ser relacionado..."}
                                </p>
                                <Image
                                    className={styles.lapis} 
                                    src="/iconeLapisCinza.svg"
                                    alt="Icone Lapis"
                                    width={15}
                                    height={15}
                                />
                            </div>
                        </motion.div>
                        <motion.div 
                            className={styles.inputDescrição}
                            // whileHover={{ scale: 1.02 }} 
                            // whileTap={{ scale: 0.95 }} 
                        >
                            <h3>Status da Tarefa</h3>
                            <div className={styles.containerStatus}>
                                <motion.div
                                    style={statusDaTarefa === "TODO" ? { backgroundColor: '#6b6b6b', color: '#FFF' } : { backgroundColor: '#F4F4FE', color: '#0B0E31'}} 
                                    className={styles.status}
                                    whileHover={{ scale: 1.1, backgroundColor: '#6b6b6b', color: '#FFF' }} 
                                    whileTap={{ scale: 0.95 }}
                                    onClick={() => setStatusDaTarefa("TODO")}
                                >
                                    Não Iniciada
                                </motion.div>
                                <motion.div
                                    style={statusDaTarefa === "IN_PROGRESS" ? { backgroundColor: '#a0ff47' } : { backgroundColor: '#F4F4FE', color: '#0B0E31'}} 
                                    className={styles.status}
                                    whileHover={{ scale: 1.1, backgroundColor: '#a0ff47' }} 
                                    whileTap={{ scale: 0.95 }}
                                    onClick={() => setStatusDaTarefa("IN_PROGRESS")}
                                >
                                    Em Progresso
                                </motion.div>
                                <motion.div
                                    style={statusDaTarefa === "LATE" ? { backgroundColor: '#ffbf00' } : { backgroundColor: '#F4F4FE', color: '#0B0E31'}} 
                                    className={styles.status}
                                    whileHover={{ scale: 1.1, backgroundColor: '#ffbf00' }} 
                                    whileTap={{ scale: 0.95 }}
                                    onClick={() => setStatusDaTarefa("LATE")}
                                >
                                    Atrasada
                                </motion.div>
                                <motion.div 
                                    style={statusDaTarefa === "DONE" ? { backgroundColor: '#319f43', color: '#FFF' } : { backgroundColor: '#F4F4FE', color: '#0B0E31'}} 
                                    className={styles.status}
                                    whileHover={{ scale: 1.1, backgroundColor: '#319f43', color: '#FFF' }} 
                                    whileTap={{ scale: 0.95 }}
                                    onClick={() => setStatusDaTarefa("DONE")}
                                >
                                    Concluída
                                </motion.div>
                                <motion.div 
                                    style={statusDaTarefa === "CANCELLED" ? { backgroundColor: '#ff0004', color: '#FFF' } : { backgroundColor: '#F4F4FE', color: '#0B0E31'}} 
                                    className={styles.status}
                                    whileHover={{ scale: 1.1, backgroundColor: '#ff0004', color: '#FFF' }} 
                                    whileTap={{ scale: 0.95 }}
                                    onClick={() => setStatusDaTarefa("CANCELLED")}
                                >
                                    Cancelada
                                </motion.div>
                            </div>
                        </motion.div>
                    </div>
                    <motion.button
                        whileHover={{ scale: 1.05 }} 
                        whileTap={{ scale: 0.8 }}
                        style={ 
                                nomeTarefa === tarefa.nameTask && 
                                descricaoObjetivo === tarefa.descriptionTask &&
                                objetivoSelecionado?.id === tarefa.idObjective &&
                                tarefa.status === statusDaTarefa ? 
                                { backgroundColor: '#E0E0E0', cursor: 'not-allowed' } : 
                                {}
                        }
                        onClick={() => 
                            nomeTarefa === tarefa.nameTask && 
                            descricaoObjetivo === tarefa.descriptionTask &&
                            objetivoSelecionado?.id === tarefa.idObjective &&
                            tarefa.status === statusDaTarefa ?
                            undefined :
                            setVerPopUpConfirmacao(true)
                        }
                    >
                        {carregando && <ClipLoader size={10} color="#0B0E31" />}
                        <span 
                            style={{ 
                                marginLeft: carregando ? '8px' : '0'
                            }}
                        ></span>
                        Salvar
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
            {verListaDeObjetivos && (
                    <div className={styles.containerPopUp}>
                        <motion.button
                            whileHover={{ scale: 1.06 }} 
                            whileTap={{ scale: 0.8 }}
                            className={styles.botaoVoltar} 
                            onClick={() => setVerListaDeObjetivos(false)}
                            >
                            <strong>Voltar - Tarefa</strong>
                        </motion.button>
                        <div className={styles.conteudo}>
                            <div className={styles.containerScroll}>
                                {objetivos && objetivos.map((objetivo) => {
                                    return (
                                        <div
                                            key={objetivo.id}
                                            className={styles.objetivo}
                                            onClick={() => {
                                                setObjetivoSelecionado(objetivo);
                                                setVerListaDeObjetivos(false);
                                            }}
                                            style={{ cursor: 'pointer' }}
                                        >
                                        <h4>{objetivo.nameObjective}</h4>
                                        </div>
                                    );
                                })}
                            </div>
                        </div>
                    </div>
                )}
                {verPopUpConfirmacao && (
                    <div className={styles.containerPopUp}>
                        <motion.button
                            whileHover={{ scale: 1.06 }} 
                            whileTap={{ scale: 0.8 }}
                            className={styles.botaoVoltar} 
                            onClick={() => setVerPopUpConfirmacao(false)}
                            >
                            <strong>Voltar - Tarefa</strong>
                        </motion.button>
                        <div className={styles.conteudo}>
                            <h4>Deseja atualizar essa tarefa, ou atualizar ela e suas repetições futuras?</h4>
                            <motion.div
                                    className={styles.status}
                                    whileHover={{ scale: 1.1, backgroundColor: '#0B0E31', color: '#FFF' }} 
                                    whileTap={{ scale: 0.95 }}
                            >
                                Está apenas!
                            </motion.div>
                            <motion.div
                                    className={styles.status}
                                    whileHover={{ scale: 1.1, backgroundColor: '#0B0E31', color: '#FFF' }} 
                                    whileTap={{ scale: 0.95 }}
                            >
                                Essa e suas aparições futuras!
                            </motion.div>
                        </div>
                    </div>
                )}
        </div>
        </>
    );
}