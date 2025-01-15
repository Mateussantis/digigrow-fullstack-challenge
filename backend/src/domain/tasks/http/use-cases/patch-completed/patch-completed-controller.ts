import type { Request, Response } from 'express';
import { container } from 'tsyringe';
import { PatchCompletedUseCase } from './patch-completed-use-case';

export class PatchCompletedController {
  public async handle(request: Request, response: Response) {
    const { taskId } = request.params;

    const taskCompleted = container.resolve(
      PatchCompletedUseCase
    )

    const task = await taskCompleted.execute(taskId)

    return response.status(200).json(task)
  }
}