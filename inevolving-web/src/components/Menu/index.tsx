import Image from "next/image";
import styles from "./menu.module.scss";
import { usePathname, useRouter } from "next/navigation";
import 'react-calendar/dist/Calendar.css'; // opcional, se quiser base
import { motion } from "motion/react";
import MenuResumo from "../MenuResumo";
import { useEffect, useState } from "react";


export default function Menu() {
    const [isMobile, setIsMobile] = useState(false);
    
    useEffect(() => {
        const largura = window.innerWidth;
        setIsMobile(largura <= 1024);
    }, []);

    const pathname = usePathname();
    const isActiveDashboard = pathname === '/dashboard/';
    const isActiveObjetivos = pathname === '/objetivos/';
    const isActiveTarefas = pathname === '/tarefas/';
    const isActiveFinancas = pathname === '/financas/';
    const isActiveLivros = pathname === '/livros/';
    const isActiveMotivacao = pathname === '/motivacao/';
    const isActiveAjustes = pathname === '/ajustes/';
    const isActiveAjuda = pathname === '/ajuda/';

    const router = useRouter();
    const [verMenu, setVerMenu] = useState(false);
    const [verMenuResumo, setVerMenuResumo] = useState(false);
    const tipoMenuDesk = localStorage.getItem('tipoMenuDesk') ? 
        parseInt(localStorage.getItem('tipoMenuDesk') as string) : 1;
    

    if (!isMobile) {
        if (tipoMenuDesk === 1) {
            return (
                <>
                <motion.div 
                    className={styles.linha}></motion.div>
                <motion.div 
                    initial={{ opacity: 0, scale: 0 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{
                        duration: 0.4,
                        scale: { type: "spring", visualDuration: 0.4, bounce: 0.55 },
                    }}
                    className={styles.container}>
                    <div 
                        className={styles.titulo}
                        onClick={() => router.push("/")}
                    >
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
                </motion.div>
                <MenuResumo />
                </>
            );
        } else if (tipoMenuDesk === 2) {
            return (
                <div 
                    className={styles.mobTipoMenu2} 
                    style={verMenu || verMenuResumo ? {zIndex: '4'} : {}}
                >
                    {!verMenu && !verMenuResumo && (
                        <div className={styles.topo}>
                            <motion.div
                                whileTap={{ scale: 0.5 }}
                                onClick={() => setVerMenu(true)}
                            >
                                <Image 
                                    src="/mobile/IconeMenuFechado.svg"
                                    alt="Menu"
                                    width={27}
                                    height={27}
                                />
                            </motion.div>
                            <div className={styles.icones}>
                                {isActiveDashboard && (
                                    <Image 
                                            src="/iconeDashboard.svg"
                                        alt="Logo Dashboard"
                                        width={27}
                                        height={27}
                                    />
                                )}
                                {isActiveObjetivos && (
                                    <Image 
                                        src="/iconeObjetivos.svg"
                                        alt="Logo Objetivos"
                                        width={27}
                                        height={27}
                                    />
                                )}
                                {isActiveTarefas && (
                                    <Image 
                                        src="/iconeTarefas.svg"
                                        alt="Logo Tarefas"
                                        width={27}
                                        height={27}
                                    />
                                )}
                                {isActiveFinancas && (
                                    <Image 
                                        src="/iconeFinanças.svg"
                                        alt="Logo Finanças"
                                        width={27}
                                        height={27}
                                    />
                                )}
                                {isActiveLivros && (
                                    <Image 
                                        src="/iconeLivros.svg"
                                        alt="Logo Livros"
                                        width={27}
                                        height={27}
                                    />
                                )}
                                {isActiveMotivacao && (
                                    <Image 
                                        src="/iconeMot.svg"
                                        alt="Logo Motivação"
                                        width={27}
                                        height={27}
                                    />
                                )}
                                {isActiveAjustes && (
                                    <Image 
                                        src="/iconeAjustes.svg"
                                        alt="Logo Ajustes"
                                        width={27}
                                        height={27}
                                    />
                                )}
                                {isActiveAjuda && (
                                    <Image 
                                        src="/iconeAjuda.svg"
                                        alt="Logo Ajuda"
                                        width={27}
                                        height={27}
                                    />
                                )}
                            </div>
                            <motion.div
                                whileTap={{ scale: 0.5 }}
                                onClick={() => setVerMenuResumo(true)}
                            >
                                <Image 
                                    src="/mobile/IconeMenuResumoFechado.svg"
                                    alt="Logo Menu Resumo"
                                    width={27}
                                    height={27}
                                />
                            </motion.div>
                        </div>
                    )}
                    {verMenu && (
                        <div className={styles.overlay}>
                            <motion.div 
                                initial={{ opacity: 0, scale: 1 }}
                                animate={{ opacity: 1, scale: 1 }}
                                transition={{
                                    duration: 0.4,
                                    scale: { type: "spring", visualDuration: 0.4, bounce: 0.55 },
                                }}
                                className={styles.container}
                            >
                                <motion.div 
                                    className={styles.titulo}
                                    onClick={() => setVerMenu(false)}
                                    whileTap={{ scale: 0.5 }}
                                >
                                    {/* <Image 
                                        src="/logo/logo-inovasoft-menu.svg"
                                        alt="Logo InEvolving"
                                        width={40}
                                        height={40}
                                        className={styles.logo}
                                    /> */}
                                    <h2>
                                        Voltar  
                                    </h2>
                                </motion.div>            
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
                            </motion.div>
                        </div>
                    )}
                    {verMenuResumo && (
                        <div>
                            <MenuResumo voltar={() => {
                                setVerMenuResumo(false);
                            }}/>
                        </div>
                    )}
                </div> 
            );           
        }
    } else {
        return (
            <div 
                className={styles.mob} 
                style={verMenu || verMenuResumo ? {zIndex: '4'} : {}}
            >
                {!verMenu && !verMenuResumo && (
                    <div className={styles.topo}>
                        <motion.div
                            whileTap={{ scale: 0.5 }}
                            onClick={() => setVerMenu(true)}
                        >
                            <Image 
                                src="/mobile/IconeMenuFechado.svg"
                                alt="Menu"
                                width={27}
                                height={27}
                            />
                        </motion.div>
                        <div>
                            {isActiveDashboard && (
                                <Image 
                                        src="/iconeDashboard.svg"
                                    alt="Logo Dashboard"
                                    width={27}
                                    height={27}
                                />
                            )}
                            {isActiveObjetivos && (
                                <Image 
                                    src="/iconeObjetivos.svg"
                                    alt="Logo Objetivos"
                                    width={27}
                                    height={27}
                                />
                            )}
                            {isActiveTarefas && (
                                <Image 
                                    src="/iconeTarefas.svg"
                                    alt="Logo Tarefas"
                                    width={27}
                                    height={27}
                                />
                            )}
                            {isActiveFinancas && (
                                <Image 
                                    src="/iconeFinanças.svg"
                                    alt="Logo Finanças"
                                    width={27}
                                    height={27}
                                />
                            )}
                            {isActiveLivros && (
                                <Image 
                                    src="/iconeLivros.svg"
                                    alt="Logo Livros"
                                    width={27}
                                    height={27}
                                />
                            )}
                            {isActiveMotivacao && (
                                <Image 
                                    src="/iconeMot.svg"
                                    alt="Logo Motivação"
                                    width={27}
                                    height={27}
                                />
                            )}
                            {isActiveAjustes && (
                                <Image 
                                    src="/iconeAjustes.svg"
                                    alt="Logo Ajustes"
                                    width={27}
                                    height={27}
                                />
                            )}
                            {isActiveAjuda && (
                                <Image 
                                    src="/iconeAjuda.svg"
                                    alt="Logo Ajuda"
                                    width={27}
                                    height={27}
                                />
                            )}
                        </div>
                        <motion.div
                            whileTap={{ scale: 0.5 }}
                            onClick={() => setVerMenuResumo(true)}
                        >
                            <Image 
                                src="/mobile/IconeMenuResumoFechado.svg"
                                alt="Logo Menu Resumo"
                                width={27}
                                height={27}
                            />
                        </motion.div>
                    </div>
                )}
                {verMenu && (
                    <div className={styles.overlay}>
                        <motion.div 
                            initial={{ opacity: 0, scale: 1 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{
                                duration: 0.4,
                                scale: { type: "spring", visualDuration: 0.4, bounce: 0.55 },
                            }}
                            className={styles.container}
                        >
                            <motion.div 
                                className={styles.titulo}
                                onClick={() => setVerMenu(false)}
                                whileTap={{ scale: 0.5 }}
                            >
                                {/* <Image 
                                    src="/logo/logo-inovasoft-menu.svg"
                                    alt="Logo InEvolving"
                                    width={40}
                                    height={40}
                                    className={styles.logo}
                                /> */}
                                <h2>
                                    Voltar  
                                </h2>
                            </motion.div>            
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
                        </motion.div>
                    </div>
                )}
                {verMenuResumo && (
                    <div>
                        <MenuResumo voltar={() => {
                            setVerMenuResumo(false);
                        }}/>
                    </div>
                )}
            </div> 
        );
    }
}
