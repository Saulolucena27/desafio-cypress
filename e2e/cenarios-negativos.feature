# utf-8
# language: pt

Funcionalidade: CENÁRIO NEGATIVOS COM GERENCIMENTO DO CRUD DE USUÁRIOS

Contexto:
Dado que acesso o portal webtables

  @negativo @campos-obrigatorios
  Cenário: Validar campos obrigatórios em branco
    Quando clico no botão "Add" para adicionar novo registro
    E deixo os campos em branco
    E clico no botão "Submit"
    Então devo ver uma mensagem de erro para o campo
    E devo permanecer no formulário

  @negativo @campos-muito-longos
  Cenário: Validar campos com texto muito longo usando Faker
    Quando clico no botão "Add" para adicionar novo registro
    E preencho os campos com um texto faker de 300 caracteres
    E clico no botão "Submit"
    Então devo ver uma mensagem de erro de tamanho máximo excedido

  @negativo @edicao-dados-invalidos
  Cenário: Tentar editar registro com dados inválidos do Faker
    Dado que existe um registro na tabela
    Quando clico no ícone de editar
    E altero o campo email para um formato inválido gerado pelo Faker
    E clico no botão "Submit"
    Então devo ver uma mensagem de erro de validação
    E devo permanecer no formulário de edição

  @negativo @injecao-sql
  Cenário: Tentar injeção SQL nos campos do formulário
    Quando clico no botão "Add" para adicionar novo registro
    E preencho os campos com códigos SQL maliciosos
    E clico no botão "Submit"
    Então o sistema deve rejeitar a injeção SQL
    E devo ver erros de validação nos campos

