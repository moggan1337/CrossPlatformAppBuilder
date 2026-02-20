<div align="center">
  <img src="https://img.shields.io/badge/iOS-000000?style=for-the-badge&logo=ios&logoColor=white" alt="iOS">
  <img src="https://img.shields.io/badge/Android-3DDC84?style=for-the-badge&logo=android&logoColor=white" alt="Android">
  <img src="https://img.shields.io/badge/React_Native-61DAFB?style=for-the-badge&logo=react-native&logoColor=white" alt="React Native">
  <img src="https://img.shields.io/badge/TypeScript-3178C6?style=for-the-badge&logo=typescript&logoColor=white" alt="TypeScript">
  <img src="https://img.shields.io/badge/Next.js-000000?style=for-the-badge&logo=next.js&logoColor=white" alt="Next.js">
  <img src="https://img.shields.io/badge/License-MIT-green?style=for-the-badge" alt="License">
</div>

# 🤖 Cross-Platform App Builder

AI-powered platform to generate **iOS, Android, and React Native apps** from natural language. Describe your app idea, and AI creates complete, production-ready code for all platforms at once.

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
| **React Native** | Expo | Cross-platform apps |
| **Web** | React | PWA support |

### 📋 App Templates (40+)
- **Productivity**: Todo, Notes, Calendar, Bookmarks
- **Health**: Fitness, Meditation, Water, Weight Tracker
- **Social**: Feed, Messaging, Dating
- **E-commerce**: Store, Marketplace
- **Food**: Delivery, Recipes
- **Finance**: Expense, Crypto, Budget
- **And more...**

### ⚙️ Full Automation
- **GitHub Actions** - CI/CD for all platforms
- **Fastlane** - Build & code signing
- **App Store** - Upload & submit
- **Play Store** - Upload & submit
- **TestFlight** - Beta testing
- **Internal Testing** - Google Play

### 🔍 Store Validation
- **App Store Review** - Prevents rejections
- **Play Store Review** - Policy compliance
- **Privacy Checks** - Data handling
- **Accessibility** - Store requirements

---

## 🚀 How It Works

```
┌─────────────────────────────────────────────────────────────────┐
│  USER INPUT                                                     │
│  "Create a fitness app with workouts, progress charts,
│   and HealthKit integration"                                   │
└─────────────────────────────────────────────────────────────────┘
                              ↓
┌─────────────────────────────────────────────────────────────────┐
│  🤖 AI GENERATES (All at once!)                                │
└─────────────────────────────────────────────────────────────────┘
                              ↓
    ┌──────────────┬──────────────┬──────────────┐
    │              │              │              │
    │   📱 iOS     │   🤖 Android  │   ⚛️ React   │
    │  (SwiftUI)   │   (Kotlin)   │   Native     │
    │              │              │              │
    │  .xcodeproj  │  .gradle     │  Expo        │
    └──────────────┴──────────────┴──────────────┘
                              ↓
┌─────────────────────────────────────────────────────────────────┐
│  📦 EXPORT - Download all at once!                             │
│  - iOS Xcode Project (.zip)                                    │
│  - Android Studio Project (.zip)                              │
│  - React Native Expo Project (.zip)                           │
└─────────────────────────────────────────────────────────────────┘
                              ↓
┌─────────────────────────────────────────────────────────────────┐
│  🚀 DEPLOY - Auto upload to stores!                            │
│  - App Store + Play Store                                      │
│  - TestFlight + Internal Testing                               │
└─────────────────────────────────────────────────────────────────┘
```

---

## 📖 Documentation

### Quick Start

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

# AI Providers (choose at least oneROPIC_API_KEY=sk-ant-...
OPENAI)
ANTH_API_KEY=sk-...
GEMINI_API_KEY=AIza...
MINIMAX_API_KEY=...
ZAI_API_KEY=...

# Default
DEFAULT_AI_PROVIDER=claude
```

### API Usage

```typescript
import { createCrossPlatformGenerator } from './lib/platforms/cross-platform-generator';

const generator = createCrossPlatformGenerator(
  'claude',
  process.env.ANTHROPIC_API_KEY!
);

const result = await generator.generate({
  prompt: "Create a fitness tracking app",
  platforms: ['ios', 'android', 'react-native']
});

console.log(result.code.ios);   // SwiftUI code
console.log(result.code.android); // Kotlin code
console.log(result.code['react-native']); // React Native code
```

---

## 📁 Project Structure

```
src/
├── types/              # TypeScript types
├── lib/
│   ├── ai/
│   │   └── providers/  # AI providers (Claude, OpenAI, etc.)
│   ├── platforms/
│   │   └── cross-platform-generator.ts
│   ├── templates/      # App templates
│   ├── validation/     # Store validation
│   └── automation/     # CI/CD & upload
└── app/
    └── api/           # API routes
```

---

## 🤝 Contributing

Contributions welcome! Please read our [contributing guidelines](CONTRIBUTING.md) first.

---

## 📄 License

MIT License - see [LICENSE](LICENSE) for details.

---

<div align="center">
  <p>Built with ❤️ using Next.js + Claude AI</p>
</div>
