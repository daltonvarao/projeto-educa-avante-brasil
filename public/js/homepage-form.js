const ws = adonis.Ws().connect();

const socket = ws.subscribe("home");

const form = document.querySelector("#homepage-form");
if (form) {
  const modalidade = form.querySelector('select[name="modalidade_id"]');
  const area = form.querySelector('select[name="area_estudo_id"]');
  const cursos = form.querySelector('select[name="curso_id"]');

  let modalidade_id = null,
    area_estudo_id = null,
    curso_id = null,
    cursoList = [];

  modalidade.addEventListener("change", function () {
    modalidade_id = this.value;

    if (modalidade_id && area_estudo_id) {
      socket.emit("inputChange", { modalidade_id, area_estudo_id });
    }
  });

  area.addEventListener("change", function () {
    area_estudo_id = this.value;

    if (modalidade_id && area_estudo_id) {
      socket.emit("inputChange", { modalidade_id, area_estudo_id });
    }
  });

  cursos.addEventListener("change", function () {
    curso_id = this.value;

    if (modalidade_id && area_estudo_id && curso_id) {
      showCurso(cursoList.filter((curso) => curso.id == curso_id)[0]);
    }
  });

  socket.on("cursos", function ({ cursos: cursosData }) {
    cursos.innerHTML = "";
    cursos.appendChild(new Option("Selecione um curso", null, true));
    cursoList = cursosData;

    cursosData.forEach((curso) => {
      cursos.appendChild(new Option(curso.nome, curso.id));
    });
  });
}

function showCurso(curso) {
  const cursoDetails = document.querySelector(".curso-details");
  const cursoName = document.createElement("h1");
  cursoDetails.appendChild(createElement("h1", { innerHTML: curso.nome }));
}

function createElement(name, { innerHTML }) {
  const element = document.createElement(name);
  element.innerHTML = innerHTML;

  return element;
}
