import React from 'react'
import {withRouter, Route, Switch} from 'react-router-dom'
import Refresh from './Refresh'
import Root from './components/Root'
import PageTwo from './components/PageTwo'

const Routes = () => {
  return (
    <div>
      <Switch>
      <Route exact path="/" component={Root} />
      <Route path="/pagetwo" component={PageTwo} />
      <Refresh path="/refresh"/>
      </Switch>
    </div>
  )
}

export default withRouter(Routes)