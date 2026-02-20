/**
 * Cross-Platform Generator
 * Generates iOS, Android, and React Native apps from a single prompt
 */

import { 
  AppDefinition, 
  Platform, 
  PlatformOutput,
  GenerationRequest,
  GenerationResponse,
  AIProvider,
  AIResponse,
  PlatformCodeMap
} from '@/types/app';

// Prompt templates for each platform
const IOS_PROMPT_TEMPLATE = `
You are an expert iOS developer. Generate a complete SwiftUI application based on the following requirements:

APP REQUIREMENTS:
{requirements}

Generate a JSON response with the app definition including:
1. App name and description
2. Screen structure (at least 3-5 screens)
3. UI Components (use SwiftUI: VStack, HStack, List, Button, TextField, etc.)
4. Navigation (NavigationStack, TabView)
5. Data models if needed
6. Theme colors and styling

Respond with valid JSON only.
`;

const ANDROID_PROMPT_TEMPLATE = `
You are an expert Android developer. Generate a complete Jetpack Compose application based on the following requirements:

APP REQUIREMENTS:
{requirements}

Generate a JSON response with the app definition including:
1. App name and description
2. Screen structure (at least 3-5 screens)
3. UI Components (use Compose: Column, Row, LazyColumn, Button, TextField, etc.)
4. Navigation (NavHost, BottomNav)
5. Data models if needed
6. Theme colors and styling

Respond with valid JSON only.
`;

const REACT_NATIVE_PROMPT_TEMPLATE = `
You are an expert React Native developer. Generate a complete Expo application based on the following requirements:

APP REQUIREMENTS:
{requirements}

Generate a JSON response with the app definition including:
1. App name and description
2. Screen structure (at least 3-5 screens)
3. UI Components (use React Native: View, Text, TextInput, TouchableOpacity, etc.)
4. Navigation (React Navigation: Stack, Tabs)
5. Data models if needed
6. Theme colors and styling

Respond with valid JSON only.
`;

export class CrossPlatformGenerator {
  private provider: AIProvider;
  private apiKey: string;
  private model: string;

  constructor(provider: AIProvider, apiKey: string, model?: string) {
    this.provider = provider;
    this.apiKey = apiKey;
    this.model = model || 'default';
  }

  async generate(request: GenerationRequest): Promise<GenerationResponse> {
    const startTime = Date.now();
    const platforms = request.platforms;
    
    console.log(`🎯 Generating app for platforms: ${platforms.join(', ')}`);

    // Generate app definition (single source of truth)
    const appDefinition = await this.generateAppDefinition(request.prompt, request.template);

    // Generate code for each selected platform
    const code: PlatformCodeMap = {};
    const tokensPerPlatform: { [key: string]: number } = {};

    // Generate iOS code if requested
    if (platforms.includes('ios')) {
      console.log('📱 Generating iOS code...');
      const iosCode = await this.generateIOSCode(appDefinition);
      code.ios = iosCode.content;
      tokensPerPlatform['ios'] = iosCode.usage?.totalTokens || 0;
    }

    // Generate Android code if requested
    if (platforms.includes('android')) {
      console.log('🤖 Generating Android code...');
      const androidCode = await this.generateAndroidCode(appDefinition);
      code.android = androidCode.content;
      tokensPerPlatform['android'] = androidCode.usage?.totalTokens || 0;
    }

    // Generate React Native code if requested
    if (platforms.includes('react-native')) {
      console.log('⚛️ Generating React Native code...');
      const rnCode = await this.generateReactNativeCode(appDefinition);
      code['react-native'] = rnCode.content;
      tokensPerPlatform['react-native'] = rnCode.usage?.totalTokens || 0;
    }

    // Generate Web code if requested
    if (platforms.includes('web')) {
      console.log('🌐 Generating Web code...');
      const webCode = await this.generateWebCode(appDefinition);
      code.web = webCode.content;
      tokensPerPlatform['web'] = webCode.usage?.totalTokens || 0;
    }

    const totalTokens = Object.values(tokensPerPlatform).reduce((a, b) => a + b, 0);
    const generationTime = Date.now() - startTime;

    return {
      app: appDefinition,
      code,
      metadata: {
        provider: this.provider,
        model: this.model,
        tokensUsed: totalTokens,
        generationTime,
        platforms
      }
    };
  }

