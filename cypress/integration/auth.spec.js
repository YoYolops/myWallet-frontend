/// <reference types="cypress" />
import fakeUser from '../factory/fakeUser.js';

describe("Auth Page", () => {
    const fake = fakeUser();

    it("Should Register sucessfully", () => {
        cy.viewport(375, 700)

        cy.visit("http://localhost:3000/")
        cy.wait(800)

        //Verify existence of toggler
        cy.get("button.signer").should(btn => {
            expect(btn).to.contain("Sign up")
        })
        
        //toggle to login page
        cy.get("button.toggler").click()
        cy.wait(800)

        //verify existence of sign in toggler
        cy.get("button.signer").should(btn => {
            expect(btn).to.contain("Sign in")
        })

        //toggle to sign up page
        cy.get("button.toggler").click()

        //fill the register form
        cy.get("input[placeholder=Name").type(fake.username)
        cy.get("input[placeholder=E-mail").type(fake.email)
        cy.get("input[placeholder=Password").type(fake.password)
        cy.get("input[placeholder='Confirm password'").type(fake.password)

        cy.get("button.signer").click()
        cy.wait(800)
    })

    it("Should login sucessfully", () => {
        cy.viewport(375, 700)
        cy.visit("http://localhost:3000")
        cy.wait(500)

        //go to login page
        cy.get("button.toggler").click()
        cy.wait(500)

        //fill in the data
        cy.get("input[placeholder=E-mail").type(fake.email)
        cy.get("input[placeholder=Password").type(fake.password)

        //logs in
        cy.get("button.signer").click()
        cy.url().should("equal", "http://localhost:3000/main")
        cy.wait(1000)
    })

})