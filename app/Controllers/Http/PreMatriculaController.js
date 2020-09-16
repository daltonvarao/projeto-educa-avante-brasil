"use strict";

const Matricula = use("App/Models/PreMatricula");

class PreMatriculaController {
  matriculaData() {
    return [
      "step",
      "nome",
      "email",
      "telefone",
      "sexo",
      "estado_civil",
      "data_nascimento",
      "estado_nascimento",
      "cidade_nascimento",
      "nome_mae",
      "nome_pai",
      "cpf",
      "rg",
      "data_expedicao_rg",
      "orgao_emissor_rg",
      "uf_rg",
      "colou_grau",
      "cep",
      "rua",
      "numero",
      "bairro",
      "cidade",
      "estado",
      "forma_pagamento_id",
      "curso_id",
      "aceita_contato",
      "completed",
    ];
  }

  async store({ request }) {
    const matriculaData = request.only(this.matriculaData());

    try {
      const matricula = await Matricula.create(matriculaData);

      return { matricula: matricula.toJSON() };
    } catch (error) {
      return { error: error.message };
    }
  }

  async update({ request, params }) {
    const matriculaData = request.only(this.matriculaData());
    const { id } = params;

    try {
      const matricula = await Matricula.find(id);

      matricula.merge(matriculaData);

      await matricula.save();

      return { matricula: matricula.toJSON() };
    } catch (error) {
      return { error: error.message };
    }
  }
}

module.exports = PreMatriculaController;
