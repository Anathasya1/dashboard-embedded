import { API_BASE_URL, ENDPOINTS } from './constants';
import type { SensorData } from './types';

const url = (path: string) => `${API_BASE_URL}${path}`;

export async function getLatest(): Promise<SensorData> {
  const res = await fetch(url(ENDPOINTS.latest));
  if (!res.ok) throw new Error('Gagal ambil data terbaru');
  return res.json();
}

export async function getHistory(date?: string): Promise<SensorData[]> {
  const q = date ? `?date=${encodeURIComponent(date)}` : '';
  const res = await fetch(url(ENDPOINTS.history) + q);
  if (!res.ok) throw new Error('Gagal ambil histori');
  return res.json();
}

export async function getDates(): Promise<string[]> {
  const res = await fetch(url(ENDPOINTS.dates));
  if (!res.ok) throw new Error('Gagal ambil daftar tanggal');
  return res.json();
}