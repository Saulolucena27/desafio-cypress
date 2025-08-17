import {
  Given,
  When,
  And,
  Then,
  Before,
  After,
} from "cypress-cucumber-preprocessor/steps";

//Validar campos obrigatórios em branco
When('clico no botão "Add" para adicionar novo registro', () => {
  cy.clickAddWebTablesButton()
});

And('deixo os campos em branco', () => {
  cy.deixarTodosCamposVazios()
});

And('clico no botão "Submit"', () => {
  cy.submitFormulario()
});

Then('devo ver uma mensagem de erro para o campo', (campo) => {
  cy.validarErroFormulario()
});

And('devo permanecer no formulário', () => {
  cy.devoPermanecerNoFormulario()
});