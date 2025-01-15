import { Router } from "express";
import { CreateTaskController } from "../use-cases/create-task/create-task-controller";
import { DeleteTaskController } from "../use-cases/delete-task/delete-task-controller";
import { FilteSearchController } from "../use-cases/filtro-busca/filter-search-controller";
import { ListTasksController } from "../use-cases/list-tasks/list-tasks-controller";
import { PatchCompletedController } from "../use-cases/patch-completed/patch-completed-controller";
import { UpdateTaskController } from "../use-cases/update-task/update-task-controller";

const createTaskController = new CreateTaskController();
const deleteTaskController = new DeleteTaskController();
const updateTaskController = new UpdateTaskController();
const listTasksController = new ListTasksController();
const patchCompletedController = new PatchCompletedController();

const taskRouter = Router();

taskRouter.post('/', createTaskController.handle);
taskRouter.delete('/:taskId', deleteTaskController.handle);
taskRouter.put('/:taskId', updateTaskController.handle);
taskRouter.get('/', listTasksController.handle);
taskRouter.patch('/completed/:taskId', patchCompletedController.handle);



export { taskRouter };