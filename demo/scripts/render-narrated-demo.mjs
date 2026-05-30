import { mkdir, writeFile } from "node:fs/promises";
import { createRequire } from "node:module";
import path from "node:path";
import { pathToFileURL } from "node:url";

const require = createRequire("/tmp/pw-record/package.json");
const { chromium } = require("playwright");

const root = "/Users/xiadawei/codeSpace/web3/hackathon/sui-agent-payment-guard";
const outDir = path.join(root, "demo/rendered/narrated");
const audioDir = path.join(root, "demo/audio/narrated");

const slides = [
  {
    id: "01-title",
    title: "Sui Agent Payment Guard",
    eyebrow: "Sui Overflow 2026 / The Agentic Web",
    body:
      "A non-custodial safety layer for AI-agent payment workflows on Sui. It reviews a payment intent before execution and records policy evidence on testnet.",
    narration:
      "Sui Agent Payment Guard is a Sui Overflow 2026 project for safer AI-agent payments. It reviews agent generated payment intents before execution and records auditable policy evidence on Sui testnet.",
    chips: ["Sui testnet", "AI agents", "Payment safety"],
  },
  {
    id: "02-problem",
    title: "The Problem",
    eyebrow: "Autonomous payments need guardrails",
    body:
      "Agents can request swaps, API payments, bridge actions, or workflow expenses. Teams need a small, clear proof that a payment intent was checked before value moved.",
    narration:
      "The problem is simple. As autonomous agents request swaps, API payments, and workflow expenses, builders need lightweight proof that a payment intent was checked before value moved.",
    chips: ["Pre-execution review", "Policy limits", "Audit trail"],
  },
  {
    id: "03-flow",
    title: "How The Guard Works",
    eyebrow: "Frontend review flow",
    body:
      "The frontend receives the recipient, asset, amount, policy limit, purpose, and model hash. It scores the risk and produces a deterministic intent hash.",
    narration:
      "The frontend receives the recipient, asset, amount, policy limit, purpose, and model hash. It scores the request and produces a deterministic intent hash for the payment review.",
    image: "demo/rendered/demo-final-frame.png",
  },
  {
    id: "04-approved",
    title: "Human-Readable Decision",
    eyebrow: "Policy evidence before execution",
    body:
      "This example is approved because the amount is below the policy limit and the risk score is low. Higher-risk flows can be routed to manual review.",
    narration:
      "In this example, the payment is approved because the amount is below the configured policy limit and the risk score is low. Higher risk flows can be routed to manual review.",
    image: "docs/frontend-preview.png",
  },
  {
    id: "05-onchain",
    title: "Sui Testnet Receipt",
    eyebrow: "Move package evidence",
    body:
      "The Move package records recipient, asset, amount, policy limit, model hash, intent hash, risk score, approval result, and timestamp in an on-chain receipt.",
    narration:
      "When approved, the Move package records the key review fields on Sui testnet: recipient, asset, amount, policy limit, model hash, intent hash, risk score, approval result, and timestamp.",
    facts: [
      ["Package ID", "0x1ce6...8999"],
      ["First receipt tx", "DVErKPp...BkS"],
      ["Receipt result", "approved=true"],
    ],
  },
  {
    id: "06-links",
    title: "Submission Artifacts",
    eyebrow: "Ready for DeepSurge",
    body:
      "The project has a public repository, public frontend, testnet package, and recorded first receipt transaction. No mainnet funds or custody are required.",
    narration:
      "The submission package is ready for DeepSurge. It includes a public repository, public frontend, Sui testnet package, and a recorded first receipt transaction. No custody or mainnet funds are required.",
    facts: [
      ["Repo", "github.com/davidweb3-ctrl/sui-agent-payment-guard"],
      ["Frontend", "davidweb3-ctrl.github.io/sui-agent-payment-guard"],
      ["Network", "Sui testnet"],
    ],
  },
  {
    id: "07-close",
    title: "Built For The Agentic Web",
    eyebrow: "Safer autonomous commerce",
    body:
      "Sui Agent Payment Guard gives agent builders a concrete pattern for transparent, policy-based payment review before execution.",
    narration:
      "Sui Agent Payment Guard is built for the Agentic Web track: safer autonomous commerce, transparent payment evidence, and a simple Sui-native pattern that other agent builders can reuse.",
    chips: ["Transparent receipts", "Reusable Move pattern", "Agent-ready"],
  },
];

function esc(value) {
  return value.replaceAll("&", "&amp;").replaceAll("<", "&lt;").replaceAll(">", "&gt;");
}

function imageUrl(relPath) {
  return pathToFileURL(path.join(root, relPath)).href;
}

