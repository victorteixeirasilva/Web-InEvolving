import Image from "next/image";
import styles from "./EditarObjetivo.module.scss";
import * as motion from "motion/react-client";
import { useEffect, useState } from "react";
// import { ClipLoader } from 'react-spinners';
// import { useRouter } from "next/navigation";
// import { linkApi } from "../../../../constants";

export default function AlterarInformacoesDoUsuario() {
    const [isMobile, setIsMobile] = useState(false);
        
    useEffect(() => {
        const largura = window.innerWidth;
        setIsMobile(largura <= 1024);
    }, []);

    const [nomeUsuario, setNomeUsuario] = useState<string>("");
    const [email, setEmail] = useState<string>("");
    // const [carregando, setCarregando] = useState(false);
    
    // const router = useRouter();


    return (
        <div className={isMobile ? styles.mob : ''}>
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
                    </div>
                    <div className={styles.conteudo}>
                        <Image 
                            src="/iconeObjetivo-NovoObjetivo.svg"
                            alt="Icone Novo Sonho"
                            width={72}
                            height={72}
                            className={styles.icone}
                        />
                        <h2>Editar Informações Do Usuário</h2>
                        <div className={styles.inputs}>
                            <div className={styles.inputObjetivo}>
                                <h3>Nome do Usuário</h3>
                                <div className={styles.input}>
                                    <input
                                        type="text"
                                        id="nomeUsuario"
                                        value={nomeUsuario}
                                        onChange={(e) => setNomeUsuario(e.target.value)}
                                        placeholder={nomeUsuario ? nomeUsuario : "Digite o seu nome..."}
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
                                <h3>Email</h3>
                                <div className={styles.input}>
                                    <input 
                                        type="text"
                                        id="email"
                                        value={email}
                                        onChange={(e) => setEmail(e.target.value)}
                                        placeholder={email ? email : "Digite um e-mail valido..."}
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
                        </div>
                        {/* <motion.button
                            whileHover={{ scale: 1.05 }} 
                            whileTap={{ scale: 0.8 }}
                            style={ 
                                    nomeUsuario === sonho.name && 
                                    email === sonho.description &&
                                    coverImage === sonho.urlImage ? 
                                    { backgroundColor: '#E0E0E0', cursor: 'not-allowed' } : 
                                    {}
                            }
                            onClick={() => 
                                    nomeUsuario === sonho.name && 
                                    email === sonho.description &&
                                    coverImage === sonho.urlImage ? 
                                    undefined :
                                    atualizarSonho()
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
                        </motion.button> */}
                    </div>
                </div>
            </div>
        </div>
    );

    // if (!isMobile) {
    //     return (
    //         <div className={styles.overlay}>
    //             <div className={styles.containerPopUp}>
    //                 <div className={styles.botoesTopo}>
    //                     <motion.button
    //                         whileHover={{ scale: 1.1 }} 
    //                         whileTap={{ scale: 0.8 }}
    //                         className={styles.botaoVoltar} 
    //                         onClick={() => window.location.reload()}
    //                     >
    //                         <strong>X</strong>
    //                     </motion.button>
    //                     <motion.button
    //                         whileHover={{ scale: 1.2 }} 
    //                         whileTap={{ scale: 0.8 }}
    //                         className={styles.lixeira}
    //                         onClick={() => {
    //                                 if (confirm('Tem certeza que deseja excluir este sonho?')) {
    //                                     deletarSonho();
    //                                 }}}
    //                     >
    //                         <Image 
    //                             src="/lixeiraIcon.svg"
    //                             alt="Icone Lixeira"
    //                             width={27}
    //                             height={29}
    //                         />
    //                     </motion.button>
    //                 </div>
    //                 <div className={styles.conteudo}>
    //                     <Image 
    //                         src="/iconeObjetivo-NovoObjetivo.svg"
    //                         alt="Icone Novo Sonho"
    //                         width={72}
    //                         height={72}
    //                         className={styles.icone}
    //                     />
    //                     <h2>Editar Sonho</h2>
    //                     <div className={styles.inputs}>
    //                         <div className={styles.inputObjetivo}>
    //                             <h3>Nome do Sonho</h3>
    //                             <div className={styles.input}>
    //                                 <input
    //                                     type="text"
    //                                     id="nomeSonho"
    //                                     value={nomeSonho}
    //                                     onChange={(e) => setNomeSonho(e.target.value)}
    //                                     placeholder={sonho ? sonho.name : "Digite o nome do sonho..."}
    //                                 />
    //                                 <Image 
    //                                     className={styles.lapis}
    //                                     src="/iconeLapisCinza.svg"
    //                                     alt="Icone Lapis"
    //                                     width={15}
    //                                     height={15}
    //                                     />
    //                             </div>
    //                             </div>
    //                         <div className={styles.inputDescrição}>
    //                             <h3>Descrição do Sonho</h3>
    //                             <div className={styles.input}>
    //                                 <input 
    //                                     type="text"
    //                                     id="descricaoSonho"
    //                                     value={descricaoSonho}
    //                                     onChange={(e) => setDescricaoSonho(e.target.value)}
    //                                     placeholder={sonho ? sonho.description : "Digite os detalhe do seu sonho..."}
    //                                 />
    //                                 <Image
    //                                     className={styles.lapis} 
    //                                     src="/iconeLapisCinza.svg"
    //                                     alt="Icone Lapis"
    //                                     width={15}
    //                                     height={15}
    //                                     />
    //                             </div>
    //                         </div>
    //                         <div className={styles.inputDescrição}>
    //                             <h3>Url da Imagem</h3>
    //                             <div className={styles.input}>
    //                                 <input 
    //                                     type="text"
    //                                     id="coverImage"
    //                                     value={coverImage}
    //                                     onChange={(e) => setCoverImage(e.target.value)}
    //                                     placeholder={sonho ? sonho.urlImage : "Escreva a url da imagem..."}
    //                                 />
    //                                 <Image
    //                                     className={styles.lapis} 
    //                                     src="/iconeLapisCinza.svg"
    //                                     alt="Icone Lapis"
    //                                     width={15}
    //                                     height={15}
    //                                 />
    //                             </div>
    //                         </div>
    //                     </div>
    //                     <motion.button
    //                         whileHover={{ scale: 1.05 }} 
    //                         whileTap={{ scale: 0.8 }}
    //                         style={ 
    //                                 nomeSonho === sonho.name && 
    //                                 descricaoSonho === sonho.description &&
    //                                 coverImage === sonho.urlImage ? 
    //                                 { backgroundColor: '#E0E0E0', cursor: 'not-allowed' } : 
    //                                 {}
    //                         }
    //                         onClick={() => 
    //                                 nomeSonho === sonho.name && 
    //                                 descricaoSonho === sonho.description &&
    //                                 coverImage === sonho.urlImage ? 
    //                                 undefined :
    //                                 atualizarSonho()
    //                         }
    //                     >
    //                         {carregando && <ClipLoader size={10} color="#0B0E31" />}
    //                         <span 
    //                             style={{ 
    //                                 marginLeft: carregando ? '8px' : '0'
    //                             }}
    //                         ></span>
    //                         Salvar
    //                         <Image 
    //                             className={styles.concluido}
    //                             src="/checkIcon.svg"
    //                             alt="Icone Check"
    //                             width={23}
    //                             height={18}
    //                         />
    //                     </motion.button>
    //                 </div>
    //             </div>
    //         </div>
    //     );
    // } else {
    // }

}