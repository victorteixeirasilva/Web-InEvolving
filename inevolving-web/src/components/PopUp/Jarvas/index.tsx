import Image from "next/image";
import styles from "./EditarObjetivo.module.scss";
import * as motion from "motion/react-client";
import { useCallback, useEffect, useState } from "react";
// import { ClipLoader } from 'react-spinners';
import { Objective } from '@/components/interfaces/Objective';
import { ClipLoader } from "react-spinners";
import ReactMarkdown from 'react-markdown';


export default function Jarvas( { voltar, objetivo }: { voltar:() => void, objetivo:Objective } ) {
    
    const [isMobile, setIsMobile] = useState(false);
    const [neuroKeys, setNeuroKeys] = useState(0);
    const [conteudo, setCoteudo] = useState("");
    
    useEffect(() => {
        const largura = window.innerWidth;
        setIsMobile(largura <= 1024);
    }, []);


    const [carregando, setCarregando] = useState(false);
    

    const getNeuroKeys = useCallback(async () => {
            setCarregando(true);

            const response = await fetch(
                'https://api.inevolving.inovasoft.tech/auth/api/user/neurokeys', 
            {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': 'Bearer ' + localStorage.getItem('token')
                    },
            });
        
        
            if (!response.ok){
                setCarregando(false);
                alert('Erro ao buscar NeuroKeys');
            }
            
            setCarregando(false);
            setNeuroKeys(await response.json());
            // voltar();
    }, [])

    useEffect(() => {
        getNeuroKeys();
    }, [getNeuroKeys]);

    const handleIniciarAnalise = async () => {
        setCarregando(true);

        const response = await fetch(
            'https://api.inevolving.inovasoft.tech/auth/api/user/neurokeys', 
        {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': 'Bearer ' + localStorage.getItem('token')
                },
        });
    
    
        if (!response.ok){
            setCarregando(false);
            alert('Erro ao deletar NeuroKeys');
            return;
        }
        
        if (response.status === 200) {            
        
            const response = await fetch(
                'https://api.inevolving.inovasoft.tech/auth/api/dashboard/ia', 
            {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': 'Bearer ' + localStorage.getItem('token')
                    },
                    body: JSON.stringify({
                        id: objetivo.id,
                        nameObjective: objetivo.nameObjective,
                        descriptionObjective: objetivo.descriptionObjective,
                        statusObjective: objetivo.statusObjective,
                        completionDate: objetivo.completionDate,
                        idUser: objetivo.idUser,
                        totNumberTasks: objetivo.totNumberTasks,
                        numberTasksToDo: objetivo.numberTasksToDo,
                        numberTasksDone: objetivo.numberTasksDone,
                        numberTasksInProgress: objetivo.numberTasksInProgress,
                        numberTasksOverdue: objetivo.numberTasksOverdue,
                        numberTasksCancelled: objetivo.numberTasksCancelled,
                        percentageTasksToDo: objetivo.percentageTasksToDo,
                        percentageTasksDone: objetivo.percentageTasksDone,
                        percentageTasksInProgress: objetivo.percentageTasksInProgress,
                        percentageTasksOverdue: objetivo.percentageTasksOverdue,
                        percentageTasksCancelled: objetivo.percentageTasksCancelled,
                    })
                    
            });
        
        
            if (!response.ok){
                setCarregando(false);
                alert('Erro ao solicitar analise NeuroKeys');
                return;
            }

            if (response.ok) {
                setCarregando(false);
                try {
                    const data = await response.json();
                    setCoteudo(data.choices[0].message.content);
                    console.log("Conteúdo:", conteudo);
                } catch (error) {
                  console.error("Erro ao parsear JSON:", error);
                }
            }

        }
    }

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
                            onClick={voltar}
                        >
                            <strong>X</strong>
                        </motion.button>
                    </div>
                    <h2>Olá eu sou o Jarvas!</h2>
                    <div className={styles.conteudo}>
                        <div>
                            <Image
                                src="/AvatarDoJarvas.png"
                                alt="Jarvas"
                                width={300}
                                height={600}
                            />
                        </div>
                        <div>
                            {carregando && <ClipLoader size={60} color="#0B0E31" />}
                            {!carregando && neuroKeys >= 1 ? (
                                <>
                                    {conteudo ? (
                                        <>
                                            {carregando && <ClipLoader size={60} color="#0B0E31" />}
                                            <div className={styles.conteudoJarvas}>
                                                <section className={styles.cardJarvas}>
                                                    <ReactMarkdown>{conteudo}</ReactMarkdown>
                                                </section>
                                            </div>                                            
                                        </>
                                    ) : (
                                        <>
                                                <h3>
                                                    Hmmmm... Deixa eu ver...
                                                </h3>
                                                <p>
                                                    <br />
                                                    <br />
                                                    Eu posso te ajudar a melhorar sua produtividade, e evoluir no seu objetivo ({objetivo.nameObjective}).
                                                    <br />
                                                    <br />
                                                    Só preciso que você use uma das suas NeuroKeys para desbloquear a analise, estou ansioso para te ajudar!
                                                </p>
                                                <div className={styles.cardNeuroKey}>
                                                    <p>
                                                        Você possui: {neuroKeys/2} NeuroKeys
                                                    </p> 
                                                </div>
                                                <motion.div 
                                                    whileHover={{ scale: 1.1 }} 
                                                    whileTap={{ scale: 0.8 }}
                                                    className={styles.IniciarAnalise}
                                                    onClick={handleIniciarAnalise}
                                                >
                                                    <p>
                                                        Clique aqui para iniciar!
                                                    </p> 
                                                </motion.div>
                                        </>
                                    )}
                                </>
                            ) : (
                                <>
                                {!carregando && (
                                    <>
                                    <h3>
                                        Hmmmm... Deixa eu ver...
                                    </h3>
                                    <p>
                                        <br />
                                        <br />
                                        Eu posso te ajudar a melhorar sua produtividade, e evoluir no seu objetivo ({objetivo.nameObjective}).
                                        <br />
                                        <br />
                                        Só preciso que você use uma das suas NeuroKeys para desbloquear a analise, estou ansioso para te ajudar!
                                        Mas infelizmente você não possui NeuroKeys suficientes, você precisa de pelo menos 1 NeuroKey para iniciar a analise.
                                    </p>
                                    <motion.div
                                        whileHover={{ scale: 1.1 }} 
                                        whileTap={{ scale: 0.8 }} 
                                        className={styles.containerBotao}
                                        onClick={() => {
                                            window.open(
                                                "https://api.whatsapp.com/send/?phone=%2B5511963695485&text&type=phone_number&app_absent=0",
                                                "_blank"
                                            );
                                        }}
                                    >
                                        <Image 
                                            src="/ic_baseline-whatsapp-branco.svg"
                                            alt="Icone Wpp"
                                            width={70}
                                            height={70}
                                            className={styles.icon}
                                        />
                                        <div className={styles.botao}>
                                            Compre NeuroKeys!
                                        </div>
                                    </motion.div>
                                    </>
                                )}
                                </>
                            )}
                        </div>
                    </div>
                </div>
            </div>
            </>
        );
    }
}