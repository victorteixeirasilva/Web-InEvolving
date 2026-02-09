'use client';

import { useEffect, useState } from 'react';
import Image from 'next/image';
import styles from './cardInputCadastro.module.scss';
import InputEmail from '../InputEmail';
// import { useRouter } from 'next/navigation';
import { motion } from "motion/react";
import { ClipLoader } from 'react-spinners';
import { linkApi } from '../../constants';
import ObrigadoPorSeCadastrar from '../PopUp/ObrigadoPorSeCadastrar';


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

    // const router = useRouter();

    // const [asSenhasNaoCoincidem, setAsSenhasNaoCoincidem] = useState<boolean>(false);
    const [obrigadoPorCadastrar, setObrigadoPorCadastrar] = useState<boolean>(false);
    const [mensagemDeErro, setMensagemDeErro] = useState<string>("");

    const handleCadastro = async () => {
        
        setCarregando(true);
        
        if (senha !== confirmarSenha) {
            setCarregando(false);
            setMensagemDeErro("As senhas precisam ser iguais!")
            return;
        }
        
        const response = await fetch(
           linkApi + '/api/authentication/register', 
        {
            method: 'POST',
            headers: {
            'Content-Type': 'application/json',
            },
            body: JSON.stringify({ email, password: senha }),
        });

        const data = await response.json();

        if (response.ok) {
            // router.push('/login');
            setCarregando(false);
            setObrigadoPorCadastrar(true);
        } else {
            setCarregando(false);
            setMensagemDeErro(data.message)
            // alert(`Erro: ${data.message || 'Erro ao cadastrar'}`);
        }

    };
    
    return (
        <>
            <div className={isMobile ? styles.mob : styles.cardRegistro}>
                <motion.div 
                    className={styles.container}
                    initial={isMobile ? { opacity: 0, scale: 0.5 } : {}}
                    animate={isMobile ? { opacity: 1, scale: 1 } : {}}
                    transition={isMobile ? {
                        duration: 0.5,
                        delay: 0.05,
                        ease: [0, 0.71, 0.2, 1.01],
                    } : {}}
                >
                    <h1>
                        Criar conta
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
                    
                    <InputEmail tema="escuro" tipo="senha" value={confirmarSenha} onChange={setConfirmarSenha} />
                    <motion.p
                        style={
                            {
                                display: "flex",
                                width: "100%",
                                textAlign: "start",
                                marginLeft: "25px",
                                color: "red"
                            }
                        }
                        initial={{ opacity: 0, scale: 0.5 }}
                        animate={{ opacity: 1, scale: 1 }}
                    >
                        {mensagemDeErro && (
                            mensagemDeErro
                        )}
                    </motion.p>
                    {/* {asSenhasNaoCoincidem && (
                        )
                    } */}
                    
                    {/* <InputEmail tema="escuro" tipo="telefone" value={telefone} onChange={setTelefone} /> */}

                    <p>
                        
                    </p>


                    <motion.button 
                        whileTap={{ scale: 0.8 }}
                        disabled={carregando} 
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
                            {carregando ? 'Cadastrando...' : 'Cadastrar'}
                        </span>
                    </motion.button>
                </motion.div>
            </div>
            {obrigadoPorCadastrar && (
                <ObrigadoPorSeCadastrar />
            )}
        </>
    );

} 