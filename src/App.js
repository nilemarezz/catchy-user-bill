
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import BillForm from './containers/BillForm'
import Success from './containers/Success'
import 'antd/dist/antd.css';
import Already from './containers/Already'
import Home from './containers/Home'
function App() {
  return (
    <Router>
      <Switch>
        <Route path="/" exact>
          <Home />
        </Route>
        <Route path="/form/:order_id" exact>
          <BillForm />
        </Route>
        <Route path="/success/:order_id" exact>
          <Success />
        </Route>
        <Route path="/already/:order_id" exact>
          <Already />
        </Route>
        {/* <Route path="/analyze" strict>
        <Analzye />
      </Route>
      <Route path="/" strict>
        <ListComponent />
      </Route> */}
      </Switch>
    </Router>
  );
}

export default App;
