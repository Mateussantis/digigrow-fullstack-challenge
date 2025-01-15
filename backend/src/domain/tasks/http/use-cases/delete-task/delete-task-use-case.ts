import type { TaskInterface } from "@/domain/tasks/infra/interfaces/task-interface";
import { AppError } from "@/shared/errors";
import { inject, injectable } from "tsyringe";

@injectable()
export class DeleteTaskUseCase {
  constructor(
    @inject('TaskInterface')
    private taskRepository: TaskInterface
  ) { }

  public async execute(taskId: string): Promise<void> {
    const taskCheck = await this.taskRepository.findOneById(taskId);

    if (!taskCheck) {
      throw new AppError("Task does not exist!");
    }

    await this.taskRepository.delete(taskId);
  }
}