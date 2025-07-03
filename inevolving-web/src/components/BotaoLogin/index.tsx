import styles from "./botaoLogin.module.scss";

export default function BotaoLogin({ texto, tipo}: { texto: string, tipo: string }) {
    if (tipo === "1") {        
        return (
          <button type="submit" className={styles.botaoEntrar}>
            {texto}
          </button>
        );
    } else if (tipo === "2") {         
        return (
          <button type="submit" className={styles.botaoCadastrar}>
            {texto}
          </button>
        );
    } 

}