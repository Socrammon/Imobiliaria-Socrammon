import express from 'express';
import bodyParser from 'body-parser';

import { rotasImoveis } from './routes/imoveis.routes.js';
import { rotasProprietarios } from './routes/proprietarios.routes.js';
import { rotasClientes } from './routes/clientes.routes.js';

import './models/index.js';

import { sequelize, conectarBanco } from './config/sequelize.js';

const app = express();

app.use(bodyParser.json());

app.use(rotasImoveis);
app.use(rotasProprietarios);
app.use(rotasClientes);

async function StartApp() {

    await conectarBanco();
    await sequelize.sync();

    const porta = 3000;

    app.listen(porta, () => {
        console.log(`\nServidor rodando ;) - http://localhost:${porta}\n`);
    });

};

StartApp();