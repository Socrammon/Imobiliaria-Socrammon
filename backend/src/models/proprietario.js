import Sequelize from 'sequelize';
import chalk from 'chalk';

import { sequelize } from "../config/sequelize.js";

export const Proprietario = sequelize.define('proprietario', {

    id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    nome: {
        type: Sequelize.STRING,
        allowNull: false
    },
    contato: {
        type: Sequelize.STRING(11),
        allowNull: false,
        validate: {
            isNumeric: true,
            len: [10, 11]
        }
    },
    cpf: {
        type: Sequelize.STRING(11),
        allowNull: false,
        validate: {
            isNumeric: true,
            len: [11, 11]
        }
    }

});

export async function registraProprietario(proprietario) {
    try {
        const resultado = await Proprietario.create(proprietario);
        console.log(chalk.green(`Proprietário número ${resultado.id} registrado com sucesso.\n`));
        return resultado;
    } catch (erro) {
        console.log('Não foi possível registrar o proprietário. ', erro, '\n');
        throw erro;
    }
}

export async function registraProprietarios(proprietario) {
    try {
        const resultado = await proprietario.bulkCreate(proprietario);
        console.log(chalk.bgWhite.green.bold(`Proprietarios registrados com sucesso.\n`));
        return resultado;
    } catch (erro) {
        console.log(chalk.bgRed.bold('Não foi possível registrar os proprietarios. '));
        throw erro;
    }
}

export async function buscaProprietarios() {

    try {
        const resultado = await Proprietario.findAll();
        console.log(chalk.blue(`Proprietários encontrados com sucesso.\n`));
        return resultado;
    } catch (erro) {
        console.log('Não foi possível encontrar os proprietários. ', erro, '\n');
        throw erro;
    }

}

export async function buscaProprietarioPorId(id) {

    try {
        const resultado = await Proprietario.findByPk(id);
        console.log(chalk.blue(`Proprietário número ${resultado.id} encontrado com sucesso.\n`));
        return resultado;
    } catch (erro) {
        console.log(chalk.bgRed('Não foi possível encontrar o proprietário. ', erro, '\n'));
        throw erro;
    }

}

export async function atualizaProprietarioPorId(id, dadosProprietario) {

    try {
        const resultado = await Proprietario.findByPk(id);
        if (resultado?.id) {
            for (const chave in dadosProprietario) {
                if (chave in resultado) {
                    resultado[chave] = dadosProprietario[chave];
                }
            }
            resultado.save();
        }
        console.log(chalk.yellow(`Proprietário número ${resultado.id} atualizado com sucesso.\n`));
        return resultado;
    } catch (erro) {
        console.log('Não foi possível atualizar o proprietário. ', erro, '\n');
        throw erro;
    }

}

export async function deletaProprietarioPorId(id) {

    try {
        const resultado = await Proprietario.destroy({ where: { id: id } });

        if (resultado === 0) {
            console.log('Não foi possível deletar o proprietário. ', erro, '\n');
            return;
        }

        console.log(chalk.red(`Proprietário número ${id} deletado com sucesso.\n`));
        return resultado;
    } catch (erro) {
        console.log('Não foi possível deletar o proprietário. ', erro, '\n');
        throw erro;
    }

}