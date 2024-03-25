import { useEffect, useState } from "react";
import useAuth from "../Authentication/useAuth";
import "../styles/home.css";
import Button from "../forms/Button";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

const Home = () => {
  const [isLoading, setIsLoading] = useState(false);
  const { getUser } = useAuth();
  const [info, setInfo] = useState({});
  useEffect(() => {
    const currentUser = getUser();
    setInfo(currentUser);
  }, []);

  const navigate = useNavigate();

  const handleClick = (e) => {
    e.preventDefault();
    setIsLoading(true);
    localStorage.removeItem("token");
    toast("logging out");
    navigate("/login");
    setIsLoading(false);
  };
  return (
    <div className="home">
      <div>
        <h2>Welcome {info.fullname}</h2>
      </div>
      <div>
        <Button
          name={isLoading ? "loading..." : "Log out"}
          onClick={handleClick}
          loading={isLoading}
        />
      </div>
    </div>
  );
};

export default Home;
