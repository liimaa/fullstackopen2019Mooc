import React from 'react'
import { render, fireEvent } from '@testing-library/react'
import SimpleBlog from './SimpleBlog'

describe('<SimpleBlog />', () => {
  test('renders content title, author, likes', () => {
    const blog = {
      title: 'Warlock of magus world',
      author: 'The plagiarist',
      likes: 7777
    }

    const component = render(
      <SimpleBlog blog={blog} />
    )

    const div_blog = component.container.querySelector('.blog-item')
    expect(div_blog).toHaveTextContent(
      'Warlock of magus world'
    )
    expect(div_blog).toHaveTextContent(
      'The plagiarist'
    )
    expect(div_blog).toHaveTextContent(
      7777
    )
  })

  test('click like twice', () => {

    const blog = {
      title: 'Warlock of magus world',
      author: 'The plagiarist',
      likes: 7777
    }

    const mockHandler = jest.fn()

    const { getByText } = render(
      <SimpleBlog blog={blog} onClick={mockHandler} />
    )

    const button = getByText('like')
    fireEvent.click(button)
    fireEvent.click(button)

    expect(mockHandler.mock.calls.length).toBe(2)

  })
})