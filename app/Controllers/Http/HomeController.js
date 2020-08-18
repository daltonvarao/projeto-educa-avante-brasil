"use strict";

const AreaEstudo = use("App/Models/AreaEstudo");

class HomeController {
  async index({ view }) {
    const areas = await AreaEstudo.all();

    return view.render("home.index", {
      areas: areas.toJSON(),
    });
  }
}

module.exports = HomeController;
