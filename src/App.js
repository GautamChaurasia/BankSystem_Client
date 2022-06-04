import { Switch, Route, Redirect } from 'react-router-dom'
import { useState } from 'react';
import Home from './Home';
import Login from './Login';
import Logout from './Logout';
import NavBar from './NavBar';
import Register from './Register';
import Transaction from './Transaction'
import {Share} from './Share';

const App = () => {
  
  const [value, setvalue] = useState(null)
  const [shusr, setshusr] = useState(null)
  const [ulist, setulist] = useState(null)
  const [sel, setsel] = useState(null)

  return (  
    <>
      <Share.Provider value = {{value, setvalue, shusr, setshusr, ulist, setulist, sel, setsel}}>
        <NavBar />
        <div className="cen">
        <div>
        <Switch>
            <Route exact path='/' component={Home} />
            <Route exact path='/register' component={Register} />
            <Route exact path='/login' component={Login} />
            <Route exact path='/logout' component={Logout} />
            <Route exact path='/transaction' component={Transaction} />
            <Redirect to='/' />
        </Switch>
        </div>
        </div>
      </Share.Provider>
    </>
  );
}
 
export default App;