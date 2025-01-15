import type { PrismaClient, Task } from '@prisma/client';
import prisma from '../../../../shared/prisma/client';
import type {
  CreateTaskDTO,
  PaginationParams,
  TaskInterface
} from '../interfaces/task-interface';

export class TaskRepository implements TaskInterface {
  private readonly repository: PrismaClient;

  constructor() {
    this.repository = prisma;
  }

  public async create({
    id,
    title,
    description,
    dateToFinish
  }: CreateTaskDTO): Promise<Task> {
    const task = await this.repository.task.create({
      data: {
        id,
        title,
        description,
        dateToFinish,
      }
    })

    return task;
  }

  public async delete(taskId: string): Promise<void> {
    await this.repository.task.delete({
      where: {
        id: taskId,
      }
    })
  }

  public async findOneById(taskId: string): Promise<Task | null> {
    const task = await this.repository.task.findUnique({
      where: {
        id: taskId
      }
    })

    return task;
  }

  public async save(task: Task): Promise<Task> {
    return await this.repository.task.update({
      where: {
        id: task.id,
      },
      data: {
        title: task.title,
        description: task.description,
        dateToFinish: task.dateToFinish,
        completed: task.completed
      },
    })
  }

  public async findMany(): Promise<Task[]> {
    return await this.repository.task.findMany({
      orderBy: {
        dateToFinish: 'asc',
      }
    });
  }

  // public async searchFilter(wordToSearch: string, paginationParams: PaginationParams): Promise<Task[]> {
  public async searchFilter(wordToSearch: string): Promise<Task[]> {
    return await this.repository.task.findMany({
      // skip: paginationParams.skip * paginationParams.take,
      // take: paginationParams.take,
      orderBy: {
        dateToFinish: 'asc'
      },
      where: {
        title: {
          startsWith: wordToSearch,
          mode: 'insensitive'
        }
      }
    })
  }
}