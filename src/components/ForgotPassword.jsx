import { useState } from "react";
import Input from "../forms/Inputs";
import Button from "../forms/Button";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { getUserToken } from "../Authentication/api";
import "../styles/forgot-password.css";

const ForgotPassword = () => {
  const [data, setData] = useState({
    email: "",
  });
  const [errors, setErrors] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setData((prevData) => ({ ...prevData, [name]: value }));
  };

  const emailRegex = new RegExp(
    /^[A-Za-z0-9_!#$%&'*+\/=?`{|}~^.-]+@[A-Za-z0-9.-]+$/,
    "gm"
  );

  const handleClick = (e) => {
    e.preventDefault();

    const validation = {};
    if (!data.email.trim()) {
      validation.email = " email is required";
    } else if (!emailRegex.test(data.email)) {
      validation.email = "email is not valid";
    }
    setErrors(validation);

    if (Object.keys(validation).length === 0) {
      setIsLoading(true);
      const users = JSON.parse(localStorage.getItem("users"));
      const found = users.find((user) => {
        return user.email === data.email;
      });
      if (!found) {
        toast("user not found");
        navigate("/register");
        return;
      }
      if (found) {
        getUserToken(found, navigate, "/reset-password");
        toast("move to reset");
      }
      setIsLoading(false);
    }
  };
  return (
    <div className="forgot-div">
      <form className="forgot-form">
        <h2>Forgot password?</h2>
        <Input
          placeholder={"input email"}
          name={"email"}
          value={data.email}
          onChange={(e) => handleChange(e)}
        />
        {errors.email && <span style={{ color: "red" }}>{errors.email}</span>}

        <Button
          name={isLoading ? "loading..." : "Click here"}
          onClick={handleClick}
          loading={isLoading}
        />
      </form>
    </div>
  );
};

export default ForgotPassword;
