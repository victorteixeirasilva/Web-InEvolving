'use client';

import { useEffect, useState } from 'react';
import Menu from "@/components/Menu";
import styles from './page.module.scss';
import Image from "next/image";
import * as motion from "motion/react-client";
import { useRouter } from 'next/navigation';
import { ClipLoader } from 'react-spinners';
import { Sonho } from '@/components/interfaces/Sonho';
import EditarSonho from '@/components/PopUp/editarSonho';

export default function Categoria( ) {
    const [abrirNovoSonho, setAbrirNovoSonho] = useState(false);
    const [abrirEditarSonho, setEditarSonho] = useState(false);
    const [abrirAdicionarURL, setAbrirAdicionarURL] = useState(false);
    const [carregando, serCarregando] = useState(false);

    const [nomeDoSonho, setNomeDoSonho] = useState('');
    const [descricaoSonho, setDescricaoSonho] = useState('');
    const [urlDaImagem, setUrlDaImagem] = useState('');
    const [sonhos, setSonhos] = useState<Sonho[] | null>(null);
    const [sonhoAtual, setSonhoAtual] = useState<Sonho | null>(null);

    const router = useRouter();

    const cadastrarSonho = async () => {
        
        serCarregando(true);

        const response = await fetch('http://127.0.0.1:2327/auth/api/motivation/dreams', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': 'Bearer ' + localStorage.getItem('token')
                },
                body: JSON.stringify({
                    name: nomeDoSonho,
                    description: descricaoSonho,
                    urlImage: urlDaImagem,
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

    const pegarSonhos = async () => {
        
        serCarregando(true);

        const response = await fetch('http://127.0.0.1:2327/auth/api/motivation/dreams/user', {
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
            const data:Sonho[] = await response.json();
            setSonhos(data);
        }

        serCarregando(false);

    }


    useEffect(() => {
        pegarSonhos();
    }, []);

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
                        Motivação
                        <p>
                             Acompanhe e organize seus sonhos para que eles apareçam em seu Vision Board. Atualmente você possui <strong>({sonhos?.length})</strong>, sonhos cadastrados!
                        </p>
                    </h1>
                    <motion.button 
                        className={styles.botaoNovo} 
                        whileHover={{ scale: 1.1 }} 
                        whileTap={{ scale: 0.8 }} 
                        onClick={() => setAbrirNovoSonho(true)}
                    >
                        Novo <strong>+</strong>
                    </motion.button>
                </div>
                <motion.div className={styles.containerConteudo}>
                        {!sonhos && (
                            <div className={styles.livro}>
                                <h3>No momento você não tem sonhos cadastrados, adicione novos sonhos!</h3>
                            </div>
                        )}
                        {sonhos && (
                            sonhos.map((sonho) => (
                                <motion.div 
                                    whileHover={{ scale: 1.05 }} 
                                    whileTap={{ scale: 0.9 }}
                                    key={sonho.id} 
                                    className={styles.livro}
                                    onClick={() => {
                                        setSonhoAtual(sonho);
                                        setEditarSonho(true);
                                    }}
                                >
                                    <img 
                                        src={sonho.urlImage} 
                                        alt={sonho.name}
                                        className={styles.ImgCapaDeLivro}
                                    />
                                    <h3>{sonho.name}</h3>
                                </motion.div>
                            ))
                        )}
                </motion.div>
            </motion.div>
        </motion.div>
        {abrirEditarSonho && sonhoAtual &&(
            <EditarSonho sonho={sonhoAtual}/>
        )}
        {abrirNovoSonho && (
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
                            src="/iconeObjetivo-NovoObjetivo.svg"
                            alt="Icone Novo Sonho"
                            width={72}
                            height={72}
                            className={styles.icone}
                        />
                        <h2>Novo Sonho</h2>
                        <div className={styles.inputs}>
                            <div>
                                <h3>Nome do Sonho</h3>
                                <div className={styles.input}>
                                    <input
                                        type="text"
                                        id="nomeDoSonho"
                                        value={nomeDoSonho}
                                        onChange={(e) => setNomeDoSonho(e.target.value)}
                                        placeholder="Digite um nome para o seu sonho..."
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
                                    <h3>Descrição do Sonho</h3>
                                    <div className={styles.input}>
                                        <input
                                            type="text"
                                            id="descricaoSonho"
                                            value={descricaoSonho}
                                            onChange={(e) => setDescricaoSonho(e.target.value)}
                                            placeholder="Digite os detalhe do seu sonho..."
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
                                        Imagem do sonho
                                        <p className={styles.descricaoCapaDoLivro}>
                                            Adicione o link de uma imagem para usar como capa do seu sonho.
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
                                nomeDoSonho === "" || 
                                descricaoSonho === "" ||
                                urlDaImagem == "" ? 
                                { opacity: 0.3, cursor: 'not-allowed' } : {}
                            }
                            whileHover={{ scale: 1.05 }} 
                            whileTap={{ scale: 0.8 }}
                            onClick={cadastrarSonho}
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
                                <h3>URL da Imagem</h3>
                                <div className={styles.input}>
                                    <input
                                        type="text"
                                        id="urlDaImagemDoLivro"
                                        value={urlDaImagem}
                                        onChange={(e) => setUrlDaImagem(e.target.value)}
                                        placeholder="Digite a url da imagem..."
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