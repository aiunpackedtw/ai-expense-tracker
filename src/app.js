import { addEntry, total, byCategory } from "./ledger.js";

const KEY = "ai-expense-tracker";
let entries = [];
try { entries = JSON.parse(localStorage.getItem(KEY)) || []; } catch { entries = []; }

const $ = (id) => document.getElementById(id);
const fmt = (n) => "NT$ " + n.toLocaleString("zh-TW");

function render() {
  $("total").textContent = fmt(total(entries));
  $("list").innerHTML = entries
    .map((e) => `<li><span>${e.title}<small>${e.category}</small></span><b>${fmt(e.amount)}</b></li>`)
    .join("");
  $("cats").innerHTML = Object.entries(byCategory(entries))
    .map(([c, v]) => `<li><span>${c}</span><b>${fmt(v)}</b></li>`)
    .join("");
  try { localStorage.setItem(KEY, JSON.stringify(entries)); } catch {}
}

$("form").addEventListener("submit", (ev) => {
  ev.preventDefault();
  try {
    entries = addEntry(entries, { title: $("title").value, amount: $("amount").value, category: $("category").value });
    $("error").textContent = "";
    ev.target.reset();
    render();
  } catch (err) {
    $("error").textContent = err.message;
  }
});

$("clear").addEventListener("click", () => { entries = []; render(); });
render();
