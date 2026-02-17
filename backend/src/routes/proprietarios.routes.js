import express from 'express';
import chalk from 'chalk';

import { registraProprietario, registraProprietarios, buscaProprietarios, buscaProprietarioPorId, atualizaProprietarioPorId, deletaProprietarioPorId } from "../models/proprietario.js";

import { validarProprietario, validarCamposObrigatoriosProprietario } from '../validators/proprietario.validator.js';

export const rotasProprietarios = express.Router();

rotasProprietarios.get('/proprietarios', async (req, res, next) => {

    try {

        const resposta = await buscaProprietarios();

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
                mensagem: `Falha ao tentar buscar proprietarios ${id}`
            }
        };

        res.send(resposta);

        return;

    }

});

rotasProprietarios.get('/proprietarios/:id', async (req, res, next) => {

    const id = req.params.id;

    try {

        const resposta = await buscaProprietarioPorId(id);

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
                mensagem: `Falha ao tentar buscar proprietario ${id}`
            }
        };

        res.send(resposta);

        return;

    }

});

rotasProprietarios.post('/proprietarios', validarProprietario, async (req, res, next) => {

    const proprietarios = req.body;

    res.statusCode = 400;

    try {

        if (Array.isArray(proprietarios)) {
            const resultado = await registraProprietarios(proprietarios);
            res.statusCode = 201;
            res.send(resultado);
            return;
        }

        const faltando = validarCamposObrigatoriosProprietario(proprietarios);

        if (faltando.length) {
            const resposta = {
                erro: {
                    mensagem: `O atributo '${faltando}' não foi encontrado, porém é obrigatório para o registro do proprietário.`
                }
            };

            res.statusCode = 400;

            console.log(chalk.bgRed.bold(`Não foi possível registrar o proprietário. Atributo '${faltando}' faltando.\n`));

            res.send(resposta);

            return;

        }

        const resposta = await registraProprietario(proprietarios);

        res.statusCode = 201;

        res.send(resposta);

        return;

    } catch (erro) {

        console.log(erro, '\n');

        res.statusCode = 500;

        const resposta = {
            erro: {
                mensagem: `Falha ao tentar registrar proprietario ${proprietarios.id}`
            }
        };

        res.send(resposta);

        return;

    }

});

rotasProprietarios.patch('/proprietarios/:id', async (req, res, next) => {

    const proprietario = req.body;

    res.statusCode = 400;

    if (!proprietario?.proprietario && !proprietario?.contato && !proprietario?.preco && !proprietario?.estado && !proprietario?.cidade && !proprietario?.bairro && !proprietario?.endereco && !proprietario?.descricao) {
        const resposta = {
            erro: {
                mensagem: `Nenhum atributo foi encontrado, porém ao menos um é obrigatório para a atualização do proprietario.`
            }
        };

        res.send(resposta);

        return;

    }

    const id = req.params.id;

    try {

        const resposta = await atualizaProprietarioPorId(id, proprietario);

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
                mensagem: `Falha ao tentar atualizar proprietario ${id}`
            }
        };

        res.send(resposta);

        return;

    }

});

rotasProprietarios.delete('/proprietarios/:id', async (req, res, next) => {

    const id = req.params.id;

    try {

        const resposta = await deletaProprietarioPorId(id);

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
                mensagem: `Falha ao tentar deletar proprietario ${id}`
            }
        };

        res.send(resposta);

        return;

    }

});
