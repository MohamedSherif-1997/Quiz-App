import React from "react";
import {
  BrowserRouter as Router,
  Route,
  Redirect,
  Switch,
} from "react-router-dom";

import '../node_modules/bootstrap/dist/css/bootstrap.min.css';
import './App.css';

import history from "./Utils/history";
import DashBoard from "./pages/Dashboard"
import Quizes from "./pages/Quizes"

function App() {
  return (
    <Router history={history}>
      <Switch>
        <Route
          exact
          path="/quiz"
          component={DashBoard}
        />
        <Route          
          path="/quiz/test"
          component={Quizes}
        />
             
        <Redirect to="/quiz" />
      </Switch>
    </Router>
  );
}

export default App;