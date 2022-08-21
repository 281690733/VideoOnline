import React, { Component } from 'react'
import {BrowserRouter,Link,Route,Switch} from 'react-router-dom'
import Login from './pages/LoginPage'
type Props = {}

type State = {}

export default class App extends Component<Props, State> {
  state = {}

  render() {
    return (
        <BrowserRouter>
          <Link to='/login'>登录</Link>
          <Switch>  {/*只匹配其中一个 */}
            <Route path='/login' component={Login}></Route>
            <Route path='/' component={Login}></Route>
          </Switch>
        </BrowserRouter>
    )
  }
}
