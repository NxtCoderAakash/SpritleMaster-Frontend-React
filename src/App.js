import { BrowserRouter, Route, Switch } from "react-router-dom";
import { FcCopyright } from "react-icons/fc";
import { Component } from "react";
import "./App.css";
import Card from "react-bootstrap/Card";
import Header from "./components/Navbar";
import Home from "./components/Home";
import Login from "./components/Login";
import loginStudent from "./components/LoginStudent";
import LoginMaster from "./components/LoginMaster";
import Registration from "./components/Registration";
import ReactContext from "./ReactContext";

class App extends Component {
  state = { username: "", isLoggedIn: false };

  setNameParent = (name) => {
    this.setState({ username: name, isLoggedIn: true });
  };

  removeNameParent = (name) => {
    this.setState({ username: "", isLoggedIn: false });
  };

  render() {
    const { username, isLoggedIn } = this.state;
    return (
      <div className="bg-container-app">
        <BrowserRouter>
          <Card className="bg-container-card">
            <ReactContext.Provider
              value={{
                username,
                setNameParent: this.setNameParent,
                isLoggedIn,
                removeNameParent: this.removeNameParent,
              }}
            >
              <Card.Header>
                <img
                  src="https://res.cloudinary.com/dfqs9as0v/image/upload/v1678549255/Spritle/spritle_logo_tap0et.svg"
                  className="spritle-logo"
                />
              </Card.Header>
              <Card.Body className="body-container">
                <Switch>
                  <Route exact path="/" component={Home} />
                  <Route exact path="/login" component={Login} />
                  <Route exact path="/loginStudent" component={loginStudent} />

                  <Route exact path="/loginMaster" component={LoginMaster} />
                  <Route exact path="/registration" component={Registration} />
                </Switch>
              </Card.Body>
              <Card.Footer>
                <FcCopyright size={20} /> Copyrights Reserved
              </Card.Footer>
            </ReactContext.Provider>
          </Card>
        </BrowserRouter>
      </div>
    );
  }
}

export default App;
