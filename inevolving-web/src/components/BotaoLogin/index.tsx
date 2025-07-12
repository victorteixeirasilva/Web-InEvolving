'use client';

import { useRouter } from 'next/navigation';
import styles from "./botaoLogin.module.scss";
import { ClipLoader } from 'react-spinners';



interface BotaoLoginProps {
  carregando?: boolean;
  texto: string;
  tipo: string;
  value?: string;
  onClick?: () => void;
}

export default function BotaoLogin({ carregando, texto, tipo, value, onClick }: BotaoLoginProps) {
  
  const router = useRouter();

  const handleClick = () => {
    if (tipo === '1') {
      router.push('/login');
    } else if (tipo === '2') {
      // Redireciona para a página de cadastro
      localStorage.setItem('email', value || '');
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
          <button 
            disabled={carregando} 
            type="submit" 
            className={styles.botaoGrande} 
            onClick={onClick}
          >
            {carregando && <ClipLoader size={10} color="#0B0E31" />}
              <span 
                style={{ 
                  marginLeft: carregando ? '8px' : '0'
                }}
              >
                {texto}
              </span>
          </button>
        );
    }

}