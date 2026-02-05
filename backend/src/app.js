import http from 'http';
import sqlite3, { Database } from 'sqlite3';

import rotas from './routes/route.js';

const db = sqlite3.Database('../db/db.sql', (erro) => {
    if(erro) {
        console.error(erro.message);
    } else {
        console.log("Banco de dados SQLite iniciado com sucesso.");
    }
});

function IniciarServidorHTTP() {

    const servidor = http.createServer((req, res) => {
        res.statusCode = 200;
        res.setHeader('Content-type', 'text/plain; charset=utf-8');
    });

    const porta = 3000;
    const host = 'localhost';

    servidor.listen(porta, host, () => {
        console.log(`Servidor iniciado!\nExecutando em http://${host}:${porta}/`);
    });

};

IniciarServidorHTTP();