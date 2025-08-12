
# 🎬 FlipFrame

FlipFrame is a web application that lets you create stunning 2D animations simply by describing them in plain language.  
Powered by **Manim** under the hood, FlipFrame converts your text prompt into Python animation code, renders it via a backend worker, and delivers a ready-to-watch video — all in one seamless flow.

Built with **Next.js**, **FastAPI**, and **Gemini**, FlipFrame is your creative platform for educational, mathematical, and scientific visualizations — no coding required.

---

## ✨ Features

- 🧠 **Prompt-to-Animation** – Describe your animation and get a rendered video in minutes  
- 🎬 **Manim Integration** – Generates mathematically accurate and high-quality visuals  
- ⚡ **FastAPI Worker** – Python-based worker securely processes and renders animations  
- 🔐 **Google OAuth** – Sign in with your Google account  
- 🌐 **Next.js Frontend** – Smooth, responsive UI powered by React and Next.js  

---

## 📂 Project Structure

```

FlipFrame/
├── src/                   # Next.js application (frontend)
├── worker/                # Manim worker service (FastAPI)
├── .env                   # Environment variables
├── bun.lockb              # Bun lockfile
└── README.md              # You're reading it :)

````

---

## ⚙️ Environment Variables

Create a `.env` file in the root with:

```env
# Database
DATABASE_URL=
DIRECT_URL=

# Google OAuth
GOOGLE_CLIENT_ID=
GOOGLE_CLIENT_SECRET=

# Gemini API
GOOGLE_GENERATIVE_AI_API_KEY=

# Auth
NEXTAUTH_SECRET=secret

# Manim Worker URL
WORKER_URL="http://0.0.0.0:8000"
````

---

## 🧱 Tech Stack

* **Frontend**: Next.js 14, React, Tailwind CSS, NextAuth.js, Prisma
* **Backend Worker**: FastAPI, Manim (Python)
* **Authentication**: Google OAuth
* **AI Integration**: Gemini (prompt → code generation)
* **Package Manager**: Bun

---

## 🚀 Getting Started

```bash
bun dev
```

Then open `http://localhost:3000` to start building animations.

---

## 🧪 Example Prompt

```
"Draw a square rotating in place"
```

---

## 🛠 Future Ideas

* Add support for OpenAI and other LLMs
* Integrated code editor
* Public gallery of animations
* More animation templates and themes
* Real-time preview and timeline scrubber

```

Do you want me to **add badges and a small demo screenshot** so this README looks as visually polished as Looma’s? That would make it stand out on GitHub.
```
