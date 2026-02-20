/**
 * Web App Templates
 * Pre-built templates for web applications
 */

export interface WebTemplate {
  id: string;
  name: string;
  description: string;
  stack: string;
  pages: string[];
  features: string[];
  difficulty: 'beginner' | 'intermediate' | 'advanced';
}

export const WEB_TEMPLATES: WebTemplate[] = [
  // SaaS Templates
  {
    id: 'saas-dashboard',
    name: 'SaaS Dashboard',
    description: 'Complete SaaS dashboard with auth, billing, and analytics',
    stack: 'nextjs',
    pages: ['Dashboard', 'Settings', 'Billing', 'Users', 'Analytics'],
    features: ['authentication', 'stripe-integration', 'charts', 'data-table', 'notifications'],
    difficulty: 'advanced'
  },
  {
    id: 'crm-system',
    name: 'CRM System',
    description: 'Customer relationship management with deals and pipeline',
    stack: 'nextjs',
    pages: ['Dashboard', 'Contacts', 'Deals', 'Tasks', 'Reports'],
    features: ['kanban-board', 'contact-management', 'deal-pipeline', 'charts'],
    difficulty: 'advanced'
  },
  {
    id: 'admin-panel',
    name: 'Admin Panel',
    description: 'Full-featured admin panel with users, settings, and analytics',
    stack: 'nextjs',
    pages: ['Dashboard', 'Users', 'Settings', 'Logs', 'Analytics'],
    features: ['data-table', 'charts', 'forms', 'authentication', 'role-management'],
    difficulty: 'intermediate'
  },
  
  // E-commerce
  {
    id: 'e-commerce-store',
    name: 'E-commerce Store',
    description: 'Full online store with cart, checkout, and payments',
    stack: 'nextjs',
    pages: ['Home', 'Products', 'ProductDetail', 'Cart', 'Checkout', 'Orders'],
    features: ['shopping-cart', 'stripe-checkout', 'product-search', 'reviews', 'wishlist'],
    difficulty: 'advanced'
  },
  {
    id: 'marketplace',
    name: 'Marketplace',
    description: 'Multi-vendor marketplace with seller dashboards',
    stack: 'nextjs',
    pages: ['Home', 'Browse', 'VendorStore', 'Cart', 'SellerDashboard'],
    features: ['multi-vendor', 'vendor-dashboard', 'product-management', 'commission'],
    difficulty: 'advanced'
  },

  // Content & CMS
  {
    id: 'blog-platform',
    name: 'Blog Platform',
    description: 'Full-featured blog with categories, tags, and SEO',
    stack: 'nextjs',
    pages: ['Home', 'Blog', 'Post', 'Category', 'Author', 'Search'],
    features: ['markdown', 'seo', 'comments', 'newsletter', 'dark-mode'],
    difficulty: 'intermediate'
  },
  {
    id: 'cms',
    name: 'CMS',
    description: 'Content management system with rich editor',
    stack: 'nextjs',
    pages: ['Dashboard', 'Content', 'Media', 'Users', 'Settings'],
    features: ['rich-editor', 'media-library', 'versioning', 'workflows'],
    difficulty: 'advanced'
  },
  {
    id: 'documentation',
    name: 'Documentation Site',
    description: 'Docs site like GitBook with versioning',
    stack: 'nextjs',
    pages: ['Docs', 'ApiReference', 'Changelog', 'Search'],
    features: ['mdx', 'search', 'versioning', 'code-highlighting'],
    difficulty: 'intermediate'
  },

  // Social & Community
  {
    id: 'social-network',
    name: 'Social Network',
    description: 'Full social network with posts, likes, and messaging',
    stack: 'nextjs',
    pages: ['Feed', 'Profile', 'Messages', 'Notifications', 'Search'],
    features: ['posts', 'likes', 'comments', 'messaging', 'followers', 'real-time'],
    difficulty: 'advanced'
  },
  {
    id: 'forum',
    name: 'Forum',
    description: 'Community forum with threads and moderation',
    stack: 'nextjs',
    pages: ['Home', 'Category', 'Thread', 'UserProfile', 'Search'],
    features: ['threads', 'replies', 'moderation', 'voting', 'badges'],
    difficulty: 'intermediate'
  },

  // API Backends
  {
    id: 'rest-api',
    name: 'REST API',
    description: 'Production-ready REST API with auth and CRUD',
    stack: 'fastapi',
    pages: ['API'],
    features: ['rest-endpoints', 'jwt-auth', 'crud', 'pagination', 'validation', 'docs'],
    difficulty: 'intermediate'
  },
  {
    id: 'graphql-api',
    name: 'GraphQL API',
    description: 'GraphQL API with subscriptions',
    stack: 'fastapi',
    pages: ['API'],
    features: ['graphql', 'subscriptions', 'jwt-auth', 'database', 'caching'],
    difficulty: 'advanced'
  },
  {
    id: 'webhook-service',
    name: 'Webhook Service',
    description: 'Service for managing webhooks and events',
    stack: 'fastapi',
    pages: ['Dashboard', 'Webhooks', 'Events', 'Settings'],
    features: ['webhook-management', 'event-logging', 'retries', 'signatures'],
    difficulty: 'intermediate'
  },

  // Tools & Utilities
  {
    id: 'url-shortener',
    name: 'URL Shortener',
    description: 'URL shortener with analytics',
    stack: 'fastapi',
    pages: ['Home', 'Analytics', 'Dashboard'],
    features: ['url-shortening', 'analytics', 'custom-slugs', 'qr-codes'],
    difficulty: 'beginner'
  },
  {
    id: 'file-storage',
    name: 'File Storage',
    description: 'Cloud file storage with sharing',
    stack: 'nextjs',
    pages: ['Dashboard', 'Files', 'Shared', 'Settings'],
    features: ['file-upload', 'folders', 'sharing', 'preview'],
    difficulty: 'intermediate'
  },
  {
    id: 'note-taking',
    name: 'Note Taking',
    description: 'Notes app with rich text and organization',
    stack: 'nextjs',
    pages: ['Notes', 'Notebook', 'Search', 'Settings'],
    features: ['rich-text', 'organization', 'tags', 'search', 'sync'],
    difficulty: 'intermediate'
  },

  // Portfolio & Landing
  {
    id: 'portfolio',
    name: 'Portfolio',
    description: 'Personal portfolio with projects and blog',
    stack: 'nextjs',
    pages: ['Home', 'Projects', 'About', 'Blog', 'Contact'],
    features: ['projects', 'blog', 'contact-form', 'animations', 'seo'],
    difficulty: 'beginner'
  },
  {
    id: 'landing-page',
    name: 'SaaS Landing Page',
    description: 'High-converting SaaS landing page',
    stack: 'nextjs',
    pages: ['Home'],
    features: ['hero', 'features', 'pricing', 'testimonials', 'cta', 'seo'],
    difficulty: 'beginner'
  },
  {
    id: 'dashboard-template',
    name: 'Dashboard Template',
    description: 'Reusable admin dashboard template',
    stack: 'vue',
    pages: ['Dashboard', 'Tables', 'Forms', 'Charts', 'Settings'],
    features: ['sidebar', 'data-tables', 'charts', 'dark-mode', 'responsive'],
    difficulty: 'intermediate'
  }
];

export function getWebTemplatesByStack(stack: string): WebTemplate[] {
  return WEB_TEMPLATES.filter(t => t.stack === stack);
}

export function getWebTemplateById(id: string): WebTemplate | undefined {
  return WEB_TEMPLATES.find(t => t.id === id);
}

export { WEB_TEMPLATES as default };
