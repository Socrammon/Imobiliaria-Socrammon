import { Sequelize } from 'sequelize';

export const sequelize = new Sequelize({
    dialect: 'sqlite',
    storage: './db.db'
});

export async function conectarBanco() {
    try {
        await sequelize.authenticate();
        console.log('\nBanco conectado com sucesso!');
    } catch (erro) {
        console.error('\nErro ao conectar no banco:', erro);
    }
}