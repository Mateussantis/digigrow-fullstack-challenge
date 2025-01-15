import { container } from "tsyringe";
import type { TaskInterface } from "../infra/interfaces/task-interface";
import { TaskRepository } from "../infra/repositories/task-repository";

container.registerSingleton<TaskInterface>(
  'TaskInterface',
  TaskRepository
)