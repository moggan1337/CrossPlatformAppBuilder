/**
 * Web App Generator
 * Uses AI-powered pipeline to generate full-stack web applications
 * Based on Agentos architecture - 6 phase pipeline
 */

import { AppDefinition, AIResponse } from '@/types/app';

// Web technology stacks
const WEB_STACKS = {
  'nextjs': {
    name: 'Next.js',
    framework: 'Next.js 14 App Router',
    language: 'TypeScript',
    styling: 'Tailwind CSS',
    database: 'PostgreSQL / Prisma',
    auth: 'NextAuth.js',
    deployment: 'Vercel'
  },
  'fastapi': {
    name: 'FastAPI',
    framework: 'FastAPI',
    language: 'Python',
    styling: 'Tailwind CSS',
    database: 'PostgreSQL / SQLAlchemy',
    auth: 'JWT',
    deployment: 'Docker / Railway'
  },
  'react-express': {
    name: 'React + Express',
    framework: 'React + Express',
    language: 'TypeScript',
    styling: 'Tailwind CSS',
    database: 'MongoDB / PostgreSQL',
    auth: 'JWT',
    deployment: 'Vercel + Render'
  },
  'vue': {
    name: 'Vue 3 + Nuxt',
    framework: 'Nuxt 3',
    language: 'TypeScript',
    styling: 'Tailwind CSS',
    database: 'PostgreSQL / Prisma',
    auth: 'NuxtAuth',
    deployment: 'Vercel'
  }
};

// Prompt template for web apps
const WEB_PROMPT_TEMPLATE = `
You are an expert full-stack web developer. Generate a complete web application based on the following requirements:

APP REQUIREMENTS:
{requirements}

TECH STACK:
{stack}

Generate a detailed specification including:
1. Project structure
2. Database schema (if needed)
3. API endpoints (if backend)
4. Frontend pages and components
5. Authentication flow
6. State management

Respond with valid JSON in this format:
{
  "name": "AppName",
  "description": "...",
  "stack": "nextjs|fastapi|react-express|vue",
  "pages": ["page1", "page2"],
  "components": ["Component1", "Component2"],
  "apiEndpoints": ["/api/endpoint1", "/api/endpoint2"],
  "database": { "tables": [] },
  "features": ["auth", "crud", "realtime"]
}

Respond with ONLY valid JSON, no additional text.
`;

/**
 * Web App Generator using AI Pipeline
 */
export class WebGenerator {
  private apiKey: string;
  private provider: 'minimax' | 'openai' | 'claude' | 'gemini' | 'zhipu';

  constructor(provider: string, apiKey: string) {
    this.provider = provider as any;
    this.apiKey = apiKey;
  }

  /**
   * Generate a complete web application
   */
  async generate(
    prompt: string,
    stack: keyof typeof WEB_STACKS = 'nextjs'
  ): Promise<{
    specification: any;
    code: {
      frontend?: string;
      backend?: string;
      config?: string;
    };
    files: string[];
  }> {
    console.log(`🌐 Generating ${WEB_STACKS[stack].name} web application...`);

    // Phase 1: Generate specification
    const spec = await this.generateSpec(prompt, stack);

    // Phase 2-5: Generate code based on stack
    const code = await this.generateCode(spec, stack);

    // Phase 6: List all files
    const files = this.listFiles(spec, stack);

    return {
      specification: spec,
      code,
      files
    };
  }

  /**
   * Phase 1: Generate application specification
   */
  private async generateSpec(prompt: string, stack: string): Promise<any> {
    const systemPrompt = WEB_PROMPT_TEMPLATE
      .replace('{requirements}', prompt)
      .replace('{stack}', JSON.stringify(WEB_STACKS[stack as keyof typeof WEB_STACKS], null, 2));

    const response = await this.callAI(prompt, systemPrompt);
    
    try {
      // Try to extract JSON from response
      const jsonMatch = response.content.match(/\{[\s\S]*\}/);
      if (jsonMatch) {
        return JSON.parse(jsonMatch[0]);
      }
      return JSON.parse(response.content);
    } catch {
      // Return default spec if parsing fails
      return {
        name: 'WebApp',
        description: prompt,
        stack,
        pages: ['Home', 'About', 'Contact'],
        components: ['Navbar', 'Footer', 'Button'],
        apiEndpoints: [],
        features: ['responsive']
      };
    }
  }

  /**
   * Phase 2-5: Generate code for each stack
   */
  private async generateCode(spec: any, stack: string): Promise<any> {
    const code: any = {};

    switch (stack) {
      case 'nextjs':
        code.frontend = await this.generateNextJS(spec);
        code.config = this.generateNextJSConfig(spec);
        break;
      case 'fastapi':
        code.backend = await this.generateFastAPI(spec);
        code.config = this.generateFastAPIConfig();
        break;
      case 'react-express':
        code.frontend = await this.generateReact(spec);
        code.backend = await this.generateExpress(spec);
        break;
      case 'vue':
        code.frontend = await this.generateVue(spec);
        code.config = this.generateVueConfig();
        break;
    }

    return code;
  }

  /**
   * Generate Next.js code
   */
  private async generateNextJS(spec: any): Promise<string> {
    const pages = spec.pages || ['Home'];
    const components = spec.components || ['Button'];

    let code = `# Next.js ${spec.name || 'WebApp'}\n\n`;
    code += `## Pages\n`;
    pages.forEach((page: string) => {
      code += `- app/${page.toLowerCase()}/page.tsx\n`;
    });

    code += `\n## Components\n`;
    components.forEach((comp: string) => {
      code += `- components/${comp}.tsx\n`;
    });

    return code;
  }

