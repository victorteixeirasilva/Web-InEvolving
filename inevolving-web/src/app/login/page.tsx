import CardTextoImagem from "@/components/CardTextoImagem";
import styles from "./page.module.scss";
import CardInputLogin from "@/components/CardInputLogin";

export default function Login() {
    return (
        <div className={styles.background}>
            <div>
                <CardTextoImagem texto={
                        <>
                            Bem-vindo<br />
                            de volta
                        </>
                    }
                />
            </div>
            <CardInputLogin />
        </div>
    );
}