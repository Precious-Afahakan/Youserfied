import { useEffect, useState } from "react";
import useAuth from "../Authentication/useAuth";
import "../styles/home.css";
import Button from "../forms/Button";
import Input from "../forms/Inputs";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

const Home = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [isAuthorized, setIsAuthorized] = useState(true);
  const { getUser } = useAuth();
  const [info, setInfo] = useState({});
  const [novel, setNovel] = useState("");
  const [readUp, setReadUp] = useState("");

  useEffect(() => {
    const currentUser = getUser();
    setInfo(currentUser);
    if (currentUser.userType !== "Admin") {
      setIsAuthorized(false);
    }
    if (currentUser.userType === "Admin") {
      const novels = JSON.parse(localStorage.getItem("novels"));
      const found = novels.find((novel) => {
        return novel.genre === "Magical";
      });

      console.log("found", found);
      setNovel(found);
    }
    if (currentUser.userType === "Sapphire") {
      const novels = JSON.parse(localStorage.getItem("novels"));
      const found = novels.find((novel) => {
        return novel.genre === "Romance";
      });

      console.log("found", found);
      setNovel(found);
    }
    if (currentUser.userType === "Emerald") {
      const novels = JSON.parse(localStorage.getItem("novels"));
      const found = novels.find((novel) => {
        return novel.genre === "Horror";
      });

      console.log("found", found);
      setNovel(found);
    }

    if (currentUser.userType === "Diamond") {
      const novels = JSON.parse(localStorage.getItem("novels"));
      const found = novels.find((novel) => {
        return novel.genre === "Adventure";
      });

      console.log("found", found);
      setNovel(found);
    }
  }, []);

  const navigate = useNavigate();

  const logOut = (e) => {
    e.preventDefault();
    setIsLoading(true);
    localStorage.removeItem("token");
    navigate("/login");
    setIsLoading(false);
  };

  const createStory = () => {
    if (!isAuthorized) {
      toast("only admins can write stories");
      return;
    }
    if (isAuthorized) {
      navigate("/admin/write-story");
      return;
    }
  };
  const readNovel = () => {
    setReadUp(novel);
    // toast("read book");
  };

  const libraryMove = () => {
    navigate("library");
  };
  return (
    <div className="home">
      <div>
        <h2>Welcome home, {info.fullname}!</h2>
      </div>
      <div className="searchbar">
        <Input
          name={"Searchbar"}
          placeholder={"search here..."}
          label={"Search for books here:"}
        />
      </div>
      <div className="books">
        <h2>
          <i>Recommended book for you</i>
        </h2>
        <div className="book">
          <div className="image-box"></div>
          <div className="TRL">
            <div>
              <h2>{novel.novelTitle}</h2>
            </div>

            <Button
              name={isLoading ? "loading..." : "Read"}
              onClick={readNovel}
              loading={isLoading}
            />
            <div>{readUp.story}</div>
            <Button
              name={isLoading ? "loading..." : "Add to Library"}
              onClick={libraryMove}
              loading={isLoading}
            />
          </div>
        </div>
      </div>
      <div>
        <Button
          name={isAuthorized ? "write story" : "write story"}
          onClick={createStory}
          loading={isLoading}
          style={
            isAuthorized
              ? { backgroundColor: "orangered", color: "black" }
              : {
                  backgroundColor: "rgb(149,143,143)",
                  color: "black",
                  border: "2px solid orangered",
                }
          }
        />
        <Button
          name={isLoading ? "loading..." : "Library"}
          onClick={libraryMove}
          loading={isLoading}
        />
      </div>
      <div>
        <Button
          name={isLoading ? "loading..." : "Log out"}
          onClick={logOut}
          loading={isLoading}
        />
      </div>
    </div>
  );
};

export default Home;
