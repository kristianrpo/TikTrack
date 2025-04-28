describe('Influencer detail page', () => {
  const api        = Cypress.env('API_BASE')
  let influencer: any

  beforeEach(() => {
    cy.fixture('influencers.json').then((influencers) => {
      influencer = influencers[0]

      cy.intercept('GET', `${api}/api/backend/influencer/${influencer.username}`, influencer).as('getInfluencer')
    })
  })

  it('shows the influencer detail card with all metrics and info', function () {
    cy.visit(`${api}/en/influencers/${influencer.username}`)

    cy.contains('a', influencer.profile_name).should('be.visible')
    cy.contains('a', `@${influencer.username}`).should('be.visible')
    cy.contains('p', `${influencer.city} | ${influencer.followers.toLocaleString()} followers`).should('be.visible')
    cy.get(`img`).should('be.visible')
    cy.get(`a[href="${influencer.profile_url}"]`).should('be.visible')

    const metrics = [
      { label: 'Likes', value: influencer.average_likes },
      { label: 'Comments', value: influencer.average_comments },
      { label: 'Shares', value: influencer.average_shares },
      { label: 'Saves', value: influencer.average_saves },
      { label: 'Views', value: influencer.average_views },
    ];

    metrics.forEach(({ label, value }) => {
      cy.contains('h2', label)
        .parent()
        .find('p.text-darkGrey', value)
        .should('exist');
    });

    cy.contains('h3', 'Videos').should('be.visible');

    cy.get('.grid.place-items-center').should('exist');

    cy.get('.grid.place-items-center > div').should('have.length', influencer.featured_videos.length);
  })
})