import React from 'react';
import { createRoot } from 'react-dom/client';

const cardStyle: React.CSSProperties = {
  background: '#fff',
  border: '1px solid #e5e7eb',
  borderRadius: 12,
  padding: 16,
  boxShadow: '0 1px 2px rgba(0,0,0,0.05)',
};

function App() {
  return (
    <main style={{ fontFamily: 'Inter, system-ui, sans-serif', background: '#f3f4f6', minHeight: '100vh', padding: 24 }}>
      <header style={{ marginBottom: 20 }}>
        <h1 style={{ margin: 0, fontSize: 30 }}>ColaboShop · Platform Panel</h1>
        <p style={{ marginTop: 8, color: '#4b5563' }}>Superadmin SaaS: tenants, planes, billing manual y métricas globales.</p>
      </header>

      <section style={{ display: 'grid', gridTemplateColumns: 'repeat(4, minmax(0,1fr))', gap: 12, marginBottom: 16 }}>
        {[
          ['Workspaces activos', '12'],
          ['Ventas del mes', '$24.580.230'],
          ['Vendors totales', '389'],
          ['MRR estimado', '$1.950.000'],
        ].map(([label, value]) => (
          <article key={label} style={cardStyle}>
            <small style={{ color: '#6b7280' }}>{label}</small>
            <h2 style={{ margin: '6px 0 0', fontSize: 24 }}>{value}</h2>
          </article>
        ))}
      </section>

      <section style={{ ...cardStyle }}>
        <h3 style={{ marginTop: 0 }}>Workspaces recientes</h3>
        <table style={{ width: '100%', borderCollapse: 'collapse' }}>
          <thead>
            <tr style={{ textAlign: 'left', borderBottom: '1px solid #e5e7eb' }}>
              <th>Nombre</th><th>Plan</th><th>Estado</th><th>Timezone</th>
            </tr>
          </thead>
          <tbody>
            <tr><td>ColaboStore Centro</td><td>PRO</td><td>ACTIVE</td><td>America/Santiago</td></tr>
            <tr><td>Galería X</td><td>STARTER</td><td>ACTIVE</td><td>America/Lima</td></tr>
            <tr><td>Bazar Colectivo Norte</td><td>FREE</td><td>SUSPENDED</td><td>America/Bogota</td></tr>
          </tbody>
        </table>
      </section>
    </main>
  );
}

createRoot(document.getElementById('root')!).render(<App />);
