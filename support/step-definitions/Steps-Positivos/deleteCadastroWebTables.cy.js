import {
  Given,
  When,
  And,
  Then,
  Before,
  After,
} from "cypress-cucumber-preprocessor/steps";

Given('que existe um registro específico na tabela', () => {
});

When('clico no ícone de excluir do registro', () => {
  cy.clicarBotaoExcluirRegistro()
});

Then('o registro deve ser removido da tabela', () => {
  cy.validarExclusao()
});

