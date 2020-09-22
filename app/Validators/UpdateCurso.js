"use strict";

const { formatters } = use("Validator");

class UpdateCurso {
  get rules() {
    const cursoId = this.ctx.params.id;

    return {
      nome: `required|unique:cursos,nome,id,${cursoId}`,
      tipo: "required",
      instituicao: "required",
      sobre: "required",
      duracao: "required",
      modalidade: "required",
      area_estudo_id: "required",
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

module.exports = UpdateCurso;
