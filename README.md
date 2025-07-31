# **ADMI Website**

## **Project Overview**

This project is built using Nextjs for server-side rendering and routing, and **React** for building the user interface.

This README file provides instructions on how to set up and run the project locally for development.

## **Table of Contents**

1. [Getting Started](#getting-started)
2. [Installation](#installation)
3. [Running the Development Server](#running-the-development-server)
4. [Building for Production](#building-for-production)
5. [Project Structure](#project-structure)
6. [License](#license)

---

## **Getting Started**

To get started with this project, you'll need to have **Node.js** and **npm** (or **yarn**) installed on your machine.

### **Prerequisites**

- **Node.js** (v14.x or higher)
- **npm** (v6.x or higher) or **yarn**

If you don't have Node.js installed, you can download it from [nodejs.org](https://nodejs.org).

---

## **Installation**

1. **Clone the repository:**

   ```bash
   git clone https://github.com/admi-tech/admi-website.git
   ```

2. **Navigate to the project directory:**

   ```bash
   cd admi-website
   ```

3. **Install the dependencies:**
   If you're using `npm`:

   ```bash
   npm install
   ```

   If you're using `yarn`:

   ```bash
   yarn install
   ```

4. **Create the `.env` variables file from the template and update accordingly:**

   ```bash
   cp .env.template .env
   ```

---

## **Running the Development Server**

To start the development server:

If you're using `npm`:

```bash
npm run dev
```

If you're using `yarn`:

```bash
yarn dev
```

This will start a local development server at `http://localhost:3000`, where you can see your Remix + React app in action.

---

## **Building for Production**

To build the project for production, run:

If you're using `npm`:

```bash
npm run build
```

If you're using `yarn`:

```bash
yarn build
```

This command will create an optimized production build in the `/dist` directory.

---

## **Available Scripts**

### Development Scripts
- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run start` - Start production server
- `npm run lint` - Run ESLint
- `npm run lint:fix` - Fix ESLint issues
- `npm run type-check` - Check TypeScript types

### Blog Generation Scripts
- `npm run blog:daily` - Generate 2 blog articles
- `npm run blog:weekly` - Generate 7 blog articles
- `npm run blog:stats` - View blog generation statistics
- `npm run blog:generate batch 5` - Generate custom number of articles

### Contentful Scripts
- `npm run contentful:check` - Check Contentful content types

For more detailed information about scripts, see `/scripts/README.md`.

---

## **Project Structure**

Here's a basic overview of the folder structure:

```
/project-root
├── /public            # Static assets (images, fonts, etc.)
├── /src
│   ├── /components    # Reusable React components
│   ├── /layouts       # Page layout components
│   ├── /pages         # Website Related pages
│   ├── /campaigns     # Campaign Related Pages
│   ├── /styles        # CSS or Sass files
│   ├── /hooks         # Custom hooks
│   ├── /utils         # Utility functions
│   └── main.tsx       # Main React entry point
├── /scripts           # Utility scripts
│   ├── /blog-generation  # Automated blog content generation
│   ├── /contentful      # Contentful CMS management
│   ├── /setup           # Setup and configuration scripts
│   └── /tests           # Test scripts (dev only)
├── .gitignore         # Git ignore file
├── package.json       # npm or yarn dependencies and scripts
├── next.config.mjs    # Nextjs configuration
└── README.md          # Project documentation (this file)
```

---

## **License**

Update License

---
# Force redeploy to pick up IAM changes - Thu Jul 31 18:39:10 BST 2025
