import Image from 'next/image';
import styles from './cardInputLogin.module.scss';
import BotaoLogin from '../BotaoLogin';
import InputEmail from '../InputEmail';

export default function CardInputLogin() {
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
            <InputEmail tema='escuro' tipo='email'/>
            <InputEmail tema='escuro' tipo='senha'/>
            <div className={styles.esqueciSenhaContainer}>
                <a href="">
                    Esqueci minha senha
                </a>
            </div>
            <BotaoLogin texto='Entrar' tipo='3'/>
            <div className={styles.naoTemConta}>
                Não tem uma conta? 
                <strong>
                    <a href="">
                        Cadastre-se
                    </a>
                </strong>
            </div>
        </div>
    </div>
  );
} 