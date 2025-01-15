import type { TaskInterface } from "@/domain/tasks/infra/interfaces/task-interface";
import { AppError } from "@/shared/errors";
import type { Task } from "@prisma/client";
import { addHours, format } from "date-fns";
import { inject, injectable } from "tsyringe";

interface UpdateTaskDTO {
  id: string
  title: string
  description: string
  dateToFinish: Date | string
}

interface UpdateTaskRequest {
  taskId: string
  task: UpdateTaskDTO
}

@injectable()
export class UpdateTaskUseCase {
  constructor(
    @inject('TaskInterface')
    private taskRepository: TaskInterface
  ) { }

  public async execute({
    taskId,
    task
  }: UpdateTaskRequest): Promise<Task> {
    const taskCheck = await this.taskRepository.findOneById(taskId);

    if (!taskCheck) {
      throw new AppError('Task does not exist!');
    }

    Object.assign<Task, Omit<UpdateTaskDTO, 'id'>>(
      taskCheck,
      {
        ...task
      }
    )

    await this.taskRepository.save(taskCheck);

    Object.assign<Task, Pick<UpdateTaskDTO, 'dateToFinish'>>(
      taskCheck,
      {
        dateToFinish: format(addHours(task.dateToFinish, 3), 'dd-MM-yyyy')
      }
    )

    return taskCheck;
  }
}