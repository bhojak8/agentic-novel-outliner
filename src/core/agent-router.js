/**
 * Agent Router — Routes user input to the correct specialized agent
 */

import { FictionAgent } from '../agents/fiction/index.js';
import { NonfictionAgent } from '../agents/nonfiction/index.js';
import { ShortStoryAgent } from '../agents/shortstory/index.js';
import { KidsBookAgent } from '../agents/kidsbook/index.js';

const AGENTS = {
  fiction: new FictionAgent(),
  nonfiction: new NonfictionAgent(),
  shortstory: new ShortStoryAgent(),
  kidsbook: new KidsBookAgent()
};

/**
 * Get all available agent types
 */
export function getAgentTypes() {
  return [
    {
      id: 'fiction',
      name: 'Fiction Novel',
      description: 'Full-length fiction novels across all genres',
      icon: '📖',
      genres: AGENTS.fiction.getGenres()
    },
    {
      id: 'nonfiction',
      name: 'Non-Fiction Book',
      description: 'Narrative, prescriptive, and investigative non-fiction',
      icon: '📚',
      genres: AGENTS.nonfiction.getGenres()
    },
    {
      id: 'shortstory',
      name: 'Short Story',
      description: 'Short stories, flash fiction, and collections',
      icon: '📝',
      genres: AGENTS.shortstory.getGenres()
    },
    {
      id: 'kidsbook',
      name: "Kids Book",
      description: 'Picture books through Middle Grade',
      icon: '🎨',
      genres: AGENTS.kidsbook.getGenres()
    }
  ];
}

/**
 * Get the agent instance for a given type
 */
export function getAgent(agentType) {
  const agent = AGENTS[agentType];
  if (!agent) throw new Error(`Unknown agent type: ${agentType}. Available: ${Object.keys(AGENTS).join(', ')}`);
  return agent;
}
