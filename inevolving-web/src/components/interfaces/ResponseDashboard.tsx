import { Category } from "./Category";

export interface ResponseDashboard {
  idUser: string;
  categoryDTOList: Category[];
}