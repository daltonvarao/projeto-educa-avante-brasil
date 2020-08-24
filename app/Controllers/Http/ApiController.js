"use strict";

const AreaEstudo = use("App/Models/AreaEstudo");
const Modalidade = use("App/Models/Modalidade");

class ApiController {
  async collections() {
    const modalidades = await Modalidade.query().has("cursos").fetch();
    const areas = await AreaEstudo.query().has("cursos").fetch();

    return {
      modalidades: modalidades.toJSON(),
      areas: areas.toJSON(),
    };
  }
}

module.exports = ApiController;
