"use strict";

const Matricula = use("App/Models/PreMatricula");
const Mail = use("Mail");

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

  sanitizeRequestDada(requestData) {
    requestData.telefone = requestData.telefone
      .replace("(", "")
      .replace(")", "")
      .replace("-", "")
      .replace(" ", "")
      .replace(" ", "");
  }

  async index({ view, request }) {
    const matriculas = await Matricula.query().paginate(request.qs.page || 1);

    return view.render("admin.matriculas.index", {
      matriculas: matriculas.toJSON(),
    });
  }

  async store({ request }) {
    const matriculaData = request.only(this.matriculaData());

    this.sanitizeRequestDada(matriculaData);

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

    this.sanitizeRequestDada(matriculaData);

    try {
      const matricula = await Matricula.find(id);

      matricula.merge(matriculaData);

      await matricula.save();

      if (matriculaData.completed) {
        await Mail.send("emails.matricula", matriculaData, (message) => {
          message
            .from("atendimento@projetoeducavantebrasil.com")
            .subject(
              "Parabéns, agora você faz parte do melhor canal de distribuição de bolsas"
            )
            .to(matriculaData.email);
        });
      }

      return { matricula: matricula.toJSON() };
    } catch (error) {
      return { error: error.message };
    }
  }

  async show({ view, params }) {
    const { id } = params;

    const matricula = await Matricula.query()
      .where({ id })
      .with("forma_pagamento")
      .with("curso")
      .with("curso.area_estudo")
      .first();

    return view.render("admin.matriculas.show", {
      matricula: matricula.toJSON(),
    });
  }
}

module.exports = PreMatriculaController;
