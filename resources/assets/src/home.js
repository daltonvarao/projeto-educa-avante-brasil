import React, { useEffect, useState } from "react";
import ReactDOM from "react-dom";

import { FormattedNumber, IntlProvider } from "react-intl";

const ws = adonis.Ws().connect();
const socket = ws.subscribe("home");

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
  const [modalidades, setModalidades] = useState([]);
  const [areas, setAreas] = useState([]);
  const [cursos, setCursos] = useState([]);

  const [modalidade, setModalidade] = useState("");
  const [area, setArea] = useState("");
  const [curso, setCurso] = useState("default");
  const [selectedCurso, setSelectedCurso] = useState(false);

  useEffect(() => {
    if (modalidade && area) {
      socket.emit("inputChange", {
        modalidade_id: modalidade,
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
    fetch("/api/collections")
      .then((resp) => resp.json())
      .then((data) => {
        setAreas(data.areas);
        setModalidades(data.modalidades);
      })
      .catch((error) => console.log(error));

    socket.on("cursos", function ({ cursos: data }) {
      setCursos(data);
    });
  }, []);

  return (
    <React.Fragment>
      <h3 className="homepage-subtitle">Escolha um curso abaixo</h3>
      <form id="homepage-form" className="homepage-inputs">
        <Select
          setSelected={setModalidade}
          name="Modalidade"
          options={modalidades}
        />
        <Select setSelected={setArea} name="Área" options={areas} />
        <Select setSelected={setCurso} name="Curso" options={cursos} />
      </form>

      {selectedCurso && area && modalidade ? (
        <Curso data={selectedCurso} />
      ) : null}
    </React.Fragment>
  );
}

function Curso({ data }) {
  const pg = data.forma_pagamentos[0];

  return (
    <div className="card-curso shadow">
      <div
        className="curso"
        onClick={() => (location.href = `/cursos/${data.id}`)}
      >
        <div className="curso-box">
          <h1 className="course-title">{data.nome}</h1>
          <div className="course-info">
            <ul>
              <li>
                <i className="mdi mdi-office-building-outline"></i>
                Instituição: {data.instituicao}
              </li>
              <li>
                <i className="mdi mdi-earth"></i>
                Tipo: {data.tipo}
              </li>
              <li>
                <i className="mdi mdi-calendar"></i>
                Duração: {data.duracao}
              </li>
            </ul>
          </div>
        </div>

        <IntlProvider locale="pt-br" defaultLocale="pt-br">
          <div className="price-card">
            <span className="old-price">
              {pg?.parcelas > 1 ? `${pg?.parcelas}x ` : ""}{" "}
              <FormattedNumber
                value={pg?.valor_parcela}
                style="currency"
                currency="BRL"
              />
            </span>
            <span className="price">
              {pg?.parcelas > 1 ? `${pg?.parcelas}x ` : ""}{" "}
              <FormattedNumber
                value={pg?.valor_parcela * (1 - pg.desconto / 100)}
                style="currency"
                currency="BRL"
              />
            </span>
            <span className="discount-percentage">
              desconto de{" "}
              <FormattedNumber value={pg?.desconto / 100} style="percent" />
            </span>
            <span className="discount-price">
              Economize{" "}
              <FormattedNumber
                value={pg?.valor_total - pg?.valor_liquido}
                style="currency"
                currency="BRL"
              />
            </span>

            <div className="payment-info">
              <span className="payment">
                {pg.tipo == "cartao" ? "Cartão" : "Boleto"} em {pg.conclusao}
              </span>
            </div>
          </div>
        </IntlProvider>
      </div>
    </div>
  );
}

const cursoContainer = document.querySelector("#home-form");
if (cursoContainer) {
  ReactDOM.render(<Form />, cursoContainer);
}
