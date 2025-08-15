import Image from "next/image";
import styles from "./EditarCategoria.module.scss";
import * as motion from "motion/react-client";
import { useEffect, useState } from "react";
import { ClipLoader } from 'react-spinners';
import { Objetivo } from '@/components/interfaces/Objetivo';
import { Category } from "@/components/interfaces/Category";
import { useRouter } from "next/navigation";

export default function EditarCategoria() {
    const [isMobile, setIsMobile] = useState(false);

    useEffect(() => {
        const largura = window.innerWidth;
        setIsMobile(largura <= 1024);
    }, []);

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

    const [categoria, setCategoria] = useState<Category | null>(null);
    
    useEffect(() => {
        const categoriaStr = localStorage.getItem('categoriaAtual');
        if (categoriaStr) {
            const categoriaObj: Category = JSON.parse(categoriaStr);
            setCategoria(categoriaObj);
        }
    }, []);

    const handleSalvarCategoriaComObjetivos = async () => {
        setCarregando(true);

        const response = await fetch('https://api.inevolving.inovasoft.tech/auth/api/categories/' + categoria?.id, {
            method: 'PATCH',
            headers: {
                    'Content-Type': 'application/json',
                    'Authorization': 'Bearer ' + jwtToken
            },
            body: JSON.stringify({
                categoryName: nomeCategoria !== "" ? nomeCategoria : categoria?.categoryName,
                categoryDescription: descricaoObjetivo !== "" ? descricaoObjetivo : categoria?.categoryDescription,
            }),
        });

        const data = await response.json();

        if (response.status === 401){
            setCarregando(false);
            router.push('/login');
            alert('Você não está logado, por favor faça login novamente.');
        }

        if (!response.ok){
            setCarregando(false);
            alert(data.message + " - AO adicionar a categoria");
            console.error('Erro ao salvar:', data.message);
        }

        if (objetivosSelecionados.length !== 0) {
            const categoryId = data.id;

            try {
                await Promise.all (
                    objetivosSelecionados.map(async (ob) => {
                        const response2 = await fetch('https://api.inevolving.inovasoft.tech/auth/api/categories/objective', {
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

                        if (response.status === 401){
                            setCarregando(false);
                            router.push('/login');
                            alert('Você não está logado, por favor faça login novamente.');
                        }

                        if (!response2.ok) {
                            alert('Erro ao associar objetivo à categoria:' + ob.id);
                        }
                    })
                );
            } catch (err) {
                console.error('Erro ao processar remoção de objetivos:', err);
            }
        }

        if (objetivosParaRemover.length !== 0) {
            const categoryId = data.id;

            try {
                await Promise.all(
                objetivosParaRemover.map(async (ob) => {
                    const response2 = await fetch(
                    `https://api.inevolving.inovasoft.tech/auth/api/categories/objective/${categoryId}/${ob.id}`,
                    {
                        method: 'DELETE',
                        headers: {
                        'Content-Type': 'application/json',
                        'Authorization': 'Bearer ' + jwtToken,
                        },
                    }
                    );

                    if (response.status === 401){
                        setCarregando(false);
                        router.push('/login');
                        alert('Você não está logado, por favor faça login novamente.');
                    }

                    if (!response2.ok) {
                    console.error('Erro ao remover objetivo:', ob.id);
                    alert('Erro ao associar objetivo à categoria: ' + ob.id);
                    }
                })
                );
            } catch (err) {
                console.error('Erro ao processar remoção de objetivos:', err);
            }
        }


        setCarregando(false);
        window.location.reload();
    };

    const [objetivos, setObjetivos] = useState<Objetivo[] | null>(null);

    const [objetivosSelecionados, setObjetivosSelecionados] = useState<Objetivo[]>([]);
    const [objetivosParaRemover, setObjetivosParaRemover] = useState<Objetivo[]>([]);
    
    const toggleObjetivoSelecionado = (objetivo: Objetivo) => {

        if (categoria?.objectives.some((objCat) => objCat.id === objetivo.id)) {
            setObjetivosParaRemover(
                [...objetivosParaRemover, objetivo]
            );
        }

        const jaSelecionado = objetivosSelecionados.some((item) => item.id === objetivo.id) || objetivosParaRemover.some((item) => item.id === objetivo.id);

        if (jaSelecionado) {
            setObjetivosSelecionados(
                objetivosSelecionados.filter((item) => item.id !== objetivo.id)
            );
        } else {
            setObjetivosSelecionados([...objetivosSelecionados, objetivo]);
        }
    };

    const deletarCategoria = async () => {
            setCarregando(true);
            const response = await fetch(
                    'https://api.inevolving.inovasoft.tech/auth/api/categories/'+categoria?.id, 
                {
                    method: 'DELETE',
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': 'Bearer ' + jwtToken
                    },
                });
    
            if (response.status === 401){
                setCarregando(false);
                router.push('/login');
                alert('Você não está logado, por favor faça login novamente.');
            }
            
            if (!response.ok){
                setCarregando(false);
                alert('Erro ao puxar objetivos');
                console.error('Erro ao puxar objetivoss');
            }
            
            setCarregando(false);
            window.location.reload();
    };

    const pegarObjetivos = async () => {
            setCarregando(true);
            const response = await fetch(
                    'https://api.inevolving.inovasoft.tech/auth/api/objectives/user', 
                {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': 'Bearer ' + jwtToken
                    },
                });
    
            const data: Objetivo[] = await response.json();
            
            if (response.status === 401){
                setCarregando(false);
                router.push('/login');
                alert('Você não está logado, por favor faça login novamente.');
            }
    
            if (!response.ok){
                setCarregando(false);
                alert('Erro ao puxar objetivos');
                console.error('Erro ao puxar objetivoss');
            }
            
            setCarregando(false);
            setObjetivos(data);
    };

    if (!isMobile) {
        return (
            <>
            <div className={styles.overlay}>
                <div className={styles.containerPopUp}>
                    <div className={styles.botoesTopo}>
                        <motion.button
                            whileHover={{ scale: 1.1 }} 
                            whileTap={{ scale: 0.8 }}
                            className={styles.botaoVoltar} 
                            onClick={() => window.location.reload()}
                        >
                            <strong>X</strong>
                        </motion.button>
                        <motion.button
                            whileHover={{ scale: 1.2 }} 
                            whileTap={{ scale: 0.8 }}
                            className={styles.lixeira}
                            onClick={() => {
                                    if (confirm('Tem certeza que deseja excluir esta categoria?')) {
                                        deletarCategoria();
                                    }}}
                        >
                            <Image 
                                src="/lixeiraIcon.svg"
                                alt="Icone Lixeira"
                                width={27}
                                height={29}
                            />
                        </motion.button>
                    </div>
                    <div className={styles.conteudo}>
                        <Image 
                            src="/iconeObjetivo-NovoObjetivo.svg"
                            alt="Icone Objetivo"
                            width={72}
                            height={72}
                            className={styles.icone}
                        />
                        <h2>Editar Categoria</h2>
                        <div className={styles.inputs}>
                            <div className={styles.inputObjetivo}>
                                <h3>Nome</h3>
                                <div className={styles.input}>
                                    <input
                                        type="text"
                                        id="nomeCategoria"
                                        value={nomeCategoria}
                                        onChange={(e) => setNomeCategoria(e.target.value)}
                                        placeholder={categoria ? categoria.categoryName : "Digite o nome da categoria..."}
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
                                        placeholder={categoria ? categoria.categoryDescription : "Escreva detalhes sobre o seu objetivo..."}
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
                            whileHover={!verListaDeObjetivos  ? { scale: 1.1 } : { scale: 1.0 }} 
                            whileTap={!verListaDeObjetivos ? { scale: 0.8 } : { scale: 1.0 }}
                            onClick={!verListaDeObjetivos ? handleSalvarCategoriaComObjetivos : undefined}
                            // onClick={() => alert('Objetivos para adicionar: ' + objetivosSelecionados.length + 
                            //     ' - Objetivos para remover: ' + objetivosParaRemover.length)}
                            style={
                                    verListaDeObjetivos || 
                                    nomeCategoria === "" && 
                                    descricaoObjetivo === "" && 
                                    objetivosSelecionados.length === 0 && 
                                    objetivosParaRemover.length === 0 ? 
                                    { backgroundColor: '#E0E0E0', cursor: 'not-allowed' } : 
                                    {}
                            }
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
                                    const estaSelecionado = 
                                        categoria?.objectives.some((objCat) => objCat.id === objetivo.id) && !objetivosParaRemover.some((item) => item.id === objetivo.id)
                                            || 
                                        objetivosSelecionados.some((item) => item.id === objetivo.id) && !objetivosParaRemover.some((item) => item.id === objetivo.id);
    
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
                        </div>
                    </div>
                )}
            </div>
            </>
        );
    } else {
       return (
            <div className={styles.mob}>
                <div className={styles.overlay}>
                    <div className={styles.containerPopUp}>
                        <div className={styles.botoesTopo}>
                            <motion.button
                                whileHover={{ scale: 1.1 }} 
                                whileTap={{ scale: 0.8 }}
                                className={styles.botaoVoltar} 
                                onClick={() => window.location.reload()}
                            >
                                <strong style={{color: '#0B0E31'}}>X</strong>
                            </motion.button>
                            <motion.button
                                whileHover={{ scale: 1.2 }} 
                                whileTap={{ scale: 0.8 }}
                                className={styles.lixeira}
                                onClick={() => {deletarCategoria();}}
                            >
                                <Image 
                                    src="/lixeiraIcon.svg"
                                    alt="Icone Lixeira"
                                    width={27}
                                    height={29}
                                />
                            </motion.button>
                        </div>
                        <div className={styles.conteudo}>
                            <Image 
                                src="/iconeObjetivo-NovoObjetivo.svg"
                                alt="Icone Objetivo"
                                width={72}
                                height={72}
                                className={styles.icone}
                            />
                            <h2>Editar Categoria</h2>
                            <div className={styles.inputs}>
                                <div className={styles.inputObjetivo}>
                                    <h3>Nome</h3>
                                    <div className={styles.input}>
                                        <input
                                            type="text"
                                            id="nomeCategoria"
                                            value={nomeCategoria}
                                            onChange={(e) => setNomeCategoria(e.target.value)}
                                            placeholder={categoria ? categoria.categoryName : "Digite o nome da categoria..."}
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
                                            placeholder={categoria ? categoria.categoryDescription : "Escreva detalhes sobre o seu objetivo..."}
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
                                whileHover={!verListaDeObjetivos  ? { scale: 1.1 } : { scale: 1.0 }} 
                                whileTap={!verListaDeObjetivos ? { scale: 0.8 } : { scale: 1.0 }}
                                onClick={!verListaDeObjetivos ? handleSalvarCategoriaComObjetivos : undefined}
                                // onClick={() => alert('Objetivos para adicionar: ' + objetivosSelecionados.length + 
                                //     ' - Objetivos para remover: ' + objetivosParaRemover.length)}
                                style={
                                        verListaDeObjetivos || 
                                        nomeCategoria === "" && 
                                        descricaoObjetivo === "" && 
                                        objetivosSelecionados.length === 0 && 
                                        objetivosParaRemover.length === 0 ? 
                                        { backgroundColor: '#E0E0E0', cursor: 'not-allowed' } : 
                                        {}
                                }
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
                    {verListaDeObjetivos && (
                    <div className={styles.overlay}>
                        <div className={styles.containerPopUp}>
                            <motion.button
                                whileHover={{ scale: 1.06 }} 
                                whileTap={{ scale: 0.8 }}
                                className={styles.botaoVoltar} 
                                onClick={() => setVerListaDeObjetivos(false)}
                                >
                                <strong style={{color: '#0B0E31'}}>Voltar - Objetivos</strong>
                            </motion.button>
                            <div className={styles.conteudo}>
                                <div className={styles.containerScroll}>
                                    {objetivos && objetivos.map((objetivo) => {
                                        const estaSelecionado = 
                                            categoria?.objectives.some((objCat) => objCat.id === objetivo.id) && !objetivosParaRemover.some((item) => item.id === objetivo.id)
                                                || 
                                            objetivosSelecionados.some((item) => item.id === objetivo.id) && !objetivosParaRemover.some((item) => item.id === objetivo.id);
        
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
                            </div>
                        </div>
                    </div>
                    )}
                </div>
            </div>
       ); 
    }
}