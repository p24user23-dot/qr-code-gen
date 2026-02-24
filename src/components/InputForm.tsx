import type { QRConfig } from '../App';
import type { ChangeEvent } from 'react';

interface InputFormProps {
  config: QRConfig;
  onChange: (field: keyof QRConfig, val: any) => void;
}

export function InputForm({ config, onChange }: InputFormProps) {
  
  // Хендлер для завантаження логотипу і перетворення його в DataURL (base64)
  const handleImageUpload = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        onChange('image', event.target?.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  // Компонент-помічник для рендеру селектів
  const Select = ({ label, field, options }: { label: string, field: keyof QRConfig, options: string[] }) => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem', flex: 1 }}>
      <label style={{ fontSize: '0.9rem', color: '#aaa' }}>{label}</label>
      <select 
        value={config[field] as string} 
        onChange={(e) => onChange(field, e.target.value)}
        style={{ padding: '0.8rem', borderRadius: '6px', border: 'none', backgroundColor: '#2a2a2a', color: '#fff', cursor: 'pointer' }}
      >
        {options.map(opt => <option key={opt} value={opt}>{opt}</option>)}
      </select>
    </div>
  );

  // Компонент-помічник для рендеру вибору кольору
  const ColorPicker = ({ label, field }: { label: string, field: keyof QRConfig }) => (
     <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem', flex: 1 }}>
      <label style={{ fontSize: '0.9rem', color: '#aaa' }}>{label}</label>
      <input
        type="color"
        value={config[field] as string}
        onChange={(e) => onChange(field, e.target.value)}
        style={{ width: '100%', height: '40px', cursor: 'pointer', border: 'none', padding: 0, backgroundColor: 'transparent' }}
      />
    </div>
  );

  return (
    <div style={{ 
      display: 'flex', 
      flexDirection: 'column', 
      gap: '1.5rem', 
      maxHeight: '75vh', 
      overflowY: 'auto', // Додали скрол, бо налаштувань тепер багато
      paddingRight: '1rem' 
    }}>
      
      {/* 1. Дані та розміри */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
        <label style={{ fontSize: '0.9rem', color: '#aaa' }}>Дані (Текст або URL)</label>
        <input
          type="text"
          value={config.value}
          onChange={(e) => onChange('value', e.target.value)}
          style={{ padding: '0.8rem', borderRadius: '6px', border: 'none', backgroundColor: '#2a2a2a', color: '#fff' }}
        />
      </div>

      <div style={{ display: 'flex', gap: '1rem' }}>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem', flex: 1 }}>
          <label style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.9rem', color: '#aaa' }}>
            <span>Розмір</span> <span>{config.size}px</span>
          </label>
          <input type="range" min="200" max="1000" step="10" value={config.size} onChange={(e) => onChange('size', parseInt(e.target.value, 10))} />
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem', flex: 1 }}>
          <label style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.9rem', color: '#aaa' }}>
            <span>Відступи</span> <span>{config.margin}px</span>
          </label>
          <input type="range" min="0" max="50" step="1" value={config.margin} onChange={(e) => onChange('margin', parseInt(e.target.value, 10))} />
        </div>
      </div>

      <hr style={{ borderColor: '#333', width: '100%' }} />

      {/* 2. Стилізація тіла (Dots) та фону */}
      <div style={{ display: 'flex', gap: '1rem' }}>
        <Select label="Форма точок" field="dotsType" options={['square', 'dots', 'rounded', 'extra-rounded', 'classy', 'classy-rounded']} />
        <ColorPicker label="Колір точок" field="dotsColor" />
      </div>
      
      <ColorPicker label="Колір фону" field="bgColor" />

      <hr style={{ borderColor: '#333', width: '100%' }} />

      {/* 3. Стилізація очей (Corners) */}
      <div style={{ display: 'flex', gap: '1rem' }}>
        <Select label="Форма рамки ока" field="cornersSquareType" options={['square', 'dot', 'extra-rounded']} />
        <ColorPicker label="Колір рамки" field="cornersSquareColor" />
      </div>

      <div style={{ display: 'flex', gap: '1rem' }}>
        <Select label="Форма центру ока" field="cornersDotType" options={['square', 'dot']} />
        <ColorPicker label="Колір центру" field="cornersDotColor" />
      </div>

      <hr style={{ borderColor: '#333', width: '100%' }} />

      {/* 4. Завантаження логотипу */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
        <label style={{ fontSize: '0.9rem', color: '#aaa' }}>Логотип по центру</label>
        <input
          type="file"
          accept="image/*"
          onChange={handleImageUpload}
          style={{ fontSize: '0.9rem', color: '#fff' }}
        />
        {config.image && (
          <button 
            onClick={() => {
              onChange('image', null);
              // @ts-expect-error - скидання file input
              document.querySelector('input[type="file"]').value = '';
            }}
            style={{ marginTop: '0.5rem', padding: '0.6rem', background: '#d32f2f', color: '#fff', border: 'none', borderRadius: '6px', cursor: 'pointer', fontWeight: 'bold' }}
          >
            Видалити логотип
          </button>
        )}
      </div>

    </div>
  );
}