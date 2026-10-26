// import { API_BASE_URL, ENDPOINTS } from './constants';
// import type { SensorData } from './types';

// const url = (path: string) => `${API_BASE_URL}${path}`;

// export async function getLatest(): Promise<SensorData> {
//   const res = await fetch(url(ENDPOINTS.latest));
//   if (!res.ok) throw new Error('Gagal ambil data terbaru');
//   return res.json();
// }

// export async function getHistory(date?: string): Promise<SensorData[]> {
//   const q = date ? `?date=${encodeURIComponent(date)}` : '';
//   const res = await fetch(url(ENDPOINTS.history) + q);
//   if (!res.ok) throw new Error('Gagal ambil histori');
//   return res.json();
// }

// export async function getDates(): Promise<string[]> {
//   const res = await fetch(url(ENDPOINTS.dates));
//   if (!res.ok) throw new Error('Gagal ambil daftar tanggal');
//   return res.json();
// }

import { API_BASE_URL, ENDPOINTS } from './constants';
import type { SensorData } from './types';

// ==========================================
// DUMMY DATA UNTUK TESTING FRONTEND
// ==========================================
const DUMMY_LATEST: SensorData = {
  timestamp: new Date().toISOString(),
  soil: 2100,
  soil_status: 'optimal',
  temp: 27.8,
  hum: 74.2,
  pump: false,
  in_window: true,
};

const DUMMY_HISTORY: SensorData[] = [
  { timestamp: '2026-10-26T06:00:00+07:00', soil: 2100, soil_status: 'optimal', temp: 24.1, hum: 80.5, pump: false, in_window: true },
  { timestamp: '2026-10-26T06:05:00+07:00', soil: 1900, soil_status: 'optimal', temp: 24.3, hum: 80.1, pump: true,  in_window: true },
  { timestamp: '2026-10-26T12:00:00+07:00', soil: 2600, soil_status: 'kering',  temp: 30.2, hum: 65.0, pump: false, in_window: false },
  { timestamp: '2026-10-26T16:00:00+07:00', soil: 2400, soil_status: 'optimal', temp: 28.5, hum: 70.3, pump: true,  in_window: true },
  { timestamp: '2026-10-26T18:00:00+07:00', soil: 1800, soil_status: 'optimal', temp: 26.0, hum: 78.0, pump: false, in_window: true },
];

const DUMMY_DATES = ['2026-10-26'];

// ==========================================
// FUNGSI ASLI (Nanti tinggal hapus DUMMY-nya)
// ==========================================
const url = (path: string) => `${API_BASE_URL}${path}`;

export async function getLatest(): Promise<SensorData> {
  // GANTI BARIS INI DENGAN FETCH ASLI NANTI
  // return await (await fetch(url(ENDPOINTS.latest))).json();
  
  return new Promise((resolve) => {
    setTimeout(() => resolve(DUMMY_LATEST), 300); // simulasi delay jaringan
  });
}

export async function getHistory(date?: string): Promise<SensorData[]> {
  // GANTI BARIS INI DENGAN FETCH ASLI NANTI
  // return await (await fetch(url(ENDPOINTS.history) + (date ? `?date=${date}` : ''))).json();

  return new Promise((resolve) => {
    setTimeout(() => resolve(DUMMY_HISTORY), 300);
  });
}

export async function getDates(): Promise<string[]> {
  // GANTI BARIS INI DENGAN FETCH ASLI NANTI
  // return await (await fetch(url(ENDPOINTS.dates))).json();

  return new Promise((resolve) => {
    setTimeout(() => resolve(DUMMY_DATES), 300);
  });
}

