"use strict";

const User = use("App/Models/User");

class AdminSeeder {
  async run() {
    await User.create({
      name: "admin",
      email: "admin@admin.com",
      password: "12345678",
      is_admin: true,
    });
  }
}

module.exports = AdminSeeder;
