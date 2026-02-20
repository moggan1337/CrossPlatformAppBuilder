/**
 * Chat API - Like ChatGPT
 * 
 * Web-based chat interface for generating apps
 * Use this for the web UI
 */

import { createCrossPlatformGenerator } from '../platforms/cross-platform-generator';

export interface ChatMessage {
  id: string;
  role: 'user' | 'assistant' | 'system';
  content: string;
  timestamp: number;
  attachments?: string[];
}

export interface ChatSession {
  id: string;
  name: string;
  messages: ChatMessage[];
  createdAt: number;
  updatedAt: number;
}

export interface ChatRequest {
  message: string;
  sessionId?: string;
  platforms?: string[];
  attachments?: string[];
}

export interface ChatResponse {
  message: ChatMessage;
  session: ChatSession;
  code?: {
    ios?: string;
    android?: string;
    reactNative?: string;
    web?: string;
  };
}

export class ChatAPI {
  private sessions: Map<string, ChatSession> = new Map();
  private apiKey: string;
  private provider: string;

  constructor(apiKey: string, provider: string = 'claude') {
    this.apiKey = apiKey;
    this.provider = provider;
    
    // Initialize with a default session
    this.createSession('New Chat');
  }

  // Create a new chat session
  createSession(name?: string): ChatSession {
    const session: ChatSession = {
      id: `session_${Date.now()}`,
      name: name || 'New Chat',
      messages: [
        {
          id: 'system_1',
          role: 'system',
          content: `You are an expert AI app builder, like ChatGPT but specialized for building mobile and web applications.\n\nYou can create:\n- iOS apps (SwiftUI)\n- Android apps (Kotlin/Jetpack Compose)\n- React Native apps\n- Web apps (Next.js, FastAPI, Vue)\n\nWhen user asks to build something, generate the code and show them what was created!`,
          timestamp: Date.now()
        }
      ],
      createdAt: Date.now(),
      updatedAt: Date.now()
    };
    
    this.sessions.set(session.id, session);
    return session;
  }

  // Send a message and get response
  async sendMessage(request: ChatRequest): Promise<ChatResponse> {
    const session = request.sessionId 
      ? this.sessions.get(request.sessionId) 
      : Array.from(this.sessions.values())[0];
    
    if (!session) {
      throw new Error('Session not found');
    }

    // Add user message
    const userMessage: ChatMessage = {
      id: `msg_${Date.now()}_user`,
      role: 'user',
      content: request.message,
      timestamp: Date.now(),
      attachments: request.attachments
    };
    session.messages.push(userMessage);

    // Detect intent and generate response
    const intent = this.detectIntent(request.message);
    let responseContent: string;
    let code: ChatResponse['code'];

    switch (intent) {
      case 'generate':
        const genResult = await this.generateApp(
          request.message, 
          request.platforms || ['ios', 'android']
        );
        responseContent = genResult.response;
        code = genResult.code;
        break;
      
      case 'modify':
        const modResult = await this.modifyApp(request.message);
        responseContent = modResult;
        break;
      
      case 'help':
        responseContent = this.getHelp();
        break;
      
      default:
        responseContent = await this.chat(request.message, session);
    }

    // Add assistant response
    const assistantMessage: ChatMessage = {
      id: `msg_${Date.now()}_assistant`,
      role: 'assistant',
      content: responseContent,
      timestamp: Date.now()
    };
    session.messages.push(assistantMessage);
    session.updatedAt = Date.now();

    return {
      message: assistantMessage,
      session,
      code
    };
  }

