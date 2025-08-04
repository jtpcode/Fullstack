import { useState } from 'react'

const Blog = ({ blog, addLike, user, removeBlog }) => {
  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5
  }

  const [detailsVisible, setDetailsVisible] = useState(false)
  const detailsHidden = { display: detailsVisible ? 'none' : '' }
  const detailsShown = { display: detailsVisible ? '' : 'none' }
  const usersBlog = user.id === blog.user.id || user.id === blog.user
  const deleteShown = { display: usersBlog ? '' : 'none' }

  const likeBlog = () => {
    addLike({ ...blog, likes: blog.likes + 1 })
  }

  const deleteBlog = () => {
    const ok = window.confirm(`Delete blog '${blog.title}'?`)
    if (ok) {
      removeBlog(blog)
    }
  }

  return (
    <div>
      <div style={{ ...blogStyle }}>
        {blog.title}
        <div style={detailsHidden} className="title">
          <button onClick={() => setDetailsVisible(true)}>View</button>
        </div>
        <div style={detailsShown} className="details">
          <div>{blog.url}</div>
          <div>{blog.likes} likes</div>
          <div>{blog.author}</div>
          <button onClick={() => setDetailsVisible(false)}>Hide</button>{' '}
          <button onClick={likeBlog}>Like</button>
          <button style={deleteShown} onClick={deleteBlog}>
            Delete
          </button>
        </div>
      </div>
    </div>
  )
}

export default Blog
