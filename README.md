<div align="center">
  <img src="https://img.shields.io/badge/iOS-000000?style=for-the-badge&logo=ios&logoColor=white" alt="iOS">
  <img src="https://img.shields.io/badge/Android-3DDC84?style=for-the-badge&logo=android&logoColor=white" alt="Android">
  <img src="https://img.shields.io/badge/React_Native-61DAFB?style=for-the-badge&logo=react-native&logoColor=white" alt="React Native">
  <img src="https://img.shields.io/badge/Web-FF6C37?style=for-the-badge&logo=webpack&logoColor=white" alt="Web">
  <img src="https://img.shields.io/badge/TypeScript-3178C6?style=for-the-badge&logo=typescript&logoColor=white" alt="TypeScript">
  <img src="https://img.shields.io/badge/Next.js-000000?style=for-the-badge&logo=next.js&logoColor=white" alt="Next.js">
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

### 🌐 Web Technology Stacks
| Stack | Framework | Description |
|-------|-----------|-------------|
| **Next.js** | Next.js 14 + Tailwind | Full-stack React apps |
| **FastAPI** | FastAPI + Python | REST APIs |
| **React + Express** | MERN Stack | MongoDB-based apps |
| **Vue/Nuxt** | Nuxt 3 | Vue.js applications |

### 📋 App Templates
- **Mobile**: Todo, Fitness, Social, E-commerce, Weather
- **Web SaaS**: Dashboard, CRM, Admin Panel, E-commerce
- **Web API**: REST API, GraphQL, Webhook Service
- **And more...**

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
│   ├── ai/providers/          # AI providers
│   ├── platforms/
│   │   ├── cross-platform-generator.ts
│   │   └── web-generator.ts   # Web app generation
│   ├── templates/            # App & Web templates
│   ├── validation/           # Store validation
│   └── automation/          # CI/CD & upload
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
