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
  async index({ request, response, view }) {
    const cursos = await Curso.all();

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
  async store({ request, response, session }) {
    const cursoData = request.only([
      "nome",
      "tipo",
      "sobre",
      "instituicao",
      "duracao",
      "area_estudo_id",
      "modalidade_id",
    ]);

    const cargaHorariaData = request.collect(["disciplina", "carga_horaria"]);

    console.log(cargaHorariaData);

    try {
      const curso = await Curso.create(cursoData);

      await curso
        .carga_horarias()
        .createMany(
          cargaHorariaData.filter((item) => item.disciplina !== null)
        );

      session.flash({ success: "Curso cadastrado." });

      return response.route("admin.cursos.index");
    } catch (error) {
      session.flash({ error: error.message });

      return response.redirect("back");
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
  async update({ params, request, session, response }) {
    const cursoData = request.only([
      "nome",
      "tipo",
      "sobre",
      "instituicao",
      "duracao",
      "area_estudo_id",
      "modalidade_id",
    ]);

    const cargaHorariaData = request.collect([
      "disciplina",
      "carga_horaria",
      "id",
    ]);

    try {
      await Curso.query().where("id", params.id).update(cursoData);
      const curso = await Curso.find(params.id);

      console.log(cargaHorariaData);

      cargaHorariaData
        .filter((item) => item.id !== null)
        .forEach(async (ch, i) => {
          await curso
            .carga_horarias()
            .where("id", ch.id)
            .update(cargaHorariaData[i]);

          if (!ch.disciplina) {
            await curso.carga_horarias().where("id", ch.id).delete();
          }
        });

      await curso.carga_horarias().createMany(
        cargaHorariaData
          .filter((ch) => ch.id === null && ch.disciplina)
          .map((ch) => ({
            disciplina: ch.disciplina,
            carga_horaria: ch.carga_horaria,
          }))
      );

      session.flash({ success: "Curso atualizado." });

      return response.route("admin.cursos.index");
    } catch (error) {
      session.flash({ error: error.message });

      return response.redirect("back");
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
        .with("forma_pagamentos")
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
