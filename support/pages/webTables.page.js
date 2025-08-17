const { faker } = require("@faker-js/faker");
const BTN_ADD_WEB_TABLES = "#addNewRecordButton";
const BTN_ADD_FIRST_NAME = "#firstName";
const BTN_ADD_LAST_NAME = "#lastName";
const BTN_ADD_EMAIL = "#userEmail";
const BTN_ADD_AGE = "#age";
const BTN_ADD_SALARY = "#salary";
const BTN_ADD_DEPARTMENT = "#department";
const BTN_SUBMIT_CADASTRO = "#submit";
const TABLE_BODY = ".rt-tbody";
const CELL_FIRSTNAME_ROW4 = ":nth-child(4) > .rt-tr > :nth-child(1)";
const CELL_LASTNAME_ROW4 = ":nth-child(4) > .rt-tr > :nth-child(2)";
const CELL_EMAIL_ROW4 = ":nth-child(4) > .rt-tr > :nth-child(4)";
const CELL_AGE_ROW4 =
  ':nth-child(4) > .rt-tr > [style="flex: 40 0 auto; width: 40px; max-width: 40px;"]';
const CELL_SALARY_ROW4 = ":nth-child(4) > .rt-tr > :nth-child(5)";
const CELL_DEPARTMENT_ROW4 = ":nth-child(4) > .rt-tr > :nth-child(6)";
const MODAL_BODY = ".modal-body";

Cypress.Commands.add("clickAddWebTablesButton", () => {
  cy.get(BTN_ADD_WEB_TABLES).click(); // ✅ CORRETO!
});

Cypress.Commands.add("gerarDadosUsuarioFaker", () => {
  const dadosUsuario = {
    firstName: faker.person.firstName(),
    lastName: faker.person.lastName(),
    email: faker.internet.email(),
    age: faker.number.int({ min: 18, max: 65 }),
    salary: faker.number.int({ min: 30000, max: 100000 }),
    department: faker.helpers.arrayElement([
      "Engineering",
      "Quality Assurance",
      "Sales",
      "Marketing",
      "Finance",
      "Legal",
    ]),
  };
  Cypress.env("dadosUsuarioFaker", dadosUsuario);
  cy.log("Dados gerados pelo Faker:");
  cy.log(`Nome: ${dadosUsuario.firstName} ${dadosUsuario.lastName}`, {
    log: false,
  });
  cy.log(`Email: ${dadosUsuario.email}`, { log: false });
  cy.log(`Idade: ${dadosUsuario.age}`, { log: false });
  cy.log(`Salário: ${dadosUsuario.salary}`, { log: false });
  cy.log(`Departamento: ${dadosUsuario.department}`, { log: false });
  return cy.wrap(dadosUsuario);
});

Cypress.Commands.add("preencherFormularioComFaker", () => {
  const dadosSalvos = Cypress.env("dadosUsuarioFaker");
  if (!dadosSalvos) {
    throw new Error("Dados do Faker não foram gerados!");
  }
  cy.get(BTN_ADD_FIRST_NAME, { timeout: 10000 }).should("be.visible");
  cy.get(BTN_ADD_FIRST_NAME)
    .should("be.visible")
    .clear()
    .type(dadosSalvos.firstName, { delay: 50, log: false });
  cy.get(BTN_ADD_LAST_NAME)
    .should("be.visible")
    .clear()
    .type(dadosSalvos.lastName, { delay: 50, log: false });
  cy.get(BTN_ADD_EMAIL)
    .should("be.visible")
    .clear()
    .type(dadosSalvos.email, { delay: 50, log: false });
  cy.get(BTN_ADD_AGE)
    .should("be.visible")
    .clear()
    .type(dadosSalvos.age.toString(), { delay: 50, log: false });
  cy.get(BTN_ADD_SALARY)
    .should("be.visible")
    .clear()
    .type(dadosSalvos.salary.toString(), { delay: 50, log: false });
  cy.get(BTN_ADD_DEPARTMENT)
    .should("be.visible")
    .clear()
    .type(dadosSalvos.department, { delay: 50, log: false });
  cy.log(`Formulário preenchido (dados ocultos por segurança)`, {
    log: false,
  });
});

Cypress.Commands.add("submitFormulario", () => {
  cy.get(BTN_SUBMIT_CADASTRO).click();
});

Cypress.Commands.add("obterDadosFakerSalvos", () => {
  const dadosSalvos = Cypress.env("dadosUsuarioFaker");
  if (!dadosSalvos) {
    throw new Error("Nenhum dado do Faker foi salvo ainda!");
  }
  return cy.wrap(dadosSalvos);
});

