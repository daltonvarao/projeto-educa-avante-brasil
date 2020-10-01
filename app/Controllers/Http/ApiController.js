"use strict";

const { query } = require("../../Models/Curso");

/** @typedef {import('@adonisjs/framework/src/Request')} Request */
/** @typedef {import('@adonisjs/framework/src/Response')} Response */
/** @typedef {import('@adonisjs/framework/src/View')} View */

const AreaEstudo = use("App/Models/AreaEstudo");

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
    try {
      var query = AreaEstudo.query();

      if (!request.qs.all) {
        query = query.has("cursos");
      }

      const areas = await query.fetch();

      return {
        areas: areas.toJSON(),
      };
    } catch (error) {
      console.log(error);
    }
  }

  async areas({ request }) {
    const modalidade = request.qs.modalidade;

    const areas = await AreaEstudo.query()
      .whereHas("cursos", (builder) => {
        if (modalidade) builder.where({ modalidade });
      })
      .fetch();

    return {
      areas: areas.toJSON(),
    };
  }
}

module.exports = ApiController;
