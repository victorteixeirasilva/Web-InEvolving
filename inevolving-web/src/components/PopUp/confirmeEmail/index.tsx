import styles from "./EditarObjetivo.module.scss";
import * as motion from "motion/react-client";
import { useEffect, useState } from "react";

export default function ConfirmeEmail( { voltar }: { voltar:() => void } ) {
    const [isMobile, setIsMobile] = useState(false);
    
    useEffect(() => {
        const largura = window.innerWidth;
        setIsMobile(largura <= 1024);
    }, []);


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
                        <h2>E-mail, não confirmado!</h2>
                        <div className={styles.inputs}>
                            <div className={styles.inputObjetivo}>
                                <h3>Confirme o seu e-mail para fazer login!</h3>
                            </div>
                        </div>
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
                            <h2>E-mail, não confirmado!</h2>
                            <div className={styles.inputs}>
                                <div className={styles.inputObjetivo}>
                                    <h3>Confirme o seu e-mail para fazer login!</h3>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}