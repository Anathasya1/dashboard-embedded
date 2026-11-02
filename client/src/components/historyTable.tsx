import { useEffect, useState } from 'react';
import { getHistory, getDates } from '../api';
import { STATUS_CONFIG, THRESHOLDS } from '../constants';
import type { SensorData, SoilStatus } from '../types';
import './historyTable.css';

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
        if (d.length > 0) {
          // Otomatis pilih tanggal hari ini jika tersedia di list
          const today = new Date().toISOString().split('T')[0];
          if (d.includes(today)) {
            setSelected(today);
          } else {
            setSelected(d[0]);
          }
        }
      })
      .catch((e: Error) => setErr(e.message));
  }, []);

  // Mengambil data riwayat secara otomatis setiap 5 detik
  useEffect(() => {
    if (!selected) return;

    const fetchRows = () => {
      getHistory(selected)
        .then((res) => {
          setRows(res);
          setErr(null);
        })
        .catch((e: Error) => setErr(e.message));
    };

    fetchRows(); // Ambil data pertama kali saat tanggal dipilih

    const interval = setInterval(fetchRows, 5000); // Loop setiap 5 detik
    return () => clearInterval(interval); // Bersihkan interval saat komponen unmount atau tanggal berubah
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
        <div className="table-scroll-container">
          <table>
            <thead style={{ position: 'sticky', top: 0, background: '#2c1e14', zIndex: 1 }}>
              <tr>
                <th>Jam</th>
                <th>Soil</th>
                <th>Status Tanah</th>
                <th>Suhu Tanah (°C)</th>
                <th>Suhu Udara (°C)</th>
                <th>RH (%)</th>
                <th>Pompa</th>
              </tr>
            </thead>
            <tbody>
              {rows.map((r, i) => {
                const key: SoilStatus = r.soil_status ?? statusOf(r.soil);
                const cfg = STATUS_CONFIG[key];
                
                const formattedTime = r.timestamp 
                  ? new Date(r.timestamp).toLocaleTimeString('id-ID', { hour12: false }) 
                  : '';

                return (
                  <tr key={i}>
                    <td>{formattedTime}</td>
                    <td>{r.soil}</td>
                    <td>
                      <span className="badge" style={{ background: cfg.bg, color: cfg.text }}>
                        {cfg.emoji} {cfg.label}
                      </span>
                    </td>
                    <td>{r.soil_temp}</td>
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
        </div>
      )}
    </div>
  );
} 