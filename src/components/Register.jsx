import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { getUserToken } from "../Authentication/api";
import Input from "../forms/Inputs";
import Button from "../forms/Button";
import "../styles/register.css";

const Register = () => {
  const [data, setData] = useState({
    fullname: "",
    email: "",
    password: "",
    userType: "",
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

    if (!data.fullname.trim()) {
      validation.fullname = " Full name is required";
    }
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

    if (!data.userType.trim()) {
      validation.userType = "Choose your userType";
    }

    setErrors(validation);

    if (Object.keys(validation).length === 0) {
      setIsLoading(true);
      const users = JSON.parse(localStorage.getItem("users"));
      const foundUser = users.find((user) => {
        return user.email === data.email;
      });
      if (foundUser) {
        toast("User with email already exists log in instead");
        navigate("/login");
        return;
      }

      if (!foundUser) {
        const newUser = [...users, data];
        localStorage.setItem("users", JSON.stringify(newUser));
        toast("Successful");
      }

      getUserToken(data, navigate);
      setIsLoading(false);
    }
  };

  return (
    <div className="register-div">
      <div className="left-div">
        <h1>
          <i>Welcome</i>
        </h1>
      </div>
      <form className="register-form">
        <h2>Register here</h2>
        <Input
          name="fullname"
          value={data.fullname}
          placeholder="input fullname"
          onChange={(e) => handleChange(e)}
        />
        {errors.fullname && (
          <span style={{ color: "red" }}>{errors.fullname}</span>
        )}
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
          type={"password"}
          placeholder="input password"
          onChange={(e) => handleChange(e)}
        />
        {errors.password && (
          <span style={{ color: "red" }}>{errors.password}</span>
        )}

        <Input
          name="confirmPassword"
          value={confirm}
          type={"password"}
          placeholder="confirm password"
          onChange={(e) => setConfirm(e.target.value)}
        />
        {errors.confirmPassword && (
          <span style={{ color: "red" }}>{errors.confirmPassword}</span>
        )}

        <div className="dropdown">
          <label>User type:</label>
          <select
            onChange={(e) => handleChange(e)}
            value={data.userType}
            name="userType"
          >
            <option hidden>Choose your user type</option>
            <option>Emerald</option>
            <option>Sapphire</option>
            <option>Diamond</option>
          </select>
        </div>
        {errors.userType && (
          <span style={{ color: "red" }}>{errors.userType}</span>
        )}

        <Button
          name={isLoading ? "loading..." : "Register"}
          onClick={handleSubmit}
          loading={isLoading}
        />
        <div>
          <span>
            Already registered? <Link to={"/login"}>Login</Link>
          </span>
        </div>
      </form>
    </div>
  );
};

export default Register;
