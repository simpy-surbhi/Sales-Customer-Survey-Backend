import React from 'react';
import './App.css';
import { Link, BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import CustomerSurveyForm from './CustomerSurveyForm';

function App() {
  return (
    <React.Fragment>
      <Router>
        <Switch>
          <Route path="/" exact component={CustomerSurveyForm} />
        </Switch>
      </Router>
    </React.Fragment>
  );
}

export default App;
