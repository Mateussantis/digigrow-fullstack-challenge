import type { Task } from "@prisma/client";

export interface CreateTaskDTO {
  id?: string;
  title: string;
  description: string;
  dateToFinish: Date;
  completed?: boolean;
}

export interface PaginationParams {
  skip: number;
  take: number;
}
export interface TaskInterface {
  create(task: CreateTaskDTO): Promise<Task>
  delete(taskId: string): Promise<void>
  findOneById(taskId: string): Promise<Task | null>
  save(task: Task): Promise<Task>
  findMany(): Promise<Task[]>
  searchFilter(wordToSearch: string): Promise<Task[]>
  // searchFilter(wordToSearch: string, paginationParams: PaginationParams): Promise<Task[]>
}