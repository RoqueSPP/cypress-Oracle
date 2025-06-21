
# 📘 Projeto Cypress + OracleDB

Automação de testes E2E com integração direta com banco de dados **Oracle** usando **Node.js** e **Cypress**.

## ✅ Pré-requisitos

- Node.js (v16 ou superior recomendado)
- npm
- Oracle Instant Client
- Banco de Dados Oracle (acesso/credenciais)
- Git (opcional)

## 📦 Instalação

1️⃣ **Clone o projeto**

```bash
git clone [https://github.com/RoqueSPP/cypress-Oracle.git]
cd seu-repo
```

2️⃣ **Instale as dependências**

```bash
npm install
```
**Abra o cypress para criar as pastas padrão**
```bash
npx cypress open
```

3️⃣ **Baixe e configure o Oracle Instant Client**

- Faça o download do **Oracle Instant Client**: https://www.oracle.com/database/technologies/instant-client.html
- Extraia para uma pasta local do projeto, por exemplo:

```
cypress/support/clientDB/instantclient_23_8
```

4️⃣ **Configure o caminho do Instant Client no código**

```js
const oracledb = require('oracledb');

oracledb.initOracleClient({ libDir: './cypress/support/clientDB/instantclient_23_8' });
```

5️⃣ **Configurar conexão no arquivo `.env` ou diretamente no código**

```js
const connection = await oracledb.getConnection({
  user: 'SEU_USUARIO',
  password: 'SUA_SENHA',
  connectString: 'HOST:PORTA/SERVICO'
});
```

## ⚙️ Estrutura do Projeto

```
📁 cypress
 ┣ 📁 plugins
 ┃ ┗ 📄 index.js     # Conexão com Oracle e tasks personalizadas
 ┣ 📁 support
 ┃ ┗ 📁 clientDB     # Oracle Instant Client
 ┗ 📄 e2e            # Seus testes Cypress
```

## 🖥️ Exemplo de Conexão com OracleDB

```js
const oracledb = require('oracledb');

oracledb.outFormat = oracledb.OUT_FORMAT_OBJECT;
oracledb.initOracleClient({ libDir: './cypress/support/clientDB/instantclient_23_8' });

async function conectarDB(query) {
  const connection = await oracledb.getConnection({
    user: "USUARIO",
    password: 'SENHA',
    connectString: "ENDERECO/TNS"
  });
  return result = await connection.execute(query);
  await connection.close();
}
```

## 📝 Exemplo de Task no Cypress (`cypress/plugins/index.js`)

```js
const oracledb = require('oracledb');
oracledb.initOracleClient({ libDir: './cypress/support/clientDB/instantclient_23_8' });

async function conectarDB(query) {


    const connection = await oracledb.getConnection({
        user: "system",
        password: '123456',
        connectString: "(DESCRIPTION =(ADDRESS = (PROTOCOL = TCP)\
        (HOST = DESKTOP-KDLUVDQ)(PORT = 1521))\
        (CONNECT_DATA =(SERVER = DEDICATED)\
        (SERVICE_NAME = XE)))"
    });
    console.log('banco conectado com sucesso')
    return result = await connection.execute(query);

    await connection.close();

}
module.exports = (on)=>{
    on('task', {
        SQL: (query)=>{
            return conectarDB(query)
        }
    })
}
```

## 📝 Exemplo de Task no Cypress (`cypress/cypress.config.js`)

```js
const { defineConfig } = require("cypress");

module.exports = defineConfig({
  e2e: {
    setupNodeEvents(on, config) {

      return require('.\\cypress\\plugins\\index.js')(on, config)
      // implement node event listeners here
    },
  },
});

```
## ▶️ Executando os testes


```Arquivo de teste
describe('template spec', () => {
  it('passes', () => {
    const sql = 'select * from pessoas'
    cy.task('SQL', sql)
      .then((res) => {
        cy.log(res.rows[6].BAIRRO)
        cy.log(res.rows[6].NOME)
        cy.log(res.rows[6].ESTADO)
        cy.log(res.rows[6].ENDERECO)
        cy.log(res.rows[6].CPF)
        cy.log(res.rows[6].RG)
        
      })
  })
})
```

## ⚠️ Observações

- Verifique compatibilidade da versão do **Oracle Instant Client** com o seu OracleDB.
- Caso necessário, instale variáveis de ambiente específicas (como `LD_LIBRARY_PATH` no Linux).

## 📄 Licença

Este projeto está licenciado sob [MIT License](LICENSE).
