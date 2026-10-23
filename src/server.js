const express = require('express');
const { sequelize, criarBancoSeNaoExistir } = require('./config/database');
const produtoRoutes = require('./routes/produtoRoutes');

const app = express();
app.use(express.json());
app.use('/produtos', produtoRoutes);

const PORT = process.env.PORT || 3000;

async function iniciar() {
  try {
    await criarBancoSeNaoExistir();
    await sequelize.authenticate();
    await sequelize.sync();
    console.log('Conectado ao SQL Server');

    app.listen(PORT, () => {
      console.log(`API rodando em http://localhost:${PORT}`);
    });
  } catch (erro) {
    console.error('Erro ao conectar no banco de dados:', erro.message);
    process.exit(1);
  }
}

iniciar();
