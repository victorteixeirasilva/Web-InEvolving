'use client';

import { useEffect, useState } from 'react';
import Menu from "@/components/Menu";
import styles from './page.module.scss';
import Image from "next/image";
import * as motion from "motion/react-client";
import { ClipLoader } from 'react-spinners';
import { Tarefa_Modulo_Tarefas } from '@/components/interfaces/Tarefa_Modulo_Tarefas';
import { Calendar, CalendarProps } from 'react-calendar';
import { Objetivo } from '@/components/interfaces/Objetivo';
import { useRouter } from 'next/navigation';

export default function Tarefas( ) {
    const router = useRouter();
    const [jwtToken, setJwtToken] = useState('');

    useEffect(() => {
        const token = localStorage.getItem('token');
        setJwtToken(token ?? '');
    }, []);

    const [filtroAtivo, setFiltroAtivo] = useState(1);
    const [carregando, setCarregando] = useState(false);
    const [tarefasOutraData, setTarefasOutraData] = useState<Tarefa_Modulo_Tarefas[] | null>(null);
    const [tarefasDeHoje, setTarefasDeHoje] = useState<Tarefa_Modulo_Tarefas[] | null>(null);


    const [selectedDate, setSelectedDate] = useState<Date | null>(new Date);
    const [dataFinal, setDataFinal] = useState<Date | null>(new Date);

    const SetDataFinal : CalendarProps['onChange'] = (value) => {
        if (value instanceof Date) {
            setDataFinal(value);
        } else if (Array.isArray(value) && value[0] instanceof Date) {
            setDataFinal(value[0]); // ou outro tratamento para intervalo
        }
    };

    const [escolherOutraData, setEscolherOutraData] = useState(false);

    const handleDateChange : CalendarProps['onChange'] = (value) => {
        if (value instanceof Date) {
            setSelectedDate(value);
        } else if (Array.isArray(value) && value[0] instanceof Date) {
            setSelectedDate(value[0]); // ou outro tratamento para intervalo
        }
    };

    const pegarTarefasDeHoje = async () => {

        setFiltroAtivo(1);
        setCarregando(true);

        const response = await fetch(
            'http://127.0.0.1:2327/auth/api/tasks/'+ new Date().toISOString().split('T')[0], 
            {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': 'Bearer ' + jwtToken
                },
            }
        );

        const json: Tarefa_Modulo_Tarefas[] = await response.json();

        if (!response.ok){
            setCarregando(false);
            alert('Erro ao tarefas, data: ' + new Date().toISOString().split('T')[0]);
        }
        
        setTarefasDeHoje(json);
        setCarregando(false);

    }

    const filtrarPorData = async (data:string) => {
        setFiltroAtivo(4);
        setCarregando(true);

        const response = await fetch(
            'http://127.0.0.1:2327/auth/api/tasks/'+ data, 
            {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': 'Bearer ' + jwtToken
                },
            }
        );

        const json: Tarefa_Modulo_Tarefas[] = await response.json();

        if (!response.ok){
            setCarregando(false);
            alert('Erro ao tarefas, data: ' + data);
        }
        
        setTarefasOutraData(json);
        setCarregando(false);

    }

    const [abrirNovaTarefa, setAbrirNovaTarefa] = useState(false);
    const [verListaDeObjetivos, setVerListaDeObjetivos] = useState(false);
    const [objetivos, setObjetivos] = useState<Objetivo[] | null>(null);
    const [objetivoSelecionado, setObjetivoSelecionado] = useState<Objetivo | null>(null);
    const [isTarefaFrequente, setIsTarefaFrequente] = useState(false);
    const [exibirIsTarefaFrequente, setExibirIsTarefaFrequente] = useState(false);
    const [todoDomingo, setTodoDomingo] = useState(false);
    const [todaSegunda, setTodaSegunda] = useState(false);
    const [todaTerca, setTodaTerca] = useState(false);
    const [todaQuarta, setTodaQuarta] = useState(false);
    const [todaQuinta, setTodaQuinta] = useState(false);
    const [todaSexta, setTodaSexta] = useState(false);
    const [todoSabado, setTodoSabado] = useState(false);
    const [escolherDataFinal, setEscolherDataFinal] = useState(false);
    
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
            }
            
            setCarregando(false);
            setObjetivos(data);
    };

    const [nomeDaTarefa, setNomeDaTarefa] = useState("");
    const [descricaoDaTarefa, setDescricaoDaTarefa] = useState("");

    const cadastrarNovaTarefa = async () => {
        setCarregando(true);

        const response = await fetch('http://127.0.0.1:2327/auth/api/tasks', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': 'Bearer ' + jwtToken
                },
                body: JSON.stringify({
                    nameTask: nomeDaTarefa,
                    descriptionTask: descricaoDaTarefa,
                    dateTask: new Date().toISOString().split('T')[0],
                    idObjective: objetivoSelecionado ? objetivoSelecionado.id : null,
                }),
        });

            
        if (response.status === 401){
            setCarregando(false);
            alert('Você não está logado, por favor faça login novamente.');
            router.push('/login');
        }

        if(isTarefaFrequente && response.ok) {
            const tarefaCadastrada: Tarefa_Modulo_Tarefas = await response.json();

            const response2 = await fetch('http://127.0.0.1:2327/auth/api/tasks/repeat/'+tarefaCadastrada.id+'/'+tarefaCadastrada.dateTask+'/'+dataFinal?.toISOString().split('T')[0], {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': 'Bearer ' + jwtToken
                },
                body: JSON.stringify({
                    monday: todaSegunda,
                    tuesday: todaTerca,
                    wednesday: todaQuarta,
                    thursday: todaQuinta,
                    friday: todaSexta,
                    saturday: todoSabado,
                    sunday: todoDomingo,
                }),
            });
            
            if (response2.status === 401){
                setCarregando(false);
                alert('Você não está logado, por favor faça login novamente.');
                router.push('/login');
            }

            if (!response2.ok){
                alert("Erro: para repetir a tarefa (" + response2.url+ ")")
                alert(response2.json)
            }
        }


        setCarregando(false);
        window.location.reload();
    }

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
                    <h1>Tarefas</h1>
                    <motion.button 
                        className={styles.botaoNovo} 
                        whileHover={{ scale: 1.1 }} 
                        whileTap={{ scale: 0.8 }} 
                        onClick={() => setAbrirNovaTarefa(true)}
                        >
                        Adicionar Novo <strong>+</strong>
                    </motion.button>
                </div>
                <motion.div className={styles.containerFiltroEBotao}>
                    <motion.div className={styles.filtro}>
                        <h3>
                            Filtrar:
                        </h3>    
                        <motion.button 
                            className={
                                filtroAtivo === 1 ? styles.botaoFiltroAtivo : styles.botaoFiltro
                            } 
                            whileHover={{ scale: 1.1 }} 
                            whileTap={{ scale: 0.8 }}
                            onClick={pegarTarefasDeHoje}
                        >
                            Hoje
                        </motion.button>
                        <motion.button 
                            className={
                                filtroAtivo === 2 ? styles.botaoFiltroAtivo : styles.botaoFiltro
                            }
                            whileHover={{ scale: 1.1 }} 
                            whileTap={{ scale: 0.8 }}
                            >
                            Mês
                        </motion.button>
                        <motion.button 
                            className={
                                filtroAtivo === 3 ? styles.botaoFiltroAtivo : styles.botaoFiltro
                            } 
                            whileHover={{ scale: 1.1 }} 
                            whileTap={{ scale: 0.8 }}
                            >
                            Ano
                        </motion.button>
                        <motion.button 
                            className={
                                filtroAtivo === 4 ? styles.botaoFiltroAtivo : styles.botaoFiltro
                            } 
                            whileHover={{ scale: 1.1 }} 
                            whileTap={{ scale: 0.8 }}
                            onClick={() => setEscolherOutraData(true)}
                            >
                            Outra Data
                        </motion.button>
                        <motion.button 
                            className={
                                filtroAtivo === 5 ? styles.botaoFiltroAtivo : styles.botaoFiltro
                            } 
                            whileHover={{ scale: 1.1 }} 
                            whileTap={{ scale: 0.8 }}
                            >
                            Tarefas em Atraso
                        </motion.button>
                    </motion.div>
                </motion.div>
                <motion.div className={styles.containerConteudo}>
                    {carregando && (
                        <ClipLoader size={50} color="#0B0E31" />
                    )}
                    {!carregando && tarefasOutraData && tarefasOutraData.length > 0 && filtroAtivo === 4 && (
                        tarefasOutraData.map((tarefa) => (
                            <motion.div
                                initial={{ opacity: 0, scale: 0 }}
                                animate={{ opacity: 1, scale: 1 }}
                                transition={{
                                    duration: 0.4,
                                    scale: { type: "spring", visualDuration: 0.4, bounce: 0.5 },
                                }} 
                                whileHover={{ scale: 1.03 }} 
                                whileTap={{ scale: 0.8 }} 
                                key={tarefa.id} 
                                className={styles.tarefa}
                            >
                                {tarefa?.nameTask}
                                <p style={
                                        tarefa?.status === "DONE" ? { color: '#319f43' } :
                                        tarefa?.status === "IN_PROGRESS" ? { color: '#a0ff47' } :
                                        tarefa?.status === "TODO" ? { color: '#6b6b6b' } :
                                        tarefa?.status === "CANCELLED" ? { color: '#ff0004' } :
                                        tarefa?.status === "LATE" ? { color: '#ffbf00' } : {}
                                    }
                                >
                                   {
                                        tarefa?.status === "DONE" ? "Concluída" :
                                        tarefa?.status === "IN_PROGRESS" ? "Em Progresso" :
                                        tarefa?.status === "TODO" ? "Não Iniciada" :
                                        tarefa?.status === "CANCELLED" ? "Cancelada" :
                                        tarefa?.status === "LATE" ? "Atrasada" : "Status Desconhecido"
                                    }
                                </p>
                                <div className={styles.botoes}>
                                    <motion.button
                                        whileHover={{ scale: 1.2 }}
                                        whileTap={{ scale: 0.8 }}
                                        className={styles.botaoDetalhes}
                                    >
                                        Ver detalhes
                                    </motion.button>
                                    <motion.button
                                        whileHover={{ scale: 1.2 }}
                                        whileTap={{ scale: 0.8 }}
                                        className={styles.botaoEditar}
                                    >
                                        Editar
                                    </motion.button>
                                </div>
                            </motion.div>
                        ))
                    )}
                    {!carregando && filtroAtivo === 1 && tarefasDeHoje && (
                        tarefasDeHoje.map((tarefa) => (
                            <motion.div
                                initial={{ opacity: 0, scale: 0 }}
                                animate={{ opacity: 1, scale: 1 }}
                                transition={{
                                    duration: 0.4,
                                    scale: { type: "spring", visualDuration: 0.4, bounce: 0.5 },
                                }} 
                                whileHover={{ scale: 1.03 }} 
                                whileTap={{ scale: 0.8 }} 
                                key={tarefa.id} 
                                className={styles.tarefa}
                            >
                                {tarefa?.nameTask}
                                <p style={
                                        tarefa?.status === "DONE" ? { color: '#319f43' } :
                                        tarefa?.status === "IN_PROGRESS" ? { color: '#a0ff47' } :
                                        tarefa?.status === "TODO" ? { color: '#6b6b6b' } :
                                        tarefa?.status === "CANCELLED" ? { color: '#ff0004' } :
                                        tarefa?.status === "LATE" ? { color: '#ffbf00' } : {}
                                    }
                                >
                                   {
                                        tarefa?.status === "DONE" ? "Concluída" :
                                        tarefa?.status === "IN_PROGRESS" ? "Em Progresso" :
                                        tarefa?.status === "TODO" ? "Não Iniciada" :
                                        tarefa?.status === "CANCELLED" ? "Cancelada" :
                                        tarefa?.status === "LATE" ? "Atrasada" : "Status Desconhecido"
                                    }
                                </p>
                                <div className={styles.botoes}>
                                    <motion.button
                                        whileHover={{ scale: 1.2 }}
                                        whileTap={{ scale: 0.8 }}
                                        className={styles.botaoDetalhes}
                                    >
                                        Ver detalhes
                                    </motion.button>
                                    <motion.button
                                        whileHover={{ scale: 1.2 }}
                                        whileTap={{ scale: 0.8 }}
                                        className={styles.botaoEditar}
                                    >
                                        Editar
                                    </motion.button>
                                </div>
                            </motion.div>
                    )))}
                </motion.div>
            </motion.div>
        </motion.div>
        {escolherOutraData && (
            <div className={styles.overlay}>
                <div className={styles.containerPopUp}>
                    <div className={styles.botoesTopo}>
                        <motion.button
                            whileHover={{ scale: 1.1 }} 
                            whileTap={{ scale: 0.8 }}
                            className={styles.botaoVoltar} 
                            onClick={() => setEscolherOutraData(false)}
                        >
                            <strong>X</strong>
                        </motion.button>
                    </div>
                    <Calendar
                        className={styles.calendar}
                        selectRange={false}
                        onChange={handleDateChange}
                        value={selectedDate}
                    />
                    <div className={styles.conteudo}>
                        <motion.button
                            whileHover={{ scale: 1.05 }} 
                            whileTap={{ scale: 0.8 }}
                            onClick={() => {
                                filtrarPorData(selectedDate?.toISOString().split('T')[0] || '');
                                setEscolherOutraData(false);
                            }}
                        >
                        {carregando && <ClipLoader size={10} color="#0B0E31" />}
                        <span 
                            style={{ 
                                marginLeft: carregando ? '8px' : '0'
                            }}
                        ></span>
                        Buscar
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
        {abrirNovaTarefa && (
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
                        <h2>Nova Tarefa</h2>
                        <div className={styles.inputs}>
                            <div>
                                <h3>Nome da Tarefa</h3>
                                <div className={styles.input}>
                                    <input
                                        type="text"
                                        id="nomeTarefa"
                                        value={nomeDaTarefa}
                                        onChange={(e) => setNomeDaTarefa(e.target.value)}
                                        placeholder="Digite o nome da tarefa..."
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
                                <h3>Descrição</h3>
                                <div className={styles.input}>
                                    <input
                                        type="text"
                                        id="nomeTarefa"
                                        value={descricaoDaTarefa}
                                        onChange={(e) => setDescricaoDaTarefa(e.target.value)}
                                        placeholder="Escreva detalhes sobre a sua tarefa..."
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
                                <p 
                                    className={styles.place}
                                    style={{ 
                                        color: objetivoSelecionado ? '#0B0E31' : '#999999'
                                    }}
                                >
                                    {objetivoSelecionado ? objetivoSelecionado.nameObjective : "Selecione o objetivo a ser relacionado..."}
                                </p>
                                <Image
                                    className={styles.lapis} 
                                    src="/iconeLapisCinza.svg"
                                    alt="Icone Lapis"
                                    width={15}
                                    height={15}
                                />
                            </div>
                        </motion.div>
                        <div className={styles.containerInputData}
                            onClick={() => setIsTarefaFrequente(!isTarefaFrequente)}
                        >
                            <h3>Tarefa frequente:</h3>
                            
                            <div
                                className={styles.botaoSimNao}
                                onClick={() => {
                                    setIsTarefaFrequente(!isTarefaFrequente);
                                    setExibirIsTarefaFrequente(!exibirIsTarefaFrequente);
                                }}
                            >
                                <div className={styles.checkBox}>
                                    <div
                                        style={{ 
                                            backgroundColor: isTarefaFrequente ? '' : 'transparent'
                                        }}  
                                        className={styles.marcador}></div>
                                </div>
                                Sim
                            </div> 
                            <div
                                className={styles.botaoSimNao}
                                onClick={() => {
                                    setIsTarefaFrequente(!isTarefaFrequente);
                                    setExibirIsTarefaFrequente(!exibirIsTarefaFrequente);
                                }}
                            >
                                <div className={styles.checkBox}>
                                    <div                                     
                                        style={{ 
                                            backgroundColor: !isTarefaFrequente ? '' : 'transparent'
                                        }} 
                                        className={styles.marcador}
                                    ></div>
                                </div>
                                Não
                            </div> 
                        </div>
                        <motion.button
                            whileHover={{ scale: 1.05 }} 
                            whileTap={{ scale: 0.8 }}
                            onClick={cadastrarNovaTarefa}
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
                </div>
                {verListaDeObjetivos && (
                    <div className={styles.containerPopUp}>
                        <motion.button
                            whileHover={{ scale: 1.06 }} 
                            whileTap={{ scale: 0.8 }}
                            className={styles.botaoVoltar} 
                            onClick={() => setVerListaDeObjetivos(false)}
                            >
                            <strong>Voltar - Tarefas</strong>
                        </motion.button>
                        <div className={styles.conteudo}>
                            <div className={styles.containerScroll}>
                                {objetivos && objetivos.map((objetivo) => {
                                    return (
                                        <div
                                            key={objetivo.id}
                                            className={styles.objetivo}
                                            onClick={() => {
                                                setObjetivoSelecionado(objetivo);
                                                setVerListaDeObjetivos(false);
                                            }}
                                            style={{ cursor: 'pointer' }}
                                        >
                                        <h4>{objetivo.nameObjective}</h4>
                                        </div>
                                    );
                                })}
                            </div>
                        </div>
                    </div>
                )}
                {exibirIsTarefaFrequente && (
                    <div className={styles.containerPopUp}>
                        <motion.button
                            whileHover={{ scale: 1.06 }} 
                            whileTap={{ scale: 0.8 }}
                            className={styles.botaoVoltar} 
                            onClick={() => {
                                setExibirIsTarefaFrequente(false);
                                setIsTarefaFrequente(false);
                            }}
                        >
                            <strong>Voltar - Tarefas</strong>
                        </motion.button>
                        <div className={styles.conteudo}>
                            <div 
                                className={styles.diaDaSemana}
                                onClick={() => setTodoDomingo(!todoDomingo)}
                            >
                                Todo domingo
                                <Image
                                    style={{ visibility: todoDomingo ? 'visible' : 'hidden' }}
                                    src="/checkIconAzul.svg"
                                    alt="Icone Check Azul"
                                    width={21}
                                    height={16}
                                />
                            </div>
                            <div 
                                className={styles.diaDaSemana}
                                onClick={() => setTodaSegunda(!todaSegunda)}
                            >
                                Toda segunda-feira
                                <Image
                                    style={{ visibility: todaSegunda ? 'visible' : 'hidden' }}
                                    src="/checkIconAzul.svg"
                                    alt="Icone Check Azul"
                                    width={21}
                                    height={16}
                                />
                            </div>
                            <div 
                                className={styles.diaDaSemana}
                                onClick={() => setTodaTerca(!todaTerca)}
                            >
                                Toda terça-feira
                                <Image
                                    style={{ visibility: todaTerca ? 'visible' : 'hidden' }}
                                    src="/checkIconAzul.svg"
                                    alt="Icone Check Azul"
                                    width={21}
                                    height={16}
                                />
                            </div>
                            <div 
                                className={styles.diaDaSemana}
                                onClick={() => setTodaQuarta(!todaQuarta)}
                            >
                                Toda quarta-feira
                                <Image
                                    style={{ visibility: todaQuarta ? 'visible' : 'hidden' }}
                                    src="/checkIconAzul.svg"
                                    alt="Icone Check Azul"
                                    width={21}
                                    height={16}
                                />
                            </div>
                            <div 
                                className={styles.diaDaSemana}
                                onClick={() => setTodaQuinta(!todaQuinta)}
                            >
                                Toda quinta-feira
                                <Image
                                    style={{ visibility: todaQuinta ? 'visible' : 'hidden' }}
                                    src="/checkIconAzul.svg"
                                    alt="Icone Check Azul"
                                    width={21}
                                    height={16}
                                />
                            </div>
                            <div 
                                className={styles.diaDaSemana}
                                onClick={() => setTodaSexta(!todaSexta)}
                            >
                                Toda sexta-feira
                                <Image
                                    style={{ visibility: todaSexta ? 'visible' : 'hidden' }}
                                    src="/checkIconAzul.svg"
                                    alt="Icone Check Azul"
                                    width={21}
                                    height={16}
                                />
                            </div>
                            <div 
                                className={styles.diaDaSemana}
                                onClick={() => setTodoSabado(!todoSabado)}
                            >
                                Todo sábado
                                <Image
                                    style={{ visibility: todoSabado ? 'visible' : 'hidden' }}
                                    src="/checkIconAzul.svg"
                                    alt="Icone Check Azul"
                                    width={21}
                                    height={16}
                                />
                            </div>
                            <div className={styles.containerDataFinal}>
                                Repetir até a data:
                                <motion.div 
                                    className={styles.inputDataFinal}
                                    whileHover={{ scale: 1.06 }} 
                                    whileTap={{ scale: 0.8 }}
                                    onClick={() => setEscolherDataFinal(true)}
                                >
                                    {dataFinal && (<strong>{dataFinal.toLocaleDateString()}</strong>)} 
                                </motion.div>
                            </div>
                            <motion.button
                                style={
                                    !todoDomingo && 
                                    !todaSegunda &&
                                    !todaTerca &&
                                    !todaQuarta &&
                                    !todaQuinta &&
                                    !todaSexta &&
                                    !todoSabado ? { opacity: 0.3, cursor: 'not-allowed' } : {}
                                }
                                whileHover={{ scale: 1.05 }} 
                                whileTap={{ scale: 0.8 }}
                                onClick={
                                    !todoDomingo && 
                                    !todaSegunda &&
                                    !todaTerca &&
                                    !todaQuarta &&
                                    !todaQuinta &&
                                    !todaSexta &&
                                    !todoSabado ? () => alert("Primeiro selecione um dia da semana") : () => setExibirIsTarefaFrequente(false)
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
                )}
                {escolherDataFinal && (
                    <div className={styles.containerPopUp}>
                        <motion.button
                            whileHover={{ scale: 1.06 }} 
                            whileTap={{ scale: 0.8 }}
                            className={styles.botaoVoltar} 
                            onClick={() => setEscolherDataFinal(false)}
                            >
                            <strong>Voltar</strong>
                        </motion.button>
                        <div className={styles.conteudo}>
                            <Calendar
                                className={styles.calendar}
                                selectRange={false}
                                value={dataFinal}
                                onChange={SetDataFinal}
                            />
                            {dataFinal && (
                                <h3>Data selecionada: {dataFinal.toLocaleDateString()}</h3>
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
                )}
            </div>
        )}
        </>
    );
}