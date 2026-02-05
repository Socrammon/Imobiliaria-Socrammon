import { Sequelize } from 'sequelize';

export const sequelize = new Sequelize({
    dialect: 'sqlite',
    storage: '../../db/db.sql'
});

sequelize.authenticate();

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
        allowNull: false
    },
    descricao: {
        type: Sequelize.TEXT,
        allowNull: true
    }

});

export async function criaImovel(imovel) {
    try {
        const resultado = await Imovel.create(imovel);
        console.log(`\nImóvel número ${resultado.id} criado com sucesso.`);
        return resultado;
    } catch(erro) {
        console.log('\nNão foi possível criar o imóvel', erro);
        throw erro;
    }
}

export async function leImovel() {

    try {
        const resultado = await Imovel.findAll();
        console.log(`\nImóveis encontrados com sucesso.`);
        return resultado;
    } catch(erro) {
        console.log('\nNão foi possível encontrar os imóveis', erro);
        throw erro;
    }

}

export async function leImovelPorId(id) {

    try {
        const resultado = await Imovel.findByPk(id);
        console.log(`\nImóvel número ${resultado.id} encontrado com sucesso.`);
        return resultado;
    } catch(erro) {
        console.log('\nNão foi possível encontrar o imóvel', erro);
        throw erro;
    }

}

export async function atualizaImovel(id, dadosImovel) {

    try {
        const resultado = await Imovel.findByPk(id);
        if(resultado?.id) {
            for(const chave in dadosImovel) {
                if(chave in resultado) {
                    resultado[chave] = dadosImovel[chave];
                }
            }
            resultado.save();
            console.log(`\nImóvel número ${resultado.id} atualizado com sucesso.`);
        }
        return resultado;
    } catch(erro) {
        console.log('\nNão foi possível atualizar o imóvel', erro);
        throw erro;
    }

}

export async function deletaImovel(id) {

    try {
        const resultado = await Imovel.destroy({where: {id: id}});
        console.log(`\nImóvel número ${resultado.id} deletado com sucesso.`);
        return resultado;
    } catch(erro) {
        console.log('\nNão foi possível deletar o imóvel', erro);
        throw erro;
    }

}