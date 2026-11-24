// 記帳的核心計算：只處理資料，不碰畫面，方便測試
export function addEntry(entries, { title, amount, category }) {
  const value = Number(amount);
  if (!title || !title.trim()) throw new Error("請輸入項目名稱");
  if (!Number.isFinite(value) || value <= 0) throw new Error("金額必須是大於 0 的數字");
  return [...entries, { title: title.trim(), amount: value, category: category || "其他" }];
}

export function total(entries) {
  return entries.reduce((sum, e) => sum + e.amount, 0);
}

export function byCategory(entries) {
  const out = {};
  for (const e of entries) out[e.category] = (out[e.category] || 0) + e.amount;
  return out;
}
