import { addDays, format } from "date-fns";
import { toZonedTime } from 'date-fns-tz';
import { type ReactNode, createContext, useCallback, useEffect, useMemo, useState } from "react";
import { api } from "../services/api";

type CreateTaskResponse = {
  id: string;
  title: string;
  description: string;
  dateToFinish: string;
  completed: string;
}

type TaskDTO = {
  title: string;
  description: string;
  dateToFinish: string;
}

export type TaskContextData = {
  tasks: CreateTaskResponse[];
  fetchTasksLoading: boolean;
  numberTasks: number;
  numberTasksCompleted: number;
  numberPages: number;
  page: number;
  nextPage: () => Promise<void>;
  previousPage: () => Promise<void>;
  deleteTask: (taskId: string) => Promise<void>;
  updateTask: (task: TaskDTO, taskId: string) => Promise<void>;
  createTask: (task: TaskDTO) => Promise<void>;
  updateCompleted: (taskId: string) => Promise<void>;
  fetchTasks: (search: string) => Promise<void>;
}

const TaskContext = createContext<TaskContextData>({} as TaskContextData);

interface TaskProviderProps {
  children: ReactNode;
}

const TaskProvider = ({ children }: TaskProviderProps): JSX.Element => {
  const [tasks, setTasks] = useState<CreateTaskResponse[]>([]);
  const [fetchTasksLoading, setFetchTasksLoading] = useState<boolean>(false);
  const [page, setPage] = useState(1);
  const tasksPerPage = 2;

  const nextPage = () => {
    if (page >= numberPages) {
      return
    }
    setPage((prev) => prev + 1);
  }

  const previousPage = () => {
    if (page <= 1) {
      return
    }
    setPage((prev) => prev - 1);
  }

  const numberTasks = useMemo(() => {
    return tasks.length;
  }, [tasks]);

  const numberPages = useMemo(() => {
    return Math.ceil(tasks.length / tasksPerPage);
  }, [tasks]);

  console.log(numberPages);


  const numberTasksCompleted = useMemo(() => {
    return tasks.filter((task) => task.completed).length;
  }, [tasks]);

  async function deleteTask(taskId: string) {
    await api.delete(`/task/${taskId}`);

    setTasks((prev) => prev.filter((task) => task.id !== taskId));
  }

  async function updateTask({ title, description, dateToFinish }: TaskDTO, taskId: string): Promise<void> {
    const { data } = await api.put<CreateTaskResponse>(`/task/${taskId}`,
      {
        title,
        description,
        dateToFinish: toZonedTime(dateToFinish, 'America/Sao_Paulo')
      },
    );

    const index = tasks.findIndex((task) => task.id === taskId);

    const list = [...tasks];

    list[index] = data;

    setTasks(list.sort((a, b) => {
      const [dayA, monthA, yearA] = a.dateToFinish.split("-");
      const [dayB, monthB, yearB] = b.dateToFinish.split("-");

      const dateA = new Date(`${yearA}-${monthA}-${dayA}`);
      const dateB = new Date(`${yearB}-${monthB}-${dayB}`);

      return Number(dateA) - Number(dateB);
    }));
  }

  async function createTask({ title, description, dateToFinish }: TaskDTO) {
    const { data } = await api.post<CreateTaskResponse>("/task",
      {
        title,
        description,
        dateToFinish: toZonedTime(dateToFinish, 'America/Sao_Paulo')
      },
    );

    setTasks((prev) => [
      ...prev,
      data
    ].sort((a, b) => {
      const [dayA, monthA, yearA] = a.dateToFinish.split("-");
      const [dayB, monthB, yearB] = b.dateToFinish.split("-");

      const dateA = new Date(`${yearA}-${monthA}-${dayA}`);
      const dateB = new Date(`${yearB}-${monthB}-${dayB}`);

      return Number(dateA) - Number(dateB);
    }));
  }

  async function updateCompleted(taskId: string) {
    const { data: check } = await api.patch(`/task/completed/${taskId}`);

    const index = tasks.findIndex((item) => item.id === taskId);

    const list = [...tasks];

    list[index] = check;

    setTasks(list);
  }

  async function fetchTasks(search = "") {
    setFetchTasksLoading(true);
    try {
      const { data: tasks } =
        await api.get<CreateTaskResponse[]>(`/task?titleSearch=${search}`);

      const formattedTasks = tasks.map((task) => {
        const dateToFinishInSaoPaulo = toZonedTime(task.dateToFinish, 'America/Sao_Paulo');
        const formattedDate = format(dateToFinishInSaoPaulo, 'dd-MM-yyyy');

        return {
          ...task,
          dateToFinish: formattedDate,
        };
      });

      setTasks(formattedTasks);
    } catch (err) {
      console.log(err);
    } finally {
      setFetchTasksLoading(false);
    }
  }


  const value = {
    tasks,
    fetchTasksLoading,
    numberTasks,
    numberTasksCompleted,
    numberPages,
    page,
    nextPage,
    previousPage,
    deleteTask,
    updateTask,
    createTask,
    updateCompleted,
    fetchTasks
  }

  // biome-ignore lint/correctness/useExhaustiveDependencies: <explanation>
  useEffect(() => {
    fetchTasks();
  }, []);

  return <TaskContext.Provider value={value}>{children}</TaskContext.Provider>
}

export { TaskContext, TaskProvider }