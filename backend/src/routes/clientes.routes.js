import express from 'express';

import { registraCliente, registraClientes, buscaClientes, buscaClientePorId, atualizaClientePorId, deletaClientePorId } from "../models/cliente.js";

import { validarCliente } from '../validators/cliente.validator.js';

export const rotasClientes = express.Router();

rotasClientes.get('/clientes', async (req, res, next) => {

    try {

        const resposta = await buscaClientes();

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
                mensagem: `Falha ao tentar buscar clientes ${id}`
            }
        };

        res.send(resposta);

        return;

    }

});

rotasClientes.get('/clientes/:id', async (req, res, next) => {

    const id = req.params.id;

    try {

        const resposta = await buscaClientePorId(id);

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
                mensagem: `Falha ao tentar buscar cliente ${id}`
            }
        };

        res.send(resposta);

        return;

    }

});

rotasClientes.post('/clientes', validarCliente, async (req, res, next) => {

    const clientes = req.body;

    res.statusCode = 400;

    try {

        if (Array.isArray(clientes)) {
            const resultado = await registraClientes(clientes);
            return res.status(201).send(resultado);
        }

        const resposta = await registraCliente(clientes);

        res.statusCode = 201;

        res.send(resposta);

        return;

    } catch (erro) {

        console.log(erro, '\n');

        res.statusCode = 500;

        const resposta = {
            erro: {
                mensagem: `Falha ao tentar registrar cliente ${clientes.id}`
            }
        };

        res.send(resposta);

        return;

    }

});

rotasClientes.patch('/clientes/:id', async (req, res, next) => {

    const cliente = req.body;

    res.statusCode = 400;

    if (!cliente?.proprietario && !cliente?.contato && !cliente?.preco && !cliente?.estado && !cliente?.cidade && !cliente?.bairro && !cliente?.endereco && !cliente?.descricao) {
        const resposta = {
            erro: {
                mensagem: `Nenhum atributo foi encontrado, porém ao menos um é obrigatório para a atualização do cliente.`
            }
        };

        res.send(resposta);

        return;

    }

    const id = req.params.id;

    try {

        const resposta = await atualizaClientePorId(id, cliente);

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
                mensagem: `Falha ao tentar atualizar cliente ${id}`
            }
        };

        res.send(resposta);

        return;

    }

});

rotasClientes.delete('/clientes/:id', async (req, res, next) => {

    const id = req.params.id;

    try {

        const resposta = await deletaClientePorId(id);

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
                mensagem: `Falha ao tentar deletar cliente ${id}`
            }
        };

        res.send(resposta);

        return;

    }

});
