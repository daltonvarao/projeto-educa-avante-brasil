"use strict";

/** @typedef {import('@adonisjs/framework/src/Request')} Request */
/** @typedef {import('@adonisjs/framework/src/Response')} Response */
/** @typedef {import('@adonisjs/framework/src/View')} View */

const Curso = use("App/Models/Curso");
const AreaEstudo = use("App/Models/AreaEstudo");
const Modalidade = use("App/Models/Modalidade");

class CursoController {
  /**
   * Show a list of all cursos.
   * GET cursos
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
  async index({ view }) {
    const cursos = await Curso.query().orderBy("nome").fetch();

    return view.render("admin.cursos.index", { cursos: cursos.toJSON() });
  }

  /**
   * Render a form to be used for creating a new curso.
   * GET cursos/create
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
  async create({ view }) {
    const areas = await AreaEstudo.all();
    const modalidades = await Modalidade.all();

    return view.render("admin.cursos.create", {
      areas: areas.toJSON(),
      modalidades: modalidades.toJSON(),
    });
  }

  /**
   * Create/save a new curso.
   * POST cursos
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async store({ request }) {
    const cursoData = request.only([
      "nome",
      "tipo",
      "sobre",
      "instituicao",
      "duracao",
      "area_estudo_id",
      "modalidade_id",
    ]);

    const cargaHorariaData = request.input("cargas_horarias");
    const formaPagamentoData = request.input("formas_pagamentos");

    try {
      const curso = await Curso.create(cursoData);

      await curso
        .carga_horarias()
        .createMany(
          cargaHorariaData
            .filter((item) => item.disciplina && item.carga_horaria)
            .map(({ id, ...rest }) => rest)
        );

      await curso
        .forma_pagamentos()
        .createMany(
          formaPagamentoData
            .filter(
              (item) =>
                item.parcelas &&
                item.valor_parcela &&
                item.desconto &&
                item.conclusao &&
                item.tipo
            )
            .map(({ id, ...rest }) => rest)
        );

      return { success: "Curso cadastrado." };
    } catch (error) {
      return { error: error.message };
    }
  }

  /**
   * Render a form to update an existing curso.
   * GET cursos/:id/edit
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
  async edit({ params, session, response, view }) {
    const areas = await AreaEstudo.all();
    const modalidades = await Modalidade.all();

    try {
      const curso = await Curso.query()
        .where("id", params.id)
        .with("carga_horarias")
        .with("forma_pagamentos")
        .first();

      return view.render("admin.cursos.edit", {
        areas: areas.toJSON(),
        modalidades: modalidades.toJSON(),
        curso: curso.toJSON(),
      });
    } catch (error) {
      session.flash({ error: error.message });

      return response.redirect("back");
    }
  }

  /**
   * Update curso details.
   * PUT or PATCH cursos/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async update({ params, request }) {
    const cursoData = request.only([
      "nome",
      "tipo",
      "sobre",
      "instituicao",
      "duracao",
      "area_estudo_id",
      "modalidade_id",
    ]);

    const cargaHorariaData = request.input("cargas_horarias");
    const formaPagamentoData = request.input("formas_pagamentos");

    try {
      await Curso.query().where("id", params.id).update(cursoData);
      const curso = await Curso.find(params.id);

      await curso
        .carga_horarias()
        .whereNotIn(
          "id",
          cargaHorariaData.filter((item) => item.id).map((item) => item.id)
        )
        .delete();

      await curso
        .forma_pagamentos()
        .whereNotIn(
          "id",
          formaPagamentoData.filter((item) => item.id).map((item) => item.id)
        )
        .delete();

      cargaHorariaData
        .filter((item) => item.id)
        .forEach(async (_, i) => {
          await curso
            .carga_horarias()
            .where("id", cargaHorariaData[i].id)
            .update(cargaHorariaData[i]);
        });

      formaPagamentoData
        .filter((item) => item.id)
        .map(async (_, i) => {
          await curso
            .forma_pagamentos()
            .where("id", formaPagamentoData[i].id)
            .update(formaPagamentoData[i]);
        });

      await curso
        .carga_horarias()
        .createMany(
          cargaHorariaData
            .filter((item) => !item.id && item.disciplina && item.carga_horaria)
            .map(({ id, ...rest }) => rest)
        );

      await curso
        .forma_pagamentos()
        .createMany(
          formaPagamentoData
            .filter(
              (item) =>
                !item.id &&
                item.parcelas &&
                item.valor_parcela &&
                item.desconto &&
                item.conclusao &&
                item.tipo
            )
            .map(({ id, ...rest }) => rest)
        );

      return { success: "Curso atualizado." };
    } catch (error) {
      return { error: error.message };
    }
  }
  /**
   * Display a single curso.
   * GET cursos/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
  async show({ params, view, response, session }) {
    try {
      const curso = await Curso.query()
        .where("id", params.id)
        .with("carga_horarias")
        .with("forma_pagamentos", (builder) => {
          builder.orderBy("parcelas", "asc");
        })
        .first();

      return view.render("admin.cursos.show", { curso: curso.toJSON() });
    } catch (error) {
      console.log(error);
      session.flash({ error: error.message });
      return response.route("home.index");
    }
  }

  /**
   * Delete a curso with id.
   * DELETE cursos/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async destroy({ params, session, response }) {
    try {
      await Curso.query().where("id", params.id).delete();
      session.flash({ success: "Curso deletado." });

      return response.route("admin.cursos.index");
    } catch (error) {
      session.flash({ error: error.message });

      return response.redirect("back");
    }
  }
}

module.exports = CursoController;
