# utf-8
# language: pt

Funcionalidade: CRUD de Usuários
Como administrador do sistema
Quero gerenciar cadastro de Usuários
Para manter os dados atualizados e organizados

Contexto:
Dado que acesso o portal webtables

  @positivo @smoke @criar
  Cenário: Criar novo registro com dados válidos gerados pelo Faker
    Quando clico no botão "Add" para adicionar novo registro
    E preencho todos os campos obrigatórios com dados válidos do Faker e clico no botão "Submit"
    Então o registro deve ser criado com sucesso e os dados devem aparecer corretamente na tabela

  @positivo @editar
  Cenário: Editar registro existente com dados do Faker
    Dado que existe um registro cadastrado na tabela
    Quando clico no ícone de editar do primeiro registro
    E altero os seguintes campos com dados do Faker e clico no botão "Submit"
    Então o registro deve ser atualizado na tabela e os novos valores devem estar visíveis

  @positivo @excluir
  Cenario: Excluir registro da tabela
    Dado que existe um registro específico na tabela
    Quando clico no ícone de excluir do registro
    Então o registro deve ser removido da tabela
