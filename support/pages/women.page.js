const BTN_ACESSA_LOGIN = ".login";
const BTN_WOMEN = '.sf-menu > :nth-child(1) > [href="http://www.automationpractice.pl/index.php?id_category=3&controller=category"]';

const VALIDACAO_PRODUTOS = ".product-container";

Cypress.Commands.add("validaQuantidadeProdutos", () => {
  cy.get(VALIDACAO_PRODUTOS).should("have.length", 7);
});

Cypress.Commands.add("clicarProduto", (produto) => {
  cy.get(VALIDACAO_PRODUTOS).contains(produto).click();
});

Cypress.Commands.add("acessoWomen", () => {
  cy.get(BTN_WOMEN).click();
});
