const Produto = require('../models/Produto');

const camposEditaveis = ['nome', 'codigo', 'preco', 'descricao', 'quantidadeEstoque', 'avaliacao', 'categoria'];

function tratarErro(res, erro) {
  if (erro.name === 'SequelizeUniqueConstraintError') {
    return res.status(409).json({ mensagem: 'Já existe um produto com esse código' });
  }
  if (erro.name === 'SequelizeValidationError') {
    return res.status(400).json({ mensagem: erro.errors.map((e) => e.message) });
  }
  console.error(erro);
  return res.status(500).json({ mensagem: 'Erro interno no servidor' });
}

async function criar(req, res) {
  try {
    const produto = await Produto.create(req.body, { fields: camposEditaveis });
    return res.status(201).json(produto);
  } catch (erro) {
    return tratarErro(res, erro);
  }
}

async function listarTodos(req, res) {
  try {
    const produtos = await Produto.findAll({ order: [['id', 'ASC']] });
    return res.json(produtos);
  } catch (erro) {
    return tratarErro(res, erro);
  }
}

async function buscarPorCodigo(req, res) {
  try {
    const produto = await Produto.findOne({ where: { codigo: req.params.codigo } });
    if (!produto) {
      return res.status(404).json({ mensagem: 'Produto não encontrado' });
    }
    return res.json(produto);
  } catch (erro) {
    return tratarErro(res, erro);
  }
}

async function buscarPorCategoria(req, res) {
  try {
    const produtos = await Produto.findAll({ where: { categoria: req.params.categoria } });
    if (produtos.length === 0) {
      return res.status(404).json({ mensagem: 'Nenhum produto encontrado nessa categoria' });
    }
    return res.json(produtos);
  } catch (erro) {
    return tratarErro(res, erro);
  }
}

async function atualizar(req, res) {
  try {
    const produto = await Produto.findOne({ where: { codigo: req.params.codigo } });
    if (!produto) {
      return res.status(404).json({ mensagem: 'Produto não encontrado' });
    }
    await produto.update(req.body, { fields: camposEditaveis });
    return res.json(produto);
  } catch (erro) {
    return tratarErro(res, erro);
  }
}

async function deletar(req, res) {
  try {
    const produto = await Produto.findOne({ where: { codigo: req.params.codigo } });
    if (!produto) {
      return res.status(404).json({ mensagem: 'Produto não encontrado' });
    }
    await produto.destroy();
    return res.json({ mensagem: `Produto ${req.params.codigo} removido com sucesso` });
  } catch (erro) {
    return tratarErro(res, erro);
  }
}

module.exports = { criar, listarTodos, buscarPorCodigo, buscarPorCategoria, atualizar, deletar };
