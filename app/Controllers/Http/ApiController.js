"use strict";

/** @typedef {import('@adonisjs/framework/src/Request')} Request */
/** @typedef {import('@adonisjs/framework/src/Response')} Response */
/** @typedef {import('@adonisjs/framework/src/View')} View */

const AreaEstudo = use("App/Models/AreaEstudo");
const Modalidade = use("App/Models/Modalidade");

class ApiController {
  /**
   * Show a list of all areaestudos.
   * GET areaestudos
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
  async collections({ request }) {
    if (request.qs.all) {
      const modalidades = await Modalidade.all();
      const areas = await AreaEstudo.all();

      return {
        modalidades: modalidades.toJSON(),
        areas: areas.toJSON(),
      };
    } else {
      const modalidades = await Modalidade.query().has("cursos").fetch();
      const areas = await AreaEstudo.query().has("cursos").fetch();

      return {
        modalidades: modalidades.toJSON(),
        areas: areas.toJSON(),
      };
    }
  }

  async areas() {
    const areas = await AreaEstudo.query().has("cursos").fetch();

    return {
      areas: areas.toJSON(),
    };
  }
}

module.exports = ApiController;
