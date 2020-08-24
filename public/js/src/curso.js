"use strict";

const ws = adonis.Ws().connect();
const socket = ws.subscribe("home");

function Select({ name, setSelected, options }) {
  return (
    <select onChange={(ev) => setSelected(ev.target.value)}>
      <option className="shadow" value={false}>
        {name}
      </option>
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

  const [modalidade, setModalidade] = React.useState(false);
  const [area, setArea] = React.useState(false);
  const [curso, setCurso] = React.useState(false);
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
    if (curso) {
      setSelectedCurso(cursos.filter((item) => item.id == curso)[0]);
    } else {
      setSelectedCurso(false);
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
      console.log(data);
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

      {selectedCurso ? <Curso data={selectedCurso} /> : null}
    </React.Fragment>
  );
}

function Curso({ data }) {
  return (
    <div
      onClick={() => (location.href = `/cursos/${data.id}`)}
      className="card-curso"
    >
      <div className="curso">
        <h2 className="curso-nome">{data.nome}</h2>
        <div className="curso-details">
          <div className="curso-item">Instituição: {data.instituicao}</div>
          <div className="curso-item">Tipo: {data.tipo}</div>
          <div className="curso-item">Duração: {data.duracao}</div>
          <div className="curso-item">Carga horária: 451 horas</div>
        </div>
      </div>
    </div>
  );
}

let cursoContainer = document.querySelector("#curso-form");
ReactDOM.render(<Form />, cursoContainer);
