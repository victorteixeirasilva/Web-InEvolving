import styles from "./statusObjetivoDashboard.module.scss"

export default function StatusObjetivoDashboard( { nome, status }:{ nome:string, status:string } ) {
    const statusObjetivo = () => {
        if (status == "TODO") {
            return "Em execução"
        } else if (status == "DONE") {
            return "Concluído"
        } else {
            return "Status Não definido"
        }
    }
    return (
        <div className={styles.container}>
            <h3>
                {nome}
            </h3>
            <p>
                {statusObjetivo()}
            </p>
        </div>
    );
}