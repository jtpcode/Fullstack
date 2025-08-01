import { render, screen } from '@testing-library/react'
import BlogForm from './BlogForm'
import userEvent from '@testing-library/user-event'

test('<BlogForm /> calls onSubmit with correct input', async () => {
  const user = userEvent.setup()
  const addBlog = vi.fn()

  render(<BlogForm addBlog={addBlog} />)

  const sendButton = screen.getByText('Create')
  const inputTitle = screen.getByPlaceholderText('Blog title...')
  const inputAuthor = screen.getByPlaceholderText('Blog author...')
  const inputUrl = screen.getByPlaceholderText('Blog url...')

  await user.type(inputTitle, 'Title')
  await user.type(inputAuthor, 'Author')
  await user.type(inputUrl, 'Url')
  await user.click(sendButton)

  expect(addBlog.mock.calls).toHaveLength(1)
  expect(addBlog.mock.calls[0][0].title).toBe('Title')
  expect(addBlog.mock.calls[0][0].author).toBe('Author')
  expect(addBlog.mock.calls[0][0].url).toBe('Url')
})
