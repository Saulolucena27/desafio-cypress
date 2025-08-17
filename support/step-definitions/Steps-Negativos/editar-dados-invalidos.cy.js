import {
  Given,
  When,
  And,
  Then,
  Before,
  After,
} from "cypress-cucumber-preprocessor/steps";

Given('que existe um registro na tabela', () => {
  cy.clickAddWebTablesButton()
  cy.gerarDadosUsuarioFaker()
  cy.preencherFormularioComFaker()
  cy.submitFormulario()
  cy.validarUsuarioCriadoComFaker()
});

When('clico no ícone de editar', () => {
  cy.clicarBotaoEditarRegistro()
});

And('altero o campo email para um formato inválido gerado pelo Faker', () => {
  cy.alterarEmailParaFormatoInvalido()
});

And('clico no botão "Submit"', () => {
  cy.submitEdicao()
});

Then('devo ver uma mensagem de erro de validação', () => {
  cy.validarErroEdiçãoEmailInvalido()
});

And('devo permanecer no formulário de edição', () => {
  cy.devoPermanecerNoFormulario()
});
