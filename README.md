# AI 記帳本

「AI 拆解室」長片〈AI 幫你寫程式，背後到底發生什麼事？〉的示範專案。

- `src/ledger.js`：記帳的計算邏輯
- `tests/ledger.test.js`：自動化測試（記三筆 100 元，總額必須是 300）
- `.github/workflows/ci-cd.yml`：每次 push 自動跑測試（CI），測試全過才自動部署到 GitHub Pages（CD）

## 在自己電腦上跑測試

```bash
npm install
npm test
```
