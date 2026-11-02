import { SHEETS_BASE_URL, SHEETS_ENDPOINTS, USE_MOCK_DATA } from './constants';
import type { SensorData } from './types';

const fetchJson = async <T>(url: string): Promise<T> => {
  const res = await fetch(url);
  if (!res.ok) throw new Error(`Sheets error: ${res.status}`);
  return (await res.json()) as T;
};

export const MOCK_LATEST: SensorData = {
  timestamp: new Date().toISOString(),
  soil: 2100,
  soil_status: 'optimal',
  soil_temp: 26.5,
  temp: 27.8,
  hum: 74.2,
  pump: false,
  in_window: true,
};

export const MOCK_HISTORY: SensorData[] = [
  { timestamp: '2026-11-02T06:00:00+07:00', soil: 2100, soil_status: 'optimal', soil_temp: 24.0, temp: 24.1, hum: 80.5, pump: false, in_window: true },
  { timestamp: '2026-11-02T06:05:00+07:00', soil: 1900, soil_status: 'optimal', soil_temp: 24.2, temp: 24.3, hum: 80.1, pump: true,  in_window: true },
  { timestamp: '2026-11-02T12:00:00+07:00', soil: 2600, soil_status: 'kering',  soil_temp: 29.1, temp: 30.2, hum: 65.0, pump: false, in_window: false },
  { timestamp: '2026-11-02T16:00:00+07:00', soil: 2400, soil_status: 'optimal', soil_temp: 27.5, temp: 28.5, hum: 70.3, pump: true,  in_window: true },
  { timestamp: '2026-11-02T18:00:00+07:00', soil: 1800, soil_status: 'optimal', soil_temp: 25.5, temp: 26.0, hum: 78.0, pump: false, in_window: true },
];

export const MOCK_DATES = ['2026-11-02'];

export async function fetchLatest(): Promise<SensorData> {
  if (USE_MOCK_DATA) return MOCK_LATEST;
  return fetchJson<SensorData>(`${SHEETS_BASE_URL}${SHEETS_ENDPOINTS.latest}`);
}

export async function fetchHistory(date?: string): Promise<SensorData[]> {
  if (USE_MOCK_DATA) return MOCK_HISTORY;
  
  // Perhatikan bagian ini: karena URL sudah mengandung '?action=history', 
  // kita gunakan '&' untuk menambahkan parameter date.
  const suffix = date ? `&date=${encodeURIComponent(date)}` : '';
  
  return fetchJson<SensorData[]>(`${SHEETS_BASE_URL}${SHEETS_ENDPOINTS.history}${suffix}`);
}

export async function fetchDates(): Promise<string[]> {
  if (USE_MOCK_DATA) return MOCK_DATES;
  return fetchJson<string[]>(`${SHEETS_BASE_URL}${SHEETS_ENDPOINTS.dates}`);
}