import chalk from "chalk";

const campos = [
    'nome',
    'contato',
    'cpf'
];

export function validarCamposObrigatorios(cliente) {
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

        const faltando = validarCamposObrigatorios(dados[i]);

        if (faltando.length) {
            const resposta = {
                erro: {
                    mensagem: `O atributo '${faltando}' não foi encontrado, porém é obrigatório para o registro do cliente número ${i + 1}.`
                }
            };
            console.log(chalk.bgRed.bold(`Não foi possível registrar o cliente número ${i + 1}. Atributo '${faltando}' faltando.\n`), `ReferenceError: erro is not defined\n     at deletaClientePorId (file:///Z:/Projetos/Imobiliaria-Socrammon/backend/src/models/cliente.js:53:0)\n     at async file:///Z:/Projetos/Imobiliaria-Socrammon/backend/src/routes/clientes.routes.js:110:0\n`);
            return res.send(resposta);
        }

    }

    next();

}