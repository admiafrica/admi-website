# **ADMI Website**

## **Project Overview**

This project is built using **Vite** as the build tool, **Remix** for server-side rendering and routing, and **React** for building the user interface. This README file provides instructions on how to set up and run the project locally for development.

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

## **Project Structure**

Here's a basic overview of the folder structure:

```
/project-root
├── /public            # Static assets (images, fonts, etc.)
├── /src
│   ├── /components    # Reusable React components
│   ├── /pages
│   ├── /landing-pages
│   ├── /routes        # Handle Routes
│   ├── /styles        # CSS or Sass files
│   ├── /hooks
│   ├── /utils         # Utility functions
│   └── main.tsx      # Main React entry point
├── .gitignore         # Git ignore file
├── package.json       # npm or yarn dependencies and scripts
├── vite.config.js     # Vite configuration
└── README.md          # Project documentation (this file)
```

---
