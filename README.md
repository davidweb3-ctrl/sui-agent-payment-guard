# Sui Agent Payment Guard

Sui Agent Payment Guard is a Sui Overflow 2026 project for AI-agent payment safety.

It gives builders a simple pattern for reviewing an AI-generated payment intent before execution and recording a tamper-evident receipt on Sui testnet. The receipt stores the recipient, asset, amount, policy limit, model hash, intent hash, risk score, approval result, and timestamp.

## Why It Matters

AI agents are starting to initiate swaps, payments, and API-driven financial actions. Teams need a lightweight way to prove that an intent was reviewed against policy before value moved. This project focuses on non-custodial guardrails: it records approval evidence, but it does not custody funds, route swaps, or move user assets.

## Components

- `move/`: Sui Move package for payment intent receipts.
- `app/`: Frontend demo for risk review and receipt preparation.
- `assets/logo.svg`: Project logo source.

## Public Links

- Frontend: https://davidweb3-ctrl.github.io/sui-agent-payment-guard/
- Repository: https://github.com/davidweb3-ctrl/sui-agent-payment-guard
- Demo video: https://github.com/davidweb3-ctrl/sui-agent-payment-guard/raw/main/demo/sui-agent-payment-guard-demo.mp4

## Submission Plan

- Track: The Agentic Web
- Secondary fit: DeFi & Payments
- Network: Sui testnet
- Current package ID: `0x1ce6fad928570d68e70951e01e8f586e66692d34680216be915b47b7d7618999`
- First receipt tx: `DVErKPpFTZNZCf7D4NXeChH7KFnwbWvPXFPFthLTzBkS`
- Required DeepSurge fields still needed: final form submission.

## Testnet Evidence

- Initial publish tx: `2vHzkGjCRTCdhhSdDGswcJv1Cn9Tc4FwW68Cg6qPo8jg`
- Upgrade tx for the current package: `4gGgwTwyVGQ4o3fE2c2tvU8KrQhs9ySVx4mqnHM23bFE`
- First receipt object: `0x6d3f9b22cc33c1ecccbb9b233de80b69774e0013fc0a5a3a18fad8a743a20546`

## Safety Boundaries

- Testnet first.
- No mainnet SUI spend without explicit approval.
- No private keys, wallet seeds, or API secrets in this repository.
