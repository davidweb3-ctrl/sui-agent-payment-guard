# DeepSurge Submission Draft

## Basic Information

Project logo:

```text
assets/logo-512.png
```

Project name:

```text
Sui Agent Payment Guard
```

Track:

```text
The Agentic Web
```

Bounty:

```text
Core Track
```

Deployment network:

```text
Testnet
```

Package ID:

```text
0x1ce6fad928570d68e70951e01e8f586e66692d34680216be915b47b7d7618999
```

## Description

Sui Agent Payment Guard is a non-custodial safety layer for AI-agent payment workflows on Sui. It lets a user or agent operator review a payment intent against a simple policy before execution, then records a tamper-evident intent receipt on Sui testnet.

The Move package stores the recipient, asset symbol, amount, policy limit, model hash, intent hash, risk score, approval result, and timestamp. The frontend demonstrates the review flow by scoring an agent-generated payment request, generating an intent hash, and showing how the receipt maps to the `payment_guard::record_intent` Move function.

The project is built for agentic commerce and payment automation: it does not custody funds, route swaps, or move user assets by default. Instead, it creates auditable proof that an AI-agent payment intent was reviewed before value moved.

## Links

Project repo:

```text
https://github.com/davidweb3-ctrl/sui-agent-payment-guard
```

Website:

```text
https://davidweb3-ctrl.github.io/sui-agent-payment-guard/
```

Demo video:

```text
Pending demo recording
```

## Current Test Evidence

```text
sui move build
npm run build
```

Both pass locally. The Sui testnet package is published and a first receipt transaction has been executed.

```text
Publish tx: 2vHzkGjCRTCdhhSdDGswcJv1Cn9Tc4FwW68Cg6qPo8jg
Upgrade tx: 4gGgwTwyVGQ4o3fE2c2tvU8KrQhs9ySVx4mqnHM23bFE
First receipt tx: DVErKPpFTZNZCf7D4NXeChH7KFnwbWvPXFPFthLTzBkS
First receipt object: 0x6d3f9b22cc33c1ecccbb9b233de80b69774e0013fc0a5a3a18fad8a743a20546
```
