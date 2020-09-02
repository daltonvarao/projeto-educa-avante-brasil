import React from "react";

const CargaHoraria = ({
  data,
  position,
  setCargasHorarias,
  cargasHorarias,
}) => {
  const handleRemoveClick = (position) => {
    let newState = [...cargasHorarias];
    newState.splice(position, 1);

    setCargasHorarias(newState);
  };

  return (
    <div className="form-group-inline carga-horara-group">
      <input
        className="form-input w-80"
        type="text"
        placeholder="Nome da disciplina"
        value={data.disciplina}
        onChange={(ev) => {
          let value = ev.target.value;
          let newState = [...cargasHorarias];

          newState[position].disciplina = value;
          setCargasHorarias(newState);
        }}
      />
      <input
        className="form-input w-20"
        type="number"
        placeholder="Horas"
        min="1"
        step="1"
        value={data.carga_horaria}
        onChange={(ev) => {
          let value = ev.target.value;
          let newState = [...cargasHorarias];

          newState[position].carga_horaria = value;
          setCargasHorarias(newState);
        }}
      />

      <button
        className="btn mdi-2x danger-text mdi mdi-trash-can-outline"
        type="button"
        onClick={() => handleRemoveClick(position)}
        disabled={cargasHorarias.length <= 1}
      />
    </div>
  );
};

export const CargasHorarias = ({ cargasHorarias, setCargasHorarias }) => {
  const handleClick = () => {
    setCargasHorarias((state) => [
      ...state,
      { disciplina: "", carga_horaria: "" },
    ]);
  };

  return (
    <>
      <h4 className="form-subtitle text-primary">Carga Horária</h4>

      {cargasHorarias.map((item, index) => (
        <CargaHoraria
          data={item}
          key={index}
          position={index}
          setCargasHorarias={setCargasHorarias}
          cargasHorarias={cargasHorarias}
        />
      ))}

      <button
        onClick={handleClick}
        className="btn text-primary mb-1 float-right outline-none"
        type="button"
      >
        Nova disciplina
      </button>
    </>
  );
};
