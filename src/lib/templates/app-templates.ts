/**
 * Cross-Platform App Templates
 * Works for iOS, Android, and React Native
 */

export interface AppTemplate {
  id: string;
  name: string;
  description: string;
  category: string;
  platforms: ('ios' | 'android' | 'react-native' | 'web')[];
  features: string[];
  screens: string[];
  difficulty: 'beginner' | 'intermediate' | 'advanced';
  icon: string;
}

export const CROSS_PLATFORM_TEMPLATES: AppTemplate[] = [
  // Productivity
  {
    id: 'todo-app',
    name: 'Todo List',
    description: 'Task management with categories and reminders',
    category: 'productivity',
    platforms: ['ios', 'android', 'react-native'],
    features: ['add-task', 'delete-task', 'mark-complete', 'categories', 'local-storage', 'reminders'],
    screens: ['Home', 'AddTask', 'Categories', 'Settings'],
    difficulty: 'beginner',
    icon: '📝'
  },
  {
    id: 'note-app',
    name: 'Notes',
    description: 'Notes and memo app with rich text',
    category: 'productivity',
    platforms: ['ios', 'android', 'react-native'],
    features: ['create-note', 'rich-text', 'categories', 'search', 'backup'],
    screens: ['Home', 'NoteEditor', 'Categories', 'Search'],
    difficulty: 'beginner',
    icon: '📒'
  },
  {
    id: 'calendar',
    name: 'Calendar',
    description: 'Event calendar with reminders',
    category: 'productivity',
    platforms: ['ios', 'android', 'react-native'],
    features: ['events', 'reminders', 'recurring', 'notifications'],
    screens: ['Calendar', 'EventDetail', 'AddEvent', 'Settings'],
    difficulty: 'intermediate',
    icon: '📅'
  },
  {
    id: 'bookmarks',
    name: 'Bookmarks',
    description: 'Save and organize bookmarks',
    category: 'productivity',
    platforms: ['ios', 'android', 'react-native'],
    features: ['save-bookmark', 'folders', 'sync', 'import-export'],
    screens: ['Home', 'AddBookmark', 'Folders', 'Settings'],
    difficulty: 'beginner',
    icon: '🔖'
  },

  // Health & Fitness
  {
    id: 'fitness-tracker',
    name: 'Fitness Tracker',
    description: 'Track workouts and health data',
    category: 'health',
    platforms: ['ios', 'android', 'react-native'],
    features: ['workouts', 'steps', 'calories', 'charts', 'goals', 'health-integration'],
    screens: ['Home', 'Workouts', 'Progress', 'Profile'],
    difficulty: 'intermediate',
    icon: '💪'
  },
  {
    id: 'meditation',
    name: 'Meditation',
    description: 'Meditation and sleep sounds',
    category: 'health',
    platforms: ['ios', 'android', 'react-native'],
    features: ['meditations', 'sleep-sounds', 'timer', 'progress', 'offline'],
    screens: ['Home', 'Meditate', 'Sleep', 'Profile'],
    difficulty: 'intermediate',
    icon: '🧘'
  },
  {
    id: 'water-tracker',
    name: 'Water Tracker',
    description: 'Track daily water intake',
    category: 'health',
    platforms: ['ios', 'android', 'react-native'],
    features: ['track-water', 'reminders', 'goals', 'history', 'widgets'],
    screens: ['Home', 'History', 'Settings'],
    difficulty: 'beginner',
    icon: '💧'
  },
  {
    id: 'weight-tracker',
    name: 'Weight Tracker',
    description: 'Track weight and BMI',
    category: 'health',
    platforms: ['ios', 'android', 'react-native'],
    features: ['log-weight', 'charts', 'goals', 'bmi', 'reports'],
    screens: ['Home', 'History', 'Goals', 'Reports'],
    difficulty: 'beginner',
    icon: '⚖️'
  },

  // Social
  {
    id: 'social-feed',
    name: 'Social Feed',
    description: 'Instagram-style social app',
    category: 'social',
    platforms: ['ios', 'android', 'react-native'],
    features: ['posts', 'likes', 'comments', 'user-profiles', 'image-upload', 'notifications'],
    screens: ['Feed', 'Post', 'Profile', 'CreatePost', 'Search'],
    difficulty: 'advanced',
    icon: '📱'
  },
  {
    id: 'messaging-app',
    name: 'Messaging',
    description: 'Real-time chat app',
    category: 'social',
    platforms: ['ios', 'android', 'react-native'],
    features: ['messages', 'contacts', 'media', 'notifications', 'encryption'],
    screens: ['Chats', 'Conversation', 'Contacts', 'Settings'],
    difficulty: 'advanced',
    icon: '💬'
  },
  {
    id: 'dating-app',
    name: 'Dating',
    description: 'Dating app with profiles',
    category: 'social',
    platforms: ['ios', 'android', 'react-native'],
    features: ['profiles', 'matching', 'chat', 'location', 'notifications'],
    screens: ['Discover', 'Matches', 'Chat', 'Profile'],
    difficulty: 'advanced',
    icon: '❤️'
  },

  // E-commerce
  {
    id: 'ecommerce',
    name: 'E-commerce',
    description: 'Online shopping with cart',
    category: 'ecommerce',
    platforms: ['ios', 'android', 'react-native'],
    features: ['products', 'categories', 'cart', 'checkout', 'orders', 'payments', 'search'],
    screens: ['Home', 'ProductList', 'ProductDetail', 'Cart', 'Checkout', 'Orders'],
    difficulty: 'advanced',
    icon: '🛒'
  },
  {
    id: 'marketplace',
    name: 'Marketplace',
    description: 'Buy and sell items',
    category: 'ecommerce',
    platforms: ['ios', 'android', 'react-native'],
    features: ['list-item', 'browse', 'search', 'messaging', 'favorites', 'location'],
    screens: ['Home', 'Listing', 'ItemDetail', 'Messages', 'Profile'],
    difficulty: 'intermediate',
    icon: '🏪'
  },

  // Food
  {
    id: 'food-delivery',
    name: 'Food Delivery',
    description: 'Order food from restaurants',
    category: 'food',
    platforms: ['ios', 'android', 'react-native'],
    features: ['restaurants', 'menu', 'cart', 'order-tracking', 'location', 'payments'],
    screens: ['Home', 'Restaurant', 'Menu', 'Cart', 'Tracking', 'Orders'],
    difficulty: 'advanced',
    icon: '🍔'
  },
  {
    id: 'recipe-app',
    name: 'Recipe Book',
    description: 'Search and save recipes',
    category: 'food',
    platforms: ['ios', 'android', 'react-native'],
    features: ['recipes', 'search', 'favorites', 'shopping-list', 'categories'],
    screens: ['Home', 'RecipeDetail', 'Search', 'Favorites', 'ShoppingList'],
    difficulty: 'beginner',
    icon: '👨‍🍳'
  },

  // Finance
  {
    id: 'expense-tracker',
    name: 'Expense Tracker',
    description: 'Track income and expenses',
    category: 'finance',
    platforms: ['ios', 'android', 'react-native'],
    features: ['transactions', 'categories', 'charts', 'budgets', 'reports', 'export'],
    screens: ['Home', 'AddTransaction', 'Reports', 'Budgets', 'Settings'],
    difficulty: 'intermediate',
    icon: '💰'
  },
  {
    id: 'crypto-tracker',
    name: 'Crypto Tracker',
    description: 'Cryptocurrency prices and portfolio',
    category: 'finance',
    platforms: ['ios', 'android', 'react-native'],
    features: ['prices', 'portfolio', 'charts', 'alerts', 'watchlist'],
    screens: ['Home', 'Detail', 'Portfolio', 'Alerts', 'Settings'],
    difficulty: 'intermediate',
    icon: '₿'
  },
  {
    id: 'budget-app',
    name: 'Budget Manager',
    description: 'Manage budgets and savings goals',
    category: 'finance',
    platforms: ['ios', 'android', 'react-native'],
    features: ['budgets', 'goals', 'savings', 'reports', 'notifications'],
    screens: ['Home', 'Budgets', 'Goals', 'Reports', 'Settings'],
    difficulty: 'intermediate',
    icon: '📊'
  },

  // Utilities
  {
    id: 'weather-app',
    name: 'Weather',
    description: 'Weather forecast with location',
    category: 'utilities',
    platforms: ['ios', 'android', 'react-native'],
    features: ['current-weather', 'forecast', 'location', 'search', 'widgets', 'notifications'],
    screens: ['Home', 'Search', 'Details', 'Settings'],
    difficulty: 'intermediate',
    icon: '🌤️'
  },
  {
    id: 'flashlight',
    name: 'Flashlight',
    description: 'Flashlight with modes',
    category: 'utilities',
    platforms: ['ios', 'android', 'react-native'],
    features: ['flashlight', 'strobe', 'sos', 'brightness'],
    screens: ['Home', 'Settings'],
    difficulty: 'beginner',
    icon: '🔦'
  },
  {
    id: 'qr-scanner',
    name: 'QR Scanner',
    description: 'Scan QR codes and barcodes',
    category: 'utilities',
    platforms: ['ios', 'android', 'react-native'],
    features: ['scan-qr', 'scan-barcode', 'history', 'create-qr'],
    screens: ['Scanner', 'History', 'Create'],
    difficulty: 'intermediate',
    icon: '📷'
  },
  {
    id: 'calculator',
    name: 'Calculator',
    description: 'Scientific calculator',
    category: 'utilities',
    platforms: ['ios', 'android', 'react-native'],
    features: ['basic-calc', 'scientific', 'history'],
    screens: ['Calculator', 'History'],
    difficulty: 'beginner',
    icon: '🧮'
  },

  // Education
  {
    id: 'language-learning',
    name: 'Language Learning',
    description: 'Learn new languages',
    category: 'education',
    platforms: ['ios', 'android', 'react-native'],
    features: ['lessons', 'quizzes', 'progress', 'audio', 'flashcards', 'offline'],
    screens: ['Home', 'Lesson', 'Quiz', 'Progress', 'Profile'],
    difficulty: 'intermediate',
    icon: '🌍'
  },
  {
    id: 'flashcards',
    name: 'Flashcards',
    description: 'Study with flashcards',
    category: 'education',
    platforms: ['ios', 'android', 'react-native'],
    features: ['decks', 'flashcards', 'study-mode', 'spaced-repetition', 'progress'],
    screens: ['Home', 'Deck', 'Study', 'Stats'],
    difficulty: 'beginner',
    icon: '🎴'
  },
  {
    id: 'online-course',
    name: 'Online Course',
    description: 'Watch educational courses',
    category: 'education',
    platforms: ['ios', 'android', 'react-native'],
    features: ['courses', 'videos', 'progress', 'certificates', 'downloads'],
    screens: ['Home', 'Course', 'Video', 'Profile'],
    difficulty: 'intermediate',
    icon: '🎓'
  },

  // Entertainment
  {
    id: 'video-player',
    name: 'Video Player',
    description: 'Video streaming and playback',
    category: 'entertainment',
    platforms: ['ios', 'android', 'react-native'],
    features: ['streaming', 'playback', 'subtitles', 'playlists', 'downloads'],
    screens: ['Home', 'Player', 'Library', 'Search'],
    difficulty: 'intermediate',
    icon: '🎬'
  },
  {
    id: 'music-player',
    name: 'Music Player',
    description: 'Music streaming app',
    category: 'entertainment',
    platforms: ['ios', 'android', 'react-native'],
    features: ['streaming', 'playlists', 'library', 'equalizer', 'downloads', 'lyrics'],
    screens: ['Home', 'Player', 'Library', 'Search'],
    difficulty: 'intermediate',
    icon: '🎵'
  },
  {
    id: 'podcast-app',
    name: 'Podcasts',
    description: 'Podcast player and discovery',
    category: 'entertainment',
    platforms: ['ios', 'android', 'react-native'],
    features: ['podcasts', 'episodes', 'downloads', 'subscriptions', 'notifications'],
    screens: ['Home', 'Podcast', 'Episode', 'Downloads'],
    difficulty: 'advanced',
    icon: '🎙️'
  },
  {
    id: 'movie-guide',
    name: 'Movie Guide',
    description: 'Browse movies and showtimes',
    category: 'entertainment',
    platforms: ['ios', 'android', 'react-native'],
    features: ['movies', 'showtimes', 'reviews', 'favorites', 'trailers'],
    screens: ['Home', 'MovieDetail', 'Search', 'Favorites'],
    difficulty: 'intermediate',
    icon: '🎥'
  },

  // Travel
  {
    id: 'travel-planner',
    name: 'Travel Planner',
    description: 'Plan trips and itineraries',
    category: 'travel',
    platforms: ['ios', 'android', 'react-native'],
    features: ['trips', 'itinerary', 'bookings', 'maps', 'budget'],
    screens: ['Home', 'TripDetail', 'AddTrip', 'Map'],
    difficulty: 'intermediate',
    icon: '✈️'
  },
  {
    id: 'hotel-booking',
    name: 'Hotel Booking',
    description: 'Find and book hotels',
    category: 'travel',
    platforms: ['ios', 'android', 'react-native'],
    features: ['hotels', 'search', 'filters', 'bookings', 'maps', 'reviews'],
    screens: ['Home', 'HotelDetail', 'Booking', 'MyBookings'],
    difficulty: 'advanced',
    icon: '🏨'
  },
  {
    id: 'flight-tracker',
    name: 'Flight Tracker',
    description: 'Track flights in real-time',
    category: 'travel',
    platforms: ['ios', 'android', 'react-native'],
    features: ['track-flights', 'airports', 'arrivals', 'notifications', 'alerts'],
    screens: ['Home', 'FlightDetail', 'Search', 'SavedFlights'],
    difficulty: 'intermediate',
    icon: '🛫'
  },

  // AR & Advanced
  {
    id: 'ar-furniture',
    name: 'AR Furniture',
    description: 'View furniture in AR',
    category: 'shopping',
    platforms: ['ios', 'android'],
    features: ['ar-view', 'product-catalog', 'favorites', 'measure', 'share'],
    screens: ['Catalog', 'ProductDetail', 'ARView', 'Cart'],
    difficulty: 'advanced',
    icon: '🪑'
  },
  {
    id: 'ar-measure',
    name: 'AR Measure',
    description: 'Measure objects with AR',
    category: 'utilities',
    platforms: ['ios', 'android'],
    features: ['ar-measure', 'history', 'export', 'share'],
    screens: ['Measure', 'History', 'Settings'],
    difficulty: 'advanced',
    icon: '📏'
  },

  // Business
  {
    id: 'crm-app',
    name: 'CRM',
    description: 'Customer relationship management',
    category: 'business',
    platforms: ['ios', 'android', 'react-native'],
    features: ['contacts', 'deals', 'tasks', 'pipeline', 'reports', 'team'],
    screens: ['Home', 'Contacts', 'Deals', 'Tasks', 'Reports'],
    difficulty: 'advanced',
    icon: '👥'
  },
  {
    id: 'inventory-manager',
    name: 'Inventory',
    description: 'Manage inventory and stock',
    category: 'business',
    platforms: ['ios', 'android', 'react-native'],
    features: ['products', 'stock', 'orders', 'reports', 'barcode', 'alerts'],
    screens: ['Home', 'Products', 'AddProduct', 'Reports', 'Orders'],
    difficulty: 'advanced',
    icon: '📦'
  },
  {
    id: 'project-manager',
    name: 'Project Manager',
    description: 'Manage projects and tasks',
    category: 'business',
    platforms: ['ios', 'android', 'react-native'],
    features: ['projects', 'tasks', 'team', 'gantt-chart', 'files', 'chat'],
    screens: ['Home', 'ProjectDetail', 'Tasks', 'Team', 'Files'],
    difficulty: 'advanced',
    icon: '📋'
  },

  // News
  {
    id: 'news-reader',
    name: 'News Reader',
    description: 'News articles and RSS',
    category: 'news',
    platforms: ['ios', 'android', 'react-native'],
    features: ['articles', 'categories', 'bookmarks', 'offline-reading', 'rss', 'dark-mode'],
    screens: ['Home', 'Article', 'Categories', 'Bookmarks', 'RSS'],
    difficulty: 'intermediate',
    icon: '📰'
  },
  {
    id: 'blog-reader',
    name: 'Blog Reader',
    description: 'Follow your favorite blogs',
    category: 'news',
    platforms: ['ios', 'android', 'react-native'],
    features: ['blogs', 'rss', 'read-later', 'dark-mode', 'notifications'],
    screens: ['Home', 'Feed', 'ReadLater', 'Subscriptions'],
    difficulty: 'beginner',
    icon: '📖'
  }
];

export function getTemplatesByCategory(category: string): AppTemplate[] {
  return CROSS_PLATFORM_TEMPLATES.filter(t => t.category === category);
}

export function getTemplatesByPlatform(platform: string): AppTemplate[] {
  return CROSS_PLATFORM_TEMPLATES.filter(t => t.platforms.includes(platform as any));
}

export function getTemplateById(id: string): AppTemplate | undefined {
  return CROSS_PLATFORM_TEMPLATES.find(t => t.id === id);
}

export { CROSS_PLATFORM_TEMPLATES as default };
