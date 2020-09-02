import React from "react";

export const Select = ({ name, options, setSelected }) => {
  return (
    <select
      className="form-input"
      onChange={(ev) => setSelected(ev.target.value)}
      defaultValue=""
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

export const Select2 = ({ name, setSelected, options }) => (
  <select
    className="form-input"
    onChange={(ev) => setSelected(ev.target.value)}
    defaultValue=""
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
