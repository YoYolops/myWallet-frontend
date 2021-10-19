import { BrowserRouter, Switch, Route } from 'react-router-dom';

import Auth from './components/Auth';
import Canva from './components/Main/Canva';

function App() {
  return (
    <BrowserRouter>    
      <Switch>
        <Route exact path="/" component={Auth} />
        <Route exact path="/main" component={Canva} />
      </Switch>
    </BrowserRouter>
  );
}

export default App;