function slideHtml(slide) {
  const image = slide.image
    ? `<div class="mock"><img src="${imageUrl(slide.image)}" /></div>`
    : "";
  const chips = slide.chips
    ? `<div class="chips">${slide.chips.map((chip) => `<span>${esc(chip)}</span>`).join("")}</div>`
    : "";
  const facts = slide.facts
    ? `<div class="facts">${slide.facts
        .map(([label, value]) => `<div><span>${esc(label)}</span><strong>${esc(value)}</strong></div>`)
        .join("")}</div>`
    : "";
  return `<!doctype html>
<html>
  <head>
    <meta charset="utf-8" />
    <style>
      * { box-sizing: border-box; }
      html, body { margin: 0; width: 1920px; height: 1080px; overflow: hidden; }
      body {
        font-family: Inter, Arial, Helvetica, sans-serif;
        color: #eaf6ff;
        background:
          radial-gradient(circle at 82% 22%, rgba(21, 184, 194, 0.22), transparent 34%),
          radial-gradient(circle at 10% 88%, rgba(78, 126, 255, 0.18), transparent 32%),
          linear-gradient(135deg, #071423 0%, #0c1728 44%, #06111f 100%);
      }
      .frame {
        width: 100%;
        height: 100%;
        padding: 86px 116px;
        display: grid;
        grid-template-columns: 0.92fr 1.08fr;
        gap: 70px;
        align-items: center;
      }
      .eyebrow {
        color: #62d9ff;
        font-size: 25px;
        font-weight: 800;
        letter-spacing: 2px;
        text-transform: uppercase;
        margin-bottom: 24px;
      }
      h1 {
        margin: 0 0 30px;
        font-size: 86px;
        line-height: 0.98;
        letter-spacing: 0;
      }
      p {
        margin: 0;
        max-width: 820px;
        color: #bad1df;
        font-size: 35px;
        line-height: 1.34;
      }
      .visual {
        min-height: 650px;
        display: flex;
        align-items: center;
        justify-content: center;
      }
      .card {
        width: 100%;
        min-height: 610px;
        border: 1px solid rgba(150, 188, 216, 0.22);
        background: rgba(7, 18, 32, 0.74);
        box-shadow: 0 30px 100px rgba(0, 0, 0, 0.4);
        border-radius: 18px;
        padding: 48px;
        display: flex;
        flex-direction: column;
        justify-content: center;
      }
      .logo {
        width: 156px;
        height: 156px;
        border-radius: 34px;
        margin-bottom: 44px;
      }
      .chips {
        display: flex;
        flex-wrap: wrap;
        gap: 18px;
        margin-top: 46px;
      }
      .chips span {
        color: #08202d;
        background: #55d5ff;
        border-radius: 999px;
        padding: 16px 24px;
        font-size: 25px;
        font-weight: 800;
      }
      .facts {
        display: grid;
        gap: 24px;
      }
      .facts div {
        border: 1px solid rgba(98, 217, 255, 0.24);
        border-radius: 16px;
        padding: 28px 32px;
        background: rgba(15, 29, 48, 0.86);
      }
      .facts span {
        display: block;
        color: #8ca8b8;
        font-size: 22px;
        font-weight: 800;
        text-transform: uppercase;
        margin-bottom: 12px;
      }
      .facts strong {
        display: block;
        color: #effaff;
        font-size: 30px;
        line-height: 1.22;
        word-break: break-word;
      }
      .mock {
        width: 100%;
        border-radius: 18px;
        overflow: hidden;
        border: 1px solid rgba(98, 217, 255, 0.28);
        box-shadow: 0 28px 80px rgba(0,0,0,.45);
        background: #071423;
      }
      .mock img {
        display: block;
        width: 100%;
      }
      .watermark {
        position: absolute;
        right: 78px;
        bottom: 52px;
        color: rgba(234, 246, 255, 0.48);
        font-size: 24px;
        font-weight: 700;
      }
    </style>
  </head>
  <body>
    <div class="frame">
      <section>
        <div class="eyebrow">${esc(slide.eyebrow)}</div>
        <h1>${esc(slide.title)}</h1>
        <p>${esc(slide.body)}</p>
        ${chips}
      </section>
      <section class="visual">
        <div class="card">
          ${image || `<img class="logo" src="${imageUrl("assets/logo-512.png")}" />`}
          ${facts}
        </div>
      </section>
    </div>
    <div class="watermark">Sui Agent Payment Guard</div>
  </body>
</html>`;
}

await mkdir(outDir, { recursive: true });
await mkdir(audioDir, { recursive: true });

const browser = await chromium.launch({ headless: true });
const page = await browser.newPage({ viewport: { width: 1920, height: 1080 }, deviceScaleFactor: 1 });

for (let index = 0; index < slides.length; index += 1) {
  const slide = slides[index];
  const htmlPath = path.join(outDir, `${slide.id}.html`);
  const pngPath = path.join(outDir, `${slide.id}.png`);
  const txtPath = path.join(audioDir, `${slide.id}.txt`);
  await writeFile(htmlPath, slideHtml(slide));
  await writeFile(txtPath, slide.narration);
  await page.goto(pathToFileURL(htmlPath).href);
  await page.screenshot({ path: pngPath });
}

await browser.close();

await writeFile(
  path.join(outDir, "manifest.json"),
  JSON.stringify(slides.map((slide) => ({ id: slide.id, narration: slide.narration })), null, 2),
);
