import type { Request, Response } from 'express';
import { container } from "tsyringe";
import { DeleteTaskUseCase } from "./delete-task-use-case";


export class DeleteTaskController {
  public async handle(request: Request, response: Response) {
    const { taskId } = request.params;

    const deleteTask = container.resolve(
      DeleteTaskUseCase
    );

    const task = await deleteTask.execute(taskId)

    return response.status(200).json(task)
  }
}