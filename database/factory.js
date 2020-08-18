"use strict";

/*
|--------------------------------------------------------------------------
| Factory
|--------------------------------------------------------------------------
|
| Factories are used to define blueprints for database tables or Lucid
| models. Later you can use these blueprints to seed your database
| with dummy data.
|
*/

/** @type {import('@adonisjs/lucid/src/Factory')} */
const Factory = use("Factory");

Factory.blueprint("App/Models/User", async (faker, i, data) => {
  return {
    name: faker.username(),
    email: faker.email(),
    password: "12345678",
    is_admin: true,
    ...data,
  };
});

Factory.blueprint("App/Models/AreaEstudo", async (faker, i, data) => {
  return {
    nome: faker.profession(),
    descricao: faker.sentence(),
    ...data,
  };
});
