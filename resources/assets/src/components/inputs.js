import React from "react";

export const Select = ({ name, options, setSelected, defaultValue }) => {
  return (
    <select
      className="form-input"
      onChange={(ev) => setSelected(ev.target.value)}
      defaultValue={defaultValue}
      required
    >
      <option value="" className="shadow" disabled>
        {name}
      </option>
      {options.map((item) => (
        <option key={item.id} value={item.id}>
          {item.nome}
        </option>
      ))}
    </select>
  );
};

export const Select2 = ({ name, setSelected, options, defaultValue }) => (
  <select
    className="form-input"
    onChange={(ev) => setSelected(ev.target.value)}
    defaultValue={defaultValue}
    required
  >
    <option disabled value="">
      {name}
    </option>
    {options.map((item) => (
      <option key={item} value={item}>
        {item}
      </option>
    ))}
  </select>
);

export const InputValidation = ({ field, error }) => {
  if (field.includes(error.source?.pointer))
    return <span className="input-validation-fails">{error.detail}</span>;

  return null;
};
