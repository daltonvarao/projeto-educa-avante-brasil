"use strict";

const { formatters } = use("Validator");

class StoreCurso {
  get rules() {
    return {
      nome: "required|unique:cursos,nome",
      modalidade: "required",
      area_estudo_id: "required",
      instituicao: "required",
      tipo: "required",
      duracao: "required",
      sobre: "required",
    };
  }

  get formatter() {
    return formatters.JsonApi;
  }

  get messages() {
    return {
      "nome.required": "O Nome é obrigatório.",
      "nome.unique": "Este Curso já está cadastrado.",
      "tipo.required": "O Tipo é obrigatório.",
      "instituicao.required": "A Instituição é obrigatória.",
      "sobre.required": "O campo Sobre é obrigatório.",
      "duracao.required": "A Duração é obrigatória.",
      "modalidade.required": "A Modalidade é obrigatória.",
      "area_estudo_id.required": "A Área de estudo é obrigatória.",
    };
  }
}

module.exports = StoreCurso;
