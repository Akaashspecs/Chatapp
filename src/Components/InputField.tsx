import React from "react";

interface InputFieldProps {
  label: string;
  name: string;
  value?: string;
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  onBlur: (event: React.FocusEvent<HTMLInputElement>) => void;
  error: string | false | undefined;
  placeholder?: string;
}

const InputField: React.FC<InputFieldProps> = ({
  label,
  name,
  value,
  onChange,
  onBlur,
  error,
  placeholder,
}) => {
  return (
    <div className="flex flex-col mt-3">
      <label htmlFor={name}>{label}</label>
      <input
        className="bg-transparent focus:outline-none border-2 sm:w-96 w-full rounded-md px-3 mt-1"
        type="text"
        autoComplete="off"
        name={name}
        id={name}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        onBlur={onBlur}
      />
      {error ? <p className="form-error">{error}</p> : null}
    </div>
  );
};

export default InputField;
