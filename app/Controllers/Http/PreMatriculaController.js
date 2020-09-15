"use strict";

const Matricula = use("App/Models/PreMatricula");

class PreMatriculaController {
  async store({ request }) {
    const matriculaData = request.only([
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
      "id",
    ]);

    try {
      if (matriculaData.id) {
        const matricula = await Matricula.find(matriculaData.id);
        matricula.merge(matriculaData);
        await matricula.save();

        return { matricula: matricula.toJSON() };
      } else {
        const matricula = await Matricula.create(matriculaData);

        return { matricula: matricula.toJSON() };
      }
    } catch (error) {
      return { error: error.message };
    }
  }
}

module.exports = PreMatriculaController;
