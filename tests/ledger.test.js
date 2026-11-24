import { describe, expect, test } from "vitest";
import { addEntry, total, byCategory } from "../src/ledger.js";

describe("總額計算", () => {
  test("記三筆 100 元，總額必須是 300", () => {
    let entries = [];
    entries = addEntry(entries, { title: "早餐", amount: 100, category: "餐飲" });
    entries = addEntry(entries, { title: "公車", amount: 100, category: "交通" });
    entries = addEntry(entries, { title: "飲料", amount: 100, category: "餐飲" });
    expect(total(entries)).toBe(300);
  });

  test("沒有任何紀錄時，總額是 0", () => {
    expect(total([])).toBe(0);
  });

  test("表單傳進來的字串金額也要正確相加", () => {
    let entries = addEntry([], { title: "午餐", amount: "120", category: "餐飲" });
    entries = addEntry(entries, { title: "晚餐", amount: "180", category: "餐飲" });
    expect(total(entries)).toBe(300);
  });
});

describe("分類統計", () => {
  test("同分類的金額要加在一起", () => {
    let entries = addEntry([], { title: "早餐", amount: 80, category: "餐飲" });
    entries = addEntry(entries, { title: "捷運", amount: 30, category: "交通" });
    entries = addEntry(entries, { title: "午餐", amount: 120, category: "餐飲" });
    expect(byCategory(entries)).toEqual({ 餐飲: 200, 交通: 30 });
  });
});

describe("錯誤輸入", () => {
  test("金額是 0 或負數要擋下來", () => {
    expect(() => addEntry([], { title: "怪怪的", amount: 0 })).toThrow();
    expect(() => addEntry([], { title: "怪怪的", amount: -50 })).toThrow();
  });

  test("沒有項目名稱要擋下來", () => {
    expect(() => addEntry([], { title: "  ", amount: 100 })).toThrow();
  });
});
