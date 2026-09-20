export function premiumPercent(tokenPrice, markPrice) {
  const token = Number(tokenPrice);
  const mark = Number(markPrice);
  if (!Number.isFinite(token) || !Number.isFinite(mark) || mark <= 0) return null;
  return ((token - mark) / mark) * 100;
}

export function valuationGap(impliedValuation, markValuation) {
  const implied = Number(impliedValuation);
  const mark = Number(markValuation);
  if (!Number.isFinite(implied) || !Number.isFinite(mark)) return null;
  return implied - mark;
}

export function riskBand(premium) {
  if (!Number.isFinite(premium)) return "unknown";
  const absolute = Math.abs(premium);
  if (absolute >= 20) return "high";
  if (absolute >= 8) return "medium";
  return "low";
}

export function enrichAsset(asset) {
  const premium = premiumPercent(asset.tokenPrice, asset.markPrice);
  return {
    ...asset,
    premium,
    gap: valuationGap(asset.impliedValuation, asset.markValuation),
    band: riskBand(premium),
  };
}

export function rankAssets(assets, sortKey = "absolutePremium") {
  const enriched = assets.map(enrichAsset);
  const readers = {
    absolutePremium: (item) => Math.abs(item.premium ?? -Infinity),
    premium: (item) => item.premium ?? -Infinity,
    tokenPrice: (item) => Number(item.tokenPrice) || 0,
    impliedValuation: (item) => Number(item.impliedValuation) || 0,
  };
  const read = readers[sortKey] || readers.absolutePremium;
  return enriched.sort((a, b) => read(b) - read(a));
}
