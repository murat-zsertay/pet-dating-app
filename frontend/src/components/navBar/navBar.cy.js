import React from "react";
import {BrowserRouter as Router} from 'react-router-dom';
import NavBar from "./navBar";

describe("NavBar component", () => {
    it("displays correct links when there is a token", () => {

        cy.mount(
            <Router>
                <NavBar/>
            </Router>
        );

        window.localStorage.setItem("token", "fakeToken")

        cy.get('.site-title').should('have.text', '🐶 PAWTY TIME 🐱')
        cy.get('li > #login-navbar').should('not.exist');
        cy.get('li > #signup-navbar').should('not.exist');
        cy.get('li > #findpets-navbar').should('exist');
        cy.get('li > #profile-navbar').should('exist');
        cy.get('#logout-navbar').should('exist');
    })

    it("displays correct links when there is no token", () => {
        window.localStorage.removeItem("token");

        cy.mount(
            <Router>
                <NavBar/>
            </Router>
        );

        cy.get('li > #login-navbar').should('exist');
        cy.get('li > #signup-navbar').should('exist');
        cy.get('li > #findpets-navbar').should('not.exist');
        cy.get('li > #profile-navbar').should('not.exist');
        cy.get('li > #logout-navbar').should('not.exist');
    })
});

