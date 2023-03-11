import "./index.css";
import LoginStudent from "../LoginStudent";
import LoginMaster from "../LoginMaster";
// import LoginStudent from "../LoginStudent";
// import LoginMaster from "../LoginMaster";

const Login = (props) => {
  const { data } = props;

  return (
    <div className="bg-container-login-main">
      <div className="card-container-login-main">
        <div className="login-student-container">
          <img
            className="header-logo"
            src="https://res.cloudinary.com/dfqs9as0v/image/upload/v1678549469/Spritle/student-logo-vector_mb8ify.jpg"
          />
          <h1 className="login-head">Student Login</h1>
          <LoginStudent />
        </div>

        <div className="login-master-container">
          <img
            className="header-logo"
            src="https://res.cloudinary.com/dfqs9as0v/image/upload/v1678549467/Spritle/master-logo_hlw5xi.jpg"
          />
          <h1 className="login-head">Master Login</h1>
          <LoginMaster />
        </div>
      </div>
    </div>
  );
};

export default Login;
