import NavBar from "./navBar";

describe("NavBar", () => {
  it("Directs to Find pets page", () => {
    cy.mount(<NavBar />);
    const token = true;

    const pages = ["signup", "petPages", "contact"];

    cy.visit("/");

    pages.forEach((page) => {
      cy.contains(page).then((link) => {
        cy.request(link.prop("href"));
      });
    });
  });

  it("Directs to login page", () => {
    
  });

  it("Directs to sign up page", () => {
    
  });
});
