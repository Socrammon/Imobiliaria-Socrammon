import Sequelize from 'sequelize';
import chalk from 'chalk';

import { sequelize } from "../config/sequelize.js";

export const Imovel = sequelize.define('imovel', {

    id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    tipo: {
        type: Sequelize.ENUM('CASA', 'APARTAMENTO', 'TERRENO'),
        allowNull: false
    },
    situacao: {
        type: Sequelize.ENUM('VENDA', 'ALUGUEL', 'VENDIDO', 'ALUGADO'),
        allowNull: false
    },
    preco: {
        type: Sequelize.DECIMAL(10, 2),
        allowNull: false
    },
    cep: {
        type: Sequelize.STRING(8),
        allowNull: false,
        validate: {
            isNumeric: true,
            len: [8, 8]
        }
    },
    estado: {
        type: Sequelize.STRING(2),
        allowNull: false,
        validate: {
            isAlpha: true,
            len: [2, 2]
        }
    },
    cidade: {
        type: Sequelize.STRING,
        allowNull: false
    },
    bairro: {
        type: Sequelize.STRING,
        allowNull: false
    },
    endereco: {
        type: Sequelize.STRING,
        allowNull: false
    },
    dataAnuncio: {
        type: Sequelize.DATE,
        allowNull: false,
        defaultValue: Sequelize.NOW
    },
    descricao: {
        type: Sequelize.TEXT,
        allowNull: true
    }

});

export async function registraImovel(imovel) {
    try {
        const resultado = await Imovel.create(imovel);
        console.log(chalk.bgWhite.green.bold(`Imóvel número ${resultado.id} registrado com sucesso.\n`));
        return resultado;
    } catch (erro) {
        console.log(chalk.bgRed.bold('Não foi possível registrar o imóvel. '));
        throw erro;
    }
}

export async function registraImoveis(imovel) {
    try {
        const resultado = await Imovel.bulkCreate(imovel);
        console.log(chalk.bgWhite.green.bold(`Imóveis registrados com sucesso.\n`));
        return resultado;
    } catch (erro) {
        console.log(chalk.bgRed.bold('Não foi possível registrar os imóveis. '));
        throw erro;
    }
}

export async function buscaImoveis() {

    try {
        const resultado = await Imovel.findAll();
        console.log(chalk.bgWhite.blue.bold(`Imóveis encontrados com sucesso.\n`));
        return resultado;
    } catch (erro) {
        console.log(chalk.bgRed.bold('Não foi possível encontrar os imóveis. '));
        throw erro;
    }

}

export async function buscaImovelPorId(id) {

    try {
        const resultado = await Imovel.findByPk(id);
        console.log(chalk.bgWhite.blue.bold(`Imóvel número ${resultado.id} encontrado com sucesso.\n`));
        return resultado;
    } catch (erro) {
        console.log(chalk.bgRed.bold('Não foi possível encontrar o imóvel. '));
        throw erro;
    }

}

export async function atualizaImovelPorId(id, dadosImovel) {

    try {
        const resultado = await Imovel.findByPk(id);
        if (resultado?.id) {
            for (const chave in dadosImovel) {
                if (chave in resultado) {
                    resultado[chave] = dadosImovel[chave];
                }
            }
            resultado.save();
        }
        console.log(chalk.bgWhite.yellow.bold(`Imóvel número ${resultado.id} atualizado com sucesso. \n`));
        return resultado;
    } catch (erro) {
        console.log(chalk.bgRed.bold('Não foi possível atualizar o imóvel. '));
        throw erro;
    }

}

export async function deletaImovelPorId(id) {

    try {
        const resultado = await Imovel.destroy({ where: { id: id } });

        if (resultado === 0) {
            console.log('Não foi possível deletar o imóvel. ', erro, '\n');
            return;
        }

        console.log(chalk.bgWhite.red.bold(`Imóvel número ${id} deletado com sucesso.\n`));
        return resultado;
    } catch (erro) {
        console.log(chalk.bgRed.bold('Não foi possível deletar o imóvel. '));
        throw erro;
    }

}