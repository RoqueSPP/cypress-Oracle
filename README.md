# Integração Cypress com OracleDB

Este projeto demonstra como integrar o Cypress com banco de dados Oracle usando Node.js e a biblioteca `oracledb`.

## 📌 Instalação

1️⃣ Instale as dependências:

```bash
npm install
```

2️⃣ Baixe o Oracle Instant Client e coloque na pasta:

```
cypress/plugins/db/instantclient_23_8
```

3️⃣ Configure as credenciais do banco de dados no arquivo:

```
cypress/plugins/index.js
```

## 📌 Executando os testes

```bash
npx cypress open
```

**O arquivo de teste exemplo está em `cypress/e2e/sql_test.cy.js`**