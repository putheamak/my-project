import { useState, useRef, useCallback, useEffect } from "react";

const COLORS = {
  primary: "#0F6E56",
  primaryLight: "#E1F5EE",
  primaryDark: "#04342C",
  accent: "#BA7517",
  accentLight: "#FAEEDA",
  danger: "#A32D2D",
  dangerLight: "#FCEBEB",
  info: "#185FA5",
  infoLight: "#E6F1FB",
  gray: "#5F5E5A",
  grayLight: "#F1EFE8",
  border: "rgba(0,0,0,0.12)",
};

const KHR = (n) =>
  new Intl.NumberFormat("km-KH", { style: "currency", currency: "KHR", maximumFractionDigits: 0 }).format(n);
const USD = (n) =>
  new Intl.NumberFormat("en-US", { style: "currency", currency: "USD", minimumFractionDigits: 2 }).format(n);
const formatDate = (d) => new Date(d).toLocaleDateString("en-GB", { day: "2-digit", month: "short", year: "numeric" });

const CATEGORIES = [
  "Food & Beverage", "Office Supplies", "Transport", "Utilities", "Rent",
  "Salaries", "Marketing", "Equipment", "Repairs", "Inventory",
  "Professional Services", "Taxes & Fees", "Other Expenses",
  "Sales Revenue", "Service Revenue", "Other Income",
];

const INCOME_CATS = ["Sales Revenue", "Service Revenue", "Other Income"];

function useLocalStorage(key, initial) {
  const [val, setVal] = useState(() => {
    try { const s = localStorage.getItem(key); return s ? JSON.parse(s) : initial; } catch { return initial; }
  });
  const set = useCallback((v) => {
    setVal(v);
    try { localStorage.setItem(key, JSON.stringify(v)); } catch {}
  }, [key]);
  return [val, set];
}

