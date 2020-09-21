"use strict";

const AreaEstudo = use("App/Models/AreaEstudo");

class HomeController {
  async setCollections() {
    const areas = await AreaEstudo.query().has("cursos").fetch();

    return { areas };
  }

  async index({ view }) {
    const { areas } = await this.setCollections();

    return view.render("home.index", {
      areas: areas.toJSON(),
    });
  }
}

module.exports = HomeController;
