import React, { useState, useEffect, Fragment } from "react";
import ReactDOM from "react-dom";
import axios from "axios";

import { Select } from "./components/inputs";
import Curso from "./components/cardCurso";

const ws = adonis.Ws().connect();
const socket = ws.subscribe("cursos");

function CursoForm({ modalidadeId }) {
  const [area, setArea] = useState("");
  const [modalidade, setModalidade] = useState(modalidadeId);
  const [nome, setNome] = useState("");
  const [areas, setAreas] = useState([]);
  const [cursos, setCursos] = useState([]);

  useEffect(() => {
    (async () => {
      try {
        const response = await axios.get("/api/areas");
        setAreas(response.data.areas);
      } catch (error) {
        console.log(error);
      }
    })();
  }, []);

  useEffect(() => {
    socket.emit("search", {
      area_estudo_id: area,
      modalidade_id: modalidade,
      nome,
    });
  }, [nome, area, modalidade]);

  useEffect(() => {
    socket.on("cursos", ({ cursos }) => {
      setCursos(cursos);
    });
  }, []);

  return (
    <Fragment>
      <h1 className="text-primary">
        {modalidadeId === "1" ? "Pós-Graduação" : "Cursos Profissionalizantes"}
      </h1>
      <form className="">
        <Select
          name="Área"
          options={areas}
          setSelected={setArea}
          defaultValue={area}
          optional
        />

        <input
          className="form-input"
          value={nome}
          onChange={(ev) => setNome(ev.target.value)}
          type="text"
          placeholder="Nome do curso"
        />
      </form>

      {cursos.map((curso, index) => (
        <Curso data={curso} key={index} />
      ))}
    </Fragment>
  );
}

const container = document.querySelector("#search-form");
const modalidade = container.getAttribute("data-modalidade");

if (container) {
  ReactDOM.render(<CursoForm modalidadeId={modalidade} />, container);
}
