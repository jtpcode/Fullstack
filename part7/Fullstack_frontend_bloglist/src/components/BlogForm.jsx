import { useState } from 'react'
import PropTypes from 'prop-types'

const BlogForm = ({ addBlog }) => {
  const [newBlog, setNewBlog] = useState({
    title: '',
    author: '',
    url: ''
  })

  const handleBlogChange = (event) => {
    const { name, value } = event.target
    setNewBlog({ ...newBlog, [name]: value })
  }

  const createBlog = (event) => {
    event.preventDefault()
    addBlog(newBlog)

    setNewBlog({
      title: '',
      author: '',
      url: ''
    })
  }

  return (
    <div>
      <form onSubmit={createBlog}>
        <div>
          Title:
          <input
            data-testid='title'
            type="text"
            value={newBlog.title}
            name="title"
            onChange={handleBlogChange}
            placeholder='Blog title...'
          />
        </div>
        <div>
          Author:
          <input
            data-testid='author'
            type="text"
            value={newBlog.author}
            name="author"
            onChange={handleBlogChange}
            placeholder='Blog author...'
          />
        </div>
        <div>
          Url:
          <input
            data-testid='url'
            type="text"
            value={newBlog.url}
            name="url"
            onChange={handleBlogChange}
            placeholder='Blog url...'
          />
        </div>
        <button type="submit">Create</button>
      </form>
    </div>
  )
}

BlogForm.propTypes = {
  addBlog: PropTypes.func.isRequired,
}

export default BlogForm
