import React, { useState } from "react";

// Simula direcciones por moneda con depósito mínimo
const MONEDAS = [
  { symbol: "USDT", chain: "BNB Smart Chain(BEP20)", address: "0x35af0574fc5b036074b252ec6101934f5405ca80", minDeposit: "10 USDT" },
  { symbol: "BTC", chain: "BNB Smart Chain(BEP20)", address: "0x35af0574fc5b036074b252ec6101934f5405ca80", minDeposit: "0.00011 BTC" },
  { symbol: "ETH", chain: "Ethereum(ERC20)", address: "0x35af0574fc5b036074b252ec6101934f5405ca80", minDeposit: "0.003 ETH" },
  { symbol: "BNB", chain: "BNB Smart Chain(BEP20)", address: "0x35af0574fc5b036074b252ec6101934f5405ca80", minDeposit: "0.02 BNB" },
  { symbol: "SOL", chain: "Solana(SOL)", address: "GVUG8eFoB9M3DcBh97yK5RaVWagy6bzWBbpzfeczv9XE", minDeposit: "0.07 SOL" }
];

export default function DepositosRetiros() {
  const [selected, setSelected] = useState(MONEDAS[0]);
  const [copied, setCopied] = useState(false);
  const [timeLeft, setTimeLeft] = useState("");

  // Datos del activo congelado
  const frozenAmount = 40121.23;
  const frozenDate = new Date("2024-08-07T00:00:00");
  const releaseDate = new Date("2033-08-07T00:00:00");
  const nextInterestDate = new Date("2026-08-07T00:00:00");

  function handleCopy() {
    navigator.clipboard.writeText(selected.address);
    setCopied(true);
    setTimeout(() => setCopied(false), 1500);
  }

  function handleUnfreeze() {
    alert(`Para descongelar debes pagar una fee de 10 USDT.`);
  }

  // Calcula tiempo restante en vivo
  useEffect(() => {
    const timer = setInterval(() => {
      const now = new Date();
      const diff = releaseDate - now;

      if (diff <= 0) {
        setTimeLeft("Liberado");
        clearInterval(timer);
      } else {
        const years = Math.floor(diff / (1000 * 60 * 60 * 24 * 365));
        const days = Math.floor((diff % (1000 * 60 * 60 * 24 * 365)) / (1000 * 60 * 60 * 24));
        const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((diff % (1000 * 60)) / 1000);

        setTimeLeft(`${years} años, ${days} días, ${hours}h ${minutes}m ${seconds}s`);
      }
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  return (
    <div>
      <h3 style={{ marginBottom: 12 }}>Depósitos y Retiros (Simulado)</h3>
      <div style={{ marginBottom: 16 }}>
        <label style={{ fontWeight: 500, marginRight: 10 }}>Moneda:</label>
        <select
          onChange={e => setSelected(MONEDAS.find(m => m.symbol === e.target.value))}
          value={selected.symbol}
          style={{ padding: 6, borderRadius: 4, border: "1px solid #ccc" }}
        >
          {MONEDAS.map(m => (
            <option key={m.symbol} value={m.symbol}>
              {m.symbol} ({m.chain})
            </option>
          ))}
        </select>
      </div>

      {/* Dirección de depósito */}
      <div style={{ background: "#f5f6fa", padding: 16, borderRadius: 8, marginBottom: 16 }}>
        <div style={{ fontWeight: 600, fontSize: 15 }}>Dirección de depósito:</div>
        <div style={{ fontFamily: "monospace", wordBreak: "break-all", fontSize: 14, margin: "8px 0" }}>
          {selected.address}
        </div>
        <button
          onClick={handleCopy}
          style={{
            padding: "6px 14px",
            background: "#2986fa",
            color: "#fff",
            border: "none",
            borderRadius: 4,
            fontWeight: 600,
            cursor: "pointer"
          }}
        >
          Copiar dirección
        </button>
        {copied && <span style={{ color: "#27ae60", marginLeft: 8 }}>¡Copiado!</span>}
      </div>

      <div style={{ marginBottom: 20, fontSize: 13, color: "#888" }}>
        Enviar cualquier otro activo puede provocar la pérdida irreversible de tus fondos.<br />
        Asegúrate de seleccionar la red correcta y usar la dirección adecuada.
      </div>

      {/* Activos congelados */}
      <h4 style={{ marginTop: 24, marginBottom: 12 }}>Activos Congelados</h4>
      <table style={{ width: "100%", borderCollapse: "collapse" }}>
        <thead>
          <tr>
            <th style={{ textAlign: "left", borderBottom: "1px solid #ccc", padding: "6px 0" }}>Cantidad</th>
            <th style={{ textAlign: "left", borderBottom: "1px solid #ccc", padding: "6px 0" }}>Fecha Congelación</th>
            <th style={{ textAlign: "left", borderBottom: "1px solid #ccc", padding: "6px 0" }}>Fecha Liberación</th>
            <th style={{ textAlign: "left", borderBottom: "1px solid #ccc", padding: "6px 0" }}>Tiempo Restante</th>
            <th style={{ textAlign: "left", borderBottom: "1px solid #ccc", padding: "6px 0" }}>Próx. Interés</th>
            <th style={{ textAlign: "left", borderBottom: "1px solid #ccc", padding: "6px 0" }}>Acción</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>{frozenAmount.toLocaleString()} USDT</td>
            <td>{frozenDate.toLocaleDateString()}</td>
            <td>{releaseDate.toLocaleDateString()}</td>
            <td>{timeLeft}</td>
            <td>{nextInterestDate.toLocaleDateString()}</td>
            <td>
              <button
                onClick={handleUnfreeze}
                style={{
                  padding: "4px 10px",
                  background: "#e67e22",
                  color: "#fff",
                  border: "none",
                  borderRadius: 4,
                  fontWeight: 600,
                  cursor: "pointer"
                }}
              >
                Descongelar (10 USDT)
              </button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  );
}

