import { Component } from "react";
import { withRouter } from "react-router-dom";
import Button from "react-bootstrap/Button";
import Cookies from "js-cookie";
import Form from "react-bootstrap/Form";
import "./index.css";
import ReactContext from "../../ReactContext";

class LoginMaster extends Component {
  state = {
    fetchState: "initial",
    email: "",
    password: "",
    err: "",
    callingFunction: () => {},
  };

  checkMasterAccount = async () => {
    const { email } = this.state;

    const checkPreviousResponse = await fetch(
      `https://spritlemaster-backend-production.up.railway.app/${email}`
    );

    if (checkPreviousResponse.status === 200) {
      const jsonDataAllUsers = await checkPreviousResponse.json();

      const { isStudent } = jsonDataAllUsers;
      if (isStudent === "true") {
        this.setState({
          fetchState: "tryAgain",
          err: "You are not a Master, Use Master account to Login",
        });
        return false;
      } else {
        return true;
      }
    } else {
      await this.setState({
        fetchState: "tryAgain",
        err: "You are not a Master, Use Master account to Login",
      });
    }
  };

  getData = async (setNameParent, person) => {
    this.setState({ fetchState: "loading" });

    const { email, password } = this.state;

    const options = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password }),
    };

    const checkPreviousResponse = await fetch(
      "https://spritlemaster-backend-production.up.railway.app/login",
      options
    );

    console.log(
      JSON.stringify({
        email,
        password,
      })
    );
    if (checkPreviousResponse.status === 200) {
      const jsonDataAllUsers = await checkPreviousResponse.json();

      console.log(jsonDataAllUsers);
      const { callingFunction } = this.state;
      const { name } = jsonDataAllUsers;

      console.log(name);
      await callingFunction(name);
      Cookies.set("master_token", `Master ${name}`);
      const { history } = this.props;
      history.push("/", { name });
    } else {
      await this.setState({
        fetchState: "tryAgain",
        err: "No Such User Exists",
      });

      console.log("User DoesNot Exists");
    }
  };

  onClickSignup = () => {
    const { history } = this.props;
    history.replace("/registration");
  };

  onInputEmail = (event) => {
    this.setState({ email: event.target.value });
  };

  submitForm = async (event) => {
    const { email, password } = this.state;

    const userData = [email, password];
    if (userData.every((item) => item !== "")) {
      const checkMaster = await this.checkMasterAccount();
      if (checkMaster) {
        this.getData();
      } else {
        this.setState({
          err: "This Is Student account. Please Enter Master Account",
        });
      }
    } else {
      this.setState({ err: "Enter Required Details" });
    }
  };

  onInputPassword = (event) => {
    this.setState({ password: event.target.value });
  };

  renderLoading = () => <h1>Loading......</h1>;

  renderSucess = () => {
    const { err, email, password, person } = this.state;

    return (
      <ReactContext.Consumer>
        {(value) => {
          const { setNameParent } = value;

          const commonSubmit = async (event) => {
            event.preventDefault();
            await this.setState({ callingFunction: setNameParent });

            this.submitForm(event);
          };

          return (
            <Form onSubmit={commonSubmit} className="form-container">
              <Form.Group
                className="mb-3 form-group"
                controlId="formGroupEmail"
              >
                <Form.Label>Email address</Form.Label>
                <Form.Control
                  onChange={this.onInputEmail}
                  type="email"
                  placeholder="Enter email"
                  value={email}
                />
              </Form.Group>
              <Form.Group
                className="mb-3 form-group"
                controlId="formGroupPassword"
              >
                <Form.Label>Password</Form.Label>
                <Form.Control
                  onChange={this.onInputPassword}
                  type="password"
                  placeholder="Enter Password"
                  value={password}
                />
              </Form.Group>
              <Button variant="primary" type="submit">
                Login
              </Button>
              <Button
                type="button"
                onClick={this.onClickSignup}
                variant="primary"
                className="click-button"
              >
                Signup
              </Button>
              <p className="err-message-red">{err}</p>
            </Form>
          );
        }}
      </ReactContext.Consumer>
    );
  };

  refreshRegistrationPage = () => {
    this.setState({ fetchState: "success" });
  };

  renderFailure = () => <h1>Failure.......</h1>;

  renderTryAgain = () => (
    <>
      <h1>User Doesnot Exists</h1>
      <Button onClick={this.refreshRegistrationPage}>Try Again......</Button>
    </>
  );

  checkState = (fetchState) => {
    switch (fetchState) {
      case "initial":
        return this.renderSucess();
      case "success":
        return this.renderSucess();
      case "failure":
        return this.renderFailure();
      case "loading":
        return this.renderLoading();
      default:
        return this.renderTryAgain();
    }
  };

  render() {
    const { fetchState } = this.state;
    return this.checkState(fetchState);
  }
}

export default withRouter(LoginMaster);
