import React from 'react'
import { Link } from 'react-router-dom'

const PageTwo = () => {
  return (
    <div>
      <h1>
      WELCOME TO.. THE SECOND VIEW!!
      </h1>
      <br />
      <Link className="link" to="/">HOME</Link>
    </div>
  )
}

export default PageTwo