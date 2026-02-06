import Sequelize from 'sequelize';
import chalk from 'chalk';

import { sequelize } from "../database/sequelize.js";

export const Imovel = sequelize.define('imovel', {

    id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    proprietario: {
        type: Sequelize.STRING,
        allowNull: false
    },
    contato: {
        type: Sequelize.STRING,
        allowNull: false
    },
    preco: {
        type: Sequelize.DOUBLE,
        allowNull: false
    },
    estado: {
        type: Sequelize.STRING,
        allowNull: false
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

export async function criaImovel(imovel) {
    try {
        const resultado = await Imovel.create(imovel);
        console.log(chalk.green(`Imóvel número ${resultado.id} criado com sucesso.\n`));
        return resultado;
    } catch (erro) {
        console.log('Não foi possível criar o imóvel. ', erro, '\n');
        throw erro;
    }
}

export async function leImoveis() {

    try {
        const resultado = await Imovel.findAll();
        console.log(chalk.blue(`Imóveis encontrados com sucesso.\n`));
        return resultado;
    } catch (erro) {
        console.log('Não foi possível encontrar os imóveis. ', erro, '\n');
        throw erro;
    }

}

export async function leImovelPorId(id) {

    try {
        const resultado = await Imovel.findByPk(id);
        console.log(chalk.blue(`Imóvel número ${resultado.id} encontrado com sucesso.\n`));
        return resultado;
    } catch (erro) {
        console.log('Não foi possível encontrar o imóvel. ', erro, '\n');
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
        console.log(chalk.yellow(`Imóvel número ${resultado.id} atualizado com sucesso.\n`));
        return resultado;
    } catch (erro) {
        console.log('Não foi possível atualizar o imóvel. ', erro, '\n');
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

        console.log(chalk.red(`Imóvel número ${id} deletado com sucesso.\n`));
        return resultado;
    } catch (erro) {
        console.log('Não foi possível deletar o imóvel. ', erro, '\n');
        throw erro;
    }

}