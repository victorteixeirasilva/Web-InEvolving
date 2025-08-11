import Image from 'next/image';
import styles from './cardTextoImagem.module.scss';

export default function CardTextoImagem( { texto }: { texto: React.ReactNode } ) {
    return (
        <div className={styles.cardLogin}>
        <div className={styles.containerCardLogin}>                
            <Image 
                src="/logo/logo-inovasoft-bege1.svg"
                alt='logo'
                width={86}
                height={86}
                className={styles.logo}
            />  
            <h1 className={styles.bemVindoDeVolta}>
                {texto}
            </h1>
        </div>
    </div>
    );
}
