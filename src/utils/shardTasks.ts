import { Task, Category } from "../api/agents.types";
import { statistics } from "./statistics";

export function shardTasksPerCategories(
  tasks: ReadonlyArray<Task>
): Map<Category, Map<string, Task>> {
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

function __computeStats(value: Map<string, Task> | undefined) {
  if (value === undefined) {
    return new Map();
  }
  return statistics.reduce(
    (acc, { id, calculus }) => acc.set(id, calculus(value)),
    new Map()
  );
}

type ShardEntry = {
  values: Map<Category, Map<string, Task>>;
  key: string;
};

type ComputedShard = Map<Category, Map<string, Map<string, number>>>;

export function computeCategoriesShards(
  shard1: ShardEntry,
  shard2: ShardEntry
): ComputedShard {
  const resultsMap = new Map();
  const categoriesShard1 = Array.from(shard1.values.keys());
  const categoriesShard2 = Array.from(shard2.values.keys());
  const categories: Array<Category> = [
    ...categoriesShard1,
    ...categoriesShard2
  ];

  // Re-order under the same keys
  for (const k of categories) {
    let entry = new Map();
    if (shard1.values.has(k)) {
      entry.set(shard1.key, __computeStats(shard1.values.get(k)));
    }
    if (shard2.values.has(k) !== null) {
      entry.set(shard2.key, __computeStats(shard2.values.get(k)));
    }
    if (entry.size > 0) {
      resultsMap.set(k, entry);
    }
  }

  return resultsMap;
}

export type ComparisonResult = {
  value: number;
  delta: number | undefined;
};

export function buildComparisonResultsForAgent(
  agent: Map<string, number>,
  comparedAgent: Map<string, number>
): Map<string, ComparisonResult> {
  const resultsMap = new Map();
  const agentKeys = Array.from(agent.keys());

  for (const k of agentKeys) {
    const agentValue = agent.get(k);
    const comparedAgentValue = comparedAgent.get(k);
    if (agentValue === undefined) {
      continue;
    }
    if (comparedAgentValue === undefined) {
      resultsMap.set(k, { value: agentValue });
    } else {
      resultsMap.set(k, {
        value: agentValue,
        delta: agentValue - comparedAgentValue
      });
    }
  }

  return resultsMap;
}
