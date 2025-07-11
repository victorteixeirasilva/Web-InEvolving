'use client';

import { useEffect, useState } from 'react';
import Menu from "@/components/Menu";
import styles from './page.module.scss';
import Image from "next/image";
import * as motion from "motion/react-client"


export interface Objective {
  id: string;
  nameObjective: string;
  descriptionObjective: string;
  statusObjective: string;
  completionDate: string;
  idUser: string;
  totNumberTasks: number;
  numberTasksToDo: number;
  numberTasksDone: number;
  numberTasksInProgress: number;
  numberTasksOverdue: number;
  percentageTasksToDo: number;
  percentageTasksDone: number;
  percentageTasksInProgress: number;
  percentageTasksOverdue: number;
}

export interface Category {
  id: string;
  categoryName: string;
  categoryDescription: string;
  objectives: Objective[];
}

export interface ResponseDashboard {
  idUser: string;
  categoryDTOList: Category[];
}


export default function Dashboard() {

    const [urlVisionBord, setUrlVisionBord] = useState<string | null>(null);
    const [jwtToken, setJwtToken] = useState('');
    const [dashboardData, setDashboardData] = useState<ResponseDashboard | null>(null);
    const [showVisionBoard, setShowVisionBoard] = useState(false);



    useEffect(() => {
        const storedUrl = localStorage.getItem('visionBordUrl');
        setUrlVisionBord(storedUrl);
        const token = localStorage.getItem('token');
        setJwtToken(token ?? '');
    }, []);

    const getDashboard = async () => {
        const response = await fetch(
                'http://127.0.0.1:2327/auth/api/dashboard', 
            {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': 'Bearer ' + jwtToken
                },
            });

        const data: ResponseDashboard = await response.json();
        

        if (!response.ok){
            alert('Erro ao puxar dashboard');
            console.error('Erro ao puxar dashboard');
        }
        
        setDashboardData(data);
    };

    useEffect(() => {
        if (jwtToken) {
            getDashboard();
        }
        }, [jwtToken]);


    const handleOpenInNewTab = () => {
        if (!urlVisionBord) return;
        window.open(urlVisionBord, '_blank');
    };



    return (
        <>
            <Menu />
        </>
    );
}