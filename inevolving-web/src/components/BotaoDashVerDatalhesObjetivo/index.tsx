'use client'; // obrigatório no topo do 
import { useRouter } from 'next/navigation';

import * as motion from "motion/react-client";
import { Objective } from '../interfaces/Objective';

export default function BotaoDashVerDatalhesObjetivo( { objetivo }: {objetivo:Objective}) {
    const router = useRouter();
    
    const handleClick = () => {
        localStorage.setItem('objetivoAtual', JSON.stringify(objetivo));
        router.push('/dashboard/categoria/objetivo');
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