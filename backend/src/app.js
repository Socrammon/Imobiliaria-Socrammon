import express from 'express';
import bodyParser from 'body-parser';

import { rotas } from './routes/route.js';

import { sequelize, conectarBanco } from './database/sequelize.js';

const app = express();

app.use(bodyParser.json());

app.use(rotas);

async function StartApp() {

    await conectarBanco();
    await sequelize.sync();

    const porta = 3000;

    app.listen(porta, () => {
        console.log(`\nServidor rodando ;) - http://localhost:${porta}\n`);
    });

};

StartApp();