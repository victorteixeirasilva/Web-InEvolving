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