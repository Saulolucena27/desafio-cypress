const { faker } = require("@faker-js/faker");
const BTN_EDIT_ROW4 = "#edit-record-4";
const BTN_SUBMIT_EDIT = "#submit";
const EDIT_FIRST_NAME = "#firstName";
const EDIT_LAST_NAME = "#lastName";
const EDIT_EMAIL = "#userEmail";
const EDIT_AGE = "#age";
const EDIT_SALARY = "#salary";
const EDIT_DEPARTMENT = "#department";
const CELL_FIRSTNAME_ROW4 = ":nth-child(4) > .rt-tr > :nth-child(1)";
const CELL_LASTNAME_ROW4 = ":nth-child(4) > .rt-tr > :nth-child(2)";
const CELL_EMAIL_ROW4 = ":nth-child(4) > .rt-tr > :nth-child(4)";
const CELL_AGE_ROW4 =
  ':nth-child(4) > .rt-tr > [style="flex: 40 0 auto; width: 40px; max-width: 40px;"]';
const CELL_SALARY_ROW4 = ":nth-child(4) > .rt-tr > :nth-child(5)";
const CELL_DEPARTMENT_ROW4 = ":nth-child(4) > .rt-tr > :nth-child(6)";
const MODAL_BODY = ".modal-body";

// Comando para clicar no botão de editar
Cypress.Commands.add("clicarBotaoEditarRegistro", () => {
  cy.get(BTN_EDIT_ROW4).click();
  cy.get(".modal-content", { timeout: 10000 }).should("be.visible");
  cy.get(EDIT_FIRST_NAME).should("be.visible");

  cy.log("✅ Modal de edição aberto");
});

// Comando para gerar novos dados Faker para edição
Cypress.Commands.add("gerarNovosDadosFakerParaEdicao", () => {
  const novosDados = {
    firstName: faker.person.firstName(),
    lastName: faker.person.lastName(),
    email: faker.internet.email(),
    age: faker.number.int({ min: 18, max: 65 }),
    salary: faker.number.int({ min: 35000, max: 120000 }), // Salário maior para diferenciação
    department: faker.helpers.arrayElement([
      "Engineering",
      "Quality Assurance",
      "Sales",
      "Marketing",
      "Finance",
      "Legal",
    ]),
  };

  // Salvar novos dados para edição
  Cypress.env("dadosEdicaoFaker", novosDados);

  cy.log("📝 Novos dados gerados para edição (dados ocultos)");

  return cy.wrap(novosDados);
});

// Comando para alterar campos com novos dados Faker
Cypress.Commands.add("alterarCamposComNovosFaker", () => {
  const dadosEdicao = Cypress.env("dadosEdicaoFaker");

  if (!dadosEdicao) {
    throw new Error("❌ Novos dados para edição não foram gerados!");
  }

  // Limpar e preencher com novos dados
  cy.get(EDIT_FIRST_NAME).clear().type(dadosEdicao.firstName, { log: false });
  cy.get(EDIT_LAST_NAME).clear().type(dadosEdicao.lastName, { log: false });
  cy.get(EDIT_EMAIL).clear().type(dadosEdicao.email, { log: false });
  cy.get(EDIT_AGE).clear().type(dadosEdicao.age.toString(), { log: false });
  cy.get(EDIT_SALARY)
    .clear()
    .type(dadosEdicao.salary.toString(), { log: false });
  cy.get(EDIT_DEPARTMENT).clear().type(dadosEdicao.department, { log: false });
  cy.log("✅ Campos alterados com novos dados Faker");
});

// Comando para submeter edição
Cypress.Commands.add("submitEdicao", () => {
  cy.get(BTN_SUBMIT_EDIT).should("be.visible").and("not.be.disabled").click();
});

Cypress.Commands.add("validarEdicaoComNovosDados", () => {
  const dadosEdicao = Cypress.env("dadosEdicaoFaker");

  if (!dadosEdicao) {
    throw new Error("Dados de edição não encontrados!");
  }
  cy.get(CELL_FIRSTNAME_ROW4).should("contain", dadosEdicao.firstName);
  cy.get(CELL_LASTNAME_ROW4).should("contain", dadosEdicao.lastName);
  cy.get(CELL_EMAIL_ROW4).should("contain", dadosEdicao.email);
  cy.get(CELL_AGE_ROW4).should("contain", dadosEdicao.age.toString());
  cy.get(CELL_SALARY_ROW4).should("contain", dadosEdicao.salary.toString());
  cy.get(CELL_DEPARTMENT_ROW4).should("contain", dadosEdicao.department);
  cy.log(`Edição validada: ${dadosEdicao.firstName} ${dadosEdicao.lastName}`);
  cy.screenshot("edicao_validada");
});

Cypress.Commands.add("alterarEmailParaFormatoInvalido", () => {
  const emailInvalido = `${faker.person.firstName()}${faker.person.lastName()}semArroba`;

  cy.get("#userEmail").clear().type(emailInvalido, { log: false });
  cy.log(`Email alterado para: ${emailInvalido} (formato inválido)`);
});

Cypress.Commands.add("validarErroEdiçãoEmailInvalido", () => {
  cy.get(".modal-content").should("be.visible");
  cy.get(MODAL_BODY).should("be.visible");
  cy.get(MODAL_BODY).within(() => {
    cy.get("#userEmail")
      .should("have.css", "border-color")
      .and("include", "rgb(220, 53, 69)");
  });
  cy.log("Campos com erro visual (borda vermelha) detectados");
  cy.screenshot("erro_edicao_email_invalido");
});

Cypress.Commands.add("validarErroEdiçãoEmailInvalido", () => {
  cy.get(".modal-content").should("be.visible");
  cy.get(MODAL_BODY).should("be.visible");
  cy.get(MODAL_BODY).within(() => {
    cy.get("#userEmail")
      .should("have.css", "border-color")
      .and("include", "rgb(220, 53, 69)");
  });
  cy.log("Campos com erro visual (borda vermelha) detectados");
});
