# 🚀 React Vite Starter

A scalable React starter template built with **React 19**, **TypeScript**, and **Vite**, preconfigured with modern tools and best practices for building maintainable web applications.

> This repository serves as my personal boilerplate for rapidly starting new React projects with a clean architecture and production-ready setup.

---

## ✨ Features

- ⚛️ React 19
- ⚡ Vite 8
- 🟦 TypeScript
- 🛣️ React Router DOM
- 🌐 Axios
- 🔄 TanStack Query
- 🐻 Zustand
- 📝 React Hook Form
- ✅ Zod Validation
- 🎨 Tailwind CSS *(optional)*
- 🧹 ESLint
- 💅 Prettier
- 📂 Path Alias (`@`)
- 🌱 Environment Variables
- 📦 Axios Instance
- 📐 Scalable Folder Structure

---

## 📁 Project Structure

```text
src
│
├── api                 # Axios instance & API configuration
│
├── assets              # Images, icons, fonts
│
├── components
│   ├── common          # Shared reusable components
│   └── ui              # UI components
│
├── hooks               # Custom React hooks
│
├── layouts             # Application layouts
│
├── pages               # Application pages
│
├── providers           # Global providers
│
├── routes              # React Router configuration
│
├── services            # Business logic / API calls
│
├── store               # Zustand stores
│
├── styles              # Global styles
│
├── types               # Global TypeScript types
│
├── utils               # Helper functions
│
├── App.tsx
├── main.tsx
└── vite-env.d.ts
```

---

## 🛠 Tech Stack

| Category | Technology |
|----------|------------|
| Framework | React 19 |
| Build Tool | Vite 8 |
| Language | TypeScript |
| Routing | React Router |
| HTTP Client | Axios |
| Server State | TanStack Query |
| Global State | Zustand |
| Forms | React Hook Form |
| Validation | Zod |
| Linting | ESLint |
| Formatting | Prettier |

---

## 🚀 Getting Started

### Clone Repository

```bash
git clone https://github.com/your-username/react-vite-starter.git
```

### Install Dependencies

```bash
npm install
```

### Start Development Server

```bash
npm run dev
```

### Build Project

```bash
npm run build
```

### Preview Build

```bash
npm run preview
```

---

## 🌱 Environment Variables

Copy

```text
.env.example
```

to

```text
.env
```

Example:

```env
VITE_API_URL=http://localhost:3000/api
```

---

## 📦 Available Scripts

```bash
npm run dev
```

Run development server.

```bash
npm run build
```

Build production bundle.

```bash
npm run preview
```

Preview production build.

```bash
npm run lint
```

Run ESLint.

---

## 📐 Architecture

This starter follows a layered architecture.

```
Pages
    │
    ▼
Components
    │
    ▼
Services
    │
    ▼
Axios
    │
    ▼
Backend API
```

Global state is managed with Zustand, while asynchronous server state is handled by TanStack Query.

---

## 📚 Included Configuration

- React Router configured
- Query Client Provider
- Axios Instance
- Path Alias (`@`)
- TypeScript
- ESLint
- Prettier
- Environment Variables

---

## 📝 Recommended Workflow

1. Create a new repository using **Use this template**
2. Rename the project
3. Configure `.env`
4. Start building features
5. Commit frequently using Conventional Commits

---

## 🗺 Roadmap

### Current

- [x] React 19
- [x] Vite 8
- [x] TypeScript
- [x] React Router
- [x] Axios
- [x] TanStack Query
- [x] Zustand
- [x] React Hook Form
- [x] Zod
- [x] ESLint
- [x] Prettier

### Planned

- [ ] Authentication Example
- [ ] Theme Provider
- [ ] Dark Mode
- [ ] Toast Provider
- [ ] Error Boundary
- [ ] Loading Component
- [ ] Empty State Component
- [ ] 404 Page
- [ ] Husky + lint-staged
- [ ] GitHub Actions CI
- [ ] Docker Support
- [ ] Storybook
- [ ] Unit Testing (Vitest)
- [ ] E2E Testing (Playwright)

---

## 🤝 Contributing

Feel free to fork this repository or open an issue if you have suggestions for improvements.

---

## 📄 License

This project is licensed under the MIT License.

---

## ⭐ Support

If you find this starter useful, consider giving it a ⭐ on GitHub.