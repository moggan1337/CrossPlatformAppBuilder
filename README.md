<div align="center">
  <img src="https://img.shields.io/badge/iOS-000000?style=for-the-badge&logo=ios&logoColor=white" alt="iOS">
  <img src="https://img.shields.io/badge/Android-3DDC84?style=for-the-badge&logo=android&logoColor=white" alt="Android">
  <img src="https://img.shields.io/badge/React_Native-61DAFB?style=for-the-badge&logo=react-native&logoColor=white" alt="React Native">
  <img src="https://img.shields.io/badge/Web-FF6C37?style=for-the-badge&logo=webpack&logoColor=white" alt="Web">
  <img src="https://img.shields.io/badge/TypeScript-3178C6?style=for-the-badge&logo=typescript&logoColor=white" alt="TypeScript">
  <img src="https://img.shields.io/badge/License-MIT-green?style=for-the-badge" alt="License">
</div>

# 🤖 Cross-Platform App Builder

AI-powered platform to generate **iOS, Android, React Native, and Web apps** from natural language. Describe your app idea, and AI creates complete, production-ready code for all platforms at once.

---

## ✨ Features

### 🤖 AI Providers (5)
| Provider | Models | Description |
|----------|--------|-------------|
| **Claude** | Sonnet 4.5, Opus 4.6 | Anthropic's best code model |
| **OpenAI** | GPT-4o, GPT-4o Mini | OpenAI's latest models |
| **Google Gemini** | Gemini 2.0 Flash | Google's multimodal AI |
| **MiniMax** | abab 6.5S | Fast & cost-effective |
| **Z.ai** | GLM 4 | Chinese AI model |

### 📱 Multi-Platform Generation
| Platform | Output | Description |
|----------|--------|-------------|
| **iOS** | SwiftUI + Xcode | Native Apple apps |
| **Android** | Kotlin/Jetpack Compose | Native Android apps |
| **React Native** | Expo | Cross-platform mobile apps |
| **Web** | Next.js / FastAPI / Vue | Full-stack web apps |

### 💬 Two Interfaces

| Interface | Description | Like |
|-----------|-------------|------|
| **Chat UI** | Web-based chat for building apps | ChatGPT |
| **CLI** | Terminal interface | Claude Code |

### 📋 App Templates
- **Mobile**: Todo, Fitness, Social, E-commerce, Weather
- **Web SaaS**: Dashboard, CRM, Admin Panel, E-commerce
- **Web API**: REST API, GraphQL, Webhook Service
- **And more...** (40+ templates)

### ⚙️ Full Automation
- **GitHub Actions** - CI/CD for all platforms
- **Fastlane** - Build & code signing
- **App Store** - Upload & submit
- **Play Store** - Upload & submit
- **Vercel/Netlify** - Web deployment

### 🔍 Store Validation
- **App Store Review** - Prevents rejections
- **Play Store Review** - Policy compliance
- **Web Accessibility** - WCAG compliance

### 🚀 10 Enhancements
1. **Code Review AI** - Auto-review code for bugs & security
2. **Cloud DB** - Auto-provision Supabase, Firebase, PlanetScale, Neon
3. **Visual Preview** - See app screens before export
4. **API Extensions** - Webhooks & REST endpoints
5. **Analytics Dashboard** - Track apps, usage, revenue
6. **Payment Integration** - Stripe/PayPal (Free/Pro/Team plans)
7. **Custom Domain** - Deploy to your domain + SSL
8. **Mobile SDK** - API SDK for mobile apps
9. **Dark Mode UI** - Light/Dark/System theme
10. **CLI + Chat UI** - Like Claude Code & ChatGPT

---

## 🚀 How It Works

