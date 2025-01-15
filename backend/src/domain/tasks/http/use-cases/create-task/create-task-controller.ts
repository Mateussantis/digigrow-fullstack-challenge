import type { Request, Response } from 'express';
import { container } from "tsyringe";
import { CreateTaskUseCase } from "./create-task-use-case";


export class CreateTaskController {
  public async handle(request: Request, response: Response) {
    const { title, description, dateToFinish, completed } = request.body;

    console.log("Data: ", dateToFinish);

    const createTask = container.resolve(
      CreateTaskUseCase
    );

    const task = await createTask.execute({
      title,
      description,
      dateToFinish,
      completed
    })

    return response.status(200).json(task)
  }
}