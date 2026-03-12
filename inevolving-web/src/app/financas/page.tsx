'use client';

export const dynamic = "force-dynamic";

import { useCallback, useEffect, useState } from 'react';
import Menu from "@/components/Menu";
import styles from './page.module.scss';
import Image from "next/image";
import * as motion from "motion/react-client";
import { useRouter } from 'next/navigation';
import { ResponseFinancas } from '@/components/interfaces/ResponseFinancas';
import { ClipLoader } from 'react-spinners';
import { Calendar, CalendarProps } from 'react-calendar';
import { linkApi } from '../../constants';

export default function Categoria() {
    const [isMobile, setIsMobile] = useState(false);
    const [tipoMenuDesk, setTipoMenuDesk] = useState<number | undefined>(undefined);
    const [tema, setTema] = useState<number | undefined>(undefined);
    const [corBackgroundInput, setCorBackgroundInput] = useState<string>("");
    
    useEffect(() => {
        if (typeof window !== 'undefined') {
            const largura = window.innerWidth;
            setIsMobile(largura <= 1024);

            const tipo = localStorage.getItem('tipoMenuDesk');
            setTipoMenuDesk(tipo ? parseInt(tipo) : 1);
            setTema(
                localStorage.getItem('tema') ?
                parseInt(localStorage.getItem('tema') as string) : 2
            );

            if (parseInt(localStorage.getItem('tema') as string) === 2) {
                setCorBackgroundInput("#F4F4FE");
            } else {
                setCorBackgroundInput("#535353");
            }
        }
    }, []);

    const [carregando, setCarregando] = useState(false);
    const router = useRouter();
    const [dadosDoMes, setDadosDoMes] = useState<ResponseFinancas | null>(null);
    const [mesAtual, setMesAtual] = useState(new Date().getMonth());
    const [anoAtual, setAnoAtual] = useState(new Date().getFullYear());
    

    const getNomeDoMes = (mes:number) => {
        if (mes === 1){
            return "JANEIRO";
        } else if (mes === 2) {
            return "FEVEREIRO";
        } else if (mes === 3) {
            return "MARÇO";
        } else if (mes === 4) {
            return "ABRIL";
        } else if (mes === 5) {
            return "MAIO";
        } else if (mes === 6) {
            return "JUNHO";
        } else if (mes === 7) {
            return "JULHO";
        } else if (mes === 8) {
            return "AGOSTO";
        } else if (mes === 9) {
            return "SETEMBRO";
        } else if (mes === 10) {
            return "OUTUBRO";
        } else if (mes === 11) {
            return "NOVEMBRO";
        } else if (mes === 12) {
            return "DEZEMBRO";
        } else {
            return "mes indefinido"
        }
    }

    const deletarTransacao = async (id:string) => {
        setCarregando(true);

        const response = await fetch(linkApi + '/auth/api/finance/transaction/'+id, {
                method: 'DELETE',
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
        

    
        setCarregando(false);
        window.location.reload();

    }

    const pegarFinancas = useCallback(async (anoAtual:number, mesAtual:number) => {
        setCarregando(true);
   
            const primeiroDiaDoMesAtual =
                anoAtual +
                "-" +
                mesAtual +
                "-01";
            if (mesAtual > 12) {
                mesAtual = 0;
                anoAtual = anoAtual + 1;
                setAnoAtual(anoAtual);
            }
            const proximoMes = mesAtual === 12 ? 1 : mesAtual + 1;
            const primeiroDiaDoMesSeguinte =
                anoAtual +
                "-" +
                proximoMes +
                "-01";

            // alert(primeiroDiaDoMesAtual+ "/" +primeiroDiaDoMesSeguinte)

            const response = await fetch(
                linkApi + '/auth/api/finance/'+primeiroDiaDoMesAtual+'/'+primeiroDiaDoMesSeguinte, 
            {
                    method: 'GET',
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
    
            if (response.ok) {
                const data:ResponseFinancas = await response.json();
                setDadosDoMes(data);
                if (data.wage === 0) {
                    setPrimeiroLogin(true);
                }
            } else {
                setCarregando(false);
                router.push('/login');
                alert('Aconteceu algum problema ao pegar as informações de finanças, por favor faça login novamente.');
            }
    
            setCarregando(false);
    }, [router])

    useEffect(() => {
        const hoje = new Date();
        pegarFinancas(hoje.getFullYear(), hoje.getMonth() + 1)
        setMesAtual(hoje.getMonth() + 1);
        setAnoAtual(hoje.getFullYear())
    }, [pegarFinancas]);

    const [primeiroLogin, setPrimeiroLogin] = useState(false);
    const [abrirEditarSalario, setAbrirEditarSalario] = useState(false);
    const [abrirInformativoCustoDeVida, setAbrirInformativoCustoDeVida] = useState(false);
    const [abrirInformativoInvestimento, setAbrirInformativoInvestimento] = useState(false);
    const [abrirInformativoEntradas, setAbrirInformativoEntradas] = useState(false);
    const [abrirInformativoTotal, setAbrirInformativoTotal] = useState(false);
    const [abrirNovaTransacao, setAbrirNovaTransacao] = useState(false);
    const [verTodasAsTrasacoes, setVerTodasAsTrasacoes] = useState(false);
    const [salario, setSalario] = useState("");
    const [valorDaNovaTransacao, setValorDaNovaTransacao] = useState("");
    const [tipoDaNovaTransacao, setTipoDaNovaTransacao] = useState(0);
    const [filtroAtivo, setFiltroAtivo] = useState(1);
    const [valorDaNovaTransacaoNumerico, setValorDaNovaTransacaoNumerico] = useState(0);
    const [descricaoNovaTransacao, setDescricaoNovaTransacao] = useState("");
    const [salarioNumerico, setSalarioNumerico] = useState(0);
    const [escolherDataFinal, setEscolherDataFinal] = useState(false);
    const [data, setData] = useState<Date | null>(new Date);


    const SetDataFinal : CalendarProps['onChange'] = (value) => {
        if (value instanceof Date) {
            setData(value);
        } else if (Array.isArray(value) && value[0] instanceof Date) {
            setData(value[0]); // ou outro tratamento para intervalo
        }
    };

    const formatarSalario = (valor: string) => {
        // Remove tudo que não for número
        const numeros = valor.replace(/\D/g, "");

        // Converte para número e divide por 100 para ter centavos
        const valorNumerico = parseFloat(numeros) / 100;

        setSalarioNumerico(valorNumerico);

        // Formata como moeda brasileira
        return valorNumerico.toLocaleString("pt-BR", {
            style: "currency",
            currency: "BRL",
        });
        
    };

    const formatarValorNovaTransacao = (valor: string) => {
        // Remove tudo que não for número
        const numeros = valor.replace(/\D/g, "");

        // Converte para número e divide por 100 para ter centavos
        const valorNumerico = parseFloat(numeros) / 100;

        setValorDaNovaTransacaoNumerico(valorNumerico);

        // Formata como moeda brasileira
        return valorNumerico.toLocaleString("pt-BR", {
            style: "currency",
            currency: "BRL",
        });
        
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const valorDigitado = e.target.value;
        const formatado = formatarSalario(valorDigitado);
        setSalario(formatado);
    };

    const handleChangeNovaTransacao = (e: React.ChangeEvent<HTMLInputElement>) => {
        const valorDigitado = e.target.value;
        const formatado = formatarValorNovaTransacao(valorDigitado);
        setValorDaNovaTransacao(formatado);
    };

    const adiicionarNovaTransacao = async () => {
        setCarregando(true);

        if (tipoDaNovaTransacao === 1) {

            const response = await fetch(
                linkApi + '/auth/api/finance/transaction/cost_of_living', 
            {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': 'Bearer ' + localStorage.getItem('token')
                    },
                    body: JSON.stringify({
                        date: data?.toISOString().split('T')[0],
                        description: descricaoNovaTransacao,
                        value: valorDaNovaTransacaoNumerico
                    }),
            });
    
            if (response.status === 401){
                setCarregando(false);
                router.push('/login');
                alert('Você não está logado, por favor faça login novamente.');
            }
            
        } else if (tipoDaNovaTransacao === 2) {

            const response = await fetch(
                linkApi + '/auth/api/finance/transaction/investment', 
            {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': 'Bearer ' + localStorage.getItem('token')
                    },
                    body: JSON.stringify({
                        date: data?.toISOString().split('T')[0],
                        description: descricaoNovaTransacao,
                        value: valorDaNovaTransacaoNumerico
                    }),
            });
    
            if (response.status === 401){
                setCarregando(false);
                router.push('/login');
                alert('Você não está logado, por favor faça login novamente.');
            }
            
        } else if (tipoDaNovaTransacao === 3) {

            const response = await fetch(
                linkApi + '/auth/api/finance/transaction/extra_contribution', 
            {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': 'Bearer ' + localStorage.getItem('token')
                    },
                    body: JSON.stringify({
                        date: data?.toISOString().split('T')[0],
                        description: descricaoNovaTransacao,
                        value: valorDaNovaTransacaoNumerico
                    }),
            });
    
            if (response.status === 401){
                setCarregando(false);
                router.push('/login');
                alert('Você não está logado, por favor faça login novamente.');
            }

        } else {
            alert("Tipo de transação incorreto!")
        }

        setCarregando(false);
        setAbrirNovaTransacao(false);
        setDescricaoNovaTransacao("");
        setValorDaNovaTransacao("");
        setValorDaNovaTransacaoNumerico(0);
        setTipoDaNovaTransacao(0);
        pegarFinancas(anoAtual, mesAtual);
    }

    const atualizarSalario = async ({salario}:{salario:number}) => {
            
            setCarregando(true);
   
            const response = await fetch(
                linkApi + '/auth/api/finance/wage', 
            {
                    method: 'PATCH',
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': 'Bearer ' + localStorage.getItem('token')
                    },
                    body: JSON.stringify({
                        wage: salario,
                    }),
            });
    
            if (response.status === 401){
                setCarregando(false);
                router.push('/login');
                alert('Você não está logado, por favor faça login novamente.');
            }
    
            if (response.ok) {
                setCarregando(false);
                window.location.reload();
            }
    
            setCarregando(false);
    };

    return (
        <div className={tema === 1 ? styles.dark : styles.temaClaro}>
            <motion.div className={isMobile ? styles.mob : tipoMenuDesk === 2 ? styles.containerTipoMenu2 : ''}>
                {primeiroLogin && (
                    <div className={styles.overlay}>
                        <motion.div 
                            className={styles.containerPopUp}
                        >
                            <div className={styles.botoesTopo}>
                            <motion.button
                                whileHover={{ scale: 1.1 }} 
                                whileTap={{ scale: 0.8 }}
                                className={styles.botaoVoltar} 
                                onClick={() => router.push("/dashboard")}
                            >
                                <strong>X</strong>
                            </motion.button>
                            </div>
                            <div className={styles.conteudo}>
                                <Image 
                                    src="/iconeFinanças.svg"
                                    alt="Icone Finanças"
                                    width={72}
                                    height={72}
                                    className={styles.icone}
                                />
                                <h2>Primeiros passos para o controle total das suas finanças!</h2>
                                <p>
                                    Neste aplicativo, você será guiado por uma estratégia milenar, simples e poderosa: a regra 90-10, inspirada no clássico livro &quot;O Homem Mais Rico da Babilônia&quot;.
                                </p>
                                <p>
                                    <h3>📜 Por mais de mil</h3> anos, essa filosofia tem ajudado pessoas a construir riqueza de forma consistente. A ideia é clara: <br/>
                                    - Guarde 10% de tudo o que você ganha. Viva com os 90% restantes.
                                </p>
                                <p>
                                    Antes de mergulhar nos gráficos e relatórios, aqui vai um spoiler da filosofia que guia este software: a estratégia 90-10, baseada no clássico &quot;O Homem Mais Rico da Babilônia&quot; — um best-seller que já ensinava finanças antes mesmo de existirem bancos digitais (ou boletos, infelizmente).
                                </p>
                                <p>
                                    <h3>🔍 Como funciona?</h3> <br/>
                                        - 10% da sua renda: reservado para você — seu futuro, seus sonhos, sua liberdade financeira.<br/>
                                        - 90%: para viver, pagar contas, e ocasionalmente comprar aquele café gourmet que custa o preço de um almoço.<br/>
                                </p>
                                <p>
                                    Essa regra simples tem resistido ao teste do tempo por mais de mil anos. E não, não é porque os babilônios tinham planilhas em Excel — é porque funciona.
                                </p>
                                <p>
                                    Aqui, você terá controle, clareza e consistência para aplicar essa estratégia com inteligência.
                                </p>
                                <p>
                                    E se em algum momento parecer difícil... lembre-se: até os reis da Babilônia começaram guardando moedas de cobre.
                                </p>
                                <h3>
                                    💡 Comece pequeno, pense grande. Seu futuro começa agora.
                                </h3>
                                <div>
                                    <h3>
                                        Cadastre seu salário!
                                    </h3>
                                    <div>
                                        <div className={styles.input}>
                                            <input 
                                                type="text"
                                                id="salario"
                                                value={salario}
                                                onChange={handleChange}
                                                placeholder="Informe seu salário..."
                                            />
                                            <Image
                                                className={styles.lapis} 
                                                src="/iconeLapisCinza.svg"
                                                alt="Icone Lapis"
                                                width={15}
                                                height={15}
                                            />
                                        </div>
                                        <motion.button
                                            whileHover={{ scale: 1.05 }} 
                                            whileTap={{ scale: 0.8 }}
                                            style={ 
                                                    salario === "" ? 
                                                    { backgroundColor: '#E0E0E0', cursor: 'not-allowed' } : 
                                                    {}
                                            }
                                            onClick={() => 
                                                    salario === "" ||
                                                    salarioNumerico <= 0 ? 
                                                    undefined :
                                                    atualizarSalario({salario: salarioNumerico})
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
                        </motion.div>
                    </div>
                )}
                {abrirInformativoCustoDeVida && (
                    <div className={styles.overlay}>
                        <motion.div 
                            className={styles.containerPopUp}
                        >
                            <div className={styles.botoesTopo}>
                            <motion.button
                                whileHover={{ scale: 1.1 }} 
                                whileTap={{ scale: 0.8 }}
                                className={styles.botaoVoltar} 
                                onClick={() => setAbrirInformativoCustoDeVida(false)}
                            >
                                <strong>X</strong>
                            </motion.button>
                            </div>
                            <div className={styles.conteudo}>
                                    <Image 
                                        src="/iconeFinanças.svg"
                                        alt="Icone Finanças"
                                        width={72}
                                        height={72}
                                        className={styles.icone}
                                    />
                                    <h2>💸 Sobre os 90% — Viver com inteligência</h2>
                                    <p>
                                        Você tem 100% de renda, mas aqui vai o truque: viver com os 90%.
                                        Esses 90% são para cobrir seus custos de vida — moradia, alimentação, transporte, lazer (sim, você pode assistir aquele streaming sem culpa). <br/>
                                        
                                        <h2>🔧 O objetivo?</h2>
        
                                        - Evitar o ciclo de “ganha-gasta-chora”. <br/>
                                        - Criar hábitos sustentáveis e evitar dívidas desnecessárias. <br/>
                                        - Priorizar o que importa, sem abrir mão do conforto. <br/>
                                        <br/>
                                        📉 Gastar tudo o que se ganha é fácil. <br/>
                                        📈 Viver com menos e ainda prosperar? Isso é inteligência financeira. <br/>
                                    </p>
                            </div>
                        </motion.div>
                    </div>
                )}
                {abrirInformativoEntradas && (
                    <div className={styles.overlay}>
                        <motion.div 
                            className={styles.containerPopUp}
                        >
                            <div className={styles.botoesTopo}>
                            <motion.button
                                whileHover={{ scale: 1.1 }} 
                                whileTap={{ scale: 0.8 }}
                                className={styles.botaoVoltar} 
                                onClick={() => setAbrirInformativoEntradas(false)}
                            >
                                <strong>X</strong>
                            </motion.button>
                            </div>
                            <div className={styles.conteudo}>
                                    <Image 
                                        src="/iconeFinanças.svg"
                                        alt="Icone Finanças"
                                        width={72}
                                        height={72}
                                        className={styles.icone}
                                    />
                                    <h2>💼 Entradas Extras — O bônus que merece estratégia</h2>
                                    <p>
                                        Nem só de salário vive o orçamento. Aqui entram as rendas extras:<br/>
                                        freelas, vendas casuais, aquele PIX inesperado da avó, ou até o cashback que você jura que vai investir (mas às vezes vira pizza).
                                    </p>
                                    <h2>📥 O que são Entradas Extras?</h2>
                                    <p>
                                        - Ganhos fora da renda principal.<br/>
                                        <br/>
                                        - Podem ser pontuais ou recorrentes.<br/>
                                        <br/>
                                        - Devem ser somados ao seu planejamento, não ignorados como “dinheiro mágico”.
                                        <br/>
                                    </p>
                                    <h2>
                                        📊 Como usar com inteligência?
                                    </h2>
                                    <p>
                                        - Aplique a mesma regra 90-10: 10% vai para o seu futuro, 90% pode reforçar seu orçamento ou acelerar metas.<br/>
                                        <br/>
                                        - Evite o impulso de gastar só porque “não estava no plano”.<br/>
                                        <br/>
                                        - Use essas entradas para criar margem, investir ou quitar dívidas mais rápido<br/>
                                    </p>
                                    <h2>
                                        💡 Renda extra não é desculpa para gasto extra — é oportunidade de crescimento. E aqui, cada centavo conta. Literalmente.
                                    </h2>
                            </div>
                        </motion.div>
                    </div>
                )}
                {abrirInformativoInvestimento && (
                    <div className={styles.overlay}>
                        <motion.div 
                            className={styles.containerPopUp}
                        >
                            <div className={styles.botoesTopo}>
                            <motion.button
                                whileHover={{ scale: 1.1 }} 
                                whileTap={{ scale: 0.8 }}
                                className={styles.botaoVoltar} 
                                onClick={() => setAbrirInformativoInvestimento(false)}
                            >
                                <strong>X</strong>
                            </motion.button>
                            </div>
                            <div className={styles.conteudo}>
                                    <Image 
                                        src="/iconeFinanças.svg"
                                        alt="Icone Finanças"
                                        width={72}
                                        height={72}
                                        className={styles.icone}
                                    />
                                    <h2>🪙 Sobre os 10% — O seu futuro começa aqui</h2>
                                    <p>
                                        Esses 10% são sagrados. Não são para gastar, parcelar ou “só esse mês abrir exceção”.
                                        Eles são o seu investimento pessoal — o que vai garantir tranquilidade lá na frente. <br/>
                                        <br/>
                                        🏛️ Inspirado nos ensinamentos da Babilônia, esse valor deve ser guardado antes de qualquer despesa.
                                        Pense nele como um funcionário que trabalha para você 24h por dia, acumulando patrimônio. <br/>
                                        <br/>
                                        📊 Com o tempo, esses 10% viram reserva, viram investimento, viram liberdade.
                                        E tudo começou com uma escolha simples: guardar antes de gastar. <br/>
                                    </p>
                            </div>
                        </motion.div>
                    </div>
                )}
                {abrirInformativoTotal && (
                    <div className={styles.overlay}>
                        <motion.div 
                            className={styles.containerPopUp}
                        >
                            <div className={styles.botoesTopo}>
                            <motion.button
                                whileHover={{ scale: 1.1 }} 
                                whileTap={{ scale: 0.8 }}
                                className={styles.botaoVoltar} 
                                onClick={() => setAbrirInformativoTotal(false)}
                            >
                                <strong>X</strong>
                            </motion.button>
                            </div>
                            <div className={styles.conteudo}>
                                    <Image 
                                        src="/iconeFinanças.svg"
                                        alt="Icone Finanças"
                                        width={72}
                                        height={72}
                                        className={styles.icone}
                                    />
                                    <h2>📈 Balanço Total do Mês — O veredito financeiro</h2>
                                    <p>
                                        Chegou a hora da verdade: depois de entradas, saídas e aquele 10% reservado para o futuro, o que sobrou?
                                    </p>
                                    <h2>
                                        💰 O que é o Balanço Total?
                                    </h2>
                                    <p>
                                        - É o saldo final do mês. <br />
                                        <br />
                                        - Mostra quanto sobrou além da reserva de 10%. <br />
                                        <br />
                                        - Revela se você está acumulando, equilibrando ou precisando ajustar. <br />
                                    </p>
                                    <h2>🔍 Como interpretar?</h2>
                                    <p>
                                        - Saldo positivo: ótimo! Você pode investir mais, antecipar metas ou reforçar sua reserva. <br/>
                                        <br/>
                                        - Saldo zerado: está no limite — vale revisar gastos e buscar otimizações. <br/>
                                        <br/>
                                        - Saldo negativo: alerta vermelho. Hora de reavaliar prioridades e cortar excessos. <br/>
                                    </p>
                                    <h2>
                                        🎯 E o que fazer com o que sobrou?
                                    </h2>
                                    <p>
                                        - Reinvestir: aumente sua porcentagem de investimento. <br/>
                                        <br/>
                                        - Quitar dívidas: adiantar parcelas pode reduzir juros. <br/>
                                        <br/>
                                        - Criar colchão: monte uma reserva para imprevistos. <br/>
                                        <br/> 
                                        - Ou, se tudo estiver em dia… recompense-se com consciência.
                                    </p>
                            </div>
                        </motion.div>
                    </div>
                )}
                {abrirNovaTransacao && (
                    <div className={styles.overlay}>
                        <div className={styles.containerPopUpEdit}>
                            <div className={styles.botoesTopo}>
                                <motion.button
                                    whileHover={{ scale: 1.1 }} 
                                    whileTap={{ scale: 0.8 }}
                                    className={styles.botaoVoltar} 
                                    onClick={() => {
                                        setAbrirNovaTransacao(false);
                                        setDescricaoNovaTransacao("");
                                        setValorDaNovaTransacao("");
                                        setValorDaNovaTransacaoNumerico(0);
                                        setTipoDaNovaTransacao(0);
                                        pegarFinancas(anoAtual, mesAtual);
                                    }}
                                >
                                <strong>X</strong>
                                </motion.button>
                            </div>
                            <div className={styles.conteudo}>
                                <div>
                                    <h3>Descrição da Transação</h3>
                                    <div className={styles.input}>
                                        <input
                                            type="text"
                                            id="descricaoNovaTransacao"
                                            value={descricaoNovaTransacao}
                                            onChange={(e) => setDescricaoNovaTransacao(e.target.value)}
                                            placeholder="Informe uma descrição para a sua transação..."
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
                                    <h3>Valor da Transação</h3>
                                    <div className={styles.input}>
                                        <input 
                                            type="text"
                                            id="valorDaNovaTransacao"
                                            value={valorDaNovaTransacao}
                                            onChange={handleChangeNovaTransacao}
                                            placeholder="Informe o valor da transação..."
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
                                    <h3>Tipo da Transação</h3>
                                    <div className={styles.containerStatus}>
                                        <motion.div
                                            style={tipoDaNovaTransacao === 1 ? { backgroundColor: '#0B0E31', color: '#FFF' } : { backgroundColor: corBackgroundInput, color: '#0B0E31'}} 
                                            className={styles.status}
                                            whileHover={{ scale: 1.05, backgroundColor: '#0B0E31', color: '#FFF' }} 
                                            whileTap={{ scale: 0.95 }}
                                            onClick={() => setTipoDaNovaTransacao(1)}
                                        >
                                        - Custo de Vida -
                                        </motion.div>
                                        <motion.div
                                            style={tipoDaNovaTransacao === 2 ? { backgroundColor: '#0B0E31', color: '#FFF' } : { backgroundColor: corBackgroundInput, color: '#0B0E31'}} 
                                            className={styles.status}
                                            whileHover={{ scale: 1.05, backgroundColor: '#0B0E31', color: '#FFF' }} 
                                            whileTap={{ scale: 0.95 }}
                                            onClick={() => setTipoDaNovaTransacao(2)}
                                        >
                                        - Investimento -
                                        </motion.div>
                                        <motion.div
                                            style={tipoDaNovaTransacao === 3 ? { backgroundColor: '#0B0E31', color: '#FFF' } : { backgroundColor: corBackgroundInput, color: '#0B0E31'}} 
                                            className={styles.status}
                                            whileHover={{ scale: 1.05, backgroundColor: '#0B0E31', color: '#FFF' }} 
                                            whileTap={{ scale: 0.95 }}
                                            onClick={() => setTipoDaNovaTransacao(3)}
                                        >
                                        + Entrada de Renda +
                                        </motion.div>
                                    </div>
                                </div>
                                <div>
                                    <h3>Data da Transação</h3>
                                    <div className={styles.containerDataFinal}>
                                        <motion.div 
                                            className={styles.inputDataFinal}
                                            whileHover={{ scale: 1.06 }} 
                                            whileTap={{ scale: 0.8 }}
                                            onClick={() => setEscolherDataFinal(true)}
                                        >
                                            {data && (<strong>{data.toLocaleDateString()}</strong>)} 
                                        </motion.div>
                                    </div>
                                </div>
                                <motion.button
                                            whileHover={{ scale: 1.05 }} 
                                            whileTap={{ scale: 0.8 }}
                                            style={ 
                                                    descricaoNovaTransacao === "" ||
                                                    valorDaNovaTransacaoNumerico === 0 ||
                                                    valorDaNovaTransacao === "" ||
                                                    tipoDaNovaTransacao === 0 ? 
                                                    { backgroundColor: corBackgroundInput, cursor: 'not-allowed' } : 
                                                    {}
                                            }
                                            onClick={() => 
                                                    descricaoNovaTransacao === "" ||
                                                    valorDaNovaTransacaoNumerico === 0 ||
                                                    valorDaNovaTransacao === "" ? 
                                                    undefined :
                                                    adiicionarNovaTransacao()
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
                        {escolherDataFinal && (
                            <div className={styles.overlay}>
                                <div className={styles.containerPopUpEdit}>
                                    <motion.button
                                        whileHover={{ scale: 1.06 }} 
                                        whileTap={{ scale: 0.8 }}
                                        className={styles.botaoVoltar} 
                                        onClick={() => setEscolherDataFinal(false)}
                                    >
                                        <strong>Voltar</strong>
                                    </motion.button>
                                    <div className={styles.conteudo}>
                                        {/* <h4>Data final das repetições!</h4> */}
                                        <Calendar
                                            className={styles.calendar}
                                            selectRange={false}
                                            value={data}
                                            onChange={SetDataFinal}
                                        />
                                        {data && (
                                            <h3>Data selecionada: {data.toLocaleDateString()}</h3>
                                        )}
                                        <motion.button
                                            whileHover={{ scale: 1.05 }} 
                                            whileTap={{ scale: 0.8 }}
                                            onClick={() => setEscolherDataFinal(false)}
                                        >
                                            {carregando && <ClipLoader size={10} color="#0B0E31" />}
                                            <span 
                                                style={{ 
                                                    marginLeft: carregando ? '8px' : '0'
                                                }}
                                            ></span>
                                            Selecionar
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
                        )}
                    </div>
                )}
                <motion.div className={tipoMenuDesk === 2 ? styles.containerTipoMenu2 : ''}>
                    <Menu />
                    <motion.div
                        initial={{ opacity: 0, scale: 0.97 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{
                            duration: 0.7,
                            scale: { type: "spring", visualDuration: 0.4, bounce: 0.55 },
                        }} 
                        className={styles.container}
                    >
                        <div className={styles.tituloContainer}>
                            <h1>Finanças</h1>
                            <motion.button 
                                className={styles.botaoNovo} 
                                whileHover={{ scale: 1.1 }} 
                                whileTap={{ scale: 0.8 }} 
                                onClick={() => setAbrirNovaTransacao(true)}
                            >
                                Nova Transação <strong>+</strong>
                            </motion.button>
                        </div>
                        <motion.div 
                            className={styles.containerConteudo}
                            initial={{ opacity: 0, scale: 0.9 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{
                                duration: 0.4,
                                scale: { type: "spring", visualDuration: 0.4, bounce: 0.5 },
                            }} 
                        >
                            <motion.div className={styles.containerNavegacao} style={isMobile ? { display: 'none' } : {}}>
                                <motion.div
                                    whileHover={{ scale: 1.2 }} 
                                    whileTap={{ scale: 0.8 }}
                                    onClick={() => {
                                        setAnoAtual(anoAtual - 1);
                                        pegarFinancas(anoAtual - 1, mesAtual);
                                    }}
                                >
                                    {`<<`}
                                </motion.div>
                                <motion.div
                                    whileHover={{ scale: 1.2 }} 
                                    whileTap={{ scale: 0.8 }}
                                    onClick={() => {
                                        if (mesAtual <= 1) {
                                            setMesAtual(12);
                                            pegarFinancas(anoAtual, 12);
                                        } else {
                                            setMesAtual(mesAtual - 1)
                                            pegarFinancas(anoAtual, mesAtual - 1);
                                        }
                                    }}
                                >
                                    {`<`}
                                </motion.div>
                                <motion.div>
                                    {getNomeDoMes(mesAtual)} de {anoAtual}
                                </motion.div>
                                <motion.div
                                    whileHover={{ scale: 1.2 }} 
                                    whileTap={{ scale: 0.8 }}
                                    onClick={() => {
                                        if (mesAtual === 12) {
                                            setMesAtual(1);
                                            pegarFinancas(anoAtual, 1);
                                        } else {
                                            setMesAtual(mesAtual + 1)
                                            pegarFinancas(anoAtual, mesAtual+1);
                                        }
                                    }}
                                >
                                    {`>`}
                                </motion.div>
                                <motion.div
                                    whileHover={{ scale: 1.2 }} 
                                    whileTap={{ scale: 0.8 }}
                                    onClick={() => {
                                        setAnoAtual(anoAtual + 1);
                                        pegarFinancas(anoAtual + 1, mesAtual);
                                    }}
                                >
                                    {`>>`}
                                </motion.div>
                            </motion.div>
                            <motion.div className={styles.containerNavegacao} style={!isMobile ? { display: 'none' } : {}}>
                                <motion.div>
                                    {getNomeDoMes(mesAtual)} de {anoAtual}
                                </motion.div>
                            </motion.div>
                            <motion.div className={styles.containerNavegacao} style={!isMobile ? { display: 'none' } : {}}>
                                <motion.div
                                    whileHover={{ scale: 1.2 }} 
                                    whileTap={{ scale: 0.8 }}
                                    onClick={() => {
                                        setAnoAtual(anoAtual - 1);
                                        pegarFinancas(anoAtual - 1, mesAtual);
                                    }}
                                >
                                    {`<<`}
                                </motion.div>
                                <motion.div
                                    whileHover={{ scale: 1.2 }} 
                                    whileTap={{ scale: 0.8 }}
                                    onClick={() => {
                                        if (mesAtual <= 1) {
                                            setMesAtual(12);
                                            pegarFinancas(anoAtual, 12);
                                        } else {
                                            setMesAtual(mesAtual - 1)
                                            pegarFinancas(anoAtual, mesAtual - 1);
                                        }
                                    }}
                                >
                                    {`<`}
                                </motion.div>
                                <motion.div
                                    whileHover={{ scale: 1.2 }} 
                                    whileTap={{ scale: 0.8 }}
                                    onClick={() => {
                                        if (mesAtual >= 12) {
                                            setMesAtual(1);
                                            pegarFinancas(anoAtual, 1);
                                        } else {
                                            setMesAtual(mesAtual + 1)
                                            pegarFinancas(anoAtual, mesAtual+1);
                                        }
                                    }}
                                >
                                    {`>`}
                                </motion.div>
                                <motion.div
                                    whileHover={{ scale: 1.2 }} 
                                    whileTap={{ scale: 0.8 }}
                                    onClick={() => {
                                        setAnoAtual(anoAtual + 1);
                                        pegarFinancas(anoAtual + 1, mesAtual);
                                    }}
                                >
                                    {`>>`}
                                </motion.div>
                            </motion.div>
                            <motion.div className={styles.containerSalario}>
                                    <h2>
                                        Salário
                                    </h2>
                                    <motion.div
                                        whileHover={{ scale: 1.07 }} 
                                        whileTap={{ scale: 0.8 }}
                                        onClick={() => {
                                            setAbrirEditarSalario(true);
                                        }}
                                    >
                                        {carregando && <ClipLoader size={40} color="#0B0E31" />}
                                        {!carregando && dadosDoMes?.wage.toLocaleString("pt-BR", {
                                            style: "currency",
                                            currency: "BRL",
                                        })}
                                    </motion.div>
                            </motion.div>
                            <motion.div className={styles.containerValoresDisponiveis}>
                                <motion.div
                                    style={dadosDoMes && dadosDoMes.availableCostOfLivingBalance < 0 ? { backgroundColor: '#880000'} : {}}
                                    whileHover={{ scale: 1.01 }} 
                                    whileTap={{ scale: 0.9 }}
                                    onClick={() => {
                                        setAbrirInformativoCustoDeVida(true);
                                    }}
                                >
                                    <h2>
                                        Custo de vida!
                                    </h2>
                                    <div
                                        style={dadosDoMes && dadosDoMes.availableCostOfLivingBalance < 0 ? { backgroundColor: '#e09393'} : {}} 
                                        className={styles.valorDisponivel}
                                    >
                                        <p>
                                            Valor disponível <br/> <br/>
                                            {carregando && <ClipLoader size={40} color="#0B0E31" />}
                                            {!carregando && dadosDoMes?.availableCostOfLivingBalance.toLocaleString("pt-BR", {
                                                style: "currency",
                                                currency: "BRL",
                                            })} 
                                        </p>
                                    </div>
                                </motion.div>
                                <motion.div
                                    style={dadosDoMes && dadosDoMes.balanceAvailableToInvest < 0 ? { backgroundColor: '#880000'} : {}}
                                    whileHover={{ scale: 1.01 }} 
                                    whileTap={{ scale: 0.9 }}
                                    onClick={() => {
                                        setAbrirInformativoInvestimento(true);
                                    }}
                                >
                                    <h2>
                                        Investimento
                                    </h2>
                                    <div
                                        style={dadosDoMes && dadosDoMes.balanceAvailableToInvest < 0 ? { backgroundColor: '#e09393'} : {}} 
                                        className={styles.valorDisponivel}
                                    >
                                        <p>
                                            Valor disponível <br/> <br/>
                                            {carregando && <ClipLoader size={40} color="#0B0E31" />}
                                            {!carregando && dadosDoMes?.balanceAvailableToInvest.toLocaleString("pt-BR", {
                                                style: "currency",
                                                currency: "BRL",
                                            })} 
                                        </p>
                                    </div>
                                </motion.div>
                            </motion.div>                 
                            <motion.div className={styles.containerValoresDisponiveis}>
                                <motion.div
                                    style={dadosDoMes && dadosDoMes.extraBalanceAdded <= 0 ? { backgroundColor: '#880000'} : {}}
                                    whileHover={{ scale: 1.01 }} 
                                    whileTap={{ scale: 0.9 }}
                                    onClick={() => {
                                        setAbrirInformativoEntradas(true);
                                    }}
                                >
                                    <h2>
                                        Entradas
                                    </h2>
                                    <div
                                        style={dadosDoMes && dadosDoMes.extraBalanceAdded <= 0 ? { backgroundColor: '#e09393'} : {}} 
                                        className={styles.valorDisponivel}
                                    >
                                        <p>
                                            Valor Adicionado <br/> <br/>
                                            {carregando && <ClipLoader size={40} color="#0B0E31" />}
                                            {!carregando && dadosDoMes?.extraBalanceAdded.toLocaleString("pt-BR", {
                                                style: "currency",
                                                currency: "BRL",
                                            })} 
                                        </p>
                                    </div>
                                </motion.div>
                                <motion.div
                                    style={dadosDoMes && dadosDoMes.totalBalance <= 0 ? { backgroundColor: '#880000'} : {}}
                                    whileHover={{ scale: 1.01 }} 
                                    whileTap={{ scale: 0.9 }}
                                    onClick={() => {
                                        setAbrirInformativoTotal(true);
                                    }}
                                >
                                    <h2>
                                        Balanço Total do Mês
                                    </h2>
                                    <div
                                        style={dadosDoMes && dadosDoMes.totalBalance <= 0 ? { backgroundColor: '#e09393'} : {}} 
                                        className={styles.valorDisponivel}
                                    >
                                        <p>
                                            Valor disponível <br/> <br/>
                                            {carregando && <ClipLoader size={40} color="#0B0E31" />}
                                            {!carregando && dadosDoMes?.totalBalance.toLocaleString("pt-BR", {
                                                style: "currency",
                                                currency: "BRL",
                                            })} 
                                        </p>
                                    </div>
                                </motion.div>
                            </motion.div>
                            <motion.div className={styles.botaoVerTransacoes}
                                whileHover={{ scale: 1.05 }} 
                                whileTap={{ scale: 0.8 }}
                                onClick={() => {
                                    setVerTodasAsTrasacoes(true); 
                                }}
                            >
                                {carregando && <ClipLoader size={40} color="#ffffff" />}
                                <h2>Ver Todas as Transações desse Mês</h2>
                            </motion.div>                 
                        </motion.div>
                    </motion.div>
                </motion.div>
                {abrirEditarSalario && (
                    <motion.div className={styles.overlay}>
                        <motion.div 
                            className={styles.containerPopUpEdit}
                        >
                            <div className={styles.botoesTopo}>
                            <motion.button
                                whileHover={{ scale: 1.1 }} 
                                whileTap={{ scale: 0.8 }}
                                className={styles.botaoVoltar} 
                                onClick={() => setAbrirEditarSalario(false)}
                            >
                                <strong>X</strong>
                            </motion.button>
                            </div>
                            <div className={styles.conteudo}>
                                    <h3>
                                        Cadastre seu salário!
                                    </h3>
                                    <div>
                                        <div className={styles.input}>
                                            <input 
                                                type="text"
                                                id="salario"
                                                value={salario}
                                                onChange={handleChange}
                                                placeholder="Informe seu salário..."
                                            />
                                            <Image
                                                className={styles.lapis} 
                                                src="/iconeLapisCinza.svg"
                                                alt="Icone Lapis"
                                                width={15}
                                                height={15}
                                            />
                                        </div>
                                        <motion.button
                                            whileHover={{ scale: 1.05 }} 
                                            whileTap={{ scale: 0.8 }}
                                            style={ 
                                                    salario === "" ? 
                                                    { backgroundColor: '#E0E0E0', cursor: 'not-allowed' } : 
                                                    {}
                                            }
                                            onClick={() => 
                                                    atualizarSalario({salario: salarioNumerico})
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
                        </motion.div>
                    </motion.div>
                )}
                {verTodasAsTrasacoes && (
                    <motion.div className={styles.overlay}>
                        <motion.div 
                            className={styles.containerPopUpEditTrasacoes}
                        >
                            <div className={styles.botoesTopo}>
                            <motion.button
                                whileHover={{ scale: 1.1 }} 
                                whileTap={{ scale: 0.8 }}
                                className={styles.botaoVoltar} 
                                onClick={() => setVerTodasAsTrasacoes(false)}
                            >
                                <strong>X</strong>
                            </motion.button>
                            </div>
                            <div className={styles.conteudo}>
                                    <h3>
                                        Todas As Trasações!
                                    </h3>
                                    <motion.div className={styles.containerFiltroEBotao}>
                                        <motion.div className={styles.filtro}>
                                            <h3>
                                                Filtrar por:
                                            </h3>
                                            <motion.button 
                                                className={styles.botaoFiltroStatus}
                                                style={filtroAtivo === 1 ? {backgroundColor: "#0B0E31", color: "#FFFF"} : {}}  
                                                whileHover={{ scale: 1.1, backgroundColor: "#0B0E31", color: "#FFFF" }} 
                                                whileTap={{ scale: 0.8 }}
                                                onClick={() => {
                                                    setFiltroAtivo(1);
                                                }}
                                            >
                                                Custo de Vida
                                            </motion.button>
                                            <motion.button 
                                                className={styles.botaoFiltroStatus}
                                                style={filtroAtivo === 2 ? {backgroundColor: "#0B0E31", color: "#FFFF"} : {}}  
                                                whileHover={{ scale: 1.1, backgroundColor: "#0B0E31", color: "#FFFF" }} 
                                                whileTap={{ scale: 0.8 }}
                                                onClick={() => {
                                                    setFiltroAtivo(2);
                                                }}
                                            >
                                                Investimento
                                            </motion.button>
                                            <motion.button 
                                                className={styles.botaoFiltroStatus}
                                                style={filtroAtivo === 3 ? {backgroundColor: "#0B0E31", color: "#FFFF"} : {}}  
                                                whileHover={{ scale: 1.1, backgroundColor: "#0B0E31", color: "#FFFF" }} 
                                                whileTap={{ scale: 0.8 }}
                                                onClick={() => {
                                                    setFiltroAtivo(3);
                                                }}
                                            >
                                                Entrada de Renda
                                            </motion.button>
                                        </motion.div>
                                    </motion.div>
                                    {
                                        filtroAtivo === 1 &&
                                        Array.isArray(dadosDoMes?.transactionsCostOfLiving) &&
                                        dadosDoMes.transactionsCostOfLiving?.slice()
                                        .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()) // ordena da mais recente para a mais antiga
                                            .map((transacao) => (
                                        <motion.div
                                            initial={{ opacity: 0, scale: 0 }}
                                            animate={{ opacity: 1, scale: 1 }}
                                            transition={{
                                                duration: 0.4,
                                                scale: { type: "spring", visualDuration: 0.4, bounce: 0.5 },
                                            }} 
                                            className={styles.transacao}
                                            key={transacao.id}
                                        >
                                                <h4>{transacao.description}</h4>
                                                <div className={styles.cotainerData}>
                                                    <h4>
                                                        {transacao.date}
                                                    </h4>
                                                </div>
                                                <div className={styles.cotainerTipo}>
                                                    <h4>
                                                        {transacao.value.toLocaleString("pt-BR", {
                                                            style: "currency",
                                                            currency: "BRL",
                                                        })}
                                                    </h4>
                                                </div>
                                                <motion.div
                                                    className={styles.remover}
                                                    whileHover={{ scale: 1.1 }} 
                                                    whileTap={{ scale: 0.8 }}
                                                    onClick={() => {
                                                        deletarTransacao(transacao.id);
                                                    }}
                                                >
                                                    <h4>
                                                        Romover
                                                    </h4>
                                                </motion.div>
                                        </motion.div>
                                        ))
                                    }
                                    {
                                    filtroAtivo === 2 &&
                                    Array.isArray(dadosDoMes?.transactionsInvestment) && 
                                    dadosDoMes.transactionsInvestment?.map((transacao) => (
                                        <motion.div
                                            initial={{ opacity: 0, scale: 0 }}
                                            animate={{ opacity: 1, scale: 1 }}
                                            transition={{
                                                duration: 0.4,
                                                scale: { type: "spring", visualDuration: 0.4, bounce: 0.5 },
                                            }} 
                                            className={styles.transacao}
                                            key={transacao.id}
                                        
                                        >
                                                <h4>{transacao.description}</h4>
                                                <div className={styles.cotainerData}>
                                                    <h4>
                                                        {transacao.date}
                                                    </h4>
                                                </div>
                                                <div className={styles.cotainerTipo}>
                                                    <h4>
                                                        {transacao.value.toLocaleString("pt-BR", {
                                                            style: "currency",
                                                            currency: "BRL",
                                                        })}
                                                    </h4>
                                                </div>
                                                <motion.div
                                                    className={styles.remover}
                                                    whileHover={{ scale: 1.1 }} 
                                                    whileTap={{ scale: 0.8 }}
                                                    onClick={() => {
                                                        deletarTransacao(transacao.id);
                                                    }}
                                                >
                                                    <h4>
                                                        Romover
                                                    </h4>
                                                </motion.div>
                                        </motion.div>
                                        ))
                                    }
                                    {
                                    filtroAtivo === 3 &&
                                    Array.isArray(dadosDoMes?.transactionsExtraAdded) && 
                                    dadosDoMes.transactionsExtraAdded?.map((transacao) => (
                                        <motion.div
                                            initial={{ opacity: 0, scale: 0 }}
                                            animate={{ opacity: 1, scale: 1 }}
                                            transition={{
                                                duration: 0.4,
                                                scale: { type: "spring", visualDuration: 0.4, bounce: 0.5 },
                                            }} 
                                            className={styles.transacao}
                                            key={transacao.id}
                                        
                                        >
                                                <h4>{transacao.description}</h4>
                                                <div className={styles.cotainerData}>
                                                    <h4>
                                                        {transacao.date}
                                                    </h4>
                                                </div>
                                                <div className={styles.cotainerTipo}>
                                                    <h4>
                                                        {transacao.value.toLocaleString("pt-BR", {
                                                            style: "currency",
                                                            currency: "BRL",
                                                        })}
                                                    </h4>
                                                </div>
                                                <motion.div
                                                    className={styles.remover}
                                                    whileHover={{ scale: 1.1 }} 
                                                    whileTap={{ scale: 0.8 }}
                                                    onClick={() => {
                                                        deletarTransacao(transacao.id);
                                                    }}
                                                >
                                                    <h4>
                                                        Romover
                                                    </h4>
                                                </motion.div>
                                        </motion.div>
                                        ))
                                    }
                            </div>
                        </motion.div>
                    </motion.div>
                )}
            </motion.div>
        </div>
    );
}