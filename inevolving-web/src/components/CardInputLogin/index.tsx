'use client';

import { useState } from 'react';
import Image from 'next/image';
import styles from './cardInputLogin.module.scss';
import BotaoLogin from '../BotaoLogin';
import InputEmail from '../InputEmail';
import { useRouter } from 'next/navigation';

export default function CardInputLogin() {
    const [email, setEmail] = useState('');
    const [senha, setSenha] = useState('');
    const router = useRouter();

    const handleLogin = async () => {
        const response = await fetch('http://127.0.0.1:2327/api/authentication/login', {
            method: 'POST',
            headers: {
            'Content-Type': 'application/json',
            },
            body: JSON.stringify({ email, password: senha }),
        });

        const data = await response.json();

        if (response.ok){

            // Armazena no localStorage
            localStorage.setItem('token', data.BearerToken);
            localStorage.setItem('visionBordUrl', data.urlVisionBord);

            // Redireciona para o dashboard ou outra rota
            router.push('/dashboard');
        } else {
            alert(data.message);
            console.error('Erro no login:', data.message);
        }
    };

    return (
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
                        src="dados.svg"
                        alt='Selo de dados'
                        width={11}
                        height={13}
                    />
                </div>
                
                <InputEmail tema="escuro" tipo="email" value={email} onChange={setEmail} />
                
                <InputEmail tema="escuro" tipo="senha" value={senha} onChange={setSenha} />
                
                <div className={styles.esqueciSenhaContainer}>
                    <a href="">
                        Esqueci minha senha
                    </a>
                </div>

                <BotaoLogin texto='Entrar' tipo='3' onClick={handleLogin}/>
                
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
    );
} 