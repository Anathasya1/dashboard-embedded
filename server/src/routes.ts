import { Router } from 'express';
import { fetchLatest, fetchHistory, fetchDates } from './sheets';

const router = Router();

router.get('/latest', async (_req, res) => {
  try {
    res.json(await fetchLatest());
  } catch (e) {
    res.status(500).json({ error: (e as Error).message });
  }
});

router.get('/history', async (req, res) => {
  try {
    const date = typeof req.query.date === 'string' ? req.query.date : undefined;
    res.json(await fetchHistory(date));
  } catch (e) {
    res.status(500).json({ error: (e as Error).message });
  }
});

router.get('/dates', async (_req, res) => {
  try {
    res.json(await fetchDates());
  } catch (e) {
    res.status(500).json({ error: (e as Error).message });
  }
});

export default router;