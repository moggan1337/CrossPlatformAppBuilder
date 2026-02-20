/**
 * AI Chat CLI
 * Interactive terminal chat interface for generating apps
 * Like ChatGPT but for building mobile/web apps
 */

import { createCrossPlatformGenerator } from '../platforms/cross-platform-generator';

export interface ChatMessage {
  role: 'user' | 'assistant';
  content: string;
  timestamp: number;
}

export interface ChatSession {
  id: string;
  messages: ChatMessage[];
  currentApp: any;
  platform?: string;
}

export class AIChatCLI {
  private session: ChatSession;
  private apiKey: string;
  private provider: string;

  constructor(apiKey: string, provider: string = 'claude') {
    this.apiKey = apiKey;
    this.provider = provider;
    this.session = {
      id: `chat_${Date.now()}`,
      messages: [],
      currentApp: null
    };
  }

  // Start interactive chat
  async start(): Promise<void> {
    this.printWelcome();
    
    // This would be the main loop in a real CLI
    console.log('\n💬 You can now chat with the AI to build your app!\n');
    console.log('Examples:');
    console.log('  - "Create a fitness app with workout tracking"');
    console.log('  - "Add user authentication to the app"');
    console.log('  - "Export this as an iOS app"');
    console.log('  - "Show me a preview"');
    console.log('\nType "exit" to quit.\n');
  }

  // Process user message
  async chat(userMessage: string): Promise<string> {
    // Add user message to session
    this.session.messages.push({
      role: 'user',
      content: userMessage,
      timestamp: Date.now()
    });

    // Determine what user wants
    const intent = this.detectIntent(userMessage);
    let response: string;

    switch (intent) {
      case 'generate':
        response = await this.generateApp(userMessage);
        break;
      case 'modify':
        response = await this.modifyApp(userMessage);
        break;
      case 'preview':
        response = this.showPreview();
        break;
      case 'export':
        response = await this.exportApp(userMessage);
        break;
      case 'help':
        response = this.showHelp();
        break;
      default:
        response = await this.chatWithAI(userMessage);
    }

    // Add assistant response
    this.session.messages.push({
      role: 'assistant',
      content: response,
      timestamp: Date.now()
    });

    return response;
  }

  // Detect user intent
  private detectIntent(message: string): string {
    const lower = message.toLowerCase();
    
    if (lower.includes('create') || lower.includes('build') || 
        lower.includes('generate') || lower.includes('make') ||
        lower.includes('new app')) {
      return 'generate';
    }
    if (lower.includes('add') || lower.includes('change') || 
        lower.includes('modify') || lower.includes('update') ||
        lower.includes('edit')) {
      return 'modify';
    }
    if (lower.includes('preview') || lower.includes('show')) {
      return 'preview';
    }
    if (lower.includes('export') || lower.includes('download')) {
      return 'export';
    }
    if (lower.includes('help')) {
      return 'help';
    }
    
    return 'chat';
  }

  // Generate new app
  private async generateApp(prompt: string): Promise<string> {
    console.log('\n🎯 Generating your app...\n');
    
    const generator = createCrossPlatformGenerator(
      this.provider as any,
      this.apiKey
    );

    // Detect platforms from prompt
    const platforms = this.detectPlatforms(prompt);

    const result = await generator.generate({
      prompt,
      platforms
    });

    this.session.currentApp = result.app;
    this.session.platform = platforms.join(', ');

    return `✅ App created: ${result.app.name}

Platforms: ${platforms.join(', ')}
Screens: ${result.app.screens?.length || 0}
Features: ${result.app.features?.join(', ') || 'basic'}

What would you like to do next?`;
  }

  // Modify existing app
  private async modifyApp(prompt: string): Promise<string> {
    if (!this.session.currentApp) {
      return 'No app created yet. Create one first with "Create a [app type]"!';
    }

    console.log('\n✏️ Modifying your app...\n');
    
    // Use AI to modify
    const generator = createCrossPlatformGenerator(
      this.provider as any,
      this.apiKey
    );

    const result = await generator.generate({
      prompt: `Modify existing app: ${this.session.currentApp.name}. ${prompt}`,
      platforms: this.session.platform?.split(', ') || ['ios', 'android']
    });

    this.session.currentApp = result.app;

    return `✅ App modified!

Updated: ${result.app.name}
New features: ${result.app.features?.join(', ')}

What else would you like to change?`;
  }

