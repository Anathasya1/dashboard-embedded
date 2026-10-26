export const PORT = 3000;

// Mode mock: true = server pakai data dummy, false = server fetch ke Google Sheets
export const USE_MOCK_DATA = false;

// URL Web App Google Apps Script (deploy sebagai web app, akses "Anyone")
export const SHEETS_BASE_URL = 'https://script.google.com/macros/s/AKfycbzkVcmjiQx_y9hVKIaYXL2frdbz0F4FV3afe6fBXqkcUl6mPBKpD8IdcjJxlSkgjoMEXg/exec';

// Endpoint di Apps Script
export const SHEETS_ENDPOINTS = {
  latest: '?action=latest',
  history: '?action=history', // + &date=YYYY-MM-DD
  dates: '?action=dates',
};

export const THRESHOLDS = {
  soilKering: 2500,
  soilBasah: 1500,
};