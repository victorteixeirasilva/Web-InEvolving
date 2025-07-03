import Image from 'next/image';
import styles from './inputEmail.module.scss';

export default function InputEmail( { tema, tipo }: { tema?: string, tipo?: string } ) {
    
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
                    />
                </div>
            );
        } else {
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
                    />
                </div>
            );
        }
    }

    
}