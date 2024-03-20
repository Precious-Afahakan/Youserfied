import { useEffect, useState } from "react";
import Input from "../forms/Inputs";
import Button from "../forms/Button";
import useAuth from "../Authentication/useAuth";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import "../styles/reset-password.css";

const ResetPassword = () => {
  const { getUser } = useAuth();
  const [userInfo, setUserInfo] = useState({});
  useEffect(() => {
    const currUser = getUser();
    setUserInfo(currUser);
  }, []);
  const [data, setData] = useState({
    password: "",
    confirmPassword: "",
  });
  const navigate = useNavigate();

  const [isLoading, setIsLoading] = useState(false);
  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;
    setData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleClick = (e) => {
    e.preventDefault();
    const validation = {};

    if (!data.password.trim()) {
      validation.password = "password is required";
    } else if (data.password.length < 6) {
      validation.password = "password should be at least 6 characters";
    }

    if (data.confirmPassword !== data.password) {
      validation.confirmPassword = "password not matched";
    }

    setErrors(validation);

    if (Object.keys(validation).length === 0) {
      setIsLoading(true);
      const users = JSON.parse(localStorage.getItem("users"));
      const currentUser = users.find((user) => {
        return user.email === userInfo.email;
      });
      const updatedUser = users.map((user) => {
        if (user.email === currentUser.email) {
          return { ...user, password: data.password };
        }
        return user;
      });

      localStorage.setItem("users", JSON.stringify(updatedUser));
      setIsLoading(false);
      toast("Password reset successful, login with new password");
      navigate("/login");
    }
  };
  return (
    <div className="reset-div">
      <form className="reset-form">
        <h4>Hello {userInfo.fullname}, reset your password here</h4>
        <Input
          name={"password"}
          value={data.password}
          placeholder={"Input new password"}
          onChange={(e) => handleChange(e)}
        />
        {errors.password && (
          <span style={{ color: "red" }}>{errors.password}</span>
        )}

        <Input
          name={"confirmPassword"}
          value={data.confirmPassword}
          placeholder={"Confirm password"}
          onChange={(e) => handleChange(e)}
        />
        {errors.confirmPassword && (
          <span style={{ color: "red" }}>{errors.confirmPassword}</span>
        )}

        <Button
          name={isLoading ? "loading..." : "Reset"}
          onClick={handleClick}
          loading={isLoading}
        />
      </form>
    </div>
  );
};

export default ResetPassword;
