'use client';

import { useRouter } from 'next/navigation';
import styles from "./botaoLogin.module.scss";

export default function BotaoLogin({ texto, tipo }: { texto: string, tipo: string }) {
  
  const router = useRouter();

  const handleClick = () => {
    if (tipo === '1') {
      router.push('/login');
    } else if (tipo === '2') {
      router.push('/cadastro');
    } else {
      router.push('/'); // Redireciona para a página inicial por padrão
    }
  };

    if (tipo === "1") {        
        return (
          <button type="submit" className={styles.botaoEntrar} onClick={handleClick}>
            {texto}
          </button>
        );
    } else if (tipo === "2") {         
        return (
          <button type="submit" className={styles.botaoCadastrar} onClick={handleClick}>
            {texto}
          </button>
        );
    } else if (tipo === "3") {
        return (
          <button type="submit" className={styles.botaoGrande} onClick={handleClick}>
            {texto}
          </button>
        );
    }

}