import Image from "next/image";
import styles from "./iconeStatus.module.scss"

export default function IconeStatus( { status }: { status:string} ) {

    if (status == "DONE") {
        return (
            <div className={styles.icone}>
               <Image 
                    src="/iconeStatusDone.svg"
                    alt="Icone Status"
                    width={20}
                    height={20}
               /> 
            </div>
        );
    } else if (status == "CANCELLED") {
        return (
            <div className={styles.icone}>
               <Image 
                    src="/iconeStatusCANCELLED.svg"
                    alt="Icone Status"
                    width={20}
                    height={20}
               /> 
            </div>
        );
    } else if (status == "LATE") {
        return (
            <div className={styles.icone}>
               <Image 
                    src="/iconeStatusLATE.svg"
                    alt="Icone Status"
                    width={20}
                    height={20}
               /> 
            </div>
        );
    } else if (status == "IN PROGRESS") {
        return (
            <div className={styles.icone}>
               <Image 
                    src="/iconeStatusIN PROGRESS.svg"
                    alt="Icone Status"
                    width={20}
                    height={20}
               /> 
            </div>
        );
    } else {
        return (
            <div className={styles.icone}>
               <Image 
                    src="/iconeStatusToDo.svg"
                    alt="Icone Status"
                    width={20}
                    height={20}
               /> 
            </div>
        );
    }
 }