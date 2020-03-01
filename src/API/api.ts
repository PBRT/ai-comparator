import { asFallibleAsyncResponse } from "./helpers";

type AgentId = number;

interface Agent {
  readonly id: AgentId;
  readonly name: string;
  readonly description: string;
  readonly tasks: Task[];
}

interface Task {
  readonly id: string;
  readonly name: string;
  readonly category: "memory" | "planning" | "logic";
  readonly score: number;
}

// == Agents API Service ==
export class AgentsApi {
  listAgents(): Promise<ReadonlyArray<Agent>> {
    return asFallibleAsyncResponse(AGENTS);
  }
  searchAgents(nameSubstr: string): Promise<ReadonlyArray<Agent>> {
    return asFallibleAsyncResponse(
      AGENTS.filter(agent => agent.name.includes(nameSubstr))
    );
  }
  getAgent(id: AgentId): Promise<Agent | undefined> {
    return asFallibleAsyncResponse(AGENTS.find(agent => agent.id === id));
  }
}
