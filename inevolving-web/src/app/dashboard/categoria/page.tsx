'use client';

import { useEffect, useState } from 'react';
import Menu from "@/components/Menu";
import styles from './page.module.scss';
// import Image from "next/image";
import * as motion from "motion/react-client";
// import { ClipLoader } from 'react-spinners';
// import { ResponseDashboard } from '@/components/interfaces/ResponseDashboard';
import { Category } from '@/components/interfaces/Category';

export default function Categoria( ) {
    // const [jwtToken, setJwtToken] = useState('');

    const [categoria, setCategoria] = useState<Category | null>(null);

    useEffect(() => {
        // const token = localStorage.getItem('token');
        // setJwtToken(token ?? '');
        const categoriaStr = localStorage.getItem('categoriaAtual');
        if (categoriaStr) {
            const categoriaObj: Category = JSON.parse(categoriaStr);
            setCategoria(categoriaObj);
        }
    }, []);

    return (
        <motion.div>
            <Menu />
            <motion.div
                initial={{ opacity: 0, scale: 0 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{
                    duration: 0.4,
                    scale: { type: "spring", visualDuration: 0.4, bounce: 0.5 },
                }} 
                className={styles.container}
            >
                <div className={styles.tituloContainer}>
                    <h1>{categoria?.categoryName}</h1>
                    <p>{categoria?.categoryDescription}</p>
                </div>
                <motion.div className={styles.containerConteudo}>
                    {categoria && categoria?.objectives.map((objetivo) => (
                        <div key={objetivo.id} className={styles.objetivo}>
                            <h3>
                                {objetivo.nameObjective}
                            </h3>
                        </div>
                    ))}
                </motion.div>
            </motion.div>
        </motion.div>
    );
}