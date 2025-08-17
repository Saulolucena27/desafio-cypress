import {
  Given,
  When,
  And,
  Then,
  Before,
  After,
} from "cypress-cucumber-preprocessor/steps";

//Tentar injeção SQL nos campos do formulário
When('clico no botão "Add" para adicionar novo registro', () => {
  cy.clickAddWebTablesButton()
});

And('preencho os campos com códigos SQL maliciosos', () => {
  cy.gerarDadosInjecaoSQL()
  cy.preencherFormularioComInjecaoSQL()
});

And('clico no botão "Submit"', () => {
  cy.submitFormulario()
});

Then('o sistema deve rejeitar a injeção SQL', () => {
  cy.validarRejeicaoInjecaoSQL()
});

And('devo ver erros de validação nos campos', () => {
  cy.get(".modal-content").should("be.visible");
});
