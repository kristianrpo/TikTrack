describe('Messages page', () => {
  const api = Cypress.env('API_BASE')
  let username: string

  beforeEach(() => {
    cy.fixture('influencers.json').then((influencers) => {
      username = influencers[0].username
    })
    cy.intercept('GET', `${api}/api/backend/messages/index`, { fixture: 'messages.json' })
  })
  
  it('should display messages', () => {
    cy.visit(`/en/messages/${username}`)
    cy.contains('Messaging Templates').should('be.visible')

    cy.get('div.min-w-\\[300px\\]').then($cards => {
      if ($cards.length < 3) {
        cy.get('input[placeholder="Create a message template..."]').should('be.visible')
        cy.get('button[type="submit"]').should('be.visible')
      } else {
        cy.get('input[placeholder="Create a message template..."]').should('not.exist')
        cy.get('button[type="submit"]').should('not.exist')
      }
    })
  })
}) 