Cypress.Commands.add("validarUsuarioCriadoComFaker", () => {
  const dadosSalvos = Cypress.env("dadosUsuarioFaker");
  if (!dadosSalvos) {
    throw new Error(" Dados do Faker não encontrados!");
  }
  cy.get(TABLE_BODY, { timeout: 10000 }).should("be.visible");
  cy.get(CELL_FIRSTNAME_ROW4)
    .should("be.visible")
    .and("contain", dadosSalvos.firstName);
  cy.get(CELL_LASTNAME_ROW4)
    .should("be.visible")
    .and("contain", dadosSalvos.lastName);
  cy.get(CELL_EMAIL_ROW4)
    .should("be.visible")
    .and("contain", dadosSalvos.email);
  cy.get(CELL_AGE_ROW4)
    .should("be.visible")
    .and("contain", dadosSalvos.age.toString());
  cy.get(CELL_SALARY_ROW4)
    .should("be.visible")
    .and("contain", dadosSalvos.salary.toString());
  cy.get(CELL_DEPARTMENT_ROW4)
    .should("be.visible")
    .and("contain", dadosSalvos.department);
  cy.log(` Usuário ${dadosSalvos.firstName} validado na linha 4`);
  cy.screenshot("usuario_validado");
});

Cypress.Commands.add("deixarTodosCamposVazios", () => {
  cy.get(BTN_ADD_FIRST_NAME).clear();
  cy.get(BTN_ADD_LAST_NAME).clear();
  cy.get(BTN_ADD_EMAIL).clear();
  cy.get(BTN_ADD_AGE).clear();
  cy.get(BTN_ADD_SALARY).clear();
  cy.get(BTN_ADD_DEPARTMENT).clear();
  cy.log("Todos os campos deixados vazios para teste");
});

Cypress.Commands.add("validarErroFormulario", () => {
  cy.get(".modal-content").should("be.visible");
  cy.get(MODAL_BODY).should("be.visible");
  cy.get(MODAL_BODY).within(() => {
    cy.get("#firstName")
      .should("have.css", "border-color")
      .and("include", "rgb(220, 53, 69)");
    cy.get("#lastName")
      .should("have.css", "border-color")
      .and("include", "rgb(220, 53, 69)");
    cy.get("#userEmail")
      .should("have.css", "border-color")
      .and("include", "rgb(220, 53, 69)");
    cy.get("#age")
      .should("have.css", "border-color")
      .and("include", "rgb(220, 53, 69)");
    cy.get("#salary")
      .should("have.css", "border-color")
      .and("include", "rgb(220, 53, 69)");
    cy.get("#department")
      .should("have.css", "border-color")
      .and("include", "rgb(220, 53, 69)");
  });
  cy.log("Campos com erro visual (borda vermelha) detectados");
  cy.screenshot("erro_validacao_campos");
});

Cypress.Commands.add("devoPermanecerNoFormulario", () => {
  cy.get(BTN_SUBMIT_CADASTRO).should("be.visible");
});

Cypress.Commands.add("gerarDados300CaracteresFaker", () => {
  const dadosUsuario300 = {
    firstName: faker.lorem.words(50).substring(0, 300),
    lastName: faker.lorem.words(50).substring(0, 300),
    email: `${faker.lorem.words(30).replace(/\s/g, "")}@${faker.lorem
      .words(20)
      .replace(/\s/g, "")}.com`.substring(0, 300),
    age: faker.lorem.words(50).substring(0, 300),
    salary: faker.lorem.words(50).substring(0, 300),
    department: faker.lorem.words(50).substring(0, 300),
  };
  Cypress.env("dados300CaracteresFaker", dadosUsuario300);

  cy.log("Dados de 300 caracteres gerados pelo Faker:");
  cy.log(`Nome: ${dadosUsuario300.firstName.length} caracteres`, {
    log: false,
  });
  cy.log(`Sobrenome: ${dadosUsuario300.lastName.length} caracteres`, {
    log: false,
  });
  cy.log(`Email: ${dadosUsuario300.email.length} caracteres`, { log: false });
  cy.log(`Age: ${dadosUsuario300.age.length} caracteres`, { log: false });
  cy.log(`Salary: ${dadosUsuario300.salary.length} caracteres`, { log: false });
  cy.log(`Department: ${dadosUsuario300.department.length} caracteres`, {
    log: false,
  });
  return cy.wrap(dadosUsuario300);
});

Cypress.Commands.add("preencherFormularioCom300Caracteres", () => {
  const dadosSalvos = Cypress.env("dados300CaracteresFaker");
  if (!dadosSalvos) {
    throw new Error("Dados de 300 caracteres não foram gerados!");
  }

  cy.get(BTN_ADD_FIRST_NAME, { timeout: 10000 }).should("be.visible");
  cy.get(BTN_ADD_FIRST_NAME)
    .should("be.visible")
    .clear()
    .type(dadosSalvos.firstName, { delay: 10, log: false });
  cy.get(BTN_ADD_LAST_NAME)
    .should("be.visible")
    .clear()
    .type(dadosSalvos.lastName, { delay: 10, log: false });
  cy.get(BTN_ADD_EMAIL)
    .should("be.visible")
    .clear()
    .type(dadosSalvos.email, { delay: 10, log: false });
  cy.get(BTN_ADD_AGE)
    .should("be.visible")
    .clear()
    .type(dadosSalvos.age, { delay: 10, log: false });
  cy.get(BTN_ADD_SALARY)
    .should("be.visible")
    .clear()
    .type(dadosSalvos.salary, { delay: 10, log: false });
  cy.get(BTN_ADD_DEPARTMENT)
    .should("be.visible")
    .clear()
    .type(dadosSalvos.department, { delay: 10, log: false });
  cy.log(`Formulário preenchido com textos de 300 caracteres`, { log: false });
});

