import { Route, Switch } from 'react-router-dom'
import HomePage from '../pages/HomePage'

function PageContent() {
  return (
    <main className="flex w-full flex-1 flex-col">
      <Switch>
        <Route exact path="/">
          <HomePage />
        </Route>
      </Switch>
    </main>
  )
}

export default PageContent
