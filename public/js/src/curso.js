"use strict";

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
  const [modalidades, setModalidades] = React.useState([]);
  const [areas, setAreas] = React.useState([]);
  const [cursos, setCursos] = React.useState([]);

  const [modalidade, setModalidade] = React.useState("");
  const [area, setArea] = React.useState("");
  const [curso, setCurso] = React.useState("default");
  const [selectedCurso, setSelectedCurso] = React.useState(false);

  React.useEffect(() => {
    if (modalidade && area) {
      socket.emit("inputChange", {
        modalidade_id: modalidade,
        area_estudo_id: area,
      });
    }
  }, [modalidade, area]);

  React.useEffect(() => {
    if (curso && area && modalidade) {
      setSelectedCurso(cursos.filter((item) => item.id == curso)[0]);
    }
  }, [curso, cursos]);

  React.useEffect(() => {
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
        <Select setSelected={setArea} name="Area" options={areas} />
        <Select setSelected={setCurso} name="Curso" options={cursos} />
      </form>

      {selectedCurso && area && modalidade ? (
        <Curso data={selectedCurso} />
      ) : null}
    </React.Fragment>
  );
}

function Curso({ data }) {
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
              <li>
                <i className="mdi mdi-clock-outline"></i>
                CH: 544 horas
              </li>
            </ul>
          </div>
        </div>
        <div className="price-card">
          <span className="old-price">R$ 2000,00</span>
          <span className="price">R$ 900,00</span>
          <span className="discount-percentage">desconto de 52,3%</span>
          <span className="discount-price">Economize R$ 1100,00</span>

          <div className="payment-info">
            <span className="payment">Pgto: boleto.</span>
            <span className="payment">Conclusão: 6 meses.</span>
          </div>
        </div>
      </div>
    </div>
  );
}

let cursoContainer = document.querySelector("#curso-form");
if (cursoContainer) {
  ReactDOM.render(<Form />, cursoContainer);
}
