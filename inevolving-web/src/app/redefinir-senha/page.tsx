'use client';

import { useRouter, useSearchParams } from 'next/navigation';
import { useEffect, useState } from 'react';
import * as motion from "motion/react-client";
import styles from "./page.module.scss";
import Image from 'next/image';
import { ClipLoader } from 'react-spinners';


export default function RedefinirSenha() {
  const searchParams = useSearchParams();
  const token = searchParams.get('token');
  const [isMobile, setIsMobile] = useState(false);
  const [carregando, setCarregando] = useState(false);
  const router = useRouter();
  const [novaSenha, setNovaSenha] = useState("");
  const [confirmarSenha, setConfirmarSenha] = useState("");

  useEffect(() => {
      const largura = window.innerWidth;
      setIsMobile(largura <= 1024);
  }, []);

  const alterarSenha = async () => {
        setCarregando(true);

        const response = await fetch(
            'https://api.inevolving.inovasoft.tech/api/authentication/forgot/update', 
        {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    idToken: token,
                    newPassword: novaSenha,
                })
        });
    
        if (!response.ok){
            setCarregando(false);
            alert('Erro ao alterar a senha. Por favor, tente novamente.');
        }
        
        setCarregando(false);
        router.push('/login');
  }

      if (!isMobile) {
        return (
            <>
            <div className={styles.overlay}>
                <div className={styles.containerPopUp}>
                    <div className={styles.conteudo}>
                        <h2>Informe sua Nova Senha</h2>
                        <div className={styles.inputs}>
                            <div className={styles.inputObjetivo}>
                                <h3>Nova Senha</h3>
                                <div className={styles.input}>
                                    <input
                                        type="password"
                                        id="novaSenha"
                                        value={novaSenha}
                                        onChange={(e) => setNovaSenha(e.target.value)}
                                        placeholder="Digite sua senha..."
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
                            <div className={styles.inputObjetivo}>
                                <h3>Confirme a Senha</h3>
                                <div className={styles.input}>
                                    <input
                                        type="password"
                                        id="confirmarSenha"
                                        value={confirmarSenha}
                                        onChange={(e) => setConfirmarSenha(e.target.value)}
                                        placeholder="Digite sua senha novamente..."
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
                        <motion.button
                            whileHover={{ scale: 1.05 }} 
                            whileTap={{ scale: 0.8 }}
                            style={ 
                                    novaSenha !== confirmarSenha ? 
                                    { backgroundColor: '#E0E0E0', cursor: 'not-allowed' } : 
                                    {}
                            }
                            onClick={() => 
                                novaSenha !== confirmarSenha ?
                                undefined :
                                alterarSenha()
                            }
                        >
                            {carregando && <ClipLoader size={10} color="#0B0E31" />}
                            <span 
                                style={{ 
                                    marginLeft: carregando ? '8px' : '0'
                                }}
                            ></span>
                            Enviar
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
            </>
        );
    } else {
        return (
            <div className={styles.mob}>
                <div className={styles.overlay}>
                  <div className={styles.containerPopUp}>
                      <div className={styles.conteudo}>
                          <h2>Informe sua Nova Senha</h2>
                          <div className={styles.inputs}>
                              <div className={styles.inputObjetivo}>
                                  <h3>Nova Senha</h3>
                                  <div className={styles.input}>
                                      <input
                                          type="password"
                                          id="novaSenha"
                                          value={novaSenha}
                                          onChange={(e) => setNovaSenha(e.target.value)}
                                          placeholder="Digite sua senha..."
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
                              <div className={styles.inputObjetivo}>
                                  <h3>Confirme a Senha</h3>
                                  <div className={styles.input}>
                                      <input
                                          type="password"
                                          id="confirmarSenha"
                                          value={confirmarSenha}
                                          onChange={(e) => setConfirmarSenha(e.target.value)}
                                          placeholder="Digite sua senha novamente..."
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
                          <motion.button
                              whileHover={{ scale: 1.05 }} 
                              whileTap={{ scale: 0.8 }}
                              style={ 
                                      novaSenha !== confirmarSenha ? 
                                      { backgroundColor: '#E0E0E0', cursor: 'not-allowed' } : 
                                      {}
                              }
                              onClick={() => 
                                  novaSenha !== confirmarSenha ?
                                  undefined :
                                  alterarSenha()
                              }
                          >
                              {carregando && <ClipLoader size={10} color="#0B0E31" />}
                              <span 
                                  style={{ 
                                      marginLeft: carregando ? '8px' : '0'
                                  }}
                              ></span>
                              Enviar
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
            </div>
        );
    }
}