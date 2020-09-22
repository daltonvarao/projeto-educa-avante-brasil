import React, { useEffect, useState } from "react";
import ReactDOM from "react-dom";

import axios from "axios";

import Curso from "./components/cardCurso";

const ws = adonis.Ws().connect();
const socket = ws.subscribe("home");

import { Select2 } from "./components/inputs";

function Select({ name, setSelected, options }) {
  return (
    <select onChange={(ev) => setSelected(ev.target.value)}>
      <option className="shadow">{name}</option>
      {options.map((item) => (
        <option key={item.id} value={item.id}>
          {item.nome}
        </option>
      ))}
    </select>
  );
}

function Form() {
  const [areas, setAreas] = useState([]);
  const [cursos, setCursos] = useState([]);

  const [modalidade, setModalidade] = useState("");
  const [area, setArea] = useState("");
  const [curso, setCurso] = useState("default");
  const [selectedCurso, setSelectedCurso] = useState(false);

  useEffect(() => {
    if (modalidade && area) {
      socket.emit("inputChange", {
        modalidade,
        area_estudo_id: area,
      });
    }
  }, [modalidade, area]);

  useEffect(() => {
    if (curso && area && modalidade) {
      setSelectedCurso(cursos.filter((item) => item.id == curso)[0]);
    }
  }, [curso, cursos]);

  useEffect(() => {
    (async () => {
      try {
        const response = await axios.get("/api/collections");
        const { data } = response;

        setAreas(data.areas);
      } catch (error) {}
    })();

    socket.on("cursos", function ({ cursos: data }) {
      setCursos(data);
    });
  }, []);

  return (
    <React.Fragment>
      <h3 className="homepage-subtitle">Escolha um curso abaixo</h3>
      <form id="homepage-form" className="homepage-inputs">
        <Select2
          name="Modalidade"
          options={[
            ["pos", "Pós-Graduação"],
            ["curso", "Curso Profissionalizante"],
          ]}
          setSelected={setModalidade}
          defaultValue={modalidade}
        />
        <Select setSelected={setArea} name="Área" options={areas} />
        <Select setSelected={setCurso} name="Curso" options={cursos} />
      </form>

      {selectedCurso && area && modalidade ? (
        <div className="card-curso">
          <Curso data={selectedCurso} />
        </div>
      ) : null}
    </React.Fragment>
  );
}

const cursoContainer = document.querySelector("#home-form");
if (cursoContainer) {
  ReactDOM.render(<Form />, cursoContainer);
}
