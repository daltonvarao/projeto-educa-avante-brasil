"use strict";

const User = use("App/Models/User");
const AreaEstudo = use("App/Models/AreaEstudo");

class AdminSeeder {
  async run() {
    await User.findOrCreate(
      {
        email: "admin@admin.com",
      },
      {
        name: "admin",
        email: "admin@admin.com",
        password: "12345678",
        is_admin: true,
      }
    );

    await AreaEstudo.findOrCreate({ nome: "Saúde" }, { nome: "Saúde" });
  }
}

module.exports = AdminSeeder;
