import express from 'express';
import path from 'path';
import routes from './routes';

const app = express();

app.use(express.json()); //Colocando express para entender json
app.use(routes); // Mágica das rotas sendo importadas para o arquivo principal

app.use('/uploads', express.static(path.resolve(__dirname, '..', 'uploads')));

app.listen(3333, () => console.log('\n============ || STONKS || ============\n'));