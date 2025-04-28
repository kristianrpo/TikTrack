describe('Influencers index page', () => {

	const api = Cypress.env('API_BASE')
 
  beforeEach(() => {
    cy.intercept('GET', `${api}/api/backend/influencer/index*`, { fixture: 'influencers.json' })
  })
  
  it('lists influencer cards', () => {
    cy.visit('/en/influencers')
    cy.contains('Top Influencers').should('be.visible')

    cy.get('.w-80.bg-white.border.shadow-sm').first().within(() => {
      cy.get('img.w-24.h-24.mt-3.rounded-full').should('be.visible')
      cy.get('h5.text-xl.text-white').should('be.visible')
      cy.get('.text-lightPurple').should('be.visible')
      cy.get('.bg-black.p-2').first().should('be.visible')
      cy.get('.bg-black.p-2').last().should('be.visible')
      cy.get('.text-sm.text-slate-600').should('be.visible')
    })
  })

  it('compares influencers', () => {
    cy.visit('/en/influencers')
    cy.contains('Top Influencers').should('be.visible')

    cy.get('button').contains('Compare Influencers').click()

    cy.get('.w-80.bg-white.border.shadow-sm').first()
      .find('button.absolute.top-2.left-2.rounded-full.w-6.h-6.border.border-gray-300')
      .click()

    cy.get('.w-80.bg-white.border.shadow-sm').first().within(() => {
      cy.get('button.absolute.top-2.left-2.rounded-full.w-6.h-6.border.border-gray-300')
        .should('have.class', 'bg-purple')
        .and('have.class', 'text-white')
    })

    cy.get('.w-80.bg-white.border.shadow-sm').eq(1)
      .find('button.absolute.top-2.left-2.rounded-full.w-6.h-6.border.border-gray-300')
      .click()

    cy.get('.w-80.bg-white.border.shadow-sm').eq(1).within(() => {
      cy.get('button.absolute.top-2.left-2.rounded-full.w-6.h-6.border.border-gray-300')
        .should('have.class', 'bg-purple')
        .and('have.class', 'text-white')
    })

    cy.get('button').contains('Compare').click()

    cy.get('.fixed.inset-0.bg-black.bg-opacity-50').should('be.visible')
    
    cy.get('.bg-white.rounded-lg.shadow-xl').within(() => {
      cy.contains('Influencer Comparison').should('be.visible')
      cy.get('table').should('be.visible')
      cy.get('thead tr th').should('have.length', 3)
      cy.get('tbody tr').should('have.length.at.least', 8)
      
      cy.get('button.text-gray-500').click()
    })

    cy.get('.fixed.inset-0.bg-black.bg-opacity-50').should('not.exist')

    cy.get('button').contains('Cancel').click()

    cy.get('button').contains('Compare Influencers').should('be.visible')
    
    cy.get('.w-80.bg-white.border.shadow-sm').first().within(() => {
      cy.get('button.absolute.top-2.left-2.rounded-full.w-6.h-6.border.border-gray-300').should('not.exist')
    })
  })
})