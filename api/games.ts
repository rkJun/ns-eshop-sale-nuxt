import express from 'express';
import { ApiResponse, getSaleGames } from 'ns-eshop-sale';

const app = express();
app.use(express.json());

app.get('/', async (req, res) => {

  const { country, language, count, offset } = req.query as any;

  const apiResponse: ApiResponse = await getSaleGames({
    country,
    language,
    count,
    offset
  });

  return res.send(apiResponse);
});

export default { path: '/api/games', handler: app };