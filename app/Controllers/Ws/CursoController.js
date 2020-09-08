"use strict";

const Curso = use("App/Models/Curso");

function applyFilter(query, filter) {
  if (Object.keys(filter).map((k) => filter[k])[0]) return query.where(filter);

  return query;
}

class CursoController {
  constructor({ socket, request }) {
    this.socket = socket;
    this.request = request;
  }

  async onSearch({ modalidade_id, area_estudo_id, nome }) {
    console.log(modalidade_id);
    let query = Curso.query().where("nome", "ilike", `%${nome}%`);

    query = applyFilter(query, { area_estudo_id });
    query = applyFilter(query, { modalidade_id });

    const cursos = await query
      .with("forma_pagamentos")
      .with("carga_horarias")
      .orderBy("nome", "asc")
      .fetch();

    this.socket.emit("cursos", { cursos: cursos.toJSON() });
  }
}

module.exports = CursoController;
