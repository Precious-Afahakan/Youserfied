import { useEffect, useState } from "react";
import useAuth from "../Authentication/useAuth";
import "../styles/home.css";

const Home = () => {
  const { getUser } = useAuth();
  const [info, setInfo] = useState({});
  useEffect(() => {
    const currentUser = getUser();
    setInfo(currentUser);
  }, []);
  return (
    <div className="home">
      <h1>
        Welcome {info.userType}-{info.fullname}
      </h1>
    </div>
  );
};

export default Home;
