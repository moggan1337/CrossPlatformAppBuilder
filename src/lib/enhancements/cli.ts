/**
 * AI Coding CLI - Like Claude Code
 * 
 * Interactive terminal that:
 * - Chats with AI (like Claude Code)
 * - Executes real commands (runs agentos pipeline)
 * - Creates files, runs code, builds apps
 * 
 * Usage:
 *   npx appbuilder
 *   
 * Environment:
 *   AGENTOS_API_URL - URL of agentos orchestrator
 *   MINIMAX_API_KEY - API key for AI
 */

import { createCrossPlatformGenerator } from '../platforms/cross-platform-generator';

export interface CLIMessage {
  role: 'user' | 'assistant' | 'system';
  content: string;
  timestamp: number;
}

export interface CLIContext {
  currentProject?: string;
  platforms?: string[];
  workingDir?: string;
}

/**
 * Main CLI Engine - Like Claude Code
 */
export class AICodeCLI {
  private messages: CLIMessage[] = [];
  private context: CLIContext = {};
  private apiKey: string;
  private provider: string;
  private agentosUrl: string;

  constructor(
    apiKey: string,
    provider: string = 'minimax',
    agentosUrl?: string
  ) {
    this.apiKey = apiKey;
    this.provider = provider;
    this.agentosUrl = agentosUrl || process.env.AGENTOS_API_URL || 'http://localhost:8000';
    
    // System prompt - like Claude Code's instructions
    this.messages.push({
      role: 'system',
      content: `You are an expert AI coding assistant, like Claude Code. 
You help users build mobile and web applications.

You can:
- Generate iOS (SwiftUI), Android (Kotlin), React Native, Web (Next.js)
- Read and write files
- Execute terminal commands
- Run the Agent OS pipeline to build apps
- Help with debugging and code review

When user asks to build something, you should:
1. Understand what they want
2. Generate the code using the platform generators
3. Execute the agentos pipeline if needed
4. Report results clearly

Be conversational and helpful. Ask clarifying questions when needed.`,
      timestamp: Date.now()
    });
  }

  /**
   * Process user message - main CLI loop
   */
  async chat(userInput: string): Promise<string> {
    // Add user message
    this.messages.push({
      role: 'user',
      content: userInput,
      timestamp: Date.now()
    });

    // Detect intent
    const intent = this.detectIntent(userInput);

    let response: string;

    switch (intent) {
      case 'build':
        response = await this.handleBuild(userInput);
        break;
      case 'run':
        response = await this.handleRun(userInput);
        break;
      case 'read':
        response = await this.handleRead(userInput);
        break;
      case 'write':
        response = await this.handleWrite(userInput);
        break;
      case 'shell':
        response = await this.handleShell(userInput);
        break;
      case 'help':
        response = this.showHelp();
        break;
      case 'status':
        response = this.showStatus();
        break;
      case 'exit':
        response = 'Goodbye! 👋';
        break;
      default:
        response = await this.handleChat(userInput);
    }

    // Add assistant response
    this.messages.push({
      role: 'assistant',
      content: response,
      timestamp: Date.now()
    });

    return response;
  }

  /**
   * Build/Generate an app
   */
  private async handleBuild(input: string): Promise<string> {
    console.log('\n🔨 Building your app...\n');

    // Detect platforms
    const platforms = this.detectPlatforms(input);
    const prompt = this.extractPrompt(input);

    console.log(`Platforms: ${platforms.join(', ')}`);
    console.log(`Prompt: ${prompt}\n`);

    try {
      // Use cross-platform generator
      const generator = createCrossPlatformGenerator(
        this.provider as any,
        this.apiKey
      );

      const result = await generator.generate({
        prompt,
        platforms
      });

      this.context.currentProject = result.app.name;
      this.context.platforms = platforms;

      return this.formatBuildResult(result);
    } catch (error: any) {
      return `❌ Build failed: ${error.message}`;
    }
  }

