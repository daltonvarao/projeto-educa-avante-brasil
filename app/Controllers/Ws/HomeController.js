"use strict";

const Curso = use("App/Models/Curso");

class HomeController {
  constructor({ socket, request }) {
    this.socket = socket;
    this.request = request;
  }

  async onInputChange({ modalidade_id, area_estudo_id }) {
    try {
      const cursos = await Curso.query()
        .where({ modalidade_id, area_estudo_id })
        .fetch();

      this.socket.emit("cursos", { cursos: cursos.toJSON() });
    } catch (error) {
      console.log(error);
    }
  }
}

module.exports = HomeController;
