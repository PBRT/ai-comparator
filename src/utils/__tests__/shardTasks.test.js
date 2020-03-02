import { shardTasksPerCategories } from "../shardTasks";

const MOCK_TASKS = [
  {
    id: "mem_1",
    name: "Blackjack",
    category: "memory",
    score: 56
  },
  {
    id: "logic_1",
    name: "Breakout",
    category: "logic",
    score: 79
  },
  {
    id: "planning_1",
    name: "Pacman",
    category: "planning",
    score: 58
  },
  {
    id: "mem_2",
    name: "Q-bert",
    category: "memory",
    score: 61
  }
];

const DUPLICATED_TASKS = [
  {
    id: "mem_1",
    name: "Blackjack",
    category: "memory",
    score: 56
  },
  {
    id: "mem_1",
    name: "Blackjack",
    category: "memory",
    score: 56
  }
];

describe("Shard tasks per categories", () => {
  it("should return a valid data structure", () => {
    const shardedTasks = shardTasksPerCategories(MOCK_TASKS);
    expect(shardedTasks.size).toEqual(3);
    expect(shardedTasks.get("memory").size).toEqual(2);
    expect(shardedTasks.get("logic").size).toEqual(1);
    expect(shardedTasks.get("planning").size).toEqual(1);
  });
  it("should return an empty map", () => {
    const shardedTasks = shardTasksPerCategories([]);
    expect(shardedTasks.size).toEqual(0);
  });
  it("should handle duplicated tasks", () => {
    const shardedTasks = shardTasksPerCategories(DUPLICATED_TASKS);
    expect(shardedTasks.size).toEqual(1);
    expect(shardedTasks.get("memory").size).toEqual(1);
  });
});
