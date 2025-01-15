import type { TaskInterface } from "@/domain/tasks/infra/interfaces/task-interface";
import type { Task } from "@prisma/client";
import { addHours, format } from "date-fns";
import { inject, injectable } from "tsyringe";

interface CreateTaskUseCaseRequest {
  title: string;
  description: string;
  dateToFinish: Date;
  completed: boolean;
}

@injectable()
export class CreateTaskUseCase {
  constructor(
    @inject('TaskInterface')
    private taskRepository: TaskInterface
  ) { }

  public async execute({
    title,
    description,
    dateToFinish
  }: CreateTaskUseCaseRequest): Promise<Task> {

    const task = await this.taskRepository.create({
      title,
      description,
      dateToFinish
    });

    const taskFormat = Object.assign(task, {
      dateToFinish: format(addHours(task.dateToFinish, 3), 'dd-MM-yyyy')
    });

    return taskFormat;
  }
}

