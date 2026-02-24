import type { QRConfig } from '../App';

interface InputFormProps {
  config: QRConfig;
  onChange: (field: keyof QRConfig, val: string | number) => void;
}

export function InputForm({ config, onChange }: InputFormProps) {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
      
      {/* Введення тексту */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
        <label htmlFor="qr-text" style={{ fontSize: '0.9rem', color: '#aaa' }}>Текст або URL</label>
        <input
          id="qr-text"
          type="text"
          value={config.value}
          onChange={(e) => onChange('value', e.target.value)}
          placeholder="Введіть дані..."
          style={{ padding: '0.8rem', borderRadius: '6px', border: 'none', backgroundColor: '#2a2a2a', color: '#fff' }}
        />
      </div>

      {/* Налаштування розміру */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
        <label htmlFor="qr-size" style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.9rem', color: '#aaa' }}>
          <span>Розмір (px)</span>
          <span>{config.size}x{config.size}</span>
        </label>
        <input
          id="qr-size"
          type="range"
          min="128"
          max="512"
          step="8"
          value={config.size}
          onChange={(e) => onChange('size', parseInt(e.target.value, 10))}
          style={{ cursor: 'pointer' }}
        />
      </div>

      {/* Налаштування кольорів */}
      <div style={{ display: 'flex', gap: '1rem' }}>
        <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
          <label htmlFor="qr-fg" style={{ fontSize: '0.9rem', color: '#aaa' }}>Колір QR</label>
          <input
            id="qr-fg"
            type="color"
            value={config.fgColor}
            onChange={(e) => onChange('fgColor', e.target.value)}
            style={{ width: '100%', height: '40px', cursor: 'pointer', border: 'none', padding: 0, backgroundColor: 'transparent' }}
          />
        </div>
        
        <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
          <label htmlFor="qr-bg" style={{ fontSize: '0.9rem', color: '#aaa' }}>Колір фону</label>
          <input
            id="qr-bg"
            type="color"
            value={config.bgColor}
            onChange={(e) => onChange('bgColor', e.target.value)}
            style={{ width: '100%', height: '40px', cursor: 'pointer', border: 'none', padding: 0, backgroundColor: 'transparent' }}
          />
        </div>
      </div>

    </div>
  );
}