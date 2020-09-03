import React, { useEffect } from "react";

const CargaHoraria = ({
  data,
  position,
  setCargasHorarias,
  cargasHorarias,
}) => {
  const handleRemoveClick = (position) => {
    let newState = [...cargasHorarias];

    if (newState[position].disciplina) {
      if (!window.confirm("Deseja remover este item?")) return;
    }

    newState.splice(position, 1);

    setCargasHorarias(newState);
  };

  return (
    <div className="form-group-inline carga-horara-group">
      <input type="hidden" value={data.id} />
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
        disabled={cargasHorarias.length === 1 && !cargasHorarias[0].disciplina}
        onClick={() => handleRemoveClick(position)}
      />
    </div>
  );
};

export const CargasHorarias = ({ cargasHorarias, setCargasHorarias }) => {
  const handleClick = () => {
    setCargasHorarias((state) => [
      ...state,
      { disciplina: "", carga_horaria: "", id: "" },
    ]);
  };

  useEffect(() => {
    if (cargasHorarias.length === 0) {
      setCargasHorarias([{ disciplina: "", carga_horaria: "", id: "" }]);
    }
  }, [cargasHorarias]);

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
