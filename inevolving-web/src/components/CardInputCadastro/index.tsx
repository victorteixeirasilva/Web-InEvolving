'use client';

import { useEffect, useState } from 'react';
import Image from 'next/image';
import styles from './cardInputCadastro.module.scss';
import BotaoLogin from '../BotaoLogin';
import InputEmail from '../InputEmail';
import { useRouter } from 'next/navigation';
import { motion } from "motion/react";
import { ClipLoader } from 'react-spinners';


export default function CardInputCadastro({ preEmail }: { preEmail?: string }) {
    const [isMobile, setIsMobile] = useState(false);
    const [carregando, setCarregando] = useState(false);
        
    useEffect(() => {
        const largura = window.innerWidth;
        setIsMobile(largura <= 1024);
    }, []);

    const [email, setEmail] = useState(preEmail || '');
    const [senha, setSenha] = useState('');
    const [confirmarSenha, setConfirmarSenha] = useState('');
    const [telefone, setTelefone] = useState('');

    const router = useRouter();

    const handleCadastro = async () => {
        setCarregando(true);
        if (senha !== confirmarSenha) {
            alert('As senhas não coincidem');
            setCarregando(false);
            return;
        }
        const response = await fetch('https://api.inevolving.inovasoft.tech/api/authentication/register', {
            method: 'POST',
            headers: {
            'Content-Type': 'application/json',
            },
            body: JSON.stringify({ email, password: senha }),
        });

        const data = await response.json();

        if (response.status === 401){
            router.push('/login');
            alert('Você não está logado, por favor faça login novamente.');
        }

        if (response.ok) {
            if (response.status === 200) {
                router.push('/login');
                setCarregando(false);
            }
        } else {
            setCarregando(false);
            alert(`Erro: ${data.message || 'Erro ao cadastrar'}`);
        }

    };
    
    if (isMobile) {
        return (
            <div className={styles.mob}>
                    <motion.div 
                        className={styles.container}
                        initial={{ opacity: 0, scale: 0.5 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{
                            duration: 0.5,
                            delay: 0.05,
                            ease: [0, 0.71, 0.2, 1.01],
                        }}
                    >
                        <h1>
                            Criar conta
                        </h1>
                        
                        <InputEmail tema="escuro" tipo="email" value={email} onChange={setEmail} />
                        
                        <InputEmail tema="escuro" tipo="senha" value={senha} onChange={setSenha} />
                        
                        <InputEmail tema="escuro" tipo="senha" value={confirmarSenha} onChange={setConfirmarSenha} />
                        
                        {/* <InputEmail tema="escuro" tipo="telefone" value={telefone} onChange={setTelefone} /> */}
        
                        <p>
                            
                        </p>
        

                        <motion.button 
                            whileTap={{ scale: 0.8 }}
                            // disabled={carregando} 
                            type="submit" 
                            className={styles.botaoGrande} 
                            onClick={handleCadastro}
                        >
                        {carregando && <ClipLoader size={10} color="#ffffff" />}
                        <span 
                            style={{ 
                                marginLeft: carregando ? '8px' : '0'
                            }}
                        >
                            {carregando ? 'Entrando...' : 'Entrar'}
                        </span>
                        Concluido
                    </motion.button>
                        
                    </motion.div>
            </div>
        );
    } else {
        return (
            <div className={styles.cardRegistro}>
                <div className={styles.container}>
                    <h1>
                        Criar conta
                    </h1>
                    <div className={styles.subtitulo}>
                        <p>       
                            Preencha com seus dados
                        </p>
                        <Image 
                            src="dados.svg"
                            alt='Selo de dados'
                            width={11}
                            height={13}
                        />
                    </div>
                    
                    <InputEmail tema="escuro" tipo="email" value={email} onChange={setEmail} />
                    
                    <InputEmail tema="escuro" tipo="senha" value={senha} onChange={setSenha} />
                    
                    <InputEmail tema="escuro" tipo="senha" value={confirmarSenha} onChange={setConfirmarSenha} />
                    
                    <InputEmail tema="escuro" tipo="telefone" value={telefone} onChange={setTelefone} />
    
                    <p>
                        
                    </p>
    
                    <BotaoLogin texto='Concluido' tipo='3' onClick={handleCadastro}/>
                    
                </div>
            </div>
        );
    }

} 