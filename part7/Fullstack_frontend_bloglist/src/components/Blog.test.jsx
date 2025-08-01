import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import Blog from './Blog'
import { beforeEach, describe } from 'vitest'

describe('Viewing blog', () => {
  let container

  beforeEach( () => {
    const blog = {
      _id: '5a422a851b54a676234d17f7',
      title: 'React patterns',
      author: 'Michael Chan',
      url: 'https://reactpatterns.com/',
      likes: 7,
      user: {
        username: 'tester',
        name: 'mr. tester',
        id: 'test_id'
      },
      __v: 0
    }
    const user = {
      username: 'tester',
      name: 'mr. tester',
      id: 'test_id'
    }

    container = render(<Blog blog={blog} user={user} />).container
  })

  test('renders content', async () => {
    const title = await screen.findByText('React patterns', )
    expect(title).toBeDefined()

    const div = container.querySelector('.details')
    expect(div).toHaveStyle('display: none')
  })

  test('after clicking the "View" button, details are displayed', async () => {
    const user = userEvent.setup()
    const button = screen.getByText('View')
    await user.click(button)

    const div = container.querySelector('.details')
    expect(div).not.toHaveStyle('display: none')
  })

  test('Clicking "View" followed by clickin "Hide", details are hidden', async () => {
    const user = userEvent.setup()

    const button = screen.getByText('View')
    await user.click(button)

    const closeButton = screen.getByText('Hide')
    await user.click(closeButton)

    const div = container.querySelector('.details')
    expect(div).toHaveStyle('display: none')
  })
})
