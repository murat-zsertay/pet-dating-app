import Pet from './Pet.js'

describe("Pet", () => {
  it('renders a pet with the pets details', () => {
    const petData = {_id: 1, name: 'Henry the hound', weight: 12, age: 6, description: 'I like long walks with friends and eating my owners food.', gender: 'Male'}
    cy.mount(<Pet pet={petData} />);
    cy.get('[data-cy="pet-description"]').should('contain.text', "I like long walks with friends and eating my owners food.");
    cy.get('[data-cy="pet-name"]').should('contain.text', "Henry the hound")
    cy.get('[data-cy="pet-weight"]').should('contain', 12)
    cy.get('[data-cy="pet-age"]').should('contain', 6);
    cy.get('[data-cy="pet-gender"]').should('contain.text', "Male");
  })
})