import { criaImovel, leImovel, leImovelPorId, atualizaImovel, deletaImovel } from "../models/models.js";

export default function rotas(req, res, dado) {

    res.setHeader('Content-Type', 'application/json; charset=utf-8');

    if(req.method === 'GET' && req.url === '/') {

        const { conteudo } = dado;

        res.statusCode = 200;

        const resposta = {
            mensagem: conteudo
        };

        res.end(JSON.stringify(resposta));

        return;

    }

    if(req.method === 'PUT' && req.url === '/arquivos') {

        const cosrpo = [];

        req.on('data', (parte) => {
            corpo.push(parte);
        })

        req.on('end', () => {
            
            const arquivo = JSON.parse(corpo);

            res.statuscode = 400;

            if(!arquivo?.nome) {
                const resposta = `O atributo 'nome' não foi encontrado `
            }

        })

    }

}