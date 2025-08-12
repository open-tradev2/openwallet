import React, { useState } from "react";
import Cotizaciones from "./Cotizaciones";
import Historial from "./Historial";
import DepositosRetiros from "./DepositosRetiros";
import Contacto from "./Contacto";
import { motion, AnimatePresence } from "framer-motion";
import { LogOut } from "lucide-react";

const SALDO = 42714.8;
const HISTORIAL = [
  {
    date: "2024-08-07",
    type: "Depósito",
    amount: 40121.23,
    currency: "USDT",
    status: "Congelado",
    details: "40121.23 USDT depositados y congelados el 7 de agosto de 2024",
  },
];

export default function Wallet({ user, onLogout }) {
  const [tab, setTab] = useState("balance");

  const tabs = [
    { id: "balance", label: "Balance" },
    { id: "cotizaciones", label: "Cotizaciones" },
    { id: "depositos", label: "Depósitos/Retiros" },
    { id: "historial", label: "Historial" },
    { id: "contacto", label: "Contacto" },
  ];

  return (
    <div className="max-w-lg mx-auto mt-8 bg-white shadow-xl rounded-2xl p-6">
      {/* Header */}
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-xl font-semibold text-gray-800">
          Bienvenido, {user.username}
        </h2>
        <button
          onClick={onLogout}
          className="flex items-center gap-1 text-red-500 hover:text-red-600 text-sm"
        >
          <LogOut size={16} /> Salir
        </button>
      </div>

      {/* Balance Card */}
      <div className="bg-blue-50 border border-blue-100 rounded-xl p-4 mb-4">
        <div className="text-sm text-gray-600">Balance total</div>
        <div className="text-3xl font-bold text-blue-600 mt-1">
          {SALDO.toLocaleString()} USDT
        </div>
        <div className="text-amber-600 text-xs mt-1">
          Tus activos están congelados.
        </div>
      </div>

      {/* Tabs */}
      <div className="flex gap-2 mb-4">
        {tabs.map((t) => (
          <button
            key={t.id}
            onClick={() => setTab(t.id)}
            className={`flex-1 py-2 rounded-lg text-sm font-medium transition-colors ${
              tab === t.id
                ? "bg-blue-600 text-white"
                : "bg-gray-100 hover:bg-gray-200 text-gray-700"
            }`}
          >
            {t.label}
          </button>
        ))}
      </div>

      {/* Content */}
      <AnimatePresence mode="wait">
        <motion.div
          key={tab}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
          transition={{ duration: 0.2 }}
          className="min-h-[150px]"
        >
          {tab === "balance" && (
            <div>
              <div className="font-semibold text-gray-800 text-sm">
                Activo principal: USDT
              </div>
              <div className="text-gray-500 text-xs">
                No puedes operar ni retirar. Tus activos estan congelados.
              </div>
            </div>
          )}
          {tab === "cotizaciones" && <Cotizaciones />}
          {tab === "depositos" && <DepositosRetiros />}
          {tab === "historial" && <Historial historial={HISTORIAL} />}
          {tab === "contacto" && <Contacto />}
        </motion.div>
      </AnimatePresence>
    </div>
  );
}
