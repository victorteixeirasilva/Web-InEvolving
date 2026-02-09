import styles from "./EditarObjetivo.module.scss";
import * as motion from "motion/react-client";
import { useEffect, useState } from "react";

export default function ObrigadoPorSeCadastrar() {
    const [isMobile, setIsMobile] = useState(false);
    
    useEffect(() => {
        const largura = window.innerWidth;
        setIsMobile(largura <= 1024);
    }, []);


    return (
        <div className={isMobile ? styles.mob : ''}>
            <div className={styles.overlay}>
                <motion.div
                    style={{
                        width: "100%",
                        maxWidth: "1000px",
                        background: "#F4F4FE", // fundo
                        border: "1px solid rgba(11, 14, 49, 0.10)",
                        borderRadius: "30px",
                        padding: "30px 30px",
                        boxShadow: "0 18px 50px rgba(11, 14, 49, 0.10)",
                        overflow: "hidden",
                        position: "relative",
                    }}
                    initial={{ opacity: 0, y: 18, scale: 0.98 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
                >
                    {/* detalhe visual (accent) */}
                    <motion.div
                        style={{
                        position: "absolute",
                        top: 0,
                        left: 0,
                        width: "100%",
                        height: "6px",
                        background: "#E76148",
                        }}
                        initial={{ scaleX: 0, transformOrigin: "left" }}
                        animate={{ scaleX: 1 }}
                        transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1], delay: 0.05 }}
                    />

                    {/* badge/ícone simples */}
                    <motion.div
                        style={{
                        width: "46px",
                        height: "46px",
                        borderRadius: "14px",
                        background: "#0B0E31",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        color: "#F4F4FE",
                        fontWeight: 800,
                        letterSpacing: "0.5px",
                        marginBottom: "14px",
                        boxShadow: "0 10px 24px rgba(11, 14, 49, 0.22)",
                        }}
                        initial={{ opacity: 0, scale: 0.5, rotate: -8 }}
                        animate={{ opacity: 1, scale: 1, rotate: 0 }}
                        transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1], delay: 0.06 }}
                    >
                        IE
                    </motion.div>

                    {/* título */}
                    <motion.p
                        style={{
                        display: "flex",
                        width: "100%",
                        textAlign: "start",
                        marginLeft: "0px",
                        marginTop: "0px",
                        marginBottom: "10px",
                        color: "#0B0E31",
                        fontSize: "26px",
                        lineHeight: "26px",
                        fontWeight: 800,
                        fontFamily: "'Inter', sans-serif",
                        }}
                        initial={{ opacity: 0, scale: 0.5 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.42, ease: [0.16, 1, 0.3, 1], delay: 0.08 }}
                    >
                        Obrigado por se cadastrar!
                    </motion.p>

                    {/* texto principal */}
                    <motion.p
                        style={{
                        display: "flex",
                        width: "100%",
                        textAlign: "start",
                        marginLeft: "0px",
                        marginTop: "0px",
                        marginBottom: "14px",
                        color: "rgba(11, 14, 49, 0.82)",
                        fontSize: "16px",
                        lineHeight: "20px",
                        fontWeight: 500,
                        fontFamily: "'Inter', sans-serif",
                        }}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1], delay: 0.12 }}
                    >
                        Antes de começarmos, <span style={{ color: "#0B0E31", fontWeight: 800 }}> confirme seu e-mail </span>{"  "}
                        - clicando no link que acabamos de enviar.
                    </motion.p>

                    {/* checklist (3 passos) */}
                    <motion.div
                        style={{
                        width: "100%",
                        display: "flex",
                        flexDirection: "column",
                        gap: "10px",
                        marginTop: "6px",
                        marginBottom: "16px",
                        fontFamily: "'Inter', sans-serif",
                        fontSize: "16px",
                        }}
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ duration: 0.35, ease: "easeOut", delay: 0.16 }}
                    >
                        {[
                        "Confirme seu e-mail no link enviado.",
                        "Fique atento(a) aos próximos passos no seu e-mail.",
                        "Nossa equipe entrara em contato com você em breve.",
                        ].map((text, index) => (
                        <motion.div
                            key={text}
                            style={{
                            display: "flex",
                            alignItems: "flex-start",
                            gap: "10px",
                            padding: "12px 12px",
                            borderRadius: "14px",
                            fontSize: "16px",
                            background: "rgba(11, 14, 49, 0.04)",
                            border: "1px solid rgba(11, 14, 49, 0.08)",
                            }}
                            initial={{ opacity: 0, x: -10 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{
                            duration: 0.42,
                            ease: [0.16, 1, 0.3, 1],
                            delay: 0.18 + index * 0.08,
                            }}
                        >
                            <div
                            style={{
                                minWidth: "10px",
                                height: "10px",
                                borderRadius: "999px",
                                background: "#E76148",
                                marginTop: "6px",
                            }}
                            />
                            <p
                            style={{
                                margin: 0,
                                color: "rgba(11, 14, 49, 0.85)",
                                fontSize: "13px",
                                lineHeight: "18px",
                                fontWeight: 500,
                            }}
                            >
                            {text}
                            </p>
                        </motion.div>
                        ))}
                    </motion.div>

                    {/* frase final (brand message) */}
                    <motion.p
                        style={{
                        display: "flex",
                        width: "100%",
                        textAlign: "start",
                        marginLeft: "0px",
                        marginTop: "0px",
                        marginBottom: "0px",
                        color: "#0B0E31",
                        fontSize: "14px",
                        lineHeight: "20px",
                        fontWeight: 700,
                        fontFamily: "'Inter', sans-serif",
                        }}
                        initial={{ opacity: 0, scale: 0.98 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1], delay: 0.42 }}
                    >
                        Fique tranquilo(a): estamos conduzindo o caminho para ver seus objetivos se plasmarem na realidade com o {" ! "}
                        <span style={{ color: "#E76148" }}>InEvolving</span>!.
                    </motion.p>
                    <motion.a
                        style={{
                        textDecoration: "none",
                        display: "flex",
                        width: "100%",
                        textAlign: "start",
                        marginLeft: "0px",
                        marginTop: "10px",
                        marginBottom: "0px",
                        color: "#E76148",
                        fontSize: "14px",
                        lineHeight: "20px",
                        fontWeight: 700,
                        fontFamily: "'Inter', sans-serif",
                        cursor: "pointer"
                        }}
                        initial={{ opacity: 0, scale: 0.98 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1], delay: 0.42 }}
                        href="https://inevolving.inovasoft.tech/"
                    >
                        Clique Aqui Para Fazer Login
                    </motion.a>

                    {/* brilho sutil no fundo */}
                    <motion.div
                        style={{
                        position: "absolute",
                        right: "-120px",
                        bottom: "-140px",
                        width: "280px",
                        height: "280px",
                        borderRadius: "999px",
                        background: "rgba(231, 97, 72, 0.14)",
                        filter: "blur(2px)",
                        }}
                        initial={{ opacity: 0, scale: 0.85 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1], delay: 0.15 }}
                    />

                </motion.div>
                {/* <div className={styles.containerPopUp}>
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
                </div> */}
            </div>
        </div>
    );

}