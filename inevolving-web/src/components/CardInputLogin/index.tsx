'use client';

import { useEffect, useState } from 'react';
import Image from 'next/image';
import styles from './cardInputLogin.module.scss';
import BotaoLogin from '../BotaoLogin';
import InputEmail from '../InputEmail';
import { useRouter } from 'next/navigation';
import { ClipLoader } from 'react-spinners';
import { motion } from "motion/react";


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


    const handleLogin = async () => {
        setCarregando(true);

        const response = await fetch('https://api.inevolving.inovasoft.tech/api/authentication/login', {
            method: 'POST',
            headers: {
            'Content-Type': 'application/json',
            },
            body: JSON.stringify({ email, password: senha }),
        });

        const data = await response.json();

        if (response.status === 401){
            setCarregando(false);
            router.push('/login');
            alert('Você não está logado, por favor faça login novamente.');
        }

        if (response.ok){

            // Armazena no localStorage
            localStorage.setItem('token', data.BearerToken);
            localStorage.setItem('visionBordUrl', data.urlVisionBord);

            // Redireciona para o dashboard ou outra rota
            setCarregando(false);
            router.push('/dashboard');
        } else {
            alert(data.message);
            console.error('Erro no login:', data.message);
        }
    };

    return (
        <>
        {!isMobile && (
            <div className={styles.cardRegistro}>
                <div className={styles.container}>
                    <h1>
                        Login
                    </h1>
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
                    
                    <InputEmail tema="escuro" tipo="email" value={email} onChange={setEmail} />
                    
                    <InputEmail tema="escuro" tipo="senha" value={senha} onChange={setSenha} />
                    
                    <div className={styles.esqueciSenhaContainer}>
                        <a href="/desculpa">
                            Esqueci minha senha
                        </a>
                    </div>

                    <BotaoLogin 
                        carregando={carregando} 
                        texto={carregando ? 'Entrando...' : 'Entrar'} 
                        tipo='3' 
                        onClick={handleLogin}
                    />

                    <div className={styles.naoTemConta}>
                        Não tem uma conta? 
                        <strong>
                            {/* eslint-disable-next-line @next/next/no-html-link-for-pages */}
                            <a href="/">
                                Cadastre-se
                            </a>
                        </strong>
                    </div>
                </div>
            </div>
        )}
        {isMobile && (
            <div className={styles.mobile}>
                <div className={styles.container}>
                    <h1>
                        Login
                    </h1>
                    
                    <InputEmail tema="escuro" tipo="email" value={email} onChange={setEmail} />
                    
                    <InputEmail tema="escuro" tipo="senha" value={senha} onChange={setSenha} />
                    
                    <div className={styles.esqueciSenhaContainer}>
                        <a href="/desculpa">
                            Esqueci minha senha
                        </a>
                    </div>

                    <motion.button 
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
                    </motion.button>

                    <div className={styles.naoTemConta}>
                        Não tem uma conta? 
                        <strong>
                            <a href="/cadastro">
                                Cadastre-se
                            </a>
                        </strong>
                    </div>
                </div>
            </div>
        )}
        </>
    );
} 