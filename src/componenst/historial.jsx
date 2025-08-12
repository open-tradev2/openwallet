import React from "react";

export default function Historial({ historial }) {
  const formatDate = (date) => {
    return new Date(date).toLocaleDateString("es-ES", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  };

  const getStatusColor = (status) => {
    switch (status) {
      case "Completado":
        return "bg-green-100 text-green-700";
      case "Pendiente":
        return "bg-yellow-100 text-yellow-700";
      case "Congelado":
        return "bg-orange-100 text-orange-700";
      case "Fallido":
        return "bg-red-100 text-red-700";
      default:
        return "bg-gray-100 text-gray-700";
    }
  };

  return (
    <div>
      <h3 className="text-lg font-semibold mb-3 text-gray-800">Historial de Movimientos</h3>
      <div className="overflow-x-auto">
        <table className="w-full text-sm">
          <thead>
            <tr className="bg-gray-50 text-gray-600">
              <th className="text-left p-2">Fecha</th>
              <th className="text-left p-2">Tipo</th>
              <th className="text-right p-2">Monto</th>
              <th className="text-left p-2">Estado</th>
            </tr>
          </thead>
          <tbody>
            {historial.map((h, i) => (
              <tr key={i} className="border-b last:border-none">
                <td className="p-2">{formatDate(h.date)}</td>
                <td className="p-2">{h.type}</td>
                <td className="p-2 text-right">
                  {h.amount.toLocaleString()} {h.currency}
                </td>
                <td className="p-2">
                  <span className={`px-2 py-1 text-xs rounded ${getStatusColor(h.status)}`}>
                    {h.status}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className="mt-3 text-xs text-gray-500">
        *Depósitos, retiros e intercambios.
      </div>
    </div>
  );
}
