import Image from "next/image";
import styles from "./adicionarNovoObjetivoOuCategoria.module.scss";
import * as motion from "motion/react-client";
import { useEffect, useState } from "react";
import AdicionarNovoObjetivo from "../adicionarNovoObjetivo";
import AdicionarNovaCategoria from "../adicionarNovaCategoria";

export default function AdicionarNovoObjetivoOuCategoria() {
    const [isMobile, setIsMobile] = useState(false);
    
    useEffect(() => {
        const largura = window.innerWidth;
        setIsMobile(largura <= 1024);
    }, []);

    const [popUpNovoObjetivo, setPopUpNovoObjetivo] = useState(false);
    const [popUpNovaCategoria, setPopUpNovaCategoria] = useState(false);

    if (!isMobile) {
        return (
            <>
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
                            src="/iconePlus.svg"
                            alt="Icone +"
                            width={72}
                            height={72}
                            className={styles.icone}
                            />
                        <h2>Adicionar novo</h2>
                        <div className={styles.botoes}>
                            <motion.button
                                whileHover={{ scale: 1.1 }} 
                                whileTap={{ scale: 0.8 }}
                                onClick={() => setPopUpNovoObjetivo(true)}
                            >
                                <div className={styles.containerBotoes}>
                                    Objetivo
                                    <Image 
                                        src="/iconeSetaDireitaAzul.svg"
                                        alt="Icone de Seta"
                                        width={10}
                                        height={18}
                                        className={styles.iconeBotao}
                                        />
                                </div>
                            </motion.button>
                            <motion.button
                                whileHover={{ scale: 1.1 }} 
                                whileTap={{ scale: 0.8 }}
                                onClick={() => setPopUpNovaCategoria(true)}
                                >
                                <div className={styles.containerBotoes}>
                                    Categoria
                                    <Image 
                                        src="/iconeSetaDireitaAzul.svg"
                                        alt="Icone de Seta"
                                        width={10}
                                        height={18}
                                        className={styles.iconeBotao}
                                        />
                                </div>
                            </motion.button>
                        </div>
                    </div>
                </div>
            </div>
            {popUpNovoObjetivo && (
                <AdicionarNovoObjetivo />
            )}
            {popUpNovaCategoria && (
                <AdicionarNovaCategoria />
            )}
            </>
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
                                src="/iconePlus.svg"
                                alt="Icone +"
                                width={72}
                                height={72}
                                className={styles.icone}
                                />
                            <h2>Adicionar novo</h2>
                            <div className={styles.botoes}>
                                <motion.button
                                    whileHover={{ scale: 1.1 }} 
                                    whileTap={{ scale: 0.8 }}
                                    onClick={() => setPopUpNovoObjetivo(true)}
                                >
                                    <div className={styles.containerBotoes}>
                                        Objetivo
                                        <Image 
                                            src="/iconeSetaDireitaAzul.svg"
                                            alt="Icone de Seta"
                                            width={10}
                                            height={18}
                                            className={styles.iconeBotao}
                                            />
                                    </div>
                                </motion.button>
                                <motion.button
                                    whileHover={{ scale: 1.1 }} 
                                    whileTap={{ scale: 0.8 }}
                                    onClick={() => setPopUpNovaCategoria(true)}
                                    >
                                    <div className={styles.containerBotoes}>
                                        Categoria
                                        <Image 
                                            src="/iconeSetaDireitaAzul.svg"
                                            alt="Icone de Seta"
                                            width={10}
                                            height={18}
                                            className={styles.iconeBotao}
                                            />
                                    </div>
                                </motion.button>
                            </div>
                        </div>
                    </div>
                </div>
                {popUpNovoObjetivo && (
                    <AdicionarNovoObjetivo />
                )}
                {popUpNovaCategoria && (
                    <AdicionarNovaCategoria />
                )}
            </div>
        );
    }
}