import "../styles/input.css";
const Input = ({ name, value, placeholder, type, onChange }) => {
  return (
    <div>
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
