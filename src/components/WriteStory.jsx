import { useState, useEffect } from "react";
import "../styles/writestory.css";
import Input from "../forms/Inputs";
import Button from "../forms/Button";
import useAuth from "../Authentication/useAuth";
import { v4 as uuidv4 } from "uuid";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const WriteStory = () => {
  const [data, setData] = useState({
    genre: "",
    novelTitle: "",
    story: "",
    novelId: uuidv4(),
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
      const foundNovel = novels.find((novel) => {
        return (
          novel.novelTitle === data.novelTitle && novel.genre === data.genre
        );
      });

      if (foundNovel) {
        toast("Novel already exist, do you wish to update it instead??");
        return;
      }
      setIsLoading(true);
      if (!foundNovel) {
        const novel = {
          ...data,
          createdAt: new Date(),
          createdBy: user.id,
        };
        const newNovel = [...novels, novel];
        localStorage.setItem("novels", JSON.stringify(newNovel));
      }
      toast("successful");
      setIsLoading(false);
    }
  };
  const handleUpdate = () => {
    navigate("/admin/update");
  };

  return (
    <div className="story-container">
      <h3> Hello! {user.fullname}, ready to write?</h3>
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
        name={isLoading ? "loading..." : "Post"}
        onClick={handleSubmit}
        loading={isLoading}
      />
      <Button
        name={isLoading ? "loading..." : "Update story"}
        onClick={handleUpdate}
        loading={isLoading}
      />
    </div>
  );
};

export default WriteStory;
