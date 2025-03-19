function InputField({
  type = "text",
  placeholder = " ",
  value = "",
  onChange,
  backgroundColor = "",
  color = "",
  style = {},
  onFocus
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
        onFocus={onFocus}
      />
    </div>
  );
}

export default InputField;
