import { Bar, Pie } from 'react-chartjs-2';
import {
  Chart,
  BarElement,
  CategoryScale,
  LinearScale,
  Tooltip,
  Legend,
} from 'chart.js';
import type { ChartOptions, TooltipItem } from 'chart.js';
import { useCallback, useEffect, useState } from 'react';
import styles from './GraficoMotivosTarefas.module.scss';
import { Objective } from "../interfaces/Objective";

Chart.register(BarElement, CategoryScale, LinearScale, Tooltip, Legend);

interface ReasonData {
  reason: string;
  amount: number;
}

interface AnaliseMotivos {
  totNumberTasks: number;
  reasonList: ReasonData[];
}

export default function GraficoMotivosTarefas({objetivo}: {objetivo:Objective}){
  const [isMobile, setIsMobile] = useState(false);
  const [analise, setAnalise] = useState<AnaliseMotivos | null>(null);

  const getDashboard = useCallback(async () => {
          const response = await fetch(
                  'https://api.inevolving.inovasoft.tech/auth/api/dashboard/cancellation-reason/{idObjective}?idObjective=' + objetivo.id,
              {
                  method: 'GET',
                  headers: {
                      'Content-Type': 'application/json',
                      'Authorization': 'Bearer ' + localStorage.getItem('token')
                  },
              });
  
          const data: AnaliseMotivos = await response.json();
          
          if (response.status === 401){
              alert('Você não está logado, por favor faça login novamente.');
          }
  
          if (response.ok) {
              setAnalise(data);
          }
      }, [objetivo.id]);

  useEffect(() => {
    const largura = window.innerWidth;
    setIsMobile(largura <= 1024);
    getDashboard();
  }, [getDashboard]);

  const data = {
    labels: analise?.reasonList.map((r) => r.reason),
    datasets: [
      {
        label: 'Motivos das Tarefas Não Concluídas',
        data: analise?.reasonList.map((r) => r.amount),
        backgroundColor: '#1A8EE1',
        borderRadius: 4,
        borderWidth: 1,
      },
    ],
  };

    function gerarCoresHSL(qtd: number): string[] {
        const cores: string[] = [];
        for (let i = 0; i < qtd; i++) {
            const hue = (i * 360) / qtd; // distribui os tons ao longo do círculo de cor
            cores.push(`hsl(${hue}, 70%, 55%)`);
        }
        return cores;
    }


    const cores = gerarCoresHSL(analise?.reasonList.length || 0);

      const pieData = {
        labels: analise?.reasonList.map((r) => r.reason),
        datasets: [
            {
            label: 'Motivos das Tarefas Não Concluídas',
            data: analise?.reasonList.map((r) => r.amount),
            backgroundColor: cores,
            borderWidth: 1,
            },
        ],
        };

  const options: ChartOptions<'bar'> = {
    indexAxis: 'x',
    responsive: true,
    plugins: {
      legend: { display: true, position: 'top' },
      tooltip: {
        callbacks: {
          label: (context: TooltipItem<'bar'>) =>
            `${context.label}: ${context.formattedValue} tarefas`,
        },
      },
    },
    scales: {
      x: {
        ticks: { display: true, color: '#444' },
        grid: { display: false },
      },
      y: {
        ticks: { display: !isMobile, color: '#444' },
        grid: { display: false },
      },
    },
  };

  const pieOptions: ChartOptions<'pie'> = {
    responsive: false,
    layout: {
        padding: {
            top: 0,
            bottom: 0,
            left: 0,
            right: 0,
        },
    },
    plugins: {
        legend: { display: false, position: 'left' },
        tooltip: {
        callbacks: {
            label: (context: TooltipItem<'pie'>) =>
            `${context.label}: ${context.formattedValue} tarefas`,
        },
        },
    },
    };

  if (!isMobile) {
        return (
            <div className={styles.grafico}>
                <Bar data={data} options={options} />
            </div>
        );
  } else {
        return (
            <div className={styles.mob}>
                <Pie data={pieData} options={pieOptions} />
            </div>
        );
  }
}