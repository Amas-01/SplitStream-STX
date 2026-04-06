# SplitStream — Programmable Revenue Routing on Stacks

SplitStream is a non-custodial, programmable revenue routing protocol built on the Stacks blockchain. It enables automated, transparent, and legally-compliant revenue distribution for digital businesses, DAOs, and content creators.

## 🚀 Overview
SplitStream bridges the gap between Web2 revenue streams and Web3 financial execution. By leveraging a hybrid off-chain/on-chain architecture, SplitStream allows businesses to receive payments in traditional fiat or stablecoins and automatically route them to stakeholders on the Stacks blockchain according to predefined, immutable payout rules.

### Usefulness
Traditional revenue splitting is often opaque, manual, and prone to accounting errors. SplitStream solves this by:
- **Ensuring Transparency:** All payout rules are encoded in Clarity smart contracts, visible to all stakeholders.
- **Reducing Overhead:** Automates the distribution of funds, removing the need for monthly manual payouts.
- **Programmability:** Supports complex logic such as dynamic splits, vesting periods, and thresholds.
- **Non-Custodial:** Stakeholders maintain control over their allocated funds; neither the platform nor the backend can divert revenue once signaled by the verified payout logic.

## 🛠 Architecture
- **Backend (Node.js/TS):** Monitors Web2 revenue events and generates batched signals for the blockchain.
- **Smart Contracts (Clarity):** The source of truth for payout rules and secure vault for funds.
- **Frontend (React/Vite):** User dashboard for managing splits and claiming funds.

## 📈 Project Status (Monthly Phases)

### Phase 1 — Month 1: Commit Engine, Cron Infrastructure & Live Deployment
*Currently in Progress*
- [x] Monorepo scaffold initialized (Turborepo).
- [x] Tooling setup: ESLint, Prettier, Husky, lint-staged.
- [x] Contracts workspace initialized (Clarinet).
- [x] Backend workspace scaffold with Express and TS.
- [x] Frontend workspace scaffold with Vite and React.
- [/] Cron Infrastructure & On-chain batch signal logic (Upcoming).

---
*For more detailed protocols, see [docs/ARCHITECTURE.md](./docs/ARCHITECTURE.md).*