  /**
   * Generate FastAPI code
   */
  private async generateFastAPI(spec: any): Promise<string> {
    let code = `# FastAPI ${spec.name || 'WebApp'}\n\n`;
    
    if (spec.apiEndpoints?.length > 0) {
      code += `## API Endpoints\n`;
      spec.apiEndpoints.forEach((endpoint: string) => {
        code += `- ${endpoint}\n`;
      });
    }

    if (spec.database?.tables?.length > 0) {
      code += `\n## Database Models\n`;
      spec.database.tables.forEach((table: any) => {
        code += `- ${table.name}: ${table.fields?.map((f: any) => f.name).join(', ')}\n`;
      });
    }

    return code;
  }

  /**
   * Generate React + Express code
   */
  private async generateReact(spec: any): Promise<string> {
    return `# React Frontend for ${spec.name}\n- Pages: ${spec.pages?.join(', ')}\n- Components: ${spec.components?.join(', ')}`;
  }

  private async generateExpress(spec: any): Promise<string> {
    return `# Express Backend for ${spec.name}\n- API: ${spec.apiEndpoints?.join(', ')}`;
  }

  /**
   * Generate Vue code
   */
  private async generateVue(spec: any): Promise<string> {
    return `# Vue 3 / Nuxt App for ${spec.name}\n- Pages: ${spec.pages?.join(', ')}\n- Components: ${spec.components?.join(', ')}`;
  }

  /**
   * Generate configuration files
   */
  private generateNextJSConfig(spec: any): string {
    return JSON.stringify({
      name: spec.name?.toLowerCase().replace(/\s+/g, '-'),
      version: '0.1.0',
      private: true,
      scripts: {
        dev: 'next dev',
        build: 'next build',
        start: 'next start',
        lint: 'next lint'
      },
      dependencies: {
        react: '^18',
        'react-dom': '^18',
        next: '^14',
        tailwindcss: '^3.4'
      }
    }, null, 2);
  }

  private generateFastAPIConfig(): string {
    return JSON.stringify({
      python_version: '3.11',
      dependencies: [
        'fastapi',
        'uvicorn',
        'sqlalchemy',
        'pydantic',
        'python-jose',
        'passlib'
      ]
    }, null, 2);
  }

  private generateVueConfig(): string {
    return JSON.stringify({
      name: 'nuxt-app',
      scripts: {
        dev: 'nuxt dev',
        build: 'nuxt build',
        generate: 'nuxt generate'
      },
      dependencies: {
        nuxt: '^3',
        vue: '^3',
        '@nuxtjs/tailwindcss': '^6'
      }
    }, null, 2);
  }

  /**
   * List all files to be generated
   */
  private listFiles(spec: any, stack: string): string[] {
    const files: string[] = [];
    const pages = spec.pages || ['Home'];
    const components = spec.components || ['Button'];

    if (stack === 'nextjs' || stack === 'vue') {
      pages.forEach((page: string) => {
        files.push(`app/${page.toLowerCase()}/page.tsx`);
      });
      components.forEach((comp: string) => {
        files.push(`components/${comp}.tsx`);
      });
      files.push('package.json');
      files.push('tailwind.config.js');
      if (stack === 'nextjs') files.push('next.config.js');
    } else if (stack === 'fastapi') {
      files.push('main.py');
      files.push('requirements.txt');
      files.push('models.py');
      files.push('schemas.py');
      files.push('crud.py');
      files.push('database.py');
    } else if (stack === 'react-express') {
      files.push('client/package.json');
      files.push('client/src/App.tsx');
      files.push('server/package.json');
      files.push('server/index.js');
    }

    return files;
  }

  /**
   * Call AI provider
   */
  private async callAI(prompt: string, systemPrompt: string): Promise<AIResponse> {
    switch (this.provider) {
      case 'minimax':
        return this.callMiniMax(prompt, systemPrompt);
      case 'openai':
        return this.callOpenAI(prompt, systemPrompt);
      case 'claude':
        return this.callClaude(prompt, systemPrompt);
      case 'gemini':
        return this.callGemini(prompt, systemPrompt);
      default:
        return this.callMiniMax(prompt, systemPrompt);
    }
  }

  private async callMiniMax(prompt: string, systemPrompt: string): Promise<AIResponse> {
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
    return { content: data.choices?.[0]?.message?.content || '', model: 'abab6.5s' };
  }

  private async callOpenAI(prompt: string, systemPrompt: string): Promise<AIResponse> {
    const response = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${this.apiKey}`
      },
      body: JSON.stringify({
        model: 'gpt-4o',
        messages: [
          { role: 'system', content: systemPrompt },
          { role: 'user', content: prompt }
        ]
      })
    });
    const data = await response.json();
    return { content: data.choices?.[0]?.message?.content || '', model: 'gpt-4o' };
  }

  private async callClaude(prompt: string, systemPrompt: string): Promise<AIResponse> {
    const response = await fetch('https://api.anthropic.com/v1/messages', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'x-api-key': this.apiKey,
        'anthropic-version': '2023-06-01'
      },
      body: JSON.stringify({
        model: 'claude-sonnet-4-5',
        max_tokens: 8192,
        system: systemPrompt,
        messages: [{ role: 'user', content: prompt }]
      })
    });
    const data = await response.json();
    return { content: data.content?.[0]?.text || '', model: 'claude-sonnet-4-5' };
  }

  private async callGemini(prompt: string, systemPrompt: string): Promise<AIResponse> {
    const response = await fetch(
      `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${this.apiKey}`,
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
    return { content: data.candidates?.[0]?.content?.parts?.[0]?.text || '', model: 'gemini-2.0-flash' };
  }

  getStacks() {
    return WEB_STACKS;
  }
}

// Factory function
export function createWebGenerator(provider: string, apiKey: string): WebGenerator {
  return new WebGenerator(provider, apiKey);
}

export { WEB_STACKS };
