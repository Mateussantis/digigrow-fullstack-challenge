import { useContext } from "react";
import { TaskContext } from "../contexts/tasks";

export function useTask() {
  const context = useContext(TaskContext);
  if (!context) {
    throw new Error("useTasks should be used within an TasksProvider");
  }

  return context;
}