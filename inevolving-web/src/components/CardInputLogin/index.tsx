'use client';

import { useEffect, useState } from 'react';
import Image from 'next/image';
import styles from './cardInputLogin.module.scss';
import BotaoLogin from '../BotaoLogin';
import InputEmail from '../InputEmail';
import { useRouter } from 'next/navigation';
import { ClipLoader } from 'react-spinners';
import { motion } from "motion/react";
import EsqueciSenha from '../PopUp/esqueciSenha';
import ConfirmeEmail from '../PopUp/confirmeEmail';
import { linkApi } from '../../constants';


export default function CardInputLogin() {
    const [isMobile, setIsMobile] = useState(false);
    
    useEffect(() => {
        const largura = window.innerWidth;
        setIsMobile(largura <= 1024);
    }, []);

    const [email, setEmail] = useState('');
    const [senha, setSenha] = useState('');
    const router = useRouter();
    const [carregando, setCarregando] = useState(false);
    const [verPopUpEsqueceuSenha, setVerPopUpEsqueceuSenha] = useState(false);
    const [verPopUpConfrimEmail, setVerPopUpConfrimEmail] = useState(false);


    const handleLogin = async () => {
        setCarregando(true);

        const response = await fetch(
            linkApi + '/api/authentication/login', 
            {
                method: 'POST',
                headers: {
                'Content-Type': 'application/json',
                },
                body: JSON.stringify({ email, password: senha }),
            }
        );

        const data = await response.json();

        if (response.ok){

            // Armazena no localStorage
            localStorage.setItem('token', data.BearerToken);
            localStorage.setItem('visionBordUrl', data.urlVisionBord);

            // Redireciona para o dashboard ou outra rota
            setCarregando(false);
            router.push('/dashboard');
        } else {
            if (data.message === "Confirme seu email, para fazer login.") {
                setVerPopUpConfrimEmail(true);
            }
        }
    };

    return (
        <>
            <div className={isMobile ? styles.mobile : styles.cardRegistro}>
                <motion.div className={styles.container}
                    initial={isMobile ? { opacity: 0, scale: 0.5 } : {}}
                    animate={isMobile ? { opacity: 1, scale: 1 } : {}}
                    transition={isMobile ? {
                        duration: 0.5,
                        delay: 0.05,
                        ease: [0, 0.71, 0.2, 1.01],
                    } : {}}
                >
                    <h1>
                        Login
                    </h1>

                    {!isMobile && (
                        <div className={styles.subtitulo}>
                            <p>       
                                Preencha com seus dados
                            </p>
                            <Image 
                                src="/dados.svg"
                                alt='Selo de dados'
                                width={11}
                                height={13}
                                />
                        </div>
                    )}
                    
                    <InputEmail tema="escuro" tipo="email" value={email} onChange={setEmail} />
                    
                    <InputEmail tema="escuro" tipo="senha" value={senha} onChange={setSenha} />
                    
                    <div className={styles.esqueciSenhaContainer}>
                        <a onClick={
                            () => {
                                setVerPopUpEsqueceuSenha(true); 
                            }
                        }>
                            Esqueci minha senha
                        </a>
                    </div>

                    {!isMobile ? (
                            <BotaoLogin 
                                carregando={carregando} 
                                texto={carregando ? 'Entrando...' : 'Entrar'} 
                                tipo='3' 
                                onClick={handleLogin}
                            />
                        ) : 
                        (<motion.button 
                            whileTap={{ scale: 0.8 }}
                            disabled={carregando} 
                            type="submit" 
                            className={styles.botaoGrande} 
                            onClick={handleLogin}
                        >
                            {carregando && <ClipLoader size={10} color="#ffffff" />}
                            <span 
                                style={{ 
                                    marginLeft: carregando ? '8px' : '0'
                                }}
                            >
                                {carregando ? 'Entrando...' : 'Entrar'}
                            </span>
                        </motion.button>)
                    }

                    <div className={styles.naoTemConta}>
                        Não tem uma conta? 
                        <strong>
                            {/* eslint-disable-next-line @next/next/no-html-link-for-pages */}
                            <a href="/">
                                Cadastre-se
                            </a>
                        </strong>
                    </div>
                </motion.div>
            </div>
            {verPopUpEsqueceuSenha && (
                <EsqueciSenha voltar={() => setVerPopUpEsqueceuSenha(false)}/>
            )}
            {verPopUpConfrimEmail && (
                <ConfirmeEmail voltar={() => setVerPopUpConfrimEmail(false)}/>
            )}
        </>
    );

    // {!isMobile && (
    // )}
    // {isMobile && (
    //     <>
    //     <motion.div 
    //         className={styles.mobile}
    //     >
    //         <motion.div className={styles.container}
    //             initial={{ opacity: 0, scale: 0.5 }}
    //             animate={{ opacity: 1, scale: 1 }}
    //             transition={{
    //                 duration: 0.5,
    //                 delay: 0.05,
    //                 ease: [0, 0.71, 0.2, 1.01],
    //             }}
    //         >
    //             <h1>
    //                 Login
    //             </h1>
                
    //             <InputEmail tema="escuro" tipo="email" value={email} onChange={setEmail} />
                
    //             <InputEmail tema="escuro" tipo="senha" value={senha} onChange={setSenha} />
                
    //             <div className={styles.esqueciSenhaContainer}>
    //                 <a onClick={
    //                     () => {
    //                        setVerPopUpEsqueceuSenha(true); 
    //                     }
    //                 }>
    //                     Esqueci minha senha
    //                 </a>
    //             </div>

    //             <motion.button 
    //                 whileTap={{ scale: 0.8 }}
    //                 disabled={carregando} 
    //                 type="submit" 
    //                 className={styles.botaoGrande} 
    //                 onClick={handleLogin}
    //             >
    //                 {carregando && <ClipLoader size={10} color="#ffffff" />}
    //                 <span 
    //                     style={{ 
    //                         marginLeft: carregando ? '8px' : '0'
    //                     }}
    //                 >
    //                     {carregando ? 'Entrando...' : 'Entrar'}
    //                 </span>
    //             </motion.button>

    //             <div className={styles.naoTemConta}>
    //                 Não tem uma conta? 
    //                 <strong>
    //                     <a href="/cadastro">
    //                         Cadastre-se
    //                     </a>
    //                 </strong>
    //             </div>
    //         </motion.div>
    //     </motion.div>
    //     {verPopUpEsqueceuSenha && (
    //         <EsqueciSenha voltar={() => setVerPopUpEsqueceuSenha(false)}/>
    //     )}
    //     {verPopUpConfrimEmail && (
    //         <ConfirmeEmail voltar={() => setVerPopUpConfrimEmail(false)}/>
    //     )}
    //     </>
    // )}
    // </>
} 