import { useState, useEffect } from "react";
import "../styles/writestory.css";
import Input from "../forms/Inputs";
import Button from "../forms/Button";
import useAuth from "../Authentication/useAuth";
import { v4 as uuidv4 } from "uuid";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const EditStory = () => {
  const [data, setData] = useState({
    genre: "",
    novelTitle: "",
    story: "yooooooooooooooo",
  });
  const [user, setUser] = useState("");
  const { getUser } = useAuth();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setErrors] = useState("");

  useEffect(() => {
    const currentUser = getUser();
    setUser(currentUser);
  }, []);

  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const validation = {};
    if (!data.genre.trim()) {
      validation.genre = " Genre is required";
    }
    if (!data.novelTitle.trim()) {
      validation.novelTitle = "Novel title is required";
    }
    if (!data.story.trim()) {
      validation.story = "Novel content cannot be empty";
    }
    setErrors(validation);

    if (Object.keys(validation).length === 0) {
      const novels = JSON.parse(localStorage.getItem("novels"));
      const currentStory = novels.find((novel) => {
        return (
          novel.novelTitle === data.novelTitle && novel.genre === data.genre
        );
      });
      console.log("current Story", currentStory);
      if (!currentStory) {
        toast("Novel does not exist, do you wish to create it instead??");
        return;
      }
      setIsLoading(true);
      const updatedNovel = novels.map((novel) => {
        if (
          novel.novelTitle === currentStory.novelTitle &&
          novel.genre === currentStory.genre
        ) {
          return { ...currentStory, story: data.story };
        }
        return currentStory;
      });
      console.log("updated novel:", updatedNovel);

      localStorage.setItem("novels", JSON.stringify(updatedNovel));
      setIsLoading(false);
      toast("novel updated successfully");
    }
  };

  return (
    <div className="story-container">
      <h3> Hello {user.fullname}!, ready to edit?</h3>
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
      <div>
        <textarea
          onChange={(e) => handleChange(e)}
          value={data.story}
          name="story"
          className="story"
          placeholder="Type here..."
        />
      </div>
      {error.story && <span style={{ color: "red" }}>{error.story}</span>}

      <Button
        name={isLoading ? "loading..." : "Edit story"}
        onClick={handleSubmit}
        loading={isLoading}
      />
    </div>
  );
};

export default EditStory;
