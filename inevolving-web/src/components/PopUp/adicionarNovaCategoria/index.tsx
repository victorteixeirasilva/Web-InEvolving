import Image from "next/image";
import styles from "./adicionarNovoObjetivo.module.scss";
import * as motion from "motion/react-client";
import { useEffect, useState } from "react";
import { ClipLoader } from 'react-spinners';
import { Objetivo } from '@/components/interfaces/Objetivo';
import { useRouter } from "next/navigation";

export default function AdicionarNovaCategoria() {
    const router = useRouter();

    const [nomeCategoria, setNomeCategoria] = useState("");
    const [descricaoObjetivo, setDescricaoObjetivo] = useState("");
    const [carregando, setCarregando] = useState(false);
    const [verListaDeObjetivos, setVerListaDeObjetivos] = useState(false);
    const [jwtToken, setJwtToken] = useState('');

    useEffect(() => {
        const token = localStorage.getItem('token');
        setJwtToken(token ?? '');
    }, []);

    const handleRegistrarCategoria = async () => {
        setCarregando(true);

        const response = await fetch('http://127.0.0.1:2327/auth/api/categories', {
            method: 'POST',
            headers: {
                    'Content-Type': 'application/json',
                    'Authorization': 'Bearer ' + jwtToken
            },
            body: JSON.stringify({
                categoryName: nomeCategoria,
                categoryDescription: descricaoObjetivo,
            }),
        });

        const data = await response.json();

        if (response.ok){

            setCarregando(false);
            window.location.reload();
        } else {
            setCarregando(false);
            alert(data.message);
            console.error('Erro ao salvar:', data.message);
            // console.error('Erro ao salvar:');
        }
    };

    const handleRegistrarCategoriaComObjetivo = async () => {
        setCarregando(true);

        const response = await fetch('http://127.0.0.1:2327/auth/api/categories', {
            method: 'POST',
            headers: {
                    'Content-Type': 'application/json',
                    'Authorization': 'Bearer ' + jwtToken
            },
            body: JSON.stringify({
                categoryName: nomeCategoria,
                categoryDescription: descricaoObjetivo,
            }),
        });

        const data = await response.json();

        if (response.ok){

            const categoryId = data.id;

            objetivosSelecionados.forEach(async (ob) => {
                    const response2 = await fetch('http://127.0.0.1:2327/auth/api/categories/objective', {
                        method: 'POST',
                        headers: {
                                'Content-Type': 'application/json',
                                'Authorization': 'Bearer ' + jwtToken
                        },
                        body: JSON.stringify({
                            idCategory: categoryId,
                            idObjective: ob.id,
                        }),
                    });
                    if (!response2.ok) {
                        alert('Erro ao associar objetivo à categoria:' + ob.id);
                    } else {
                        setCarregando(false);
                        window.location.reload();
                    }
                }
            );
            
        } else {
            setCarregando(false);
            alert(data.message + " - AO adicionar a categoria");
            console.error('Erro ao salvar:', data.message);
        }
    };

    const [objetivos, setObjetivos] = useState<Objetivo[] | null>(null);

    const [objetivosSelecionados, setObjetivosSelecionados] = useState<Objetivo[]>([]);

    const toggleObjetivoSelecionado = (objetivo: Objetivo) => {
        const jaSelecionado = objetivosSelecionados.some((item) => item.id === objetivo.id);

        if (jaSelecionado) {
            setObjetivosSelecionados(
            objetivosSelecionados.filter((item) => item.id !== objetivo.id)
            );
        } else {
            setObjetivosSelecionados([...objetivosSelecionados, objetivo]);
        }
    };


    const pegarObjetivos = async () => {
            setCarregando(true);
            const response = await fetch(
                    'http://127.0.0.1:2327/auth/api/objectives/user', 
                {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': 'Bearer ' + jwtToken
                    },
                });
    
            const data: Objetivo[] = await response.json();
            
    
            if (!response.ok){
                setCarregando(false);
                alert('Erro ao puxar objetivos');
                console.error('Erro ao puxar objetivoss');
            }

            if(response.status === 401) {
                router.push('/login');
            }
            
            setCarregando(false);
            setObjetivos(data);
    };

    return (
        <>
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
                        alt="Icone Objetivo"
                        width={72}
                        height={72}
                        className={styles.icone}
                    />
                    <h2>Nova Categoria</h2>
                    <div className={styles.inputs}>
                        <div className={styles.inputObjetivo}>
                            <h3>Nome</h3>
                            <div className={styles.input}>
                                <input
                                    type="text"
                                    id="nomeCategoria"
                                    value={nomeCategoria}
                                    onChange={(e) => setNomeCategoria(e.target.value)}
                                    placeholder="Digite o nome da categoria..."
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
                        <div className={styles.inputDescrição}>
                            <h3>Descrição</h3>
                            <div className={styles.input}>
                                <input 
                                    type="text"
                                    id="descricaoObjetivo"
                                    value={descricaoObjetivo}
                                    onChange={(e) => setDescricaoObjetivo(e.target.value)}
                                    placeholder="Escreva detalhes sobre o seu objetivo..."
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
                            className={styles.inputDescrição}
                            whileHover={{ scale: 1.02 }} 
                            whileTap={{ scale: 0.95 }}   
                            onClick={() => {
                                    setVerListaDeObjetivos(true);
                                    pegarObjetivos();
                                }
                            }     
                        >
                            <h3>Selecionar Objetivo Relacionado</h3>
                            <div className={styles.input}>
                                <p className={styles.place}>Selecione os objetivos relacionados...</p>
                                <Image
                                    className={styles.lapis} 
                                    src="/iconeLapisCinza.svg"
                                    alt="Icone Lapis"
                                    width={15}
                                    height={15}
                                />
                            </div>
                        </motion.div>
                    </div>
                    <motion.button
                        whileHover={!verListaDeObjetivos ? { scale: 1.1 } : { scale: 1.0 }} 
                        whileTap={!verListaDeObjetivos ? { scale: 0.8 } : { scale: 1.0 }}
                        onClick={!verListaDeObjetivos ? handleRegistrarCategoria : undefined}
                        style={verListaDeObjetivos ? { backgroundColor: '#E0E0E0', cursor: 'not-allowed' } : {}}
                    >
                        {carregando && <ClipLoader size={10} color="#0B0E31" />}
                        <span 
                            style={{ 
                                marginLeft: carregando ? '8px' : '0'
                            }}
                        ></span>
                        Concluído
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
            {verListaDeObjetivos && (
                <div className={styles.containerPopUp}>
                    <motion.button
                        whileHover={{ scale: 1.06 }} 
                        whileTap={{ scale: 0.8 }}
                        className={styles.botaoVoltar} 
                        onClick={() => setVerListaDeObjetivos(false)}
                        >
                        <strong>Voltar - Objetivos</strong>
                    </motion.button>
                    <div className={styles.conteudo}>
                        <div className={styles.containerScroll}>
                            {objetivos && objetivos.map((objetivo) => {
                                const estaSelecionado = objetivosSelecionados.some((item) => item.id === objetivo.id);

                                return (
                                    <div
                                    key={objetivo.id}
                                    className={styles.objetivo}
                                    onClick={() => toggleObjetivoSelecionado(objetivo)}
                                    style={{ cursor: 'pointer' }}
                                    >
                                    <h4>{objetivo.nameObjective}</h4>
                                    <Image
                                        src="/checkIconAzul.svg"
                                        alt="Icone Check Azul"
                                        width={21}
                                        height={16}
                                        className={`${styles.checkIcon} ${estaSelecionado ? styles.selecionado : ''}`}
                                    />
                                    </div>
                                );
                            })}
                        </div>
                        <motion.button
                            whileHover={{ scale: 1.05 }} 
                            whileTap={{ scale: 0.8 }}
                            onClick={handleRegistrarCategoriaComObjetivo}
                            // onClick={() => alert(objetivosSelecionados.length)}
                        >
                            {carregando && <ClipLoader size={10} color="#0B0E31" />}
                            <span 
                                style={{ 
                                    marginLeft: carregando ? '8px' : '0'
                                }}
                                ></span>
                            Concluído
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
        </>
    );
}