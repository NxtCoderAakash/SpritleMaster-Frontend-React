import { Component } from "react";
import Button from "react-bootstrap/Button";

import Form from "react-bootstrap/Form";
import "./index.css";
import ReactContext from "../../ReactContext";

class Registration extends Component {
  state = {
    fetchState: "initial",
    first: "",
    last: "",
    email: "",
    password: "",
    mobile: "",
    isStudent: "true",
    err: "",
  };

  postData = async (setNameParent) => {
    const { first, last, email, mobile, password, isStudent } = this.state;

    this.setState({ fetchState: "loading" });

    const response = await fetch(
      "https://spritlemaster-backend-production.up.railway.app/register",
      {
        method: "POST",
        body: JSON.stringify({
          name: `${first} ${last}`,
          email: email,
          password: password,
          mobile: mobile,
          isStudent: isStudent,
        }),
        headers: {
          "Content-type": "application/json",
        },
      }
    );
    if (response.ok) {
      const jsonData = await response;
      this.setState({ fetchState: "success" });
      setNameParent(first);
      const { history } = this.props;
      history.push("/");
      console.log(jsonData);
    } else {
      this.setState({ fetchState: "tryAgain" });
      const jsonData = await response.json();
      console.log(jsonData);
    }
  };

  submitForm = (setNameParent) => {
    const { first, last, email, mobile, isStudent, password } = this.state;

    if (first && last && email && mobile && isStudent && password) {
      this.postData(setNameParent);
    } else {
      console.log(first, last, email, mobile, isStudent, password);
      this.setState({ err: "Enter Required Details" });
    }
  };

  onInputFirst = (event) => {
    this.setState({ first: event.target.value });
  };

  onInputLast = (event) => {
    this.setState({ last: event.target.value });
  };

  onInputEmail = (event) => {
    this.setState({ email: event.target.value });
  };

  onInputPassword = (event) => {
    this.setState({ password: event.target.value });
  };

  onInputPhone = (event) => {
    this.setState({ mobile: event.target.value });
  };

  onInputStudent = (event) => {
    this.setState({ isStudent: event.target.value });
  };

  renderLoading = () => <h1>Loading......</h1>;

  renderSucess = () => {
    const { err, first, last, email, mobile, password, isStudent } = this.state;
    return (
      <ReactContext.Consumer>
        {(value) => {
          const { setNameParent } = value;

          const onRegistration = (event) => {
            event.preventDefault();
            this.submitForm(setNameParent);
          };

          return (
            <Form
              onSubmit={onRegistration}
              className="form-container-registration"
            >
              <h1>Registration Page</h1>
              <Form.Group
                className="mb-3 mt-3 form-group"
                controlId="formGroupEmail"
              >
                <Form.Label>First Name</Form.Label>
                <Form.Control
                  onChange={this.onInputFirst}
                  type="text"
                  placeholder="Enter First Name"
                  value={first}
                />
              </Form.Group>
              <Form.Group
                className="mb-3 form-group"
                controlId="formGroupPassword"
              >
                <Form.Label>Last Name</Form.Label>
                <Form.Control
                  onChange={this.onInputLast}
                  type="text"
                  placeholder="Enter Last Name"
                  value={last}
                />
              </Form.Group>
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
                className="mb-3  form-group"
                controlId="formGroupEmail"
              >
                <Form.Label>Password</Form.Label>
                <Form.Control
                  onChange={this.onInputPassword}
                  type="password"
                  placeholder="Enter password"
                  value={password}
                />
              </Form.Group>
              <Form.Group
                className="mb-3 form-group"
                controlId="formGroupPassword"
              >
                <Form.Label>Mobile Number</Form.Label>
                <Form.Control
                  onChange={this.onInputPhone}
                  type="number"
                  placeholder="Enter Mobile Number"
                  value={mobile}
                />
              </Form.Group>
              <Form.Group
                className="mb-3 form-group"
                controlId="formGroupPassword"
              >
                <Form.Label>Are You a Student?</Form.Label>
                <Form.Select onChange={this.onInputStudent}>
                  <option value="true" selected>
                    Yes
                  </option>
                  <option value="false">No</option>
                </Form.Select>
              </Form.Group>

              <Button variant="primary" type="submit">
                Create Account
              </Button>
              <p>{err}</p>
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
      <h1>User Already Exists</h1>
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

export default Registration;
