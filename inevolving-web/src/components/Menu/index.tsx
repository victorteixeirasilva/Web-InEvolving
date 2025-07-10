import Image from "next/image";
import styles from "./menu.module.scss";
import { usePathname } from "next/navigation";

export default function Menu() {
    const pathname = usePathname();
    const isActiveDashboard = pathname === '/dashboard';
    const isActiveObjetivos = pathname === '/objetivos';
    const isActiveTarefas = pathname === '/tarefas';
    const isActiveFinancas = pathname === '/financas';
    const isActiveLivros = pathname === '/livros';
    const isActiveMotivacao = pathname === '/motivacao';
    const isActiveAjustes = pathname === '/ajustes';
    const isActiveAjuda = pathname === '/ajuda';


    return (
        <>
        <div className={styles.linha}></div>
        <div className={styles.container}>
            <div className={styles.titulo}>
                <Image 
                    src="/logo/logo-inovasoft-menu.svg"
                    alt="Logo InEvolving"
                    width={40}
                    height={40}
                    className={styles.logo}
                />
                <h2>
                    InEvolving
                </h2>
            </div>            
            <nav className={styles.esp}>
                <div className={styles.nav}>
                    <Image 
                        src="/iconeDashboard.svg"
                        alt="Logo Dashboard"
                        width={27}
                        height={27}
                    />
                    <a href="/dashboard">
                        Dashboard
                        <div className={styles.marcador}></div>
                        {isActiveDashboard && <div className={styles.ativo}></div>}
                    </a>
                </div>
                <div className={styles.nav}>
                    <Image 
                        src="/iconeObjetivos.svg"
                        alt="Logo Objetivos"
                        width={27}
                        height={27}
                    />
                    <a href="/objetivos">
                        Objetivos
                        <div className={styles.marcador}></div>
                        {isActiveObjetivos && <div className={styles.ativo}></div>}
                    </a>
                </div>
                <div className={styles.nav}>
                    <Image 
                        src="/iconeTarefas.svg"
                        alt="Logo Tarefas"
                        width={27}
                        height={27}
                    />
                    <a href="/tarefas">
                        Tarefas
                        <div className={styles.marcador}></div>
                        {isActiveTarefas && <div className={styles.ativo}></div>}
                    </a>
                </div>
                <div className={styles.nav}>
                    <Image 
                        src="/iconeFinanças.svg"
                        alt="Logo Finanças"
                        width={27}
                        height={27}
                    />
                    <a href="/financas">
                        Finanças
                        <div className={styles.marcador}></div>
                        {isActiveFinancas && <div className={styles.ativo}></div>}
                    </a>
                </div>
                <div className={styles.nav}>
                    <Image 
                        src="/iconeLivros.svg"
                        alt="Logo Livros"
                        width={27}
                        height={27}
                    />
                    <a href="/livros">
                        Livros
                        <div className={styles.marcador}></div>
                        {isActiveLivros && <div className={styles.ativo}></div>}
                    </a>
                </div>
                    <div className={styles.nav}>
                    <Image 
                        src="/iconeMot.svg"
                        alt="Logo Motivação"
                        width={27}
                        height={27}
                    />
                    <a href="/motivacao">
                        Motivação
                        <div className={styles.marcador}></div>
                        {isActiveMotivacao && <div className={styles.ativo}></div>}
                    </a>
                </div>
            <div className={styles.ajuste}>
                <div className={styles.nav}>
                    <Image 
                        src="/iconeAjustes.svg"
                        alt="Logo Ajustes"
                        width={27}
                        height={27}
                    />
                    <a href="/ajustes">
                        Ajustes
                        <div className={styles.marcador}></div>
                        {isActiveAjustes && <div className={styles.ativo}></div>}
                    </a>
                </div>
                <div className={styles.nav}>
                    <Image 
                        src="/iconeAjuda.svg"
                        alt="Logo Ajuda"
                        width={27}
                        height={27}
                    />
                    <a href="/ajuda">
                        Ajuda
                        <div className={styles.marcador}></div>
                        {isActiveAjuda && <div className={styles.ativo}></div>}
                    </a>
                </div>
            </div>
            </nav>
        </div>
        </>
    );
}
