'use client'; // obrigatório no topo do 
import { useRouter } from 'next/navigation';

import * as motion from "motion/react-client";
import { Category } from "../interfaces/Category";

export default function BotaoDashVerDatalhesCategoria( { categoria }: {categoria:Category}) {
    const router = useRouter();
    
    const handleClick = () => {
        localStorage.setItem('categoriaAtual', JSON.stringify(categoria));
        router.push('/dashboard/categoria');
    };
    
    return (
        <motion.button
            whileHover={{ scale: 1.2 }}
            whileTap={{ scale: 0.8 }}
            onClick={handleClick}
        >
            Ver detalhes
        </motion.button>
    );
}