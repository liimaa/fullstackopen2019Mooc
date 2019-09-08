import React from 'react'
import { render, fireEvent } from '@testing-library/react'
import Blog from './Blog'

describe('<Blog />', () => {
  test('Tests rich view on clicking blog-item,', () => {

    const user = {
      name: 'Es',
      token: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6ImVzIiwiaWQiOiI1ZDQ2ZTQ3YmE2OTBhMDI5ODQ0NzI0NTQiLCJpYXQiOjE1NjUzNTI0NTZ9.UUVafbmZYqMnl36HJjAtDOL0KCnVoxtrg9_j8GcL-J8',
      username: 'es'
    }

    const blog = {
      user: {
        username: 'Eemeli',
        name: 'Es',
        id: '5d444d2d93bd2a34183dced1'
      },
      title: 'Hieno maailma',
      author: 'Le fui',
      url: 'https://example.com',
      likes: 8,
      id: '5d46ca00a690a0298447244f'
    }

    const component = render(
      <Blog {...blog} currentUser={user} />
    )

    const div_blog = component.container.querySelector('.blog-item')

    //Test default title & author
    expect(div_blog).toHaveTextContent(
      'Hieno maailma',
      'Le fui'
    )

    const click = fireEvent.click(div_blog)
    expect(click).toBe(true)

    //extra content
    expect(div_blog).toHaveTextContent(
      'https://example.com',
      8,
    )

  })
})