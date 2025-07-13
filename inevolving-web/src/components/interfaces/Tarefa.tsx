export interface Tarefa {
    id: string,
    nameTask: string,
    descriptionTask: string,
    status: string,
    dateTask: string,
    idObjective: string,
    idUser: string,
    idParentTask: string,
    idOriginalTask: string,
    hasSubtasks: boolean,
    blockedByObjective: boolean,
    isCopy: boolean,
    cancellationReason: string
}