function InputField({ label, placeholder, value, onChange }) {
  return (
    <div className="input-group">
      <label>{label}</label>
      <input
        type="text"
        placeholder={placeholder}
        value={value}
        onChange={onChange}
      />
    </div>
  );
}

export default InputField;