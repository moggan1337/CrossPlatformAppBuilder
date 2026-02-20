/**
 * Payment Integration
 * Stripe/PayPal for premium features
 */

export type PaymentProvider = 'stripe' | 'paypal';

export interface PricingPlan {
  id: string;
  name: string;
  price: number;
  interval: 'month' | 'year';
  features: string[];
  limits: {
    appsPerMonth: number;
    platforms: string[];
    storage: number;
    exportRetention: number;
  };
}

export interface PaymentResult {
  success: boolean;
  subscriptionId?: string;
  customerId?: string;
  error?: string;
}

export const DEFAULT_PLANS: PricingPlan[] = [
  {
    id: 'free',
    name: 'Free',
    price: 0,
    interval: 'month',
    features: ['3 apps/month', 'iOS only', 'Basic templates'],
    limits: { appsPerMonth: 3, platforms: ['ios'], storage: 100, exportRetention: 7 }
  },
  {
    id: 'pro',
    name: 'Pro',
    price: 29,
    interval: 'month',
    features: ['Unlimited apps', 'All platforms', 'All templates', 'Priority support'],
    limits: { appsPerMonth: -1, platforms: ['ios', 'android', 'react-native', 'web'], storage: 10000, exportRetention: 30 }
  },
  {
    id: 'team',
    name: 'Team',
    price: 99,
    interval: 'month',
    features: ['Everything in Pro', 'Team members', 'API access', 'Custom branding'],
    limits: { appsPerMonth: -1, platforms: ['ios', 'android', 'react-native', 'web'], storage: 100000, exportRetention: 90 }
  }
];

export class PaymentIntegration {
  private stripeKey?: string;
  private paypalKey?: string;

  constructor(stripeKey?: string, paypalKey?: string) {
    this.stripeKey = stripeKey || process.env.STRIPE_SECRET_KEY;
    this.paypalKey = paypalKey || process.env.PAYPAL_CLIENT_ID;
  }

  async createCheckout(
    planId: string,
    userId: string,
    provider: PaymentProvider = 'stripe'
  ): Promise<{ url: string; sessionId: string }> {
    const plan = DEFAULT_PLANS.find(p => p.id === planId);
    if (!plan) throw new Error('Plan not found');

    if (provider === 'stripe' && this.stripeKey) {
      return this.createStripeCheckout(plan, userId);
    } else if (provider === 'paypal' && this.paypalKey) {
      return this.createPaypalCheckout(plan, userId);
    }

    throw new Error('Payment provider not configured');
  }

  private async createStripeCheckout(plan: PricingPlan, userId: string) {
    // Mock - in production, use Stripe SDK
    const sessionId = `cs_${Date.now()}_${userId}`;
    return {
      url: `https://checkout.stripe.com/c/pay/${sessionId}`,
      sessionId
    };
  }

  private async createPaypalCheckout(plan: PricingPlan, userId: string) {
    // Mock - in production, use PayPal SDK
    const orderId = `ORDER_${Date.now()}`;
    return {
      url: `https://www.paypal.com/checkoutnow?token=${orderId}`,
      sessionId: orderId
    };
  }

  async verifySubscription(subscriptionId: string): Promise<PaymentResult> {
    // Mock verification
    return {
      success: true,
      subscriptionId,
      customerId: `cus_${Date.now()}`
    };
  }

  async cancelSubscription(subscriptionId: string): Promise<PaymentResult> {
    return {
      success: true,
      subscriptionId
    };
  }

  getPlans(): PricingPlan[] {
    return DEFAULT_PLANS;
  }
}

export function createPayments(stripeKey?: string, paypalKey?: string): PaymentIntegration {
  return new PaymentIntegration(stripeKey, paypalKey);
}