  private async generateAppDefinition(prompt: string, template?: string): Promise<AppDefinition> {
    // If template is specified, use template-based generation
    if (template) {
      return this.generateFromTemplate(template);
    }

    // Otherwise, generate from prompt
    const systemPrompt = `
You are an expert mobile app architect. Create a comprehensive app definition in JSON format.

The JSON should follow this structure:
{
  "id": "unique-app-id",
  "name": "App Name",
  "description": "Brief description",
  "platforms": ["ios", "android", "react-native"],
  "screens": [
    {
      "id": "screen-id",
      "name": "ScreenName",
      "components": [
        {
          "id": "component-id",
          "type": "ComponentType",
          "props": {}
        }
      ]
    }
  ],
  "navigation": {
    "type": "stack|tab|split",
    "structure": []
  },
  "theme": {
    "colors": {
      "primary": "#007AFF",
      "secondary": "#5856D6",
      "background": "#FFFFFF",
      "text": "#000000"
    }
  },
  "dataModels": [],
  "features": []
}

Respond with ONLY valid JSON, no additional text.
    `;

    const response = await this.callAI(prompt, systemPrompt);
    return JSON.parse(response.content);
  }

  private async generateFromTemplate(templateId: string): Promise<AppDefinition> {
    // Load template and generate app definition
    const templates = await this.loadTemplates();
    const template = templates.find(t => t.id === templateId);
    
    if (!template) {
      throw new Error(`Template not found: ${templateId}`);
    }

    const prompt = `Create a ${template.name} app with: ${template.features.join(', ')}`;
    return this.generateAppDefinition(prompt);
  }

  private async generateIOSCode(app: AppDefinition): Promise<AIResponse> {
    const prompt = `
Generate a complete SwiftUI iOS application.

APP DEFINITION:
${JSON.stringify(app, null, 2)}

Requirements:
1. Use SwiftUI with @Observable or @StateObject
2. Implement all screens with proper navigation
3. Use proper SwiftUI components
4. Include data models if defined
5. Add proper error handling
6. Follow iOS Human Interface Guidelines

Generate the complete source code in a single response. Include:
- App entry point
- All screen views
- ViewModels if needed
- Models
- Services
- Extensions
    `;

    return this.callAI(prompt, IOS_PROMPT_TEMPLATE.replace('{requirements}', prompt));
  }

  private async generateAndroidCode(app: AppDefinition): Promise<AIResponse> {
    const prompt = `
Generate a complete Jetpack Compose Android application.

APP DEFINITION:
${JSON.stringify(app, null, 2)}

Requirements:
1. Use Jetpack Compose with Material 3
2. Implement all screens with proper navigation using NavHost
3. Use proper Compose components
4. Include data models with Kotlin data classes
5. Add proper error handling
6. Follow Material Design 3 guidelines

Generate the complete source code in a single response. Include:
- MainActivity and Application class
- All screen composables
- ViewModels if needed
- Data models
- Repository pattern
- Navigation setup
    `;

    return this.callAI(prompt, ANDROID_PROMPT_TEMPLATE.replace('{requirements}', prompt));
  }

  private async generateReactNativeCode(app: AppDefinition): Promise<AIResponse> {
    const prompt = `
Generate a complete React Native Expo application.

APP DEFINITION:
${JSON.stringify(app, null, 2)}

Requirements:
1. Use React Native with Expo
2. Implement all screens with React Navigation
3. Use proper React Native components
4. Include TypeScript interfaces
5. Add proper error handling
6. Follow React Native best practices

Generate the complete source code in a single response. Include:
- App.tsx entry point
- All screen components
- Navigation setup
- TypeScript interfaces
- Theme configuration
    `;

    return this.callAI(prompt, REACT_NATIVE_PROMPT_TEMPLATE.replace('{requirements}', prompt));
  }

  private async generateWebCode(app: AppDefinition): Promise<AIResponse> {
    // For web, we can use similar to React Native but with web-specific components
    return this.generateReactNativeCode(app); // Reuse for now
  }

