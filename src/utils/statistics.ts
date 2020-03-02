import { Task } from "../api/agents.types";
import { Colors } from "@blueprintjs/core";

export type StatisticsKeys = "AVG" | "MEDIAN";

export interface Statistic {
  id: StatisticsKeys;
  name: string;
  color: string;
  calculus: (tasks: Map<string, Task>) => number;
}

// We can simply add other relevant statistics here
export const statistics: Array<Statistic> = [
  {
    id: "AVG",
    name: "Average",
    color: Colors.BLUE3,
    calculus: tasks => {
      const values = Array.from(tasks.values());
      const sum = values.reduce((acc, { score }) => acc + score, 0);
      return Math.floor(sum / values.length);
    }
  },
  {
    id: "MEDIAN",
    name: "Median",
    color: Colors.GREEN3,
    calculus: tasks => {
      const values = Array.from(tasks.values()).map(({ score }) => score);
      const mid = Math.floor(values.length / 2);
      const nums = [...values].sort((a, b) => a - b);
      return values.length % 2 !== 0
        ? nums[mid]
        : (nums[mid - 1] + nums[mid]) / 2;
    }
  }
];

export default statistics;
