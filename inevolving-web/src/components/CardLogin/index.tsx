'use client';

import Image from 'next/image';
import styles from './cardLogin.module.scss';
import BotaoLogin from '../BotaoLogin';
import { useState } from 'react';
import EsqueciSenha from '../PopUp/esqueciSenha';

export default function CardLogin() {
    const [verPopUpEsqueceuSenha, setVerPopUpEsqueceuSenha] = useState(false);

    return (
        <>
        <div className={styles.cardLogin}>
            <div className={styles.containerCardLogin}>                
                <Image 
                    src="logo/logo-svg.svg"
                    alt='logo'
                    width={86}
                    height={86}
                />  
                <h1 className={styles.bemVindoDeVolta}>
                    Bem-vindo<br/> 
                    de volta!
                </h1>
                <p className={styles.subtituloLogin}>
                    Acesse sua conta agora<br/> 
                    mesmo
                </p>
                <div className={styles.containerBotaoLogin}>
                    <BotaoLogin texto='Entrar' tipo='1' />
                    <a onClick={
                        () => {
                            setVerPopUpEsqueceuSenha(true); 
                        }
                    }>
                        Esqueci minha senha
                    </a>
                </div>
            </div>
        </div>
        {verPopUpEsqueceuSenha && (
            <EsqueciSenha voltar={() => setVerPopUpEsqueceuSenha(false)}/>
        )}
        </>
    );
}
