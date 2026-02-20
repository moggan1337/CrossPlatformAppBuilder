<div align="center">
  <img src="https://img.shields.io/badge/iOS-000000?style=for-the-badge&logo=ios&logoColor=white" alt="iOS">
  <img src="https://img.shields.io/badge/Android-3DDC84?style=for-the-badge&logo=android&logoColor=white" alt="Android">
  <img src="https://img.shields.io/badge/React_Native-61DAFB?style=for-the-badge&logo=react-native&logoColor=white" alt="React Native">
  <img src="https://img.shields.io/badge/Web-FF6C37?style=for-the-badge&logo=webpack&logoColor=white" alt="Web">
  <img src="https://img.shields.io/badge/TypeScript-3178C6?style=for-the-badge&logo=typescript&logoColor=white" alt="TypeScript">
  <img src="https://img.shields.io/badge/License-MIT-green?style=for-the-badge" alt="License">
</div>

# 🤖 Cross-Platform App Builder

**AI-powered platform** to generate iOS, Android, React Native, and Web apps from natural language.

> **Default AI: MiniMax M2.5** - Peak performance with 204K context window

---

## ✨ Features

### 🤖 AI Providers

| Provider | Status | Models | Description |
|----------|--------|--------|-------------|
| **MiniMax M2.5** | ⭐ Default | M2.5, M2.5-highspeed, M2.1 | Peak Performance, 204K context |
| Claude | Optional | Sonnet 4.5, Opus 4.6 | Anthropic's best code model |
| OpenAI | Optional | GPT-4o, GPT-4o Mini | OpenAI's latest models |
| Google Gemini | Optional | Gemini 2.0 Flash | Google's multimodal AI |
| Z.ai | Optional | GLM 4 | Chinese AI model |

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

### 🚀 10 Enhancements
1. Code Review AI - Auto-review code for bugs & security
2. Cloud DB - Auto-provision Supabase, Firebase, PlanetScale
3. Visual Preview - See app screens before export
4. API Extensions - Webhooks & REST endpoints
5. Analytics Dashboard - Track apps, usage, revenue
6. Payment Integration - Stripe/PayPal
7. Custom Domain - Deploy to your domain + SSL
8. Mobile SDK - API SDK for mobile apps
9. Dark Mode UI - Light/Dark/System theme
10. CLI + Chat UI - Like Claude Code & ChatGPT

---

## 🚀 Quick Start

```bash
# 1. Clone
git clone https://github.com/moggan1337/CrossPlatformAppBuilder.git
cd CrossPlatformAppBuilder

# 2. Install
npm install

# 3. Setup environment
cp .env.example .env.local

# 4. Add your MiniMax API key (recommended)
# Get it from: https://platform.minimax.io/user-center/basic-information/interface-key
MINIMAX_API_KEY=your-minimax-key

# 5. Run
npm run dev
```

---

## ⚡ Usage

```typescript
// Default: Uses MiniMax M2.5
const result = await generator.generate({
  prompt: "Create a fitness tracking app",
  platforms: ['ios', 'android']
});
```

Or use Chat UI:

```typescript
import { createChatAPI } from './lib/enhancements/chat-api';

const chat = createChatAPI(process.env.MINIMAX_API_KEY!, 'minimax');

const response = await chat.sendMessage({
  message: "Create a fitness app"
});
```

---

## 📁 Project Structure

```
src/
├── lib/
│   ├── ai/providers/       # 5 AI providers
│   ├── platforms/          # Cross-platform generator
│   ├── templates/           # 40+ templates
│   ├── enhancements/       # 10 enhancements
│   │   ├── chat-api.ts    # Chat UI
│   │   ├── cli.ts         # CLI tool
│   │   └── ...
│   ├── validation/         # Store validation
│   └── automation/         # CI/CD & upload
└── app/                   # Next.js app
```

---

## 🔑 Environment Variables

```env
# REQUIRED: MiniMax API Key
# Get from: https://platform.minimax.io/user-center/basic-information/interface-key
MINIMAX_API_KEY=your-key

# Optional: Other AI providers
# ANTHROPIC_API_KEY=sk-ant-...
# OPENAI_API_KEY=sk-...
# GEMINI_API_KEY=AIza...

# Default: minimax (M2.5)
DEFAULT_AI_PROVIDER=minimax
```

---

## 🤝 Contributing

Contributions welcome!

---

## 📄 License

MIT

---

<div align="center">
  <p>Built with ❤️ using Next.js + MiniMax M2.5</p>
</div>
