README
Treinamento Cypress - CRUD WebTables
Este projeto automatiza cenários de testes (positivos e negativos) para o CRUD de usuários na página DemoQA WebTables, utilizando Cypress com Cucumber (Gherkin) e geração de dados dinâmicos com Faker.

Estrutura do Projeto
.
├── cypress.config.js
├── cypress.env.json
├── package.json
├── cypress/
│   ├── e2e/
│   │   ├── cenarios-negativos.feature
│   │   └── cenarios-positivos.feature
│   ├── screenshots/
│   ├── support/
│   │   ├── commands.js
│   │   ├── e2e.js
│   │   └── pages/
│   │       ├── webTables.page.js
│   │       ├── editWebTables.page.js
│   │       └── deleteWebTables.page.js
│   │   └── step-definitions/
│   │       ├── Steps-Positivos/
│   │       └── Steps-Negativos/
│   └── videos/
└── .gitignore
Pré-requisitos
Node.js (versão 18 ou superior)
npm
Instalação
Clone o repositório:

git clone <url-do-repositorio>
cd <nome-da-pasta>
Instale as dependências:

npm install
Configuração
As variáveis de ambiente estão no arquivo cypress.env.json:

{
  "BASE_URL": "https://demoqa.com/webtables",
}
Como Executar
Modo interativo (interface gráfica)
npx cypress open
Modo headless (terminal)
npx cypress run
Executar cenários específicos
npx cypress run --spec "cypress/e2e/cenarios-positivos.feature"
npx cypress run --spec "cypress/e2e/cenarios-negativos.feature"
Funcionalidades Testadas
Cenários Positivos
Criar usuário com dados válidos
Editar registro existente
Excluir registro da tabela
Cenários Negativos
Validação de campos obrigatórios
Teste de limites de caracteres (300)
Validação de formato de email
Teste de segurança contra SQL Injection
Tecnologias
Cypress
Cucumber (BDD)
Faker.js (geração de dados)
JavaScript
Evidências
Os testes geram automaticamente:

Screenshots em cypress/screenshots/
Vídeos em cypress/videos/
Autor
Saulo de Lucena saulolucena12@gmail.com
