# API de Cadastro de Produtos

Autor: Gabriel Maciel

API em Node.js com Express, Sequelize (ORM) e SQL Server Express para cadastro de produtos.

## Como executar

1. Instalar as dependências:

```
npm install
```

2. Copiar o arquivo `.env.example` para `.env` e colocar o usuário e a senha do SQL Server.

3. Iniciar a API (o banco `ProdutosDB` e a tabela `Produtos` são criados automaticamente):

```
npm start
```

A API sobe em `http://localhost:3000`.

## Rotas

| Método | Rota | Descrição |
|---|---|---|
| POST | /produtos | Cadastra um produto |
| GET | /produtos | Lista todos os produtos |
| GET | /produtos/codigo/:codigo | Busca um produto pelo código |
| GET | /produtos/categoria/:categoria | Lista os produtos de uma categoria |
| PUT/PATCH | /produtos/:codigo | Atualiza os dados de um produto |
| DELETE | /produtos/:codigo | Remove um produto |

## Exemplo de corpo (POST)

```json
{
  "nome": "Teclado Mecânico",
  "codigo": "PRD-002",
  "preco": 249.90,
  "descricao": "Teclado mecânico ABNT2 com switch azul",
  "quantidadeEstoque": 15,
  "avaliacao": 4.5,
  "categoria": "Periféricos"
}
```

## Testes

O arquivo `API-Produtos.postman_collection.json` pode ser importado no Postman e contém as requisições usadas nos testes.
