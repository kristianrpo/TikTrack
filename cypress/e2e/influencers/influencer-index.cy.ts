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
})