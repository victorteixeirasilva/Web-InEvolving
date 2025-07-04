import Image from 'next/image';
import styles from './inputEmail.module.scss';

interface InputEmailProps {
  tema: string;
  tipo: 'email' | 'senha' | 'telefone';
  value: string;
  onChange: (value: string) => void;
}

export default function InputEmail( { tema, tipo, value, onChange }: InputEmailProps ) {
    
    if (tema === 'claro') {
            return (
                <div className={styles.container}>
                    <Image
                        className={styles.iconEmail}
                        src="/IconeEmail.svg"
                        alt='Icone de e-mail'
                        width={17}
                        height={14}
                    />
                    <input
                        className={styles.inputEmail} 
                        type="email"
                        id='email'
                        placeholder='Digite seu e-mail (seuemail@exemplo.com).' 
                        value={value}
                        onChange={(e) => onChange(e.target.value)}
                    />
                </div>
            );
    } else {
        if (tipo === 'email') {
            return (
                <div className={styles.container2}>
                    <Image
                        className={styles.iconEmail2}
                        src="/IconeEmail-Branco.svg"
                        alt='Icone de e-mail'
                        width={17}
                        height={14}
                    />
                    <input
                        className={styles.inputEmail2} 
                        type="email"
                        id='email'
                        placeholder='Digite seu e-mail (seuemail@exemplo.com).'
                        value={value}
                        onChange={(e) => onChange(e.target.value)} 
                    />
                </div>
            );
        } else if (tipo === 'senha') {
            return (
                <div className={styles.container2}>
                    <Image
                        className={styles.iconEmail2}
                        src="/iconeSenha.svg"
                        alt='Icone de senha'
                        width={17}
                        height={14}
                    />
                    <input
                        className={styles.inputEmail2} 
                        type="password"
                        id='password'
                        placeholder='Digite seu senha.' 
                        value={value}
                        onChange={(e) => onChange(e.target.value)}
                    />
                </div>
            );
        } else if (tipo === 'telefone') {
            return (
                <div className={styles.container2}>
                    <Image
                        className={styles.iconEmail2}
                        src="/IconeTelefone.svg"
                        alt='Icone de telefone'
                        width={17}
                        height={14}
                    />
                    <input
                        className={styles.inputEmail2} 
                        type="tel"
                        id='telefone'
                        placeholder='Digite seu telefone.' 
                        value={value}
                        onChange={(e) => onChange(e.target.value)}
                    />
                </div>
            );
        }

    }

    
}