interface HeaderProps {
  lastUpdate: number | null;
  intervalMs: number;
}

export default function header({ lastUpdate, intervalMs }: HeaderProps) {
  return (
    <div className="header">
      <h1>🌱 Monitoring Tanaman</h1>
      <div className="meta">
        {lastUpdate
          ? `Update terakhir: ${new Date(lastUpdate).toLocaleTimeString('id-ID')} · Interval: ${intervalMs / 1000} detik`
          : 'Menunggu data...'}
      </div>
    </div>
  );
}