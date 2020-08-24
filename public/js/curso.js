"use strict";

var _slicedToArray = function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"]) _i["return"](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } }; }();

var ws = adonis.Ws().connect();
var socket = ws.subscribe("home");

function Select(_ref) {
  var name = _ref.name,
      setSelected = _ref.setSelected,
      options = _ref.options;

  return React.createElement(
    "select",
    { onChange: function onChange(ev) {
        return setSelected(ev.target.value);
      } },
    React.createElement(
      "option",
      { className: "shadow", value: false },
      name
    ),
    options.map(function (item) {
      return React.createElement(
        "option",
        { key: item.id, value: item.id },
        item.nome
      );
    })
  );
}

function Form() {
  var _React$useState = React.useState([]),
      _React$useState2 = _slicedToArray(_React$useState, 2),
      modalidades = _React$useState2[0],
      setModalidades = _React$useState2[1];

  var _React$useState3 = React.useState([]),
      _React$useState4 = _slicedToArray(_React$useState3, 2),
      areas = _React$useState4[0],
      setAreas = _React$useState4[1];

  var _React$useState5 = React.useState([]),
      _React$useState6 = _slicedToArray(_React$useState5, 2),
      cursos = _React$useState6[0],
      setCursos = _React$useState6[1];

  var _React$useState7 = React.useState(false),
      _React$useState8 = _slicedToArray(_React$useState7, 2),
      modalidade = _React$useState8[0],
      setModalidade = _React$useState8[1];

  var _React$useState9 = React.useState(false),
      _React$useState10 = _slicedToArray(_React$useState9, 2),
      area = _React$useState10[0],
      setArea = _React$useState10[1];

  var _React$useState11 = React.useState(false),
      _React$useState12 = _slicedToArray(_React$useState11, 2),
      curso = _React$useState12[0],
      setCurso = _React$useState12[1];

  var _React$useState13 = React.useState(false),
      _React$useState14 = _slicedToArray(_React$useState13, 2),
      selectedCurso = _React$useState14[0],
      setSelectedCurso = _React$useState14[1];

  React.useEffect(function () {
    if (modalidade && area) {
      socket.emit("inputChange", {
        modalidade_id: modalidade,
        area_estudo_id: area
      });
    }
  }, [modalidade, area]);

  React.useEffect(function () {
    if (curso) {
      setSelectedCurso(cursos.filter(function (item) {
        return item.id == curso;
      })[0]);
    } else {
      setSelectedCurso(false);
    }
  }, [curso, cursos]);

  React.useEffect(function () {
    fetch("/api/collections").then(function (resp) {
      return resp.json();
    }).then(function (data) {
      setAreas(data.areas);
      setModalidades(data.modalidades);
    }).catch(function (error) {
      return console.log(error);
    });

    socket.on("cursos", function (_ref2) {
      var data = _ref2.cursos;

      setCursos(data);
      console.log(data);
    });
  }, []);

  return React.createElement(
    React.Fragment,
    null,
    React.createElement(
      "h3",
      { className: "homepage-subtitle" },
      "Escolha um curso abaixo"
    ),
    React.createElement(
      "form",
      { id: "homepage-form", className: "homepage-inputs" },
      React.createElement(Select, {
        setSelected: setModalidade,
        name: "Modalidade",
        options: modalidades
      }),
      React.createElement(Select, { setSelected: setArea, name: "Area", options: areas }),
      React.createElement(Select, { setSelected: setCurso, name: "Curso", options: cursos })
    ),
    selectedCurso ? React.createElement(Curso, { data: selectedCurso }) : null
  );
}

function Curso(_ref3) {
  var data = _ref3.data;

  return React.createElement(
    "div",
    {
      onClick: function onClick() {
        return location.href = "/cursos/" + data.id;
      },
      className: "card-curso"
    },
    React.createElement(
      "div",
      { className: "curso" },
      React.createElement(
        "h2",
        { className: "curso-nome" },
        data.nome
      ),
      React.createElement(
        "div",
        { className: "curso-details" },
        React.createElement(
          "div",
          { className: "curso-item" },
          "Institui\xE7\xE3o: ",
          data.instituicao
        ),
        React.createElement(
          "div",
          { className: "curso-item" },
          "Tipo: ",
          data.tipo
        ),
        React.createElement(
          "div",
          { className: "curso-item" },
          "Dura\xE7\xE3o: ",
          data.duracao
        ),
        React.createElement(
          "div",
          { className: "curso-item" },
          "Carga hor\xE1ria: 451 horas"
        )
      )
    )
  );
}

var cursoContainer = document.querySelector("#curso-form");
ReactDOM.render(React.createElement(Form, null), cursoContainer);