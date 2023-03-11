import { Navbar, Container, Button } from "react-bootstrap";
import { withRouter } from "react-router-dom";
import Cookies from "js-cookie";
import "./index.css";
import "bootstrap/dist/css/bootstrap.min.css";
import ReactContext from "../../ReactContext";

const Header = (props) => (
  <ReactContext.Consumer>
    {(value) => {
      let { username, isLoggedIn, removeNameParent } = value;
      console.log(username, "head");
      console.log(isLoggedIn, "head");
      let { user } = props;
      username = user;
      console.log(username);
      if (user === undefined) {
        user = "none none";
      }

      const onClickLogout = () => {
        const { user } = props;

        if (user.split(" ")[0] === "Student") {
          console.log("cookies removed");
          Cookies.remove("student_token");
        }
        if (user.split(" ")[0] === "Master") {
          Cookies.remove("master_token");
        }
        removeNameParent();

        const { history } = props;
        history.push("/login");
      };
      return (
        <Navbar>
          <Container>
            <Navbar.Brand href="#home">
              {user.split(" ")[0] === "Student" && (
                <img
                  className="header-logo"
                  src="https://res.cloudinary.com/dfqs9as0v/image/upload/v1678549469/Spritle/student-logo-vector_mb8ify.jpg"
                />
              )}
              {user.split(" ")[0] === "Master" && (
                <img
                  className="header-logo"
                  src="https://res.cloudinary.com/dfqs9as0v/image/upload/v1678549467/Spritle/master-logo_hlw5xi.jpg"
                />
              )}
            </Navbar.Brand>
            <Navbar.Toggle />
            <Navbar.Collapse className="justify-content-end">
              {username && (
                <Navbar.Text>
                  Signed in as: <Navbar.Brand>{username}</Navbar.Brand>
                </Navbar.Text>
              )}

              {username && (
                <Button onClick={onClickLogout} className="m-3">
                  Logout
                </Button>
              )}
            </Navbar.Collapse>
          </Container>
        </Navbar>
      );
    }}
  </ReactContext.Consumer>
);

export default withRouter(Header);
