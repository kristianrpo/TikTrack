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
    cy.visit(`${api}/en/messages/${username}`)
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

  it('should handle message interactions', () => {
    cy.visit(`${api}/en/messages/${username}`)
    cy.contains('Messaging Templates').should('be.visible')

    cy.get('div.min-w-\\[300px\\]').first().within(() => {
      cy.get('button[aria-label="Edit"]').should('be.visible').click() 
      cy.get('button[type="submit"]').should('be.visible')
      cy.get('button[type="button"]').should('be.visible')
      cy.get('button[aria-label="Cancel"]').should('be.visible').click()
    })

    cy.get('div.min-w-\\[300px\\]').first().within(() => {
      cy.contains('Customize').click()
      cy.get('p').invoke('text').then((txt) => txt.trim()).as('selectedMessage')
    })

    cy.contains('h2', 'AI Suggestions').should('be.visible')

    cy.get('@selectedMessage').then((msg: any) => {
      cy.get('textarea').should('have.value', msg)
    })

    cy.get('button').contains('Send Message').should('be.visible')
    cy.get('button').contains('Enhance message with AI').should('be.visible').click()
    cy.get('button').contains('Cancel').should('be.visible')
    cy.get('button').contains('Accept').should('be.visible').click()
  })
}) 