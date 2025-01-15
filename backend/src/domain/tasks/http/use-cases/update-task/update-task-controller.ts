import type { Request, Response } from 'express';
import { container } from 'tsyringe';
import { UpdateTaskUseCase } from './update-task-use-case';

export class UpdateTaskController {
  public async handle(request: Request, response: Response) {
    const { taskId } = request.params;
    const {
      title,
      description,
      dateToFinish
    } = request.body;

    const updateTask = container.resolve(
      UpdateTaskUseCase
    )

    const task = await updateTask.execute({
      taskId,
      task: {
        id: taskId,
        title,
        description,
        dateToFinish
      }
    })

    return response.status(200).json(task)
  }
}