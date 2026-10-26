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
  temp: 27.8,
  hum: 74.2,
  pump: false,
  in_window: true,
};

export const MOCK_HISTORY: SensorData[] = [
  { timestamp: '2026-10-26T06:00:00+07:00', soil: 2100, soil_status: 'optimal', temp: 24.1, hum: 80.5, pump: false, in_window: true },
  { timestamp: '2026-10-26T06:05:00+07:00', soil: 1900, soil_status: 'optimal', temp: 24.3, hum: 80.1, pump: true,  in_window: true },
  { timestamp: '2026-10-26T12:00:00+07:00', soil: 2600, soil_status: 'kering',  temp: 30.2, hum: 65.0, pump: false, in_window: false },
  { timestamp: '2026-10-26T16:00:00+07:00', soil: 2400, soil_status: 'optimal', temp: 28.5, hum: 70.3, pump: true,  in_window: true },
  { timestamp: '2026-10-26T18:00:00+07:00', soil: 1800, soil_status: 'optimal', temp: 26.0, hum: 78.0, pump: false, in_window: true },
];

export const MOCK_DATES = ['2026-10-26'];

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