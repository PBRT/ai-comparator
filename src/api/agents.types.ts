export type AgentId = number;

export interface Agent {
  readonly id: AgentId;
  readonly name: string;
  readonly description: string;
  readonly tasks: Task[];
}

export type Category = "memory" | "planning" | "logic";

export interface Task {
  readonly id: string;
  readonly name: string;
  readonly category: Category;
  readonly score: number;
}
