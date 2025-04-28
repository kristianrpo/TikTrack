describe('Login page', () => {
  const api = Cypress.env('API_BASE')

  beforeEach(() => {
    cy.intercept('POST', `${api}/api/backend/auth/login*`)
    cy.intercept('GET', `${api}/api/backend/auth/me*`)
  })

  it('should handle login form submission and validation', () => {
    cy.visit(`${api}/en/sign-in`)
    cy.contains('Sign In').should('be.visible')

    cy.get('form').should('be.visible')
    cy.get('input[type="email"][name="email"]').should('be.visible')
    cy.get('input[type="password"][name="password"]').should('be.visible')
    cy.get('button[type="submit"]').contains('Sign In').should('be.visible')

    cy.get('input[type="email"]').type('invalid@email.com')
    cy.get('input[type="password"]').type('wrongpassword')
    cy.get('button[type="submit"]').click()
    cy.get('.mb-4').should('contain', 'User does not exist')

    cy.fixture('users').then((users) => {
      const email = users.login.email
      const password = users.login.password

      cy.get('input[type="email"]').clear().type(email)
      cy.get('input[type="password"]').clear().type('wrongpassword')
      cy.get('button[type="submit"]').click()
      cy.get('.mb-4').should('contain', 'Incorrect password')

      cy.get('input[type="email"]').clear().type(email)
      cy.get('input[type="password"]').clear().type(password)
      cy.get('button[type="submit"]').click()
    })

    cy.url().should('include', '/')
  })

  it('should have a register link', () => {
    cy.visit(`${api}/en/sign-in`)
    cy.get('a[href="/en/sign-up"]').should('be.visible').and('contain', 'Register')
  })
})