  private async callAI(prompt: string, systemPrompt?: string): Promise<AIResponse> {
    // This would integrate with actual AI providers
    // For now, return a placeholder
    
    switch (this.provider) {
      case 'claude':
        return this.callClaude(prompt, systemPrompt);
      case 'openai':
        return this.callOpenAI(prompt, systemPrompt);
      case 'gemini':
        return this.callGemini(prompt, systemPrompt);
      case 'minimax':
        return this.callMiniMax(prompt, systemPrompt);
      case 'zhipu':
        return this.callZhipu(prompt, systemPrompt);
      default:
        throw new Error(`Unsupported provider: ${this.provider}`);
    }
  }

  private async callClaude(prompt: string, systemPrompt?: string): Promise<AIResponse> {
    const response = await fetch('https://api.anthropic.com/v1/messages', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'x-api-key': this.apiKey,
        'anthropic-version': '2023-06-01'
      },
      body: JSON.stringify({
        model: this.model || 'claude-sonnet-4-5',
        max_tokens: 8192,
        system: systemPrompt || 'You are an expert mobile app developer.',
        messages: [{ role: 'user', content: prompt }]
      })
    });

    const data = await response.json();
    return {
      content: data.content?.[0]?.text || '',
      usage: {
        promptTokens: data.usage?.input_tokens || 0,
        completionTokens: data.usage?.output_tokens || 0,
        totalTokens: data.usage?.input_tokens + data.usage?.output_tokens || 0
      },
      model: this.model || 'claude-sonnet-4-5'
    };
  }

  private async callOpenAI(prompt: string, systemPrompt?: string): Promise<AIResponse> {
    const response = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${this.apiKey}`
      },
      body: JSON.stringify({
        model: this.model || 'gpt-4o',
        messages: [
          { role: 'system', content: systemPrompt || 'You are an expert mobile app developer.' },
          { role: 'user', content: prompt }
        ],
        max_tokens: 8192
      })
    });

    const data = await response.json();
    return {
      content: data.choices?.[0]?.message?.content || '',
      usage: {
        promptTokens: data.usage?.prompt_tokens || 0,
        completionTokens: data.usage?.completion_tokens || 0,
        totalTokens: data.usage?.total_tokens || 0
      },
      model: this.model || 'gpt-4o'
    };
  }

  private async callGemini(prompt: string, systemPrompt?: string): Promise<AIResponse> {
    const response = await fetch(
      `https://generativelanguage.googleapis.com/v1beta/models/${this.model || 'gemini-2.0-flash'}:generateContent?key=${this.apiKey}`,
      {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          contents: [{ parts: [{ text: prompt }] }],
          systemInstruction: systemPrompt ? { parts: [{ text: systemPrompt }] } : undefined,
          generationConfig: { temperature: 0.7, maxOutputTokens: 8192 }
        })
      }
    );

    const data = await response.json();
    return {
      content: data.candidates?.[0]?.content?.parts?.[0]?.text || '',
      model: this.model || 'gemini-2.0-flash'
    };
  }

  private async callMiniMax(prompt: string, systemPrompt?: string): Promise<AIResponse> {
    const response = await fetch('https://api.minimax.chat/v1/text/chatcompletion_pro', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${this.apiKey}`
      },
      body: JSON.stringify({
        model: this.model || 'abab6.5s',
        messages: [
          { role: 'system', content: systemPrompt || 'You are an expert mobile app developer.' },
          { role: 'user', content: prompt }
        ]
      })
    });

    const data = await response.json();
    return {
      content: data.choices?.[0]?.message?.content || '',
      model: this.model || 'abab6.5s'
    };
  }

  private async callZhipu(prompt: string, systemPrompt?: string): Promise<AIResponse> {
    const response = await fetch('https://open.bigmodel.cn/api/paas/v4/chat/completions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${this.apiKey}`
      },
      body: JSON.stringify({
        model: this.model || 'glm-4',
        messages: [
          { role: 'system', content: systemPrompt || 'You are an expert mobile app developer.' },
          { role: 'user', content: prompt }
        ]
      })
    });

    const data = await response.json();
    return {
      content: data.choices?.[0]?.message?.content || '',
      model: this.model || 'glm-4'
    };
  }

  private async loadTemplates(): Promise<any[]> {
    // Load templates from the templates module
    // This would be imported in actual implementation
    return [];
  }
}

// Factory function
export function createCrossPlatformGenerator(
  provider: AIProvider, 
  apiKey: string, 
  model?: string
): CrossPlatformGenerator {
  return new CrossPlatformGenerator(provider, apiKey, model);
}
