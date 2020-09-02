import React, { useEffect, useState } from "react";
import ReactDOM from "react-dom";

import axios from "axios";
import { Editor } from "@tinymce/tinymce-react";

import { Select, Select2 } from "./components/inputs";
import { CargasHorarias } from "./components/cargaHoraria";

import swal from "@sweetalert/with-react";

function Form() {
  const [modalidades, setModalidades] = useState([]);
  const [areas, setAreas] = useState([]);

  const [nome, setNome] = useState("");
  const [instituicao, setInstituicao] = useState("");
  const [tipo, setTipo] = useState("");
  const [duracao, setDuracao] = useState("");
  const [sobre, setSobre] = useState("");

  const [modalidade, setModalidade] = useState("");
  const [area, setArea] = useState("");

  const [cargasHorarias, setCargasHorarias] = useState([
    { disciplina: "", carga_horaria: "" },
  ]);

  useEffect(() => {
    (async () => {
      try {
        const response = await axios.get("/api/collections?all=true");

        setModalidades(response.data.modalidades);
        setAreas(response.data.areas);
      } catch (error) {
        console.log(error);
      }
    })();
  }, []);

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
    };

    try {
      const response = await axios.post("/api/cursos", data);

      if (response.data.success) {
        swal("Sucesso!", response.data.success, "success");
        setTimeout(() => {
          location.href = "/admin/cursos";
        }, 2000);
      }
    } catch (error) {
      console.log(error);
      swal("Ooops!", error.message, "error");
    }
  };

  return (
    <form className="form-container shadow">
      <h2 className="form-title">Novo Curso</h2>

      <input
        className="form-input"
        type="text"
        placeholder="Nome"
        value={nome}
        onChange={(ev) => setNome(ev.target.value)}
        required
      />

      <div className="form-group-inline">
        <Select
          name="Modalidade"
          options={modalidades}
          setSelected={setModalidade}
        />
        <Select name="Area" options={areas} setSelected={setArea} />
      </div>

      <div className="form-group-inline">
        <Select2
          name="Instituição"
          options={["Fael"]}
          setSelected={setInstituicao}
        />
        <Select2
          name="Tipo"
          options={["Presencial", "Online"]}
          setSelected={setTipo}
        />
      </div>

      <input
        className="form-input"
        type="text"
        placeholder="Duração"
        value={duracao}
        onChange={(ev) => setDuracao(ev.target.value)}
        required
      />

      <h4 className="form-subtitle text-primary">Sobre o curso</h4>

      <Editor
        initialValue={sobre}
        apiKey="hl4vrjm5712bj2ow0vck1jw1tih2dubftxpqorpc4x6wymnj"
        init={{
          height: 500,
          menubar: true,
          plugins: [
            "advlist autolink emoticons lists link charmap print preview anchor",
            "searchreplace visualblocks code fullscreen",
            "insertdatetime table paste code help wordcount",
          ],
          toolbar:
            "undo redo | formatselect emoticons | bold italic backcolor | \
            alignleft aligncenter alignright alignjustify | \
            bullist numlist outdent indent | removeformat | help",
        }}
        onEditorChange={(content, editor) => setSobre(content)}
      />

      <CargasHorarias
        cargasHorarias={cargasHorarias}
        setCargasHorarias={setCargasHorarias}
      />

      <button onClick={handleSubmitForm} className="form-btn btn-primary">
        Salvar
      </button>
    </form>
  );
}

const createCurso = document.querySelector("#create-curso");
if (createCurso) {
  ReactDOM.render(<Form />, createCurso);
}
