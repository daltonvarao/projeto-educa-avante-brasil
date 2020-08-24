"use strict";

const AreaEstudo = use("App/Models/AreaEstudo");
const Modalidade = use("App/Models/Modalidade");

class HomeController {
  async setCollections() {
    const modalidades = await Modalidade.query().has("cursos").fetch();
    const areas = await AreaEstudo.query().has("cursos").fetch();

    return { modalidades, areas };
  }

  async index({ view }) {
    const { areas, modalidades } = await this.setCollections();

    return view.render("home.index", {
      areas: areas.toJSON(),
      modalidades: modalidades.toJSON(),
    });
  }
}

module.exports = HomeController;
