import { criaImovel, leImoveis, leImovelPorId, atualizaImovelPorId, deletaImovelPorId } from "../models/models.js";

export default async function rotas(req, res, dado) {

    res.setHeader('Content-Type', 'application/json; charset=utf-8');

    if (req.method === 'GET' && req.url === '/') {

        const { conteudo } = dado;

        res.statusCode = 200;

        const resposta = {
            mensagem: conteudo
        };

        res.end(JSON.stringify(resposta));

        return;

    }

    if (req.method === 'GET' && req.url === '/imoveis') {

        try {

            const resposta = await leImoveis();

            res.statusCode = 200;

            res.end(JSON.stringify(resposta));

            return;

        } catch (erro) {

            console.log("\nFalha ao tentar buscar imóveis.", erro);

            res.statusCode = 500;

            const resposta = {
                erro: {
                    mensagem: `Falha ao tentar buscar imóveis ${id}`
                }
            };

            res.end(JSON.stringify(resposta));

            return;

        }

    }

    if (req.method === 'GET' && req.url.split('/')[1] === 'imoveis' && !isNaN(req.url.split('/')[2])) {

        const id = req.url.split('/')[2];

        try {

            const encontrado = await leImovelPorId(id);

            res.statusCode = 200;

            if (!encontrado) {
                res.statusCode = 404;
            }

            res.end(JSON.stringify(encontrado));

            return;

        } catch (erro) {

            console.log("\nFalha ao tentar buscar imóvel.", erro);

            res.statusCode = 500;

            const resposta = {
                erro: {
                    mensagem: `Falha ao tentar buscar imóvel ${id}`
                }
            };

            res.end(JSON.stringify(resposta));

            return;

        }

    }

    if (req.method === 'POST' && req.url === '/imoveis') {

        const corpo = [];

        req.on('data', (parte) => {
            corpo.push(parte);
        });

        req.on('end', async () => {

            const imovel = JSON.parse(corpo);

            res.statusCode = 400;

            if (!imovel?.proprietario) {
                const resposta = {
                    erro: {
                        mensagem: `O atributo 'proprietario' não foi encontrado, porém é obrigatório para o registro do imóvel.`
                    }
                };

                res.end(JSON.stringify(resposta));

                return;

            }

            if (!imovel?.contato) {
                const resposta = {
                    erro: {
                        mensagem: `O atributo 'contato' não foi encontrado, porém é obrigatório para o registro do imóvel.`
                    }
                };

                res.end(JSON.stringify(resposta));

                return;

            }

            if (!imovel?.preco) {
                const resposta = {
                    erro: {
                        mensagem: `O atributo 'preco' não foi encontrado, porém é obrigatório para o registro do imóvel.`
                    }
                };

                res.end(JSON.stringify(resposta));

                return;

            }

            if (!imovel?.estado) {
                const resposta = {
                    erro: {
                        mensagem: `O atributo 'estado' não foi encontrado, porém é obrigatório para o registro do imóvel.`
                    }
                };

                res.end(JSON.stringify(resposta));

                return;

            }

            if (!imovel?.cidade) {
                const resposta = {
                    erro: {
                        mensagem: `O atributo 'cidade' não foi encontrado, porém é obrigatório para o registro do imóvel.`
                    }
                };

                res.end(JSON.stringify(resposta));

                return;

            }

            if (!imovel?.bairro) {
                const resposta = {
                    erro: {
                        mensagem: `O atributo 'bairro' não foi encontrado, porém é obrigatório para o registro do imóvel.`
                    }
                };

                res.end(JSON.stringify(resposta));

                return;

            }

            if (!imovel?.endereco) {
                const resposta = {
                    erro: {
                        mensagem: `O atributo 'endereço' não foi encontrado, porém é obrigatório para o registro do imóvel.`
                    }
                };

                res.end(JSON.stringify(resposta));

                return;

            }

            try {

                const resposta = await criaImovel(imovel);

                res.statusCode = 201;

                res.end(JSON.stringify(resposta));

                return;

            } catch (erro) {

                console.log("\nFalha ao tentar registrar imóvel.", erro);

                res.statusCode = 500;

                const resposta = {
                    erro: {
                        mensagem: `Falha ao tentar registrar imóvel ${imovel.id}`
                    }
                };

                res.end(JSON.stringify(resposta));

                return;

            }

        });

        req.on('error', (error => {

            console.log("\nFalha ao processar requisição", error);

            res.statusCode = 400;

            const resposta = {
                erro: {
                    mensagem: 'Falha ao processar requisição'
                }
            }

            res.end(JSON.stringify(resposta));

            return;

        }));

        return;

    }

    if (req.method === 'PATCH' && req.url.split('/')[1] === 'imoveis' && !isNaN(req.url.split('/')[2])) {

        const corpo = [];

        req.on('data', (parte) => {
            corpo.push(parte);
        });

        req.on('end', async () => {

            const imovel = JSON.parse(corpo);

            res.statusCode = 400;

            if (!imovel?.proprietario && !imovel?.contato && !imovel?.preco && !imovel?.estado && !imovel?.cidade && !imovel?.bairro && !imovel?.endereco && !imovel?.descricao) {
                const resposta = {
                    erro: {
                        mensagem: `Nenhum atributo foi encontrado, porém ao menos um é obrigatório para a atualização do imóvel.`
                    }
                };

                res.end(JSON.stringify(resposta));

                return;

            }

            const id = req.url.split('/')[2];

            try {

                const resposta = await atualizaImovelPorId(id, imovel);

                res.statusCode = 200;

                res.end(JSON.stringify(resposta));

                return;

            } catch (erro) {

                console.log("\nFalha ao tentar atualizar imóvel.", erro);

                res.statusCode = 404;

                const resposta = {
                    erro: {
                        mensagem: `Falha ao tentar atualizar imóvel ${id}`
                    }
                };

                res.end(JSON.stringify(resposta));

                return;

            }

        });

        req.on('error', (error => {

            console.log("\nFalha ao processar requisição", error);

            res.statusCode = 400;

            const resposta = {
                erro: {
                    mensagem: 'Falha ao processar requisição'
                }
            }

            res.end(JSON.stringify(resposta));

            return;

        }));

        return;

    }

    if (req.method === 'DELETE' && req.url.split('/')[1] === 'imoveis' && !isNaN(req.url.split('/')[2])) {

        const id = req.url.split('/')[2];

        try {

            const encontrado = await deletaImovelPorId(id);

            res.statusCode = 204;

            if (!encontrado) {
                res.statusCode = 404;
            }

            res.end();

            return;

        } catch (erro) {

            console.log("\nFalha ao tentar deletar imóvel.", erro);

            res.statusCode = 500;

            const resposta = {
                erro: {
                    mensagem: `Falha ao tentar deletar imóvel ${id}`
                }
            };

            res.end(JSON.stringify(resposta));

            return;

        }

    }

    res.statusCode = 404;

    const resposta = {
        erro: { 
            mensagem: 'Rota não encontrada!',
            url: req.url
        }
    };

    res.end(JSON.stringify(resposta));

}