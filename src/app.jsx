import React, { useState } from "react";
import Login from "./components/Login";
import Wallet from "./components/Wallet";
import { AnimatePresence, motion } from "framer-motion";

function App() {
  const [user, setUser] = useState(null);
  const [error, setError] = useState("");

  // Usuarios válidos simulados
  const users = [
    { username: "fabricio172", password: "Facribicio13425786." },
    { username: "joalprocrypto331", password: "Homercrazy43131#" }
  ];

  function handleLogin(username, password) {
    const found = users.find(
      (u) => u.username === username && u.password === password
    );
    if (found) {
      setUser({ username });
      setError("");
      return true;
    }
    setError("Usuario o contraseña incorrectos");
    return false;
  }

  function handleLogout() {
    setUser(null);
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <AnimatePresence mode="wait">
        {!user ? (
          <motion.div
            key="login"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -30 }}
            transition={{ duration: 0.3 }}
            className="w-full max-w-md"
          >
            <Login onLogin={handleLogin} error={error} />
          </motion.div>
        ) : (
          <motion.div
            key="wallet"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="w-full"
          >
            <Wallet user={user} onLogout={handleLogout} />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export default App;
