import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { Link } from 'react-router-dom'
import { postDeleted } from './postsSlice'
import PostAuthor from './PostAuthor'
import TimeAgo from './TimeAgo'
import ReactionButtons from './ReactionButtons'

const PostsList = () => {
  const posts = useSelector((state) => state.posts)
  const users = useSelector((state) => state.users)
  const dispatch = useDispatch()

  const deletePost = (id) => {
    console.log(id)
    dispatch(postDeleted({ id: id }))
  }

  const orderedPosts = posts
    .slice()
    .sort((a, b) => b.date.localeCompare(a.date))

  const renderedPosts = orderedPosts.map((post) => (
    <article className="post-excerpt" key={post.id}>
      <h3>{post.title}</h3>
      <p className="post-content">{post.content.substring(0, 100)}</p>
      <div>
        <PostAuthor userId={post.user} />
        <TimeAgo timestamp={post.date} />
        <ReactionButtons post={post} />
      </div>

      <Link to={`/posts/${post.id}`} className="button muted-button">
        View Post
      </Link>
      <button onClick={() => deletePost(post.id)} style={{ marginLeft: '5px' }}>
        Delete Post
      </button>
    </article>
  ))

  if (posts.length === 0) {
    return (
      <section className="posts-list">
        <h2>No Posts Yet!</h2>
      </section>
    )
  }

  return (
    <section className="posts-list">
      <h2>Posts</h2>
      {renderedPosts}
    </section>
  )
}

export default PostsList
