import React from 'react'
import {withRouter, Route, Switch} from 'react-router-dom'
import Root from './components/Root'
import Doom from './components/Doom'

const Routes = () => {
  return (
    <div>
      <Switch>
        <Route exact path="/" component={Root} />
        <Route path="/doom" component={Doom} />
      </Switch>
    </div>
  )
}

export default withRouter(Routes)