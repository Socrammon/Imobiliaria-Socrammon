import chalk from "chalk";

const campos = [
    'nome',
    'contato',
    'email',
    'tipo'
];

export function validarCamposObrigatoriosProprietario(proprietario) {
    const faltando = [];
    for (const campo of campos) {
        if (!proprietario[campo]) {
            faltando.push(campo);
        }
    }
    return faltando;
}

export function validarProprietario(req, res, next) {

    const dados = req.body;

    if (!Array.isArray(dados)) {
        return next();
    }

    for (let i = 1; i < dados.length; i++) {

        const proprietario = dados[i];

        const faltando = validarCamposObrigatoriosProprietario(dados[i]);

        if (faltando.length) {
            const resposta = {
                erro: {
                    mensagem: `O atributo '${faltando}' não foi encontrado, porém é obrigatório para o registro do proprietario número ${i + 1}.`
                }
            };
            console.log(chalk.bgRed.bold(`Não foi possível registrar o proprietario número ${i + 1}. Atributo '${faltando}' faltando.\n`));
            return res.send(resposta);
        }

        if (!proprietario.cpf && !proprietario.cnpj) {

            const resposta = {
                erro: {
                    mensagem: `O proprietário número ${i + 1} deve informar CPF ou CNPJ.`
                }
            };
            console.log(chalk.bgRed.bold(`Proprietário número ${i + 1} sem CPF e sem CNPJ.\n`));
            return res.send(resposta);
        }

    }


    next();

}