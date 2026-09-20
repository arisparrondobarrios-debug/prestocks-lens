import assert from "node:assert/strict";
import { enrichAsset, premiumPercent, rankAssets, riskBand, valuationGap } from "./core.mjs";

assert.equal(premiumPercent(110, 100), 10);
assert.equal(premiumPercent(80, 100), -20);
assert.equal(premiumPercent(10, 0), null);
assert.equal(valuationGap(150, 100), 50);
assert.equal(riskBand(7.99), "low");
assert.equal(riskBand(-8), "medium");
assert.equal(riskBand(20), "high");

const enriched = enrichAsset({ tokenPrice: 125, markPrice: 100, impliedValuation: 200, markValuation: 160 });
assert.equal(enriched.premium, 25);
assert.equal(enriched.gap, 40);
assert.equal(enriched.band, "high");

const ranked = rankAssets([
  { symbol: "A", tokenPrice: 105, markPrice: 100 },
  { symbol: "B", tokenPrice: 75, markPrice: 100 },
]);
assert.equal(ranked[0].symbol, "B");

console.log("PreStocks Lens core tests passed");
