
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import BillForm from './containers/BillForm'
import 'antd/dist/antd.css';
function App() {
  return (
    <Router>
      <Switch>
        <Route path="/" strict exact>
          <h1>Hello</h1>
        </Route>
        <Route path="/form/:order_id" strict exact>
          <BillForm />
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
