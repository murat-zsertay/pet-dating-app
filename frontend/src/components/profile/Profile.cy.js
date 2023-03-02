import React from 'react';
import Profile from './Profile'
import {getUserInfoById} from "../../api/user.js";

describe("Profile Page", () => {
    const user = {
      firstName: "John",
      lastName: "Doe",
      email: "john.doe@example.com",
      postcode: "12345",
      pets: [
        {
          name: "Fluffy",
          weight: "10 lbs",
          age: "3 years",
          description: "A fluffy cat",
          gender: "Female",
        },
      ],
    };
  
    xit("should display user and pet info", () => {
      cy.stub(window.localStorage, "getItem").returns("token");
      cy.stub(window.localStorage, "setItem");
      cy.stub(window.localStorage, "removeItem");
  
      cy.intercept("GET", "**/users/*", {
        statusCode: 200,
        body: user,
      }).as("getUser");
  
      cy.mount(<Profile data-cy="profile" data-testid="profile"/>);

      cy.wait("@getUser");

      cy.log('User info:', user)

      cy.get('[data-cy="profile"]').should("exist");
  
      cy.wait("@getUser").then(() => {
        cy.get('[data-cy="user-info"]').should("contain", user.firstName);
        cy.get('[data-cy="user-info"]').should("contain", user.lastName);
        cy.get('[data-cy="user-info"]').should("contain", user.email);
        cy.get('[data-cy="user-info"]').should("contain", user.postcode);
  
        cy.get('[data-cy="pet-info"]').should("contain", user.pets[0].name);
        cy.get('[data-cy="pet-info"]').should("contain", user.pets[0].weight);
        cy.get('[data-cy="pet-info"]').should("contain", user.pets[0].age);
        cy.get('[data-cy="pet-info"]').should("contain", user.pets[0].description);
        cy.get('[data-cy="pet-info"]').should("contain", user.pets[0].gender);
      });
    });
  });
  