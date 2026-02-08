import chalk from "chalk";

const campos = [
    'nome',
    'contato',
    'cpf'
];

export function validarCamposObrigatorios(proprietario) {
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

        const faltando = validarCamposObrigatorios(dados[i]);

        if (faltando.length) {
            const resposta = {
                erro: {
                    mensagem: `O atributo '${faltando}' não foi encontrado, porém é obrigatório para o registro do proprietario número ${i + 1}.`
                }
            };
            console.log(chalk.bgRed.bold(`Não foi possível registrar o proprietario número ${i + 1}. Atributo '${faltando}' faltando.\n`), `ReferenceError: erro is not defined\n     at deletaproprietarioPorId (file:///Z:/Projetos/Imobiliaria-Socrammon/backend/src/models/proprietario.js:53:0)\n     at async file:///Z:/Projetos/Imobiliaria-Socrammon/backend/src/routes/proprietarios.routes.js:110:0\n`);
            return res.send(resposta);
        }

    }

    next();

}