import type { PaginationParams, TaskInterface } from "@/domain/tasks/infra/interfaces/task-interface";
import { AppError } from "@/shared/errors";
import { format, parse } from "date-fns";
import { inject, injectable } from "tsyringe";

@injectable()
export class ListTasksUseCase {
  constructor(
    @inject('TaskInterface')
    private taskRepository: TaskInterface
  ) { }

  // public async execute(titleSearch?: string, PaginationParams: PaginationParams) {
  public async execute(titleSearch: string) {
    const tasks = await this.taskRepository.searchFilter(titleSearch);
    // const tasks = await this.taskRepository.searchFilter(titleSearch, PaginationParams);

    if (!tasks) {
      throw new AppError('There are no tasks!');
    }

    const tasksFormated = tasks.map((task) => ({
      ...task,
      dateToFinish: format(new Date(task.dateToFinish), 'yyyy-MM-dd')
    }))

    return tasksFormated;
  }
}