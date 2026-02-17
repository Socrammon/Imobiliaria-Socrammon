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

export function validarCamposObrigatoriosImovel(imovel) {
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

        const faltando = validarCamposObrigatoriosImovel(dados[i]);

        if (faltando.length) {
            const resposta = {
                erro: {
                    mensagem: `O atributo '${faltando}' não foi encontrado, porém é obrigatório para o registro do imóvel número ${i + 1}.`
                }
            };
            res.statusCode = 400;
            console.log(chalk.bgRed.bold(`Não foi possível registrar o imóvel número ${i + 1}. Atributo '${faltando}' faltando.\n`));
            return res.send(resposta);
        }

    }

    next();

}