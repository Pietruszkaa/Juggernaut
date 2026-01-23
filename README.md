# 🚧 Juggernaut — Early Development (dev branch)

> **Status: Early Development**
>
> This repository contains an early development version of **Juggernaut**.
> The architecture is actively evolving and some features are placeholders.
> APIs and internal structures may change before the first stable release.

---

<div align="center">

<img src="https://capsule-render.vercel.app/api?type=waving&color=FF7B00&height=200&section=header&text=Juggernaut&fontSize=80&animation=fadeIn&fontAlignY=35" width="100%" />

<a href="https://github.com/Pietruszkaa/Juggernaut">
  <img src="https://github.com/user-attachments/assets/b6b81c68-8bce-4ec0-8cb7-946fcfa2bb99"
       width="180"
       height="180"
       style="border-radius: 20%;"
       alt="Juggernaut Logo" />
</a>

<p align="center">
  <img src="https://readme-typing-svg.herokuapp.com?font=Fira+Code&pause=1000&color=FF7B00&center=true&vCenter=true&width=500&lines=Modular+Discord+Bot+Platform;DevTools+%26+Dashboard+API;Built+with+TypeScript"
       alt="Typing SVG" />
</p>

<p align="center">
  <img src="https://img.shields.io/badge/Status-Development-orange?style=for-the-badge" />
  <img src="https://img.shields.io/github/last-commit/Pietruszkaa/Juggernaut?style=for-the-badge&color=FF7B00" />
  <img src="https://img.shields.io/github/stars/Pietruszkaa/Juggernaut?style=for-the-badge&color=FF7B00" />
  <img src="https://img.shields.io/github/issues/Pietruszkaa/Juggernaut?style=for-the-badge&color=FF7B00" />
  <br>
  <img src="https://img.shields.io/badge/TypeScript-5.x-3178C6?style=for-the-badge&logo=typescript&logoColor=white" />
  <img src="https://img.shields.io/badge/Discord.js-14.x-5865F2?style=for-the-badge&logo=discord&logoColor=white" />
</p>

</div>

---

### ⚔️ About the Project

**Juggernaut** is a modular, general-purpose Discord bot platform focused on:

- long-term maintainability
- clear architectural boundaries
- runtime observability
- future self-hosting and SaaS readiness

The project is **not a simple bot**, but a foundation for building and managing Discord bot functionality in a structured and scalable way.

> *"Constructed to handle the chaos."*

---

### 🌟 Current Features (dev)

- 🤖 **Modular Bot Core**
  - Module registry and lifecycle
  - Clear separation between core and features

- 🧩 **Commands & Events System**
  - Central handlers
  - Type-safe contracts
  - Discord.js v15-ready usage

- 🔐 **Permissions & Per-Guild Control**
  - Discord permissions
  - Owner-only commands
  - Per-guild command enable/disable
 
- 🌍 Internationalization (i18n)
  - JSON-based translations
  - Runtime reload via file watcher

- 🧠 **DevTools Module**
  - Owner-only administrative commands
  - Runtime status & module inspection
  - Reload command (placeholder for future runtime reloads)

- 🌐 **Dashboard API (Read-Only)**
  - Express-based HTTP API
  - Exposes bot, guild and module state
  - Designed for future web dashboard

- 🗄️ **Config System (DB-ready)**
  - Per-guild configuration
  - Storage adapter pattern
  - File-based storage for dev (database planned)

- 🛡️ **Type-Safe Architecture**
  - Full TypeScript codebase
  - No deprecated Discord APIs
  - Strong runtime boundaries

---

### 🛠️ Tech Stack

<div align="center">
  <img src="https://skillicons.dev/icons?i=ts,nodejs,discord,express,vscode" />


| Technology            | Purpose                                  |
|-----------------------|------------------------------------------|
| Node.js (v20+)        | Runtime                                  |
| TypeScript            | Type-safe development                    |
| discord.js ^14.x      | Discord API wrapper (v15-ready usage)    |
| Express               | Dashboard API                            |
| tsx                   | Fast TypeScript execution                |
| chokidar              | File watching for i18n reload

</div>

---

### 🚀 Getting Started (Development)

> The bot and dashboard API run in a **single Node.js process**.

### Prerequisites

- Node.js `v20+`
- npm

---

### Installation

```bash
git clone https://github.com/Pietruszkaa/Juggernaut.git
cd Juggernaut
npm install
```
Create .env file in the project root:

```env
BOT_TOKEN=your_discord_bot_token
OWNER_ID=your_discord_user_id
```

Run in development mode:

```bash
npm run dev
```

---

### Dashboard API (dev)
Once the bot is running, the dashboard API is available at:

```bash
http://localhost:3000/api
```

Available endpoints (read-only):

 - `/api/health`
 - `/api/modules`
 - `/api/guilds`
 - `/api/configs`

>⚠️ Authentication is not implemented yet (planned).

---

### 🧪 DevTools
Owner-only Discord commands for runtime inspection:

 - `/dev-status` — bot uptime & memory usage
 - `/dev-modules` — loaded modules
 - `/dev-reload` — placeholder (no runtime reload yet)

---

### 🌍 Internationalization (i18n)

Juggernaut includes an internationalization system with runtime translation reload
(using a file watcher).

**Current status:**
- 🇬🇧 English (`en`) is the only fully implemented language
- 🇵🇱 Polish (`pl`) files exist but are currently empty placeholders

The i18n structure is prepared for future translations and language expansion.

---

### 🗺️ Roadmap (High-Level)

 - [ ] Per-module enable / disable
 - [ ] Runtime config reload
 - [ ] Dashboard authentication (OAuth2)
 - [ ] Editable config via dashboard
 - [ ] Database-backed config storage
 - [ ] Feature flags
 - [ ] Public/self-hosted deployment support

---

### 🔓 Open Source & Self-Hosting
Juggernaut is open source and designed with self-hosting in mind.

 - You can run it on your own infrastructure
 - Full control over configuration and features
 - Architecture prepared for hosted / SaaS offerings in the future

--- 

### 📮 Feedback & Issues
This is an early development project.
If you encounter bugs, have ideas, or want to discuss architecture decisions:

 - open a GitHub Issue
 - start a discussion
 - leave suggestions

All feedback is welcome.

---

### 📄 License

This project is licensed under the MIT License.

<div align="center"> <img src="https://capsule-render.vercel.app/api?type=waving&color=FF7B00&height=200&section=footer" width="100%" /> <p align="center"> Created by <a href="https://www.google.com/search?q=https://github.com/Pietruszkaa"><b>Piotr Szpont</b></a> </p> 
</div> 
