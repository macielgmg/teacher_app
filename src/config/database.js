const { Sequelize } = require('sequelize');
require('dotenv').config();

const nomeBanco = process.env.DB_NAME || 'ProdutosDB';
const usuario = process.env.DB_USER || 'sa';
const senha = process.env.DB_PASSWORD || '';

const opcoesConexao = {
  encrypt: false,
  trustServerCertificate: true
};

if (!process.env.DB_PORT) {
  opcoesConexao.instanceName = process.env.DB_INSTANCE || 'SQLEXPRESS';
}

const config = {
  host: process.env.DB_HOST || 'localhost',
  port: process.env.DB_PORT ? Number(process.env.DB_PORT) : undefined,
  dialect: 'mssql',
  logging: false,
  dialectOptions: { options: opcoesConexao }
};

const sequelize = new Sequelize(nomeBanco, usuario, senha, config);

async function criarBancoSeNaoExistir() {
  const master = new Sequelize('master', usuario, senha, config);
  await master.query(`IF DB_ID('${nomeBanco}') IS NULL CREATE DATABASE [${nomeBanco}]`);
  await master.close();
}

module.exports = { sequelize, criarBancoSeNaoExistir };
