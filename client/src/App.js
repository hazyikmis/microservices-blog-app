import React from 'react'
import PostCreate from './PostCreate'
import PostList from './PostList'

//export const App = () => {
export default () => {
  return (
    <div className='container'>
      <h1>Simple Blog App</h1>
      <PostCreate />
      <hr />
      <h1>Posts</h1>
      <PostList />
    </div>
  )
}
