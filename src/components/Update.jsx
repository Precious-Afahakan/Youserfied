import { useEffect, useState } from "react";
import useAuth from "../Authentication/useAuth";
import Button from "../forms/Button";
import Input from "../forms/Inputs";
import { toast } from "react-toastify";
import "../styles/update.css";

const Update = () => {
  const { getUser } = useAuth();
  const [user, setUser] = useState("");
  useEffect(() => {
    const currentUser = getUser();
    setUser(currentUser);
  }, []);
  const [data, setData] = useState({
    genre: "",
    novelTitle: "",
    story: "",
  });
  const [isLoading, setIsLoading] = useState(false);
  const [error, setErrors] = useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;
    setData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleDisplay = () => {
    const novels = JSON.parse(localStorage.getItem("novels"));
    console.log("list", novels);
    const allNovels = novels.map((novel) => {
      if (
        novel.createdBy === user.id &&
        novel.genre === data.genre &&
        novel.novelTitle === data.novelTitle
      ) {
        return novel;
      }
    });
    const found = allNovels.find((novel) => {
      return novel !== undefined;
    });

    console.log("found", found);
    toast("edit");
    setData(found);
    setIsLoading(true);
  };

  const handleUpdate = () => {
    const validation = {};
    if (!data.genre.trim()) {
      validation.genre = " Genre is required";
    }
    if (!data.novelTitle.trim()) {
      validation.novelTitle = "Novel title is required";
    }
    if (!data.story.trim()) {
      validation.story = " story cannot be empty";
    }
    setErrors(validation);

    if (Object.keys(validation).length === 0) {
      const novels = JSON.parse(localStorage.getItem("novels"));
      const currentNovel = novels.find((novel) => {
        return (
          user.id === novel.createdBy &&
          novel.genre === data.genre &&
          novel.novelTitle === data.novelTitle
        );
      });

      console.log("curr novel:", currentNovel);
      const updatedNovel = novels.map((novel) => {
        if (
          user.id === currentNovel.createdBy &&
          novel.genre === data.genre &&
          novel.novelTitle === data.novelTitle
        ) {
          return { ...novel, story: data.story };
        }
        return novel;
      });
      console.log("updated:", updatedNovel);

      localStorage.setItem("novels", JSON.stringify(updatedNovel));
      toast("Updated yayy");
      setIsLoading(false);
    }
  };

  return (
    <div className="update-container">
      <h3> Hello {user.fullname}</h3>
      <div className="dropdown">
        <label>Story genre:</label>
        <select
          onChange={(e) => handleChange(e)}
          value={data.genre}
          name="genre"
        >
          <option hidden>Choose your genre</option>
          <option>Horror</option>
          <option>Adventure</option>
          <option>Romance</option>
          <option>Action</option>
          <option>Magical</option>
          <option>Mystical</option>
        </select>
      </div>
      {error.genre && <span style={{ color: "red" }}>{error.genre}</span>}
      <div>
        <Input
          label={"Novel title:"}
          placeholder={"novel title..."}
          name="novelTitle"
          value={data.novelTitle}
          onChange={(e) => handleChange(e)}
        />
      </div>
      {error.novelTitle && (
        <span style={{ color: "red" }}>{error.novelTitle}</span>
      )}
      <Button
        name={isLoading ? "clickedddd" : "Display story for Edit"}
        style={
          !isLoading
            ? { backgroundColor: "orangered", color: "black" }
            : {
                backgroundColor: "rgb(149,143,143)",
                color: "black",
                border: "2px solid orangered",
              }
        }
        onClick={handleDisplay}
        loading={isLoading}
      />
      <h2>{data.novelTitle}</h2>
      <textarea
        onChange={(e) => handleChange(e)}
        value={data.story}
        name="story"
        className="story"
        placeholder="Type here..."
      />
      {error.story && <span style={{ color: "red" }}>{error.story}</span>}
      <Button name={"Update"} onClick={handleUpdate} />
    </div>
  );
};

export default Update;
