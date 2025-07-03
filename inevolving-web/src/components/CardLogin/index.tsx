'use client';
/* index.tsx */


import Image from 'next/image';
import styles from './cardLogin.module.scss';
import BotaoLogin from '../BotaoLogin';

export default function CardLogin() {
  return (
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
                <a href='#'>Esqueceu a senha?</a>
            </div>
        </div>
    </div>
  );
}
