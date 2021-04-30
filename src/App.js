
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import BillForm from './containers/BillForm'
import 'antd/dist/antd.css';
function App() {
  return (
    <Router>
      <Switch>
        <Route path="/:order_id" strict>
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
