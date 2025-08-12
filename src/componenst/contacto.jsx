import React, { useState } from "react";

export default function Contacto() {
  const [sent, setSent] = useState(false);

  function handleSubmit(e) {
    e.preventDefault();
    setSent(true);
    setTimeout(() => setSent(false), 2500);
  }

  return (
    <div>
      <h3 style={{ marginBottom: 12 }}>Atención al Cliente</h3>

      <form 
        onSubmit={handleSubmit} 
        style={{ 
          maxWidth: 350, 
          background: "#f9f9fb", 
          padding: 16, 
          borderRadius: 8, 
          border: "1px solid #e3e6eb" 
        }}
      >
        <input
          type="text"
          name="nombre"
          placeholder="Tu nombre"
          required
          style={{ width: "100%", marginBottom: 10, padding: 8, borderRadius: 4, border: "1px solid #ccc" }}
        />
        <input
          type="email"
          name="email"
          placeholder="Tu email"
          required
          style={{ width: "100%", marginBottom: 10, padding: 8, borderRadius: 4, border: "1px solid #ccc" }}
        />
        <textarea
          name="mensaje"
          placeholder="¿En qué podemos ayudarte?"
          required
          rows={3}
          style={{ width: "100%", marginBottom: 10, padding: 8, borderRadius: 4, border: "1px solid #ccc" }}
        />
        <button
          type="submit"
          style={{ width: "100%", padding: 10, background: "#2986fa", color: "#fff", border: "none", borderRadius: 4, fontWeight: 600 }}
        >
          Enviar mensaje
        </button>
      </form>

      {/* Mensaje de confirmación */}
      {sent && (
        <div style={{ 
          color: "#27ae60", 
          marginTop: 10, 
          fontWeight: 600, 
          background: "#eafaf1", 
          padding: 8, 
          borderRadius: 4, 
          border: "1px solid #b6e6c4" 
        }}>
          ✅ Mensaje enviado.
        </div>
      )}

      {/* Nota informativa */}
      <div style={{ 
        marginTop: 12, 
        fontSize: 13, 
        color: "#888", 
        background: "#fff8f0", 
        padding: 10, 
        borderRadius: 6, 
        border: "1px solid #f5cba7" 
      }}>
        ℹ Tu respuesta podria llegar hasta en 1 semana habil.
      </div>
    </div>
  );
}
