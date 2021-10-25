import { BrowserRouter, Switch, Route } from 'react-router-dom';
import { AppProvider } from './components/context/AppContext';

import Auth from './components/Auth';
import Canva from './components/Main/Canva';

function App() {
  return (
    <BrowserRouter>
      <AppProvider>
        <Switch>
          <Route exact path="/" component={Auth} />
          <Route exact path="/main" component={Canva} />
        </Switch>
      </AppProvider>   
    </BrowserRouter>
  );
}

export default App;
