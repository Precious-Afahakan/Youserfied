import "../styles/button.css";
const Button = ({ name, onClick, loading }) => {
  return (
    <div className="button-container">
      <button disabled={loading} onClick={onClick} className="buttons">
        {name}
      </button>
    </div>
  );
};

export default Button;