  // Generate an app
  private async generateApp(prompt: string, platforms: string[]): Promise<{
    response: string;
    code: ChatResponse['code'];
  }> {
    const generator = createCrossPlatformGenerator(
      this.provider as any,
      this.apiKey
    );

    // Detect platforms
    const detectedPlatforms = this.detectPlatforms(prompt);
    const finalPlatforms = platforms.length > 0 ? platforms : detectedPlatforms;

    const result = await generator.generate({
      prompt,
      platforms: finalPlatforms
    });

    let response = `🎉 **App Created: ${result.app.name}**\n\n`;
    response += `📱 **Platforms:** ${finalPlatforms.join(', ')}\n\n`;
    
    if (result.app.screens?.length) {
      response += `📄 **Screens (${result.app.screens.length}):**\n`;
      result.app.screens.forEach((s: any, i: number) => {
        response += `${i + 1}. ${s.name}\n`;
      });
      response += '\n';
    }
    
    if (result.app.features?.length) {
      response += `✨ **Features:** ${result.app.features.join(', ')}\n\n`;
    }

    response += `⏱️ Generated in ${result.metadata.generationTime}ms\n`;
    response += `🤖 Model: ${result.metadata.model}\n`;

    // Store code for download
    const code: ChatResponse['code'] = {};
    if (result.code.ios) code.ios = result.code.ios;
    if (result.code.android) code.android = result.code.android;
    if (result.code['react-native']) code.reactNative = result.code['react-native'];
    if (result.code.web) code.web = result.code.web;

    return { response, code };
  }

  // Modify existing app
  private async modifyApp(prompt: string): Promise<string> {
    return `✏️ **Modifying your app...**\n\nI'd modify the app based on: "${prompt}"\n\nThis would update the existing app with your requested changes.`;
  }

  // Regular chat
  private async chat(message: string, session: ChatSession): Promise<string> {
    const generator = createCrossPlatformGenerator(
      this.provider as any,
      this.apiKey
    );

    // Get conversation context
    const context = session.messages
      .slice(-6)
      .map(m => `${m.role}: ${m.content}`)
      .join('\n\n');

    const result = await generator.generate({
      prompt: `${message}\n\nContext: ${context}`,
      platforms: ['ios', 'android']
    });

    return result.app.description || 
      `I'm here to help you build apps! Just tell me what you want to create.\n\nFor example:\n- "Create a fitness tracking app"\n- "Build an e-commerce app"\n- "Make a social media app"`;
  }

  // Detect intent
  private detectIntent(message: string): string {
    const lower = message.toLowerCase();
    if (lower.includes('create') || lower.includes('build') || 
        lower.includes('generate') || lower.includes('make') ||
        lower.includes('new app')) return 'generate';
    if (lower.includes('add') || lower.includes('change') || 
        lower.includes('modify') || lower.includes('update')) return 'modify';
    if (lower.includes('help') || lower.includes('what can')) return 'help';
    return 'chat';
  }

  // Detect platforms
  private detectPlatforms(message: string): string[] {
    const lower = message.toLowerCase();
    const platforms: string[] = [];
    if (lower.includes('ios') || lower.includes('iphone')) platforms.push('ios');
    if (lower.includes('android')) platforms.push('android');
    if (lower.includes('react native')) platforms.push('react-native');
    if (lower.includes('web') || lower.includes('next')) platforms.push('web');
    return platforms.length > 0 ? platforms : ['ios', 'android'];
  }

  // Get help text
  private getHelp(): string {
    return `🤖 **I'm your AI App Builder!**\n\nI can help you create:\n\n📱 **Mobile Apps:**\n- iOS (SwiftUI)\n- Android (Kotlin)\n- React Native\n\n🌐 **Web Apps:**\n- Next.js\n- FastAPI\n- Vue/Nuxt\n\n**Just tell me what you want!**\n\nExamples:\n- "Create a fitness tracking app"\n- "Build a social media app with chat"\n- "Make an e-commerce store"\n- "Generate a CRM dashboard"`;
  }

  // Get all sessions
  getSessions(): ChatSession[] {
    return Array.from(this.sessions.values()).sort(
      (a, b) => b.updatedAt - a.updatedAt
    );
  }

  // Get session by ID
  getSession(id: string): ChatSession | undefined {
    return this.sessions.get(id);
  }

  // Delete session
  deleteSession(id: string): boolean {
    return this.sessions.delete(id);
  }

  // Rename session
  renameSession(id: string, name: string): ChatSession | undefined {
    const session = this.sessions.get(id);
    if (session) {
      session.name = name;
      session.updatedAt = Date.now();
    }
    return session;
  }
}

// Factory
export function createChatAPI(apiKey: string, provider?: string): ChatAPI {
  return new ChatAPI(apiKey, provider);
}

// Export for API route usage
export { ChatAPI as default };
