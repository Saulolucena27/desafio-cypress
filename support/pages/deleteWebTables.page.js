const BTN_DELETE_ROW3 = "#delete-record-3";

Cypress.Commands.add("clicarBotaoExcluirRegistro", () => {
  cy.get(BTN_DELETE_ROW3).should("be.visible").click();
  cy.wait(500);
  cy.log("Botão de excluir clicado");
});

Cypress.Commands.add("validarExclusao", () => {
  cy.get(BTN_DELETE_ROW3).should("not.exist");
  cy.log("Registro excluído com sucesso");
  cy.screenshot("registro_excluido");
});
