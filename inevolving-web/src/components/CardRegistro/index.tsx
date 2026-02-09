import Image from 'next/image';
import styles from './cardRegistro.module.scss';
import BotaoLogin from '../BotaoLogin';
// import InputEmail from '../InputEmail';
// import { useState } from 'react';

export default function CardRegistro() {

    // const [email, setEmail] = useState('');

    return (
        <div className={styles.cardRegistro}>
            <div className={styles.container}>
                <h1>
                    Crie sua conta
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

                {/* <InputEmail tema='claro' tipo='email' value={email} onChange={setEmail}/> */}
                
                {/* <div className={styles.margem}/> */}
                
                <BotaoLogin texto='Iniciar Cadastro' tipo='2' />
            </div>
        </div>
    );
} 