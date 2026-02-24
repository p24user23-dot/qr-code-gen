import { useState } from 'react';
import { QRCodeCanvas } from 'qrcode.react';
import { InputForm } from './components/InputForm';
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

        <section className="preview" style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
          <QRCodeCanvas
            value={config.value || ' '}
            size={config.size}
            bgColor={config.bgColor}
            fgColor={config.fgColor}
            level="H"
          />
        </section>
      </main>
    </div>
  );
}