import "../styles/input.css";
const Input = ({ name, value, placeholder, onChange }) => {
  return (
    <div>
      <input
        className="inputs"
        name={name}
        value={value}
        placeholder={placeholder}
        onChange={onChange}
      />
    </div>
  );
};

export default Input;
