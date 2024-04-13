import "../styles/input.css";
const Input = ({ name, value, placeholder, type, onChange, label }) => {
  return (
    <div>
      <div className="labels">{label}</div>
      <input
        className="inputs"
        name={name}
        value={value}
        type={type}
        placeholder={placeholder}
        onChange={onChange}
      />
    </div>
  );
};

export default Input;
