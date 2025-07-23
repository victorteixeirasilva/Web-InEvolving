export interface Tarefa_Modulo_Tarefas {
  id: string;
  nameTask: string;
  descriptionTask: string;
  status: string;
  dateTask: string;
  idObjective: string;
  idUser: string;
  blockedByObjective: boolean;
  cancellationReason: string;
}

  // {
  //   "id": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
  //   "nameTask": "string",
  //   "descriptionTask": "string",
  //   "status": "string",
  //   "dateTask": "2025-07-23T18:25:49.837Z",
  //   "idObjective": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
  //   "idUser": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
  //   "idParentTask": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
  //   "idOriginalTask": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
  //   "hasSubtasks": true,
  //   "blockedByObjective": true,
  //   "isCopy": true,
  //   "cancellationReason": "string"
  // }