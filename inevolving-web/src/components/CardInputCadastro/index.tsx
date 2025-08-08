'use client';

import { useState } from 'react';
import Image from 'next/image';
import styles from './cardInputCadastro.module.scss';
import BotaoLogin from '../BotaoLogin';
import InputEmail from '../InputEmail';
import { useRouter } from 'next/navigation';

export default function CardInputCadastro({ preEmail }: { preEmail?: string }) {
    const [email, setEmail] = useState(preEmail || '');
    const [senha, setSenha] = useState('');
    const [confirmarSenha, setConfirmarSenha] = useState('');
    const [telefone, setTelefone] = useState('');

    const router = useRouter();

    const handleCadastro = async () => {
        if (senha !== confirmarSenha) {
            alert('As senhas não coincidem');
            return;
        }
        const response = await fetch('http://82.25.69.109:2327/api/authentication/register', {
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
            }
        } else {
            alert(`Erro: ${data.message || 'Erro ao cadastrar'}`);
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