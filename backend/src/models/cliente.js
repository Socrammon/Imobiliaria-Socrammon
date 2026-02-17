import Sequelize from 'sequelize';
import chalk from 'chalk';

import { sequelize } from "../config/sequelize.js";

export const Cliente = sequelize.define('cliente', {

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
        },
        unique: true
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

export async function registraCliente(cliente) {
    try {
        const resultado = await Cliente.create(cliente);
        console.log(chalk.bgWhite.green.bold(`Cliente número ${resultado.id} registrado com sucesso.\n`));
        return resultado;
    } catch (erro) {
        console.log(chalk.bgRed.bold('Não foi possível registrar o cliente. ', erro, '\n'));
        throw erro;
    }
}

export async function registraClientes(cliente) {
    try {
        const resultado = await Cliente.bulkCreate(cliente);
        console.log(chalk.bgWhite.green.bold(`Clientes registrados com sucesso.\n`));
        return resultado;
    } catch (erro) {
        console.log(chalk.bgRed.bold('Não foi possível registrar os clientes. '));
        throw erro;
    }
}

export async function buscaClientes() {

    try {
        const resultado = await Cliente.findAll();
        console.log(chalk.bgWhite.blue.bold(`Clientes encontrados com sucesso.\n`));
        return resultado;
    } catch (erro) {
        console.log(chalk.bgRed.bold('Não foi possível encontrar os clientes. ', erro, '\n'));
        throw erro;
    }

}

export async function buscaClientePorId(id) {

    try {
        const resultado = await Cliente.findByPk(id);
        console.log(chalk.bgWhite.blue.bold(`Cliente número ${resultado.id} encontrado com sucesso.\n`));
        return resultado;
    } catch (erro) {
        console.log(chalk.bgRed.bold('Não foi possível encontrar o cliente. ', erro, '\n'));
        throw erro;
    }

}

export async function atualizaClientePorId(id, dadosCliente) {

    try {
        const resultado = await Cliente.findByPk(id);
        if (resultado?.id) {
            for (const chave in dadosCliente) {
                if (chave in resultado) {
                    resultado[chave] = dadosCliente[chave];
                }
            }
            resultado.save();
        }
        console.log(chalk.bgWhite.yellow.bold(`Cliente número ${resultado.id} atualizado com sucesso.\n`));
        return resultado;
    } catch (erro) {
        console.log(chalk.bgRed.bold('Não foi possível atualizar o cliente. ', erro, '\n'));
        throw erro;
    }

}

export async function deletaClientePorId(id) {

    try {
        const resultado = await Cliente.destroy({ where: { id: id } });

        if (resultado === 0) {
            console.log('Não foi possível deletar o cliente. ', erro, '\n');
            return;
        }

        console.log(chalk.bgWhite.red.bold(`Cliente número ${id} deletado com sucesso.\n`));
        return resultado;
    } catch (erro) {
        console.log(chalk.bgRed.bold('Não foi possível deletar o cliente. ', erro, '\n'));
        throw erro;
    }

}