import Image from "next/image";
import styles from "./adicionarNovoObjetivo.module.scss";
import * as motion from "motion/react-client";
import { useEffect, useState } from "react";
import { ClipLoader } from 'react-spinners';
import { useRouter } from "next/navigation";

export default function AdicionarNovoObjetivo() {
    const [isMobile, setIsMobile] = useState(false);
    
    useEffect(() => {
        const largura = window.innerWidth;
        setIsMobile(largura <= 1024);
    }, []);

    const router = useRouter();

    const [nomeObjetivo, setNomeObjetivo] = useState("");
    const [descricaoObjetivo, setDescricaoObjetivo] = useState("");
    const [carregando, setCarregando] = useState(false);
    const [jwtToken, setJwtToken] = useState('');

    useEffect(() => {
        const token = localStorage.getItem('token');
        setJwtToken(token ?? '');
    }, []);

    const handleRegistrarObjetivo = async () => {
        setCarregando(true);

        const response = await fetch('https://api.inevolving.inovasoft.tech/auth/api/objectives', {
            method: 'POST',
            headers: {
                    'Content-Type': 'application/json',
                    'Authorization': 'Bearer ' + jwtToken
            },
            body: JSON.stringify({
                nameObjective: nomeObjetivo,
                descriptionObjective: descricaoObjetivo,
            }),
        });

        const data = await response.json();

        if (response.status === 401){
            setCarregando(false);
            router.push('/login');
            alert('Você não está logado, por favor faça login novamente.');
        }

        if (response.ok){

            setCarregando(false);
            window.location.reload();
        } else {
            setCarregando(false);
            alert(data.message);
            console.error('Erro ao salvar:', data.message);
            // console.error('Erro ao salvar:');
        }
    };

    if (!isMobile) {
        return (
            <div className={styles.overlay}>
                <div className={styles.containerPopUp}>
                    <motion.button
                        whileHover={{ scale: 1.1 }} 
                        whileTap={{ scale: 0.8 }}
                        className={styles.botaoVoltar} 
                        onClick={() => window.location.reload()}
                    >
                        <strong>X</strong>
                    </motion.button>
                    <div className={styles.conteudo}>
                        <Image 
                            src="/iconeObjetivo-NovoObjetivo.svg"
                            alt="Icone Objetivo"
                            width={72}
                            height={72}
                            className={styles.icone}
                        />
                        <h2>Novo Objetivo</h2>
                        <div className={styles.inputs}>
                            <div className={styles.inputObjetivo}>
                                <h3>Objetivo</h3>
                                <div className={styles.input}>
                                    <input
                                        type="text"
                                        id="nomeObjetivo"
                                        value={nomeObjetivo}
                                        onChange={(e) => setNomeObjetivo(e.target.value)}
                                        placeholder="Digite o nome do objetivo..."
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
                                        placeholder="Escreva detalhes sobre o seu objetivo..."
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
                        <motion.button
                            whileHover={{ scale: 1.1 }} 
                            whileTap={{ scale: 0.8 }}
                            onClick={handleRegistrarObjetivo}
                        >
                            {carregando && <ClipLoader size={10} color="#0B0E31" />}
                            <span 
                                style={{ 
                                    marginLeft: carregando ? '8px' : '0'
                                }}
                            ></span>
                            Concluído
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
        );
    } else {
        return (
            <div className={styles.mob}>
                <div className={styles.overlay}>
                    <div className={styles.containerPopUp}>
                        <motion.button
                            whileHover={{ scale: 1.1 }} 
                            whileTap={{ scale: 0.8 }}
                            className={styles.botaoVoltar} 
                            onClick={() => window.location.reload()}
                        >
                            <strong>X</strong>
                        </motion.button>
                        <div className={styles.conteudo}>
                            <Image 
                                src="/iconeObjetivo-NovoObjetivo.svg"
                                alt="Icone Objetivo"
                                width={72}
                                height={72}
                                className={styles.icone}
                            />
                            <h2>Novo Objetivo</h2>
                            <div className={styles.inputs}>
                                <div className={styles.inputObjetivo}>
                                    <h3>Objetivo</h3>
                                    <div className={styles.input}>
                                        <input
                                            type="text"
                                            id="nomeObjetivo"
                                            value={nomeObjetivo}
                                            onChange={(e) => setNomeObjetivo(e.target.value)}
                                            placeholder="Digite o nome do objetivo..."
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
                                            placeholder="Escreva detalhes sobre o seu objetivo..."
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
                            <motion.button
                                whileHover={{ scale: 1.1 }} 
                                whileTap={{ scale: 0.8 }}
                                onClick={handleRegistrarObjetivo}
                            >
                                {carregando && <ClipLoader size={10} color="#0B0E31" />}
                                <span 
                                    style={{ 
                                        marginLeft: carregando ? '8px' : '0'
                                    }}
                                ></span>
                                Concluído
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