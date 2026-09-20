import { rankAssets } from "./core.mjs";

const SNAPSHOT_TIME = "2026-09-20T15:54:36Z";
const SNAPSHOT = [
  { name: "Anduril PreStocks", symbol: "ANDURIL", markPrice: 154.17556589, tokenPrice: 159.872010615988, markValuation: 136398977800, impliedValuation: 141438617079, supply: 11805.856730691, contract_address: "PresTj4Yc2bAR197Er7wz4UUKSfqt6FryBEdAriBoQB", external_url: "https://www.prestocks.com/anduril" },
  { name: "Anthropic PreStocks", symbol: "ANTHROPIC", markPrice: 1032.35226373, tokenPrice: 1024.939937742772, markValuation: 1691346385459, impliedValuation: 1679202458230, supply: 7381.881617554, contract_address: "Pren1FvFX6J3E4kXhJuCiAD5aDmGEb7qJRncwA8Lkhw", external_url: "https://www.prestocks.com/anthropic" },
  { name: "Figure AI PreStocks", symbol: "FIGUREAI", markPrice: 181.12429407, tokenPrice: 174.56834344885814, markValuation: 39489983573, impliedValuation: 38060609432, contract_address: "PreZad18qfPtbxNpMtMuAuX2zVpvkEU8DnJx56faCWd", external_url: "https://www.prestocks.com/figureai" },
  { name: "Kalshi PreStocks", symbol: "KALSHI", markPrice: 894.98333618, tokenPrice: 904.8298421823022, markValuation: 32552381371, impliedValuation: 32910519009, contract_address: "PreLWGkkeqG1s4HEfFZSy9moCrJ7btsHuUtfcCeoRua", external_url: "https://www.prestocks.com/kalshi" },
  { name: "Neuralink PreStocks", symbol: "NEURALINK", markPrice: 336.02481814, tokenPrice: 422.9036805795414, markValuation: 64011064366, impliedValuation: 80561057568, contract_address: "PrekqLJvJ3qVdXmBGDiexvwUTF4rLFDa6HWS4HJbw9S", external_url: "https://www.prestocks.com/neuralink" },
  { name: "OpenAI PreStocks", symbol: "OPENAI", markPrice: 995.5803383098449, tokenPrice: 1121.6076923486294, markValuation: 1233454645073, impliedValuation: 1389593752349, contract_address: "PreweJYECqtQwBtpxHL171nL2K6umo692gTm7Q3rpgF", external_url: "https://www.prestocks.com/openai" },
  { name: "Polymarket PreStocks", symbol: "POLYMARKET", markPrice: 143.85472879, tokenPrice: 143.74021970958597, markValuation: 14187782455, impliedValuation: 14176488909, contract_address: "Pre8AREmFPtoJFT8mQSXQLh56cwJmM7CFDRuoGBZiUP", external_url: "https://www.prestocks.com/polymarket" },
  { name: "SpaceX PreStocks", symbol: "SPACEX", markPrice: 153.47560035092295, tokenPrice: 119.5181545705434, markValuation: 2012235649045, impliedValuation: 1567015804369, contract_address: "PreANxuXjsy2pvisWWMNB6YaJNzr7681wJJr2rHsfTh", external_url: "https://www.prestocks.com/spacex" },
];

const tableBody = document.querySelector("#asset-rows");
const sourceState = document.querySelector("#source-state");
const sortSelect = document.querySelector("#sort");
const searchInput = document.querySelector("#search");
const statAssets = document.querySelector("#stat-assets");
const statMedian = document.querySelector("#stat-median");
const statFlags = document.querySelector("#stat-flags");
let assets = SNAPSHOT;

const money = new Intl.NumberFormat("en-US", { style: "currency", currency: "USD", maximumFractionDigits: 2 });
const compact = new Intl.NumberFormat("en-US", { notation: "compact", maximumFractionDigits: 2 });

function shortAddress(value = "") {
  return value.length > 13 ? `${value.slice(0, 6)}…${value.slice(-5)}` : value;
}

function escapeHtml(value = "") {
  return String(value).replace(/[&<>'"]/g, (character) => ({
    "&": "&amp;",
    "<": "&lt;",
    ">": "&gt;",
    "'": "&#39;",
    '"': "&quot;",
  })[character]);
}

function safeHttpsUrl(value) {
  try {
    const url = new URL(String(value));
    return url.protocol === "https:" ? url.href : "#";
  } catch {
    return "#";
  }
}

function median(values) {
  const sorted = [...values].sort((a, b) => a - b);
  if (!sorted.length) return 0;
  const middle = Math.floor(sorted.length / 2);
  return sorted.length % 2 ? sorted[middle] : (sorted[middle - 1] + sorted[middle]) / 2;
}

function render() {
  const query = searchInput.value.trim().toLowerCase();
  const ranked = rankAssets(assets, sortSelect.value).filter((asset) =>
    `${asset.name} ${asset.symbol}`.toLowerCase().includes(query),
  );

  tableBody.innerHTML = ranked.map((asset) => {
    const premium = Number.isFinite(asset.premium) ? asset.premium : 0;
    const sign = premium >= 0 ? "+" : "";
    const direction = premium >= 0 ? "premium" : "discount";
    const symbol = String(asset.symbol || "—");
    const mint = String(asset.contract_address || "");
    return `<tr>
      <td>
        <a class="asset" href="${safeHttpsUrl(asset.external_url)}" target="_blank" rel="noreferrer">
          <span class="asset-mark">${escapeHtml(symbol.slice(0, 2))}</span>
          <span><strong>${escapeHtml(symbol)}</strong><small>${escapeHtml(asset.name || "Unknown product")}</small></span>
        </a>
      </td>
      <td>${money.format(asset.tokenPrice)}</td>
      <td>${money.format(asset.markPrice)}</td>
      <td><span class="delta ${asset.band}">${sign}${premium.toFixed(2)}% ${direction}</span></td>
      <td>$${compact.format(asset.impliedValuation)}</td>
      <td><a class="address" href="https://solscan.io/token/${encodeURIComponent(mint)}" target="_blank" rel="noreferrer">${escapeHtml(shortAddress(mint))}</a></td>
    </tr>`;
  }).join("");

  const all = rankAssets(assets);
  statAssets.textContent = String(all.length);
  statMedian.textContent = `${median(all.map((asset) => Math.abs(asset.premium))).toFixed(2)}%`;
  statFlags.textContent = String(all.filter((asset) => asset.band === "high").length);
}

async function refresh() {
  try {
    const response = await fetch("https://prestocks.com/api/prestocks", { headers: { Accept: "application/json" } });
    if (!response.ok) throw new Error(`API returned ${response.status}`);
    const live = await response.json();
    if (!Array.isArray(live) || !live.length) throw new Error("Empty response");
    assets = live;
    sourceState.textContent = `Live PreStocks API · ${new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}`;
    sourceState.dataset.state = "live";
  } catch {
    sourceState.textContent = `Verified snapshot · ${new Date(SNAPSHOT_TIME).toLocaleString()}`;
    sourceState.dataset.state = "snapshot";
  }
  render();
}

sortSelect.addEventListener("change", render);
searchInput.addEventListener("input", render);
document.querySelector("#refresh").addEventListener("click", refresh);

render();
refresh();
