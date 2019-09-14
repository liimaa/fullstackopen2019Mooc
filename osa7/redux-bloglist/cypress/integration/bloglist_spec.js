describe('Bloglist ', () => {

  beforeEach(() => {
    cy.request('POST', 'http://localhost:3001/api/testing/reset')
    const user = {
      name: 'Testaaja Tenttinen',
      username: 'Testaaja',
      password: 'testaaja123'
    }
    cy.request('POST', 'http://localhost:3001/api/users/', user)
    cy.visit('http://localhost:3000')
  })

  it('front page can be opened', () => {
    cy.contains('Login please')
  })

  it('user can login', () => {
    cy.get('[data-cy=username]').type('Testaaja')
    cy.get('[data-cy=password]').type('testaaja123')
    cy.get('[data-cy=login]').click()
    cy.contains('h2', 'Create new')
  })

  describe('when logged in', () => {

    beforeEach(() => {
      cy.get('[data-cy=username]').type('Testaaja')
      cy.get('[data-cy=password]').type('testaaja123')
      cy.get('[data-cy=login]').click()
    })

    it('user can open Users tab', () => {
      cy.get('[data-cy=users]').click()
    })

    it('user can logout', () => {
      cy.get('[data-cy=logout]').click()
    })

    it('user can create new blog', () => {
      cy.contains('new blog').click()
      cy.get('[data-cy=title]').type('testing 101')
      cy.get('[data-cy=author]').type('Tester dude')
      cy.get('[data-cy=url]').type('https://www.example.com/')
      cy.get('[data-cy=post]').click()
    })

    describe('when blog is created', () => {

      beforeEach(() => {
        cy.contains('new blog').click()
        cy.get('[data-cy=title]').type('Cypress 101')
        cy.get('[data-cy=author]').type('Cype Ress')
        cy.get('[data-cy=url]').type('https://www.cypress.io/')
        cy.get('[data-cy=post]').click()
        cy.contains('a', 'Cypress 101').click()
      })

      it('user can like blog', () => {
        cy.get('[data-cy=likes]').should('have.text', 'likes 0')
        cy.get('[data-cy=like]').click()
        cy.get('[data-cy=likes]').should('have.text', 'likes 1')
      })

      it('user can create comment', () => {
        cy.get('[data-cy=comment]').type('I love this book!')
        cy.get('[data-cy="add comment"]').click()
        cy.contains('I love this book!')
      })

    })

  })

})