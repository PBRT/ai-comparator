import { Task } from "../api/agents.types";

export function shardTasksPerCategories(tasks: ReadonlyArray<Task>) {
  const shardedTasks = new Map();
  for (const k in tasks) {
    const { category, id } = tasks[k];
    const shardedTasksCategory = shardedTasks.get(category);
    if (shardedTasksCategory !== undefined) {
      shardedTasks.set(category, shardedTasksCategory.set(id, tasks[k]));
    } else {
      shardedTasks.set(category, new Map([[id, tasks[k]]]));
    }
  }
  return shardedTasks;
}
