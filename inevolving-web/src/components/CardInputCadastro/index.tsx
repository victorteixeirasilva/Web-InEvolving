'use client';

import { useState } from 'react';
import Image from 'next/image';
import styles from './cardInputCadastro.module.scss';
import BotaoLogin from '../BotaoLogin';
import InputEmail from '../InputEmail';
import { useRouter } from 'next/navigation';

export default function CardInputCadastro() {
    const [email, setEmail] = useState('');
    const [senha, setSenha] = useState('');
    const [confirmarSenha, setConfirmarSenha] = useState('');
    const [telefone, setTelefone] = useState('');

    const router = useRouter();

    const handleCadastro = async () => {
        try {
            if (senha !== confirmarSenha) {
                alert('As senhas não coincidem');
                return;
            }
            const response = await fetch('http://127.0.0.1:2327/api/authentication/register', {
                method: 'POST',
                headers: {
                'Content-Type': 'application/json',
                },
                body: JSON.stringify({ email, password: senha }),
            });

            if (!response.ok) {
                throw new Error('Falha no login');
            }

            const data = await response.json();

            alert(data.message);

            // Redireciona para o dashboard ou outra rota   
            if (response.status === 200) {
                router.push('/login');
            }

        } catch (error) {
            console.error('Erro ao fazer login:', error);
            alert('Email ou senha inválidos');
        }
    };

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