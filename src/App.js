import React,{useState,useEffect,useCallback} from 'react';
import { BrowserRouter as Router, Route, Switch,useHistory,Redirect } from "react-router-dom";
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';

import HomePage from './components/homepage.component'
import SigupPage from './components/sigunp.component'
import SignIn from './components/signin.component'
import Dashboard from './components/dashboard.component'


function App() {

  const [user,setUser] = useCallback(useState(''));
  const [token,setToken] = useState('');
  
  return (
    <Router>
        <div className="App ">
          <header className="App-header">

              <Switch>
                  <Route exact path='/'>
                      <HomePage/>
                  </Route>

                  <Route path='/signup'>
                      <SigupPage/>
                  </Route>
                  <Route path='/signin'>
                      <SignIn setUser={setUser} setToken={setToken}/>
                  </Route>

                  <Route path={`/dashboard/${user}`}>
                        <Dashboard user={user} token={token} setUser={setUser} setToken={setToken}/>
                  </Route>

              </Switch>
          </header>
        </div>
    </Router>
  );
}

export default App;
