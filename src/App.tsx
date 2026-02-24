// src/App.tsx
import { useState } from 'react';
import { QRCodeCanvas } from 'qrcode.react';
import './index.css'; // App.css нам поки не потрібен

// Типізація нашого стану
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
    fgColor: '#ffffff', // Білий QR для темної теми
    bgColor: '#1e1e1e', // В колір фону контейнера
  });

  // Універсальний хендлер для оновлення полів конфігу
  const updateConfig = (field: keyof QRConfig, val: string | number) => {
    setConfig((prev) => ({ ...prev, [field]: val }));
  };

  return (
    <div className="app-container">
      <h1 style={{ textAlign: 'center', marginBottom: '2rem' }}>QR Generator PRO</h1>
      
      <main className="main-layout">
        {/* Секція контролів (тимчасово тут, далі винесемо в InputForm.tsx) */}
        <section className="controls">
          <h2>Налаштування</h2>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            <input
              type="text"
              value={config.value}
              onChange={(e) => updateConfig('value', e.target.value)}
              placeholder="Введіть текст або URL"
              style={{ padding: '0.8rem', borderRadius: '6px', border: 'none' }}
            />
            {/* Інші контроли додамо при декомпозиції */}
          </div>
        </section>

        {/* Секція відображення (тимчасово тут, далі винесемо в QrDisplay.tsx) */}
        <section className="preview" style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
          <QRCodeCanvas
            value={config.value || ' '} // Пробіл, щоб бібліотека не крешилась на порожньому рядку
            size={config.size}
            bgColor={config.bgColor}
            fgColor={config.fgColor}
            level="H" // Рівень корекції помилок High - краще для зчитування, якщо додамо логотип
          />
        </section>
      </main>
    </div>
  );
}