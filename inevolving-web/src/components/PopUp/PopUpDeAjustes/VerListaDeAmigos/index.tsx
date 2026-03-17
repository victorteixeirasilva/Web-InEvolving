import Image from "next/image";
import styles from "./VerListaDeAmigos.module.scss";
import * as motion from "motion/react-client";
import { useEffect, useState } from "react";
// import { ClipLoader } from "react-spinners";
// import { useRouter } from "next/navigation";
// import { linkApi } from "../../../../constants";

export default function VerListaDeAmigos() {
    const [isMobile, setIsMobile] = useState(false);       
    const [email, setEmail] = useState<string>("");
    
    useEffect(() => {
        const largura = window.innerWidth;
        setIsMobile(largura <= 1024);
        // setCarregando(false)
        // setEmail("victoremail")
        // setNomeUsuario("usuarioteste")
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
                        <h2>Lista de Amigos</h2>
                            <div className={styles.inputEmail}>
                                <div className={styles.input}>
                                    <input 
                                        type="text"
                                        id="email"
                                        value={email}
                                        onChange={(e) => setEmail(e.target.value)}
                                        placeholder={"Digite um e-mail do amigo..."}
                                    />
                                    <Image
                                        className={styles.lapis} 
                                        src="/iconeLapisCinza.svg"
                                        alt="Icone Lapis"
                                        width={15}
                                        height={15}
                                    />
                                </div>
                                <button>Adicionar</button>
                            </div>
                            <div className={styles.listaDeAmigos}>
                                <div className={styles.amigo}>
                                    <div className={styles.nomeEmail}>
                                        <h3>
                                            Victor Teixeira Silva
                                        </h3>
                                        <p>
                                            victorteixeira2308@gmail.com
                                        </p>
                                    </div>
                                    <button>Remover Amigo</button>
                                </div>
                                <div className={styles.amigo}>
                                    <div className={styles.nomeEmail}>
                                        <h3>
                                            Victor Teixeira Silva
                                        </h3>
                                        <p>
                                            victorteixeira2308@gmail.com
                                        </p>
                                    </div>
                                    <button>Remover Amigo</button>
                                </div>
                                <div className={styles.amigo}>
                                    <div className={styles.nomeEmail}>
                                        <h3>
                                            Victor Teixeira Silva
                                        </h3>
                                        <p>
                                            victorteixeira2308@gmail.com
                                        </p>
                                    </div>
                                    <button>Remover Amigo</button>
                                </div>
                            </div>
                    </div>
                </div>
            </div>
        </div>
    );

}