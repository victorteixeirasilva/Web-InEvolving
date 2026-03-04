import Image from "next/image";
import styles from "./EditarObjetivo.module.scss";
import * as motion from "motion/react-client";
import { useEffect, useState } from "react";
import { ClipLoader } from "react-spinners";
// import { useRouter } from "next/navigation";
// import { linkApi } from "../../../../constants";

export default function AlterarInformacoesDoUsuario() {
    const [isMobile, setIsMobile] = useState(false);
        
    
    const [nomeUsuario, setNomeUsuario] = useState<string>("");
    const [novoNomeUsuario, setNovoNomeUsuario] = useState<string>("");
    const [email, setEmail] = useState<string>("");
    const [novoEmail, setNovoEmail] = useState<string>("");
    const [carregando, setCarregando] = useState(false);
    
    useEffect(() => {
        const largura = window.innerWidth;
        setIsMobile(largura <= 1024);
        setCarregando(false)
        setEmail("victoremail")
        setNomeUsuario("usuarioteste")
    }, []);
    // const router = useRouter();


    return (
        <div className={isMobile ? styles.mob : ''}>
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
                    </div>
                    <div className={styles.conteudo}>
                        <Image 
                            src="/iconeMinhaConta.svg"
                            alt="Icone Minha Conta"
                            width={72}
                            height={72}
                            className={styles.icone}
                        />
                        <h2>Editar Informações Do Usuário</h2>
                        <div className={styles.inputs}>
                            <div className={styles.inputObjetivo}>
                                <h3>Nome do Usuário</h3>
                                <div className={styles.input}>
                                    <input
                                        type="text"
                                        id="nomeUsuario"
                                        value={novoNomeUsuario}
                                        onChange={(e) => setNovoNomeUsuario(e.target.value)}
                                        placeholder={novoNomeUsuario ? novoNomeUsuario : "Digite o seu nome..."}
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
                                <h3>Email</h3>
                                <div className={styles.input}>
                                    <input 
                                        type="text"
                                        id="email"
                                        value={novoEmail}
                                        onChange={(e) => setNovoEmail(e.target.value)}
                                        placeholder={novoEmail ? novoEmail : "Digite um e-mail valido..."}
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
                                    nomeUsuario === "" && 
                                    nomeUsuario === novoNomeUsuario &&
                                    email === novoEmail ? 
                                    { backgroundColor: '#E0E0E0', cursor: 'not-allowed' } : 
                                    {}
                            }
                            onClick={() => 
                                    nomeUsuario === "" && 
                                    nomeUsuario === novoNomeUsuario &&
                                    email === novoEmail ? 
                                    undefined :
                                    alert('sss')
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