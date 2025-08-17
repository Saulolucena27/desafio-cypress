import {
  Given,
  When,
  And,
  Then,
  Before,
  After,
} from "cypress-cucumber-preprocessor/steps";

//Criar novo registro com dados válidos gerados pelo Faker
Given("que acesso o portal webtables", () => {
  cy.visit(Cypress.env("BASE_URL"));
});

When('clico no botão "Add" para adicionar novo registro', () => {
  cy.clickAddWebTablesButton();
});

And(
  'preencho todos os campos obrigatórios com dados válidos do Faker e clico no botão "Submit"',
  () => {
    cy.gerarDadosUsuarioFaker();
    cy.preencherFormularioComFaker();
    cy.submitFormulario();
  }
);
Then(
  "o registro deve ser criado com sucesso e os dados devem aparecer corretamente na tabela",
  () => {
    cy.validarUsuarioCriadoComFaker();
  }
);
