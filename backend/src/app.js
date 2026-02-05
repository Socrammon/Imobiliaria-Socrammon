import http from 'http';
import sqlite3 from 'sqlite3';
import { sequelize } from './models/models.js';

import rotas from './routes/route.js';

const db = new sqlite3.Database('./db/db.db', (erro) => {
    if (erro) {
        console.error(erro.message);
    } else {
        console.log("\nBanco de dados SQLite iniciado com sucesso.");
    }
});

function IniciarServidorHTTP() {

    sequelize.sync();

    const servidor = http.createServer((req, res) => {
        rotas(req, res);
    });

    const porta = 3000;
    const host = 'localhost';

    servidor.listen(porta, host, () => {
        console.log(`\nServidor iniciado!\nExecutando em http://${host}:${porta}/`);
    });

};

IniciarServidorHTTP();