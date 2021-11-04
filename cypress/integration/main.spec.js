import faker from 'faker';

describe("Main page functionalities", () => {

    it("Clicking in all buttons", () => {
        cy.viewport(375, 700)

        cy.login("yo@yo.com", "123")

        cy.get("header > div > svg").click()
        cy.wait(300)
        cy.get("header > div > svg").click()
        cy.wait(300)
        cy.get("header > div > svg").click()
        cy.wait(300)
        cy.get("header > div > svg").click()
        cy.wait(300)

        cy.get("div.sc-crHmcD.idfviK").click()
        cy.wait(500)
        cy.get("div.sc-crHmcD.idfviK").click()
        cy.wait(500)
        cy.get("div.sc-crHmcD.idfviK").click()
        cy.wait(500)
        cy.get("div.sc-crHmcD.idfviK").click()
        cy.wait(500)

        cy.contains("New Credit").click()
        cy.wait(800)
        cy.get("input[placeholder=Value]").type("3200.42")
        cy.get("input[placeholder=Description]").type("Salário")
        cy.wait(500)
        cy.contains("Save").click()
        cy.wait(1000)

        cy.get("div.sc-jrQzAO.chgNIP")

        cy.contains("New Debit").click()
        cy.wait(800)
        cy.get("input[placeholder=Value]").type("220")
        cy.get("input[placeholder=Description]").type("Almoço")
        cy.wait(800)
        cy.contains("Save").click()
        cy.wait(1500)

        cy.resetEntries()
        cy.logout()
    })
})