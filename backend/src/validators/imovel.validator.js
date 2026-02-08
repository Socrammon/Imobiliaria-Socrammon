import chalk from "chalk";

const campos = [
    'tipo',
    'situacao',
    'preco',
    'cep',
    'estado',
    'cidade',
    'bairro',
    'endereco'
];

export function validarCamposObrigatorios(imovel) {
    const faltando = [];
    for (const campo of campos) {
        if (!imovel[campo]) {
            faltando.push(campo);
        }
    }
    return faltando;
}

export function validarImovel(req, res, next) {

    const dados = req.body;

    if (!Array.isArray(dados)) {
        return next();
    }

    for (let i = 1; i < dados.length; i++) {

        const faltando = validarCamposObrigatorios(dados[i]);

        if (faltando.length) {
            const resposta = {
                erro: {
                    mensagem: `O atributo '${faltando}' não foi encontrado, porém é obrigatório para o registro do imóvel número ${i + 1}.`
                }
            };
            console.log(chalk.bgRed.bold(`Não foi possível registrar o imóvel número ${i + 1}. Atributo '${faltando}' faltando.\n`), `ReferenceError: erro is not defined\n     at deletaImovelPorId (file:///Z:/Projetos/Imobiliaria-Socrammon/backend/src/models/imovel.js:53:0)\n     at async file:///Z:/Projetos/Imobiliaria-Socrammon/backend/src/routes/imoveis.routes.js:110:0\n`);
            return res.send(resposta);
        }

    }

    next();

}