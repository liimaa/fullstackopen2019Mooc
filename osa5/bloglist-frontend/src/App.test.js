import React from 'react'
import { render, waitForElement } from '@testing-library/react'
import App from './App'
jest.mock('../src/services/blogs')

describe('<App />', () => {

  test('if user isn\'t logged in, blogs are not rendered', async () => {
    const component = render(
      <App />
    )
    component.rerender(<App />)

    await waitForElement(() => component.getByText('Login please'))

    const blogItem = component.container.querySelector('.blog-item')
    expect(blogItem).toBeNull()
  })

  test('Blogs render on Login', async () => {

    const user = {
      name: 'Es',
      token: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6ImVzIiwiaWQiOiI1ZDQ2ZTQ3YmE2OTBhMDI5ODQ0NzI0NTQiLCJpYXQiOjE1NjUzNTI0NTZ9.UUVafbmZYqMnl36HJjAtDOL0KCnVoxtrg9_j8GcL-J8',
      username: 'es'
    }

    localStorage.setItem('user', JSON.stringify(user))

    const component = render(<App />)
    component.rerender(<App />)

    await waitForElement(() => component.getByText(user.name + ' has logged in'))

    const blogs = component.container.querySelectorAll('.blog-item')
    expect(blogs.length).toBe(3)

    expect(component.container).toHaveTextContent(
      'Huono maailma',
      'Le fui'
    )

    expect(component.container).toHaveTextContent(
      'Sample text',
      'Sampler'
    )

    expect(component.container).toHaveTextContent(
      'haw',
      'haw'
    )
  })

})