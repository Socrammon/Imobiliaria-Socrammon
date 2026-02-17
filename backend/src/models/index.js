import { Cliente } from './cliente.js';
import { Proprietario } from './proprietario.js';
import { Imovel } from './imovel.js';

Cliente.hasMany(Imovel, { foreignKey: 'clienteId' });
Proprietario.hasMany(Imovel, { foreignKey: 'proprietarioId' });

Imovel.belongsTo(Cliente, { foreignKey: 'clienteId' });
Imovel.belongsTo(Proprietario, { foreignKey: 'proprietarioId' });