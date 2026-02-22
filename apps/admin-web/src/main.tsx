import React from 'react';
import { createRoot } from 'react-dom/client';

const box: React.CSSProperties = {
  background: '#ffffff',
  border: '1px solid #dbeafe',
  borderRadius: 10,
  padding: 14,
};

function App() {
  return (
    <main style={{ fontFamily: 'Inter, system-ui, sans-serif', background: '#eff6ff', minHeight: '100vh', padding: 24 }}>
      <h1 style={{ margin: 0 }}>ColaboShop · Workspace Admin</h1>
      <p style={{ color: '#334155' }}>Gestión diaria de vendors, productos, inventario y ventas POS.</p>

      <section style={{ display: 'grid', gap: 12, gridTemplateColumns: 'repeat(3, minmax(0, 1fr))', marginTop: 18 }}>
        <div style={box}><strong>Vendors activos</strong><div>47</div></div>
        <div style={box}><strong>Productos</strong><div>1.284</div></div>
        <div style={box}><strong>Ventas hoy</strong><div>$1.403.900</div></div>
      </section>

      <section style={{ marginTop: 16, ...box }}>
        <h3 style={{ marginTop: 0 }}>Módulos</h3>
        <ul style={{ margin: 0, paddingLeft: 20 }}>
          <li>Vendor Stores (CRUD + link público)</li>
          <li>Productos + códigos de barras</li>
          <li>Inventario (ingresos, ajustes, mermas)</li>
          <li>POS ventas (scanner)</li>
          <li>Reportes diarios/mensuales</li>
          <li>Configuración de comisión y cierre diario</li>
        </ul>
      </section>
    </main>
  );
}

createRoot(document.getElementById('root')!).render(<App />);
