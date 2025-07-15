import { Doughnut } from 'react-chartjs-2';
import { Chart, ArcElement, Tooltip, Legend } from 'chart.js';
import type { ChartOptions, TooltipItem } from 'chart.js';
import { Objective } from '../interfaces/Objective';
import styles from "./GraficoStatusTarefas.module.scss";
Chart.register(ArcElement, Tooltip, Legend);




export default function GraficoStatusTarefas({objetivo}: {objetivo:Objective}) {

    const dados = {
        labels: ['Concluídas', 'Em Progresso', 'Atrasadas', 'Pendentes'],
        datasets: [
            {
                data: [objetivo.numberTasksDone, objetivo.numberTasksInProgress, objetivo.numberTasksOverdue, objetivo.numberTasksToDo], // valores em porcentagem ou quantidade
                backgroundColor: ['#45C17F', '#1A8EE1', '#FFC93C', '#a1a1a1'],
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

    return (
        <div className={styles.grafico}>
            <Doughnut data={dados} options={options} />
        </div>
    );
}
