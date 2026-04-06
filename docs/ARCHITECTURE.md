# Architecture Overview — SplitStream

SplitStream is a non-custodial, programmable revenue routing protocol built on the Stacks blockchain. It uses a hybrid off-chain/on-chain architecture to manage large-scale revenue distribution efficiently.

## Core Components

- **Off-chain (Backend):** A Node.js/TypeScript service that listens to Web2 revenue events (e.g., Stripe, lemonsqueezy) and prepares batch signal data for the on-chain protocol.
- **On-chain (Smart Contracts):** Clarity-based smart contracts on Stacks that receive signals from the authorized backend and execute non-custodial payouts to predefined stakeholders.
- **Frontend (Vite/React):** A dashboard for stakeholders to view incoming flows, claim history, and configuration of the split streams.

## Key Logic

1. Revenue events are captured by the backend.
2. The backend batches these events to minimize transaction costs.
3. A "commit" transaction is sent to the Stacks blockchain.
4. Smart contracts verify the signal and route funds according to the split logic.
