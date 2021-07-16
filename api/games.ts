import express from 'express';
import { ApiResponse, getSaleGames } from 'ns-eshop-sale';

const app = express();
app.use(express.json());

app.get('/', async (req, res) => {

  const {
    country = 'KR',
    language = 'ko',
    count = 10,
    offset = 0
  } = req.query as any;

  const apiResponse: ApiResponse = await getSaleGames({
    country,
    language,
    count,
    offset
  });

  res.send(apiResponse);
});

export default { path: '/api/games', handler: app };