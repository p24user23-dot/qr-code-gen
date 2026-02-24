import { useState } from 'react';
import { InputForm } from './components/InputForm';
import { QrDisplay } from './components/QrDisplay';
import './index.css';

// Типізація для розширених налаштувань у стилі QRCode Monkey
export interface QRConfig {
  value: string;
  size: number;
  margin: number;
  bgColor: string;
  // Налаштування точок (тіла QR)
  dotsColor: string;
  dotsType: 'square' | 'dots' | 'rounded' | 'extra-rounded' | 'classy' | 'classy-rounded';
  // Налаштування кутів (очей)
  cornersSquareType: 'square' | 'dot' | 'extra-rounded';
  cornersSquareColor: string;
  cornersDotType: 'square' | 'dot';
  cornersDotColor: string;
  // Логотип
  image: string | null;
  imageSize: number; // від 0 до 1 (відсоток від розміру QR)
}

export default function App() {
  const [config, setConfig] = useState<QRConfig>({
    value: 'https://github.com/p24user23-dot/qr-code-gen',
    size: 300,
    margin: 10,
    bgColor: '#ffffff', // Monkey зазвичай робить світлий фон для контрасту
    dotsColor: '#000000',
    dotsType: 'square',
    cornersSquareType: 'square',
    cornersSquareColor: '#000000',
    cornersDotType: 'square',
    cornersDotColor: '#000000',
    image: null,
    imageSize: 0.4,
  });

  const updateConfig = (field: keyof QRConfig, val: any) => {
    setConfig((prev) => ({ ...prev, [field]: val }));
  };

  return (
    <div className="app-container">
      <h1 style={{ textAlign: 'center', marginBottom: '2rem' }}>QR Monkey Pro Clone</h1>
      
      <main className="main-layout">
        <section className="controls">
          <InputForm config={config} onChange={updateConfig} />
        </section>

        <section className="preview" style={{ display: 'flex', justifyContent: 'center', alignItems: 'flex-start' }}>
          <QrDisplay config={config} />
        </section>
      </main>
    </div>
  );
}