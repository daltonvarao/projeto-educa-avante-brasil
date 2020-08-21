"use strict";

/** @typedef {import('@adonisjs/framework/src/Request')} Request */
/** @typedef {import('@adonisjs/framework/src/Response')} Response */
/** @typedef {import('@adonisjs/framework/src/View')} View */

const AreaEstudo = use("App/Models/AreaEstudo");

const { validate } = use("Validator");

class AreaEstudoController {
  /**
   * Show a list of all areaestudos.
   * GET areaestudos
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
  async index({ request, view }) {
    const { page } = request.qs;
    const areas = await AreaEstudo.query().paginate(page || 1);

    return view.render("admin.areas.index", { areas: areas.toJSON() });
  }

  /**
   * Render a form to be used for creating a new areaestudo.
   * GET areaestudos/create
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
  async create({ view }) {
    return view.render("admin.areas.create");
  }

  /**
   * Create/save a new areaestudo.
   * POST areaestudos
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async store({ request, response, session }) {
    const areaData = request.only(["nome", "descricao"]);

    const rules = {
      nome: "required|unique:area_estudos,nome",
      descricao: "required",
    };

    const messages = {
      "nome.required": "Nome da Área obrigatório.",
      "nome.unique": "Nome da Área já cadastrado.",
      "descricao.required": "Descrição da Área obrigatória.",
    };

    const validation = await validate(areaData, rules, messages);

    if (validation.fails()) {
      session.withErrors(validation.messages()).flashAll();

      return response.redirect("back");
    }

    try {
      await AreaEstudo.create(areaData);
      session.flash({ success: "Área cadastrada." });

      return response.route("admin.areas.index");
    } catch (error) {
      session.flash({ error: error.message });

      return response.redirect("back");
    }
  }

  /**
   * Render a form to update an existing areaestudo.
   * GET areaestudos/:id/edit
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
  async edit({ params, session, response, view }) {
    try {
      const area = await AreaEstudo.find(params.id);

      return view.render("admin.areas.edit", { area: area.toJSON() });
    } catch (error) {
      session.flash({ error: error.message });

      return response.redirect("back");
    }
  }

  /**
   * Update areaestudo details.
   * PUT or PATCH areaestudos/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async update({ params, request, response, session }) {
    const areaData = request.only(["nome", "descricao"]);

    const rules = {
      nome: `required|unique:area_estudos,nome,id,${params.id}`,
      descricao: "required",
    };

    const messages = {
      "nome.required": "Nome da Área obrigatório.",
      "nome.unique": "Nome da Área já cadastrado.",
      "descricao.required": "Descrição da Área obrigatória.",
    };

    const validation = await validate(areaData, rules, messages);

    if (validation.fails()) {
      session.withErrors(validation.messages()).flashAll();

      return response.redirect("back");
    }

    try {
      await AreaEstudo.query().where("id", params.id).update(areaData);
      session.flash({ success: "Área atualizada." });

      return response.route("admin.areas.index");
    } catch (error) {
      session.flash({ error: error.message });

      return response.redirect("back");
    }
  }

  /**
   * Delete a areaestudo with id.
   * DELETE areaestudos/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async destroy({ params, response, session }) {
    try {
      await AreaEstudo.query().where("id", params.id).delete();
      session.flash({ success: "Área deletada." });

      return response.route("admin.areas.index");
    } catch (error) {
      session.flash({ error: error.message });

      return response.redirect("back");
    }
  }
}

module.exports = AreaEstudoController;
