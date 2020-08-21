"use strict";

/** @typedef {import('@adonisjs/framework/src/Request')} Request */
/** @typedef {import('@adonisjs/framework/src/Response')} Response */
/** @typedef {import('@adonisjs/framework/src/View')} View */

const Modalidade = use("App/Models/Modalidade");
const { validate } = use("Validator");

class ModalidadeController {
  /**
   * Show a list of all modalidades.
   * GET modalidades
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
  async index({ request, view }) {
    const { page } = request.qs;
    const modalidades = await Modalidade.query().paginate(page || 1);

    return view.render("admin.modalidades.index", {
      modalidades: modalidades.toJSON(),
    });
  }

  /**
   * Render a form to be used for creating a new modalidade.
   * GET modalidades/create
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
  async create({ view }) {
    return view.render("admin.modalidades.create");
  }

  /**
   * Create/save a new modalidade.
   * POST modalidades
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async store({ request, response, session }) {
    const modalidadeData = request.only(["nome"]);

    const rules = {
      nome: "required|unique:modalidades,nome",
    };

    const messages = {
      "nome.required": "Nome da Modalidade obrigatório.",
      "nome.unique": "Nome da Modalidade já cadastrado.",
    };

    const validation = await validate(modalidadeData, rules, messages);

    if (validation.fails()) {
      session.withErrors(validation.messages()).flashAll();

      return response.redirect("back");
    }

    try {
      await Modalidade.create(modalidadeData);
      session.flash({ success: "Modalidade cadastrada." });

      return response.route("admin.modalidades.index");
    } catch (error) {
      session.flash({ error: error.message });

      return response.redirect("back");
    }
  }

  /**
   * Render a form to update an existing modalidade.
   * GET modalidades/:id/edit
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
  async edit({ params, session, response, view }) {
    try {
      const modalidade = await Modalidade.find(params.id);

      return view.render("admin.modalidades.edit", {
        modalidade: modalidade.toJSON(),
      });
    } catch (error) {
      session.flash({ error: error.message });

      return response.redirect("back");
    }
  }

  /**
   * Update modalidade details.
   * PUT or PATCH modalidades/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async update({ params, request, response, session }) {
    const modalidadeData = request.only(["nome"]);

    const rules = {
      nome: `required|unique:modalidades,nome,id,${params.id}`,
    };

    const messages = {
      "nome.required": "Nome da Modalidade obrigatório.",
      "nome.unique": "Nome da Modalidade já cadastrado.",
    };

    const validation = await validate(modalidadeData, rules, messages);

    if (validation.fails()) {
      session.withErrors(validation.messages()).flashAll();

      return response.redirect("back");
    }

    try {
      await Modalidade.query().where("id", params.id).update(modalidadeData);
      session.flash({ success: "Modalidade atualizada." });

      return response.route("admin.modalidades.index");
    } catch (error) {
      session.flash({ error: error.message });

      return response.redirect("back");
    }
  }

  /**
   * Delete a modalidade with id.
   * DELETE modalidades/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async destroy({ params, session, response }) {
    try {
      await Modalidade.query().where("id", params.id).delete();
      session.flash({ success: "Modalidade deletada." });

      return response.route("admin.modalidades.index");
    } catch (error) {
      session.flash({ error: error.message });

      return response.redirect("back");
    }
  }
}

module.exports = ModalidadeController;
