import React, { Component } from "react";
import Hauls from "./components/Hauls";
import Haul from "./components/Haul";
import SignIn from "./components/SignIn";
import Navbar from "./components/Navbar";
import requireAuth from "./components/auth/requireAuth";
import { BrowserRouter, Route } from "react-router-dom";
import { connect } from "react-redux";
import { fetchUser } from "./actions";
import 'bootstrap/dist/css/bootstrap.css';
import './assets/css/main.css';


class App extends Component {
  componentWillMount() {
    this.props.fetchUser();
  }

  render() {
    return (
      <BrowserRouter>
        <React.Fragment>
          <Navbar />
          <div className="container">
            <Route exact path="/" component={SignIn} />
            <Route path="/app" component={requireAuth(Hauls)} />
            <Route path="/haul/:id" component={Haul} />
          </div>
        </React.Fragment>
      </BrowserRouter>
    );
  }
}

export default connect(null, { fetchUser })(App);