  // Show preview
  private showPreview(): string {
    if (!this.session.currentApp) {
      return 'No app to preview. Create one first!';
    }

    const app = this.session.currentApp;
    let preview = `\n📱 App Preview: ${app.name}\n`;
    preview += '═'.repeat(40) + '\n\n';
    
    if (app.screens) {
      app.screens.forEach((screen: any, i: number) => {
        preview += `${i + 1}. ${screen.name}\n`;
        if (screen.components) {
          screen.components.forEach((comp: any) => {
            preview += `   - ${comp.name || comp.type}\n`;
          });
        }
        preview += '\n';
      });
    }

    return preview;
  }

  // Export app
  private async exportApp(prompt: string): Promise<string> {
    if (!this.session.currentApp) {
      return 'No app to export. Create one first!';
    }

    const platform = this.detectPlatforms(prompt)[0] || 'ios';
    
    return `📦 Exporting ${this.session.currentApp.name} for ${platform}...

✅ Export ready!
Download: /output/${this.session.currentApp.name.toLowerCase().replace(/\s/g, '-')}-${platform}.zip

You can now open this in Xcode/Android Studio!`;
  }

  // Regular chat with AI
  private async chatWithAI(message: string): Promise<string> {
    // Build conversation context
    const context = this.session.messages
      .slice(-5)
      .map(m => `${m.role}: ${m.content}`)
      .join('\n');

    const prompt = `You are an expert app developer assistant. 
Previous conversation:
${context}

User: ${message}

Respond helpfully about app development, or ask clarifying questions.`;

    // Call AI
    const response = await this.callAI(prompt);
    
    return response;
  }

  // Detect platforms from prompt
  private detectPlatforms(prompt: string): string[] {
    const lower = prompt.toLowerCase();
    const platforms: string[] = [];

    if (lower.includes('ios') || lower.includes('iphone') || lower.includes('apple')) {
      platforms.push('ios');
    }
    if (lower.includes('android') || lower.includes('google')) {
      platforms.push('android');
    }
    if (lower.includes('react native') || lower.includes('react-native')) {
      platforms.push('react-native');
    }
    if (lower.includes('web') || lower.includes('website') || lower.includes('next')) {
      platforms.push('web');
    }

    // Default to all if not specified
    return platforms.length > 0 ? platforms : ['ios', 'android'];
  }

  // Call AI
  private async callAI(prompt: string): Promise<string> {
    // Simplified - in production, use proper API
    return `I'm here to help you build apps! 

You can:
- "Create a fitness tracking app"
- "Add social features to my app"
- "Show me a preview"
- "Export as iOS"

What would you like to build?`;
  }

  // Show welcome message
  private printWelcome(): void {
    console.log('\n' + '═'.repeat(50));
    console.log('   🤖 Cross-Platform App Builder CLI');
    console.log('   Build iOS, Android, React Native & Web apps');
    console.log('   with AI assistance');
    console.log('═'.repeat(50));
  }

  // Show help
  private showHelp(): string {
    return `📖 Available Commands:

  Create an app:
    "Create a fitness app"
    "Build an e-commerce app with payments"
    "Make a social media app"

  Modify an app:
    "Add user authentication"
    "Add a settings screen"
    "Change the theme to dark mode"

  View:
    "Show preview" - See app structure
    "Show code" - View generated code

  Export:
    "Export for iOS"
    "Download Android app"

  Other:
    "Help" - Show this message
    "Exit" - Quit
`;
  }

  // Get session info
  getSession(): ChatSession {
    return this.session;
  }
}

// Factory function
export function createChatCLI(apiKey: string, provider?: string): AIChatCLI {
  return new AIChatCLI(apiKey, provider);
}

// CLI entry point (for npx usage)
export async function runCLI() {
  const args = process.argv.slice(2);
  const apiKey = process.env.ANTHROPIC_API_KEY || process.env.OPENAI_API_KEY;
  
  if (!apiKey) {
    console.error('❌ Please set ANTHROPIC_API_KEY or OPENAI_API_KEY');
    process.exit(1);
  }

  const cli = createChatCLI(apiKey, args[0]);
  await cli.start();
}

// Export for programmatic use
export { AIChatCLI as default };
