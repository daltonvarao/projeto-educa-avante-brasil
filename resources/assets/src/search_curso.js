import React, { useState, useEffect, Fragment } from "react";
import ReactDOM from "react-dom";
import axios from "axios";

import { Select } from "./components/inputs";
import Curso from "./components/cardCurso";
import Pagination from "./components/pagination";

const ws = adonis.Ws().connect();
const socket = ws.subscribe("cursos");

function CursoForm({ modalidade }) {
  const [area, setArea] = useState("");
  const [nome, setNome] = useState("");
  const [areas, setAreas] = useState([]);
  const [cursos, setCursos] = useState([]);
  const [page, setPage] = useState(1);
  const [pagination, setPagination] = useState({});

  useEffect(() => {
    (async () => {
      try {
        const response = await axios.get(`/api/areas?modalidade=${modalidade}`);
        setAreas(response.data.areas);
      } catch (error) {}
    })();
  }, []);

  useEffect(() => {
    setPage(1);
  }, [area]);

  useEffect(() => {
    socket.emit("search", {
      area_estudo_id: area,
      modalidade,
      nome,
      page,
    });
  }, [nome, area, modalidade, page]);

  useEffect(() => {
    socket.on("cursos", ({ cursos: { data, ...rest } }) => {
      setCursos(data);
      setPagination(rest);
    });
  }, []);

  return (
    <Fragment>
      <form className="search-form shadow">
        <h1 className="text-primary">
          {modalidade === "pos"
            ? "Pós-Graduação"
            : "Cursos Profissionalizantes"}
        </h1>
        <div className="search-input">
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
        </div>
      </form>

      <div className="cursos">
        {cursos.map((curso, index) => (
          <Curso data={curso} key={index} />
        ))}
      </div>

      <Pagination pagination={pagination} setPage={setPage} />
    </Fragment>
  );
}

const container = document.querySelector("#search-form");
if (container) {
  const modalidade = container.getAttribute("data-modalidade");
  ReactDOM.render(<CursoForm modalidade={modalidade} />, container);
}
