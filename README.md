# 🚀 Nuxt 4 with GraphQL Yoga

A modern, high-performance Nuxt 4 starter template with GraphQL Yoga integration for building robust GraphQL APIs.

## ✨ Introduction

This project demonstrates how to integrate GraphQL Yoga with Nuxt 4, providing a powerful backend for your Nuxt applications. GraphQL Yoga is a fully-featured GraphQL server with focus on easy setup, performance and great developer experience.

## 🔗 GraphQL Yoga Integration

This template comes with pre-configured GraphQL Yoga setup:

- 🌐 Accessible GraphQL API endpoint at `/api/graphql`
- 💓 Health check endpoint at `/api/graphql/health`
- 🧪 Interactive Apollo Sandbox for testing queries
- 📋 Server-side schema definition and resolvers
- 🛡️ Type-safe integration with Nuxt's Nitro server

## 📘 Features

- ⚡ Fast setup with minimal configuration
- 🔄 Hot Module Replacement during development
- 📱 Built-in responsive Apollo Sandbox interface
- 🧩 Modular schema design
- 🔒 Type-safe GraphQL implementation

## 📚 Learn More

- [GraphQL Yoga Documentation](https://the-guild.dev/graphql/yoga-server)
- [Nuxt Documentation](https://nuxt.com/docs)
- [Apollo Sandbox Documentation](https://www.apollographql.com/docs/studio/explorer/sandbox)


## 📊 Using the GraphQL API

Once your server is running, you can:

1. Access the Apollo Sandbox by navigating to `/api/graphql`
2. Test the API with a simple query:
```graphql
query {
  hello
  ping
}
```
3. Integrate with your frontend using your favorite GraphQL client

## 🛠️ Setup

Make sure to install dependencies:

```bash
# npm
npm install

# pnpm
pnpm install

# yarn
yarn install

# bun
bun install
```

## 🧑‍💻 Development Server

Start the development server on `http://localhost:3000`:

```bash
# pnpm
pnpm dev
```

## 🏭 Production

Build the application for production:

```bash
# pnpm
pnpm build
```

Locally preview production build:

```bash
# pnpm
pnpm preview
```

Check out the [deployment documentation](https://nuxt.com/docs/getting-started/deployment) for more information.


---

Made with ❤️ by [productdevbook](https://github.com/productdevbook) | [GitHub](https://github.com/productdevbook) | [Website](https://productdevbook.com)