Cypress.Commands.add("validarCampos300Caracteres", () => {
  cy.get(".modal-content").should("be.visible");
  cy.get(MODAL_BODY).should("be.visible");
  cy.get(MODAL_BODY).within(() => {
    cy.get("#firstName")
      .should("have.css", "border-color")
      .and("not.include", "rgb(220, 53, 69)");

    cy.get("#lastName")
      .should("have.css", "border-color")
      .and("not.include", "rgb(220, 53, 69)");

    cy.get("#department")
      .should("have.css", "border-color")
      .and("not.include", "rgb(220, 53, 69)");

    cy.get("#userEmail")
      .should("have.css", "border-color")
      .and("include", "rgb(220, 53, 69)");
    cy.get("#age")
      .should("have.css", "border-color")
      .and("include", "rgb(220, 53, 69)");
    cy.get("#salary")
      .should("have.css", "border-color")
      .and("include", "rgb(220, 53, 69)");
  });
  cy.log("Validação 300 caracteres: firstName, lastName, department OK");
  cy.log("Validação 300 caracteres: email, age, salary com erro");
  cy.screenshot("validacao_300_caracteres");
});

Cypress.Commands.add("gerarDadosInjecaoSQL", () => {
  const dadosInjecaoSQL = {
    firstName: "'; DROP TABLE users; --",
    lastName: "' OR '1'='1",
    email: "admin'--@email.com",
    age: "'; DELETE FROM customers; --",
    salary: "' UNION SELECT * FROM passwords --",
    department: "'; INSERT INTO admin VALUES('hacker'); --",
  };
  Cypress.env("dadosInjecaoSQL", dadosInjecaoSQL);
  cy.log("Dados de injeção SQL gerados:");
  cy.log(`Nome: ${dadosInjecaoSQL.firstName}`, { log: false });
  cy.log(`Sobrenome: ${dadosInjecaoSQL.lastName}`, { log: false });
  cy.log(`Email: ${dadosInjecaoSQL.email}`, { log: false });
  cy.log(`Age: ${dadosInjecaoSQL.age}`, { log: false });
  cy.log(`Salary: ${dadosInjecaoSQL.salary}`, { log: false });
  cy.log(`Department: ${dadosInjecaoSQL.department}`, { log: false });
  return cy.wrap(dadosInjecaoSQL);
});

Cypress.Commands.add("preencherFormularioComInjecaoSQL", () => {
  const dadosSalvos = Cypress.env("dadosInjecaoSQL");
  if (!dadosSalvos) {
    throw new Error("❌ Dados de injeção SQL não foram gerados!");
  }
  cy.get(BTN_ADD_FIRST_NAME, { timeout: 10000 }).should("be.visible");
  cy.get(BTN_ADD_FIRST_NAME)
    .should("be.visible")
    .clear()
    .type(dadosSalvos.firstName, { delay: 50, log: false });
  cy.get(BTN_ADD_LAST_NAME)
    .should("be.visible")
    .clear()
    .type(dadosSalvos.lastName, { delay: 50, log: false });
  cy.get(BTN_ADD_EMAIL)
    .should("be.visible")
    .clear()
    .type(dadosSalvos.email, { delay: 50, log: false });
  cy.get(BTN_ADD_AGE)
    .should("be.visible")
    .clear()
    .type(dadosSalvos.age, { delay: 50, log: false });
  cy.get(BTN_ADD_SALARY)
    .should("be.visible")
    .clear()
    .type(dadosSalvos.salary, { delay: 50, log: false });
  cy.get(BTN_ADD_DEPARTMENT)
    .should("be.visible")
    .clear()
    .type(dadosSalvos.department, { delay: 50, log: false });
  cy.log(`💀 Formulário preenchido com códigos SQL maliciosos`, { log: false });
});

Cypress.Commands.add("validarRejeicaoInjecaoSQL", () => {
  cy.get(".modal-content").should("be.visible");
  cy.get("#firstName").should("not.have.value", "");
  cy.get("#lastName").should("not.have.value", "");
  cy.get("#userEmail").should("not.have.value", "");
  cy.get("#department").should("not.have.value", "");
  cy.log("Sistema aceita códigos SQL - possível vulnerabilidade detectada");
  cy.screenshot("vulnerabilidade_detectada");
});
