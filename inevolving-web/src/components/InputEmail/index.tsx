import Image from 'next/image';
import styles from './inputEmail.module.scss';

export default function InputEmail() {
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
}