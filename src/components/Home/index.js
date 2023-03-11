import { Component } from "react";
import { Redirect } from "react-router-dom";
import Cookies from "js-cookie";
import { v4 as uuidv4 } from "uuid";
import "./index.css";
import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";
import Header from "../Navbar";
import Form from "react-bootstrap/Form";
import ReactContext from "../../ReactContext";
import Calculator from "../Calculator";
import Answers from "../Answers";

class Home extends Component {
  state = { exp: "", output: 0, fetchedList: [], studentOperationList: [] };

  componentDidMount() {
    this.getAllOperations();
    this.getUserOperations();
  }

  onRefreshResult = () => {
    this.getAllOperations();
    this.getUserOperations();
  };

  onInputExpression = (event) => {
    this.setState({ exp: event.target.value });
  };

  onClickGetResults = (event) => {
    event.preventDefault();
  };

  getResult = (exp) => {
    function one(operator = null) {
      if (operator !== null) {
        return operator(1);
      }
      return 1;
    }

    function two(operator = null) {
      if (operator !== null) {
        return operator(2);
      }
      return 2;
    }

    function three(operator = null) {
      if (operator !== null) {
        return operator(3);
      }
      return 3;
    }

    function four(operator = null) {
      if (operator !== null) {
        return operator(4);
      }
      return 4;
    }

    function five(operator = null) {
      if (operator !== null) {
        return operator(5);
      }
      return 5;
    }

    function six(operator = null) {
      if (operator !== null) {
        return operator(6);
      }
      return 6;
    }

    function seven(operator = null) {
      if (operator !== null) {
        return operator(7);
      }
      return 7;
    }

    function eight(operator = null) {
      if (operator !== null) {
        return operator(8);
      }
      return 8;
    }

    function nine(operator = null) {
      if (operator !== null) {
        return operator(9);
      }
      return 9;
    }

    function zero(operator = null) {
      if (operator !== null) {
        return operator(0);
      }
      return 0;
    }

    function plus(x) {
      return function (val1) {
        return val1 + x;
      };
    }

    function minus(x) {
      return function (val1) {
        return val1 - x;
      };
    }

    function times(x) {
      return function (val1) {
        return val1 * x;
      };
    }

    function dividedby(x) {
      return function (val1) {
        return Math.floor(val1 / x);
      };
    }

    const tokensWithoutSpace = exp.replace(/\s+/g, "");
    const expList = tokensWithoutSpace.split("(").slice(0, 3);
    console.log(expList);

    const first = expList[0];
    const operation = expList[1];
    const second = expList[2];

    const numDict = {
      one: one,
      two: two,
      three: three,
      four: four,
      five: five,
      six: six,
      seven: seven,
      eight: eight,
      nine: nine,
      zero: zero,
    };

    const firstFunc = numDict[first];

    const secondFunc = numDict[second];

    let result = "Invalid Syntax";

    if (operation === "plus") {
      result = firstFunc(plus(secondFunc()));
    }
    if (operation === "minus") {
      result = firstFunc(minus(secondFunc()));
    }
    if (operation === "times") {
      result = firstFunc(times(secondFunc()));
    }
    if (operation === "divided_by") {
      result = firstFunc(divided_by(secondFunc()));
    }
    return result;
  };

  onClickMasterLogin = () => {
    const { history } = this.props;
    history.push("/login");
  };

  getUserOperations = async () => {
    const response = await fetch(
      `https://spritlemaster-backend-production.up.railway.app/operations/aa@gmail.com/`
    );
    if (response.status === 200) {
      const jsonDataSingleUsers = await response.json();
      this.setState({ studentOperationList: jsonDataSingleUsers });
      console.log(jsonDataSingleUsers);
    } else {
      console.log("not fetched all users");
    }
  };

  getAllOperations = async () => {
    const response = await fetch(
      "https://spritlemaster-backend-production.up.railway.app/allopera"
    );
    if (response.status === 200) {
      const jsonDataAllUsers = await response.json();
      const reversedList = jsonDataAllUsers.reverse();
      this.setState({ fetchedList: reversedList });
      console.log(jsonDataAllUsers);
    } else {
      console.log("not fetched all users");
      //   this.setState({
      //     fetchState: "tryAgain",
      //     err: "No Such User Exists",
      //   });
    }
  };

  render() {
    const { output, fetchedList, studentOperationList } = this.state;
    console.log(fetchedList, studentOperationList);
    const { location } = this.props;
    const { state } = location;
    let { name, exp } = this.state;
    let master = "";

    const studentName = Cookies.get("student_token");
    const masterName = Cookies.get("master_token");
    console.log(studentName);
    console.log(masterName);
    if (studentName || masterName) {
      name = studentName;
      master = masterName;
    } else {
      return <Redirect to="/login" />;
    }

    return (
      <ReactContext.Consumer>
        {(value) => {
          const { setNameParent, username, isLoggedIn } = value;
          console.log(username, "yes");
          console.log(isLoggedIn, "yes");
          return (
            <div className="bg-home-container">
              <div className="bg-container-card home-card">
                <Card className="bg-student-container-card">
                  <Card.Header>
                    <Header user={studentName} />
                  </Card.Header>
                  <Card.Body className="body-left-container">
                    <h1>Hey Student !!</h1>
                    <p> Get your calculations done here!!</p>
                    <Calculator
                      onRefreshResult={this.onRefreshResult}
                      studentName={studentName}
                      getResult={this.getResult}
                    />
                  </Card.Body>
                  <Card.Footer>For Students</Card.Footer>
                </Card>

                <Card className="bg-master-container-card">
                  <Card.Header>
                    <Header user={master} />
                  </Card.Header>
                  <Card.Body className="body-right-container">
                    <h1>Hi Master!!!</h1>
                    {masterName && (
                      <ul className="operation-list">
                        {fetchedList.map((item) => (
                          <Answers
                            key={uuidv4()}
                            data={item}
                            getResult={this.getResult}
                          />
                        ))}
                      </ul>
                    )}
                    {!masterName && (
                      <Button
                        onClick={this.onClickMasterLogin}
                        type="button"
                        variant="primary"
                        type="button"
                      >
                        Login to See Result
                      </Button>
                    )}
                  </Card.Body>

                  <Card.Footer>For Masters</Card.Footer>
                </Card>
              </div>
            </div>
          );
        }}
      </ReactContext.Consumer>
    );
  }
}

export default Home;
