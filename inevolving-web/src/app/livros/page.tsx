'use client';

import { useCallback, useEffect, useState } from 'react';
import Menu from "@/components/Menu";
import styles from './page.module.scss';
import Image from "next/image";
import * as motion from "motion/react-client";
import { useRouter } from 'next/navigation';
import { Livro } from '@/components/interfaces/Livro';
import { ClipLoader } from 'react-spinners';
import EditarLivro from '@/components/PopUp/editarLivro';

export default function Categoria( ) {
    const [abrirNovoLivro, setAbrirNovoLivro] = useState(false);
    const [abrirEditarLivro, setEditarLivro] = useState(false);
    const [abrirAdicionarURL, setAbrirAdicionarURL] = useState(false);
    const [carregando, serCarregando] = useState(false);

    const [nomeDoLivro, setNomeDoLivro] = useState('');
    const [nomeAutor, setNomeAutor] = useState('');
    const [temaDoLivro, setTemaDoLivro] = useState('');
    const [urlDaImagemDoLivro, setUrlDaImagemDoLivro] = useState('');
    const [livrosTodo, setLivrosTodo] = useState<Livro[] | null>(null);
    const [livrosProgress, setLivrosProgress] = useState<Livro[] | null>(null);
    const [livrosDone, setLivrosDone] = useState<Livro[] | null>(null);
    const [livroAtual, setLivroAtual] = useState<Livro | null>(null);

    const router = useRouter();

    const cadastrarLivro = async () => {
        
        serCarregando(true);

        const response = await fetch('https://api.inevolving.inovasoft.tech/auth/api/books', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': 'Bearer ' + localStorage.getItem('token')
                },
                body: JSON.stringify({
                    title: nomeDoLivro,
                    author: nomeAutor,
                    theme: temaDoLivro,
                    coverImage: urlDaImagemDoLivro,
                }),
        });

            
        if (response.status === 401){
            serCarregando(false);
            router.push('/login');
            alert('Você não está logado, por favor faça login novamente.');
        }

        serCarregando(false);
        window.location.reload();

    }

    const pegarLivrosTodo = useCallback(async () => {
        
        serCarregando(true);

        const response = await fetch('https://api.inevolving.inovasoft.tech/auth/api/books/status/todo', {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': 'Bearer ' + localStorage.getItem('token')
                },
        });

        if (response.status === 401){
            serCarregando(false);
            router.push('/login');
            alert('Você não está logado, por favor faça login novamente.');
        }

        if (response.ok) {
            const data:Livro[] = await response.json();
            setLivrosTodo(data);
        }

        serCarregando(false);

    }, [router])

    const pegarLivrosProgress = useCallback(async () => {
        
        serCarregando(true);

        const response = await fetch('https://api.inevolving.inovasoft.tech/auth/api/books/status/progress', {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': 'Bearer ' + localStorage.getItem('token')
                },
        });

        if (response.status === 401){
            serCarregando(false);
            router.push('/login');
            alert('Você não está logado, por favor faça login novamente.');
        }

        if (response.ok) {
            const data:Livro[] = await response.json();
            setLivrosProgress(data);
        }

        serCarregando(false);
    }, [router])

    const pegarLivrosDone = useCallback(async () => {
        
        serCarregando(true);

        const response = await fetch('https://api.inevolving.inovasoft.tech/auth/api/books/status/completed', {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': 'Bearer ' + localStorage.getItem('token')
                },
        });

        if (response.status === 401){
            serCarregando(false);
            router.push('/login');
            alert('Você não está logado, por favor faça login novamente.');
        }

        if (response.ok) {
            const data:Livro[] = await response.json();
            setLivrosDone(data);
        }

        serCarregando(false);
    }, [router])

    useEffect(() => {
        pegarLivrosTodo();
        pegarLivrosProgress();
        pegarLivrosDone();
    }, [pegarLivrosDone, pegarLivrosProgress, pegarLivrosTodo]);

    return (
        <>
        <motion.div>
            <Menu />
            <motion.div
                initial={{ opacity: 0, scale: 0 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{
                    duration: 0.4,
                    scale: { type: "spring", visualDuration: 0.4, bounce: 0.5 },
                }} 
                className={styles.container}
            >
                <div className={styles.tituloContainer}>
                    <h1>
                        Livros
                        <p>
                            Acompanhe e organize sua leitura de forma simples e prática.
                        </p>
                    </h1>
                    <motion.button 
                        className={styles.botaoNovo} 
                        whileHover={{ scale: 1.1 }} 
                        whileTap={{ scale: 0.8 }} 
                        onClick={() => setAbrirNovoLivro(true)}
                    >
                        Adicionar Novo <strong>+</strong>
                    </motion.button>
                </div>
                <motion.div className={styles.containerFiltroEBotao}>
                    <motion.div className={styles.filtro}>
                        <h3>
                            Filtrar por:
                        </h3>
                        <motion.button 
                            className={styles.botaoFiltroStatus}
                            // style={filtroAtivoStatus === 1 ? {backgroundColor: "#0B0E31", color: "#FFFF"} : {}}  
                            whileHover={{ scale: 1.1, backgroundColor: "#0B0E31", color: "#FFFF" }} 
                            whileTap={{ scale: 0.8 }}
                            onClick={() => router.push("/desculpa")}
                            // onClick={() => {
                                //     setFiltroAtivoStatus(1);
                                //     setPrimeiroCarregamento(false);
                                // }}
                        >
                            Status
                        </motion.button>    
                        <motion.button 
                            className={styles.botaoFiltroStatus}  
                            // style={filtroAtivoStatus === 2 ? {backgroundColor: '#6b6b6b', color: "#FFFF"} : {}}  
                            whileHover={{ scale: 1.1, backgroundColor: "#0B0E31", color: "#FFFF" }} 
                            whileTap={{ scale: 0.8 }}
                            // onClick={() => {
                                //     setFiltroAtivoStatus(2);
                                //     setPrimeiroCarregamento(false);
                                // }}
                        >
                            Autor
                        </motion.button>
                    </motion.div>
                </motion.div>
                <motion.div className={styles.containerConteudo}>
                    <div className={styles.coluna}>
                        <div className={styles.tituloColuna}>
                            <h3>Pendentes</h3>
                        </div>
                        {!livrosTodo && (
                            <div className={styles.livro}>
                                <h3>No momento você não tem livros pendestes, adicione novos livros!</h3>
                            </div>
                        )}
                        {livrosTodo && (
                            livrosTodo.map((livro) => (
                                <motion.div 
                                    whileHover={{ scale: 1.05 }} 
                                    whileTap={{ scale: 0.9 }}
                                    key={livro.id} 
                                    className={styles.livro}
                                    onClick={() => {
                                        setLivroAtual(livro);
                                        setEditarLivro(true);
                                    }}
                                >
                                    {/* eslint-disable-next-line @next/next/no-img-element */}
                                    <img 
                                        src={livro.coverImage} 
                                        alt={livro.title}
                                        className={styles.ImgCapaDeLivro}
                                    />
                                    <h3>{livro.title}</h3>
                                </motion.div>
                            ))
                        )}
                    </div>
                    <div className={styles.coluna}>
                        <div className={styles.tituloColuna}>
                            <h3>Lendo</h3>
                        </div>
                        {!livrosProgress && (
                            <div className={styles.livro}>
                                <h3>No momento você não está lendo nenhum livro!</h3>
                            </div>
                        )}
                        {livrosProgress && (
                            livrosProgress.map((livro) => (
                                <motion.div 
                                    whileHover={{ scale: 1.05 }} 
                                    whileTap={{ scale: 0.9 }}
                                    key={livro.id} 
                                    className={styles.livro}
                                    onClick={() => {
                                        setLivroAtual(livro);
                                        setEditarLivro(true);
                                    }}
                                >
                                    {/* eslint-disable-next-line @next/next/no-img-element */}
                                    <img 
                                        src={livro.coverImage} 
                                        alt={livro.title}
                                        className={styles.ImgCapaDeLivro}
                                    />
                                    <h3>{livro.title}</h3>
                                </motion.div>
                            ))
                        )}
                    </div>
                    <div className={styles.coluna}>
                        <div className={styles.tituloColuna}>
                            <h3>Leitura Concluída</h3>
                        </div>
                        {!livrosDone && (
                            <div className={styles.livro}>
                                <h3>No momento você não completou a leitura de nenhum livro!</h3>
                            </div>
                        )}
                        {livrosDone && (
                            livrosDone.map((livro) => (
                                <motion.div 
                                    whileHover={{ scale: 1.05 }} 
                                    whileTap={{ scale: 0.9 }}
                                    key={livro.id} 
                                    className={styles.livro}
                                    onClick={() => {
                                        setLivroAtual(livro);
                                        setEditarLivro(true);
                                    }}
                                >
                                    {/* eslint-disable-next-line @next/next/no-img-element */}
                                    <img 
                                        src={livro.coverImage} 
                                        alt={livro.title}
                                        className={styles.ImgCapaDeLivro}
                                    />
                                    <h3>{livro.title}</h3>
                                </motion.div>
                            ))
                        )}
                    </div>
                </motion.div>
            </motion.div>
        </motion.div>
        {abrirEditarLivro && livroAtual &&(
            <EditarLivro livro={livroAtual}/>
        )}
        {abrirNovoLivro && (
            <div className={styles.overlay}>
                <div className={styles.containerPopUp}>
                    <motion.button
                        whileHover={{ scale: 1.1 }} 
                        whileTap={{ scale: 0.8 }}
                        className={styles.botaoVoltar} 
                        onClick={() => window.location.reload()}
                    >
                        <strong>X</strong>
                    </motion.button>
                    <div className={styles.conteudo}>
                        <Image 
                            src="/IconeNovoLivro.svg"
                            alt="Icone Novo Livro"
                            width={72}
                            height={72}
                            className={styles.icone}
                        />
                        <h2>Novo Livro</h2>
                        <div className={styles.inputs}>
                            <div>
                                <h3>Título</h3>
                                <div className={styles.input}>
                                    <input
                                        type="text"
                                        id="nomeDoLivro"
                                        value={nomeDoLivro}
                                        onChange={(e) => setNomeDoLivro(e.target.value)}
                                        placeholder="Digite o nome do Livro..."
                                    />
                                    <Image 
                                        className={styles.lapis}
                                        src="/iconeLapisCinza.svg"
                                        alt="Icone Lapis"
                                        width={15}
                                        height={15}
                                    />
                                </div>
                                <div>
                                    <h3>Autor</h3>
                                    <div className={styles.input}>
                                        <input
                                            type="text"
                                            id="nomeAutor"
                                            value={nomeAutor}
                                            onChange={(e) => setNomeAutor(e.target.value)}
                                            placeholder="Digite o nome do autor do livro..."
                                        />
                                        <Image 
                                            className={styles.lapis}
                                            src="/iconeLapisCinza.svg"
                                            alt="Icone Lapis"
                                            width={15}
                                            height={15}
                                        />
                                    </div>
                                </div>
                                <div>
                                    <h3>Tema</h3>
                                    <div className={styles.input}>
                                        <input
                                            type="text"
                                            id="temaDoLivro"
                                            value={temaDoLivro}
                                            onChange={(e) => setTemaDoLivro(e.target.value)}
                                            placeholder="Digite o nome do tema do livro..."
                                        />
                                        <Image 
                                            className={styles.lapis}
                                            src="/iconeLapisCinza.svg"
                                            alt="Icone Lapis"
                                            width={15}
                                            height={15}
                                        />
                                    </div>
                                </div>
                                <motion.div 
                                    className={styles.containerImagemDeCapa}
                                >
                                    <h3>
                                        Imagem de Capa
                                        <p className={styles.descricaoCapaDoLivro}>
                                            Adicione o link de uma imagem para usar como capa do seu livro.
                                        </p>
                                    </h3>
                                    <motion.div 
                                        className={styles.containerUpload}
                                        whileHover={{ scale: 1.1 }} 
                                        whileTap={{ scale: 0.8 }}
                                        onClick={() => setAbrirAdicionarURL(true)}
                                    >
                                        <Image 
                                            src="/IconeDeUpload.svg"
                                            alt="Icone de Upload"
                                            width={50}
                                            height={50}
                                        />
                                    </motion.div>
                                </motion.div>
                            </div>
                        </div>
                        <motion.button
                            style={ 
                                abrirAdicionarURL || 
                                nomeDoLivro === "" || 
                                nomeAutor === "" || 
                                temaDoLivro === "" ||
                                urlDaImagemDoLivro == "" ? 
                                { opacity: 0.3, cursor: 'not-allowed' } : {}
                            }
                            whileHover={{ scale: 1.05 }} 
                            whileTap={{ scale: 0.8 }}
                            onClick={cadastrarLivro}
                        >
                            {carregando && <ClipLoader size={10} color="#0B0E31" />}
                            <span 
                                style={{ 
                                    marginLeft: carregando ? '8px' : '0'
                                }}
                            ></span>
                            Salvar
                            <Image 
                                className={styles.concluido}
                                src="/checkIcon.svg"
                                alt="Icone Check"
                                width={23}
                                height={18}
                            />
                        </motion.button>
                    </div>
                </div>
                {abrirAdicionarURL && (
                    <div className={styles.containerPopUp}>
                        <motion.button
                            whileHover={{ scale: 1.1 }} 
                            whileTap={{ scale: 0.8 }}
                            className={styles.botaoVoltar} 
                            onClick={() => setAbrirAdicionarURL(false)}
                        >
                            <strong>Voltar</strong>
                        </motion.button>
                        <div className={styles.conteudo}>
                            <div className={styles.inputs}>
                                <h3>URL da Imagem de Capa</h3>
                                <div className={styles.input}>
                                    <input
                                        type="text"
                                        id="urlDaImagemDoLivro"
                                        value={urlDaImagemDoLivro}
                                        onChange={(e) => setUrlDaImagemDoLivro(e.target.value)}
                                        placeholder="Digite a url da imagem da capa do livro..."
                                    />
                                    <Image 
                                        className={styles.lapis}
                                        src="/iconeLapisCinza.svg"
                                        alt="Icone Lapis"
                                        width={15}
                                        height={15}
                                    />
                                </div>
                            </div>
                            <motion.button
                                whileHover={{ scale: 1.05 }} 
                                whileTap={{ scale: 0.8 }}
                                onClick={() => setAbrirAdicionarURL(false)}
                            >
                                <span 
                                    style={{ 
                                        marginLeft: carregando ? '8px' : '0'
                                    }}
                                ></span>
                                Salvar
                                <Image 
                                    className={styles.concluido}
                                    src="/checkIcon.svg"
                                    alt="Icone Check"
                                    width={23}
                                    height={18}
                                />
                            </motion.button>
                        </div>
                    </div>
                )}
            </div>
        )}
        </>
    );
}