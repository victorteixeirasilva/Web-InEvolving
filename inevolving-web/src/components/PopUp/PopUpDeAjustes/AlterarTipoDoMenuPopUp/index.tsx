// import Image from "next/image";
import styles from "./AlterarTipoDoMenuPopUp.module.scss";
import * as motion from "motion/react-client";
import Image from "next/image";
import { useEffect, useState } from "react";
// import { ClipLoader } from 'react-spinners';
// import VerListaDeTarefas from "../../VerListaDeTarefas";

export default function AlterarTipoDoMenuPopUp() {
    const [isMobile, setIsMobile] = useState(false);
    
    const [tipoMenuDesk, setTipoMenuDesk] = useState<number>(0);

    useEffect(() => {
        const largura = window.innerWidth;
        setIsMobile(largura <= 1024);
        setTipoMenuDesk(
            localStorage.getItem('tipoMenuDesk') ? 
            parseInt(localStorage.getItem('tipoMenuDesk') as string) : 1
        );
    }, []);

    // const [carregando, setCarregando] = useState(false);
    // const [jwtToken, setJwtToken] = useState('');

    // useEffect(() => {
    //     const token = localStorage.getItem('token');
    //     setJwtToken(token ?? '');
    // }, []);
    

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
                        <h2>Alterar Tipo Do Menu</h2>
                        <div className={styles.inputs}>
                            <h3>Selecione o Menu que deixe mais agradavel pra você!</h3>
                            <motion.div 
                                className={styles.inputDescrição}
                                whileHover={{ scale: 1.02 }} 
                                whileTap={{ scale: 0.95 }}
                                onClick={() => {
                                    const novoTipo = 2;
                                    localStorage.setItem('tipoMenuDesk', novoTipo.toString());
                                    window.location.reload();
                                }} 
                            >
                                <div 
                                    className={styles.inputStatus}
                                    style={
                                        tipoMenuDesk === 2 ? { 
                                            color: '#0b0e31',
                                            border: 'solid 3px #0b0e31' 
                                        } : {}
                                    }
                                >
                                    <p style={tipoMenuDesk === 2 ? { color: '#0b0e31' } : {}}>
                                        Menu Tipo 1
                                    </p>
                                    <Image
                                        src="/tipoMenu01.png"
                                        alt='Imagem de Exemplo do Menu tipo 01'
                                        width={isMobile ? 200 : 300}
                                        height={isMobile ? 200 : 300}
                                        style={{marginBottom: "20px"}}
                                    />
                                </div>
                            </motion.div>
                            <motion.div 
                                style={{marginTop: "20px"}}
                                className={styles.inputDescrição}
                                whileHover={{ scale: 1.02 }} 
                                whileTap={{ scale: 0.95 }}
                                onClick={() => {
                                    const novoTipo = 1;
                                    localStorage.setItem('tipoMenuDesk', novoTipo.toString());
                                    window.location.reload();
                                }} 
                            >
                                <div 
                                    className={styles.inputStatus}
                                    style={
                                        tipoMenuDesk === 1 ? { 
                                            color: '#0b0e31',
                                            border: 'solid 3px #0b0e31' 
                                        } : {}
                                    }
                                >
                                    <p style={
                                        tipoMenuDesk === 1 ? { 
                                            color: '#0b0e31'
                                        } : {}}
                                    >
                                        Menu Tipo 2
                                    </p>
                                    <Image
                                        src="/tipoMenu02.png"
                                        alt='Imagem de Exemplo do Menu tipo 02'
                                        width={isMobile ? 200 : 300}
                                        height={isMobile ? 200 : 300}
                                        style={{marginBottom: "20px"}}
                                    />
                                </div>
                            </motion.div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}