"use strict";

/** @typedef {import('@adonisjs/framework/src/Request')} Request */
/** @typedef {import('@adonisjs/framework/src/Response')} Response */
/** @typedef {import('@adonisjs/framework/src/View')} View */

const Configuracao = use("App/Models/Configuracao");

class ConfiguracaoController {
  /**
   * Show a list of all configuracaos.
   * GET configuracaos
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
  async index({ view }) {
    return view.render("admin.configuracoes.index");
  }

  /**
   * Create/save a new configuracao.
   * POST configuracaos
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async store({ request, session, response }) {
    const configData = request.only([
      "telefone_wpp",
      "pos_grad_url",
      "cur_prof_url",
      "facebook_url",
      "pos_grad_valor_matricula",
    ]);

    const config = await Configuracao.find(1);
    config.merge(configData);

    try {
      await config.save();
      session.flash({ success: "Configurações salvas!" });

      return response.redirect("back");
    } catch (error) {
      session.flash({ error: error.message });

      return response.redirect("back");
    }
  }
}

module.exports = ConfiguracaoController;
