import "../styles/button.css";
const Button = ({ name, onClick, loading, style }) => {
  return (
    <div className="button-container">
      <button
        disabled={loading}
        onClick={onClick}
        className="buttons"
        style={style}
      >
        {name}
      </button>
    </div>
  );
};

export default Button;
