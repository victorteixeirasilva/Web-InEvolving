import Image from "next/image";
import styles from "./EditarObjetivo.module.scss";
import * as motion from "motion/react-client";
import { useCallback, useEffect, useState } from "react";
import { ClipLoader } from 'react-spinners';
import { useRouter } from "next/navigation";
import { Tarefa_Modulo_Tarefas } from "@/components/interfaces/Tarefa_Modulo_Tarefas";
import { Objetivo } from '@/components/interfaces/Objetivo';
import { Calendar, CalendarProps } from 'react-calendar';

export default function EditarTarefa( { tarefa, voltar }: { tarefa: Tarefa_Modulo_Tarefas; voltar:() => void } ) {
    const [isMobile, setIsMobile] = useState(false);
    
    useEffect(() => {
        const largura = window.innerWidth;
        setIsMobile(largura <= 1024);
    }, []);

    const [opcaoAtualizar, setOpcaoAtualizar] = useState(1);
    const [opcaoDeletar, setOpcaoDeletar] = useState(1);

    const [nomeTarefa, setNomeTarefa] = useState(tarefa.nameTask);
    const [motivos, setMotivos] = useState("");
    const [descricaoObjetivo, setDescricaoObjetivo] = useState(tarefa.descriptionTask);
    const [carregando, setCarregando] = useState(false);
    const [jwtToken, setJwtToken] = useState('');
    const [statusDaTarefa, setStatusDaTarefa] = useState(tarefa.status);
    const [verListaDeObjetivos, setVerListaDeObjetivos] = useState(false);
    const [escolherDataFinal, setEscolherDataFinal] = useState(false);
    const [dataFinal, setDataFinal] = useState<Date | null>(new Date);

    const [exibirIsTarefaFrequente, setExibirIsTarefaFrequente] = useState(false);
    const [todoDomingo, setTodoDomingo] = useState(false);
    const [todaSegunda, setTodaSegunda] = useState(false);
    const [todaTerca, setTodaTerca] = useState(false);
    const [todaQuarta, setTodaQuarta] = useState(false);
    const [todaQuinta, setTodaQuinta] = useState(false);
    const [todaSexta, setTodaSexta] = useState(false);
    const [todoSabado, setTodoSabado] = useState(false);

    const [abrirInputMotivoDoCancelamento , setAbrirInputMotivoDoCancelamento] = useState(false);

    const SetDataFinal : CalendarProps['onChange'] = (value) => {
        if (value instanceof Date) {
            setDataFinal(value);
        } else if (Array.isArray(value) && value[0] instanceof Date) {
            setDataFinal(value[0]); // ou outro tratamento para intervalo
        }
    };

    useEffect(() => {
        const token = localStorage.getItem('token');
        setJwtToken(token || '');
    }, []);
    
    const deletarTarefa = async () => {
        setCarregando(true);

        if (opcaoDeletar === 1) {
            const response = await fetch(
                'https://api.inevolving.inovasoft.tech/auth/api/tasks/'+tarefa?.id, 
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
            
        } else {

            const response = await fetch(
                'https://api.inevolving.inovasoft.tech/auth/api/tasks/repeat/'+tarefa?.id+"/3000-01-01", 
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
            
        }

        setCarregando(false);
        window.location.reload();
    };

    const router = useRouter();

    const [objetivos, setObjetivos] = useState<Objetivo[] | null>(null);    

    const pegarObjetivos = async () => {
                setCarregando(true);
                const response = await fetch(
                        'https://api.inevolving.inovasoft.tech/auth/api/objectives/user', 
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

    const pegarObjetivo = useCallback( async () => {
            setCarregando(true);

            const response = await fetch(
                    'https://api.inevolving.inovasoft.tech/auth/api/objectives/'+tarefa.idObjective, 
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
    }, [router, tarefa.idObjective]);

    useEffect(() => {
        pegarObjetivo();
    }, [pegarObjetivo]);

    const motivosLimpos = motivos
        .split(";")
            .map((m) => m.trim())
                .filter((m) => m.length > 0)
                    .join(";");

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setMotivos(e.target.value); // usuário pode digitar livremente
    };

    const [verPopUpConfirmacao, setVerPopUpConfirmacao] = useState(false);
    const [verPopUpConfirmacaoDelete, setVerPopUpConfirmacaoDelete] = useState(false);

    const atualizarTarefa = async () => {
            setCarregando(true);

            if (opcaoAtualizar === 1) {

                const response = await fetch(
                        'https://api.inevolving.inovasoft.tech/auth/api/tasks/'+tarefa.id, 
                    {
                            method: 'PUT',
                            headers: {
                                'Content-Type': 'application/json',
                                'Authorization': 'Bearer ' + localStorage.getItem('token')
                            },
                            body: JSON.stringify({
                                nameTask: nomeTarefa,
                                descriptionTask: descricaoObjetivo,
                                idObjective: objetivoSelecionado?.id
                            })
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
                
            } else {
                const response = await fetch(
                        'https://api.inevolving.inovasoft.tech/auth/api/tasks/repeat/'+tarefa.id+"/"+dataFinal?.toISOString().split('T')[0], 
                    {
                            method: 'PUT',
                            headers: {
                                'Content-Type': 'application/json',
                                'Authorization': 'Bearer ' + localStorage.getItem('token')
                            },
                            body: JSON.stringify({
                                nameTask: nomeTarefa,
                                descriptionTask: descricaoObjetivo,
                                idObjective: objetivoSelecionado?.id,
                                daysOfTheWeekDTO: {
                                    monday: todaSegunda,
                                    tuesday: todaTerca,
                                    wednesday: todaQuarta,
                                    thursday: todaQuinta,
                                    friday: todaSexta,
                                    saturday: todoSabado,
                                    sunday: todoDomingo
                                }
                            })
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
            }

            if (!(statusDaTarefa === tarefa.status)) {
                if (statusDaTarefa === "TODO") {
                    const response = await fetch(
                        'https://api.inevolving.inovasoft.tech/auth/api/tasks/status/todo/'+tarefa.id, 
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
                    
                } else if (statusDaTarefa === "IN PROGRESS") {
                    const response = await fetch(
                        'https://api.inevolving.inovasoft.tech/auth/api/tasks/status/progress/'+tarefa.id, 
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
                    
                } if (statusDaTarefa === "DONE") {
                    const response = await fetch(
                        'https://api.inevolving.inovasoft.tech/auth/api/tasks/status/done/'+tarefa.id, 
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
                    
                } if (statusDaTarefa === "LATE") {
                    const response = await fetch(
                        'https://api.inevolving.inovasoft.tech/auth/api/tasks/status/late/'+tarefa.id, 
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
                    
                } if (statusDaTarefa === "CANCELLED") {
                    const response = await fetch(
                        'https://api.inevolving.inovasoft.tech/auth/api/tasks/status/canceled', 
                    {
                            method: 'PATCH',
                            headers: {
                                'Content-Type': 'application/json',
                                'Authorization': 'Bearer ' + localStorage.getItem('token')
                            },
                            body: JSON.stringify({
                                idTask: tarefa.id,
                                cancellationReason: motivosLimpos
                            })
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

                }

            }
            
            if (tarefa.dateTask !== dataTarefa?.toISOString()) {
                const response = await fetch(
                    'https://api.inevolving.inovasoft.tech/auth/api/tasks/date/'+tarefa.id+'/'+dataTarefa?.toISOString().split('T')[0], 
                    {
                        method: 'PUT',
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
                    alert('Erro ao atualizar data da tarefa');
                }

            }
            
            setCarregando(false);
            // window.location.reload();
            voltar();
    }

    const [dataTarefa, setDataTarefa] = useState<Date | null>(new Date);
    const [escolherDataTarefa, setEscolherDataTarefa] = useState(false);
    
    const SetDataNovaTarefa : CalendarProps['onChange'] = (value) => {
        if (value instanceof Date) {
            setDataTarefa(value);
        } else if (Array.isArray(value) && value[0] instanceof Date) {
            setDataTarefa(value[0]); // ou outro tratamento para intervalo
        }
    };
    

    if (!isMobile) {
        return (
            <>
            <div className={styles.overlay}>
                <div className={styles.containerPopUp}>
                    <div className={styles.botoesTopo}>
                        <motion.button
                            whileHover={{ scale: 1.1 }} 
                            whileTap={{ scale: 0.8 }}
                            className={styles.botaoVoltar} 
                            // onClick={() => window.location.reload()}
                            onClick={voltar}
                        >
                            <strong>X</strong>
                        </motion.button>
                        <motion.button
                            whileHover={{ scale: 1.2 }} 
                            whileTap={{ scale: 0.8 }}
                            className={styles.lixeira}
                            onClick={() => {
                                    if (confirm('Tem certeza que deseja excluir esta tarefa?')) {
                                        setVerPopUpConfirmacaoDelete(true);
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
                            <h3 style={{marginBottom: '-20px'}}>Data da Tarefa</h3>
                            <div className={styles.containerDataFinal}>
                                <motion.div 
                                        className={styles.inputDataFinal}
                                        whileHover={{ scale: 1.06 }} 
                                        whileTap={{ scale: 0.8 }}
                                        style={{marginTop: '0px'}}
                                        onClick={() => setEscolherDataTarefa(true)}
                                    >
                                        Escolher Data 
                                </motion.div>
                            </div>
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
                                        style={statusDaTarefa === "IN PROGRESS" ? { backgroundColor: '#a0ff47' } : { backgroundColor: '#F4F4FE', color: '#0B0E31'}} 
                                        className={styles.status}
                                        whileHover={{ scale: 1.1, backgroundColor: '#a0ff47' }} 
                                        whileTap={{ scale: 0.95 }}
                                        onClick={() => setStatusDaTarefa("IN PROGRESS")}
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
                                        onClick={() => {
                                            setStatusDaTarefa("CANCELLED");
                                            setAbrirInputMotivoDoCancelamento(true);
                                        }}
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
                                    onClick={() => {
                                        setOpcaoAtualizar(1);
                                        atualizarTarefa();
                                    }}
                            >
                                {carregando && <ClipLoader size={10} color="#0B0E31" />}
                                <span 
                                    style={{ 
                                        marginLeft: carregando ? '8px' : '0'
                                    }}
                                ></span>
                                Está apenas!
                            </motion.div>
                            <motion.div
                                    className={styles.status}
                                    whileHover={{ scale: 1.1, backgroundColor: '#0B0E31', color: '#FFF' }} 
                                    whileTap={{ scale: 0.95 }}
                                    onClick={() => {
                                        setOpcaoAtualizar(2);
                                        setExibirIsTarefaFrequente(true);
                                    }}
                            >
                                {carregando && <ClipLoader size={10} color="#0B0E31" />}
                                <span 
                                    style={{ 
                                        marginLeft: carregando ? '8px' : '0'
                                    }}
                                ></span>
                                Essa e suas aparições futuras!
                            </motion.div>
                        </div>
                    </div>
                )}
                {verPopUpConfirmacaoDelete && (
                    <div className={styles.containerPopUp}>
                        <motion.button
                            whileHover={{ scale: 1.06 }} 
                            whileTap={{ scale: 0.8 }}
                            className={styles.botaoVoltar} 
                            onClick={() => setVerPopUpConfirmacaoDelete(false)}
                            >
                            <strong>Voltar - Tarefa</strong>
                        </motion.button>
                        <div className={styles.conteudo}>
                            <h4>Deseja deletar essa tarefa, ou deletar ela e suas repetições futuras?</h4>
                            <motion.div
                                    className={styles.status}
                                    whileHover={{ scale: 1.1, backgroundColor: '#0B0E31', color: '#FFF' }} 
                                    whileTap={{ scale: 0.95 }}
                                    onClick={() => {
                                        setOpcaoDeletar(1);
                                        deletarTarefa();
                                    }}
                            >
                                {carregando && <ClipLoader size={10} color="#0B0E31" />}
                                <span 
                                    style={{ 
                                        marginLeft: carregando ? '8px' : '0'
                                    }}
                                ></span>
                                Está apenas!
                            </motion.div>
                            <motion.div
                                    className={styles.status}
                                    whileHover={{ scale: 1.1, backgroundColor: '#0B0E31', color: '#FFF' }} 
                                    whileTap={{ scale: 0.95 }}
                                    onClick={() => {
                                        setOpcaoDeletar(2);
                                        deletarTarefa();
                                    }}
                            >
                                {carregando && <ClipLoader size={10} color="#0B0E31" />}
                                <span 
                                    style={{ 
                                        marginLeft: carregando ? '8px' : '0'
                                    }}
                                ></span>
                                Essa e suas aparições futuras!
                            </motion.div>
                        </div>
                    </div>
                )}
                {exibirIsTarefaFrequente && (
                    <div className={styles.containerPopUp}>
                        <motion.button
                            whileHover={{ scale: 1.06 }} 
                            whileTap={{ scale: 0.8 }}
                            className={styles.botaoVoltar} 
                            onClick={() => {
                                window.location.reload();
                            }}
                        >
                            <strong>Voltar - Tarefas</strong>
                        </motion.button>
                        <div className={styles.conteudo}>
                            <div 
                                className={styles.diaDaSemana}
                                onClick={() => setTodoDomingo(!todoDomingo)}
                            >
                                Todo domingo
                                <Image
                                    style={{ visibility: todoDomingo ? 'visible' : 'hidden' }}
                                    src="/checkIconAzul.svg"
                                    alt="Icone Check Azul"
                                    width={21}
                                    height={16}
                                />
                            </div>
                            <div 
                                className={styles.diaDaSemana}
                                onClick={() => setTodaSegunda(!todaSegunda)}
                            >
                                Toda segunda-feira
                                <Image
                                    style={{ visibility: todaSegunda ? 'visible' : 'hidden' }}
                                    src="/checkIconAzul.svg"
                                    alt="Icone Check Azul"
                                    width={21}
                                    height={16}
                                />
                            </div>
                            <div 
                                className={styles.diaDaSemana}
                                onClick={() => setTodaTerca(!todaTerca)}
                            >
                                Toda terça-feira
                                <Image
                                    style={{ visibility: todaTerca ? 'visible' : 'hidden' }}
                                    src="/checkIconAzul.svg"
                                    alt="Icone Check Azul"
                                    width={21}
                                    height={16}
                                />
                            </div>
                            <div 
                                className={styles.diaDaSemana}
                                onClick={() => setTodaQuarta(!todaQuarta)}
                            >
                                Toda quarta-feira
                                <Image
                                    style={{ visibility: todaQuarta ? 'visible' : 'hidden' }}
                                    src="/checkIconAzul.svg"
                                    alt="Icone Check Azul"
                                    width={21}
                                    height={16}
                                />
                            </div>
                            <div 
                                className={styles.diaDaSemana}
                                onClick={() => setTodaQuinta(!todaQuinta)}
                            >
                                Toda quinta-feira
                                <Image
                                    style={{ visibility: todaQuinta ? 'visible' : 'hidden' }}
                                    src="/checkIconAzul.svg"
                                    alt="Icone Check Azul"
                                    width={21}
                                    height={16}
                                />
                            </div>
                            <div 
                                className={styles.diaDaSemana}
                                onClick={() => setTodaSexta(!todaSexta)}
                            >
                                Toda sexta-feira
                                <Image
                                    style={{ visibility: todaSexta ? 'visible' : 'hidden' }}
                                    src="/checkIconAzul.svg"
                                    alt="Icone Check Azul"
                                    width={21}
                                    height={16}
                                />
                            </div>
                            <div 
                                className={styles.diaDaSemana}
                                onClick={() => setTodoSabado(!todoSabado)}
                            >
                                Todo sábado
                                <Image
                                    style={{ visibility: todoSabado ? 'visible' : 'hidden' }}
                                    src="/checkIconAzul.svg"
                                    alt="Icone Check Azul"
                                    width={21}
                                    height={16}
                                />
                            </div>
                            <div className={styles.containerDataFinal}>
                                Repetir até a data:
                                <motion.div 
                                    className={styles.inputDataFinal}
                                    whileHover={{ scale: 1.06 }} 
                                    whileTap={{ scale: 0.8 }}
                                    onClick={() => setEscolherDataFinal(true)}
                                >
                                    {dataFinal && (<strong>{dataFinal.toLocaleDateString()}</strong>)} 
                                </motion.div>
                            </div>
                            <motion.button
                                style={
                                    !todoDomingo && 
                                    !todaSegunda &&
                                    !todaTerca &&
                                    !todaQuarta &&
                                    !todaQuinta &&
                                    !todaSexta &&
                                    !todoSabado ? { opacity: 0.3, cursor: 'not-allowed' } : {}
                                }
                                whileHover={{ scale: 1.05 }} 
                                whileTap={{ scale: 0.8 }}
                                onClick={
                                    !todoDomingo && 
                                    !todaSegunda &&
                                    !todaTerca &&
                                    !todaQuarta &&
                                    !todaQuinta &&
                                    !todaSexta &&
                                    !todoSabado ? () => alert("Primeiro selecione um dia da semana") : () => atualizarTarefa()
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
                )}
                {escolherDataFinal && (
                    <div className={styles.containerPopUp}>
                        <motion.button
                            whileHover={{ scale: 1.06 }} 
                            whileTap={{ scale: 0.8 }}
                            className={styles.botaoVoltar} 
                            onClick={() => setEscolherDataFinal(false)}
                            >
                            <strong>Voltar</strong>
                        </motion.button>
                        <div className={styles.conteudo}>
                            <h4>Data final das repetições!</h4>
                            <Calendar
                                className={styles.calendar}
                                selectRange={false}
                                value={dataFinal}
                                onChange={SetDataFinal}
                            />
                            {dataFinal && (
                                <h3>Data selecionada: {dataFinal.toLocaleDateString()}</h3>
                            )}
                            <motion.button
                                whileHover={{ scale: 1.05 }} 
                                whileTap={{ scale: 0.8 }}
                                onClick={() => setEscolherDataFinal(false)}
                            >
                                {carregando && <ClipLoader size={10} color="#0B0E31" />}
                                <span 
                                    style={{ 
                                        marginLeft: carregando ? '8px' : '0'
                                    }}
                                ></span>
                                Selecionar
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
                )}
                {abrirInputMotivoDoCancelamento && (
                    <div className={styles.containerPopUp}>
                        <motion.button
                            whileHover={{ scale: 1.06 }} 
                            whileTap={{ scale: 0.8 }}
                            className={styles.botaoVoltar} 
                            onClick={() => setAbrirInputMotivoDoCancelamento(false)}
                        >
                            <strong>Voltar - Tarefa</strong>
                        </motion.button>
                        <div className={styles.conteudo}>
                            <h4 style={{fontSize: '18px'}}>
                                Para te ajudar a estar sempre na sua velocidade e produtividade máxima, precisamos entender o por que não vai realizar essa tarefa hoje. 
                                Separe os motivos por ponto e vírgula (;), exemplo: <strong>Imprevisto; Doente; Cansaço</strong>.
                            </h4>
                            <div className={styles.inputs}>
                                <div className={styles.inputObjetivo}>
                                    <h3>Motivos</h3>
                                    <div className={styles.input}>
                                    <input
                                        type="text"
                                        id="motivos"
                                        value={motivos}
                                        onChange={handleInputChange}
                                        placeholder={"Informe os seus motivos para não realizar as tarefas..."}
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
                            </div>
                        </div>
                    </div>
                )}
                {escolherDataTarefa && (
                    <div className={styles.containerPopUp}>
                        <motion.button
                            whileHover={{ scale: 1.06 }} 
                            whileTap={{ scale: 0.8 }}
                            className={styles.botaoVoltar} 
                            onClick={() => setEscolherDataTarefa(false)}
                        >
                            <strong>Voltar</strong>
                        </motion.button>
                        <div className={styles.conteudo}>
                            <Calendar
                                className={styles.calendar}
                                selectRange={false}
                                value={dataTarefa}
                                onChange={SetDataNovaTarefa}
                            />
                            {dataTarefa && (
                                <h3>Data selecionada: {dataTarefa.toLocaleDateString()}</h3>
                            )}
                            <motion.button
                                whileHover={{ scale: 1.05 }} 
                                whileTap={{ scale: 0.8 }}
                                onClick={() => setEscolherDataTarefa(false)}
                            >
                                {carregando && <ClipLoader size={10} color="#0B0E31" />}
                                <span 
                                    style={{ 
                                        marginLeft: carregando ? '8px' : '0'
                                    }}
                                ></span>
                                Selecionar
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
                )}
            </div>
            </>
        );
    } else {
        return (
            <div className={styles.mob}>
                <div className={styles.overlay}>
                    <div className={styles.containerPopUp}>
                        <div className={styles.botoesTopo}>
                            <motion.button
                                whileHover={{ scale: 1.1 }} 
                                whileTap={{ scale: 0.8 }}
                                className={styles.botaoVoltar} 
                                // onClick={() => window.location.reload()}
                                onClick={voltar}
                            >
                                <strong style={{color: '#0B0E31'}}>X</strong>
                            </motion.button>
                            <motion.button
                                whileHover={{ scale: 1.2 }} 
                                whileTap={{ scale: 0.8 }}
                                className={styles.lixeira}
                                onClick={() => {setVerPopUpConfirmacaoDelete(true);}}
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
                                <h3 style={{marginBottom: '-20px'}}>Data da Tarefa</h3>
                                <div className={styles.containerDataFinal}>
                                    <motion.div 
                                        className={styles.inputDataFinal}
                                        whileHover={{ scale: 1.06 }} 
                                        whileTap={{ scale: 0.8 }}
                                        style={{marginTop: '0px'}}
                                        onClick={() => setEscolherDataTarefa(true)}
                                    >
                                        Escolher Data
                                    </motion.div>
                                </div>
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
                                            style={statusDaTarefa === "IN PROGRESS" ? { backgroundColor: '#a0ff47' } : { backgroundColor: '#F4F4FE', color: '#0B0E31'}} 
                                            className={styles.status}
                                            whileHover={{ scale: 1.1, backgroundColor: '#a0ff47' }} 
                                            whileTap={{ scale: 0.95 }}
                                            onClick={() => setStatusDaTarefa("IN PROGRESS")}
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
                                            onClick={() => {
                                                setStatusDaTarefa("CANCELLED");
                                                setAbrirInputMotivoDoCancelamento(true);
                                            }}
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
                        <div className={styles.overlay}>
                            <div className={styles.containerPopUp}>
                                <motion.button
                                    whileHover={{ scale: 1.06 }} 
                                    whileTap={{ scale: 0.8 }}
                                    className={styles.botaoVoltar} 
                                    onClick={() => setVerListaDeObjetivos(false)}
                                    >
                                    <strong style={{color: '#0B0E31'}}>Voltar - Tarefa</strong>
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
                        </div>
                    )}
                    {verPopUpConfirmacao && (
                    <div className={styles.overlay}>
                        <div className={styles.containerPopUp}>
                            <motion.button
                                whileHover={{ scale: 1.06 }} 
                                whileTap={{ scale: 0.8 }}
                                className={styles.botaoVoltar} 
                                onClick={() => setVerPopUpConfirmacao(false)}
                                >
                                <strong style={{color: '#0B0E31'}}>Voltar - Tarefa</strong>
                            </motion.button>
                            <div className={styles.conteudo}>
                                <h4>Deseja atualizar essa tarefa, ou atualizar ela e suas repetições futuras?</h4>
                                <motion.div
                                        className={styles.status}
                                        whileHover={{ scale: 1.1, backgroundColor: '#0B0E31', color: '#FFF' }} 
                                        whileTap={{ scale: 0.95 }}
                                        onClick={() => {
                                            setOpcaoAtualizar(1);
                                            atualizarTarefa();
                                        }}
                                >
                                    {carregando && <ClipLoader size={10} color="#0B0E31" />}
                                    <span 
                                        style={{ 
                                            marginLeft: carregando ? '8px' : '0'
                                        }}
                                    ></span>
                                    Está apenas!
                                </motion.div>
                                <motion.div
                                        className={styles.status}
                                        whileHover={{ scale: 1.1, backgroundColor: '#0B0E31', color: '#FFF' }} 
                                        whileTap={{ scale: 0.95 }}
                                        onClick={() => {
                                            setOpcaoAtualizar(2);
                                            setExibirIsTarefaFrequente(true);
                                        }}
                                >
                                    {carregando && <ClipLoader size={10} color="#0B0E31" />}
                                    <span 
                                        style={{ 
                                            marginLeft: carregando ? '8px' : '0'
                                        }}
                                    ></span>
                                    Essa e suas aparições futuras!
                                </motion.div>
                            </div>
                        </div>
                    </div>
                    )}
                    {verPopUpConfirmacaoDelete && (
                    <div className={styles.overlay}>
                        <div className={styles.containerPopUp}>
                            <motion.button
                                whileHover={{ scale: 1.06 }} 
                                whileTap={{ scale: 0.8 }}
                                className={styles.botaoVoltar} 
                                onClick={() => setVerPopUpConfirmacaoDelete(false)}
                                >
                                <strong style={{color: '#0B0E31'}}>Voltar - Tarefa</strong>
                            </motion.button>
                            <div className={styles.conteudo}>
                                <h4>Deseja deletar essa tarefa, ou deletar ela e suas repetições futuras?</h4>
                                <motion.div
                                        className={styles.status}
                                        whileHover={{ scale: 1.1, backgroundColor: '#0B0E31', color: '#FFF' }} 
                                        whileTap={{ scale: 0.95 }}
                                        onClick={() => {
                                            setOpcaoDeletar(1);
                                            deletarTarefa();
                                        }}
                                >
                                    {carregando && <ClipLoader size={10} color="#0B0E31" />}
                                    <span 
                                        style={{ 
                                            marginLeft: carregando ? '8px' : '0'
                                        }}
                                    ></span>
                                    Está apenas!
                                </motion.div>
                                <motion.div
                                        className={styles.status}
                                        whileHover={{ scale: 1.1, backgroundColor: '#0B0E31', color: '#FFF' }} 
                                        whileTap={{ scale: 0.95 }}
                                        onClick={() => {
                                            setOpcaoDeletar(2);
                                            deletarTarefa();
                                        }}
                                >
                                    {carregando && <ClipLoader size={10} color="#0B0E31" />}
                                    <span 
                                        style={{ 
                                            marginLeft: carregando ? '8px' : '0'
                                        }}
                                    ></span>
                                    Essa e suas aparições futuras!
                                </motion.div>
                            </div>
                        </div>
                    </div>
                    )}
                    {exibirIsTarefaFrequente && (
                    <div className={styles.overlay}>
                        <div className={styles.containerPopUp}>
                            <motion.button
                                whileHover={{ scale: 1.06 }} 
                                whileTap={{ scale: 0.8 }}
                                className={styles.botaoVoltar} 
                                onClick={() => {
                                    window.location.reload();
                                }}
                            >
                                <strong style={{color: '#0B0E31'}}>Voltar - Tarefas</strong>
                            </motion.button>
                            <div className={styles.conteudo}>
                                <div 
                                    className={styles.diaDaSemana}
                                    onClick={() => setTodoDomingo(!todoDomingo)}
                                >
                                    Todo domingo
                                    <Image
                                        style={{ visibility: todoDomingo ? 'visible' : 'hidden' }}
                                        src="/checkIconAzul.svg"
                                        alt="Icone Check Azul"
                                        width={21}
                                        height={16}
                                    />
                                </div>
                                <div 
                                    className={styles.diaDaSemana}
                                    onClick={() => setTodaSegunda(!todaSegunda)}
                                >
                                    Toda segunda-feira
                                    <Image
                                        style={{ visibility: todaSegunda ? 'visible' : 'hidden' }}
                                        src="/checkIconAzul.svg"
                                        alt="Icone Check Azul"
                                        width={21}
                                        height={16}
                                    />
                                </div>
                                <div 
                                    className={styles.diaDaSemana}
                                    onClick={() => setTodaTerca(!todaTerca)}
                                >
                                    Toda terça-feira
                                    <Image
                                        style={{ visibility: todaTerca ? 'visible' : 'hidden' }}
                                        src="/checkIconAzul.svg"
                                        alt="Icone Check Azul"
                                        width={21}
                                        height={16}
                                    />
                                </div>
                                <div 
                                    className={styles.diaDaSemana}
                                    onClick={() => setTodaQuarta(!todaQuarta)}
                                >
                                    Toda quarta-feira
                                    <Image
                                        style={{ visibility: todaQuarta ? 'visible' : 'hidden' }}
                                        src="/checkIconAzul.svg"
                                        alt="Icone Check Azul"
                                        width={21}
                                        height={16}
                                    />
                                </div>
                                <div 
                                    className={styles.diaDaSemana}
                                    onClick={() => setTodaQuinta(!todaQuinta)}
                                >
                                    Toda quinta-feira
                                    <Image
                                        style={{ visibility: todaQuinta ? 'visible' : 'hidden' }}
                                        src="/checkIconAzul.svg"
                                        alt="Icone Check Azul"
                                        width={21}
                                        height={16}
                                    />
                                </div>
                                <div 
                                    className={styles.diaDaSemana}
                                    onClick={() => setTodaSexta(!todaSexta)}
                                >
                                    Toda sexta-feira
                                    <Image
                                        style={{ visibility: todaSexta ? 'visible' : 'hidden' }}
                                        src="/checkIconAzul.svg"
                                        alt="Icone Check Azul"
                                        width={21}
                                        height={16}
                                    />
                                </div>
                                <div 
                                    className={styles.diaDaSemana}
                                    onClick={() => setTodoSabado(!todoSabado)}
                                >
                                    Todo sábado
                                    <Image
                                        style={{ visibility: todoSabado ? 'visible' : 'hidden' }}
                                        src="/checkIconAzul.svg"
                                        alt="Icone Check Azul"
                                        width={21}
                                        height={16}
                                    />
                                </div>
                                <div className={styles.containerDataFinal}>
                                    Repetir até a data:
                                    <motion.div 
                                        className={styles.inputDataFinal}
                                        whileHover={{ scale: 1.06 }} 
                                        whileTap={{ scale: 0.8 }}
                                        onClick={() => setEscolherDataFinal(true)}
                                    >
                                        {dataFinal && (<strong>{dataFinal.toLocaleDateString()}</strong>)} 
                                    </motion.div>
                                </div>
                                <motion.button
                                    style={
                                        !todoDomingo && 
                                        !todaSegunda &&
                                        !todaTerca &&
                                        !todaQuarta &&
                                        !todaQuinta &&
                                        !todaSexta &&
                                        !todoSabado ? { opacity: 0.3, cursor: 'not-allowed' } : {}
                                    }
                                    whileHover={{ scale: 1.05 }} 
                                    whileTap={{ scale: 0.8 }}
                                    onClick={
                                        !todoDomingo && 
                                        !todaSegunda &&
                                        !todaTerca &&
                                        !todaQuarta &&
                                        !todaQuinta &&
                                        !todaSexta &&
                                        !todoSabado ? () => alert("Primeiro selecione um dia da semana") : () => atualizarTarefa()
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
                    </div>    
                    )}
                    {escolherDataFinal && (
                    <div className={styles.overlay}>
                        <div className={styles.containerPopUp}>
                            <motion.button
                                whileHover={{ scale: 1.06 }} 
                                whileTap={{ scale: 0.8 }}
                                className={styles.botaoVoltar} 
                                onClick={() => setEscolherDataFinal(false)}
                                >
                                <strong style={{color: '#0B0E31'}}>Voltar</strong>
                            </motion.button>
                            <div className={styles.conteudo}>
                                <h4>Data final das repetições!</h4>
                                <Calendar
                                    className={styles.calendar}
                                    selectRange={false}
                                    value={dataFinal}
                                    onChange={SetDataFinal}
                                />
                                {dataFinal && (
                                    <h3>Data selecionada: {dataFinal.toLocaleDateString()}</h3>
                                )}
                                <motion.button
                                    whileHover={{ scale: 1.05 }} 
                                    whileTap={{ scale: 0.8 }}
                                    onClick={() => setEscolherDataFinal(false)}
                                >
                                    {carregando && <ClipLoader size={10} color="#0B0E31" />}
                                    <span 
                                        style={{ 
                                            marginLeft: carregando ? '8px' : '0'
                                        }}
                                    ></span>
                                    Selecionar
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
                    {abrirInputMotivoDoCancelamento && (
                    <div className={styles.overlay}>
                        <div className={styles.containerPopUp}>
                            <motion.button
                                whileHover={{ scale: 1.06 }} 
                                whileTap={{ scale: 0.8 }}
                                className={styles.botaoVoltar} 
                                onClick={() => setAbrirInputMotivoDoCancelamento(false)}
                            >
                                <strong style={{color: '#0B0E31'}}>Voltar - Tarefa</strong>
                            </motion.button>
                            <div className={styles.conteudo}>
                                <h4 style={{fontSize: '18px'}}>
                                    Para te ajudar a estar sempre na sua velocidade e produtividade máxima, precisamos entender o por que não vai realizar essa tarefa hoje. 
                                    Separe os motivos por ponto e vírgula (;), exemplo: <strong>Imprevisto; Doente; Cansaço</strong>.
                                </h4>
                                <div className={styles.inputs}>
                                    <div className={styles.inputObjetivo}>
                                        <h3>Motivos</h3>
                                        <div className={styles.input}>
                                        <input
                                            type="text"
                                            id="motivos"
                                            value={motivos}
                                            onChange={handleInputChange}
                                            placeholder={"Informe os seus motivos para não realizar as tarefas..."}
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
                                </div>
                            </div>
                        </div>
                    </div>
                    )}
                    {escolherDataTarefa && (
                        <div className={styles.containerPopUpEdit}>
                            <motion.button
                                whileHover={{ scale: 1.06 }} 
                                whileTap={{ scale: 0.8 }}
                                className={styles.botaoVoltar} 
                                onClick={() => setEscolherDataTarefa(false)}
                            >
                                <strong>Voltar</strong>
                            </motion.button>
                            <div className={styles.conteudo}>
                                <Calendar
                                    className={styles.calendar}
                                    selectRange={false}
                                    value={dataTarefa}
                                    onChange={SetDataNovaTarefa}
                                />
                                {dataTarefa && (
                                    <h3>Data selecionada: {dataTarefa.toLocaleDateString()}</h3>
                                )}
                                <motion.button
                                    whileHover={{ scale: 1.05 }} 
                                    whileTap={{ scale: 0.8 }}
                                    onClick={() => setEscolherDataTarefa(false)}
                                >
                                    {carregando && <ClipLoader size={10} color="#0B0E31" />}
                                    <span 
                                        style={{ 
                                            marginLeft: carregando ? '8px' : '0'
                                        }}
                                    ></span>
                                    Selecionar
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
                    )}
                </div>
            </div>
        );
    }
}