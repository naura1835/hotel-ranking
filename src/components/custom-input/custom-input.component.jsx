// eslint-disable-next-line react/prop-types
import "./custom-input.style.css";

// eslint-disable-next-line react/prop-types
const CustomInput = ({ labelText, idText, errorText, children }) => {
  return (
    <div>
      <div className="custom-input">
        <label className="custom-input__label" htmlFor={idText}>
          {labelText}
        </label>
        <div className="custom-input__inner-div">{children}</div>
      </div>
      {errorText && <span className="error">{errorText}</span>}
    </div>
  );
};

export default CustomInput;
