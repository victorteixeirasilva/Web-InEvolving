import Image from "next/image";
import styles from "./EditarObjetivo.module.scss";
import * as motion from "motion/react-client";
import { useEffect, useState } from "react";
import { ClipLoader } from 'react-spinners';
import { linkApi } from "@/constants";

export default function EsqueciSenha( { voltar }: { voltar:() => void } ) {
    const [isMobile, setIsMobile] = useState(false);
    const [email, setEmail] = useState("");
    
    useEffect(() => {
        const largura = window.innerWidth;
        setIsMobile(largura <= 1024);
    }, []);


    const [carregando, setCarregando] = useState(false);
    

    const enviarEmailEsqueciSenha = async () => {
            setCarregando(true);

            const response = await fetch(
                linkApi+'/api/authentication/forgot', 
            {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({
                        userEmail: email
                    })
            });
        
        
            if (!response.ok){
                setCarregando(false);
                alert('Erro ao enviar o email de recuperação');
            }
            
            setCarregando(false);
            voltar();
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
                    <div className={styles.conteudo}>
                        <h2>Esqueceu a Senha?</h2>
                        <div className={styles.inputs}>
                            <div className={styles.inputObjetivo}>
                                <h3>Informe seu e-mail cadastrado, que enviaremos um link para redefinir a sua senha!</h3>
                                <div className={styles.input}>
                                    <input
                                        type="text"
                                        id="email"
                                        value={email}
                                        onChange={(e) => setEmail(e.target.value)}
                                        placeholder="Digite seu email..."
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
                            whileHover={{ scale: 1.05 }} 
                            whileTap={{ scale: 0.8 }}
                            style={ 
                                    email === "" ? 
                                    { backgroundColor: '#E0E0E0', cursor: 'not-allowed' } : 
                                    {}
                            }
                            onClick={() => 
                                email === "" ?
                                undefined :
                                enviarEmailEsqueciSenha()
                            }
                        >
                            {carregando && <ClipLoader size={10} color="#0B0E31" />}
                            <span 
                                style={{ 
                                    marginLeft: carregando ? '8px' : '0'
                                }}
                            ></span>
                            Enviar
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
                                onClick={voltar}
                            >
                                <strong>X</strong>
                            </motion.button>
                        </div>
                        <div className={styles.conteudo}>
                            <h2>Esqueceu a Senha?</h2>
                            <div className={styles.inputs}>
                                <div className={styles.inputObjetivo}>
                                    <h3>Informe seu e-mail cadastrado, que enviaremos um link para redefinir a sua senha!</h3>
                                    <div className={styles.input}>
                                        <input
                                            type="text"
                                            id="email"
                                            value={email}
                                            onChange={(e) => setEmail(e.target.value)}
                                            placeholder="Digite seu email..."
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
                                whileHover={{ scale: 1.05 }} 
                                whileTap={{ scale: 0.8 }}
                                style={ 
                                        email === "" ? 
                                        { backgroundColor: '#E0E0E0', cursor: 'not-allowed' } : 
                                        {}
                                }
                                onClick={() => 
                                    email === "" ?
                                    undefined :
                                    enviarEmailEsqueciSenha()
                                }
                            >
                                {carregando && <ClipLoader size={10} color="#0B0E31" />}
                                <span 
                                    style={{ 
                                        marginLeft: carregando ? '8px' : '0'
                                    }}
                                ></span>
                                Enviar
                            </motion.button>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}