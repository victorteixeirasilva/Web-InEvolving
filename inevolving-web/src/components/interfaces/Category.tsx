import { Objective } from "./Objective";

export interface Category {
  id: string;
  categoryName: string;
  categoryDescription: string;
  objectives: Objective[];
}