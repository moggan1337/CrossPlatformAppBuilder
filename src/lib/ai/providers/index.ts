/**
 * Cross-Platform AI Providers
 * All available AI providers for app generation
 * 
 * DEFAULT: MiniMax M2.5 (peak performance, 204k context)
 */

export type AIProvider =
  | 'minimax'  // Default
  | 'claude'
  | 'openai'
  | 'gemini'
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
  // Default - MiniMax M2.5
  minimax: {
    id: 'minimax',
    name: 'MiniMax',
    description: 'MiniMax M2.5 - Peak Performance AI (Default)',
    models: [
      'MiniMax-M2.5',           // Peak Performance (60 tps) - DEFAULT
      'MiniMax-M2.5-highspeed', // Faster (100 tps)
      'MiniMax-M2.1',           // Powerful Multi-Language
      'MiniMax-M2.1-highspeed', // Faster
      'MiniMax-M2'              // Agentic capabilities
    ],
    defaultModel: 'MiniMax-M2.5',
    contextWindow: 204800,
    apiUrl: 'https://api.minimax.chat/v1'
  },
  claude: {
    id: 'claude',
    name: 'Claude',
    description: "Anthropic's Claude - Excellent for code generation",
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
  zhipu: {
    id: 'zhipu',
    name: 'Z.ai',
    description: 'Zhipu AI (GLM) - Chinese AI model',
    models: ['glm-4', 'glm-4-flash'],
    defaultModel: 'glm-4'
  }
} as const;

// Default provider
export const DEFAULT_PROVIDER: AIProvider = 'minimax';

export type ProviderName = keyof typeof AI_PROVIDERS;

// Get provider by name
export function getProvider(name: AIProvider): typeof AI_PROVIDERS[AIProvider] {
  return AI_PROVIDERS[name];
}

// Get default provider
export function getDefaultProvider(): typeof AI_PROVIDERS['minimax'] {
  return AI_PROVIDERS.minimax;
}

// Get all available models for all providers
export function getAllModels(): Array<{
  provider: string;
  name: string;
  models: string[];
  defaultModel: string;
  isDefault?: boolean;
}> {
  return Object.entries(AI_PROVIDERS).map(([key, config]) => ({
    provider: key,
    name: config.name,
    models: config.models,
    defaultModel: config.defaultModel,
    isDefault: key === 'minimax'
  }));
}
