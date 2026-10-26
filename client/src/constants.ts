import type { SoilStatus, StatusStyle } from './types';

// Base URL API server (karena pakai proxy Vite, cukup '/api')
export const API_BASE_URL = '/api';

export const ENDPOINTS = {
  latest: '/latest',
  history: '/history',
  dates: '/dates',
};

export const THRESHOLDS = {
  soilKering: 2500,
  soilBasah: 1500,
};

export const POLL_INTERVAL_MS = 5000;

export const STATUS_CONFIG: Record<SoilStatus, StatusStyle> = {
  kering:  { label: 'KERING',        emoji: '🔴', bg: '#5a1e1e', border: '#a33a3a', text: '#ffd9d9' },
  optimal: { label: 'OPTIMAL',       emoji: '🟢', bg: '#1f3a24', border: '#4e8a5a', text: '#d6f5dc' },
  basah:   { label: 'TERLALU BASAH', emoji: '🔵', bg: '#1e2c4a', border: '#3a5fa3', text: '#d9e6ff' },
  unknown: { label: '—',             emoji: '⚪', bg: '#3a2a20', border: '#6b5340', text: '#e8dccf' },
};