export default function App() {
  const [tab, setTab] = useState("dashboard");
  const [transactions, setTransactions] = useLocalStorage("sme_transactions", []);
  const [business, setBusiness] = useLocalStorage("sme_business", { name: "My Business", owner: "", currency: "USD", vatReg: "" });
  const [scanning, setScanning] = useState(false);
  const [scanResult, setScanResult] = useState(null);
  const [showAddModal, setShowAddModal] = useState(false);
  const [editTx, setEditTx] = useState(null);
  const [filterMonth, setFilterMonth] = useState(() => {
    const d = new Date(); return `${d.getFullYear()}-${String(d.getMonth()+1).padStart(2,"0")}`;
  });
  const [searchQ, setSearchQ] = useState("");
  const [toast, setToast] = useState(null);
  const fileRef = useRef();
  const cameraRef = useRef();

  const showToast = (msg, type = "success") => {
    setToast({ msg, type });
    setTimeout(() => setToast(null), 3500);
  };

  const addTransaction = (tx) => {
    const newTx = { ...tx, id: Date.now().toString(), createdAt: new Date().toISOString() };
    setTransactions([newTx, ...transactions]);
    showToast("Transaction saved successfully!");
    setShowAddModal(false);
    setScanResult(null);
  };

  const updateTransaction = (tx) => {
    setTransactions(transactions.map(t => t.id === tx.id ? tx : t));
    showToast("Transaction updated!");
    setEditTx(null);
  };

  const deleteTransaction = (id) => {
    if (!confirm("Delete this transaction?")) return;
    setTransactions(transactions.filter(t => t.id !== id));
    showToast("Deleted.", "info");
  };

  const scanImage = async (base64, mimeType) => {
    setScanning(true);
    setScanResult(null);
    try {
      const resp = await fetch("https://api.anthropic.com/v1/messages", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          model: "claude-sonnet-4-20250514",
          max_tokens: 1000,
          system: `You are an expert accounting assistant for Cambodian small businesses. Extract data from receipts/invoices and return ONLY valid JSON with this exact structure (no markdown, no extra text):
{
  "vendor": "string",
  "date": "YYYY-MM-DD",
  "total": number,
  "currency": "USD or KHR",
  "category": "one of: Food & Beverage, Office Supplies, Transport, Utilities, Rent, Salaries, Marketing, Equipment, Repairs, Inventory, Professional Services, Taxes & Fees, Other Expenses, Sales Revenue, Service Revenue, Other Income",
  "type": "expense or income",
  "description": "brief description",
  "items": [{"name":"string","qty":number,"price":number}],
  "vatAmount": number or null,
  "invoiceNumber": "string or null"
}`,
          messages: [{
            role: "user",
            content: [
              { type: "image", source: { type: "base64", media_type: mimeType, data: base64 } },
              { type: "text", text: "Extract all financial data from this receipt or invoice." }
            ]
          }]
        })
      });
      const data = await resp.json();
      if (data.error) throw new Error(data.error.message);
      const text = data.content.map(c => c.text || "").join("");
      const clean = text.replace(/```json|```/g, "").trim();
      const parsed = JSON.parse(clean);
      setScanResult(parsed);
      setShowAddModal(true);
    } catch (e) {
      showToast("Could not read receipt. Please fill in manually.", "error");
      setShowAddModal(true);
    } finally {
      setScanning(false);
    }
  };

  const handleFile = (file) => {
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (e) => {
      const b64 = e.target.result.split(",")[1];
      scanImage(b64, file.type);
    };
    reader.readAsDataURL(file);
  };

  const filtered = transactions.filter(t => {
    const monthMatch = filterMonth ? t.date?.startsWith(filterMonth) : true;
    const q = searchQ.toLowerCase();
    const searchMatch = !q || t.vendor?.toLowerCase().includes(q) || t.description?.toLowerCase().includes(q) || t.category?.toLowerCase().includes(q);
    return monthMatch && searchMatch;
  });

  const totalIncome = filtered.filter(t => t.type === "income").reduce((s, t) => s + (t.total || 0), 0);
  const totalExpense = filtered.filter(t => t.type === "expense").reduce((s, t) => s + (t.total || 0), 0);
  const netProfit = totalIncome - totalExpense;

  const catBreakdown = filtered.reduce((acc, t) => {
    acc[t.category] = (acc[t.category] || 0) + (t.total || 0);
    return acc;
  }, {});

  const monthlyData = transactions.reduce((acc, t) => {
    const m = t.date?.slice(0, 7);
    if (!m) return acc;
    if (!acc[m]) acc[m] = { income: 0, expense: 0 };
    if (t.type === "income") acc[m].income += t.total || 0;
    else acc[m].expense += t.total || 0;
    return acc;
  }, {});

  return (
    <div style={{ minHeight: "100vh", background: "#FAFAF8", fontFamily: "'Georgia', serif" }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Noto+Serif+Khmer:wght@400;600&family=DM+Serif+Display&family=DM+Sans:wght@400;500;600&display=swap');
        * { box-sizing: border-box; margin: 0; padding: 0; }
        .font-khmer { font-family: 'Noto Serif Khmer', serif; }
        .tab-btn { background: none; border: none; cursor: pointer; padding: 10px 18px; font-size: 13px; font-family: 'DM Sans', sans-serif; font-weight: 500; color: #888; border-bottom: 2px solid transparent; transition: all 0.2s; white-space: nowrap; }
        .tab-btn.active { color: ${COLORS.primary}; border-bottom-color: ${COLORS.primary}; }
        .tab-btn:hover { color: ${COLORS.primary}; }
        .card { background: #fff; border-radius: 12px; border: 0.5px solid ${COLORS.border}; }
        .btn-primary { background: ${COLORS.primary}; color: #fff; border: none; border-radius: 8px; padding: 9px 18px; cursor: pointer; font-size: 13px; font-family: 'DM Sans', sans-serif; font-weight: 600; transition: opacity 0.15s; }
        .btn-primary:hover { opacity: 0.88; }
        .btn-secondary { background: #fff; color: ${COLORS.primary}; border: 1px solid ${COLORS.primary}; border-radius: 8px; padding: 8px 16px; cursor: pointer; font-size: 13px; font-family: 'DM Sans', sans-serif; font-weight: 500; transition: background 0.15s; }
        .btn-secondary:hover { background: ${COLORS.primaryLight}; }
        .btn-danger { background: none; color: ${COLORS.danger}; border: 1px solid ${COLORS.danger}; border-radius: 8px; padding: 6px 12px; cursor: pointer; font-size: 12px; font-family: 'DM Sans', sans-serif; }
        input, select, textarea { font-family: 'DM Sans', sans-serif; font-size: 13px; border: 1px solid #ddd; border-radius: 8px; padding: 8px 12px; width: 100%; outline: none; transition: border-color 0.15s; background: #fff; color: #222; }
        input:focus, select:focus, textarea:focus { border-color: ${COLORS.primary}; }
        label { font-size: 12px; font-family: 'DM Sans', sans-serif; color: #666; font-weight: 500; display: block; margin-bottom: 4px; }
        .badge { display: inline-block; padding: 3px 10px; border-radius: 20px; font-size: 11px; font-weight: 600; font-family: 'DM Sans', sans-serif; }
        .badge-income { background: ${COLORS.primaryLight}; color: ${COLORS.primaryDark}; }
        .badge-expense { background: ${COLORS.dangerLight}; color: ${COLORS.danger}; }
        .tx-row { padding: 12px 0; border-bottom: 0.5px solid #f0ede8; display: flex; align-items: center; gap: 12px; cursor: pointer; transition: background 0.1s; }
        .tx-row:hover { background: #FAFAF8; }
        .tx-row:last-child { border-bottom: none; }
        .modal-overlay { position: fixed; inset: 0; background: rgba(0,0,0,0.45); z-index: 100; display: flex; align-items: center; justify-content: center; padding: 16px; }
        .modal { background: #fff; border-radius: 16px; width: 100%; max-width: 540px; max-height: 90vh; overflow-y: auto; padding: 28px; }
        .scan-zone { border: 2px dashed ${COLORS.primary}; border-radius: 16px; padding: 40px 24px; text-align: center; cursor: pointer; transition: background 0.2s; background: ${COLORS.primaryLight}; }
        .scan-zone:hover { background: #c8eede; }
        .stat-card { background: #fff; border-radius: 12px; border: 0.5px solid ${COLORS.border}; padding: 16px 20px; }
        @keyframes spin { to { transform: rotate(360deg); } }
        .spinner { width: 24px; height: 24px; border: 3px solid #ddd; border-top-color: ${COLORS.primary}; border-radius: 50%; animation: spin 0.7s linear infinite; display: inline-block; }
        @keyframes slideIn { from { transform: translateY(24px); opacity: 0; } to { transform: translateY(0); opacity: 1; } }
        .toast { position: fixed; bottom: 24px; right: 24px; z-index: 200; padding: 12px 20px; border-radius: 10px; font-family: 'DM Sans', sans-serif; font-size: 13px; font-weight: 500; animation: slideIn 0.3s ease; box-shadow: 0 4px 20px rgba(0,0,0,0.15); }
        .progress-bar { height: 6px; border-radius: 3px; background: #eee; overflow: hidden; }
        .progress-fill { height: 100%; border-radius: 3px; transition: width 0.5s ease; }
        @media (max-width: 600px) { .modal { padding: 20px; } .desktop-grid { grid-template-columns: 1fr !important; } }
      `}</style>

      {/* Header */}
      <div style={{ background: COLORS.primaryDark, padding: "0 24px" }}>
        <div style={{ maxWidth: 900, margin: "0 auto", display: "flex", alignItems: "center", justifyContent: "space-between", paddingTop: 16, paddingBottom: 0 }}>
          <div>
            <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
              <div style={{ width: 32, height: 32, background: "#E1F5EE", borderRadius: 8, display: "flex", alignItems: "center", justifyContent: "center" }}>
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none"><rect x="3" y="3" width="18" height="18" rx="3" fill={COLORS.primary}/><path d="M7 12h10M7 8h10M7 16h6" stroke="#fff" strokeWidth="1.5" strokeLinecap="round"/></svg>
              </div>
              <div>
                <div style={{ fontFamily: "'DM Serif Display', serif", fontSize: 18, color: "#fff", letterSpacing: "0.02em" }}>
                  {business.name || "SME Finance"}
                </div>
                <div className="font-khmer" style={{ fontSize: 11, color: "#9FE1CB", letterSpacing: "0.03em" }}>ប្រព័ន្ធគ្រប់គ្រងហិរញ្ញវត្ថុ</div>
              </div>
            </div>
          </div>
          <button className="btn-primary" onClick={() => setShowAddModal(true)} style={{ fontSize: 12, padding: "7px 14px" }}>
            + Add Transaction
          </button>
        </div>
        <div style={{ maxWidth: 900, margin: "0 auto", display: "flex", overflowX: "auto", gap: 0, paddingTop: 8 }}>
          {[
            { id: "dashboard", label: "Dashboard" },
            { id: "transactions", label: "Transactions" },
            { id: "scan", label: "📷 Scan Receipt" },
            { id: "reports", label: "Reports" },
            { id: "settings", label: "Settings" },
          ].map(t => (
            <button key={t.id} className={`tab-btn ${tab === t.id ? "active" : ""}`}
              style={{ color: tab === t.id ? "#9FE1CB" : "#aaa", borderBottomColor: tab === t.id ? "#9FE1CB" : "transparent" }}
              onClick={() => setTab(t.id)}>{t.label}</button>
          ))}
        </div>
      </div>

      <div style={{ maxWidth: 900, margin: "0 auto", padding: "24px 16px" }}>

        {/* DASHBOARD */}
        {tab === "dashboard" && (
          <div>
            <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 20 }}>
              <div>
                <div style={{ fontFamily: "'DM Serif Display', serif", fontSize: 22, color: "#1a1a1a" }}>Overview</div>
                <div style={{ fontSize: 12, color: "#888", fontFamily: "'DM Sans', sans-serif" }}>
                  {new Date(filterMonth + "-01").toLocaleDateString("en-US", { month: "long", year: "numeric" })}
                </div>
              </div>
              <input type="month" value={filterMonth} onChange={e => setFilterMonth(e.target.value)}
                style={{ width: "auto", fontSize: 12, padding: "6px 10px" }} />
            </div>

            {/* Stats */}
            <div className="desktop-grid" style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 12, marginBottom: 24 }}>
              <div className="stat-card">
                <div style={{ fontSize: 11, color: "#888", fontFamily: "'DM Sans', sans-serif", fontWeight: 600, textTransform: "uppercase", letterSpacing: "0.08em", marginBottom: 6 }}>Total Income</div>
                <div style={{ fontFamily: "'DM Serif Display', serif", fontSize: 26, color: COLORS.primary }}>{USD(totalIncome)}</div>
                <div style={{ fontSize: 11, color: "#aaa", fontFamily: "'DM Sans', sans-serif", marginTop: 4 }}>{filtered.filter(t => t.type === "income").length} transactions</div>
              </div>
              <div className="stat-card">
                <div style={{ fontSize: 11, color: "#888", fontFamily: "'DM Sans', sans-serif", fontWeight: 600, textTransform: "uppercase", letterSpacing: "0.08em", marginBottom: 6 }}>Total Expenses</div>
                <div style={{ fontFamily: "'DM Serif Display', serif", fontSize: 26, color: COLORS.danger }}>{USD(totalExpense)}</div>
                <div style={{ fontSize: 11, color: "#aaa", fontFamily: "'DM Sans', sans-serif", marginTop: 4 }}>{filtered.filter(t => t.type === "expense").length} transactions</div>
              </div>
              <div className="stat-card" style={{ background: netProfit >= 0 ? COLORS.primaryLight : COLORS.dangerLight }}>
                <div style={{ fontSize: 11, color: "#888", fontFamily: "'DM Sans', sans-serif", fontWeight: 600, textTransform: "uppercase", letterSpacing: "0.08em", marginBottom: 6 }}>Net Profit / Loss</div>
                <div style={{ fontFamily: "'DM Serif Display', serif", fontSize: 26, color: netProfit >= 0 ? COLORS.primaryDark : COLORS.danger }}>{USD(netProfit)}</div>
                <div style={{ fontSize: 11, color: netProfit >= 0 ? COLORS.primary : COLORS.danger, fontFamily: "'DM Sans', sans-serif", marginTop: 4, fontWeight: 600 }}>
                  {netProfit >= 0 ? "▲ Profitable" : "▼ Net Loss"}
                </div>
              </div>
            </div>

            {/* Category Breakdown */}
            <div className="card" style={{ padding: "20px 24px", marginBottom: 20 }}>
              <div style={{ fontFamily: "'DM Sans', sans-serif", fontWeight: 600, fontSize: 14, marginBottom: 16, color: "#333" }}>Spending by Category</div>
              {Object.keys(catBreakdown).length === 0 ? (
                <div style={{ color: "#bbb", fontFamily: "'DM Sans', sans-serif", fontSize: 13, textAlign: "center", padding: "20px 0" }}>No data for this period</div>
              ) : (
                Object.entries(catBreakdown)
                  .sort((a, b) => b[1] - a[1])
                  .slice(0, 8)
                  .map(([cat, amt]) => {
                    const max = Math.max(...Object.values(catBreakdown));
                    const isIncome = INCOME_CATS.includes(cat);
                    return (
                      <div key={cat} style={{ marginBottom: 10 }}>
                        <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 4 }}>
                          <span style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 13, color: "#444" }}>{cat}</span>
                          <span style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 13, fontWeight: 600, color: isIncome ? COLORS.primary : COLORS.danger }}>{USD(amt)}</span>
                        </div>
                        <div className="progress-bar">
                          <div className="progress-fill" style={{ width: `${(amt / max) * 100}%`, background: isIncome ? COLORS.primary : COLORS.accent }} />
                        </div>
                      </div>
                    );
                  })
              )}
            </div>

            {/* Recent Transactions */}
            <div className="card" style={{ padding: "20px 24px" }}>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 16 }}>
                <div style={{ fontFamily: "'DM Sans', sans-serif", fontWeight: 600, fontSize: 14, color: "#333" }}>Recent Transactions</div>
                <button className="btn-secondary" style={{ fontSize: 11, padding: "5px 12px" }} onClick={() => setTab("transactions")}>View all</button>
              </div>
              {filtered.slice(0, 5).map(tx => <TxRow key={tx.id} tx={tx} onEdit={setEditTx} onDelete={deleteTransaction} />)}
              {filtered.length === 0 && (
                <div style={{ color: "#bbb", fontFamily: "'DM Sans', sans-serif", fontSize: 13, textAlign: "center", padding: "24px 0" }}>
                  No transactions yet. Scan a receipt or add one manually.
                </div>
              )}
            </div>
          </div>
        )}

        {/* SCAN */}
        {tab === "scan" && (
          <div>
            <div style={{ fontFamily: "'DM Serif Display', serif", fontSize: 22, color: "#1a1a1a", marginBottom: 6 }}>Scan Receipt / Invoice</div>
            <div style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 13, color: "#888", marginBottom: 24 }}>
              Take a photo or upload an image — AI will extract all financial data automatically.
            </div>

            {scanning ? (
              <div className="card" style={{ padding: 48, textAlign: "center" }}>
                <div className="spinner" style={{ marginBottom: 16 }} />
                <div style={{ fontFamily: "'DM Sans', sans-serif", color: "#666", fontSize: 14 }}>Reading receipt with AI...</div>
                <div className="font-khmer" style={{ color: "#aaa", fontSize: 12, marginTop: 6 }}>កំពុងដំណើរការ...</div>
              </div>
            ) : (
              <>
                <div className="scan-zone" onClick={() => fileRef.current?.click()}>
                  <div style={{ fontSize: 48, marginBottom: 12 }}>📄</div>
                  <div style={{ fontFamily: "'DM Serif Display', serif", fontSize: 18, color: COLORS.primaryDark, marginBottom: 8 }}>Upload Receipt or Invoice</div>
                  <div className="font-khmer" style={{ fontSize: 13, color: COLORS.primary, marginBottom: 12 }}>ផ្ទុកឡើងវិក្កយបត្រ ឬ វិក័យប័ត្រ</div>
                  <div style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 12, color: "#777" }}>Click to select image • JPG, PNG, WEBP supported</div>
                  <input ref={fileRef} type="file" accept="image/*" style={{ display: "none" }} onChange={e => handleFile(e.target.files[0])} />
                </div>

                <div style={{ display: "flex", alignItems: "center", gap: 12, margin: "16px 0" }}>
                  <div style={{ flex: 1, height: 1, background: "#eee" }} />
                  <div style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 12, color: "#aaa" }}>or</div>
                  <div style={{ flex: 1, height: 1, background: "#eee" }} />
                </div>

                <div className="scan-zone" style={{ background: COLORS.infoLight, borderColor: COLORS.info }} onClick={() => cameraRef.current?.click()}>
                  <div style={{ fontSize: 36, marginBottom: 8 }}>📷</div>
                  <div style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 14, color: COLORS.info, fontWeight: 600 }}>Take Photo with Camera</div>
                  <div style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 12, color: "#777", marginTop: 4 }}>Use your phone camera directly</div>
                  <input ref={cameraRef} type="file" accept="image/*" capture="environment" style={{ display: "none" }} onChange={e => handleFile(e.target.files[0])} />
                </div>

                <div style={{ marginTop: 16 }}>
                  <button className="btn-secondary" style={{ width: "100%" }} onClick={() => setShowAddModal(true)}>
                    + Enter Manually Without Scanning
                  </button>
                </div>
              </>
            )}

            <div className="card" style={{ padding: "16px 20px", marginTop: 24, background: "#FFFBF2", borderColor: "#F4C775" }}>
              <div style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 12, color: "#7a5a00", fontWeight: 600, marginBottom: 6 }}>How it works</div>
              <div style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 12, color: "#8a6a10", lineHeight: 1.7 }}>
                1. Take or upload a photo of your receipt/invoice<br/>
                2. AI reads vendor, date, amount, category automatically<br/>
                3. Review extracted data and confirm<br/>
                4. Transaction is saved to your records
              </div>
            </div>
          </div>
        )}

        {/* TRANSACTIONS */}
        {tab === "transactions" && (
          <div>
            <div style={{ fontFamily: "'DM Serif Display', serif", fontSize: 22, color: "#1a1a1a", marginBottom: 16 }}>All Transactions</div>
            <div style={{ display: "flex", gap: 10, marginBottom: 16, flexWrap: "wrap" }}>
              <input placeholder="Search vendor, description..." value={searchQ} onChange={e => setSearchQ(e.target.value)} style={{ flex: 1, minWidth: 180 }} />
              <input type="month" value={filterMonth} onChange={e => setFilterMonth(e.target.value)} style={{ width: "auto" }} />
              <button className="btn-primary" onClick={() => setShowAddModal(true)}>+ Add</button>
            </div>
            <div className="card" style={{ padding: "4px 20px" }}>
              {filtered.length === 0 ? (
                <div style={{ textAlign: "center", padding: "40px 0", color: "#bbb", fontFamily: "'DM Sans', sans-serif", fontSize: 13 }}>
                  No transactions found.
                </div>
              ) : (
                filtered.map(tx => <TxRow key={tx.id} tx={tx} onEdit={setEditTx} onDelete={deleteTransaction} />)
              )}
            </div>
          </div>
        )}

        {/* REPORTS */}
        {tab === "reports" && (
          <Reports transactions={transactions} business={business} />
        )}

        {/* SETTINGS */}
        {tab === "settings" && (
          <Settings business={business} setBusiness={setBusiness} showToast={showToast} transactions={transactions} />
        )}
      </div>

      {/* Add/Edit Modal */}
      {(showAddModal || editTx) && (
        <TxModal
          initial={editTx || scanResult}
          onSave={editTx ? updateTransaction : addTransaction}
          onClose={() => { setShowAddModal(false); setEditTx(null); setScanResult(null); }}
          isEdit={!!editTx}
        />
      )}

      {/* Toast */}
      {toast && (
        <div className="toast" style={{
          background: toast.type === "error" ? COLORS.dangerLight : toast.type === "info" ? COLORS.infoLight : COLORS.primaryLight,
          color: toast.type === "error" ? COLORS.danger : toast.type === "info" ? COLORS.info : COLORS.primaryDark,
          border: `1px solid ${toast.type === "error" ? COLORS.danger : toast.type === "info" ? COLORS.info : COLORS.primary}`,
        }}>{toast.msg}</div>
      )}
    </div>
  );
}

function TxRow({ tx, onEdit, onDelete }) {
  return (
    <div className="tx-row" onClick={() => onEdit(tx)}>
      <div style={{ width: 36, height: 36, borderRadius: 10, background: tx.type === "income" ? COLORS.primaryLight : COLORS.dangerLight, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
        <span style={{ fontSize: 16 }}>{INCOME_CATS.includes(tx.category) ? "💰" : getCatIcon(tx.category)}</span>
      </div>
      <div style={{ flex: 1, minWidth: 0 }}>
        <div style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 13, fontWeight: 600, color: "#222", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>{tx.vendor || "Unknown"}</div>
        <div style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 11, color: "#aaa" }}>{tx.category} • {formatDate(tx.date)}</div>
      </div>
      <div style={{ textAlign: "right", flexShrink: 0 }}>
        <div style={{ fontFamily: "'DM Serif Display', serif", fontSize: 15, color: tx.type === "income" ? COLORS.primary : COLORS.danger, fontWeight: 600 }}>
          {tx.type === "income" ? "+" : "-"}{tx.currency === "KHR" ? KHR(tx.total) : USD(tx.total || 0)}
        </div>
        <button className="btn-danger" style={{ marginTop: 2, padding: "2px 8px", fontSize: 10 }} onClick={e => { e.stopPropagation(); onDelete(tx.id); }}>Delete</button>
      </div>
    </div>
  );
}

function getCatIcon(cat) {
  const icons = {
    "Food & Beverage": "🍜", "Office Supplies": "📎", "Transport": "🚗", "Utilities": "💡",
    "Rent": "🏠", "Salaries": "👥", "Marketing": "📣", "Equipment": "🔧",
    "Repairs": "🔨", "Inventory": "📦", "Professional Services": "💼",
    "Taxes & Fees": "🏛️", "Other Expenses": "📋",
  };
  return icons[cat] || "💳";
}

function TxModal({ initial, onSave, onClose, isEdit }) {
  const today = new Date().toISOString().slice(0, 10);
  const [form, setForm] = useState({
    vendor: "", date: today, total: "", currency: "USD", category: "Other Expenses",
    type: "expense", description: "", invoiceNumber: "", vatAmount: "",
    ...(initial || {})
  });

  const set = (k, v) => setForm(f => ({ ...f, [k]: v }));

  const handleSubmit = () => {
    if (!form.vendor) return alert("Please enter vendor name");
    if (!form.total || isNaN(form.total)) return alert("Please enter a valid amount");
    onSave({ ...form, total: parseFloat(form.total), vatAmount: form.vatAmount ? parseFloat(form.vatAmount) : null });
  };

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal" onClick={e => e.stopPropagation()}>
        <div style={{ fontFamily: "'DM Serif Display', serif", fontSize: 20, marginBottom: 20, color: "#1a1a1a" }}>
          {isEdit ? "Edit Transaction" : initial ? "Review Scanned Data" : "Add Transaction"}
        </div>

        {initial && !isEdit && (
          <div style={{ background: COLORS.primaryLight, border: `1px solid ${COLORS.primary}`, borderRadius: 8, padding: "10px 14px", marginBottom: 16 }}>
            <div style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 12, color: COLORS.primaryDark, fontWeight: 600 }}>
              ✓ AI extracted this data — please review and confirm
            </div>
          </div>
        )}

        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12 }}>
          <div style={{ gridColumn: "1/-1" }}>
            <label>Vendor / Supplier Name *</label>
            <input value={form.vendor} onChange={e => set("vendor", e.target.value)} placeholder="e.g. Lucky Supermarket" />
          </div>
          <div>
            <label>Date *</label>
            <input type="date" value={form.date} onChange={e => set("date", e.target.value)} />
          </div>
          <div>
            <label>Invoice / Receipt #</label>
            <input value={form.invoiceNumber || ""} onChange={e => set("invoiceNumber", e.target.value)} placeholder="Optional" />
          </div>
          <div>
            <label>Amount *</label>
            <input type="number" step="0.01" value={form.total} onChange={e => set("total", e.target.value)} placeholder="0.00" />
          </div>
          <div>
            <label>Currency</label>
            <select value={form.currency} onChange={e => set("currency", e.target.value)}>
              <option value="USD">USD ($)</option>
              <option value="KHR">KHR (៛)</option>
            </select>
          </div>
          <div>
            <label>Type</label>
            <select value={form.type} onChange={e => set("type", e.target.value)}>
              <option value="expense">Expense</option>
              <option value="income">Income</option>
            </select>
          </div>
          <div>
            <label>Category</label>
            <select value={form.category} onChange={e => set("category", e.target.value)}>
              <optgroup label="Income">
                {CATEGORIES.filter(c => INCOME_CATS.includes(c)).map(c => <option key={c}>{c}</option>)}
              </optgroup>
              <optgroup label="Expenses">
                {CATEGORIES.filter(c => !INCOME_CATS.includes(c)).map(c => <option key={c}>{c}</option>)}
              </optgroup>
            </select>
          </div>
          <div>
            <label>VAT Amount</label>
            <input type="number" step="0.01" value={form.vatAmount || ""} onChange={e => set("vatAmount", e.target.value)} placeholder="0.00 (if applicable)" />
          </div>
          <div style={{ gridColumn: "1/-1" }}>
            <label>Description / Notes</label>
            <textarea value={form.description || ""} onChange={e => set("description", e.target.value)} rows={2} placeholder="Optional notes..." style={{ resize: "vertical" }} />
          </div>
        </div>

        <div style={{ display: "flex", gap: 10, marginTop: 20 }}>
          <button className="btn-primary" style={{ flex: 1 }} onClick={handleSubmit}>
            {isEdit ? "Save Changes" : "Save Transaction"}
          </button>
          <button className="btn-secondary" onClick={onClose}>Cancel</button>
        </div>
      </div>
    </div>
  );
}

function Reports({ transactions, business }) {
  const [year, setYear] = useState(new Date().getFullYear().toString());

  const yearTx = transactions.filter(t => t.date?.startsWith(year));
  const months = Array.from({ length: 12 }, (_, i) => {
    const m = String(i + 1).padStart(2, "0");
    const key = `${year}-${m}`;
    const txs = yearTx.filter(t => t.date?.startsWith(key));
    return {
      label: new Date(`${key}-01`).toLocaleDateString("en-US", { month: "short" }),
      income: txs.filter(t => t.type === "income").reduce((s, t) => s + (t.total || 0), 0),
      expense: txs.filter(t => t.type === "expense").reduce((s, t) => s + (t.total || 0), 0),
    };
  });

  const annualIncome = months.reduce((s, m) => s + m.income, 0);
  const annualExpense = months.reduce((s, m) => s + m.expense, 0);
  const annualProfit = annualIncome - annualExpense;
  const maxVal = Math.max(...months.map(m => Math.max(m.income, m.expense)), 1);

  const exportCSV = () => {
    const rows = [["Date", "Vendor", "Category", "Type", "Amount", "Currency", "Description", "Invoice#"]];
    yearTx.forEach(t => rows.push([t.date, t.vendor, t.category, t.type, t.total, t.currency, t.description || "", t.invoiceNumber || ""]));
    const csv = rows.map(r => r.map(c => `"${c}"`).join(",")).join("\n");
    const blob = new Blob([csv], { type: "text/csv" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a"); a.href = url;
    a.download = `${business.name}_${year}_transactions.csv`; a.click();
  };

  return (
    <div>
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 20 }}>
        <div style={{ fontFamily: "'DM Serif Display', serif", fontSize: 22, color: "#1a1a1a" }}>Annual Report</div>
        <div style={{ display: "flex", gap: 10, alignItems: "center" }}>
          <select value={year} onChange={e => setYear(e.target.value)} style={{ width: "auto" }}>
            {[2024, 2025, 2026, 2027].map(y => <option key={y}>{y}</option>)}
          </select>
          <button className="btn-primary" onClick={exportCSV}>Export CSV</button>
        </div>
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: 12, marginBottom: 24 }}>
        <div className="stat-card"><div style={{ fontSize: 11, color: "#888", fontFamily: "'DM Sans',sans-serif", fontWeight: 600, textTransform: "uppercase", letterSpacing: "0.08em", marginBottom: 6 }}>Annual Income</div><div style={{ fontFamily: "'DM Serif Display',serif", fontSize: 22, color: COLORS.primary }}>{USD(annualIncome)}</div></div>
        <div className="stat-card"><div style={{ fontSize: 11, color: "#888", fontFamily: "'DM Sans',sans-serif", fontWeight: 600, textTransform: "uppercase", letterSpacing: "0.08em", marginBottom: 6 }}>Annual Expenses</div><div style={{ fontFamily: "'DM Serif Display',serif", fontSize: 22, color: COLORS.danger }}>{USD(annualExpense)}</div></div>
        <div className="stat-card" style={{ background: annualProfit >= 0 ? COLORS.primaryLight : COLORS.dangerLight }}>
          <div style={{ fontSize: 11, color: "#888", fontFamily: "'DM Sans',sans-serif", fontWeight: 600, textTransform: "uppercase", letterSpacing: "0.08em", marginBottom: 6 }}>Net Profit</div>
          <div style={{ fontFamily: "'DM Serif Display',serif", fontSize: 22, color: annualProfit >= 0 ? COLORS.primaryDark : COLORS.danger }}>{USD(annualProfit)}</div>
        </div>
      </div>

      {/* Bar Chart */}
      <div className="card" style={{ padding: "20px 24px", marginBottom: 20 }}>
        <div style={{ fontFamily: "'DM Sans',sans-serif", fontWeight: 600, fontSize: 14, color: "#333", marginBottom: 16 }}>Monthly Income vs Expenses</div>
        <div style={{ display: "flex", alignItems: "flex-end", gap: 6, height: 140 }}>
          {months.map(m => (
            <div key={m.label} style={{ flex: 1, display: "flex", flexDirection: "column", alignItems: "center", gap: 2, height: "100%", justifyContent: "flex-end" }}>
              <div style={{ width: "100%", display: "flex", gap: 2, alignItems: "flex-end", height: 120 }}>
                <div style={{ flex: 1, background: COLORS.primary, borderRadius: "3px 3px 0 0", height: `${(m.income / maxVal) * 100}%`, minHeight: m.income > 0 ? 3 : 0, transition: "height 0.5s ease" }} title={`Income: ${USD(m.income)}`} />
                <div style={{ flex: 1, background: COLORS.accent, borderRadius: "3px 3px 0 0", height: `${(m.expense / maxVal) * 100}%`, minHeight: m.expense > 0 ? 3 : 0, transition: "height 0.5s ease" }} title={`Expense: ${USD(m.expense)}`} />
              </div>
              <div style={{ fontFamily: "'DM Sans',sans-serif", fontSize: 10, color: "#aaa" }}>{m.label}</div>
            </div>
          ))}
        </div>
        <div style={{ display: "flex", gap: 16, marginTop: 8 }}>
          <div style={{ display: "flex", alignItems: "center", gap: 6 }}><div style={{ width: 12, height: 12, background: COLORS.primary, borderRadius: 2 }} /><span style={{ fontFamily: "'DM Sans',sans-serif", fontSize: 11, color: "#888" }}>Income</span></div>
          <div style={{ display: "flex", alignItems: "center", gap: 6 }}><div style={{ width: 12, height: 12, background: COLORS.accent, borderRadius: 2 }} /><span style={{ fontFamily: "'DM Sans',sans-serif", fontSize: 11, color: "#888" }}>Expenses</span></div>
        </div>
      </div>

      {/* P&L Statement */}
      <div className="card" style={{ padding: "20px 24px" }}>
        <div style={{ fontFamily: "'DM Sans',sans-serif", fontWeight: 600, fontSize: 14, color: "#333", marginBottom: 16 }}>
          Profit & Loss Statement — {year}
          <span className="font-khmer" style={{ fontSize: 11, color: "#aaa", marginLeft: 8 }}>របាយការណ៍ប្រាក់ចំណេញ</span>
        </div>
        <table style={{ width: "100%", borderCollapse: "collapse", fontFamily: "'DM Sans',sans-serif", fontSize: 13 }}>
          <thead>
            <tr style={{ borderBottom: `1px solid ${COLORS.border}` }}>
              <th style={{ textAlign: "left", padding: "8px 4px", color: "#888", fontWeight: 600, fontSize: 11 }}>CATEGORY</th>
              {months.filter((_, i) => [0, 3, 6, 9, 11].includes(i)).map(m => (
                <th key={m.label} style={{ textAlign: "right", padding: "8px 4px", color: "#888", fontWeight: 600, fontSize: 11 }}>{m.label}</th>
              ))}
              <th style={{ textAlign: "right", padding: "8px 4px", color: "#888", fontWeight: 600, fontSize: 11 }}>TOTAL</th>
            </tr>
          </thead>
          <tbody>
            <tr style={{ borderBottom: `0.5px solid #eee` }}>
              <td style={{ padding: "8px 4px", color: COLORS.primary, fontWeight: 600 }}>Total Income</td>
              {months.filter((_, i) => [0, 3, 6, 9, 11].includes(i)).map(m => (
                <td key={m.label} style={{ textAlign: "right", padding: "8px 4px" }}>{m.income > 0 ? USD(m.income) : "—"}</td>
              ))}
              <td style={{ textAlign: "right", padding: "8px 4px", fontWeight: 600, color: COLORS.primary }}>{USD(annualIncome)}</td>
            </tr>
            <tr style={{ borderBottom: `0.5px solid #eee` }}>
              <td style={{ padding: "8px 4px", color: COLORS.danger, fontWeight: 600 }}>Total Expenses</td>
              {months.filter((_, i) => [0, 3, 6, 9, 11].includes(i)).map(m => (
                <td key={m.label} style={{ textAlign: "right", padding: "8px 4px" }}>{m.expense > 0 ? USD(m.expense) : "—"}</td>
              ))}
              <td style={{ textAlign: "right", padding: "8px 4px", fontWeight: 600, color: COLORS.danger }}>{USD(annualExpense)}</td>
            </tr>
            <tr style={{ background: annualProfit >= 0 ? COLORS.primaryLight : COLORS.dangerLight }}>
              <td style={{ padding: "10px 4px", fontWeight: 700, color: annualProfit >= 0 ? COLORS.primaryDark : COLORS.danger }}>Net Profit / Loss</td>
              {months.filter((_, i) => [0, 3, 6, 9, 11].includes(i)).map(m => {
                const n = m.income - m.expense;
                return <td key={m.label} style={{ textAlign: "right", padding: "10px 4px", fontWeight: 600, color: n >= 0 ? COLORS.primary : COLORS.danger }}>{n !== 0 ? USD(n) : "—"}</td>;
              })}
              <td style={{ textAlign: "right", padding: "10px 4px", fontWeight: 700, color: annualProfit >= 0 ? COLORS.primaryDark : COLORS.danger }}>{USD(annualProfit)}</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
}

function Settings({ business, setBusiness, showToast, transactions }) {
  const [form, setForm] = useState(business);
  const save = () => { setBusiness(form); showToast("Business profile saved!"); };

  const clearAll = () => {
    if (!confirm("Delete ALL transactions? This cannot be undone.")) return;
    localStorage.removeItem("sme_transactions");
    window.location.reload();
  };

  return (
    <div>
      <div style={{ fontFamily: "'DM Serif Display', serif", fontSize: 22, color: "#1a1a1a", marginBottom: 20 }}>Settings</div>

      <div className="card" style={{ padding: "24px", marginBottom: 20 }}>
        <div style={{ fontFamily: "'DM Sans',sans-serif", fontWeight: 600, fontSize: 14, marginBottom: 16, color: "#333" }}>Business Profile</div>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12 }}>
          <div style={{ gridColumn: "1/-1" }}>
            <label>Business Name</label>
            <input value={form.name || ""} onChange={e => setForm(f => ({ ...f, name: e.target.value }))} placeholder="e.g. Sophea Trading Co." />
          </div>
          <div>
            <label>Owner Name</label>
            <input value={form.owner || ""} onChange={e => setForm(f => ({ ...f, owner: e.target.value }))} placeholder="Your name" />
          </div>
          <div>
            <label>Default Currency</label>
            <select value={form.currency || "USD"} onChange={e => setForm(f => ({ ...f, currency: e.target.value }))}>
              <option value="USD">USD ($)</option>
              <option value="KHR">KHR (៛)</option>
            </select>
          </div>
          <div style={{ gridColumn: "1/-1" }}>
            <label>VAT Registration Number (if applicable)</label>
            <input value={form.vatReg || ""} onChange={e => setForm(f => ({ ...f, vatReg: e.target.value }))} placeholder="Optional" />
          </div>
        </div>
        <button className="btn-primary" style={{ marginTop: 16 }} onClick={save}>Save Profile</button>
      </div>

      <div className="card" style={{ padding: "24px", marginBottom: 20, background: "#FFFBF2", borderColor: "#F4C775" }}>
        <div style={{ fontFamily: "'DM Sans',sans-serif", fontWeight: 600, fontSize: 14, marginBottom: 8, color: "#7a5a00" }}>Data & Privacy</div>
        <div style={{ fontFamily: "'DM Sans',sans-serif", fontSize: 12, color: "#8a6a10", lineHeight: 1.7, marginBottom: 12 }}>
          All your data is stored locally in your browser (localStorage). Nothing is sent to any server except receipt images sent to Claude AI for processing. You have full control over your data.
        </div>
        <div style={{ fontFamily: "'DM Sans',sans-serif", fontSize: 12, color: "#8a6a10" }}>
          Total transactions stored: <strong>{transactions.length}</strong>
        </div>
      </div>

      <div className="card" style={{ padding: "24px", borderColor: COLORS.danger, background: COLORS.dangerLight }}>
        <div style={{ fontFamily: "'DM Sans',sans-serif", fontWeight: 600, fontSize: 14, marginBottom: 8, color: COLORS.danger }}>Danger Zone</div>
        <div style={{ fontFamily: "'DM Sans',sans-serif", fontSize: 12, color: COLORS.danger, marginBottom: 12 }}>
          Permanently delete all transactions from this device. This cannot be undone.
        </div>
        <button className="btn-danger" onClick={clearAll}>Delete All Transactions</button>
      </div>
    </div>
  );
}
