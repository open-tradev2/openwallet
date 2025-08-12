import React, { useState } from "react";
import { motion } from "framer-motion";
import { Lock, User } from "lucide-react";

export default function Login({ onLogin, error }) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  function handleSubmit(e) {
    e.preventDefault();
    onLogin(username, password);
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      className="bg-white shadow-lg rounded-2xl p-6 w-full max-w-md mx-auto"
    >
      <h2 className="text-2xl font-semibold text-center mb-6 text-gray-800">
        Mini Wallet
      </h2>

      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Usuario */}
        <div>
          <label className="block text-sm font-medium text-gray-600 mb-1">
            Usuario
          </label>
          <div className="flex items-center border border-gray-300 rounded-lg px-3">
            <User className="text-gray-400 w-4 h-4 mr-2" />
            <input
              type="text"
              placeholder="Ingresa tu usuario"
              value={username}
              autoFocus
              onChange={(e) => setUsername(e.target.value)}
              className="w-full p-2 focus:outline-none"
            />
          </div>
        </div>

        {/* Contraseña */}
        <div>
          <label className="block text-sm font-medium text-gray-600 mb-1">
            Contraseña
          </label>
          <div className="flex items-center border border-gray-300 rounded-lg px-3">
            <Lock className="text-gray-400 w-4 h-4 mr-2" />
            <input
              type="password"
              placeholder="••••••••"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full p-2 focus:outline-none"
            />
          </div>
        </div>

        {/* Error */}
        {error && (
          <div className="text-red-500 text-sm text-center">{error}</div>
        )}

        {/* Botón */}
        <button
          type="submit"
          className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 rounded-lg font-semibold transition-colors"
        >
          Ingresar
        </button>
      </form>

      {/* Datos de prueba */}
      <div className="mt-4 text-xs text-gray-500 text-center">
        --- / --- <br /> admin / admin
      </div>
    </motion.div>
  );
}
