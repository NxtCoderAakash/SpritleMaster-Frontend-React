import { Component } from "react";
import "./index.css";

class Calculator extends Component {
  state = { functionExp: "", showResult: false };

  onSubmitNumbers = async (event) => {
    event.preventDefault();

    this.updateOperationDatabase();
    this.setState({
      showResult: true,
    });
  };

  updateOperationDatabase = async () => {
    const { studentName } = this.props;
    const databaseKey = studentName.split(" ")[1];
    const { functionExp } = this.state;

    const response = await fetch(
      "https://spritlemaster-backend-production.up.railway.app/updateoperations",
      {
        method: "POST",
        body: JSON.stringify({
          email: databaseKey,
          operation: functionExp,
        }),
        headers: {
          "Content-type": "application/json",
        },
      }
    );
    if (response.ok) {
      const jsonData = await response.text();
      const { onRefreshResult } = this.props;
      await onRefreshResult();
      //   this.setState({ fetchState: "success" });
      //   setNameParent(first);
      //   const { history } = this.props;
      //   history.push("/");
      console.log(jsonData);
    } else {
      //   this.setState({ fetchState: "tryAgain" });
      const jsonData = await response.text();
      console.log(jsonData);
    }
  };

  onInputFunction = (event) => {
    this.setState({ functionExp: event.target.value });
  };

  render() {
    const { calculatorResponse, functionExp, showResult } = this.state;
    const { getResult } = this.props;

    return (
      <div>
        <h1>Calculator</h1>
        <form onSubmit={this.onSubmitNumbers}>
          <input
            type="text"
            name="num1"
            placeholder="Enter a number"
            required
            onChange={this.onInputFunction}
            value={functionExp}
          />
          <button type="submit">Calculate</button>
          <div className="output-container">
            {showResult && (
              <>
                <p>Result: </p>
                <div className="result">{getResult(functionExp)}</div>
                <p>{calculatorResponse}</p>
                <p>All Your Requested Calculation has been sent to Master.</p>
                <p>Ask Master to Login and View your history</p>
              </>
            )}
          </div>
        </form>
      </div>
    );
  }
}

export default Calculator;
