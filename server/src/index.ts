import express from 'express';
import cors from 'cors';
import routes from './routes';
import { PORT } from './constants';

const app = express();
app.use(cors());
app.use(express.json());

app.get('/', (_req, res) => res.json({ status: 'ok', service: 'daun-bawang-server' }));
app.use('/api', routes);

app.listen(PORT, () => {
  console.log(`🚀 Server jalan di http://localhost:${PORT}`);
});