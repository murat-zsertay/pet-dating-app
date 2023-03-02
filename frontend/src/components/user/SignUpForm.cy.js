import SignUpForm from './SignUpForm.js'
const navigate = () => {}

describe('Signing up', () => {
  it('calls the /users endpoint', () => {
    cy.mount(<SignUpForm navigate={navigate}/>)

    cy.intercept('POST', '/users', { message: 'OK' }).as('signUpRequest')

    cy.get('#first-name').type('barry')
    cy.get('#last-name').type('chuckles')
    cy.get('#email').type('someone@example.com')
    cy.get('#password').type('password')
    cy.get('#confirm-password').type('password')
    cy.get('#submit').click()
    cy.wait('@signUpRequest').then(interception => {
      expect(interception.response.body.message).to.eq('OK')
    })
  })
})
