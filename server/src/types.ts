export type SoilStatus = 'kering' | 'optimal' | 'basah' | 'unknown';

export interface SensorData {
  timestamp: string;
  soil: number;
  soil_temp: number;
  soil_status: SoilStatus;
  temp: number;
  hum: number;
  pump: boolean;
  in_window: boolean;
}