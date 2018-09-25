import React from 'react'
import { Route } from 'react-router-dom'

const Refresh = ({ path = '/' }) => (
    <Route
      path={path}
      component={({ history, location, match }) => {
        history.replace({
          ...location,
        pathname:location.pathname.substring(match.path.length)
      })
        return null
      }}
    />
  )

  export default Refresh