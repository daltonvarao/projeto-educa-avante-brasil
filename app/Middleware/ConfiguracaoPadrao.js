"use strict";
/** @typedef {import('@adonisjs/framework/src/Request')} Request */
/** @typedef {import('@adonisjs/framework/src/Response')} Response */
/** @typedef {import('@adonisjs/framework/src/View')} View */

const Configuracao = use("App/Models/Configuracao");

class ConfiguracaoPadrao {
  /**
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Function} next
   */
  async handle({ request }, next) {
    const configs = await Configuracao.find(1);

    request.configs = configs.toJSON();

    await next();
  }
}

module.exports = ConfiguracaoPadrao;
