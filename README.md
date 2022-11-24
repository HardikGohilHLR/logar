[![Logar](./assets/logar-banner.png)](https://logar-app.netlify.app/)

# Logar 🔐

### Secure Authentication, Simplified.

Logar is an open-source authentication system built with **Next.js**, **Clerk**, **Supabase**, **Drizzle ORM**, **Tailwind CSS**, and **ShadCN UI**. It provides essential authentication features such as login, signup, password reset, and profile management with a modern, user-friendly interface.

[![License](https://badgen.net/github/license/HardikGohilHLR/logar?color=green&label=License)](LICENSE)
[![Stars](https://badgen.net/github/stars/HardikGohilHLR/logar?color=orange&label=Stars)](https://github.com/HardikGohilHLR/logar/stargazers)
[![Issues](https://badgen.net/github/open-issues/HardikGohilHLR/logar?label=Open+Issues)](https://github.com/HardikGohilHLR/logar/issues)

## 🚀 What's Inside

- 🔐 **User Authentication** (Login, Signup, Logout)
- 🔄 **Password Management** (Forgot Password, Reset Password)
- 🛠 **Profile Management** (Update user details)
- 🏗 **Built with Clerk for authentication**
- 🗄 **Supabase for database management**
- ⚡ **Next.js for a fast and scalable frontend**
- 🎨 **Styled with Tailwind CSS & ShadCN UI**
- 🛢 **Drizzle ORM for database interaction**

## 🎯 Get Started

Check out the live version: [Logar App](https://logar-app.netlify.app/)

```sh
# Clone the repository
git clone https://github.com/HardikGohilHLR/logar.git
cd logar

# Install dependencies
npm install

# Run development server
npm run dev
```

Your application will be available at `http://localhost:3000`

## 📜 Environment Setup

Create a `.env.local` file and add the required credentials:
```sh
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=
CLERK_SECRET_KEY=

NEXT_PUBLIC_API_URL=

NEXT_PUBLIC_GITHUB_REPO=

NEXT_PUBLIC_DATABASE_URL=
```

## 📦 Database Migration with Drizzle ORM & Supabase

Ensure you have **Supabase** setup:

### Step 1: Generate a Migration
```sh
npm run generate
```

### Step 2: Apply Migration to Supabase
```sh
npm run migrate
```

### Step 3: Verify Database Changes
1. Log in to [Supabase](https://supabase.com).
2. Select your project.
3. Navigate to **Database → Tables** and confirm the updates.

## 🤝 Want to Contribute?

We welcome contributions from the community! Follow these steps to contribute:

1. **Fork the repository** on GitHub.
2. **Clone your forked repo:**
   ```sh
   git clone https://github.com/your-username/logar.git
   ```
3. **Create a new branch:**
   ```sh
   git checkout -b feature-name
   ```
4. **Make your changes and commit:**
   ```sh
   git commit -m "Add new feature"
   ```
5. **Push to your fork:**
   ```sh
   git push origin feature-name
   ```
6. **Open a Pull Request (PR)** to the main repository.

## 🌟 Need Help?

- [Found a bug?](https://github.com/HardikGohilHLR/logar/issues)
- [Have an idea?](https://github.com/HardikGohilHLR/logar/issues/new?assignees=&labels=enhancement,feature&projects=&template=features.yml&title=[feature]+-+)
- [Discussions](https://github.com/HardikGohilHLR/logar/discussions)

## 📜 License

Logar is under the [MIT license](./LICENSE).
