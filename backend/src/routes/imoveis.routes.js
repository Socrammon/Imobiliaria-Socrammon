import express from 'express';

import { registraImovel, registraImoveis, buscaImoveis, buscaImovelPorId, atualizaImovelPorId, deletaImovelPorId } from "../models/imovel.js";

import { validarImovel } from '../validators/imovel.validator.js';

export const rotasImoveis = express.Router();

rotasImoveis.get('/imoveis', async (req, res, next) => {

    try {

        const resposta = await buscaImoveis();

        res.statusCode = 200;

        if (!resposta) {
            res.statusCode = 404;
        }

        res.send(resposta);

        return;

    } catch (erro) {

        console.log(erro, '\n');

        res.statusCode = 500;

        const resposta = {
            erro: {
                mensagem: `Falha ao tentar buscar imóveis ${id}`
            }
        };

        res.send(resposta);

        return;

    }

});

rotasImoveis.get('/imoveis/:id', async (req, res, next) => {

    const id = req.params.id;

    try {

        const resposta = await buscaImovelPorId(id);

        res.statusCode = 200;

        if (!resposta) {
            res.statusCode = 404;
        }

        res.send(resposta);

        return;

    } catch (erro) {

        console.log(erro, '\n');

        res.statusCode = 500;

        const resposta = {
            erro: {
                mensagem: `Falha ao tentar buscar imóvel ${id}`
            }
        };

        res.send(resposta);

        return;

    }

});

rotasImoveis.post('/imoveis', validarImovel, async (req, res, next) => {

    const imoveis = req.body;

    res.statusCode = 400;

    try {

        if (Array.isArray(imoveis)) {
            const resultado = await registraImoveis(imoveis);
            return res.status(201).send(resultado);
        }

        const resposta = await registraImovel(imoveis);

        res.statusCode = 201;

        res.send(resposta);

        return;

    } catch (erro) {

        console.log(erro, '\n');

        res.statusCode = 500;

        const resposta = {
            erro: {
                mensagem: `Falha ao tentar registrar imóvel ${imoveis.id}`
            }
        };

        res.send(resposta);

        return;

    }

});

rotasImoveis.patch('/imoveis/:id', async (req, res, next) => {

    const imovel = req.body;

    res.statusCode = 400;

    if (!imovel?.proprietario && !imovel?.contato && !imovel?.preco && !imovel?.estado && !imovel?.cidade && !imovel?.bairro && !imovel?.endereco && !imovel?.descricao) {
        const resposta = {
            erro: {
                mensagem: `Nenhum atributo foi encontrado, porém ao menos um é obrigatório para a atualização do imóvel.`
            }
        };

        res.send(resposta);

        return;

    }

    const id = req.params.id;

    try {

        const resposta = await atualizaImovelPorId(id, imovel);

        res.statusCode = 200;

        if (!resposta) {
            res.statusCode = 404;
        }

        res.send(resposta);

        return;

    } catch (erro) {

        console.log(erro, '\n');

        res.statusCode = 404;

        const resposta = {
            erro: {
                mensagem: `Falha ao tentar atualizar imóvel ${id}`
            }
        };

        res.send(resposta);

        return;

    }

});

rotasImoveis.delete('/imoveis/:id', async (req, res, next) => {

    const id = req.params.id;

    try {

        const resposta = await deletaImovelPorId(id);

        res.statusCode = 204;

        if (!resposta) {
            res.statusCode = 404;
        }

        res.send(resposta);

        return;

    } catch (erro) {

        console.log(erro, '\n');

        res.statusCode = 500;

        const resposta = {
            erro: {
                mensagem: `Falha ao tentar deletar imóvel ${id}`
            }
        };

        res.send(resposta);

        return;

    }

});
