import dotenv from 'dotenv';
dotenv.config();

import app from './app.js';

const port = Number(process.env.PORT) || 3000;

app.listen(port, () => {
  console.log(`Workout Tracker API disponible en http://localhost:${port}`);
});
