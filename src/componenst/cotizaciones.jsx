import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Loader2, X } from "lucide-react";

// Criptos con saldo falso
const SYMBOLS = [
  { id: "bitcoin", name: "Bitcoin", symbol: "BTC", balance: 0.25, color: "text-yellow-500" },
  { id: "ethereum", name: "Ethereum", symbol: "ETH", balance: 2, color: "text-purple-500" },
  { id: "tether", name: "Tether", symbol: "USDT", balance: 500, color: "text-green-500" },
  { id: "binancecoin", name: "BNB", symbol: "BNB", balance: 3, color: "text-yellow-400" },
  { id: "solana", name: "Solana", symbol: "SOL", balance: 10, color: "text-indigo-500" },
];

export default function Cotizaciones() {
  const [data, setData] = useState({});
  const [loading, setLoading] = useState(true);
  const [selected, setSelected] = useState(null);
  const [totalUSD, setTotalUSD] = useState(0);

  const fetchPrices = () => {
    fetch(
      `https://api.coingecko.com/api/v3/simple/price?ids=${SYMBOLS.map(
        (s) => s.id
      ).join(",")}&vs_currencies=usd`
    )
      .then((res) => res.json())
      .then((resp) => {
        setData(resp);
        setLoading(false);
      });
  };

  useEffect(() => {
    fetchPrices();
    const interval = setInterval(fetchPrices, 10000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    if (!loading) {
      const total = SYMBOLS.reduce((acc, c) => {
        const price = data[c.id]?.usd || 0;
        return acc + price * c.balance;
      }, 0);
      setTotalUSD(total);
    }
  }, [data, loading]);

  return (
    <div>
      <h3 className="text-lg font-semibold text-gray-800 mb-3">
        Cotizaciones <span className="text-gray-500 text-sm">(CoinGecko)</span>
      </h3>

      {/* Total de la wallet */}
      <div className="p-4 bg-blue-50 border border-blue-100 rounded-lg mb-4">
        <div className="text-sm text-gray-600">Valor total estimado</div>
        <div className="text-2xl font-bold text-blue-600">
          {loading ? "Cargando..." : `$${totalUSD.toLocaleString()}`}
        </div>
        <div className="text-xs text-gray-500 mt-1">
          *Saldo congelado "tiempo restante 8 años"
        </div>
      </div>

      {/* Lista de criptos */}
      {loading ? (
        <div className="flex justify-center items-center py-6 text-gray-500">
          <Loader2 className="animate-spin mr-2" /> Cargando cotizaciones...
        </div>
      ) : (
        <div className="space-y-2">
          {SYMBOLS.map((c) => (
            <motion.div
              key={c.id}
              onClick={() => setSelected(c)}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.2 }}
              className="flex justify-between items-center p-3 bg-gray-50 rounded-lg border border-gray-100 hover:bg-gray-100 transition cursor-pointer"
            >
              <div>
                <div className={`font-medium ${c.color}`}>{c.name}</div>
                <div className="text-xs text-gray-500">{c.symbol}</div>
              </div>
              <div className="text-right">
                <div className="font-semibold text-gray-800">
                  {data[c.id]?.usd ? `$${data[c.id].usd.toLocaleString()}` : "-"}
                </div>
                <div className="text-xs text-gray-500">
                  {c.balance} {c.symbol}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      )}

      <div className="mt-2 text-xs text-gray-500">
        
      </div>

      {/* Panel de detalles */}
      <AnimatePresence>
        {selected && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
            className="fixed inset-0 bg-black/40 flex items-center justify-center z-50"
          >
            <div className="bg-white p-5 rounded-xl shadow-lg w-80 relative">
              <button
                onClick={() => setSelected(null)}
                className="absolute top-3 right-3 text-gray-400 hover:text-gray-600"
              >
                <X size={18} />
              </button>

              <h4 className="text-lg font-semibold mb-2">
                {selected.name} <span className="text-gray-500 text-sm">({selected.symbol})</span>
              </h4>

              <p className="text-xl font-bold text-gray-800 mb-2">
                {data[selected.id]?.usd
                  ? `$${data[selected.id].usd.toLocaleString()}`
                  : "-"}
              </p>

              <div className="bg-yellow-50 text-yellow-700 p-2 rounded-md text-sm mb-3">
                Saldo simulado: {selected.balance} {selected.symbol}  
                <br /> ≈ ${((data[selected.id]?.usd || 0) * selected.balance).toLocaleString()}
              </div>

              <button
                disabled
                className="w-full bg-gray-300 text-gray-600 py-2 rounded-lg cursor-not-allowed"
              >
                Intercambiar (deshabilitado, activos congelados)
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
