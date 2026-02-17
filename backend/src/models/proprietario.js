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
    segundoContato: {
        type: Sequelize.STRING(11),
        allowNull: true,
        validate: {
            isNumeric: true,
            len: [10, 11]
        }
    },
    email: {
        type: Sequelize.STRING(255),
        allowNull: false,
        set(value) {
            this.setDataValue('email', value.toLowerCase());
        },
        validate: {
            isEmail: true
        },
        unique: true
    },
    tipo: {
        type: Sequelize.ENUM('PF', 'PJ'),
        allowNull: false
    },
    cpf: {
        type: Sequelize.STRING(11),
        allowNull: true,
        validate: {
            isNumeric: true,
            len: [11, 11]
        }
    },
    cnpj: {
        type: Sequelize.STRING(14),
        allowNull: true,
        validate: {
            isNumeric: true,
            len: [14, 14]
        },
        unique: true
    },
    dataRegistro: {
        type: Sequelize.DATE,
        allowNull: false,
        defaultValue: Sequelize.NOW
    }
}, {
    validate: {
        documentoObrigatorio() {

            if (this.tipo === 'PF') {
                if (!this.cpf) {
                    throw new Error('CPF é obrigatório para pessoa física');
                }
                if (this.cnpj) {
                    throw new Error('Pessoa física não pode ter CNPJ');
                }
            }

            if (this.tipo === 'PJ') {
                if (!this.cnpj) {
                    throw new Error('CNPJ é obrigatório para pessoa jurídica');
                }
                if (this.cpf) {
                    throw new Error('Pessoa jurídica não pode ter CPF');
                }
            }
        }
    }

}

);

export async function registraProprietario(proprietario) {
    try {
        const resultado = await Proprietario.create(proprietario);
        console.log(chalk.bgWhite.green.bold(`Proprietário número ${resultado.id} registrado com sucesso.\n`));
        return resultado;
    } catch (erro) {
        console.log(chalk.bgRed.bold('Não foi possível registrar o proprietário. ', erro, '\n'));
        throw erro;
    }
}

export async function registraProprietarios(proprietario) {
    try {
        const resultado = await Proprietario.bulkCreate(proprietario);
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
        console.log(chalk.bgWhite.blue.bold(`Proprietários encontrados com sucesso.\n`));
        return resultado;
    } catch (erro) {
        console.log(chalk.bgRed.bold('Não foi possível encontrar os proprietários. ', erro, '\n'));
        throw erro;
    }

}

export async function buscaProprietarioPorId(id) {

    try {
        const resultado = await Proprietario.findByPk(id);
        console.log(chalk.bgWhite.blue.bold(`Proprietário número ${resultado.id} encontrado com sucesso.\n`));
        return resultado;
    } catch (erro) {
        console.log(chalk.bgRed.bold('Não foi possível encontrar o proprietário. ', erro, '\n'));
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
        console.log(chalk.bgWhite.yellow.bold(`Proprietário número ${resultado.id} atualizado com sucesso.\n`));
        return resultado;
    } catch (erro) {
        console.log(chalk.bgRed.bold('Não foi possível atualizar o proprietário. ', erro, '\n'));
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

        console.log(chalk.bgWhite.red.bold(`Proprietário número ${id} deletado com sucesso.\n`));
        return resultado;
    } catch (erro) {
        console.log(chalk.bgRed.bold('Não foi possível deletar o proprietário. ', erro, '\n'));
        throw erro;
    }

}