// import Image from "next/image";
import styles from "./RenovacaoPopUp.module.scss";
import * as motion from "motion/react-client";
import { useEffect, useState } from "react";
// import { ClipLoader } from "react-spinners";

export default function RenovacaoPopUp() {
    const [isMobile, setIsMobile] = useState(false);
    const [dataNovaTarefa] = useState<Date | null>(new Date);
    
    useEffect(() => {
        const largura = window.innerWidth;
        setIsMobile(largura <= 1024);
    }, []);


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
                        <h2>Alterar Renovação</h2>
                        <div>
                            <div className={styles.containerDataFinal}>
                                    <p>
                                        Próxima Renovação do Em 
                                    </p>
                                    <div 
                                        className={styles.inputDataFinal}
                                        style={{marginTop: '0px'}}
                                    >
                                        {dataNovaTarefa && (<strong>{dataNovaTarefa.toLocaleDateString()}</strong>)} 
                                    </div>
                            </div>
                        </div>
                        <button>Cancelar Renovação</button>
                    </div>
                </div>
            </div>
        </div>
    );

}