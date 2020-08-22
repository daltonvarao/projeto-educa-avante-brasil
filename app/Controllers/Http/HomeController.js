"use strict";

const AreaEstudo = use("App/Models/AreaEstudo");
const Modalidade = use("App/Models/Modalidade");

class HomeController {
  async index({ view, request }) {
    const areas = await AreaEstudo.all();
    const modalidades = await Modalidade.all();

    return view.render("home.index", {
      areas: areas.toJSON(),
      modalidades: modalidades.toJSON(),
    });
  }
}

module.exports = HomeController;
