import { useEffect, useState } from 'react';
import { getHistory, getDates } from '../api';
import { STATUS_CONFIG, THRESHOLDS } from '../constants';
import type { SensorData, SoilStatus } from '../types';

function statusOf(soil: number): SoilStatus {
  if (soil > THRESHOLDS.soilKering) return 'kering';
  if (soil < THRESHOLDS.soilBasah) return 'basah';
  return 'optimal';
}

export default function historyTable() {
  const [dates, setDates] = useState<string[]>([]);
  const [selected, setSelected] = useState<string>('');
  const [rows, setRows] = useState<SensorData[]>([]);
  const [err, setErr] = useState<string | null>(null);

  useEffect(() => {
    getDates()
      .then((d) => {
        setDates(d);
        if (d.length > 0) setSelected(d[0]);
      })
      .catch((e: Error) => setErr(e.message));
  }, []);

  useEffect(() => {
    if (!selected) return;
    getHistory(selected)
      .then(setRows)
      .catch((e: Error) => setErr(e.message));
  }, [selected]);

  return (
    <div className="section">
      <h2>Riwayat Harian</h2>

      {err && <div className="error">{err}</div>}

      <select value={selected} onChange={(e) => setSelected(e.target.value)}>
        {dates.length === 0 && <option value="">Belum ada data</option>}
        {dates.map((d) => (
          <option key={d} value={d}>{d}</option>
        ))}
      </select>

      {rows.length === 0 ? (
        <div className="empty">Belum ada data untuk tanggal ini.</div>
      ) : (
        <table>
          <thead>
            <tr>
              <th>Jam</th>
              <th>Soil</th>
              <th>Status Tanah</th>
              <th>Suhu (°C)</th>
              <th>RH (%)</th>
              <th>Pompa</th>
            </tr>
          </thead>
          <tbody>
            {rows.map((r, i) => {
              const key: SoilStatus = r.soil_status ?? statusOf(r.soil);
              const cfg = STATUS_CONFIG[key];
              return (
                <tr key={i}>
                  <td>{r.timestamp?.slice(11, 19)}</td>
                  <td>{r.soil}</td>
                  <td>
                    <span className="badge" style={{ background: cfg.bg, color: cfg.text }}>
                      {cfg.emoji} {cfg.label}
                    </span>
                  </td>
                  <td>{r.temp}</td>
                  <td>{r.hum}</td>
                  <td>
                    <span className={`badge ${r.pump ? 'badge-on' : 'badge-off'}`}>
                      {r.pump ? 'ON' : 'OFF'}
                    </span>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      )}
    </div>
  );
}