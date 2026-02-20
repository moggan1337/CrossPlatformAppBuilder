/**
 * API Extensions
 * Webhooks, REST API for third-party integrations
 */

export interface APIExtension {
  id: string;
  name: string;
  type: 'webhook' | 'rest' | 'graphql' | 'websocket';
  endpoint: string;
  method: 'GET' | 'POST' | 'PUT' | 'DELETE' | 'PATCH';
  config: Record<string, any>;
}

export interface WebhookConfig {
  url: string;
  events: ('app.created' | 'app.updated' | 'app.exported' | 'payment.success' | 'payment.failed')[];
  secret: string;
  retryPolicy?: {
    maxRetries: number;
    retryInterval: number;
  };
}

export class APIExtensionsManager {
  private webhooks: Map<string, WebhookConfig> = new Map();

  createWebhook(config: WebhookConfig): APIExtension {
    const id = `wh_${Date.now()}`;
    this.webhooks.set(id, config);
    
    return {
      id,
      name: `Webhook ${id}`,
      type: 'webhook',
      endpoint: config.url,
      method: 'POST',
      config
    };
  }

  createRESTEndpoint(config: {
    path: string;
    method: 'GET' | 'POST' | 'PUT' | 'DELETE';
    handler: string;
  }): APIExtension {
    return {
      id: `rest_${Date.now()}`,
      name: config.path,
      type: 'rest',
      endpoint: `/api${config.path}`,
      method: config.method,
      config
    };
  }

  async triggerWebhook(event: string, payload: any): Promise<boolean> {
    for (const [id, config] of this.webhooks) {
      if (config.events.includes(event as any)) {
        try {
          await fetch(config.url, {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
              'X-Webhook-Secret': config.secret,
              'X-Webhook-Event': event
            },
            body: JSON.stringify(payload)
          });
        } catch (error) {
          console.error(`Webhook ${id} failed:`, error);
          return false;
        }
      }
    }
    return true;
  }

  getWebhooks(): APIExtension[] {
    return Array.from(this.webhooks.entries()).map(([id, config]) => ({
      id,
      name: `Webhook ${id}`,
      type: 'webhook' as const,
      endpoint: config.url,
      method: 'POST' as const,
      config
    }));
  }
}

export function createAPIExtensions(): APIExtensionsManager {
  return new APIExtensionsManager();
}
