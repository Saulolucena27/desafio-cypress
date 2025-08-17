import {
  Given,
  When,
  And,
  Then,
  Before,
  After,
} from "cypress-cucumber-preprocessor/steps";

//Validar campos com texto muito longo usando Faker
When('clico no botão "Add" para adicionar novo registro', () => {
 cy.clickAddWebTablesButton();
});

And('preencho os campos com um texto faker de 300 caracteres', () => {
  cy.gerarDados300CaracteresFaker();
  cy.preencherFormularioCom300Caracteres();
});

And('clico no botão "Submit"', () => {
  cy.submitFormulario();
});

Then('devo ver uma mensagem de erro de tamanho máximo excedido', () => {
  cy.validarCampos300Caracteres()
});
