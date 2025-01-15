import type { TaskInterface } from "@/domain/tasks/infra/interfaces/task-interface";
import { AppError } from "@/shared/errors";
import type { Task } from "@prisma/client";
import { addHours, format } from "date-fns";
import { inject, injectable } from "tsyringe";

interface UpdateTaskDTO {
  completed: boolean
  dateToFinish: Date | string
}

@injectable()
export class PatchCompletedUseCase {
  constructor(
    @inject('TaskInterface')
    private taskRepository: TaskInterface
  ) { }

  public async execute(taskId: string): Promise<Task> {
    const taskCheck = await this.taskRepository.findOneById(taskId);

    if (!taskCheck) {
      throw new AppError('Task does not exist!');
    }

    Object.assign<Task, Pick<Task, 'completed'>>(
      taskCheck,
      {
        completed: !taskCheck.completed,
      }
    );

    await this.taskRepository.save(taskCheck);

    Object.assign(taskCheck, {
      dateToFinish: format(addHours(taskCheck.dateToFinish, 3), 'dd-MM-yyyy')
    });

    return taskCheck;
  }
}