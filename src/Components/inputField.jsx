function InputField({
  type = "text",
  placeholder = " ",
  value = "",
  onChange,
  backgroundColor = "",
  color = "",
  style = {},
}) {
  return (
    <div>
      <input
        type={type}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        style={{
          backgroundColor,
          color,
          ...style,
        }}
      />
    </div>
  );
}

export default InputField;
