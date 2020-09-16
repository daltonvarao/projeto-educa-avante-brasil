"use strict";

const { test, trait } = use("Test/Suite")("PreMatricula");

trait("Test/ApiClient");
trait("DatabaseTransactions");

const Matricula = use("App/Models/PreMatricula");
const Factory = use("Factory");

test("should be able to create new record in POST /api/matriculas", async ({
  client,
}) => {
  const matriculaData = {
    email: "daltonphellipe@gmail.com",
    nome: "Dalton Felipe",
    telefone: "93991924014",
  };

  const response = await client
    .post("/api/matriculas")
    .send(matriculaData)
    .end();

  response.assertJSONSubset({
    matricula: matriculaData,
  });
});

test("should be able to update an record in PUT /api/matriculas", async ({
  client,
}) => {
  const matricula = await Factory.model("App/Models/PreMatricula").create();
  const matriculaData = {
    email: "daltonphellipe@gmail.com",
    nome: "Dalton Felipe",
    telefone: "93991924014",
    cep: "68030340",
  };

  const response = await client
    .put(`/api/matriculas/${matricula.id}`)
    .send(matriculaData)
    .end();

  response.assertJSONSubset({
    matricula: matriculaData,
  });
});
