# 🍳 Servd — AI Recipe Platform SaaS

Servd is a **full-stack AI-powered recipe platform** that helps users turn available ingredients into personalized recipes using generative AI. It combines modern web technologies, AI integration, and a scalable backend to deliver a seamless cooking experience.

---

## ✨ Features

### 📸 AI Pantry Scanner
Upload an image of your fridge or pantry, and AI automatically detects ingredients.

### 🍳 Smart Recipe Generation
Generate step-by-step recipes based on available ingredients, dietary preferences, and cooking time.

### 📄 PDF Export
Download professionally formatted recipes as PDFs for easy sharing and offline use.

### 🔖 Personal Cookbook
Save, organize, and manage your favorite recipes in one place.

### 💎 Pro Tier Features
- Nutrition analysis
- Chef-level cooking tips
- Ingredient substitutions
- Unlimited AI scans

### 📱 Fully Responsive UI
Optimized for mobile, tablet, and desktop devices.

---

## 🛠️ Tech Stack

### Frontend
- Next.js 16 (App Router)
- React 19
- Tailwind CSS
- shadcn/ui

### Backend / CMS
- Strapi (Headless CMS)
- PostgreSQL (Neon DB - Serverless)

### Authentication & Security
- Clerk Authentication (Google OAuth)
- Arcjet (Bot protection & rate limiting)

### AI & APIs
- Google Gemini AI (Recipe generation & image recognition)
- Unsplash API (Food images)

### Utilities
- React-PDF (Recipe export system)

---

## 🏗️ System Architecture

flowchart TD

%% ======================
%% Nodes
%% ======================

A[User Browser]

B[Next.js 16 Frontend<br/>React 19 + Tailwind + shadcn/ui]

C[Clerk Auth<br/>Google OAuth]

D[API Layer<br/>Next.js Server Actions]

E[Strapi CMS]

F[(PostgreSQL<br/>Neon DB)]

G[Google Gemini AI<br/>Recipe Generation + Vision]

H[Unsplash API<br/>Food Images]

I[Arcjet Security<br/>Rate Limiting + Bot Protection]

%% ======================
%% Connections
%% ======================

A --> B
B --> C
B --> D

D --> E
E --> F

D --> G
D --> H
D --> I

G --> D
H --> B

%% ======================
%% Styling
%% ======================

classDef frontend fill:#4F46E5,stroke:#ffffff,color:#ffffff,stroke-width:2px;
classDef auth fill:#10B981,stroke:#ffffff,color:#ffffff,stroke-width:2px;
classDef api fill:#F59E0B,stroke:#ffffff,color:#ffffff,stroke-width:2px;
classDef cms fill:#EF4444,stroke:#ffffff,color:#ffffff,stroke-width:2px;
classDef db fill:#0EA5E9,stroke:#ffffff,color:#ffffff,stroke-width:2px;
classDef ai fill:#8B5CF6,stroke:#ffffff,color:#ffffff,stroke-width:2px;
classDef security fill:#111827,stroke:#ffffff,color:#ffffff,stroke-width:2px;

%% ======================
%% Apply Styles
%% ======================

class A,B frontend;
class C auth;
class D api;
class E cms;
class F db;
class G,H ai;
class I security;
