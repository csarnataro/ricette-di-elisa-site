import React from 'react'
import { HashRouter, Switch, Route } from 'react-router-dom'
import RecipesPage from './components/pages/RecipesPage'
import RecipePage from './components/pages/RecipePage'
import './style/style.css'

function App () {
  return (
    <>
    <HashRouter>
      <Switch>
        <Route path={'/ricetta/:slug'}>
          <RecipePage />
        </Route>
        <Route path={'/'}>
          <RecipesPage />
        </Route>
      </Switch>
    </HashRouter>
    </>
  )
}

export default App
