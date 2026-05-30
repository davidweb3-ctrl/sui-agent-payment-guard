import React, { useMemo, useState } from "react";
import { createRoot } from "react-dom/client";
import "./styles.css";

type Intent = {
  recipient: string;
  asset: string;
  amountMist: number;
  policyLimitMist: number;
  modelHash: string;
  purpose: string;
};

const defaultIntent: Intent = {
  recipient: "0x7a4c...agent_vendor",
  asset: "SUI",
  amountMist: 2_500_000_000,
  policyLimitMist: 5_000_000_000,
  modelHash: "claude-risk-review-2026-05-29",
  purpose: "Pay vetted data API for one agent workflow run",
};

function scoreIntent(intent: Intent) {
  const amountRatio = intent.amountMist / Math.max(intent.policyLimitMist, 1);
  const amountRisk = Math.min(5200, Math.round(amountRatio * 5200));
  const recipientRisk = intent.recipient.includes("...") ? 900 : 300;
  const purposeRisk = /swap|bridge|withdraw|admin/i.test(intent.purpose) ? 1800 : 450;
  const modelRisk = intent.modelHash.length < 12 ? 950 : 250;
  const score = Math.min(10000, amountRisk + recipientRisk + purposeRisk + modelRisk);
  return {
    score,
    approved: intent.amountMist <= intent.policyLimitMist && score <= 7000,
    amountRatio,
  };
}

async function digestIntent(intent: Intent) {
  const encoded = new TextEncoder().encode(JSON.stringify(intent));
  const hash = await crypto.subtle.digest("SHA-256", encoded);
  return [...new Uint8Array(hash)].map((byte) => byte.toString(16).padStart(2, "0")).join("");
}

function formatSui(mist: number) {
  return `${(mist / 1_000_000_000).toFixed(2)} SUI`;
}

function App() {
  const [intent, setIntent] = useState(defaultIntent);
  const [intentHash, setIntentHash] = useState("Generate hash");
  const review = useMemo(() => scoreIntent(intent), [intent]);

  const updateIntent = (key: keyof Intent, value: string) => {
    setIntent((current) => ({
      ...current,
      [key]: key === "amountMist" || key === "policyLimitMist" ? Number(value) : value,
    }));
  };

  const riskLevel = review.score >= 7000 ? "High" : review.score >= 4200 ? "Medium" : "Low";

  return (
    <main>
      <section className="workspace">
        <div className="hero">
          <div className="eyebrow">Sui Overflow 2026 / The Agentic Web</div>
          <h1>Sui Agent Payment Guard</h1>
          <p>
            Review AI-agent payment intents before execution and record policy evidence as Sui testnet
            receipts. Non-custodial, testnet-first, and designed for agent payment workflows.
          </p>
        </div>

        <div className="panel intent-panel">
          <div>
            <h2>Payment Intent</h2>
            <p className="muted">Agent-generated request awaiting policy review.</p>
          </div>

          <label>
            Recipient
            <input value={intent.recipient} onChange={(event) => updateIntent("recipient", event.target.value)} />
          </label>
          <label>
            Asset
            <input value={intent.asset} onChange={(event) => updateIntent("asset", event.target.value)} />
          </label>
          <div className="field-grid">
            <label>
              Amount (MIST)
              <input
                type="number"
                value={intent.amountMist}
                onChange={(event) => updateIntent("amountMist", event.target.value)}
              />
            </label>
            <label>
              Policy Limit (MIST)
              <input
                type="number"
                value={intent.policyLimitMist}
                onChange={(event) => updateIntent("policyLimitMist", event.target.value)}
              />
            </label>
          </div>
          <label>
            Model Hash
            <input value={intent.modelHash} onChange={(event) => updateIntent("modelHash", event.target.value)} />
          </label>
          <label>
            Purpose
            <textarea value={intent.purpose} onChange={(event) => updateIntent("purpose", event.target.value)} />
          </label>
        </div>

        <div className="panel review-panel">
          <div>
            <h2>Guard Review</h2>
            <p className="muted">Deterministic policy preview before a Sui receipt is recorded.</p>
          </div>

          <div className={`verdict ${review.approved ? "approved" : "blocked"}`}>
            <span>{review.approved ? "Approved" : "Manual Review"}</span>
            <strong>{riskLevel} Risk</strong>
          </div>

          <div className="metrics">
            <div>
              <span>Risk Score</span>
              <strong>{review.score} / 10000</strong>
            </div>
            <div>
              <span>Amount</span>
              <strong>{formatSui(intent.amountMist)}</strong>
            </div>
            <div>
              <span>Limit</span>
              <strong>{formatSui(intent.policyLimitMist)}</strong>
            </div>
          </div>

          <div className="receipt">
            <span>Move entrypoint</span>
            <code>payment_guard::record_intent(...)</code>
          </div>
          <div className="receipt">
            <span>Intent hash</span>
            <code>{intentHash}</code>
          </div>

          <button
            type="button"
            onClick={async () => {
              setIntentHash(await digestIntent(intent));
            }}
          >
            Generate Receipt Hash
          </button>
        </div>
      </section>
    </main>
  );
}

createRoot(document.getElementById("root")!).render(<App />);
