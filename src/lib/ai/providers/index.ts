/**
 * Cross-Platform AI Providers
 * All available AI providers for app generation
 */

export type AIProvider = 
  | 'claude' 
  | 'openai' 
  | 'gemini' 
  | 'minimax' 
  | 'zhipu';

export interface AIProviderConfig {
  name: string;
  apiKey: string;
  model?: string;
  temperature?: number;
  maxTokens?: number;
}

export interface AIResponse {
  content: string;
  usage?: {
    promptTokens: number;
    completionTokens: number;
    totalTokens: number;
  };
  model: string;
}

// All available AI providers
export const AI_PROVIDERS = {
  claude: {
    id: 'claude',
    name: 'Claude',
    description: 'Anthropic\'s Claude - Excellent for code generation',
    models: ['claude-sonnet-4-5', 'claude-opus-4-6'],
    defaultModel: 'claude-sonnet-4-5'
  },
  openai: {
    id: 'openai',
    name: 'OpenAI',
    description: 'GPT-4o - Most popular AI model',
    models: ['gpt-4o', 'gpt-4o-mini', 'gpt-4-turbo'],
    defaultModel: 'gpt-4o'
  },
  gemini: {
    id: 'gemini',
    name: 'Google Gemini',
    description: 'Gemini 2.0 - Google\'s latest AI',
    models: ['gemini-2.0-flash', 'gemini-2.0-flash-lite', 'gemini-1.5-pro'],
    defaultModel: 'gemini-2.0-flash'
  },
  minimax: {
    id: 'minimax',
    name: 'MiniMax',
    description: 'MiniMax AI - Fast and cost-effective',
    models: ['abab6.5s', 'abab6.5g'],
    defaultModel: 'abab6.5s'
  },
  zhipu: {
    id: 'zhipu',
    name: 'Z.ai',
    description: 'Zhipu AI (GLM) - Chinese AI model',
    models: ['glm-4', 'glm-4-flash'],
    defaultModel: 'glm-4'
  }
} as const;

export type ProviderName = keyof typeof AI_PROVIDERS;

// Get provider by name
export function getProvider(name: AIProvider): typeof AI_PROVIDERS[AIProvider] {
  return AI_PROVIDERS[name];
}

// Get all available models for all providers
export function getAllModels(): Array<{ 
  provider: string; 
  name: string;
  models: string[];
  defaultModel: string;
}> {
  return Object.entries(AI_PROVIDERS).map(([key, config]) => ({
    provider: key,
    name: config.name,
    models: config.models,
    defaultModel: config.defaultModel
  }));
}
