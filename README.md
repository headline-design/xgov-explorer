# xGov Explorer

<div align="center">
  <img src="/public/images/favicon-96x96.png" alt="xGov Explorer Logo" width="200" />
  <h3>Discover and track Algorand xGov-funded projects</h3>
  <p>An open source platform for the Algorand community to explore, monitor, and celebrate xGov award recipients</p>

  [![License: MIT](https://img.shields.io/badge/License-MIT-blue.svg)](https://opensource.org/licenses/MIT)
  [![Algorand](https://img.shields.io/badge/Powered%20by-Algorand-black)](https://www.algorand.com/)
  [![GitHub Stars](https://img.shields.io/github/stars/headline-design/xgov-explorer?style=social)](https://github.com/headline-design/xgov-explorer)
  [![Twitter Follow](https://img.shields.io/twitter/follow/headline_crypto?style=social)](https://twitter.com/headline_crypto)
</div>

## 🌟 About xGov Explorer

xGov Explorer is an open source platform designed to showcase the best projects that have been awarded funding through the Algorand Foundation's xGov community governance program. Our mission is to increase visibility for these innovative projects, track their progress, and foster community engagement within the Algorand ecosystem.

The platform serves as a central hub where:

- Community members can discover and learn about xGov-funded projects
- Project teams can claim their proposals and provide progress updates
- The Algorand community can track the development and impact of funded initiatives
- Users can read and engage with blog content about xGov projects and ecosystem updates

## ✨ Key Features

- **Project Discovery**: Browse and search through all xGov-funded projects
- **Detailed Project Profiles**: View comprehensive information about each project, including funding details, team information, and progress updates
- **Progress Tracking**: Monitor the development status and milestone completion of projects
- **Team Verification**: GitHub-based verification system for project teams to claim their proposals
- **Progress Updates**: Authenticated team members can post progress updates to keep the community informed
- **Blog Platform**: Content management system with social features like comments, likes, and bookmarks
- **Responsive Design**: Optimized for both desktop and mobile viewing

## 🔐 Authentication & Wallet Integration

xGov Explorer features comprehensive Algorand wallet integration:

- **Sign In With Algorand (SIWA)**: Seamless authentication using @avmkit/siwa 1.0.8
- **VMKit Integration**: AVM support via @vmkit/connect-avm 0.0.1
- **Multiple Wallet Support**:
  - Pera Wallet (@perawallet/connect 1.4.2)
  - Defly Wallet (@blockshake/defly-connect 1.2.1)
  - Lute Wallet (lute-connect 1.4.1)
  - WalletConnect (@walletconnect/modal 2.7.0)
- **AVM Web Provider**: Integrated with @agoralabs-sh/avm-web-provider 1.7.0
- **Unified Wallet Interface**: Using @txnlab/use-wallet 4.0.0 and @txnlab/use-wallet-react 4.0.0

## 📝 Blog Features

The xGov Explorer includes a full-featured blog platform:

- **Content Management**: Markdown-based content creation with Contentlayer2
- **Social Engagement**: Like, comment, and bookmark articles
- **Author Profiles**: Dedicated author pages with social links
- **Related Articles**: Smart recommendation system for related content
- **Categories & Tags**: Organize and filter content by topics
- **Reading Experience**: Optimized reading layout with table of contents
- **SEO Optimization**: Automatic OG image generation and metadata

## 🛠️ Tech Stack

xGov Explorer is built with modern web technologies:

- **Frontend**: Next.js 15.1.0, React 19.0.0, TypeScript 5.x, Tailwind CSS 3.4.17
- **Backend**: Next.js API Routes, Prisma ORM 5.10.0
- **Database**: PostgreSQL with Prisma Accelerate (@prisma/extension-accelerate 0.6.3)
- **Authentication**:
  - NextAuth.js 4.24.5 with GitHub OAuth
  - Sign In With Algorand (@avmkit/siwa 1.0.8)
  - Iron Session 8.0.1 for session management
- **Content**: Contentlayer2 0.4.6 for type-safe content management
- **Styling**:
  - Tailwind CSS with Radix UI components
  - Lucide React 0.479.0 for icons
  - Tailwind Typography plugin 0.5.16
- **Algorand Integration**:
  - AlgoSDK 3.2.0
  - VMKit (@vmkit/connect-avm 0.0.1)
  - AVM Web Provider (@agoralabs-sh/avm-web-provider 1.7.0)
  - Multiple wallet connectors (Pera, Defly, Lute, WalletConnect)
- **State Management**: TanStack Query 5.24.1
- **Markdown Processing**:
  - Remark 15.0.1 with plugins (remark-gfm, remark-code-import)
  - Rehype with plugins (rehype-slug, rehype-autolink-headings, rehype-pretty-code)
- **Development**: Turbopack, Concurrently 8.0.1, ESLint 9
- **Deployment**: Vercel

## 🚀 Getting Started

### Prerequisites

- Node.js 20.x or later
- PostgreSQL database
- GitHub OAuth credentials
- Algorand development environment (for wallet authentication)

### Installation

1. Clone the repository:

   ```bash
   git clone https://github.com/headline-design/xgov-explorer.git
   cd xgov-explorer
