import AGENTS from "./agents.data";
import { Agent, AgentId } from "./agents.types";
import { asFallibleAsyncResponse } from "./agents.helpers";

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

const agentApiInstance = new AgentsApi();

// Avoid to re-create an instance at every calls
export function getAgentApiInstance() {
  return agentApiInstance;
}
