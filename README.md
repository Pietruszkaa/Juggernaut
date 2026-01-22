# 🚧 The bot is in early development
>*This README is a quick draft. Many things can and will change. You may encounter many errors (even in this README)*

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
  <img src="https://readme-typing-svg.herokuapp.com?font=Fira+Code&pause=1000&color=FF7B00&center=true&vCenter=true&width=435&lines=Robust+Discord+Bot+🤖;Web+Dashboard+Included+🌐;Powered+by+TypeScript+🔥"
       alt="Typing SVG" />
</p>

<p align="center">
  <img src="https://img.shields.io/badge/Status-Development-orange?style=for-the-badge" />
  <img src="https://img.shields.io/github/last-commit/Pietruszkaa/Juggernaut?style=for-the-badge&color=FF7B00" />
  <img src="https://img.shields.io/github/stars/Pietruszkaa/Juggernaut?style=for-the-badge&color=FF7B00" />
  <img src="https://img.shields.io/github/issues/Pietruszkaa/Juggernaut?style=for-the-badge&color=FF7B00" />
<br>
  <img src="https://img.shields.io/badge/TypeScript-5.9-3178C6?style=for-the-badge&logo=typescript&logoColor=white" />
  <img src="https://img.shields.io/badge/Discord.js-14.25-5865F2?style=for-the-badge&logo=discord&logoColor=white" />
<br>
  <img src="https://img.shields.io/github/license/Pietruszkaa/Juggernaut?style=for-the-badge&color=FF7B00" />
</p>

</div>

---

### ⚔️ About The Project

**Juggernaut** is a powerful, general-purpose Discord bot designed for stability and ease of management. Unlike simple bots, Juggernaut comes with a dedicated **Web Dashboard** (Express.js) allowing for easy configuration and monitoring.

Built with **TypeScript** for type safety and **Chokidar** for advanced hot-reloading during development.

> *"Constructed to handle the chaos."*

---

### 🌟 Key Features

- 🤖 **Modular Bot Core** — clean architecture using `discord.js`
- 🌐 **Web Dashboard** — external management via `Express`
- ⚡ **Hot Reloading** — instant updates in dev mode using `chokidar`
- 🛡️ **Type Safety** — full `TypeScript` support (`tsx`, `ts-node`)

---

### 🛠️ Tech Stack

<div align="center">
  <img src="https://skillicons.dev/icons?i=ts,nodejs,discord,express,vscode" />
</div>

<div align="center">
  
| Package                 | Purpose                               |
| :---------------------: | :-----------------------------------: |
| **Node.js**             | JavaScript runtime (v20+ recommended) |
| **TypeScript**          | Type-safe development                 |
| **discord.js** `^14.25` | Discord API wrapper                   |
| **express** `^5.2`      | Web dashboard backend                 |
| **chokidar** `^5.0`     | File watcher for hot reload           |
| **tsx** `^4.21`         | Fast TypeScript execution             |

</div>

---

### 🚀 Getting Started

The project is split into **Bot** and **Dashboard** — both run independently.

### Prerequisites

- **Node.js** `v20+`
- **npm**

---

### 1️⃣ Bot Installation

```bash
cd bot
npm install
```

Create a .env file in the bot/ directory:

```env
DISCORD_TOKEN=your_discord_bot_token
```

Run the bot:

```bash
npm run dev   # Watch mode (Auto-reload)
npm run start     # Production mode
```

---

### 2️⃣ Dashboard Installation

Navigate to the dashboard directory:

```bash
cd dashboard
npm install
```

Run the dashboard:

```bash
npm run dev   # Watch mode (Auto-reload)
npm run start     # Production mode
```

>⚠️ The dashboard does not use a .env file yet. Configuration will be added in future versions.

---

### ⚙️ Environment Variables

Bot (bot/.env)

| Variable | Description |
| :---: | :---: |
| `DISCORD_TOKEN` |	Discord bot token |
>More variables (database, guild config, permissions, etc.) will be added later.

Dashboard (dashboard/.env)

>Not implemented yet — planned for future releases.

---

### 🗺️ Roadmap

 - [ ] Base bot architecture (95% Done)

 - [ ] Command & event system

 - [ ] Per-guild configuration (95% Done)

 - [ ] Web dashboard settings

 - [ ] Database integration

 - [ ] Permissions & roles system
>This section will be updated as development progresses.

---

### 📮 Feedback / Issues

Juggernaut is still in early development.
If you encounter bugs, have ideas, or suggestions (mainly ideas and suggestions) — please use GitHub Issues.

 - 🐞 Bug reports

 - 💡 Feature requests

 - 🧠 Architecture suggestions

All feedback is welcome 🙌

---

### 📄 License

This project is licensed under the MIT License.

<div align="center">

<img src="https://capsule-render.vercel.app/api?type=waving&color=FF7B00&height=200&section=footer" width="100%" />

<p align="center"> Created by <a href="https://www.google.com/search?q=https://github.com/Pietruszkaa"><b>Piotr Szpont</b></a> </p>

</div>
