import Image from "next/image";
import styles from "./EditarObjetivo.module.scss";
import * as motion from "motion/react-client";
import { useEffect, useState } from "react";
import { ClipLoader } from 'react-spinners';
import { Objetivo } from '@/components/interfaces/Objetivo';
import { useRouter } from "next/navigation";
import VerListaDeTarefas from "../VerListaDeTarefas";

export default function EditarObjetivo( { objetivo }: { objetivo: Objetivo } ) {
    const [isMobile, setIsMobile] = useState(false);
    
    useEffect(() => {
        const largura = window.innerWidth;
        setIsMobile(largura <= 1024);
    }, []);

    const [nomeObjetivo, setNomeObjetivo] = useState(objetivo.nameObjective);
    const [descricaoObjetivo, setDescricaoObjetivo] = useState(objetivo.descriptionObjective);
    const [carregando, setCarregando] = useState(false);
    const [verTarefas, setVerTarefas] = useState(false);
    const [jwtToken, setJwtToken] = useState('');

    useEffect(() => {
        const token = localStorage.getItem('token');
        setJwtToken(token ?? '');
    }, []);
    
    const [objetivoConcluidoInicial] = useState(objetivo.statusObjective === 'TODO' ? false : true);
    const [objetivoConcluido, setObjetivoConcluido] = useState(objetivoConcluidoInicial);
    const [mostrarBotaoStatus] = useState(!objetivoConcluidoInicial ? true : false);
    
    const salvarObjetivo = async () => {
        setCarregando(true);

        const response = await fetch('https://api.inevolving.inovasoft.tech/auth/api/objectives/' + objetivo.id, {
            method: 'PUT',
            headers: {
                    'Content-Type': 'application/json',
                    'Authorization': 'Bearer ' + jwtToken
            },
            body: JSON.stringify({
                nameObjective: nomeObjetivo !== objetivo.nameObjective ? nomeObjetivo : objetivo.nameObjective,
                descriptionObjective: descricaoObjetivo !== objetivo.descriptionObjective ? descricaoObjetivo : objetivo.descriptionObjective,
            }),
        });

        const data = await response.json();

        if (!response.ok){
            setCarregando(false);
            alert(data.message + " - AO salvar objetivo");
            console.error('Erro ao salvar:', data.message);
        }

        if (!(objetivoConcluidoInicial === objetivoConcluido) && (objetivoConcluido)) {
            const dataFormatada = new Date().toISOString().slice(0, 10);

            const response = await fetch('https://api.inevolving.inovasoft.tech/auth/api/objectives/' + objetivo.id + '/' + dataFormatada, {
                method: 'PATCH',
                headers: {
                        'Content-Type': 'application/json',
                        'Authorization': 'Bearer ' + jwtToken
                },
            });

            const data = await response.json();

            if (!response.ok){
                setCarregando(false);
                alert(data.message + " - AO Concluir objetivo");
                console.error('Erro ao salvar:', data.message);
            }
        }

        setCarregando(false);
        window.location.reload();
    };

    const router = useRouter();


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
                            onClick={() => window.location.reload()}
                        >
                            <strong>X</strong>
                        </motion.button>
                        <motion.button
                            whileHover={{ scale: 1.2 }} 
                            whileTap={{ scale: 0.8 }}
                            className={styles.lixeira}
                            onClick={() => {
                                    if (confirm('Tem certeza que deseja excluir esta categoria?')) {
                                        router.push('/desculpa');
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
                        <h2>Editar Objetivo</h2>
                        <div className={styles.inputs}>
                            <div className={styles.inputObjetivo}>
                                <h3>Objetivo</h3>
                                <div className={styles.input}>
                                    <input
                                        type="text"
                                        id="nomeObjetivo"
                                        value={nomeObjetivo}
                                        onChange={(e) => setNomeObjetivo(e.target.value)}
                                        placeholder={objetivo ? objetivo.nameObjective : "Digite o nome do objetivo..."}
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
                                        placeholder={objetivo ? objetivo.descriptionObjective : "Escreva detalhes sobre o seu objetivo..."}
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
                                className={styles.inputDescrição}
                                whileHover={{ scale: 1.02 }} 
                                whileTap={{ scale: 0.95 }}
                                onClick={
                                    mostrarBotaoStatus ? 
                                        () => setObjetivoConcluido(!objetivoConcluido) 
                                    : 
                                        () => alert('Objetivo já concluído, não pode retornar para "Em progresso"')
                                }   
                            >
                                <h3>Status</h3>
                                <div className={styles.inputStatus}>
                                    <div className={`${styles.slider} ${objetivoConcluido ? styles.right : styles.left}`} />
                                    <p style={!objetivoConcluido ? { color: '#FFFF' } : {}}>
                                        Em progresso
                                    </p>
                                    <p style={objetivoConcluido ? { color: '#0b0e31' } : {}}>
                                        Concluído
                                    </p>
                                </div>
                            </motion.div>
                        </div>
                        <motion.div 
                                className={styles.inputDescrição}
                                whileHover={{ scale: 1.02 }} 
                                whileTap={{ scale: 0.95 }}   
                                onClick={() => {
                                        setVerTarefas(true);
                                    }
                                }     
                        >
                                <h3>Tarefas</h3>
                                <div className={styles.input}>
                                    <p className={styles.place}>Clique para ver tarefas do objetivo</p>
                                </div>
                            </motion.div>
                        <motion.button
                            whileHover={{ scale: 1.05 }} 
                            whileTap={{ scale: 0.8 }}
                            onClick={salvarObjetivo}
                            style={
                                    objetivoConcluidoInicial === objetivoConcluido &&
                                    nomeObjetivo === objetivo.nameObjective && 
                                    descricaoObjetivo === objetivo.descriptionObjective ? 
                                    { backgroundColor: '#E0E0E0', cursor: 'not-allowed' } : 
                                    {}
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
            {verTarefas && (
                <>
                  <VerListaDeTarefas voltar={() => setVerTarefas(false)} objetivoId={objetivo.id} />
                </>
            )}
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
                                onClick={() => window.location.reload()}
                            >
                                <strong style={{color: '#0B0E31'}}>X</strong>
                            </motion.button>
                            <motion.button
                                whileHover={{ scale: 1.2 }} 
                                whileTap={{ scale: 0.8 }}
                                className={styles.lixeira}
                                onClick={() => {router.push('/desculpa');}}
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
                            <h2>Editar Objetivo</h2>
                            <div className={styles.inputs}>
                                <div className={styles.inputObjetivo}>
                                    <h3>Objetivo</h3>
                                    <div className={styles.input}>
                                        <input
                                            type="text"
                                            id="nomeObjetivo"
                                            value={nomeObjetivo}
                                            onChange={(e) => setNomeObjetivo(e.target.value)}
                                            placeholder={objetivo ? objetivo.nameObjective : "Digite o nome do objetivo..."}
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
                                            placeholder={objetivo ? objetivo.descriptionObjective : "Escreva detalhes sobre o seu objetivo..."}
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
                                    className={styles.inputDescrição}
                                    whileHover={{ scale: 1.02 }} 
                                    whileTap={{ scale: 0.95 }}
                                    onClick={
                                        mostrarBotaoStatus ? 
                                            () => setObjetivoConcluido(!objetivoConcluido) 
                                        : 
                                            () => alert('Objetivo já concluído, não pode retornar para "Em progresso"')
                                    }   
                                >
                                    <h3>Status</h3>
                                    <div className={styles.inputStatus}>
                                        <div className={`${styles.slider} ${objetivoConcluido ? styles.right : styles.left}`} />
                                        <p style={!objetivoConcluido ? { color: '#FFFF' } : {}}>
                                            Em progresso
                                        </p>
                                        <p style={objetivoConcluido ? { color: '#0b0e31' } : {}}>
                                            Concluído
                                        </p>
                                    </div>
                                </motion.div>
                            </div>
                            <motion.button
                                whileHover={{ scale: 1.05 }} 
                                whileTap={{ scale: 0.8 }}
                                onClick={salvarObjetivo}
                                style={
                                        objetivoConcluidoInicial === objetivoConcluido &&
                                        nomeObjetivo === objetivo.nameObjective && 
                                        descricaoObjetivo === objetivo.descriptionObjective ? 
                                        { backgroundColor: '#E0E0E0', cursor: 'not-allowed' } : 
                                        {}
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
            </div>
        );
    }
}