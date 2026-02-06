import express from 'express';

import { criaImovel, leImoveis, leImovelPorId, atualizaImovelPorId, deletaImovelPorId } from "../models/models.js";

export const rotas = express.Router();

rotas.get('/imoveis', async (req, res, next) => {

    try {

        const resposta = await leImoveis();

        res.statusCode = 200;

        res.send(resposta);

        return;

    } catch (erro) {

        console.log("\nFalha ao tentar buscar imóveis.", erro);

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

rotas.get('/imoveis/:id', async (req, res, next) => {

    const id = req.params.id;

    try {

        const resposta = await leImovelPorId(id);

        res.statusCode = 200;

        if (!resposta) {
            res.statusCode = 404;
        }

        res.send(resposta);

        return;

    } catch (erro) {

        console.log("\nFalha ao tentar buscar imóvel.", erro);

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

rotas.post('/imoveis', async (req, res, next) => {

    const imovel = req.body;

    res.statusCode = 400;

    if (!imovel?.proprietario) {
        const resposta = {
            erro: {
                mensagem: `O atributo 'proprietario' não foi encontrado, porém é obrigatório para o registro do imóvel.`
            }
        };

        res.send(resposta);

        return;

    }

    if (!imovel?.contato) {
        const resposta = {
            erro: {
                mensagem: `O atributo 'contato' não foi encontrado, porém é obrigatório para o registro do imóvel.`
            }
        };

        res.send(resposta);

        return;

    }

    if (!imovel?.preco) {
        const resposta = {
            erro: {
                mensagem: `O atributo 'preco' não foi encontrado, porém é obrigatório para o registro do imóvel.`
            }
        };

        res.send(resposta);

        return;

    }

    if (!imovel?.estado) {
        const resposta = {
            erro: {
                mensagem: `O atributo 'estado' não foi encontrado, porém é obrigatório para o registro do imóvel.`
            }
        };

        res.send(resposta);

        return;

    }

    if (!imovel?.cidade) {
        const resposta = {
            erro: {
                mensagem: `O atributo 'cidade' não foi encontrado, porém é obrigatório para o registro do imóvel.`
            }
        };

        res.send(resposta);

        return;

    }

    if (!imovel?.bairro) {
        const resposta = {
            erro: {
                mensagem: `O atributo 'bairro' não foi encontrado, porém é obrigatório para o registro do imóvel.`
            }
        };

        res.send(resposta);

        return;

    }

    if (!imovel?.endereco) {
        const resposta = {
            erro: {
                mensagem: `O atributo 'endereço' não foi encontrado, porém é obrigatório para o registro do imóvel.`
            }
        };

        res.send(resposta);

        return;

    }

    try {

        const resposta = await criaImovel(imovel);

        res.statusCode = 201;

        res.send(resposta);

        return;

    } catch (erro) {

        console.log("\nFalha ao tentar registrar imóvel.", erro);

        res.statusCode = 500;

        const resposta = {
            erro: {
                mensagem: `Falha ao tentar registrar imóvel ${imovel.id}`
            }
        };

        res.send(resposta);

        return;

    }

    return;

});

rotas.patch('/imoveis/:id', async (req, res, next) => {

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

        console.log("\nFalha ao tentar atualizar imóvel.", erro);

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

rotas.delete('/imoveis/:id', async (req, res, next) => {

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

        console.log("\nFalha ao tentar deletar imóvel.", erro);

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
