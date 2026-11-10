import {
  createAgent,
  createOpenAILLM,
  MockLLM,
  type Agent,
  type AgentResult,
} from 'delivery-ai-agents-common';
import { buildTools } from '@/ai/tools';
import { buildSystemPrompt } from '@/ai/prompts';

let shared: Agent | null = null;

/**
 * Assemble the food-agent once and reuse it. The vertical tools operate on the
 * typed fixtures, so the chat genuinely answers intents with zero API keys via
 * the SDK's MockLLM. Setting OPENAI_API_KEY swaps in a real LLM in one line.
 */
export function getAgent(): Agent {
  if (shared) return shared;
  const tools = buildTools();
  const apiKey = process.env.OPENAI_API_KEY?.trim();
  const llm = apiKey
    ? createOpenAILLM(tools, {
        apiKey,
        baseUrl: process.env.OPENAI_BASE_URL || undefined,
        model: process.env.OPENAI_MODEL || undefined,
      })
    : new MockLLM(tools, { systemPrompt: buildSystemPrompt() });

  shared = createAgent({
    systemPrompt: buildSystemPrompt(),
    tools,
    llm,
    maxToolRounds: 2,
  });
  return shared;
}

export async function chat(
  userId: string,
  message: string,
): Promise<AgentResult> {
  return getAgent().handle(userId, message);
}
