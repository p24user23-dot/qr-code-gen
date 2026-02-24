import { useRef } from 'react';
import { QRCodeCanvas } from 'qrcode.react';
import type { QRConfig } from '../App';

interface QrDisplayProps {
  config: QRConfig;
}

export function QrDisplay({ config }: QrDisplayProps) {
  // Реф для доступу до DOM-елемента, який обгортає наш canvas
  const qrWrapperRef = useRef<HTMLDivElement>(null);

  const handleDownloadPNG = () => {
    if (!qrWrapperRef.current) return;

    // Шукаємо canvas всередині нашої обгортки
    const canvas = qrWrapperRef.current.querySelector('canvas');
    if (!canvas) {
      console.error('Canvas не знайдено');
      return;
    }

    // Конвертуємо canvas у формат PNG
    const pngUrl = canvas.toDataURL('image/png');

    // Створюємо віртуальне посилання для завантаження
    const downloadLink = document.createElement('a');
    downloadLink.href = pngUrl;
    downloadLink.download = `qr-code-${Date.now()}.png`; // Унікальне ім'я файлу
    document.body.appendChild(downloadLink);
    downloadLink.click();
    document.body.removeChild(downloadLink);
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '2rem' }}>
      
      {/* Обгортка з рефом */}
      <div 
        ref={qrWrapperRef}
        style={{ 
          padding: '1rem', 
          backgroundColor: config.bgColor, // Рамка навколо QR в колір фону 
          borderRadius: '12px',
          display: 'inline-block' 
        }}
      >
        <QRCodeCanvas
          value={config.value || ' '}
          size={config.size}
          bgColor={config.bgColor}
          fgColor={config.fgColor}
          level="H"
        />
      </div>

      <button
        onClick={handleDownloadPNG}
        style={{
          padding: '0.8rem 1.5rem',
          fontSize: '1rem',
          fontWeight: 'bold',
          color: '#fff',
          backgroundColor: '#4CAF50',
          border: 'none',
          borderRadius: '8px',
          cursor: 'pointer',
          boxShadow: '0 4px 6px rgba(0,0,0,0.3)',
          transition: 'background-color 0.2s'
        }}
        onMouseOver={(e) => e.currentTarget.style.backgroundColor = '#45a049'}
        onMouseOut={(e) => e.currentTarget.style.backgroundColor = '#4CAF50'}
      >
        Завантажити PNG
      </button>
    </div>
  );
}