```
┌─────────────────────────────────────────────────────────────────┐
│  USER INPUT                                                     │
│  "Create a fitness app with workouts, progress charts,
│   and a web dashboard for tracking"
└─────────────────────────────────────────────────────────────────┘
                              ↓
┌─────────────────────────────────────────────────────────────────┐
│  🤖 AI GENERATES (All at once!)                                │
└─────────────────────────────────────────────────────────────────┘
                              ↓
    ┌──────────────┬──────────────┬──────────────┬──────────────┐
    │              │              │              │              │
    │   📱 iOS     │   🤖 Android │   ⚛️ React  │   🌐 Web    │
    │  (SwiftUI)   │   (Kotlin)  │   (Expo)    │  (Next.js)   │
    │              │              │              │              │
    └──────────────┴──────────────┴──────────────┴──────────────┘
                              ↓
┌─────────────────────────────────────────────────────────────────┐
│  📦 EXPORT - Download all at once!                              │
│  - iOS Xcode Project (.zip)                                     │
│  - Android Studio Project (.zip)                                │
│  - React Native Expo Project (.zip)                            │
│  - Web Next.js Project (.zip)                                  │
└─────────────────────────────────────────────────────────────────┘
```

---

## 💬 Chat Interface (Like ChatGPT)

```typescript
import { createChatAPI } from './lib/enhancements/chat-api';

const chat = createChatAPI(apiKey);

// Send message and get app generated!
const response = await chat.sendMessage({
  message: "Create a fitness tracking app"
});

console.log(response.message.content);
// 🎉 App Created: Fitness Tracker
// Platforms: iOS, Android
// Screens: Home, Workouts, Progress, Profile
```

---

## 🖥️ CLI Interface (Like Claude Code)

```bash
$ npx appbuilder

You: Create a fitness app

🤖: 🔨 Building...

✅ Done!
📱 App: Fitness Tracker
Platforms: iOS, Android

You: Add social sharing

🤖: ✏️ Modifying...

✅ Done!
```

### CLI Commands
- `build "app idea"` - Generate apps
- `run` - Run agentos pipeline
- `read file` - Read files
- `shell cmd` - Run terminal commands
- `help` - Show help

---

## 📖 Quick Start

```bash
# Clone
git clone https://github.com/moggan1337/CrossPlatformAppBuilder.git
cd CrossPlatformAppBuilder

# Install
npm install

# Environment
cp .env.example .env.local

# Run
npm run dev
```

### Environment Variables

```env
# Database
NEXT_PUBLIC_SUPABASE_URL=...
NEXT_PUBLIC_SUPABASE_ANON_KEY=...

# AI Providers (choose at least one)
ANTHROPIC_API_KEY=sk-ant-...
OPENAI_API_KEY=sk-...
GEMINI_API_KEY=AIza...
MINIMAX_API_KEY=...
ZAI_API_KEY=...

# Default
DEFAULT_AI_PROVIDER=claude
```

---

## 💻 Usage

```typescript
import { createCrossPlatformGenerator } from './lib/platforms/cross-platform-generator';

const generator = createCrossPlatformGenerator(
  'claude',
  process.env.ANTHROPIC_API_KEY!
);

// Generate for ALL platforms at once!
const result = await generator.generate({
  prompt: "Create a fitness tracking app with web dashboard",
  platforms: ['ios', 'android', 'react-native', 'web'],
  settings: {
    webStack: 'nextjs'  // Choose web stack
  }
});

console.log(result.code.ios);      // SwiftUI code
console.log(result.code.android);  // Kotlin code
console.log(result.code['react-native']); // React Native code
console.log(result.code.web);     // Next.js code
```

---

## 📁 Project Structure

```
src/
├── types/                     # TypeScript types
├── lib/
│   ├── ai/providers/          # AI providers (5)
│   ├── platforms/
│   │   ├── cross-platform-generator.ts
│   │   └── web-generator.ts   # Web app generation
│   ├── templates/            # 40+ templates
│   ├── validation/           # Store validation
│   ├── automation/          # CI/CD & upload
│   └── enhancements/        # 10 enhancements
│       ├── chat-api.ts      # Chat UI
│       ├── cli.ts           # CLI tool
│       ├── code-review.ts  # Code review
│       ├── cloud-db.ts     # Database
│       ├── visual-preview.ts
│       ├── api-extensions.ts
│       ├── analytics.ts
│       ├── payments.ts
│       ├── custom-domain.ts
│       ├── mobile-sdk.ts
│       └── dark-mode.ts
└── app/
    └── api/                  # API routes
```

---

## 🤝 Contributing

Contributions welcome!

---

## 📄 License

MIT License

---

<div align="center">
  <p>Built with ❤️ using Next.js + Claude AI</p>
</div>