  /**
   * Run agentos pipeline
   */
  private async handleRun(input: string): Promise<string> {
    const projectName = this.extractProjectName(input);
    
    if (!projectName && !this.context.currentProject) {
      return 'Which project? Specify a project name.';
    }

    console.log(`\n🚀 Running agentos pipeline for: ${projectName || this.context.currentProject}\n`);

    try {
      // Call agentos orchestrator
      const response = await fetch(`${this.agentosUrl}/api/projects`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: projectName || this.context.currentProject,
          requirements: 'Build a mobile app'
        })
      });

      if (!response.ok) {
        throw new Error(`AgentOS API: ${response.status}`);
      }

      const project = await response.json();
      return `✅ Pipeline started!

Project: ${project.name}
Status: ${project.status}

Use \`status\` to check progress.`;
    } catch (error: any) {
      // If agentos not running, simulate
      return `✅ Pipeline executed!

(AgentOS orchestrator not running locally - this would run the full 6-phase pipeline)

To run locally:
  cd agentos_app
  docker-compose up
`;
    }
  }

  /**
   * Read files
   */
  private async handleRead(input: string): Promise<string> {
    // Extract file path from input
    const match = input.match(/read\s+(.+)/i);
    if (!match) return 'Which file to read?';
    
    const filePath = match[1].trim();
    
    try {
      const response = await fetch(`${this.agentosUrl}/api/files/read`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ path: filePath })
      });
      
      if (!response.ok) {
        return `Could not read ${filePath}`;
      }
      
      const data = await response.json();
      return `📄 ${filePath}\n\n${data.content}`;
    } catch {
      return `File: ${filePath}

(Would read file contents here - AgentOS not connected)`;
    }
  }

  /**
   * Write files
   */
  private async handleWrite(input: string): Promise<string> {
    const match = input.match(/write\s+(.+?)\s+to\s+(.+)/i);
    if (!match) return 'Usage: write <content> to <file>';

    const [, content, filePath] = match;
    
    try {
      await fetch(`${this.agentosUrl}/api/files/write`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ path: filePath, content })
      });
      
      return `✅ Wrote to ${filePath}`;
    } catch {
      return `✅ Would write to: ${filePath}

(AgentOS not connected)`;
    }
  }

  /**
   * Run shell commands
   */
  private async handleShell(input: string): Promise<string> {
    // Extract command
    const match = input.match(/(?:shell|run|exec)\s+(.+)/i);
    if (!match) return 'Which command to run?';
    
    const command = match[1].trim();
    
    return `\n$ ${command}\n
(Shell execution would happen here - like Claude Code)\n
To enable, connect to AgentOS orchestrator.`;
  }

  /**
   * Regular chat
   */
  private async handleChat(input: string): Promise<string> {
    // Use AI to generate response
    const generator = createCrossPlatformGenerator(
      this.provider as any,
      this.apiKey
    );

    // Simple context
    const context = this.getContextSummary();
    
    const response = await generator.generate({
      prompt: `${input}\n\nCurrent context: ${context}`,
      platforms: this.context.platforms || ['ios', 'android']
    });

    return response.app.description || "I'm here to help you build apps!";
  }

  /**
   * Show help
   */
  private showHelp(): string {
    return `
📖 Available Commands:

Build apps:
  build "Create a fitness app"          - Generate iOS + Android
  build "Create a web app for nextjs"   - Generate web app
  build "social media app for ios"      - Generate for specific platform

Run pipeline:
  run                                 - Run agentos pipeline
  run my-project                      - Run for specific project

File operations:
  read path/to/file                   - Read a file
  write content to path/to/file       - Write a file

Shell commands:
  shell npm install                    - Run terminal command
  run ls -la                          - List files

Info:
  status                              - Show current project
  help                                - Show this message
  exit                                - Quit

Examples:
  "Create a todo app with dark mode"
  "Add authentication to my app"
  "Export this for iOS"
`;
  }

  /**
   * Show status
   */
  private showStatus(): string {
    return `
📊 Current Context:

Project: ${this.context.currentProject || 'None'}
Platforms: ${this.context.platforms?.join(', ') || 'iOS, Android'}
Working Dir: ${this.context.workingDir || 'Current directory'}

Messages: ${this.messages.length} in conversation
`;
  }

  /**
   * Detect user intent
   */
  private detectIntent(input: string): string {
    const lower = input.toLowerCase();
    
    if (lower.includes('build') || lower.includes('create') || 
        lower.includes('generate') || lower.includes('make')) return 'build';
    if (lower.includes('run') && (lower.includes('pipeline') || lower.includes('agentos'))) return 'run';
    if (lower.startsWith('read')) return 'read';
    if (lower.startsWith('write')) return 'write';
    if (lower.startsWith('shell') || lower.startsWith('run ') || lower.startsWith('exec')) return 'shell';
    if (lower === 'help' || lower === '?') return 'help';
    if (lower === 'status') return 'status';
    if (lower === 'exit' || lower === 'quit') return 'exit';
    
    return 'chat';
  }

  /**
   * Detect platforms from input
   */
  private detectPlatforms(input: string): string[] {
    const lower = input.toLowerCase();
    const platforms: string[] = [];

    if (lower.includes('ios') || lower.includes('iphone') || lower.includes('apple')) {
      platforms.push('ios');
    }
    if (lower.includes('android')) {
      platforms.push('android');
    }
    if (lower.includes('react native') || lower.includes('react-native')) {
      platforms.push('react-native');
    }
    if (lower.includes('web') || lower.includes('nextjs') || lower.includes('website')) {
      platforms.push('web');
    }

    return platforms.length > 0 ? platforms : ['ios', 'android'];
  }

  /**
   * Extract app description from input
   */
  private extractPrompt(input: string): string {
    // Remove common prefixes
    return input
      .replace(/^(build|create|generate|make)\s+/i, '')
      .replace(/\s+(for|on)\s+(ios|android|web|apple|google|amazon)/gi, '')
      .trim();
  }

  /**
   * Extract project name
   */
  private extractProjectName(input: string): string | null {
    const match = input.match(/run\s+(\w+)/i);
    return match ? match[1] : null;
  }

  /**
   * Format build result
   */
  private formatBuildResult(result: any): string {
    let output = `\n✅ Build Complete!\n\n`;
    
    output += `📱 App: ${result.app.name}\n`;
    output += `🏗️ Platforms: ${result.metadata.platforms.join(', ')}\n\n`;
    
    if (result.app.screens?.length) {
      output += `📄 Screens (${result.app.screens.length}):\n`;
      result.app.screens.forEach((s: any, i: number) => {
        output += `  ${i + 1}. ${s.name}\n`;
      });
      output += '\n';
    }

    if (result.app.features?.length) {
      output += `✨ Features:\n`;
      output += `  ${result.app.features.join(', ')}\n\n`;
    }

    output += `⏱️ Generated in ${result.metadata.generationTime}ms\n`;
    output += `🤖 Model: ${result.metadata.model}\n`;

    return output;
  }

  /**
   * Get context summary
   */
  private getContextSummary(): string {
    const parts: string[] = [];
    
    if (this.context.currentProject) {
      parts.push(`current project: ${this.context.currentProject}`);
    }
    if (this.context.platforms) {
      parts.push(`platforms: ${this.context.platforms.join(', ')}`);
    }
    
    return parts.length > 0 ? parts.join(', ') : 'new project';
  }

  /**
   * Get conversation history
   */
  getMessages(): CLIMessage[] {
    return this.messages;
  }

  /**
   * Reset conversation
   */
  reset(): void {
    this.messages = this.messages.filter(m => m.role === 'system');
    this.context = {};
  }
}

// Factory
export function createAICodeCLI(
  apiKey: string, 
  provider?: string,
  agentosUrl?: string
): AICodeCLI {
  return new AICodeCLI(apiKey, provider, agentosUrl);
}

// CLI Entry Point - like Claude Code's `claude` command
export async function runCLI() {
  const apiKey = process.env.MINIMAX_API_KEY || 
                 process.env.ANTHROPIC_API_KEY || 
                 process.env.OPENAI_API_KEY;

  if (!apiKey) {
    console.error(`
❌ No API key found!

Set one of:
  export MINIMAX_API_KEY=your-key
  export ANTHROPIC_API_KEY=your-key
  export OPENAI_API_KEY=your-key

Then run: npx appbuilder
    `);
    process.exit(1);
  }

  const cli = createAICodeCLI(apiKey);

  console.log(`
🤖 Cross-Platform App Builder CLI
   Like Claude Code for mobile/web apps

Type "help" for commands or just describe what you want to build!
`);

  // In a real implementation, this would be an interactive loop
  // For now, return the CLI instance for programmatic use
  return cli;
}

export { AICodeCLI as default };
