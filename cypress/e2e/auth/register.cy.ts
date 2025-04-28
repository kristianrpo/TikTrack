describe('Register page', () => {
  const api = Cypress.env('API_BASE')
 
  beforeEach(() => {
    cy.intercept('POST', `${api}/api/backend/auth/register*`)
  })
  
  it('should handle registration form submission and validation', () => {
    cy.visit('/en/sign-up')
    cy.contains('Sign Up').should('be.visible')

    cy.get('form').should('be.visible')
    cy.get('input[name="username"]').should('be.visible')
    cy.get('input[name="email"]').should('be.visible')
    cy.get('input[name="password"]').should('be.visible')
    cy.get('button[type="submit"]').should('be.visible')

    cy.fixture('users').then((users) => {
      const previousEmail = users.login.email;
      const baseEmail = users.register.email;
      const password = users.register.password;
      const username = users.register.username;
    
      const randomDigits = Math.floor(100 + Math.random() * 900);
      const email = baseEmail.replace('replace', randomDigits);
    
      cy.get('input[name="username"]').clear().type(username)
      cy.get('input[name="email"]').clear().type(previousEmail)
      cy.get('input[name="password"]').clear().type(password)
      cy.get('button[type="submit"]').click()
      cy.get('.mb-4').should('contain', 'Email already exists')

      cy.get('input[name="username"]').clear().type(username)
      cy.get('input[name="email"]').clear().type(email)
      cy.get('input[name="password"]').clear().type(password)
      cy.get('button[type="submit"]').click()
    })
    cy.url().should('include', '/')
  })

  it('should check login link', () => {
    cy.visit('/en/sign-up')
    cy.get('a[href="/en/sign-in"]').should('be.visible').and('contain', 'Log In')
  })
})