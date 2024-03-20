import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Input from "../forms/Inputs";
import Button from "../forms/Button";
import { toast } from "react-toastify";
import { getUserToken } from "../Authentication/api";
import "../styles/login.css";

const Login = () => {
  const [data, setData] = useState({
    email: "",
    password: "",
  });
  const [isLoading, setIsLoading] = useState(false);
  const [confirm, setConfirm] = useState("");
  const [errors, setErrors] = useState({});
  const navigate = useNavigate();
  const handleChange = (e) => {
    const { name, value } = e.target;
    setData((prevData) => ({ ...prevData, [name]: value }));
  };

  const emailRegex = new RegExp(
    /^[A-Za-z0-9_!#$%&'*+\/=?`{|}~^.-]+@[A-Za-z0-9.-]+$/,
    "gm"
  );

  const handleSubmit = (e) => {
    e.preventDefault();

    const validation = {};

    if (!data.email.trim()) {
      validation.email = " email is required";
    } else if (!emailRegex.test(data.email)) {
      validation.email = "email is not valid";
    }

    if (!data.password.trim()) {
      validation.password = "password is required";
    } else if (data.password.length < 6) {
      validation.password = "password should be at least 6 characters";
    }

    if (confirm !== data.password) {
      validation.confirmPassword = "password not matched";
    }

    setErrors(validation);

    if (Object.keys(validation).length === 0) {
      setIsLoading(true);
      const users = JSON.parse(localStorage.getItem("users"));
      const foundUser = users.find((user) => {
        return user.email === data.email && user.password === data.password;
      });
      if (!foundUser) {
        toast("Invalid credentials, check email or password");
        navigate("/register");
        return;
      }

      if (foundUser) {
        toast("login sucessful");
        navigate("/");
      }
      getUserToken(foundUser, navigate);
      setIsLoading(false);
    }
  };
  return (
    <div className="login-div">
      <form className="login-form">
        <h2>Login here</h2>
        <Input
          name="email"
          value={data.email}
          placeholder="input email"
          onChange={(e) => handleChange(e)}
        />
        {errors.email && <span style={{ color: "red" }}>{errors.email}</span>}

        <Input
          name="password"
          value={data.password}
          placeholder="input password"
          onChange={(e) => handleChange(e)}
        />
        {errors.password && (
          <span style={{ color: "red" }}>{errors.password}</span>
        )}

        <Input
          name="confirmPassword"
          value={confirm}
          placeholder="confirm password"
          onChange={(e) => setConfirm(e.target.value)}
        />
        {errors.confirmPassword && (
          <span style={{ color: "red" }}>{errors.confirmPassword}</span>
        )}

        <Button
          name={isLoading ? "loading..." : "Login"}
          onClick={handleSubmit}
          loading={isLoading}
        />
        <div>
          <span>
            Not registered? <Link to={"/register"}>Register</Link>
          </span>
          <br />
          <span>
            Forgot password? <Link to={"/forgot-password"}>Click here</Link>
          </span>
        </div>
      </form>
      <div className="right-part">
        <h1>
          <i>Welcome</i>
        </h1>
      </div>
    </div>
  );
};

export default Login;
