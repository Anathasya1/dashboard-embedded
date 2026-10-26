import { useEffect, useState } from 'react';
import Header from './components/header';
import StatusCards from './components/statusCards';
import HistoryTable from './components/historyTable';
import { getLatest } from './api';
import { POLL_INTERVAL_MS } from './constants';
import type { SensorData } from './types';

import "./theme.css"
export default function App() {
  const [data, setData] = useState<SensorData | null>(null);
  const [lastUpdate, setLastUpdate] = useState<number | null>(null);
  const [err, setErr] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = () => {
      getLatest()
        .then((d) => {
          setData(d);
          setLastUpdate(Date.now());
          setErr(null);
        })
        .catch((e: Error) => setErr(e.message));
    };
    fetchData();
    const t = setInterval(fetchData, POLL_INTERVAL_MS);
    return () => clearInterval(t);
  }, []);

  return (
    <div className="container">
      <Header lastUpdate={lastUpdate} intervalMs={POLL_INTERVAL_MS} />
      {err && <div className="error">⚠ {err}</div>}
      <StatusCards data={data} />
      <HistoryTable />
    </div>
  );
}