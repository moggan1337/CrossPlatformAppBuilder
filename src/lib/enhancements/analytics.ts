/**
 * Analytics Dashboard
 * Track generated apps, usage, revenue
 */

export interface AnalyticsEvent {
  event: string;
  userId?: string;
  appId?: string;
  platform?: string;
  timestamp: number;
  metadata?: Record<string, any>;
}

export interface AnalyticsSummary {
  totalApps: number;
  totalGenerations: number;
  platforms: Record<string, number>;
  topTemplates: { name: string; count: number }[];
  revenue: number;
  activeUsers: number;
  generationTrend: { date: string; count: number }[];
}

export class AnalyticsDashboard {
  private events: AnalyticsEvent[] = [];

  track(event: AnalyticsEvent): void {
    this.events.push({
      ...event,
      timestamp: event.timestamp || Date.now()
    });
  }

  trackAppGeneration(appId: string, platform: string, template?: string): void {
    this.track({
      event: 'app.generated',
      appId,
      platform,
      timestamp: Date.now(),
      metadata: { template }
    });
  }

  trackExport(appId: string, platform: string): void {
    this.track({
      event: 'app.exported',
      appId,
      platform,
      timestamp: Date.now()
    });
  }

  trackPayment(userId: string, amount: number, currency: string): void {
    this.track({
      event: 'payment.success',
      userId,
      timestamp: Date.now(),
      metadata: { amount, currency }
    });
  }

  getSummary(): AnalyticsSummary {
    const appGenerations = this.events.filter(e => e.event === 'app.generated');
    const payments = this.events.filter(e => e.event === 'payment.success');
    
    const platforms: Record<string, number> = {};
    appGenerations.forEach(e => {
      const platform = e.platform || 'unknown';
      platforms[platform] = (platforms[platform] || 0) + 1;
    });

    const templateCounts: Record<string, number> = {};
    appGenerations.forEach(e => {
      const template = e.metadata?.template || 'custom';
      templateCounts[template] = (templateCounts[template] || 0) + 1;
    });

    const topTemplates = Object.entries(templateCounts)
      .map(([name, count]) => ({ name, count }))
      .sort((a, b) => b.count - a.count)
      .slice(0, 10);

    const revenue = payments.reduce((sum, e) => {
      return sum + (e.metadata?.amount || 0);
    }, 0);

    // Generate trend (last 7 days)
    const trend: { date: string; count: number }[] = [];
    for (let i = 6; i >= 0; i--) {
      const date = new Date(Date.now() - i * 24 * 60 * 60 * 1000);
      const dateStr = date.toISOString().split('T')[0];
      const count = appGenerations.filter(e => {
        const eventDate = new Date(e.timestamp).toISOString().split('T')[0];
        return eventDate === dateStr;
      }).length;
      trend.push({ date: dateStr, count });
    }

    return {
      totalApps: new Set(appGenerations.map(e => e.appId)).size,
      totalGenerations: appGenerations.length,
      platforms,
      topTemplates,
      revenue,
      activeUsers: new Set(this.events.map(e => e.userId).filter(Boolean)).size,
      generationTrend: trend
    };
  }

  getEvents(limit: number = 100): AnalyticsEvent[] {
    return this.events.slice(-limit);
  }
}

export function createAnalytics(): AnalyticsDashboard {
  return new AnalyticsDashboard();
}
