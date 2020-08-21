"use strict";

class StoreCurso {
  get rules() {
    return {
      nome: "required|unique:cursos,nome",
      tipo: "required",
      instituicao: "required",
      sobre: "required",
      duracao: "required",
      modalidade_id: "required",
      area_estudo_id: "required",
    };
  }

  get messages() {
    return {
      "nome.required": "O Nome é obrigatório.",
      "nome.unique": "Este Curso já está cadastrado.",
      "tipo.required": "O Tipo é obrigatório.",
      "instituicao.required": "A Instituição é obrigatória.",
      "sobre.required": "O campo Sobre é obrigatório.",
      "duracao.required": "A Duração é obrigatória.",
      "modalidade_id.required": "A Modalidade é obrigatória.",
      "area_estudo_id.required": "A Área de estudo é obrigatória.",
    };
  }
}

module.exports = StoreCurso;
