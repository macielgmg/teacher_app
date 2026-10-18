const { DataTypes } = require('sequelize');
const { sequelize } = require('../config/database');

const Produto = sequelize.define('Produto', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  nome: {
    type: DataTypes.STRING(100),
    allowNull: false,
    validate: { notEmpty: { msg: 'O nome do produto é obrigatório' } }
  },
  codigo: {
    type: DataTypes.STRING(50),
    allowNull: false,
    unique: true,
    validate: { notEmpty: { msg: 'O código do produto é obrigatório' } }
  },
  preco: {
    type: DataTypes.DECIMAL(10, 2),
    allowNull: false,
    validate: { min: { args: [0], msg: 'O preço não pode ser negativo' } }
  },
  descricao: {
    type: DataTypes.STRING(500)
  },
  quantidadeEstoque: {
    type: DataTypes.INTEGER,
    allowNull: false,
    defaultValue: 0,
    validate: { min: { args: [0], msg: 'A quantidade em estoque não pode ser negativa' } }
  },
  avaliacao: {
    type: DataTypes.DECIMAL(2, 1),
    validate: {
      min: { args: [0], msg: 'A avaliação deve ser entre 0 e 5' },
      max: { args: [5], msg: 'A avaliação deve ser entre 0 e 5' }
    }
  },
  categoria: {
    type: DataTypes.STRING(60),
    allowNull: false,
    validate: { notEmpty: { msg: 'A categoria é obrigatória' } }
  }
}, {
  tableName: 'Produtos'
});

module.exports = Produto;
