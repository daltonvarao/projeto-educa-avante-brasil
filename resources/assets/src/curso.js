import React, { useEffect, useState, createRef } from "react";
import ReactDOM from "react-dom";
import axios from "axios";
import swal from "@sweetalert/with-react";
import { Editor } from "@tinymce/tinymce-react";

import { Select, Select2, InputValidation } from "./components/inputs";
import { CargasHorarias } from "./components/cargaHoraria";
import { FormasPagamentos } from "./components/formaPagamento";

function Form({ edit, curso }) {
  const [modalidades, setModalidades] = useState([]);
  const [areas, setAreas] = useState([]);
  const [loading, setLoading] = useState(true);
  const [nome, setNome] = useState(curso?.nome ?? "");
  const [instituicao, setInstituicao] = useState(curso?.instituicao ?? "");
  const [tipo, setTipo] = useState(curso?.tipo ?? "");
  const [duracao, setDuracao] = useState(curso?.duracao ?? "");
  const [sobre, setSobre] = useState(curso?.sobre ?? "");
  const [modalidade, setModalidade] = useState(curso?.modalidade_id ?? "");
  const [area, setArea] = useState(curso?.area_estudo_id ?? "");
  const [cargasHorarias, setCargasHorarias] = useState([
    { disciplina: "", carga_horaria: "", id: "" },
  ]);

  const [formasPagamentos, setFormasPagamentos] = useState([
    {
      parcelas: "",
      conclusao: "",
      tipo: "",
      desconto: "",
      valor_parcela: "",
    },
  ]);

  const saveButton = createRef();

  const [error, setError] = useState({});

  useEffect(() => {
    (async () => {
      try {
        const response = await axios.get("/api/collections?all=true");

        setModalidades(response.data.modalidades);
        setAreas(response.data.areas);

        setLoading(false);
      } catch (error) {
        console.log(error);
      }
    })();

    if (edit) {
      setCargasHorarias((state) => [
        ...curso?.carga_horarias.map(({ disciplina, carga_horaria, id }) => ({
          disciplina,
          carga_horaria,
          id,
        })),
      ]);

      setFormasPagamentos((state) => [
        ...curso?.forma_pagamentos.map(
          ({ parcelas, conclusao, tipo, desconto, valor_parcela, id }) => ({
            parcelas,
            conclusao,
            tipo,
            desconto,
            valor_parcela,
            id,
          })
        ),
      ]);
    }
  }, [curso, edit]);

  const handleSubmitForm = async () => {
    const data = {
      nome,
      instituicao,
      tipo,
      duracao,
      sobre,
      modalidade_id: modalidade,
      area_estudo_id: area,
      cargas_horarias: cargasHorarias,
      formas_pagamentos: formasPagamentos,
    };

    try {
      const method = edit ? "put" : "post";
      const url = edit ? `/api/cursos/${curso.id}` : "/api/cursos";

      const response = await axios[method](url, data);

      if (response.data.success) {
        swal("Sucesso!", response.data.success, "success");
        setTimeout(() => {
          location.href = "/admin/cursos";
        }, 2000);
      }
    } catch (error) {
      if (error.response.data.errors[0]) {
        setError(error.response.data.errors[0]);
        window.scrollTo(0, 0);
      }
    }
  };

  return (
    <form className="form-container shadow">
      {!loading ? (
        <>
          <h2 className="form-title">Novo Curso</h2>

          <input
            className="form-input"
            type="text"
            placeholder="Nome"
            value={nome}
            onChange={(ev) => setNome(ev.target.value)}
          />
          <InputValidation field="nome" error={error} />

          <div className="form-group-inline">
            <Select
              name="Modalidade"
              options={modalidades}
              setSelected={setModalidade}
              defaultValue={modalidade}
            />
            <Select
              name="Area"
              options={areas}
              setSelected={setArea}
              defaultValue={area}
            />
          </div>
          <InputValidation
            field={["area_estudo_id", "modalidade_id"]}
            error={error}
          />

          <div className="form-group-inline">
            <Select2
              name="Instituição"
              options={[["Fael", "Fael"]]}
              setSelected={setInstituicao}
              defaultValue={instituicao}
            />
            <Select2
              name="Tipo"
              options={["Presencial", "Online"].map((item) => [item, item])}
              setSelected={setTipo}
              defaultValue={tipo}
            />
          </div>
          <InputValidation field={["instituicao", "tipo"]} error={error} />

          <input
            className="form-input"
            type="text"
            placeholder="Duração"
            value={duracao}
            onChange={(ev) => setDuracao(ev.target.value)}
          />
          <InputValidation field={"duracao"} error={error} />

          <h4 className="form-subtitle text-primary">Sobre o curso</h4>

          <Editor
            initialValue={sobre}
            apiKey="hl4vrjm5712bj2ow0vck1jw1tih2dubftxpqorpc4x6wymnj"
            init={{
              height: 500,
              menubar: true,
              plugins: ["advlist lists link anchor searchreplace table help"],
              toolbar:
                "undo redo | formatselect | bold italic forecolor backcolor | \
                alignleft aligncenter alignright alignjustify | \
                bullist numlist outdent indent | removeformat | help",
            }}
            onEditorChange={(content, _) => setSobre(content)}
          />
          <InputValidation field={"sobre"} error={error} />

          <CargasHorarias
            cargasHorarias={cargasHorarias}
            setCargasHorarias={setCargasHorarias}
          />

          <br />

          <FormasPagamentos
            formasPagamentos={formasPagamentos}
            setFormasPagamentos={setFormasPagamentos}
          />

          <button
            type="button"
            onClick={handleSubmitForm}
            className="form-btn btn-primary"
            ref={saveButton}
          >
            Salvar
          </button>
        </>
      ) : (
        <div className="loader" />
      )}
    </form>
  );
}

const createCurso = document.querySelector("#curso-form");
if (createCurso) {
  const edit = createCurso.getAttribute("data-edit");
  const curso = JSON.parse(
    createCurso.querySelector('input[type="hidden"]')?.value || "{}"
  );

  ReactDOM.render(<Form edit={edit} curso={curso} />, createCurso);
}
