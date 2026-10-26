import { STATUS_CONFIG, THRESHOLDS } from '../constants';
import type { SensorData, SoilStatus, StatusStyle } from '../types';

interface StatusCardsProps {
  data: SensorData | null;
}

function getStatus(soil: number): SoilStatus {
  if (soil > THRESHOLDS.soilKering) return 'kering';
  if (soil < THRESHOLDS.soilBasah) return 'basah';
  return 'optimal';
}

interface PlainCardProps {
  label: string;
  value: number | string;
  unit?: string;
  color?: StatusStyle;
}

function PlainCard({ label, value, unit, color }: PlainCardProps) {
  return (
    <div
      className="card"
      style={color ? { background: color.bg, borderColor: color.border, color: color.text } : undefined}
    >
      <div className="label">{label}</div>
      <div className="value">
        {value}
        {unit && <span className="unit">{unit}</span>}
      </div>
    </div>
  );
}

export default function statusCards({ data }: StatusCardsProps) {
  if (!data) return null;

  const statusKey: SoilStatus = data.soil_status ?? getStatus(data.soil);
  const cfg = STATUS_CONFIG[statusKey] ?? STATUS_CONFIG.unknown;

  return (
    <div className="cards">
      <div className="card" style={{ background: cfg.bg, borderColor: cfg.border, color: cfg.text }}>
        <div className="label">KELEMBABAN TANAH</div>
        <div className="value">{data.soil}</div>
        <div className="status">{cfg.emoji} {cfg.label}</div>
      </div>

      <PlainCard label="SUHU UDARA" value={data.temp} unit="°C" />
      <PlainCard label="KELEMBABAN UDARA" value={data.hum} unit="%" />

      <div className="card">
        <div className="label">STATUS POMPA</div>
        <div className="value" style={{ fontSize: 24 }}>
          <span className={`badge ${data.pump ? 'badge-on' : 'badge-off'}`}>
            {data.pump ? 'ON' : 'OFF'}
          </span>
        </div>
        <div className="status" style={{ fontSize: 12 }}>
          {data.in_window ? 'Di jendela siram' : 'Di luar jendela'}
        </div>
      </div>
    </div>
  );
}