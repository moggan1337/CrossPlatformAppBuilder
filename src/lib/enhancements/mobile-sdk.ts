/**
 * Mobile SDK
 * API for mobile apps to integrate with platform
 */

export interface SDKConfig {
  apiKey: string;
  baseUrl: string;
}

export interface SDKApp {
  id: string;
  name: string;
  platforms: string[];
  status: 'draft' | 'generated' | 'exported';
}

export interface SDKGenerationRequest {
  prompt: string;
  platforms: string[];
  template?: string;
}

export interface SDKExportRequest {
  appId: string;
  platform: string;
  format: 'zip' | 'github';
}

export class MobileSDK {
  private config: SDKConfig;

  constructor(config: SDKConfig) {
    this.config = config;
  }

  async generateApp(request: SDKGenerationRequest): Promise<SDKApp> {
    const response = await fetch(`${this.config.baseUrl}/api/apps/generate`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${this.config.apiKey}`
      },
      body: JSON.stringify(request)
    });

    return response.json();
  }

  async listApps(): Promise<SDKApp[]> {
    const response = await fetch(`${this.config.baseUrl}/api/apps`, {
      headers: {
        'Authorization': `Bearer ${this.config.apiKey}`
      }
    });

    return response.json();
  }

  async getApp(appId: string): Promise<SDKApp> {
    const response = await fetch(`${this.config.baseUrl}/api/apps/${appId}`, {
      headers: {
        'Authorization': `Bearer ${this.config.apiKey}`
      }
    });

    return response.json();
  }

  async exportApp(request: SDKExportRequest): Promise<{ url: string }> {
    const response = await fetch(`${this.config.baseUrl}/api/apps/${request.appId}/export`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${this.config.apiKey}`
      },
      body: JSON.stringify({
        platform: request.platform,
        format: request.format
      })
    });

    return response.json();
  }

  async getTemplates(): Promise<any[]> {
    const response = await fetch(`${this.config.baseUrl}/api/templates`, {
      headers: {
        'Authorization': `Bearer ${this.config.apiKey}`
      }
    });

    return response.json();
  }
}

// React Native wrapper
export function createMobileSDK(apiKey: string, baseUrl?: string): MobileSDK {
  return new MobileSDK({
    apiKey,
    baseUrl: baseUrl || (typeof window !== 'undefined' ? '' : 'https://api.appbuilder.dev')
  });
}

// SDK for different platforms
export const SDK_PLATFORMS = {
  reactnative: 'React Native SDK',
  flutter: 'Flutter SDK',
  ionic: 'Ionic SDK',
  capacitor: 'Capacitor SDK'
};
