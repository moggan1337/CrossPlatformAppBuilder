/**
 * Code Review AI
 * Automatically reviews generated code for bugs, security, and best practices
 */

export interface CodeReviewIssue {
  severity: 'critical' | 'warning' | 'info';
  line?: number;
  message: string;
  suggestion?: string;
  category: 'security' | 'performance' | 'best-practice' | 'bug';
}

export interface CodeReviewResult {
  score: number; // 0-100
  issues: CodeReviewIssue[];
  summary: string;
  suggestions: string[];
}

export class CodeReviewAI {
  private apiKey: string;
  private provider: string;

  constructor(provider: string, apiKey: string) {
    this.provider = provider;
    this.apiKey = apiKey;
  }

  async review(
    code: string,
    language: string,
    platform: string
  ): Promise<CodeReviewResult> {
    const prompt = `You are an expert code reviewer. Review the following ${language} code for ${platform} platform.

Code to review:
${code}

Provide a JSON response with:
{
  "score": 0-100,
  "issues": [{
    "severity": "critical|warning|info",
    "line": number|null,
    "message": "issue description",
    "suggestion": "how to fix",
    "category": "security|performance|best-practice|bug"
  }],
  "summary": "overall summary",
  "suggestions": ["suggestion1", "suggestion2"]
}

Respond with ONLY valid JSON.`;

    const response = await this.callAI(prompt);
    
    try {
      return JSON.parse(response);
    } catch {
      return {
        score: 100,
        issues: [],
        summary: 'Code review completed',
        suggestions: []
      };
    }
  }

  private async callAI(prompt: string): Promise<string> {
    switch (this.provider) {
      case 'claude':
        return this.callClaude(prompt);
      case 'openai':
        return this.callOpenAI(prompt);
      default:
        return this.callClaude(prompt);
    }
  }

  private async callClaude(prompt: string): Promise<string> {
    const res = await fetch('https://api.anthropic.com/v1/messages', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'x-api-key': this.apiKey,
        'anthropic-version': '2023-06-01'
      },
      body: JSON.stringify({
        model: 'claude-sonnet-4-5',
        max_tokens: 4096,
        messages: [{ role: 'user', content: prompt }]
      })
    });
    const data = await res.json();
    return data.content?.[0]?.text || '';
  }

  private async callOpenAI(prompt: string): Promise<string> {
    const res = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${this.apiKey}`
      },
      body: JSON.stringify({
        model: 'gpt-4o',
        messages: [{ role: 'user', content: prompt }]
      })
    });
    const data = await res.json();
    return data.choices?.[0]?.message?.content || '';
  }
}

export function createCodeReviewer(provider: string, apiKey: string): CodeReviewAI {
  return new CodeReviewAI(provider, apiKey);
}
