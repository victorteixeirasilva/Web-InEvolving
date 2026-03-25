'use client'; // obrigatório no topo do 
import { useRouter } from 'next/navigation';

import * as motion from "motion/react-client";
import { Category } from "../interfaces/Category";
import styles from './botaoDashVerDatalhesCategoria.module.scss';
import { useEffect, useState } from 'react';

export default function BotaoDashVerDatalhesCategoria( { categoria }: {categoria:Category}) {
    const router = useRouter();
    const [tema, setTema] = useState<number | undefined>(undefined);

    useEffect(() => {
        if (typeof window !== 'undefined') {
            setTema(
                localStorage.getItem('tema') ?
                parseInt(localStorage.getItem('tema') as string) : 1
            );
        }
    }, []);
    
    const handleClick = () => {
        localStorage.setItem('categoriaAtual', JSON.stringify(categoria));
        router.push('/dashboard/categoria');
    };
    
    return (
        <div className={tema === 1 ? styles.dark : styles.temaClaro}>
            <motion.button
                className={styles.containerBotaoVerDetalhes}
                // whileHover={{ scale: 1.2 }}
                // whileTap={{ scale: 0.8 }}
                onClick={handleClick}
            >
                Ver detalhes
            </motion.button>
        </div>
    );
}