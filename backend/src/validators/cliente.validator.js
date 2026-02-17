import chalk from "chalk";

const campos = [
    'nome',
    'contato',
    'email',
    'tipo'
];

export function validarCamposObrigatoriosCliente(cliente) {
    const faltando = [];
    for (const campo of campos) {
        if (!cliente[campo]) {
            faltando.push(campo);
        }
    }
    return faltando;
}

export function validarCliente(req, res, next) {

    const dados = req.body;

    if (!Array.isArray(dados)) {
        return next();
    }

    for (let i = 1; i < dados.length; i++) {

        const cliente = dados[i];

        const faltando = validarCamposObrigatoriosCliente(dados[i]);

        if (faltando.length) {
            const resposta = {
                erro: {
                    mensagem: `O atributo '${faltando}' não foi encontrado, porém é obrigatório para o registro do cliente número ${i + 1}.`
                }
            };
            console.log(chalk.bgRed.bold(`Não foi possível registrar o cliente número ${i + 1}. Atributo '${faltando}' faltando.\n`));
            return res.send(resposta);
        }

        if (!cliente.cpf && !cliente.cnpj) {

            const resposta = {
                erro: {
                    mensagem: `O cliente número ${i + 1} deve informar CPF ou CNPJ.`
                }
            };
            console.log(chalk.bgRed.bold(`Cliente número ${i + 1} sem CPF e sem CNPJ.\n`));
            return res.send(resposta);
        }

    }

    next();

}