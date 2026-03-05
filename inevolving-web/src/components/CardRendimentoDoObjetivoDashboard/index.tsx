import { useEffect, useState } from "react";
import { Objective } from "../interfaces/Objective";
import styles from "./CardRendimentoDoObjetivoDashboard.module.scss"

export default function CardRendimentoDoObjetivoDashboard( { objetivo }: { objetivo:Objective } ) {
    const [tema, setTema] = useState<number | undefined>(undefined);

    useEffect(() => {
        if (typeof window !== 'undefined') {
            setTema(
                localStorage.getItem('tema') ?
                parseInt(localStorage.getItem('tema') as string) : 2
            );
        }
    }, []);
    
    const rendimento = () => {
        if (objetivo.percentageTasksDone < 50) {
            return (
                <div className={styles.classificacaoRuim}>Ruim</div>
            );
        } else if (objetivo.percentageTasksDone < 70) {
            return (
                <div className={styles.classificacaoRegular}>Regular</div>
            );
        } else {
            return (
                <div className={styles.classificacaoBom}>Bom</div>
            );
        }
    }

    return (
        <div className={tema === 1 ? styles.dark : styles.temaClaro}>
            <div className={styles.container}>
                <div className={styles.conteudo}>
                    <h3>
                        Rendimento
                    </h3>
                    <div className={styles.porcentagem}>
                        <p>{objetivo.percentageTasksDone}%</p>
                        {rendimento()}
                    </div>
                    <div className={styles.barraDeProgresso}>
                        <div 
                            className={styles.progresso} 
                            style={{ width: `${objetivo.percentageTasksDone}%` }}
                        ></div>
                    </div>
                </div>
            </div>
        </div>
    );
}