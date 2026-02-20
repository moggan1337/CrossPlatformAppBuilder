/**
 * Cross-Platform Generator
 * Generates iOS, Android, React Native, and Web apps from a single prompt
 */

import { 
  AppDefinition, 
  Platform, 
  GenerationRequest,
  GenerationResponse,
  AIProvider,
  PlatformCodeMap
} from '@/types/app';
import { createWebGenerator, WEB_STACKS } from './web-generator';

// Prompt templates for each platform
const IOS_PROMPT_TEMPLATE = `You are an expert iOS developer. Generate a complete SwiftUI application.`;
const ANDROID_PROMPT_TEMPLATE = `You are an expert Android developer. Generate a complete Jetpack Compose Android application.`;
const REACT_NATIVE_PROMPT_TEMPLATE = `You are an expert React Native developer. Generate a complete Expo application.`;
const WEB_PROMPT_TEMPLATE = `You are an expert full-stack web developer. Generate a complete web application.`;

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

    // Generate iOS code if requested
    if (platforms.includes('ios')) {
      console.log('📱 Generating iOS code...');
      code.ios = await this.generateIOSCode(appDefinition);
    }

    // Generate Android code if requested
    if (platforms.includes('android')) {
      console.log('🤖 Generating Android code...');
      code.android = await this.generateAndroidCode(appDefinition);
    }

    // Generate React Native code if requested
    if (platforms.includes('react-native')) {
      console.log('⚛️ Generating React Native code...');
      code['react-native'] = await this.generateReactNativeCode(appDefinition);
    }

    // Generate Web code if requested
    if (platforms.includes('web')) {
      console.log('🌐 Generating Web code...');
      const webResult = await this.generateWebCode(request.prompt, request.settings?.webStack || 'nextjs');
      code.web = webResult;
    }

    const generationTime = Date.now() - startTime;

    return {
      app: appDefinition,
      code,
      metadata: {
        provider: this.provider,
        model: this.model,
        tokensUsed: 0,
        generationTime,
        platforms
      }
    };
  }

  private async generateAppDefinition(prompt: string, template?: string): Promise<AppDefinition> {
    if (template) {
      return this.generateFromTemplate(template);
    }

    const systemPrompt = `
You are an expert mobile app architect. Create a comprehensive app definition in JSON format.
Respond with ONLY valid JSON.
    `;

    const response = await this.callAI(prompt, systemPrompt);
    try {
      return JSON.parse(response.content);
    } catch {
      return {
        id: 'app-' + Date.now(),
        name: 'Generated App',
        description: prompt,
        platforms: ['ios', 'android'],
        screens: [],
        navigation: { type: 'stack', structure: [] },
        theme: { colors: { primary: '#007AFF', secondary: '#5856D6', background: '#FFFFFF', text: '#000000' }, typography: { sizes: {} }, spacing: {} },
        dataModels: [],
        globalState: [],
        features: [],
        permissions: []
      };
    }
  }

  private async generateFromTemplate(templateId: string): Promise<AppDefinition> {
    return {
      id: templateId,
      name: 'Template App',
      description: 'Generated from template',
      platforms: ['ios', 'android'],
      screens: [],
      navigation: { type: 'stack', structure: [] },
      theme: { colors: { primary: '#007AFF', secondary: '#5856D6', background: '#FFFFFF', text: '#000000' }, typography: { sizes: {} }, spacing: {} },
      dataModels: [],
      globalState: [],
      features: [],
      permissions: []
    };
  }

  private async generateIOSCode(app: AppDefinition): Promise<string> {
    return `// SwiftUI iOS App\n// Generated for: ${app.name}\n\nimport SwiftUI\n\n@main\nstruct ${app.name.replace(/\s/g, '')}App: App {\n    var body: some Scene {\n        WindowGroup {\n            ContentView()\n        }\n    }\n}\n\nstruct ContentView: View {\n    var body: some View {\n        Text("${app.name}")\n    }\n}`;
  }

  private async generateAndroidCode(app: AppDefinition): Promise<string> {
    return `// Jetpack Compose Android App\n// Generated for: ${app.name}\n\npackage com.example.${app.name.toLowerCase().replace(/\s/g, '')}\n\nimport androidx.compose.material3.*\nimport android.os.Bundle\nimport androidx.activity.ComponentActivity\nimport androidx.activity.compose.setContent\n\nclass MainActivity : ComponentActivity() {\n    override fun onCreate(savedInstanceState: Bundle?) {\n        super.onCreate(savedInstanceState)\n        setContent {\n            ${app.name.replace(/\s/g, '')}Theme {\n                Text("${app.name}")\n            }\n        }\n    }\n}`;
  }

  private async generateReactNativeCode(app: AppDefinition): Promise<string> {
    return `// React Native Expo App\n// Generated for: ${app.name}\n\nimport React from 'react';\nimport { View, Text } from 'react-native';\n\nexport default function App() {\n  return (\n    <View>\n      <Text>${app.name}</Text>\n    </View>\n  );\n}`;
  }

  private async generateWebCode(prompt: string, stack: string): Promise<string> {
    const webGen = createWebGenerator(this.provider as any, this.apiKey);
    const result = await webGen.generate(prompt, stack as any);
    return JSON.stringify(result, null, 2);
  }

  private async callAI(prompt: string, systemPrompt: string): Promise<any> {
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
        return this.callMiniMax(prompt, systemPrompt);
    }
  }

  private async callClaude(prompt: string, systemPrompt: string): Promise<any> {
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
        system: systemPrompt,
        messages: [{ role: 'user', content: prompt }]
      })
    });
    const data = await response.json();
    return { content: data.content?.[0]?.text || '' };
  }

  private async callOpenAI(prompt: string, systemPrompt: string): Promise<any> {
    const response = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${this.apiKey}`
      },
      body: JSON.stringify({
        model: this.model || 'gpt-4o',
        messages: [
          { role: 'system', content: systemPrompt },
          { role: 'user', content: prompt }
        ]
      })
    });
    const data = await response.json();
    return { content: data.choices?.[0]?.message?.content || '' };
  }

  private async callGemini(prompt: string, systemPrompt: string): Promise<any> {
    const response = await fetch(
      `https://generativelanguage.googleapis.com/v1beta/models/${this.model || 'gemini-2.0-flash'}:generateContent?key=${this.apiKey}`,
      {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          contents: [{ parts: [{ text: prompt }] }],
          systemInstruction: { parts: [{ text: systemPrompt }] },
          generationConfig: { temperature: 0.7, maxOutputTokens: 8192 }
        })
      }
    );
    const data = await response.json();
    return { content: data.candidates?.[0]?.content?.parts?.[0]?.text || '' };
  }

  private async callMiniMax(prompt: string, systemPrompt: string): Promise<any> {
    const response = await fetch('https://api.minimax.chat/v1/text/chatcompletion_pro', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${this.apiKey}`
      },
      body: JSON.stringify({
        model: 'abab6.5s',
        messages: [
          { role: 'system', content: systemPrompt },
          { role: 'user', content: prompt }
        ]
      })
    });
    const data = await response.json();
    return { content: data.choices?.[0]?.message?.content || '' };
  }

  private async callZhipu(prompt: string, systemPrompt: string): Promise<any> {
    const response = await fetch('https://open.bigmodel.cn/api/paas/v4/chat/completions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${this.apiKey}`
      },
      body: JSON.stringify({
        model: 'glm-4',
        messages: [
          { role: 'system', content: systemPrompt },
          { role: 'user', content: prompt }
        ]
      })
    });
    const data = await response.json();
    return { content: data.choices?.[0]?.message?.content || '' };
  }

  // Expose web stacks
  getWebStacks() {
    return WEB_STACKS;
  }
}

export function createCrossPlatformGenerator(
  provider: AIProvider, 
  apiKey: string, 
  model?: string
): CrossPlatformGenerator {
  return new CrossPlatformGenerator(provider, apiKey, model);
}

// Re-export for convenience
export { WEB_STACKS };
