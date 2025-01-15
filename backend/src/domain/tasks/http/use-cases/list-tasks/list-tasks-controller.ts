import type { Request, Response } from 'express';
import { container } from "tsyringe";
import { ListTasksUseCase } from "./list-tasks-use-case";

export class ListTasksController {
  public async handle(request: Request, response: Response) {
    // const { skip = 0, take = 2, titleSearch } = request.query;
    const { titleSearch } = request.query;
    const listTasks = container.resolve(ListTasksUseCase);

    const tasks = await listTasks.execute(titleSearch);
    // const tasks = await listTasks.execute(titleSearch, { skip: Number(skip), take });

    return response.status(200).json(tasks);
  }
}