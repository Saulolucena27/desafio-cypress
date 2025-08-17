import {
  Given,
  When,
  And,
  Then,
  Before,
  After,
} from "cypress-cucumber-preprocessor/steps";

Given("que existe um registro cadastrado na tabela", () => {
 cy.clickAddWebTablesButton()
 cy.gerarDadosUsuarioFaker()
 cy.preencherFormularioComFaker()
 cy.submitFormulario()
 cy.validarUsuarioCriadoComFaker()
});

When('clico no ícone de editar do primeiro registro', () => {
  cy.clicarBotaoEditarRegistro()
});

And('altero os seguintes campos com dados do Faker e clico no botão "Submit"', () => {
  cy.gerarNovosDadosFakerParaEdicao().then((novosDados) => {
    cy.alterarCamposComNovosFaker()
    cy.submitEdicao()
  });
});
Then('o registro deve ser atualizado na tabela e os novos valores devem estar visíveis', () => {
  cy.validarEdicaoComNovosDados()
});
