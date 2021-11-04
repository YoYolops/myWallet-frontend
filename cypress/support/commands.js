// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
// Cypress.Commands.add('login', (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add('drag', { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add('dismiss', { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite('visit', (originalFn, url, options) => { ... })


Cypress.Commands.add("login", (email, password) => {
    cy.visit("http://localhost:3000")
    cy.wait(700)
    cy.get("button.toggler").click()
    cy.wait(600)

    cy.get("input[placeholder=E-mail]").type(email)
    cy.get("input[placeholder=Password]").type(password)
    cy.wait(600)
    cy.get("button.signer").click()
    cy.wait(600)
})

Cypress.Commands.add("resetEntries", () => {
    const storagedData = localStorage.getItem("mywallet");
    const token = (JSON.parse(storagedData)).token
    let entries;

    cy.request({
        method: "GET",
        url: "http://localhost:4000/entries",
        headers: {
            Authorization: `Bearer ${token}`
        }
    }).then((resp) => { 
        entries = resp.body 

        entries.forEach(element => {
            cy.request({
                method: "DELETE",
                url: `http://localhost:4000/entries/${element.id}`,
                headers: {
                    Authorization: `Bearer ${token}`
                }
            })
        });
    })

})

Cypress.Commands.add("logout", () => {
    cy.get("header > div > svg").click()
    cy.wait(800)
    cy.contains("Exit").click()
})