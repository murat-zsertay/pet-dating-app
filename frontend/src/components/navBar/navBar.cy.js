import React from "react";
// import { mount } from "cypress-react-unit-test";
import { BrowserRouter as Router } from 'react-router-dom';
import NavBar from "./navBar";
// import SignUpForm from '../user/SignUpForm'
// import LoginForm from '../auth/LoginForm'
// const navigate = () => {}

// Cypress.Commands.add('signup', () => { 
//   cy.mount(<SignUpForm navigate={navigate}/>)

//   cy.intercept('POST', '/users', { message: "OK" }).as("signUpRequest")

//   cy.get("#first-name").type("barry");
//   cy.get("#last-name").type("chuckles");
//   cy.get("#email").type("someone@example.com");
//   cy.get("#password").type("password");
//   cy.get("#confirm-password").type("password");
//   cy.get("#submit").click();
// })

// Cypress.Commands.add('login', () => {
//   cy.mount(<LoginForm navigate={navigate}/>)

//   cy.intercept('POST', '/tokens', { token: "fakeToken" }).as("loginRequest")

//   cy.get("#email").type("someone@example.com");
//   cy.get("#password").type("password");
//   cy.get("#submit").click();
// })

// beforeEach(() => {
//   cy.signup()
//   cy.login()
// })

describe("NavBar component", () => {
  it("displays correct links when there is a token", () => {
    

    cy.mount(
      <Router>
        <NavBar />
      </Router>
    );

    window.localStorage.setItem("token", "fakeToken")

    // cy.wait(3000);

    cy.get('.site-title').should('have.text', 'Pawty Time')
    // cy.get('#login-navbar').should('exist');
    // cy.get('#signup-navbar').should('exist');
    cy.get('li .active').should('exist')
    // cy.get('#logout-navbar').should('exist');
  })

  // it("displays correct links when there is no token", () => {
  //   window.localStorage.removeItem("token");

  //   cy.mount(
  //     <Router>
  //       <NavBar />
  //     </Router>
  //   );

  //   cy.get('#login-navbar').should('exist');
  //   cy.get('#signup-navbar').should('exist');
  //   cy.get("#findpets-navbar").should("not.exist");
  //   cy.get("#logout-navbar").should("not.exist");
  //   })
  });