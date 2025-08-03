import Image from "next/image";
import styles from "./EditarObjetivo.module.scss";
import * as motion from "motion/react-client";
import { useEffect, useState } from "react";
import { ClipLoader } from 'react-spinners';
import { useRouter } from "next/navigation";
import { Livro } from "@/components/interfaces/Livro";

export default function EditarLivro( { livro }: { livro: Livro } ) {

    const [tituloLivro, setTituloLivro] = useState(livro.title);
    const [autorLivro, setAutorLivro] = useState(livro.author);
    const [temaLivro, setTemaLivro] = useState(livro.theme);
    const [coverImage, setCoverImage] = useState(livro.coverImage);
    const [carregando, setCarregando] = useState(false);
    const [jwtToken, setJwtToken] = useState('');
    const [status, setStatus] = useState(livro.status);

    useEffect(() => {
        const token = localStorage.getItem('token');
        setJwtToken(token || '');
    }, []);
    
    const deletarLivro = async () => {
        setCarregando(true);

        const response = await fetch(
            'http://127.0.0.1:2327/auth/api/books/'+livro?.id, 
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
            alert('Erro ao deletar livro');
        }

        setCarregando(false);
        window.location.reload();
    };

    const router = useRouter();

    const atualizarLivro = async () => {

            setCarregando(true);


            const response = await fetch(
                    'http://127.0.0.1:2327/auth/api/books/'+livro.id, 
                {
                        method: 'PUT',
                        headers: {
                            'Content-Type': 'application/json',
                            'Authorization': 'Bearer ' + localStorage.getItem('token')
                        },
                        body: JSON.stringify({
                            title: tituloLivro,
                            author: autorLivro,
                            theme: temaLivro,
                            coverImage: coverImage,
                        })
                }
            );
        
                
            if (response.status === 401){
                setCarregando(false);
                router.push('/login');
                alert('Você não está logado, por favor faça login novamente.');
            }
        
            if (!response.ok){
                setCarregando(false);
                alert('Erro ao atualizar livro');
            }

            

            if (!(status === livro.status)) {
                if (status === "TO DO") {
                    const response = await fetch(
                        'http://127.0.0.1:2327/auth/api/books/status/todo/'+livro.id, 
                    {
                            method: 'PATCH',
                            headers: {
                                'Content-Type': 'application/json',
                                'Authorization': 'Bearer ' + localStorage.getItem('token')
                            },
                    });
                        
                    if (response.status === 401){
                        setCarregando(false);
                        router.push('/login');
                        alert('Você não está logado, por favor faça login novamente.');
                    }
                
                    if (!response.ok){
                        setCarregando(false);
                        alert('Erro ao atualizar livro');
                    }
                    
                } else if (status === "IN PROGRESS") {
                    const response = await fetch(
                        'http://127.0.0.1:2327/auth/api/books/status/progress/'+livro.id, 
                    {
                            method: 'PATCH',
                            headers: {
                                'Content-Type': 'application/json',
                                'Authorization': 'Bearer ' + localStorage.getItem('token')
                            },
                    });
                        
                    if (response.status === 401){
                        setCarregando(false);
                        router.push('/login');
                        alert('Você não está logado, por favor faça login novamente.');
                    }
                
                    if (!response.ok){
                        setCarregando(false);
                        alert('Erro ao atualizar livro');
                    }
                    
                } else if (status === "COMPLETED") {
                    const response = await fetch(
                        'http://127.0.0.1:2327/auth/api/books/status/completed/'+livro.id, 
                    {
                            method: 'PATCH',
                            headers: {
                                'Content-Type': 'application/json',
                                'Authorization': 'Bearer ' + localStorage.getItem('token')
                            },
                    });
                        
                    if (response.status === 401){
                        setCarregando(false);
                        router.push('/login');
                        alert('Você não está logado, por favor faça login novamente.');
                    }
                
                    if (!response.ok){
                        setCarregando(false);
                        alert('Erro ao atualizar livro');
                    }
                    
                }
            } 
            
            setCarregando(false);
            window.location.reload();
    }

    return (
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
                                if (confirm('Tem certeza que deseja excluir este livro?')) {
                                    deletarLivro();
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
                        src="/IconeNovoLivro.svg"
                        alt="Icone Novo Livro"
                        width={72}
                        height={72}
                        className={styles.icone}
                    />
                    <h2>Editar Livro</h2>
                    <div className={styles.inputs}>
                        <div className={styles.inputObjetivo}>
                            <h3>Título</h3>
                            <div className={styles.input}>
                                <input
                                    type="text"
                                    id="tituloLivro"
                                    value={tituloLivro}
                                    onChange={(e) => setTituloLivro(e.target.value)}
                                    placeholder={livro ? livro.title : "Digite o título do livro..."}
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
                            <h3>Autor</h3>
                            <div className={styles.input}>
                                <input 
                                    type="text"
                                    id="autorLivro"
                                    value={autorLivro}
                                    onChange={(e) => setAutorLivro(e.target.value)}
                                    placeholder={livro ? livro.author : "Escreva o nome do autor do Livro..."}
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
                            <h3>Tema</h3>
                            <div className={styles.input}>
                                <input 
                                    type="text"
                                    id="temaLivro"
                                    value={temaLivro}
                                    onChange={(e) => setTemaLivro(e.target.value)}
                                    placeholder={livro ? livro.theme : "Escreva o nome do tema do Livro..."}
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
                            <h3>Url da Imagem de Capa</h3>
                            <div className={styles.input}>
                                <input 
                                    type="text"
                                    id="temaLivro"
                                    value={coverImage}
                                    onChange={(e) => setCoverImage(e.target.value)}
                                    placeholder={livro ? livro.coverImage : "Escreva a url da imagem..."}
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
                        >
                            <h3>Status do Livro</h3>
                            <div className={styles.containerStatus}>
                                <motion.div
                                    style={status === "TO DO" ? { backgroundColor: '#6b6b6b', color: '#FFF' } : { backgroundColor: '#F4F4FE', color: '#0B0E31'}} 
                                    className={styles.status}
                                    whileHover={{ scale: 1.1, backgroundColor: '#6b6b6b', color: '#FFF' }} 
                                    whileTap={{ scale: 0.95 }}
                                    onClick={() => setStatus("TO DO")}
                                >
                                    Leitura Pendente
                                </motion.div>
                                <motion.div
                                    style={status === "IN PROGRESS" ? { backgroundColor: '#a0ff47' } : { backgroundColor: '#F4F4FE', color: '#0B0E31'}} 
                                    className={styles.status}
                                    whileHover={{ scale: 1.1, backgroundColor: '#a0ff47' }} 
                                    whileTap={{ scale: 0.95 }}
                                    onClick={() => setStatus("IN PROGRESS")}
                                >
                                    Lendo
                                </motion.div>
                                <motion.div 
                                    style={status === "COMPLETED" ? { backgroundColor: '#319f43', color: '#FFF' } : { backgroundColor: '#F4F4FE', color: '#0B0E31'}} 
                                    className={styles.status}
                                    whileHover={{ scale: 1.1, backgroundColor: '#319f43', color: '#FFF' }} 
                                    whileTap={{ scale: 0.95 }}
                                    onClick={() => setStatus("COMPLETED")}
                                >
                                    Leitura Finalizada
                                </motion.div>
                            </div>
                        </motion.div>
                    </div>
                    <motion.button
                        whileHover={{ scale: 1.05 }} 
                        whileTap={{ scale: 0.8 }}
                        style={ 
                                tituloLivro === livro.title && 
                                autorLivro === livro.author &&
                                temaLivro === livro.theme &&
                                coverImage === livro.coverImage &&
                                livro.status === status ? 
                                { backgroundColor: '#E0E0E0', cursor: 'not-allowed' } : 
                                {}
                        }
                        onClick={() => 
                                tituloLivro === livro.title && 
                                autorLivro === livro.author &&
                                temaLivro === livro.theme &&
                                coverImage === livro.coverImage &&
                                livro.status === status ? 
                                undefined :
                                atualizarLivro()
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
        </div>
    );

}