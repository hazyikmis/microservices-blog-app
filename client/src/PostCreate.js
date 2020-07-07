import React from 'react'

//export const PostCreate = () => {
export default () => {
  return (
    <div>
      <form>
        <div className='form-group'>
          <label>Title</label>
          <input className='form-control' />
        </div>
        <button type='submit' className='btn btn-primary'>Submit</button>
      </form>
    </div>
  )
}
