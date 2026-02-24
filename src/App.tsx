import { useState } from 'react';
// Видаляємо імпорт QRCodeCanvas, бо він тепер живе в QrDisplay
import { InputForm } from './components/InputForm';
import { QrDisplay } from './components/QrDisplay'; // Додаємо імпорт
import './index.css';

export interface QRConfig {
  value: string;
  size: number;
  fgColor: string;
  bgColor: string;
}

export default function App() {
  const [config, setConfig] = useState<QRConfig>({
    value: 'https://github.com/p24user23-dot/qr-code-gen',
    size: 256,
    fgColor: '#ffffff',
    bgColor: '#1e1e1e',
  });

  const updateConfig = (field: keyof QRConfig, val: string | number) => {
    setConfig((prev) => ({ ...prev, [field]: val }));
  };

  return (
    <div className="app-container">
      <h1 style={{ textAlign: 'center', marginBottom: '2rem' }}>QR Generator PRO</h1>
      
      <main className="main-layout">
        <section className="controls">
          <h2 style={{ marginTop: 0, marginBottom: '1.5rem' }}>Налаштування</h2>
          <InputForm config={config} onChange={updateConfig} />
        </section>

        {/* Замінили жорстко закодований QRCodeCanvas на наш новий компонент */}
        <section className="preview" style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
          <QrDisplay config={config} />
        </section>
      </main>
    </div>
  );
}