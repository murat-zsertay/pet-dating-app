import NavBar from './navBar'

describe("NavBar", () => {
    it("Directs to Find pets page", () => {
        cy.mount(<NavBar />)
        const token = true;

        const pages = ['signup', 'petPages', 'contact']

        cy.visit('/')

        pages.forEach(page => {

            cy
            .contains(page)
            .then((link) => {
                cy.request(link.prop('href'))
            })

        }) 
  })

  it("Directs to login page", () => {
    cy.mount(<SignUpForm navigate={navigate}/>)

    cy.intercept('POST', '/users', { message: "OK" }).as("signUpRequest")

    cy.get("#first-name").type("barry");
    cy.get("#last-name").type("chuckles");
    cy.get("#email").type("someone@example.com");
    cy.get("#password").type("password");
    cy.get("#confirm-password").type("password");
    cy.get("#submit").click();
    cy.wait('@signUpRequest').then( interception => {
      expect(interception.response.body.message).to.eq("OK")
    })
  })

  it("Directs to sign up page", () => {
    cy.mount(<SignUpForm navigate={navigate}/>)

    cy.intercept('POST', '/users', { message: "OK" }).as("signUpRequest")

    cy.get("#first-name").type("barry");
    cy.get("#last-name").type("chuckles");
    cy.get("#email").type("someone@example.com");
    cy.get("#password").type("password");
    cy.get("#confirm-password").type("password");
    cy.get("#submit").click();
    cy.wait('@signUpRequest').then( interception => {
      expect(interception.response.body.message).to.eq("OK")
    })
  })
})