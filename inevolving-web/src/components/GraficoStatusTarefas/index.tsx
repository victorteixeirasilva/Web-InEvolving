import { Doughnut } from 'react-chartjs-2';
import { Chart, ArcElement, Tooltip, Legend } from 'chart.js';
import type { ChartOptions, TooltipItem } from 'chart.js';
import { Objective } from '../interfaces/Objective';
import styles from "./GraficoStatusTarefas.module.scss";
import { useEffect, useState } from 'react';
Chart.register(ArcElement, Tooltip, Legend);




export default function GraficoStatusTarefas({objetivo}: {objetivo:Objective}) {
    const [isMobile, setIsMobile] = useState(false);
    
    useEffect(() => {
        const largura = window.innerWidth;
        setIsMobile(largura <= 1024);
    }, []);

    const dados = {
        labels: ['Concluídas', 'Em Progresso', 'Atrasadas', 'Pendentes', 'Canceladas'],
        datasets: [
            {
                data: [objetivo.numberTasksDone, objetivo.numberTasksInProgress, objetivo.numberTasksOverdue, objetivo.numberTasksToDo, objetivo.numberTasksCancelled], // valores em porcentagem ou quantidade
                backgroundColor: ['#45C17F', '#1A8EE1', '#FFC93C', '#a1a1a1', '#FF6B6B'],
                borderWidth: 2,
            },
        ],
    };

    const options: ChartOptions<'doughnut'> = {
        cutout: '60%',
        plugins: {
            legend: {
                position: 'bottom' as const,
                labels: {
                    color: '#444',
                    font: { size: 14 },
                },
            },
            tooltip: {
                callbacks: {
                    label: (context: TooltipItem<'doughnut'>) =>
                `${context.label}: ${context.formattedValue}`,
                },
            },
        },
    };

    if (isMobile) {
        return (
            <div className={styles.mob}>
                <div className={styles.grafico}>
                    <Doughnut data={dados} options={options} />
                </div>
            </div>
        );
    } else {
        return (
            <div className={styles.grafico}>
                <Doughnut data={dados} options={options} />
            </div>
        );
    }

}
