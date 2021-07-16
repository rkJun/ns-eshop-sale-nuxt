import express from 'express';

const app = express();
app.use(express.json());

app.get('/', (req, res) => {
  res.send(req.query);
});

export default { path: '/api/games', handler: app };