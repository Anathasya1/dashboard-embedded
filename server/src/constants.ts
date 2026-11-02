export const PORT = 3000;

// Mode mock: true = server pakai data dummy, false = server fetch ke Google Sheets
export const USE_MOCK_DATA = false;

// URL Web App Google Apps Script (deploy sebagai web app, akses "Anyone")
export const SHEETS_BASE_URL = 'https://script.google.com/macros/s/AKfycbw4t1k_OuBew1kruCKFhVFtV33JDH5flIg5_D-IixhB6S80CJvraCETP9Cz2fSbbU7BAw/exec';

export const SHEETS_ENDPOINTS = {
  latest: '?action=latest',
  history: '?action=history', 
  dates: '?action=dates',
};

export const THRESHOLDS = {
  soilKering: 2500,
  soilBasah: 1500,
};